import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { AbacDiagram, SessionChainDiagram } from "@/components/lesson/diagrams";

/** Section 1.1 lessons — part B (1.1.7–1.1.9). Original content. */

export function Lesson117() {
  return (
    <>
      <Lead>
        Attribute-based access control (ABAC) replaces “one policy per team”
        with “one policy that compares tags.” Onboard a team, tag their
        principals and resources, and the permissions simply exist — no policy
        edits, ever.
      </Lead>

      <Diagram title="One policy, matched by tags" caption="The green match allows; both mismatched pairs are implicitly denied by the same policy.">
        <AbacDiagram />
      </Diagram>

      <H2>The three tag sources a condition can read</H2>
      <KeyTable
        head={["Condition key", "Reads", "Example use"]}
        rows={[
          ["aws:PrincipalTag/<key>", "Tags on the calling identity (role/user)", "Who is asking — their team, environment, cost center"],
          ["aws:ResourceTag/<key>", "Tags on the target resource", "What is being touched — must belong to the same team"],
          ["aws:RequestTag/<key>", "Tags supplied in the API request", "Enforcing that Create tags resources correctly at birth"],
        ]}
      />
      <P>
        The signature ABAC pattern is the equality of the first two:{" "}
        <Code>aws:PrincipalTag/Team StringEquals aws:ResourceTag/Team</Code>.
        One policy now serves every team, because each request carries its own
        answer inside the tags.
      </P>

      <H2>Why ABAC beats the alternatives at scale</H2>
      <UL
        items={[
          <>
            <strong>Onboarding cost drops to zero:</strong> tag the new team’s
            roles and resources; nothing else changes.
          </>,
          <>
            <strong>Drift disappears:</strong> there are no per-team policies
            to fall out of sync — one shared policy, versioned once.
          </>,
          <>
            <strong>Cross-service consistency:</strong> many services support{" "}
            <Code>aws:ResourceTag</Code>, so the same condition idea extends
            from S3 to EC2, Secrets Manager, and beyond.
          </>,
        ]}
      />
      <Callout type="tip">
        ABAC needs discipline about tagging, not about policies. Pair it with
        tag-enforcement at creation (an SCP/IAM condition on{" "}
        <Code>aws:RequestTag</Code>) so untagged resources can never appear to
        be silently denied later.
      </Callout>

      <H2>Policy variables — the per-user variant</H2>
      <P>
        Before tags, IAM offered interpolation for identity attributes: a
        single policy with a resource ARN containing{" "}
        <Code>$&#123;aws:username&#125;</Code> gives each user their own home
        prefix. Cognito adds <Code>$&#123;cognito-identity.amazonaws.com:sub&#125;</Code>{" "}
        for per-app-user prefixes. Variables handle the “per identity” case;
        ABAC generalizes it to any attribute — the exam may present either
        pattern and expects you to recognize both.
      </P>

      <H2>Prerequisites that make ABAC work</H2>
      <UL
        items={[
          <>
            Tags must be <strong>propagated onto role sessions</strong> —
            session tags set at AssumeRole time (see the STS lesson) or
            inherited from the role’s own tags.
          </>,
          <>
            Passing session tags requires the <strong>target role’s trust
            policy to allow <Code>sts:TagSession</Code></strong> — an
            easily-missed second permission. A role whose trust policy grants
            only AssumeRole silently drops tags, and ABAC conditions start
            failing for no visible reason.
          </>,
          <>
            Resources must actually carry the matching tags — enforced at
            creation with <Code>aws:RequestTag</Code> conditions or Config
            rules.
          </>,
          <>
            The identity policy must still grant the action broadly enough for
            the condition to matter; conditions narrow, they don’t grant.
          </>,
        ]}
      />
      <Callout type="exam">
        When a question says <strong>“new teams are onboarded frequently and
        permissions must require no policy changes”</strong> or “permissions
        based on department attributes,” the answer is ABAC — tags on
        principals compared with tags on resources.
      </Callout>

      <H2>Tag-key case sensitivity — the silent mismatch</H2>
      <P>
        Tag <strong>keys are case-sensitive</strong>: <Code>Team</Code> and{" "}
        <Code>team</Code> are different keys. A condition comparing{" "}
        <Code>aws:PrincipalTag/Team</Code> with{" "}
        <Code>aws:ResourceTag/team</Code> never matches, and the request is
        implicitly denied with no useful error. Standardize key casing in
        the tagging policy and audit with Config rules that flag
        miscapitalized keys.
      </P>
    </>
  );
}

export function Lesson118() {
  return (
    <>
      <Lead>
        Services need permission to act on your behalf, and people need
        permission to hand services that power. Both sides meet at{" "}
        <Code>iam:PassRole</Code> — one of the most exam-relevant — and most
        abused — actions in IAM.
      </Lead>

      <H2>Service roles vs service-linked roles</H2>
      <P>
        A <strong>service role</strong> is an ordinary IAM role whose trust
        policy allows a specific AWS service (for example{" "}
        <Code>ecs-tasks.amazonaws.com</Code>) to assume it. You create it, name
        it, and attach whatever policies fit.
      </P>
      <P>
        A <strong>service-linked role (SLR)</strong> is a special role the
        service itself defines and creates: the trust policy is fixed to that
        service, the permissions are managed by AWS, and it cannot be reused by
        other services. Services like Elastic Beanstalk, Auto Scaling, and RDS
        create SLRs automatically on first use — you will see them named{" "}
        <Code>AWSServiceRoleFor…</Code>. They exist so a service always has the
        exact permissions it needs without you wiring anything.
      </P>

      <H2>PassRole — the permission behind the delegation</H2>
      <P>
        When a developer creates a Lambda function with a role, two permissions
        are involved: the <em>service</em> (Lambda) must be trusted by the
        role, and the <em>developer</em> must be allowed{" "}
        <Code>iam:PassRole</Code> for that role ARN. Without the second, they
        cannot attach the role at all.
      </P>
      <P>
        The risk is obvious: <Code>iam:PassRole</Code> on an administrator role
        is privilege escalation — create a function with that role, invoke it,
        and you are an administrator. The control is a condition scoping what
        may be passed:
      </P>
      <UL
        items={[
          <>
            Restrict by ARN: <Code>iam:PassRole</Code> allowed only on{" "}
            <Code>arn:aws:iam::&lt;account&gt;:role/DeveloperFunctionRole</Code>.
          </>,
          <>
            Restrict by service: condition{" "}
            <Code>iam:PassedToService = lambda.amazonaws.com</Code> so the role
            cannot be passed to something more dangerous.
          </>,
        ]}
      />
      <Callout type="exam">
        When a question says “developers must be able to create functions but
        only with approved roles,” the answer is an <strong>iam:PassRole
        condition scoped to specific role ARNs</strong> — not taking IAM away
        from developers entirely.
      </Callout>

      <H2>Matching the role to the compute service</H2>
      <KeyTable
        head={["Compute", "The role that carries app permissions", "What fetches the credentials"]}
        rows={[
          ["EC2", "Instance profile role", "Instance metadata (IMDSv2) — automatic rotation"],
          ["Lambda", "Execution role", "Provided by the service at each invocation environment"],
          ["ECS on Fargate/EC2", "Task role", "Injected by the ECS agent into the container"],
          ["EKS pods", "IRSA role (OIDC-federated service account)", "Pod-scoped credentials via the OIDC provider"],
        ]}
      />
      <P>
        Note the ECS split: the <strong>task execution role</strong> is the
        plumbing role (pull the image from ECR, write logs, fetch secrets at
        launch), while the <strong>task role</strong> is what the running
        application uses. Exam questions love making you distinguish them.
      </P>
      <Callout type="warn">
        A role whose trust policy allows a service is inert until a{" "}
        <em>principal with PassRole</em> attaches it to something. When auditing
        escalation paths, search policies for <Code>iam:PassRole</Code> with
        wildcards — that is where privilege escalation hides.
      </Callout>
    </>
  );
}

export function Lesson119() {
  return (
    <>
      <Lead>
        AWS Organizations turns many accounts into one governed estate. Service
        control policies are its guardrails: ceilings that apply to every
        principal in a member account — including the root user.
      </Lead>

      <H2>The structure</H2>
      <P>
        The <strong>management account</strong> (formerly “master”) creates the
        organization, pays the consolidated bill, and cannot itself be
        restricted by SCPs — which is exactly why best practice keeps it empty
        of workloads. <strong>Member accounts</strong> live in{" "}
        <strong>organizational units (OUs)</strong>, a hierarchy up to five
        levels deep. SCPs attach at any level and inherit downward: an account
        is governed by the full chain from the root of the organization to its
        OU.
      </P>
      <UL
        items={[
          <>
            <strong>Consolidated billing:</strong> all accounts’ usage rolls up
            to one bill, volume discounts stack across accounts, and
            Reserved Instances/Savings Plans share across members.
          </>,
          <>
            <strong>Service access:</strong> services like CloudTrail, Config,
            GuardDuty, and Macie can designate a <em>delegated administrator</em>{" "}
            member account to run organization-wide operations.
          </>,
        ]}
      />

      <H2>What SCPs can and cannot do</H2>
      <KeyTable
        head={["Capability", "SCP reality"]}
        rows={[
          ["Limit maximum permissions of every IAM principal in a member account", "Yes — including the account root user"],
          ["Deny actions regardless of generous IAM policies", "Yes — explicit Deny, or simply omitting from an allow-list"],
          ["Grant permissions", "No — SCPs are ceilings, never grants"],
          ["Apply to the management account", "No — that is the escape hatch and the reason it stays empty"],
          ["Inspect request internals like 'is this RDS instance encrypted?'", "No — SCP conditions only see request-level keys; use Config for resource configuration"],
        ]}
      />
      <Callout type="exam">
        The phrase <strong>“even the root user of the account cannot perform
        the action”</strong> is an SCP signature. If the management account is
        mentioned as needing the restriction too, SCPs are the wrong answer —
        only IAM controls inside that account can apply.
      </Callout>

      <H2>The guardrails every organization ships</H2>
      <UL
        items={[
          <>
            <strong>Region restriction:</strong> Deny every action where{" "}
            <Code>aws:RequestedRegion</Code> is not in the approved list.
          </>,
          <>
            <strong>Root protection:</strong> Deny root-only actions (like
            disabling CloudTrail or closing accounts) in member accounts.
          </>,
          <>
            <strong>Data perimeter:</strong> Deny S3 writes to buckets outside{" "}
            <Code>aws:ResourceOrgID</Code> — stopping exfiltration in one
            policy.
          </>,
          <>
            <strong>Tag enforcement:</strong> Deny create actions without
            required <Code>aws:RequestTag</Code> values.
          </>,
        ]}
      />

      <H2>Designing the OU tree</H2>
      <P>
        OUs exist so different business units or environments can carry
        different guardrails under one central bill. The common shape is a
        Security OU (audit, log archive), a suspended/exceptions OU, and
        workload OUs per environment or per business unit, each with its own
        SCP set. Remember the mechanics: <strong>moving an account between OUs
        changes its effective SCPs immediately</strong> — an account relocated
        into a stricter OU can have previously-working access start failing.
      </P>
      <Callout type="tip">
        Default SCP behavior matters: with no SCPs attached, full access is
        allowed. The moment you attach an <em>allow-list style</em> SCP (via{" "}
        <Code>aws:PrincipalOrgID</Code>-style FullAWSAccess replacement),
        everything not explicitly allowed becomes denied — design deliberately.
      </Callout>

      <H2>Organizations policy types beyond SCPs</H2>
      <UL
        items={[
          <>
            <strong>Service control policies (SCPs):</strong> ceilings on what
            principals can do — the guardrail type the exam tests most.
          </>,
          <>
            <strong>Tag policies:</strong> standardize tag keys, values, and
            capitalization across accounts — the enforcement behind ABAC
            key-casing discipline.
          </>,
          <>
            <strong>Backup policies:</strong> centrally mandate AWS Backup
            plans (vaults, retention, cross-account copies) for member
            accounts.
          </>,
          <>
            <strong>AI services opt-out policies:</strong> control whether
            AWS AI services may store and use content — the compliance answer
            for regulated data flowing through AI features.
          </>,
        ]}
      />
    </>
  );
}
