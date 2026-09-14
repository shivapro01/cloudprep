import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { FirewallLayersDiagram } from "@/components/lesson/diagrams-1-2";

/** Section 1.2 lessons — part B (1.2.5–1.2.8). Original content. */

export function Lesson125() {
  return (
    <>
      <Lead>
        Macie answers a question nothing else in AWS answers: “what sensitive
        data is sitting in our S3 buckets?” It uses machine learning to
        discover and classify PII, credentials, and financial data at petabyte
        scale — continuously or on demand.
      </Lead>

      <H2>How discovery works</H2>
      <UL
        items={[
          <>
            <strong>Automated sensitive data discovery</strong> continuously
            scans covered buckets on a schedule you set (daily/weekly/monthly),
            org-wide under a delegated administrator.
          </>,
          <>
            <strong>Discovery jobs</strong> run one-time or scheduled scans of
            specific buckets or prefixes — the tool for a scoped audit or an
            incident follow-up.
          </>,
          <>
            <strong>Managed data identifiers</strong> recognize hundreds of
            PII/credential types out of the box (passport numbers, bank
            accounts, AWS keys); custom identifiers add regexes and allow
            lists for house-specific formats.
          </>,
          <>
            Findings split into two families:{" "}
            <strong>policy findings</strong> (bucket too open, unencrypted) and{" "}
            <strong>sensitive-data findings</strong> (what was found, where,
            how much, sample text).
          </>,
        ]}
      />

      <H2>The selection table</H2>
      <KeyTable
        head={["Question shape", "Answer"]}
        rows={[
          ["“Millions of objects may contain customer PII — find and classify it”", "Macie automated discovery"],
          ["“Alert when someone uploads files containing credit card numbers”", "Macie (one-time/scheduled jobs + EventBridge on findings)"],
          ["“Bucket policy allows an external account — flag risky configurations”", "Macie policy findings / IAM Access Analyzer"],
          ["“Encrypt everything sensitive we find”", "Macie finds it; KMS + application changes fix it"],
        ]}
      />
      <Callout type="tip">
        Pricing is per bucket monitored plus per GB processed — which is why
        Macie questions often pair it with a scoping decision: use automated
        discovery for the buckets that matter and targeted jobs for the rest.
      </Callout>
      <Callout type="exam">
        Macie is a <strong>detect-and-classify</strong> service: it never
        deletes, encrypts, or blocks anything. Answers claiming Macie
        “prevents” uploads or “encrypts” findings are distractors.
      </Callout>

      <H2>Allow lists — teaching Macie your own data</H2>
      <UL
        items={[
          <>
            <strong>Custom allow lists</strong> hold regexes and exact values
            for house-specific sensitive formats (employee IDs, internal
            account numbers) that managed identifiers don’t cover.
          </>,
          <>
            Allow lists attach to discovery jobs and automated discovery —
            matches raise findings with <em>your</em> labels, so triage
            speaks the company’s language.
          </>,
          <>
            The flip side exists too: <strong>custom data identifiers</strong>{" "}
            with allow-list scoping reduce false positives by excluding known
            test patterns from managed-identifier matches.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson126() {
  return (
    <>
      <Lead>
        Security Hub is the aggregation and prioritization layer — one
        severity-rated queue for every security finding in the organization.
        Detective is what you open when a finding needs an actual
        investigation: who did this, what else did they touch, since when.
      </Lead>

      <H2>Security Hub — the aggregator</H2>
      <UL
        items={[
          <>
            Ingests findings from GuardDuty, Inspector, Macie, Firewall
            Manager, IAM Access Analyzer, and partner products, normalizing
            everything into one format (ASFF).
          </>,
          <>
            Runs <strong>standards</strong> — packaged rule sets like{" "}
            <strong>CIS AWS Foundations Benchmark</strong> and the{" "}
            <strong>AWS Foundational Security Best Practices</strong> standard
            — producing a compliance score per account.
          </>,
          <>
            <strong>Cross-Region aggregation</strong> links Regions into one
            aggregation view; a <strong>delegated administrator</strong>
            manages it for the whole organization.
          </>,
          <>
            <strong>Automation rules</strong> apply actions to matching
            findings — suppress known-benign low-severity noise, re-assign
            severities — without writing Lambda glue.
          </>,
        ]}
      />

      <H2>Detective — the investigator</H2>
      <P>
        When GuardDuty raises “instance compromised, contacting C2 domain,”
        the follow-up questions are temporal and relational: what else did
        this principal touch, which IPs appeared when, what changed first.
        Detective ingests GuardDuty and Security Hub findings plus
        CloudTrail/VPC Flow Logs and builds a behavior graph you can query —
        pruning scope, visualizing unusual activity over time, and producing
        the timeline for root-cause analysis.
      </P>

      <KeyTable
        head={["Stage", "Service", "Question it answers"]}
        rows={[
          ["Detect", "GuardDuty / Inspector / Macie", "“Is something wrong right now?”"],
          ["Aggregate + prioritize", "Security Hub", "“What matters most across all accounts?”"],
          ["Investigate", "Amazon Detective", "“What exactly happened, and what’s the blast radius?”"],
          ["Store evidence", "CloudTrail + S3", "“What’s the immutable historical record?”"],
        ]}
      />
      <Callout type="exam">
        The trio division is clean: <strong>findings generation →
        aggregation → investigation</strong>. Any answer that has Detective
        “generating” findings or GuardDuty “aggregating across accounts” is
        misassembled.
      </Callout>
    </>
  );
}

export function Lesson127() {
  return (
    <>
      <Lead>
        Three network controls, three different places in the packet’s journey:
        security groups at the instance, network ACLs at the subnet, and
        Network Firewall at the VPC edge or an inspection VPC. Knowing which
        layer owns which capability is pure exam currency.
      </Lead>

      <Diagram title="The packet path and its control points" caption="Stateless vs stateful is the axis every question turns on.">
        <FirewallLayersDiagram />
      </Diagram>

      <H2>Security groups vs network ACLs — the core comparison</H2>
      <KeyTable
        head={["Property", "Security group", "Network ACL"]}
        rows={[
          ["Level", "Instance / ENI", "Subnet"],
          ["State", "Stateful — return traffic auto-allowed", "Stateless — return traffic needs its own rules"],
          ["Rules", "Allow only", "Allow and deny, numbered (lowest number wins)"],
          ["Evaluation", "All rules evaluated before decision", "Rules in numeric order; first match wins"],
          ["Default", "Deny all inbound, allow all outbound", "Default NACL: allow everything; custom NACL: deny everything unconfigured"],
          ["Targets", "Security groups can reference other SGs", "CIDR ranges only"],
        ]}
      />
      <Callout type="exam">
        Two classics: <strong>“block one malicious IP at the subnet level”</strong>{" "}
        → NACL (only place with deny), and <strong>“connection hangs before
        established”</strong> → the NACL is missing the ephemeral return-port
        range. Security groups cannot deny, NACLs cannot reference security
        groups.
      </Callout>

      <H2>Network Firewall — the managed VPC firewall</H2>
      <P>
        When the requirement outgrows SG/NACL — inspect egress, filter by
        domain name, decrypt TLS, import corporate Suricata rules — Network
        Firewall deploys managed stateless + stateful inspection on firewall
        subnets. It supports <strong>domain list filtering</strong> (allow-list
        or block-list egress), <strong>TLS inspection</strong> with an
        associated Private CA, and flows traffic transparently without proxy
        configuration on instances.
      </P>
      <UL
        items={[
          <>
            <strong>Distributed pattern:</strong> firewall endpoints in each
            VPC you protect — local control per VPC.
          </>,
          <>
            <strong>Centralized pattern:</strong> one inspection VPC; Transit
            Gateway routes all spokes’ north-south traffic through it — one
            place to audit everything.
          </>,
          <>
            Rule groups are reusable across policies: stateless (CIDR match)
            and stateful (Suricata-compatible rules, domain lists, TLS
            inspection).
          </>,
        ]}
      />
      <Callout type="exam">
        Match by requirement: <strong>“block traffic to known malicious
        domains”</strong> or <strong>“deep-packet-inspect egress”</strong> →
        Network Firewall. <strong>“filter HTTP requests by content”</strong> →
        WAF (application layer, different product).{" "}
        <strong>“stateful instance-level port rules”</strong> → security
        groups.
      </Callout>

      <H2>Suricata rule actions — pass, drop, alert, reject</H2>
      <UL
        items={[
          <>
            Stateful rule groups use Suricata syntax with explicit actions:{" "}
            <strong>pass</strong> (allow through), <strong>drop</strong>{" "}
            (silently discard), <strong>alert</strong> (allow + log), and{" "}
            <strong>reject</strong> (discard + send RST/ICMP back).
          </>,
          <>
            <strong>Reject vs drop</strong> is the exam’s favorite nuance:
            drop is invisible to the sender (timeouts), reject tells the
            sender the connection is refused. Use drop for stealth against
            scanners, reject for fast-failing legitimate clients.
          </>,
          <>
            Rule <strong>ordering within the group</strong> follows
            Suricata semantics — first match wins, so place narrow
            pass-rules before broad drop-rules.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson128() {
  return (
    <>
      <Lead>
        Firewall Manager is the “make it true everywhere, automatically”
        service: one administrator account defines WAF, Shield Advanced,
        security group, Network Firewall, and DNS Firewall policies — and every
        matching resource in the organization gets them, including resources
        created tomorrow.
      </Lead>

      <H2>The problem it solves</H2>
      <P>
        Without central enforcement, every new ALB in every new account is a
        chance someone skips the WAF attachment. Firewall Manager inverts the
        model: you declare a policy (“all ALBs in the Production OU get web
        ACL X”), and the service continuously finds matching resources —
        across accounts — and applies the protection, reporting anything it
        cannot fix.
      </P>

      <KeyTable
        head={["Capability", "Detail"]}
        rows={[
          ["Manageable protections", "WAF web ACLs, Shield Advanced, security groups, Network Firewall, Route 53 Resolver DNS Firewall"],
          ["Scope", "Whole organization, OUs, or account lists — new accounts included automatically"],
          ["Resource targeting", "By type and tags, so policies land on exactly the right fleet"],
          ["Administrator", "A designated Firewall Manager administrator account (not necessarily the management account)"],
        ]}
      />

      <H2>Positioning against its neighbors</H2>
      <UL
        items={[
          <>
            <strong>Firewall Manager = deployment and compliance of network
            protections</strong> at scale.
          </>,
          <>
            <strong>Security Hub = aggregation and standards compliance
            findings</strong> — it reports that an ALB lacks WAF; Firewall
            Manager makes that finding impossible.
          </>,
          <>
            <strong>AWS Config = detection and auto-remediation</strong> of
            configuration drift — corrective but slower and per-rule.
          </>,
        ]}
      />
      <Callout type="exam">
        The tell is <strong>“ensure/apply across all accounts and any
        resources created in the future.”</strong> Whenever protection must
        automatically extend to new accounts or resources, Firewall Manager is
        the answer — per-account WAF console work and Config remediation
        cannot promise that.
      </Callout>
      <Callout type="tip">
        Firewall Manager needs Organizations plus a designated administrator
        account and full AWS WAF activation — exam options that attach WAF
        “per resource in each account manually” fail the future-resources test
        every time.
      </Callout>

      <H2>Remediation actions — what FMS does about drift</H2>
      <UL
        items={[
          <>
            Detecting a non-compliant resource is only half the job: Firewall
            Manager policies carry <strong>remediation actions</strong> that
            auto-apply the protection (attach the web ACL, associate the
            security group, enable the firewall) instead of just reporting.
          </>,
          <>
            Remediation runs on a schedule plus on resource-creation events —
            new resources get protected within minutes, not at the next
            audit.
          </>,
          <>
            Resources that <em>can’t</em> be remediated (deleted protection,
            unsupported type) surface as compliance violations for human
            follow-up — automation plus an exception queue.
          </>,
        ]}
      />
    </>
  );
}
