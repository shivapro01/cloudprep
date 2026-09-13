import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { ControlTowerDiagram, SessionChainDiagram } from "@/components/lesson/diagrams";

/** Section 1.1 lessons — part C (1.1.10–1.1.12). Original content. */

export function Lesson1110() {
  return (
    <>
      <Lead>
        AWS Control Tower is Organizations plus an opinionated landing zone:
        the account structure, central logging, guardrails, and an account
        vending machine — set up once, inherited by every account created
        after.
      </Lead>

      <Diagram title="Control Tower landing zone" caption="The default structure Control Tower creates, with guardrails flowing down from the management account.">
        <ControlTowerDiagram />
      </Diagram>

      <H2>What the landing zone gives you on day one</H2>
      <UL
        items={[
          <>
            A <strong>management account</strong> reserved for governance and
            billing, with no workloads.
          </>,
          <>
            A <strong>Security OU</strong> containing the Log Archive account
            (centralized CloudTrail/Config delivery) and the Audit account
            (read-only security tooling access).
          </>,
          <>
            Workload and Sandbox OUs where vended accounts land, each
            enveloped by guardrails.
          </>,
          <>
            Centralized <strong>CloudTrail</strong> and{" "}
            <strong>Config</strong> aggregation into the security accounts, so
            audit trails exist before the first workload does.
          </>,
        ]}
      />

      <H2>Guardrails: the three flavors</H2>
      <KeyTable
        head={["Guardrail type", "Mechanism", "Behavior"]}
        rows={[
          ["Proactive", "CloudFormation Hooks / IaC checks", "Blocks noncompliant resources at provisioning time"],
          ["Preventive", "Service control policies", "Continuously disallows actions in member accounts"],
          ["Detective", "AWS Config rules", "Flags existing noncompliance for remediation"],
        ]}
      />
      <P>
        The <strong>Account Factory</strong> is the vending machine: request an
        account with a name, email, and OU, and Control Tower provisions it
        with the baseline (network defaults optional, logging wired, guardrails
        inherited). Teams can even self-serve through Service Catalog.
      </P>
      <Callout type="exam">
        If a question says <strong>“provision new AWS accounts automatically
        with pre-approved baselines and guardrails”</strong> or mentions a{" "}
        <strong>landing zone</strong>, the answer is Control Tower. If it only
        needs multi-account billing plus policy ceilings with no vending
        experience, plain Organizations is enough.
      </Callout>

      <H2>Drift — when the baseline is edited behind Control Tower’s back</H2>
      <P>
        Because guardrails and enrolled resources are managed constructs,
        manual edits (an SCP deleted in the console, a Config recorder
        disabled, an account moved between OUs by hand) create{" "}
        <strong>drift</strong>. Control Tower detects drift on its dashboard;
        the fix is to re-enroll or repair so the baseline is authoritative
        again. The exam checks that you know drift detection exists and that
        the landing zone should remain the source of truth.
      </P>
    </>
  );
}

export function Lesson1111() {
  return (
    <>
      <Lead>
        STS is the reason modern AWS identity works: every role assumption,
        federation, and delegated session is a set of temporary credentials
        that expires on its own. Learn the credential triple, the assumption
        APIs, and how tags ride through session chains.
      </Lead>

      <Diagram title="Session tags surviving a role chain" caption="Transitive tags let ABAC conditions match two hops away.">
        <SessionChainDiagram />
      </Diagram>

      <H2>Anatomy of a temporary credential</H2>
      <P>
        Every STS response contains an access key ID, a secret access key, and
        a <strong>session token</strong> — the third element is what makes it
        temporary, tied to an expiry (15 minutes to 12 hours by default for
        roles, adjustable per role). Nothing to rotate, nothing to leak
        long-term: when the session ends, the credentials are simply dead.
      </P>

      <H2>The assumption APIs and when each applies</H2>
      <KeyTable
        head={["API", "Who uses it", "Distinguishing detail"]}
        rows={[
          ["AssumeRole", "Any principal with permission", "The workhorse: cross-account, MFA conditions, external ID, session tags"],
          ["AssumeRoleWithSAML", "Federated workforce users", "No AWS credentials needed — the SAML assertion is the proof"],
          ["AssumeRoleWithWebIdentity", "Mobile/SPA users via OIDC (Google, Facebook, Cognito internals)", "Powers identity pools and public-client federation"],
          ["GetSessionToken", "IAM users in MFA-protected sessions", "Temp credentials for an existing user; used to protect long-lived keys"],
          ["GetFederationToken", "Custom brokered federation", "Longer-lived federated sessions, gated by the calling IAM user"],
          ["DecodeAuthorizationMessage", "Support/debugging", "Translates obfuscated access-denied messages into readable policy context"],
        ]}
      />
      <Callout type="exam">
        The classic trap: <strong>GetSessionToken vs AssumeRole.</strong>{" "}
        GetSessionToken belongs to an existing <em>IAM user</em> (typically to
        require MFA for its API calls); AssumeRole creates a new identity
        context from a role. Questions about “MFA-protected API access for a
        user” want GetSessionToken; questions about cross-account or service
        access want AssumeRole.
      </Callout>

      <H2>Controlling sessions: duration, MFA, tags</H2>
      <UL
        items={[
          <>
            Each role defines a <strong>maximum session duration</strong>;
            callers may request less, never more.
          </>,
          <>
            Trust policies can demand <Code>aws:MultiFactorAuthPresent = true</Code>{" "}
            so only MFA-authenticated sessions may assume the role.
          </>,
          <>
            <strong>Session tags</strong> set at assumption enable ABAC; mark
            them <strong>transitive</strong> to survive role-chain hops. Passing
            tags also requires the target role’s trust policy to allow{" "}
            <Code>sts:TagSession</Code> — a second permission people forget.
          </>,
          <>
            <strong>Source identity</strong> (<Code>sts:SourceIdentity</Code>){" "}
            pins a persistent label (like the requesting employee’s name) onto
            the session — unlike tags it cannot be changed mid-session, which
            is exactly what auditors want for attribution.
          </>,
          <>
            Revocation is blunt by design: you cannot kill one live session
            mid-flight — rely on short durations, or change the trust/policy
            for future sessions.
          </>,
        ]}
      />
      <Callout type="note">
        Two more session facts the exam borrows from real incidents:{" "}
        <strong>assumed-role sessions cannot be named directly in resource
        policies</strong> — you grant access to the <em>role</em>, and every
        session from it inherits that grant; and{" "}
        <strong>role session names</strong> (<Code>RoleSessionName</Code>) are
        how CloudTrail attributes actions to individual humans behind a shared
        role, so set meaningful names and alarm on assumptions of sensitive
        roles.
      </Callout>
      <Callout type="warn">
        Deleting a user’s access keys does <em>not</em> invalidate temporary
        credentials already issued from them. Design exposure limits with short
        session durations, not with key deletion.
      </Callout>
    </>
  );
}

export function Lesson1112() {
  return (
    <>
      <Lead>
        Two services store secrets-shaped data. Secrets Manager is a rotation
        engine with a price tag; Parameter Store is a hierarchical config
        store that is free until you need advanced features. Picking
        correctly is a guaranteed exam question.
      </Lead>

      <H2>Secrets Manager — when rotation is the requirement</H2>
      <UL
        items={[
          <>
            <strong>Built-in rotation</strong> for RDS, Aurora, Redshift, and
            DocumentDB credentials via managed Lambda templates — including the
            alternating-user strategy that rotates without downtime.
          </>,
          <>
            <strong>Custom rotation</strong> for anything else through your own
            Lambda on a schedule.
          </>,
          <>
            <strong>Multi-Region replication</strong> of secrets for DR, with
            promotion on failover.
          </>,
          <>
            Access via IAM policies plus per-secret <strong>resource
            policies</strong>, every read auditable in CloudTrail.
          </>,
          <>
            Pricing: per secret per month plus per 10,000 API calls — the cost
            of the rotation machinery.
          </>,
        ]}
      />

      <H2>Parameter Store — hierarchy on a budget</H2>
      <UL
        items={[
          <>
            <strong>Hierarchical names</strong> like{" "}
            <Code>/app/prod/db/connection-string</Code> map naturally to
            environments and services, with IAM path scoping per team.
          </>,
          <>
            <strong>SecureString</strong> parameters encrypt values with KMS;
            plain strings stay free.
          </>,
          <>
            <strong>Standard parameters are free</strong>; the advanced tier
            (larger sizes, policies) charges.
          </>,
          <>
            <strong>Parameter policies</strong> (advanced tier) can expire
            values or trigger EventBridge events — useful for lease-style
            configuration.
          </>,
          <>
            Integration everywhere: EC2 user data, ECS task definitions,
            Lambda environment resolution, ECS Exec.
          </>,
        ]}
      />

      <KeyTable
        head={["Decision", "Answer"]}
        rows={[
          ["Database credentials that must rotate automatically", "Secrets Manager"],
          ["Third-party API key that the vendor rotates externally", "Parameter Store SecureString (rotation impossible anyway — save the cost)"],
          ["Feature flags / environment config with validation and staged rollout", "AppConfig (built on Parameter Store concepts)"],
          ["Per-environment hierarchical configuration, encrypted, no rotation", "Parameter Store SecureString"],
          ["Cross-Region secret copies for DR", "Secrets Manager replication"],
        ]}
      />
      <Callout type="exam">
        The word <strong>“rotation”</strong> (especially “automatic” or “zero
        downtime”) points to Secrets Manager. The words{" "}
        <strong>“hierarchical,” “least cost,”</strong> or{" "}
        <strong>“configuration values”</strong> point to Parameter Store.
        Questions describing values that <em>cannot</em> be auto-rotated still
        land on Parameter Store — you would pay Secrets Manager for machinery
        that never runs.
      </Callout>

      <H2>Consumption patterns worth knowing</H2>
      <UL
        items={[
          <>
            Fetch secrets <strong>once at initialization</strong> (Lambda init
            phase, container start) and cache — API calls cost money and add
            latency.
          </>,
          <>
            Cross-account secret access works through{" "}
            <strong>resource policies on the secret</strong>, not just IAM.
          </>,
          <>
            Both services encrypt with KMS — customer managed keys give you
            key-policy control and per-key CloudTrail attribution.
          </>,
        ]}
      />
    </>
  );
}
