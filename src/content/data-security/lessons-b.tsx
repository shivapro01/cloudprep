import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { CloudTrailAuditDiagram, NetworkVisibilityDiagram, PrivateAccessDiagram, SovereigntyDiagram } from "@/components/lesson/diagrams-1-3";

/** Section 1.3 lessons — part B (1.3.5–1.3.8). Original content. */

export function Lesson135() {
  return (
    <>
      <Lead>
        “Private access to AWS services” has exactly two constructs — gateway
        endpoints and interface endpoints — plus PrivateLink for publishing
        your own services. The exam tests the split constantly: which one, for
        which service, at what cost, with what restrictions.
      </Lead>

      <Diagram title="Gateway endpoints, interface endpoints, PrivateLink" caption="One free construct, one paid construct, one publishing mechanism.">
        <PrivateAccessDiagram />
      </Diagram>

      <H2>Gateway endpoints — free, S3 and DynamoDB only</H2>
      <UL
        items={[
          <>
            Implemented as <strong>route table entries</strong>, not network
            interfaces — traffic to S3/DynamoDB flows over the AWS network with
            zero data processing charges.
          </>,
          <>
            Support <strong>endpoint policies</strong>: pin the endpoint to
            specific buckets, principals, or actions — a bucket reachable only
            from that VPC is the classic lockdown.
          </>,
          <>
            Eliminate NAT gateway processing charges for S3-heavy workloads —
            a cost question disguised as a security question.
          </>,
        ]}
      />

      <H2>Interface endpoints — any service, ENI-based, paid</H2>
      <UL
        items={[
          <>
            Deploy <strong>elastic network interfaces into your subnets</strong>{" "}
            (one per AZ is the cost-correct design) with security groups
            attached.
          </>,
          <>
            <strong>Private DNS</strong> rewrites service hostnames to the
            endpoint addresses, so SDKs work unchanged.
          </>,
          <>
            Cover essentially every other AWS service — STS, KMS, Secrets
            Manager, ECR, SNS, SQS, CloudWatch — where private access and
            audit matter.
          </>,
        ]}
      />

      <H2>PrivateLink — publishing your own service</H2>
      <P>
        An <strong>endpoint service</strong> backed by a Network Load Balancer
        lets other VPCs — your own accounts, partner accounts, or customers —
        connect through interface endpoints in their VPCs. Traffic never
        touches the internet, never traverses peered routes, and the provider
        never exposes network topology. This is the answer whenever a question
        says “shared service consumed privately by multiple VPCs/accounts
        without peering.”
      </P>
      <Callout type="exam">
        Selection shortcut: <strong>“S3/DynamoDB from private subnets, avoid
        NAT charges”</strong> → gateway endpoint. <strong>“STS/KMS/Secrets
        Manager privately”</strong> → interface endpoint with private DNS.{" "}
        <strong>“expose an internal app to another account without peering”</strong>{" "}
        → PrivateLink endpoint service.
      </Callout>

      <H2>Endpoint policies in practice</H2>
      <UL
        items={[
          <>
            A gateway endpoint policy can allow <Code>s3:GetObject</Code> on
            one bucket while denying everything else — the VPC’s S3 access
            becomes a closed list even for otherwise-permissive roles.
          </>,
          <>
            Interface endpoint policies similarly scope KMS or Secrets
            Manager calls (e.g., allow Decrypt only on specific key ARNs),
            so a compromised instance can’t wander the service.
          </>,
          <>
            Endpoint policies combine with identity policies by intersection:
            the effective permission is what <em>both</em> allow — the
            exam’s “why is this denied despite the IAM policy” answer when
            an endpoint policy is the hidden ceiling.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson136() {
  return (
    <>
      <Lead>
        The audit question — “who did what, when, from where, and can you
        prove the record wasn’t altered?” — is answered by CloudTrail, with
        three exam-critical mechanics: organization trails, data events, and
        log file integrity validation.
      </Lead>

      <Diagram title="The CloudTrail audit pipeline" caption="Events → trail → immutable S3 with signed digests → Athena.">
        <CloudTrailAuditDiagram />
      </Diagram>

      <H2>Trails, scopes, and events</H2>
      <UL
        items={[
          <>
            A <strong>single-Region trail</strong> records that Region only; an{" "}
            <strong>organization trail</strong> records every member account
            into central storage — the default answer for multi-account
            auditing.
          </>,
          <>
            <strong>Management events</strong> (control-plane API calls) are
            recorded by default; <strong>data events</strong> (S3 object-level
            reads/writes, Lambda invocations) must be enabled explicitly and
            are scoped cost-effectively with advanced event selectors.
          </>,
          <>
            Delivery goes to <strong>S3</strong> (encrypted, queryable with
            Athena) and optionally <strong>CloudWatch Logs</strong> for
            near-real-time alerting.
          </>,
        ]}
      />

      <H2>Integrity validation — proving the record</H2>
      <P>
        With <strong>log file integrity validation</strong> enabled, CloudTrail
        delivers hourly <strong>digest files</strong> signed with a public
        key. Validating logs against digests proves whether any log file was
        modified, deleted, or added after delivery — the tamper-evidence an
        auditor means by “can you trust the trail?”
      </P>

      <KeyTable
        head={["Question shape", "Answer"]}
        rows={[
          ["“Record every API call across all accounts for years”", "Organization trail → S3 (lifecycle-managed) → Athena"],
          ["“Audit who read objects in bucket X”", "CloudTrail data events (object-level) for that bucket"],
          ["“Prove logs were not tampered with”", "Log file integrity validation digests"],
          ["“Alert when a trail is stopped or deleted”", "Config rule / CloudTrail event → alarm"],
          ["“Why did this request fail?”", "DecodeAuthorizationMessage on the STS-encoded denial"],
        ]}
      />
      <Callout type="warn">
        Don’t substitute: <strong>Config</strong> records resource
        <em> configuration</em>, <strong>CloudWatch Logs</strong> holds
        application logs, <strong>S3 server access logs</strong> record
        requests with weaker identity context. Only CloudTrail data events are
        the authoritative “who did this API action” record.
      </Callout>

      <H2>CloudTrail Lake — queryable audit storage</H2>
      <UL
        items={[
          <>
            <strong>CloudTrail Lake</strong> stores events in an immutable,
            queryable event data store (up to 7 years retention) with
            built-in SQL — no S3 + Athena plumbing required.
          </>,
          <>
            <strong>Event data stores</strong> can additionally ingest
            activity events from outside AWS and Config configuration items,
            unifying audit sources in one query surface.
          </>,
          <>
            Choose Lake when the requirement is “query years of audit
            history with SQL”; keep the S3 + Athena pattern when existing
            pipelines or cross-tool access already exists.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson137() {
  return (
    <>
      <Lead>
        Three visibility tools with three distinct jobs: Flow Logs record
        connection metadata, Traffic Mirroring copies full packets for
        inspection, and Reachability Analyzer tests paths without sending a
        single packet.
      </Lead>

      <Diagram title="The network visibility trio" caption="Metadata vs payload vs virtual path test.">
        <NetworkVisibilityDiagram />
      </Diagram>

      <H2>Flow Logs — the metadata record</H2>
      <UL
        items={[
          <>
            Attach at <strong>VPC, subnet, or ENI</strong> level; record to
            CloudWatch Logs (alerting) or S3 (Athena analysis); support{" "}
            <strong>custom formats</strong> (packet counts, TCP flags, VPC and
            subnet IDs).
          </>,
          <>
            The <Code>REJECT</Code>/<Code>ACCEPT</Code> field is the forensic
            gold: it proves whether a security group or NACL dropped a flow —
            the evidence for “the security change broke connectivity.”
          </>,
          <>
            Querying with Athena answers historical questions — “who connected
            to this instance on port 22 last week” — at zero runtime cost.
          </>,
        ]}
      />

      <H2>Traffic Mirroring — the payload copy</H2>
      <P>
        Mirroring duplicates <strong>full packets</strong> from an ENI (with
        filter expressions to scope what’s copied) to an in-VPC appliance or
        NLB target — the mechanism for partner intrusion-detection systems and
        deep content forensics. The production flow is untouched: the mirror
        is a copy. Contrast with Flow Logs (metadata only) and with{" "}
        <strong>Gateway Load Balancer</strong> (inline blocking rather than
        passive copy).
      </P>

      <H2>Reachability Analyzer and Network Access Analyzer</H2>
      <UL
        items={[
          <>
            <strong>Reachability Analyzer</strong> computes the route between
            two endpoints virtually and reports reachability — or the exact
            blocking component (security group, NACL, route) — without sending
            packets or requiring log access.
          </>,
          <>
            <strong>Network Access Analyzer</strong> scales the idea to intent:
            declare what reachability <em>should</em> exist; it lists every
            path in the network that violates the intent — an auditor’s
            configuration-level review.
          </>,
        ]}
      />
      <Callout type="exam">
        Match by verb: <strong>“prove”</strong> a past drop → Flow Logs.{" "}
        <strong>“inspect copies of traffic”</strong> → Traffic Mirroring.{" "}
        <strong>“diagnose without touching the network”</strong> → Reachability
        Analyzer. <strong>“verify the whole network matches policy”</strong> →
        Network Access Analyzer.
      </Callout>

      <H2>Mirror session limits and filters</H2>
      <UL
        items={[
          <>
            A <strong>mirror session</strong> binds one source (ENI) to one
            target with a session number and VNI; an ENI supports a small
            number of concurrent sessions — plan one session per inspection
            use case.
          </>,
          <>
            <strong>Mirror filters</strong> scope by protocol, port range,
            and CIDR in both directions, so the appliance receives only
            relevant traffic instead of a full firehose.
          </>,
          <>
            Targets can be a single ENI or an NLB spreading load across a
            fleet of appliances — the scale-out answer for heavy VPCs.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson138() {
  return (
    <>
      <Lead>
        Data isolation and residency questions are really control questions:
        which walls exist between datasets, and what stops data from crossing
        a geographic or organizational boundary. The answers combine account
        separation, replication rules, and policy conditions.
      </Lead>

      <Diagram title="Residency and isolation controls" caption="Encryption does not relocate data — placement policies do.">
        <SovereigntyDiagram />
      </Diagram>

      <H2>Residency — keeping data inside a geography</H2>
      <UL
        items={[
          <>
            Primary storage and every replica live <strong>inside the
            permitted geography</strong>; cross-Region replication outside it
            is simply not configured.
          </>,
          <>
            An <strong>SCP denies writes to buckets outside the Region set or
            outside the organization</strong> — prevention at the API layer,
            so no workload can exfiltrate by misconfiguration.
          </>,
          <>
            Features that spread data must be avoided or constrained:{" "}
            <strong>global tables</strong>, <strong>Multi-Region access
            points</strong>, and CRR to non-permitted Regions all relocate
            copies — encryption does not make a copy compliant.
          </>,
          <>
            Even access patterns matter in strict regimes — anonymized
            aggregates can be served globally while raw personal data stays
            regional.
          </>,
        ]}
      />

      <H2>Cross-account isolation — the wall that works</H2>
      <UL
        items={[
          <>
            Accounts are AWS’s strongest isolation primitive: separate IAM,
            separate quotas, separate blast radius. Sensitive data gets a{" "}
            <strong>dedicated account</strong>.
          </>,
          <>
            Backups and replicas <strong>land in a security account</strong>{" "}
            (via AWS Backup cross-account or replication) whose principals
            alone can restore or delete — workload accounts physically cannot
            touch the copies.
          </>,
          <>
            Network pinning completes the wall: VPC-attached access points,
            endpoint policies on gateway endpoints, and bucket policies
            conditioned on <Code>aws:SourceVpce</Code> plus{" "}
            <Code>aws:PrincipalOrgID</Code>.
          </>,
        ]}
      />
      <Callout type="exam">
        Two signatures to recognize: <strong>“personal data must never leave
        the EU, including backups”</strong> → EU-only storage and replication,
        SCP denial of outside-Region writes (encryption alone is the wrong
        answer). <strong>“backup deletion must be impossible from workload
        accounts”</strong> → cross-account backup custody (or Vault Lock).
      </Callout>

      <H2>Assembling the full control set</H2>
      <P>
        Real questions stack these: a compliant data platform typically runs
        primary storage in the permitted geography, replicates within it for
        resilience, sends cross-account backups to a locked-down security
        account, pins all access through policies and endpoints, and records
        everything with CloudTrail and Config. Each individual control
        appeared in earlier lessons — the exam presents the stack and asks you
        to name the missing piece.
      </P>

      <H2>Dedicated Local Zones — residency with control</H2>
      <UL
        items={[
          <>
            <strong>Dedicated Local Zones</strong> (and Outposts) place AWS
            infrastructure inside a customer-specified facility or metro —
            data processed and stored there never leaves the premises for
            the covered services.
          </>,
          <>
            Unlike shared Local Zones, dedicated capacity is single-tenant:
            noisy-neighbor and data-commingling objections disappear, which
            is what regulated residency reviews actually ask about.
          </>,
          <>
            Residency questions distinguish <em>where processing happens</em>{" "}
            from <em>where control plane metadata lives</em> — account and
            billing metadata still resides in the home Region.
          </>,
        ]}
      />
    </>
  );
}
