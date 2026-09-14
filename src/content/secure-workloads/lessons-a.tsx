import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { GuardDutySourcesDiagram, WafShieldEdgeDiagram } from "@/components/lesson/diagrams-1-2";

/** Section 1.2 lessons — part A (1.2.1–1.2.4). Original content. */

export function Lesson121() {
  return (
    <>
      <Lead>
        AWS WAF is the application-layer firewall: it inspects the actual HTTP
        request — paths, headers, query strings, body contents, request rates —
        and stops malicious traffic before it costs your origin anything.
      </Lead>

      <Diagram title="Where WAF and Shield sit" caption="Shield absorbs volumetric attacks; WAF judges each request's content.">
        <WafShieldEdgeDiagram />
      </Diagram>

      <H2>The object model: web ACL → rules → statements</H2>
      <P>
        A <strong>web ACL</strong> attaches to one resource (CloudFront
        distribution, ALB, API Gateway stage, AppSync API, Cognito user pool,
        App Runner service, or Verified Access instance). It contains{" "}
        <strong>rules</strong> evaluated in <strong>priority order</strong> —
        the first matching rule decides, so ordering matters. Each rule holds{" "}
        <strong>statements</strong> (the match conditions) and an action.
      </P>
      <P>
        Actions go beyond block/allow: <strong>Count</strong> observes without
        interfering (the safe way to test new rules),{" "}
        <strong>CAPTCHA</strong> demands a puzzle for high-risk requests, and{" "}
        <strong>Challenge</strong> runs a silent browser interstitial that
        stops bots without punishing humans. Rules can also emit{" "}
        <strong>labels</strong> that later rules match on — the building block
        for multi-stage logic.
      </P>

      <H2>Managed rule groups — protection without rule writing</H2>
      <KeyTable
        head={["Managed rule group", "Blocks"]}
        rows={[
          ["Core rule set (CRS)", "The OWASP classics — injection, LFI/RFI, known exploit patterns"],
          ["Known bad inputs", "Exploit attempts targeting specific vulnerable software"],
          ["SQL database / Linux operating system rule groups", "Database and OS specific attack patterns"],
          ["Bot Control", "Detects and labels scrapers, scanners, and credential-stuffing bots"],
          ["Account takeover prevention (ATP)", "Sign-in attempts with breached credentials"],
          ["IP reputation lists", "Known malicious and anonymizing sources (Tor, botnets)"],
        ]}
      />
      <P>
        Managed groups are versioned (pin a version or track latest), count-vs-block is a
        per-rule-group override, and Bot Control/ATP carry additional charges —
        all facts the answer options lean on.
      </P>

      <H2>Rate-based rules and IP tracking</H2>
      <P>
        A <strong>rate-based rule</strong> counts requests per source address
        over a rolling five-minute window; crossing the threshold blocks the
        source for a configurable period. It is the answer to every{" "}
        “flooded by repeated requests from the same clients” question, and
        unlike a static IP block list it expires automatically. For layered
        defense, combine: a rate rule for floods, Bot Control for scrapers, and
        targeted rules for the app’s specific endpoints.
      </P>

      <H2>Scope and placement mechanics</H2>
      <UL
        items={[
          <>
            CloudFront web ACLs are managed with{" "}
            <strong>scope CLOUDFRONT</strong> in <strong>us-east-1</strong>,
            while everything else uses <strong>scope REGIONAL</strong> in the
            resource’s Region — a favorite detail question.
          </>,
          <>
            Edge inspection means bad requests die at the CDN, never reaching
            ALB or origin compute — the cost argument for attaching WAF to
            CloudFront rather than only at the load balancer.
          </>,
          <>
            The <strong>Firewall Manager</strong> service (own lesson) can
            enforce the same web ACL across every account and auto-attach it to
            new resources.
          </>,
        ]}
      />
      <Callout type="exam">
        Match the phrase: <strong>“SQL injection/XSS in requests”</strong> → WAF
        with managed rules. <strong>“Thousands of requests per minute from the
        same IPs”</strong> → rate-based rule. <strong>“Suspicious clients should
        prove they are human without being blocked”</strong> → CAPTCHA or
        Challenge action. <strong>“DDoS at layers 3/4”</strong> → Shield, not WAF.
      </Callout>

      <H2>WAF logging — proving what the firewall did</H2>
      <UL
        items={[
          <>
            Web ACLs stream detailed logs to <strong>S3, CloudWatch Logs, or
            Kinesis Data Firehose</strong> — every evaluated request with the
            matched rule, action taken, and request headers.
          </>,
          <>
            Logs power incident forensics (“which rule blocked the partner’s
            API calls?”) and tuning (Count-mode findings before switching a
            rule to Block).
          </>,
          <>
            <strong>Sampling and redaction:</strong> log only sampled requests
            to control volume; mask sensitive headers (Authorization, Cookie)
            so logs don’t become a credential leak.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson122() {
  return (
    <>
      <Lead>
        Shield is DDoS insurance: Standard gives every AWS customer automatic
        network-layer absorption for free; Advanced adds a 24/7 response team,
        cost protection, and deeper detection for workloads that can justify
        the spend.
      </Lead>

      <H2>Standard vs Advanced</H2>
      <KeyTable
        head={["Capability", "Shield Standard", "Shield Advanced"]}
        rows={[
          ["Price", "Free, enabled by default", "$3,000/month + data transfer out"],
          ["Layers covered", "3 and 4 (SYN floods, UDP reflection)", "3, 4, plus advanced L7 detection when paired with WAF"],
          ["Response team", "None", "Shield Response Team (SRT) 24/7 + proactive engagement during events"],
          ["Cost protection", "None", "Credits for autoscaling charges caused by DDoS"],
          ["Health-based detection", "None", "Response plans tie CloudWatch health alarms to mitigation"],
          ["Protected resources", "All AWS resources generically", "CloudFront, Route 53 edge, Global Accelerator, ALB/NLB/Elastic IP, specific ARNs"],
        ]}
      />
      <Callout type="exam">
        Trigger phrases: <strong>“automatic, always-on, no cost”</strong> →
        Shield Standard. <strong>“24/7 DDoS response team”, “cost protection
        for scaling during an attack”, “proactive engagement”</strong> → Shield
        Advanced. The Advanced tier also requires associating WAF for
        application-layer defense — the two are sold as a pair in exam
        scenarios.
      </Callout>

      <H2>The anatomy of an exam DDoS question</H2>
      <P>
        A classic scenario: an e-commerce site is hit by a{" "}
        <strong>volumetric UDP flood</strong> while a second attack sends{" "}
        <strong>malicious HTTP POSTs</strong>. The full answer combines three
        layers — CloudFront (absorbs and caches so origin capacity is not the
        bottleneck), Shield (network/transport absorption, Advanced for the
        SRT), and WAF (request-level filtering of the application attack).
        Questions frequently test that you know <em>which layer owns which
        attack</em>: you cannot stop a SYN flood with WAF rules, and you cannot
        stop SQLi with Shield.
      </P>
      <UL
        items={[
          <>
            <strong>Static assets behind CloudFront</strong> are near-immune to
            origin exhaustion — attackers hit edge caches, not your servers.
          </>,
          <>
            <strong>Auto scaling is your shock absorber</strong> for anything
            that does reach origin — and under Advanced, the scaling bill
            during a confirmed event is claimable.
          </>,
          <>
            <strong>Route 53 and Global Accelerator</strong> are also Shield-
            protected at the edge, protecting DNS and static-IP entry points.
          </>,
        ]}
      />
      <Callout type="warn">
        Do not answer “Shield Standard” when the scenario mentions response
        teams, attack forensics, cost credits, or protecting specific ARNs —
        those are exclusively Advanced capabilities.
      </Callout>

      <H2>Automatic mitigations and what Standard actually does</H2>
      <UL
        items={[
          <>
            <strong>Standard’s automatic mitigations</strong> run inline at
            the AWS network edge — SYN/UDP flood absorption and reflection
            scrubbing happen without any configuration or opt-in.
          </>,
          <>
            <strong>Advanced adds application-layer mitigations</strong> only
            when paired with WAF/CloudFront/Route 53 health checks — the
            SRT can also place <strong>manual mitigations</strong> on your
            protected resources during an active event.
          </>,
          <>
            Health-based detection (Advanced) watches the CloudWatch alarms
            you associate with a protection and treats sustained alarm
            state as an attack signal.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson123() {
  return (
    <>
      <Lead>
        GuardDuty is continuous threat detection: it consumes your AWS activity
        logs, applies ML and threat intelligence, and raises findings when
        something looks like a compromised key, a mined instance, or
        exfiltration. It is completely agentless — and it detects rather than
        blocks.
      </Lead>

      <Diagram title="GuardDuty: sources, detector, findings, response" caption="Enable once per account; findings flow wherever your response lives.">
        <GuardDutySourcesDiagram />
      </Diagram>

      <H2>Protection plans — the family of features</H2>
      <KeyTable
        head={["Protection", "What it watches", "Classic finding"]}
        rows={[
          ["S3 Protection", "S3 data events for access anomalies", "Unusual object retrieval pattern, credential exfiltration"],
          ["EKS Protection", "Kubernetes audit logs", "Suspicious API calls from a pod"],
          ["EKS Runtime Monitoring", "OS-level behavior inside containers (managed agents)", "Cryptomining binary executed in a pod"],
          ["RDS Protection", "RDS login and query activity", "Anomalous database login volume or failed login pattern"],
          ["Lambda Protection", "Lambda network activity", "Function making suspicious network calls"],
          ["Malware Protection", "EBS volumes attached to suspect instances", "Malicious software found on the volume (auto-scan on finding)"],
        ]}
      />
      <Callout type="note">
        Each protection plan is enabled separately with its own pricing — a
        question can hinge on enabling exactly the right one (for example,
        enabling <strong>RDS Protection</strong> rather than buying more
        database capacity) when the symptom is unusual database logins.
      </Callout>

      <H2>Response: findings are the beginning, not the end</H2>
      <P>
        GuardDuty <strong>detects; it does not block</strong>. Findings flow to
        the console, can be exported to S3 for long retention, stream into{" "}
        <strong>Security Hub</strong> for aggregation, and — most importantly —
        publish to <strong>EventBridge</strong>, where a rule per finding type
        triggers automated response: quarantine the instance with a
        restrictive security group, snapshot for forensics, revoke credentials.
        Organization-wide, a <strong>delegated administrator</strong> account
        manages detectors for every member while each account keeps visibility
        of its own findings.
      </P>
      <Callout type="exam">
        The phrasing <strong>“unusual API activity”, “traffic to a known
        command-and-control domain”, “potential compromised credentials”</strong>{" "}
        maps to GuardDuty. If the question then asks to{" "}
        <strong>automatically contain</strong> the threat, the full answer is
        GuardDuty + EventBridge + Lambda/SSM automation — GuardDuty alone never
        blocks anything.
      </Callout>

      <H2>Malware Protection for S3 — scanning objects on upload</H2>
      <UL
        items={[
          <>
            Enable <strong>Malware Protection for S3</strong> on a bucket and
            every new object is scanned automatically — no Lambda wiring, no
            event plumbing of your own.
          </>,
          <>
            Scan verdicts arrive as <strong>GuardDuty findings plus object
            tags</strong> (clean/infected), so bucket policies and
            applications can gate on the tag: quarantine prefixes, block
            downloads of infected objects.
          </>,
          <>
            Distinct from EBS Malware Protection (which scans volumes after
            a finding): S3 protection is <em>preventive at upload</em>,
            EBS protection is <em>reactive after detection</em>.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson124() {
  return (
    <>
      <Lead>
        Where GuardDuty asks “is someone attacking us?”, Inspector asks “are we
        soft?” — scanning operating systems, container images, and Lambda
        dependencies for known vulnerabilities and network exposure.
      </Lead>

      <H2>The three scan surfaces</H2>
      <KeyTable
        head={["Surface", "Mechanism", "Finds"]}
        rows={[
          ["Amazon EC2", "Works through the SSM agent — no extra agent to deploy", "Package CVEs, plus network reachability issues (exposed ports reachable from the internet)"],
          ["Amazon ECR", "Scans container images — basic on-push, or enhanced continuous rescanning as new CVEs publish", "Vulnerable packages and language dependencies inside images"],
          ["AWS Lambda", "Scans function code and dependency layers on deployment", "Vulnerable libraries in the deployment package"],
        ]}
      />
      <P>
        Findings carry severity, CVSS-style scores, and the affected resource,
        and can be filtered by criteria like “internet-reachable instance with
        a critical CVE” — the prioritization signal patch-management workflows
        run on.
      </P>

      <H2>Inspector vs its neighbors — a distinction the exam draws often</H2>
      <KeyTable
        head={["Question shape", "Answer"]}
        rows={[
          ["“Scanners found outdated OpenSSL on our instances — which service reported this?”", "Inspector"],
          ["“Alert when instances communicate with botnet C2 servers”", "GuardDuty"],
          ["“Continuously rescan container images when new CVEs are published”", "ECR enhanced scanning (Inspector-powered)"],
          ["“Discover PII stored in S3”", "Macie"],
          ["“Single severity-rated compliance view across accounts”", "Security Hub"],
        ]}
      />
      <Callout type="tip">
        Inspector findings and GuardDuty findings both flow into{" "}
        <strong>Security Hub</strong>, which is why “centralize and prioritize
        security findings from Inspector and GuardDuty” is a Security Hub
        answer — the individual services remain the generators.
      </Callout>

      <H2>Operational flow</H2>
      <UL
        items={[
          <>
            Enable Inspector once at the account (or delegated administrator
            level); EC2 scanning requires instances to have the{" "}
            <strong>SSM agent running with an instance profile</strong> — a
            detail questions use as a distractor.
          </>,
          <>
            Findings publish to <strong>EventBridge</strong> for automation
            (open a ticket, notify the owner, quarantine) and to{" "}
            <strong>Security Hub</strong> for aggregation.
          </>,
          <>
            For containers, pair scan-on-push with CI gating: block deployment
            when critical findings appear in the image being promoted.
          </>,
        ]}
      />
      <Callout type="exam">
        Distinguish scanning from patching: Inspector <em>reports</em>
        vulnerable packages; the actual remediation is Systems Manager Patch
        Manager or a rebuilt image. Questions frequently pair “Inspector
        reports the vulnerability” with “Patch Manager fixes it.”
      </Callout>

      <H2>SBOM exports — the software bill of materials</H2>
      <UL
        items={[
          <>
            Inspector can export a <strong>CycloneDX-formatted SBOM</strong>{" "}
            per scanned resource — the machine-readable inventory of every
            package and version inside an instance, image, or function.
          </>,
          <>
            SBOMs feed procurement and compliance reviews (“prove this image
            contains no GPL-3.0 packages”) without re-scanning — export
            once, answer many audits.
          </>,
          <>
            Pair with ECR enhanced scanning: every pushed image gets both a
            vulnerability verdict <em>and</em> an exportable SBOM.
          </>,
        ]}
      />
    </>
  );
}
