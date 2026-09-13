import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { CrossAccountFlowDiagram, CognitoFlowDiagram, IdentityCenterDiagram, IdentityTypesDiagram, PolicyEvaluationDiagram } from "@/components/lesson/diagrams";

/** Section 1.1 lessons — part A (1.1.1–1.1.4). Original content. */

export function Lesson111() {
  return (
    <>
      <Lead>
        Everything in AWS identity starts with four primitives: users, groups,
        roles, and the policies that grant permissions. Every secure-access
        question on the exam is a variation of “which identity should hold
        which policy, and where should that policy be attached?”
      </Lead>

      <H2>The four identity primitives</H2>
      <P>
        An <strong>IAM user</strong> is a permanent identity with long-lived
        credentials — a password for console access and, optionally, access key
        pairs for API access. Because those keys never expire until rotated,
        users are the identity type you should <em>avoid</em> for almost every
        modern use case: humans should federate in through a workforce identity
        provider, and workloads should assume roles.
      </P>
      <P>
        An <strong>IAM group</strong> is a container <em>for users only</em>.
        Policies attached to a group apply to every member. Groups cannot
        contain other groups, cannot be assumed by workloads, and cannot be
        referenced as a principal in resource policies. Their whole job is
        letting you manage permissions once instead of per person.
      </P>
      <P>
        An <strong>IAM role</strong> is an identity that nobody “is” — it is
        something you <em>assume</em>. Assuming a role returns temporary
        security credentials from the Security Token Service (STS) consisting
        of an access key ID, a secret key, and a session token, all of which
        expire automatically. A role has two policies: a{" "}
        <strong>trust policy</strong> that defines <em>who may assume it</em>{" "}
        (an IAM user, an AWS service, another account, a federated identity),
        and <strong>permissions policies</strong> that define what the session
        can do once assumed.
      </P>

      <Diagram title="IAM identities and where policies attach" caption="Groups hold users; roles are assumed; policies attach to all three; resource policies attach to the resource.">
        <IdentityTypesDiagram />
      </Diagram>

      <H2>Policy types and where they attach</H2>
      <P>
        Policies are JSON documents of Allow/Deny statements over{" "}
        <Code>Action</Code>, <Code>Resource</Code>, and{" "}
        <Code>Condition</Code> elements. Where a policy is attached determines
        which evaluation path it takes:
      </P>
      <KeyTable
        head={["Policy type", "Attached to", "Can allow?", "Can deny?", "Typical exam use"]}
        rows={[
          ["Identity policy (managed/inline)", "User, group, or role", "Yes", "Yes", "Granting a role or team its permissions"],
          ["Resource-based policy", "The resource (S3 bucket, KMS key, SQS queue, secret…)", "Yes (many services)", "Yes", "Cross-account access without roles; blocking insecure requests"],
          ["Permissions boundary", "User or role", "No — ceilings only", "Yes (by omission + explicit deny)", "Capping what delegated admins can ever grant"],
          ["Session policy", "Passed at AssumeRole time", "No — narrows only", "Yes", "Further restricting one federated or assumed session"],
          ["Service control policy (SCP)", "OU / account in Organizations", "No — ceilings only", "Yes", "Organization-wide guardrails (Regions, root actions)"],
          ["Access control list (ACL)", "Legacy; S3 only remaining", "Yes (cross-account only)", "No", "Effectively retired — know it exists"],
        ]}
      />
      <Callout type="note">
        <P>
          <strong>Managed vs inline.</strong> A <em>managed</em> policy is a
          standalone object you attach to many identities and update once; an{" "}
          <em>inline</em> policy is embedded in a single identity and must be
          edited in place. For anything shared, customer managed policies (or
          the CDK/IaC equivalent) win on consistency; inline policies are for
          genuinely one-off cases.
        </P>
      </Callout>

      <H2>Roles vs users — the decision that appears everywhere</H2>
      <UL
        items={[
          <>
            A Lambda function, ECS task, or EC2 instance should use a{" "}
            <strong>role</strong> (via the execution role, task role, or
            instance profile). Credentials arrive automatically and rotate.
          </>,
          <>
            A mobile or SPA application end user should federate through{" "}
            <strong>Cognito identity pools</strong> — never an embedded IAM
            user.
          </>,
          <>
            A third party that needs occasional access gets a{" "}
            <strong>cross-account role</strong> or a presigned URL, not an IAM
            user.
          </>,
          <>
            A human employee should use <strong>IAM Identity Center</strong>{" "}
            federation, not an IAM user.
          </>,
        ]}
      />
      <Callout type="exam">
        When a question shows access keys in code, a config file, or an
        environment file — the answer is almost always “replace the IAM user
        with a role.” When it shows a group being asked to do something groups
        cannot do (assume a role, hold resource policies) — re-read it, because
        that is usually the trap.
      </Callout>

      <H2>Least privilege in practice</H2>
      <P>
        Least privilege is not a one-shot design; it is a loop. Grant a working
        scope, watch what the identity actually uses (IAM Access Advisor, or
        Access Analyzer’s policy generation from CloudTrail), then narrow. The
        exam tests the loop’s endpoints: know that{" "}
        <strong>Access Advisor</strong> shows which services a role last used,
        and that <strong>Access Analyzer policy generation</strong> drafts a
        least-privilege policy from actual CloudTrail activity for you to
        review.
      </P>
    </>
  );
}

export function Lesson112() {
  return (
    <>
      <Lead>
        Nearly every “why was I denied?” question reduces to one mental model:
        requests start implicitly denied, explicit denies beat everything, and
        at least one explicit allow must survive the whole policy stack.
      </Lead>

      <Diagram title="How AWS decides — full evaluation path" caption="Follow the request down. Every branch to the right is a final DENIED.">
        <PolicyEvaluationDiagram />
      </Diagram>

      <H2>The four rules that answer almost every question</H2>
      <UL
        items={[
          <>
            <strong>Explicit deny wins.</strong> A Deny in an SCP, a resource
            policy, or an identity policy ends evaluation, no matter how many
            Allows exist elsewhere.
          </>,
          <>
            <strong>Implicit deny is the default.</strong> Silence is not
            permission: with no matching Allow anywhere, the request fails.
          </>,
          <>
            <strong>Same account:</strong> an Allow in <em>either</em> the
            identity policy <em>or</em> the resource policy is sufficient.
          </>,
          <>
            <strong>Different accounts:</strong> the caller’s side{" "}
            <em>and</em> the resource side must both allow, and neither side
            may deny.
          </>,
          <>
            <strong>Multiple identity policies are a union.</strong> A user
            with three attached policies can do anything{" "}
            <em>any one</em> of them allows — you cannot subtract with a
            second policy, only with a Deny or a ceiling.
          </>,
        ]}
      />
      <Callout type="note">
        Ceilings also have attachment rules worth memorizing:{" "}
        <strong>permissions boundaries attach only to users and roles</strong>{" "}
        (never groups or service-linked roles), while SCPs attach to OUs and
        accounts in Organizations. When a question asks how to stop developers
        who <em>can create roles</em> from escalating privileges, the pair is a{" "}
        <strong>permissions boundary on their roles plus scoped iam:PassRole</strong>{" "}
        — boundaries and PassRole scoping are the two halves of the same defense.
      </Callout>

      <H2>Condition keys that appear constantly</H2>
      <P>
        Condition keys turn policies from static grants into contextual rules.
        These are the ones the exam reaches for again and again — several are
        rarely taught in courses but appear directly in answer options:
      </P>
      <KeyTable
        head={["Condition key", "What it tests", "Classic exam pattern"]}
        rows={[
          ["aws:PrincipalOrgID", "Is the caller from my organization?", "Bucket/key policy allowing every org account without listing them"],
          ["aws:ResourceOrgID", "Does the target resource belong to my org?", "SCP denying S3 PutObject to any bucket outside the org (exfiltration block)"],
          ["aws:PrincipalIsAWSService", "Is the caller an AWS service acting on your behalf?", "Deny s3:PutObject unless principal is an org member OR an AWS service — keeps service-driven replication working while blocking humans"],
          ["aws:ViaService", "Which service made the call on the principal's behalf?", "KMS key usable only when called via sns.amazonaws.com or s3.amazonaws.com"],
          ["aws:SecureTransport", "Did the request arrive over TLS?", "S3 bucket policy Deny when false — enforce HTTPS everywhere"],
          ["aws:SourceVpce / aws:SourceIp", "Network path of the request", "Bucket policy allowing access only through the approved VPC endpoint or office ranges"],
          ["aws:MultiFactorAuthPresent", "Did this session authenticate with MFA?", "Deny iam:* and sensitive actions when false"],
          ["aws:RequestedRegion", "Which Region is targeted?", "SCP allow-listing approved Regions organization-wide"],
        ]}
      />
      <Callout type="exam">
        The least-taught but most-tested of these is{" "}
        <strong>aws:PrincipalIsAWSService</strong>. A blunt Deny on
        non-org principals silently breaks service-driven features (replication,
        EventBridge deliveries, log delivery) — the correct data-perimeter
        policy always carves AWS services out with{" "}
        <Code>Bool aws:PrincipalIsAWSService true</Code> alongside the org
        condition. If an answer option mentions it, take it seriously.
      </Callout>

      <H2>Ceilings: SCPs, boundaries, and session policies</H2>
      <P>
        Three policy types do <em>not</em> grant anything — they only limit.
        A <strong>service control policy</strong> attached in Organizations
        sets the maximum permissions for every principal in member accounts,
        including the account root user (but never principals in the
        management account itself). A{" "}
        <strong>permissions boundary</strong> attached to a user or role caps
        that identity no matter what its permission policies say — the classic
        use is delegating administration safely. A{" "}
        <strong>session policy</strong> is passed when assuming a role and
        narrows only that one session.
      </P>
      <P>
        When a ceiling is present, the effective permission is the{" "}
        <em>intersection</em>: an action must be allowed by the identity
        policies <em>and</em> survive every ceiling in the chain. This is why
        “the IAM policy allows it but the request still fails” is such a common
        real-world complaint — and such a common exam answer.
      </P>

      <H2>Same-account vs cross-account — the subtle one</H2>
      <KeyTable
        head={["Scenario", "What is enough"]}
        rows={[
          ["Same account, no resource policy", "Allow in the identity policy"],
          ["Same account, resource has a resource policy", "Allow in identity policy OR resource policy (no Deny anywhere)"],
          ["Cross-account", "Allow on the caller side AND allow on the resource side; no explicit Deny on either"],
          ["KMS-encrypted resource cross-account", "All of the above PLUS kms grants via the key policy on the source key"],
          ["Whole organization should read a bucket/key", "Resource policy condition on aws:PrincipalOrgID — covers future accounts automatically"],
        ]}
      />
      <Callout type="exam">
        The KMS row is the favorite trap: a bucket policy and IAM policy can be
        perfect and the request still fails with Access Denied because the
        caller lacks <Code>kms:Decrypt</Code> on the key that encrypted the
        object. When you see “S3 works in dev, fails in prod with identical
        policies,” look for the key.
      </Callout>

      <H3>The KMS half everyone forgets — even in the same account</H3>
      <P>
        KMS adds a rule that surprises people: an IAM policy alone is{" "}
        <em>never</em> enough to use a key. Every KMS key must have a{" "}
        <strong>key policy</strong> that exists and delegates control to IAM
        (the <Code>EnableIAM</Code> statement allowing{" "}
        <Code>kms:*</Code> to the account root delegation). If that statement
        is removed from a custom key policy, IAM policies stop working for the
        key entirely — even same-account principals get Access Denied with a
        perfectly normal IAM setup. The exam tests this as “why do IAM
        permissions not apply to this key?”
      </P>

      <H2>Debugging denials like the exam expects</H2>
      <UL
        items={[
          <>
            CloudTrail shows <em>who</em> called <em>what</em> and the exact
            error; the event history includes the denied request.
          </>,
          <>
            IAM Access Analyzer’s <strong>policy checks</strong> and the{" "}
            <strong>policy simulator</strong> let you test decisions before
            deploying changes.
          </>,
          <>
            For S3 specifically, enabling CloudTrail data events captures
            object-level denies with full principal context.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson113() {
  return (
    <>
      <Lead>
        The root user can do things nothing else can — and therefore must be
        treated like the master key to the building: locked away, alarmed, and
        never carried around.
      </Lead>

      <H2>What only root can do</H2>
      <P>
        Most root powers have IAM equivalents, but a short list remains
        root-only: closing the AWS account, changing the account’s support
        plan, activating IAM access to the Billing console, restoring an
        IAM user’s permissions after they revoked their own access, setting
        the account’s alternate contacts, and a handful of tax and Reserved
        Instance marketplace operations. The exam checks that you reach for
        root only when a task from this list appears.
      </P>

      <H2>The hardening checklist</H2>
      <UL
        items={[
          <>
            Enable <strong>MFA</strong> on the root user — hardware or virtual
            device.
          </>,
          <>
            <strong>Delete root access keys.</strong> The root user should have
            none; API work never runs as root.
          </>,
          <>
            Create administrative identities elsewhere (Identity Center
            permission sets) and do the day-to-day work with them.
          </>,
          <>
            Keep the root email unique, accessible, and protected by the
            corporate mail system’s strongest controls.
          </>,
          <>
            In member accounts of an Organization, an SCP can even restrict
            what root does — a guardrail worth knowing, though it cannot apply
            to the management account.
          </>,
        ]}
      />
      <Callout type="warn">
        Deactivating MFA, deleting the MFA device, or unlocking IAM-protected
        actions are root-level operations. If your MFA device is lost, account
        recovery goes through support — which is exactly why the root email and
        phone must stay under control.
      </Callout>

      <H2>Break-glass, done properly</H2>
      <P>
        Even a hardened root is used a few times a year. The pattern the exam
        and real life agree on: store the root credentials (and MFA seed) in a
        sealed, dual-control vault; document the narrow list of root-only
        tasks; and — critically — <strong>alarm on every root usage</strong>.
        Any sign-in or API call by the root user should publish a CloudTrail
        event that an EventBridge rule turns into an immediate SNS/Lambda
        notification, because legitimate root activity should be rare enough
        that every notification deserves eyes.
      </P>
      <Callout type="exam">
        Expect the question shape “which combination secures the root user?” —
        the correct pairing is <strong>MFA enabled + access keys deleted</strong>,
        with day-to-day administration delegated to IAM/Identity Center
        identities.
      </Callout>

      <H2>Account-level identity hygiene</H2>
      <UL
        items={[
          <>
            Use the <strong>IAM credential report</strong> to audit password
            and key ages across all users at once.
          </>,
          <>
            Enforce password policy (length, rotation, reuse) at the account
            level; better yet, remove local passwords entirely via federation.
          </>,
          <>
            Set <strong>alternate contacts</strong> (billing, operations,
            security) so critical notifications reach teams, not one inbox.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson114() {
  return (
    <>
      <Lead>
        IAM Identity Center is the modern answer to “how do 5,000 employees get
        the right access to the right accounts?” One identity store, one
        portal, permissions defined once and assigned everywhere.
      </Lead>

      <Diagram title="IAM Identity Center federation flow" caption="The corporate IdP owns credentials; Identity Center owns AWS assignments.">
        <IdentityCenterDiagram />
      </Diagram>

      <H2>How the pieces fit</H2>
      <UL
        items={[
          <>
            <strong>Identity source.</strong> Identity Center can be its own
            directory, sync with Microsoft AD, or federate to an external IdP
            (Okta, Entra ID) using SAML for sign-in and SCIM for automated
            user/group lifecycle.
          </>,
          <>
            <strong>Permission sets.</strong> A permission set is a template of
            IAM policies — for example “DatabaseAdmin”. When a user visits an
            account, Identity Center provisions a corresponding IAM role in
            that account on the fly.
          </>,
          <>
            <strong>Assignments.</strong> You assign a group + permission set
            to accounts (or OUs). The access portal then simply lists the
            accounts and roles that user may enter.
          </>,
        ]}
      />
      <Callout type="tip">
        Because assignments can target an OU, a new account dropped into
        Production automatically grants the existing teams their roles there —
        no per-account IAM work.
      </Callout>

      <H2>Where Identity Center sits among the alternatives</H2>
      <KeyTable
        head={["Need", "Right tool"]}
        rows={[
          ["Employees signing into AWS accounts", "IAM Identity Center (workforce SSO)"],
          ["Application end users signing into your product", "Cognito user pools"],
          ["Federated machine/workload outside AWS calling AWS APIs", "IAM Roles Anywhere (X.509-based)"],
          ["A handful of admins in one account, no IdP", "IAM users/groups remain workable"],
        ]}
      />
      <Callout type="exam">
        The wording to watch: <strong>“single sign-on across multiple AWS
        accounts with credentials owned by the corporate directory”</strong> —
        that is Identity Center with external federation (SAML + SCIM). If the
        question instead says “customers of my web application,” that is
        Cognito territory.
      </Callout>

      <H2>Operational details worth knowing</H2>
      <UL
        items={[
          <>
            Permission sets can carry session duration limits and relay state;
            they materialize as roles named{" "}
            <Code>AWSReservedSSO_&lt;permission-set&gt;</Code> on first use.
          </>,
          <>
            SCIM provisioning keeps joins/leavers synchronized automatically —
            disable a user in Okta and their portal access dies with it.
          </>,
          <>
            If the external IdP is Microsoft Active Directory, Identity Center
            can connect via AD Connector or Managed Microsoft AD trust instead
            of full SAML federation.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson115() {
  return (
    <>
      <Lead>
        Cognito confuses people because it is two services wearing one name.
        A <strong>user pool</strong> is an authentication server. An{" "}
        <strong>identity pool</strong> is an AWS-credential vending machine.
        Deciding which one a question wants is one of the most repeated exam
        tasks.
      </Lead>

      <Diagram title="User pools authenticate; identity pools authorize against AWS" caption="A user pool alone never grants AWS credentials — that is the identity pool's job.">
        <CognitoFlowDiagram />
      </Diagram>

      <H2>User pools — authentication for your application</H2>
      <UL
        items={[
          <>
            Own the user directory: sign-up, sign-in, password reset, email/SMS
            verification.
          </>,
          <>
            Provide <strong>hosted UI</strong> pages, MFA, adaptive security
            (compromised-credential detection), and Lambda triggers at
            lifecycle points.
          </>,
          <>
            Federate social providers (Google, Facebook, Apple) and corporate
            SAML/OIDC IdPs into one app-facing directory.
          </>,
          <>
            Issue <strong>JWTs</strong>: an ID token (who the user is), an
            access token (what they may call), and a refresh token (how they
            renew).
          </>,
        ]}
      />

      <H2>Identity pools — temporary AWS credentials</H2>
      <P>
        An identity pool accepts tokens from trusted sources (a Cognito user
        pool, Google, Facebook, SAML, or even unauthenticated “guest”
        identities) and exchanges them for <strong>temporary AWS
        credentials</strong> via STS. Authenticated users assume roles you
        define; per-user isolation comes from policy variables such as{" "}
        <Code>$&#123;cognito-identity.amazonaws.com:sub&#125;</Code> scoping
        an S3 prefix to that one user.
      </P>

      <KeyTable
        head={["Requirement in the question", "Answer"]}
        rows={[
          ["Users sign in with Google/Facebook/email", "User pool (federation) — or identity pool if AWS access follows"],
          ["App uploads directly to S3 with temporary credentials", "Identity pool (fed by a user pool or external IdP)"],
          ["Per-user S3 prefix isolation", "Identity pool + policy variable scoping"],
          ["MFA, hosted sign-in pages, adaptive security", "User pool advanced security"],
          ["Guest (unauthenticated) access to AWS resources", "Identity pool unauthenticated role"],
        ]}
      />
      <Callout type="exam">
        The decisive phrase is <strong>“temporary AWS credentials.”</strong>{" "}
        Identity pools. If the question only involves sign-in for your
        application’s own APIs, a user pool is enough — adding an identity pool
        would be the wrong, over-scoped answer.
      </Callout>
    </>
  );
}

export function Lesson116() {
  return (
    <>
      <Lead>
        Cross-account access has exactly two mechanisms — assume a role, or use
        a resource policy — and the exam wants you to pick the right one, know
        the four-step role flow cold, and recognize the confused-deputy trap
        that the external ID exists to stop.
      </Lead>

      <Diagram title="Cross-account access via role assumption" caption="Two accounts, one trust policy, one external ID, temporary credentials that expire.">
        <CrossAccountFlowDiagram />
      </Diagram>

      <H2>The four-step role assumption flow</H2>
      <UL
        items={[
          <>
            <strong>Caller side.</strong> The principal’s identity policy allows{" "}
            <Code>sts:AssumeRole</Code> on the target role ARN — optionally
            conditioned on the external ID.
          </>,
          <>
            <strong>Trust side.</strong> The target role’s trust policy allows
            that principal (a specific role/user ARN, or an account root to
            delegate further control to that account) and may require
            conditions such as MFA or the external ID.
          </>,
          <>
            <strong>STS evaluates</strong> both halves and returns temporary
            credentials valid for the session duration.
          </>,
          <>
            <strong>API calls happen</strong> with those credentials; every
            action is attributed in CloudTrail to the assumed-role session,
            giving per-customer audit trails for providers.
          </>,
        ]}
      />

      <H2>Resource policies — the lighter mechanism</H2>
      <P>
        Many services (S3, KMS, SQS, SNS, Secrets Manager, ECR, Kinesis) accept
        resource-based policies that can name principals from other accounts
        directly. For a simple “Account A’s pipeline role reads this one
        bucket,” a bucket policy is lighter than a role: no second identity
        hop, and the Deny capability of bucket policies is a bonus. The
        decision rule: <strong>use a resource policy for narrow, static
        access to a specific resource; use a role when the third party needs
        broad, session-based, or service-administered access.</strong>
      </P>
      <Callout type="warn">
        Cross-account is stricter than same-account: <em>both</em> sides must
        allow. A bucket policy allowing Account A is worthless if A’s IAM
        policy denies the read — and vice versa.
      </Callout>

      <H2>The confused deputy and the external ID</H2>
      <P>
        Picture a monitoring vendor that serves 500 customers, each with an
        identical role ARN in their account (arn:aws:iam::&lt;customer&gt;:role/VendorAgent).
        If the vendor’s own environment is compromised, those credentials could
        be replayed against <em>another</em> customer’s role ARN — the vendor
        is the “confused deputy.” The fix is the{" "}
        <strong>external ID</strong>: each customer picks a secret string, puts
        it in the trust policy condition, and the vendor includes it in every
        AssumeRole call. Because the ID is unique per customer, stolen
        customer-A credentials cannot authenticate against customer-B’s role.
      </P>
      <Callout type="exam">
        Any question describing <strong>a third party that assumes roles in
        multiple customer accounts</strong> is fishing for the external ID.
        The phrase “prevent the confused deputy problem” makes it explicit.
      </Callout>

      <H2>Choosing: role vs resource policy vs both</H2>
      <KeyTable
        head={["Situation", "Pattern"]}
        rows={[
          ["Vendor/auditor needs session-based access to many resources", "Cross-account role + external ID"],
          ["One role needs to read one bucket/queue/key", "Resource policy on the target resource"],
          ["KMS-encrypted data cross-account", "Resource policy AND key policy must both allow; decrypt follows the key"],
          ["Third party must never touch IAM", "Resource policy (no ability to escalate) or a role with a permissions boundary"],
        ]}
      />
    </>
  );
}
