import type { QuizQuestion } from "../questions";

/** Practice Set 5 — questions 261–282 (security services deep dive). Original questions. */
export const set5Part1: QuizQuestion[] = [
  {
    id: 261,
    category: "Security",
    question:
      "A security engineer needs to grant a data-processing pipeline permission to use a KMS key without modifying the key policy, which is managed by another team under change control. What is the appropriate delegation mechanism?",
    options: [
      "Add the pipeline's role to the key policy through an emergency change",
      "Create a KMS grant for the pipeline's role with the specific operations it needs",
      "Attach an inline IAM policy to the key itself",
      "Copy the key material into a new key owned by the pipeline team",
    ],
    correctAnswers: [1],
    explanation:
      "KMS grants delegate specific key usage to principals without touching the key policy, which suits keys under strict change control. Key policies remain the root of trust and inline policies on the key don't exist; keys cannot be shared by copying material.",
  },
  {
    id: 262,
    category: "Security",
    question:
      "An S3 bucket policy grants a role access, the role's identity policy grants access, and an SCP in the organization allows all S3 actions — yet a data engineer still receives Access Denied. Which evaluation fact explains the situation?",
    options: [
      "Resource policies override identity policies, so the bucket policy must be removed",
      "Within the same account, permissions must be granted in both the identity policy and the bucket policy only if a resource policy statement includes an explicit deny — otherwise one of the two allows suffices; a denial therefore implies a Deny somewhere",
      "SCP allow statements must exactly match the requested action string",
      "KMS-encrypted objects always require the root user to authorize access",
    ],
    correctAnswers: [1],
    explanation:
      "Same-account access needs an allow in the identity policy or the resource policy, and no explicit deny anywhere; since both sides allow here, the surviving explanation is a Deny statement somewhere in the chain (or a missing KMS permission). The other options misstate evaluation: neither side must mirror the other, SCPs are ceilings not exact matches, and KMS adds a required grant but not root involvement.",
  },
  {
    id: 263,
    category: "Security",
    question:
      "A Lambda function reading an SSE-KMS encrypted S3 bucket works in dev but fails with Access Denied in prod, though bucket and IAM permissions are identical. What was most likely forgotten in prod?",
    options: [
      "The bucket policy was not replicated to the prod Region",
      "The function's role was not granted kms:Decrypt on the prod key",
      "Lambda functions cannot read KMS-encrypted objects in the same Region",
      "The prod bucket must switch to SSE-S3 to be readable by Lambda",
    ],
    correctAnswers: [1],
    explanation:
      "Reading SSE-KMS objects requires the caller to have decrypt permission on the specific KMS key; a different key in prod means the key grant is missing even when S3 permissions match. Bucket policies are per-bucket and exist in prod, Lambda reads KMS objects fine with the right permissions, and downgrading encryption is not the fix.",
  },
  {
    id: 264,
    category: "Security",
    question:
      "A security baseline requires that no principal can ever disable encryption or delete logs on a specific security account's resources, even if its IAM administrators go rogue. Which control provides an org-wide ceiling?",
    options: [
      "A permission boundary attached to each administrator role",
      "A service control policy applied at the OU containing the security account",
      "A resource-based policy on each individual resource",
      "An IAM policy with a Deny applied to the Administrators group",
    ],
    correctAnswers: [1],
    explanation:
      "SCPs bound every principal in member accounts — including their administrators — and cannot be overridden from inside the account. Permission boundaries are set by the same administrators they would constrain, resource policies are per-resource and still editable in-account, and group IAM denies are equally self-revocable.",
  },
  {
    id: 265,
    category: "Security",
    question:
      "A security review finds an IAM role whose policy allows s3:* on all buckets, though the role only reads one bucket. Automated remediation must produce a least-privilege policy from actual CloudTrail activity. Which feature drafts this policy for review?",
    options: [
      "IAM Access Analyzer policy generation",
      "AWS Config custom lambda rules",
      "IAM credential report",
      "AWS Organizations policy simulator",
    ],
    correctAnswers: [0],
    explanation:
      "Access Analyzer analyzes CloudTrail activity to generate a policy scoped to the actions and resources actually used, ready for engineer review. Config rules evaluate compliance, credential reports list users and key ages, and there is no org policy simulator service by that name.",
  },
  {
    id: 266,
    category: "Security",
    question:
      "A company must block its workloads from uploading data to S3 buckets outside the organization, while still allowing all in-org buckets. Which control enforces this at scale across accounts?",
    options: [
      "A per-bucket policy denying unknown principals on every external bucket",
      "An SCP with a Deny on s3:PutObject conditioned on s3:x-amz-acl? no — conditioned on the bucket not belonging to the organization via aws:ResourceOrgID",
      "A network firewall rule blocking the S3 service",
      "IAM Access Analyzer alerts reviewed daily",
    ],
    correctAnswers: [1],
    explanation:
      "A Deny on s3:PutObject with a condition that aws:ResourceOrgID does not match the organization ID blocks exfiltration to outside-org buckets globally, in one policy. Per-bucket policies can't govern buckets you don't own, blocking S3 entirely stops all use, and detective alerts do not prevent the upload.",
  },
  {
    id: 267,
    category: "Security",
    question:
      "A SaaS product's multitenant S3 layout stores each customer's data under bucket/tenant-id/. Users authenticate through Cognito. How should per-tenant isolation be enforced on direct S3 access?",
    options: [
      "One IAM role per customer, rotated weekly",
      "A role trust with Cognito plus an IAM policy using ${cognito-identity.amazonaws.com:sub} as a policy variable scoping the prefix to the authenticated user",
      "A Lambda authorizer reading the object key and denying mismatches",
      "Prefix naming conventions enforced by the frontend alone",
    ],
    correctAnswers: [1],
    explanation:
      "Cognito identity pools map each user to an identity ID exposed as a policy variable, so a single policy confines every user to their own prefix — isolation enforced by IAM itself. Per-tenant roles do not scale, an authorizer adds a moving part for what IAM does natively, and frontend conventions are not security.",
  },
  {
    id: 268,
    category: "Security",
    question:
      "A security team needs to enforce a rule that every new security group denies inbound SSH from 0.0.0.0/0, remediating violations automatically within minutes. Which combination provides this?",
    options: [
      "GuardDuty findings with manual follow-up",
      "AWS Config rule with automatic remediation via SSM automation",
      "Trusted Advisor weekly checks with a ticketing webhook",
      "Security Hub insights emailed to the team",
    ],
    correctAnswers: [1],
    explanation:
      "Config continuously evaluates resources against rules and can trigger automatic remediation (for example an SSM document that removes the rule), providing the preventive-to-corrective loop. The alternatives detect or notify but do not remediate automatically.",
  },
  {
    id: 269,
    category: "Security",
    question:
      "A traffic surge overwhelms a stateful NIDS appliance pattern. Management wants DDoS cost protection (scaling charges), response team access, and enhanced L3/L4 mitigation for a public-facing application behind CloudFront and ALB. Which service bundle provides this?",
    options: [
      "AWS Shield Advanced",
      "AWS WAF alone",
      "Shield Standard plus CloudWatch alarms",
      "Network Firewall in each public subnet",
    ],
    correctAnswers: [0],
    explanation:
      "Shield Advanced adds 24/7 SRT support, cost protection for scaling during attacks, and advanced detection/mitigation at layers 3/4 for protected resources. WAF is layer 7 request filtering, Shield Standard is automatic but has none of the advanced features, and per-subnet firewalls are unrelated to DDoS cost protection.",
  },
  {
    id: 270,
    category: "Security",
    question:
      "An application's secrets include a third-party API key that changes monthly through that vendor's portal, so automatic rotation is impossible. The key must still be centrally stored, encrypted, and access-audited with the least cost. Where should it live?",
    options: [
      "AWS Secrets Manager with a custom rotation Lambda",
      "SSM Parameter Store SecureString with KMS encryption and IAM-controlled reads",
      "A private S3 bucket with bucket policy restrictions",
      "An encrypted parameter inside the AMI",
    ],
    correctAnswers: [1],
    explanation:
      "SecureString parameters give KMS encryption, IAM control, and CloudTrail auditing at near-zero cost — the fit when rotation automation isn't possible. Secrets Manager charges per secret mainly for rotation machinery that cannot rotate this value anyway, S3 lacks parameter-level versioning ergonomics, and baking secrets into AMIs spreads copies everywhere.",
  },
  {
    id: 271,
    category: "Security",
    question:
      "A security engineer must prove to an external auditor that no one has read a classified S3 object without authorization in the past year, including cross-account principals. Which data source provides object-level access evidence?",
    options: [
      "S3 server access logs stored in a dedicated account",
      "CloudTrail data events for S3 object-level operations delivered to an immutable store",
      "GuardDuty S3 protection findings only",
      "Storage Lens metrics for the bucket",
    ],
    correctAnswers: [1],
    explanation:
      "CloudTrail data events record every object-level API call with principal, time, and source IP — the authoritative audit record. Server access logs record requests with less identity fidelity and are harder to correlate, GuardDuty surfaces anomalies rather than complete access history, and Storage Lens reports aggregates.",
  },
  {
    id: 272,
    category: "Security",
    question:
      "A data engineering team routinely shares encrypted datasets with a partner account. Instead of modifying the KMS key policy for each new partner role, the key admin issues time-boxed permissions for the specific operations. What did the admin use?",
    options: [
      "KMS aliases",
      "KMS grants",
      "STS session tags",
      "S3 presigned URLs on the encrypted objects",
    ],
    correctAnswers: [1],
    explanation:
      "Grants are lightweight, revocable delegations of specific KMS operations to specific principals — ideal for programmatic, scoped, time-boxed sharing without key-policy edits. Aliases are names for keys, session tags carry context, and presigned URLs serve individual S3 objects rather than granting key use.",
  },
  {
    id: 273,
    category: "Security",
    question:
      "A multi-account environment needs every EBS volume and RDS snapshot encrypted with keys centralized in a security account, so no workload team can decrypt without security approval. What should be used?",
    options: [
      "A customer managed KMS key in the security account, shared cross-account through its key policy, referenced by every team's encryption settings",
      "AWS managed keys in each workload account with SCPs blocking disable",
      "S3 default encryption applied to snapshots",
      "A CloudHSM cluster in every account",
    ],
    correctAnswers: [0],
    explanation:
      "Centralizing the customer managed key in the security account and granting cross-account use through its key policy keeps decryption authority with security. AWS managed keys live in each account and their policies can't be edited for this governance, S3 settings don't cover EBS/RDS, and CloudHSM per account defeats centralization and adds heavy cost.",
  },
  {
    id: 274,
    category: "Security",
    question:
      "A penetration test shows that internal instances can reach the internet freely through the NAT gateway, violating egress policy. Blocking must happen for the whole VPC with logging of blocked flows. Which service should be deployed?",
    options: [
      "Security groups with outbound denies per instance",
      "AWS Network Firewall with Suricata rules and flow logging on the egress path",
      "A network ACL denying 0.0.0.0/0 outbound on private subnets",
      "GuardDuty with egress anomaly alerts",
    ],
    correctAnswers: [1],
    explanation:
      "Network Firewall inspects and blocks VPC egress centrally with stateful rules and logging, designed for exactly this egress control. Per-instance SGs don't scale as a perimeter and can't log centrally in this way, blanket NACL denies also break required egress, and GuardDuty alerts after the fact.",
  },
  {
    id: 275,
    category: "Security",
    question:
      "An application behind CloudFront must block requests whose bodies exceed 8 MB and whose paths match known exploit patterns, before they reach the ALB. Which service performs inline filtering at the edge?",
    options: [
      "AWS Network Firewall at the VPC edge",
      "AWS WAF web ACL attached to the distribution",
      "A Lambda@Edge origin request function returning 403",
      "Shield Advanced automatic application-layer mitigation",
    ],
    correctAnswers: [1],
    explanation:
      "WAF web ACLs on CloudFront inspect request size, path, and content against rules at the edge, blocking before origin cost is incurred. Network Firewall is a VPC-layer device, edge functions can block but reimplement WAF poorly, and Shield Advanced handles volumetric events rather than request-shape rules.",
  },
  {
    id: 276,
    category: "Security",
    question:
      "After a security incident, forensics must establish which IAM credentials performed each sensitive API call over the last year, including assumed-role session attribution. What enables this depth of attribution?",
    options: [
      "CloudTrail with global service logs and role session names propagated by callers",
      "IAM credential reports archived monthly",
      "Access Analyzer findings history",
      "Config timeline for IAM resources",
    ],
    correctAnswers: [0],
    explanation:
      "CloudTrail records every API call with the principal and assumed-role session identifier; callers that set meaningful session names make attribution forensic-grade. Credential reports show key metadata only, Access Analyzer flags external access, and Config timelines track configuration.",
  },
  {
    id: 277,
    category: "Security",
    question:
      "An EC2 fleet processes credit card data. Compliance requires evidence that disks are encrypted, keys are never exportable, and cryptographic operations occur inside validated hardware. Which solution satisfies the strictest reading?",
    options: [
      "EBS encryption with the default AWS managed key",
      "EBS encryption with a customer managed KMS key",
      "AWS CloudHSM cluster providing FIPS-validated key storage for volume encryption",
      "Encrypted AMIs with password-protected volumes",
    ],
    correctAnswers: [2],
    explanation:
      "CloudHSM provides single-tenant, FIPS 140-2 level 3 validated hardware where keys are non-exportable and operations run inside the HSM — the strictest reading. KMS keys (managed or customer managed) are protected by FIPS-validated services but are multi-tenant software-backed key stores; the question's bar points to CloudHSM.",
  },
  {
    id: 278,
    category: "Security",
    question:
      "A static site and its build artifacts live in S3. The security team requires that even bucket administrators cannot delete published versions before 30 days. Which combination delivers this?",
    options: [
      "Object Lock governance mode with 30-day retention plus versioning enabled",
      "Object Lock compliance mode with 30-day retention plus versioning enabled",
      "MFA delete with the MFA device held by the build team",
      "A lifecycle rule expiring versions after 30 days",
    ],
    correctAnswers: [1],
    explanation:
      "Compliance-mode Object Lock cannot be bypassed by any principal for the retention window — the strongest protection. Governance mode is bypassable by holders of a special permission, MFA delete still permits authorized deletion, and a lifecycle rule destroys versions rather than protecting them.",
  },
  {
    id: 279,
    category: "Security",
    question:
      "A security team receives a GuardDuty finding that a production instance contacts a known command-and-control domain. Immediate containment must block the flow without terminating the instance (its memory is needed for forensics). Which response preserves both goals?",
    options: [
      "Terminate the instance and capture a memory dump afterwards",
      "Quarantine by applying an isolation security group allowing only forensics access, without stopping the instance",
      "Revoke the instance role and wait for the flow to end",
      "Rotate all IAM keys in the account and observe",
    ],
    correctAnswers: [1],
    explanation:
      "Applying a quarantine security group severs attacker connectivity instantly while the instance keeps running, preserving volatile memory for forensics. Termination destroys the evidence source, revoking the role does not necessarily cut an established C2 channel, and key rotation is broader containment rather than targeted isolation.",
  },
  {
    id: 280,
    category: "Security",
    question:
      "Which two controls protect data in transit between on-premises users and a private ALB in a VPC without exposing the ALB publicly? (Select TWO.)",
    options: [
      "A Site-to-Site VPN tunnel with IPSec encryption",
      "AWS PrivateLink exposing the service privately, accessed over the VPN",
      "A public ALB listener with an ACM certificate",
      "CloudFront with a public origin",
      "A NAT gateway with TLS inspection",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Site-to-Site VPN encrypts the path from the corporate network into the VPC, and PrivateLink lets users reach the private service endpoint without any public exposure. A public ALB listener and CloudFront publish the service to the internet, and NAT gateways perform address translation, not encryption.",
  },
  {
    id: 281,
    category: "Security",
    question:
      "A development team embeds AWS credentials in a build server's environment to push artifacts to S3. Which redesign removes the long-lived credentials while keeping pipeline function?",
    options: [
      "Rotate the keys weekly through Secrets Manager",
      "Use an IAM role for the build server (instance profile or OIDC federation from the CI system)",
      "Scope the embedded keys to a bucket prefix and call it least privilege",
      "Move credentials into encrypted Terraform variables",
    ],
    correctAnswers: [1],
    explanation:
      "Roles eliminate static credentials entirely — via an instance profile on a build host or OIDC federation for SaaS CI systems issuing short-lived sessions. Rotation reduces but keeps the static-key model, prefix scoping does not fix credential theft, and encrypted variables still hold long-lived secrets.",
  },
  {
    id: 282,
    category: "Security",
    question:
      "Which two services detect potential account compromises rather than scan for vulnerabilities? (Select TWO.)",
    options: [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "AWS IAM Access Analyzer",
      "Amazon Macie? no — Amazon Detective",
      "Amazon Macie",
    ],
    correctAnswers: [0, 3],
    explanation:
      "GuardDuty detects anomalous and malicious activity, and Detective investigates and visualizes the scope of suspected compromises using finding data. Inspector scans for software vulnerabilities, Access Analyzer surfaces resource sharing, and Macie classifies sensitive data.",
  },
];
