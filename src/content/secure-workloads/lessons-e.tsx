import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { SsmSessionDiagram, Sigv4FlowDiagram } from "@/components/lesson/diagrams-1-2";

/** Section 1.2 lessons — part E (1.2.16–1.2.18). Original content. */

export function Lesson1216() {
  return (
    <>
      <Lead>
        Workloads outside AWS — bare-metal servers, edge sites, third-party
        CI/CD runners — traditionally got long-lived IAM users with static
        keys. Two federation mechanisms delete those keys from the picture
        entirely.
      </Lead>

      <H2>IAM Roles Anywhere — X.509-based workload identity</H2>
      <UL
        items={[
          <>
            You register a <strong>trust anchor</strong> — the certificate of a
            certificate authority you control (AWS Private CA works naturally).
          </>,
          <>
            Servers run the <strong>Credentials Provider Agent</strong>, which
            presents a per-workload X.509 certificate and receives temporary
            role credentials — exactly like an EC2 instance profile, for
            non-EC2 machines.
          </>,
          <>
            A <strong>profile</strong> defines which role and session policies
            apply, and trust policies can enforce attributes from the
            certificate (like a serial number or subject) via condition keys.
          </>,
          <>
            Certificates rotate on your PKI schedule; no AWS secret ever sits
            on the server.
          </>,
        ]}
      />

      <H2>OIDC federation for CI/CD pipelines</H2>
      <P>
        GitHub Actions, GitLab, and other SaaS pipelines get the same
        treatment through <strong>OIDC federation</strong>: the pipeline’s
        provider is registered as an OIDC identity provider in IAM, and a role
        trusts tokens issued to that specific repository and branch
        (conditions on <Code>token.actions.githubusercontent.com:sub</Code>).
        The pipeline exchanges its short-lived job token for scoped AWS
        credentials. The static deploy key with admin-ish permissions
        disappears from the repository’s secret store.
      </P>

      <KeyTable
        head={["Scenario", "Mechanism"]}
        rows={[
          ["Bare-metal/edge servers call AWS APIs", "IAM Roles Anywhere (X.509 trust anchor + agent)"],
          ["GitHub Actions deploys to AWS", "OIDC federation role with repo/branch conditions"],
          ["EKS pods call AWS", "IRSA — service account to IAM role via the cluster OIDC provider"],
          ["Legacy app can’t use any federation yet", "IAM user keys as a transitional state — scoped hard, rotated, scheduled for removal"],
        ]}
      />
      <Callout type="exam">
        The phrase <strong>“without storing long-lived access keys on
        servers/pipelines”</strong> is the fingerprint. Bare metal → Roles
        Anywhere; SaaS CI/CD → OIDC federation; both replace the “rotate the
        IAM user keys” anti-pattern the wrong answer offers.
      </Callout>
    </>
  );
}

export function Lesson1217() {
  return (
    <>
      <Lead>
        The old pattern — bastion host, SSH keys, open port 22 — fails every
        audit. The modern pattern is Systems Manager Session Manager:
        IAM-authorized, brokered, fully logged shell access with zero inbound
        ports, paired with IMDSv2 so instance metadata itself resists attack.
      </Lead>

      <Diagram title="Session Manager and IMDSv2" caption="One outbound channel, IAM as the gatekeeper, logs as the audit trail.">
        <SsmSessionDiagram />
      </Diagram>

      <H2>Session Manager mechanics</H2>
      <UL
        items={[
          <>
            Instances need the <strong>SSM agent</strong> and an instance
            profile with <Code>AmazonSSMManagedInstanceCore</Code> — the two
            prerequisites exam options probe.
          </>,
          <>
            The agent makes an <strong>outbound</strong> connection to the SSM
            service; sessions broker over TLS. Private-subnet instances work
            via NAT or SSM interface endpoints — no internet, no bastion.
          </>,
          <>
            Sessions log to <strong>S3 or CloudWatch Logs</strong> (encryptable
            with KMS), and CloudTrail records who started which session on
            which instance.
          </>,
          <>
            Beyond shells: <strong>port forwarding</strong> reaches private
            databases for GUI clients; <strong>Run Command</strong> executes
            fleet-wide operations; <strong>State Manager</strong> keeps agent
            configuration consistent.
          </>,
        ]}
      />

      <H2>IMDSv2 — closing the metadata loophole</H2>
      <P>
        Instance metadata (including the role’s temporary credentials) is
        served on a link-local address that any code on the instance can
        reach — which is exactly what SSRF attacks exploit. IMDSv2 changes the
        protocol: clients must first <strong>PUT</strong> a request for a
        session token, and that token authorizes metadata reads. Setting{" "}
        <Code>HttpTokens=required</Code> in the instance metadata options
        disables the old request-response path entirely, and the{" "}
        <strong>hop limit of 1</strong> prevents tokens from leaving the
        instance through a forwarded request.
      </P>
      <Callout type="exam">
        <strong>“Shell access without SSH keys, bastion hosts, or inbound
        ports, with full session logging”</strong> → Session Manager.{" "}
        <strong>“Prevent compromised application code from reading instance
        role credentials”</strong> → require IMDSv2. If an option mentions
        “disable IMDS” — wrong: the instance profile mechanism needs it; the
        fix is protocol hardening, not removal.
      </Callout>

      <H2>The access-path decision table</H2>
      <KeyTable
        head={["Need", "Use"]}
        rows={[
          ["Interactive shell, audited", "Session Manager"],
          ["One command across 500 instances", "SSM Run Command"],
          ["Tunnel a GUI to a private database", "Session Manager port forwarding"],
          ["Debug an instance that can’t boot", "EC2 Serial Console"],
          ["Quick one-time SSH-like access with temporary keys", "EC2 Instance Connect (still SSH underneath)"],
        ]}
      />
    </>
  );
}

export function Lesson1218() {
  return (
    <>
      <Lead>
        Every AWS API call you make is signed with SigV4 — and understanding
        that signature is what demystifies raw HTTP integrations, presigned
        flows, cross-service IAM authorization, and a family of
        “AuthorizationHeaderMalformed” exam scenarios.
      </Lead>

      <Diagram title="The SigV4 signing process" caption="Four deterministic steps; the service derives the same key and compares.">
        <Sigv4FlowDiagram />
      </Diagram>

      <H2>What actually gets signed</H2>
      <UL
        items={[
          <>
            The <strong>canonical request</strong> normalizes the HTTP call:
            method, path, sorted query parameters, selected headers, and the{" "}
            <em>hash of the payload</em> — which is why a tampered body fails
            the signature.
          </>,
          <>
            The <strong>credential scope</strong> binds the signature to a
            date, Region, and service — a signature from one Region is invalid
            in another.
          </>
          ,
          <>
            The <strong>signing key</strong> is an HMAC chain from the secret
            key through date, Region, and service — never transmitted.
          </>,
          <>
            With temporary credentials, the <strong>session token</strong>{" "}
            rides in <Code>X-Amz-Security-Token</Code> and is part of what the
            service validates.
          </>,
        ]}
      />
      <Callout type="warn">
        Time matters: a skewed clock produces{" "}
        <Code>SignatureDoesNotMatch</Code> or{" "}
        <Code>RequestTimeTooSkewed</Code>. The classic broken-SDK exam setup —
        “calls fail with signature errors after moving to another Region” — is
        a wrong credential scope, not a broken key.
      </Callout>

      <H2>Service-to-service authorization patterns</H2>
      <KeyTable
        head={["Pattern", "How identity flows"]}
        rows={[
          ["Service assumes a role and calls another service", "SigV4 with the role’s temporary credentials; aws:CalledVia tracks the chain"],
          ["EventBridge API destination → partner endpoint", "SigV4 signed with a role you designate"],
          ["ECS/EKS/Lambda → S3, DynamoDB, queues", "Task/pod/execution roles; SigV4 automatic in SDKs"],
          ["VPC Lattice / App Mesh service-to-service", "IAM or mTLS (private CA certs) at the mesh layer"],
          ["Third-party HTTP endpoint", "API destinations with API-key auth — SigV4 is AWS-to-AWS only"],
        ]}
      />
      <P>
        The <Code>aws:CalledVia</Code> condition key deserves its moment: when
        CloudTrail triggers a Lambda that writes to DynamoDB, policies can
        require (or deny) actions based on the chain of services that made the
        call — attribution across hops, a rarely-taught condition the exam
        borrows for “only allow writes that originated from CloudTrail”
        questions.
      </P>
      <Callout type="exam">
        <strong>“Requests must be authenticated with temporary credentials
        without embedding secrets”</strong> → SigV4 signing with STS
        credentials (SDKs do this automatically). <strong>“Signature invalid
        after moving workloads between Regions”</strong> → credential scope
        Region mismatch.
      </Callout>
    </>
  );
}
