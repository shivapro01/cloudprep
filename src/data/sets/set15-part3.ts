import type { QuizQuestion } from "../questions";

/** Practice Set 15 — questions 955–975 (edge authentication, governance, capstones). Original questions. */
export const set15Part3: QuizQuestion[] = [
  {
    id: 955,
    category: "Networking & Content Delivery",
    question:
      "Webhook receivers must validate vendor HMAC signatures at the earliest point — before origin compute — discarding forgeries cheaply. Where should validation run in a CloudFront-fronted design?",
    options: [
      "In a Lambda@Edge viewer request function validating the HMAC before the request proceeds to origin",
      "In the backend Lambda after API Gateway forwards the full payload",
      "In a WAF rule matching the signature string literally",
      "In CloudFront Functions calling an external secret service to verify",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda@Edge on viewer requests runs real logic (HMAC checks with fetched secrets) before origin charges accrue. Backend validation pays full request cost for forgeries, WAF matches rules not cryptographic HMACs, and CloudFront Functions can't fetch secrets externally.",
  },
  {
    id: 956,
    category: "Security",
    question:
      "A single-page application (no backend secret storage) must authenticate users through Cognito securely. Which authorization flow is designed for public clients like SPAs?",
    options: [
      "The Authorization Code flow with PKCE (proof key for code exchange)",
      "The implicit flow returning tokens in the URL fragment",
      "Client credentials flow with a shared secret in the app bundle",
      "Resource owner password flow with the user's password typed into the SPA",
    ],
    correctAnswers: [0],
    explanation:
      "PKCE secures the authorization code flow for public clients that cannot hold secrets — the modern standard for SPAs. Implicit flow is deprecated for token exposure, client credentials don't represent users, and password flows collect the worst credential in the least safe place.",
  },
  {
    id: 957,
    category: "Application Integration",
    question:
      "An API Gateway HTTP integration must reach a private ALB inside a VPC without exposing the ALB publicly. Which API Gateway construct bridges the public API to the private load balancer?",
    options: [
      "A VPC Link attached to the private ALB, referenced by the integration",
      "A public ALB endpoint with IP allowlisting",
      "VPC peering between API Gateway's service VPC and the application VPC",
      "A NAT gateway route for the integration",
    ],
    correctAnswers: [0],
    explanation:
      "VPC Links let API Gateway integrations target private ALB/NLB endpoints inside the VPC, keeping them unpublished. Allowlisted public ALBs expose the service, API Gateway doesn't peer, and NAT is for instance egress.",
  },
  {
    id: 958,
    category: "Management & Governance",
    question:
      "An operations team repeatedly filters X-Ray traces by the same criteria — for example, all traces with annotation fault=true from the checkout service. Which X-Ray feature saves and exposes these filtered views?",
    options: [
      "X-Ray groups with filter expressions, providing dedicated service maps and trace lists",
      "Sampling rules named after the filter",
      "CloudWatch dashboards over X-Ray metrics only",
      "Annotation aliases stored in DynamoDB",
    ],
    correctAnswers: [0],
    explanation:
      "Groups persist filter expressions (by annotation, URL, status) and give each a focused service map and trace search. Sampling rules decide collection, dashboards chart metrics, and annotations are the data being filtered.",
  },
  {
    id: 959,
    category: "Cost Optimization",
    question:
      "Finance must attribute API costs per customer and bill overage customers. Which API Gateway mechanism set identifies callers and produces per-customer usage data?",
    options: [
      "API keys with usage plans (throttles and quotas per key), with access logs analyzed for per-customer reporting",
      "Stage variables mapping callers to costs",
      "Request validators tagging payloads",
      "Cognito groups counting requests",
    ],
    correctAnswers: [0],
    explanation:
      "API keys plus usage plans assign per-customer throttles and quotas, and execution/access logs record key-level usage for billing rollups. Stage variables switch backends, validators check payloads, and Cognito groups don't meter usage.",
  },
  {
    id: 960,
    category: "Security",
    question:
      "Compliance requires Lambda invocation payloads to be logged for audit, but the log group must never be readable without the audit KMS key. Which combination delivers encrypted, access-controlled audit logs?",
    options: [
      "Structured payload logging from the function into CloudWatch Logs, with a customer managed KMS key associated to the log group",
      "Writing payloads to /tmp and rotating files to S3 unencrypted",
      "Relying on CloudTrail data events capturing every payload automatically",
      "Printing payloads to stdout only, since stdout is encrypted by default",
    ],
    correctAnswers: [0],
    explanation:
      "CloudWatch Logs log groups accept an associated KMS key, encrypting stored log data under auditable key control. /tmp and stdout aren't encrypted stores, and CloudTrail does not capture Lambda payload data.",
  },
  {
    id: 961,
    category: "Security",
    question:
      "Which statement about CloudWatch Logs encryption is correct?",
    options: [
      "Log groups can be associated with a customer managed KMS key at creation or update, encrypting stored log data",
      "All CloudWatch Logs are encrypted with AWS owned keys that cannot be changed, ever",
      "Encryption applies only to exported S3 objects, never to log groups",
      "KMS association deletes and rewrites the log group's existing events",
    ],
    correctAnswers: [0],
    explanation:
      "Log groups support customer managed KMS keys for encryption at rest, assignable on creation or on existing groups. AWS owned keys are the default but overridable, exports are a separate concern, and association doesn't destroy data.",
  },
  {
    id: 962,
    category: "Security",
    question:
      "Which two statements about KMS key deletion are correct? (Select TWO.)",
    options: [
      "Customer managed keys can be scheduled for deletion only after a mandatory 7–30 day waiting window",
      "AWS managed keys cannot be scheduled for deletion by customers at all",
      "Any key type can be deleted instantly on request",
      "Deletion waits are skippable by paying a fee",
      "Deleted customer managed keys return automatically after 90 days",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Customer managed deletions enforce the waiting window (cancellable), while AWS managed keys are permanently managed by AWS and cannot be deleted by customers. Instant deletion and paid skips don't exist, and keys don't resurrect after deletion.",
  },
  {
    id: 963,
    category: "Security",
    question:
      "A policy demands that no RDS instance is ever created unencrypted. Why can't an SCP enforce this directly at creation time, and what is the correct control pattern?",
    options: [
      "SCPs cannot inspect resource configuration like the encryption parameter; use Config rules to detect unencrypted instances and auto-remediate (snapshot and re-create encrypted)",
      "SCPs can inspect the encryption flag via an aws:RequestTag condition",
      "RDS encrypts by default, so no control is needed",
      "A permissions boundary on the root user blocks unencrypted creation",
    ],
    correctAnswers: [0],
    explanation:
      "SCP conditions evaluate request parameters only where condition keys exist — storage encryption isn't exposed as a request key, so prevention isn't SCP-expressible; the working pattern is detective Config rules with automated encrypted re-creation. The other options misstate SCP capabilities or defaults.",
  },
  {
    id: 964,
    category: "Security",
    question:
      "Following detection of an unencrypted RDS instance, remediation must produce an encrypted replacement with minimal data risk. Which sequence is correct?",
    options: [
      "Snapshot the instance, copy the snapshot with encryption enabled, restore an encrypted instance from the copy, and switch applications over",
      "Enable encryption on the running instance in place",
      "Export the data to S3 unencrypted, then import into a new encrypted instance",
      "Reboot the instance with an encryption flag set in the parameter group",
    ],
    correctAnswers: [0],
    explanation:
      "Encryption applies at creation, so the path is snapshot → encrypted copy → restore → cutover. Encryption cannot be toggled on a live instance, plaintext exports widen exposure, and parameter groups don't control storage encryption.",
  },
  {
    id: 965,
    category: "Security",
    question:
      "Security operations must be alerted when S3 objects are read at anomalous volumes — a common data-exfiltration signal — with findings tied to specific identities. Which GuardDuty protection generates these S3 findings?",
    options: [
      "GuardDuty S3 protection, analyzing S3 data events for anomalous access patterns",
      "S3 server access log scanning by Athena queries only",
      "Macie policy findings on bucket configuration",
      "CloudWatch GetObject metric alarms per bucket",
    ],
    correctAnswers: [0],
    explanation:
      "GuardDuty's S3 protection analyzes CloudTrail management and S3 data events for exfiltration-style anomalies with identity context. Athena queries are manual detective work, Macie policy findings flag configuration not behavior, and per-bucket alarms lack identity attribution.",
  },
  {
    id: 966,
    category: "Security",
    question:
      "Development and production share one account's Parameter Store hierarchy. Developers must read /app/dev/* but be denied /app/prod/*. How does IAM express this?",
    options: [
      "Path-scoped IAM policies allowing kms:GetParameter on the /app/dev/ prefix and denying /app/prod/",
      "Two Parameter Stores selected at runtime by convention",
      "Resource policies on individual parameters per environment",
      "Environment variables holding the environment name",
    ],
    correctAnswers: [0],
    explanation:
      "Parameter Store hierarchies map to IAM resource ARNs, so prefix-scoped allow/deny policies partition environments cleanly. Separate stores, per-parameter policies, and naming conventions don't provide enforceable isolation.",
  },
  {
    id: 967,
    category: "Security",
    question:
      "Fleet-wide SSH key rotation must push new authorized_keys to hundreds of instances automatically on schedule. Which pairing implements this without SSH access?",
    options: [
      "Store keys in Parameter Store or Secrets Manager; SSM Run Command (or State Manager) applies them fleet-wide on schedule",
      "Email new keys to server administrators quarterly",
      "Bake new keys into a new AMI and relaunch everything monthly",
      "Enable SSH password authentication as the fallback",
    ],
    correctAnswers: [0],
    explanation:
      "Centralized key storage plus SSM distribution automates rotation agentlessly through the SSM agent. Email is unaccountable, AMI relaunches are heavy for a key change, and password fallback weakens posture.",
  },
  {
    id: 968,
    category: "Storage",
    question:
      "Which two S3 encryption options let the encryption key vary per object or per request? (Select TWO.)",
    options: [
      "SSE-KMS, selecting a KMS key per object at upload",
      "SSE-C, supplying the customer's key with each request",
      "SSE-S3, which applies a per-bucket rotating key",
      "Default encryption with a fixed bucket key choice",
      "Dual-layer SSE-KMS with two fixed keys",
    ],
    correctAnswers: [0, 1],
    explanation:
      "SSE-KMS supports choosing the key per PUT, and SSE-C supplies the caller's key per request — both vary per object/request. SSE-S3 uses S3-managed keys, defaults fix the choice, and DSSE fixes two keys for all objects.",
  },
  {
    id: 969,
    category: "Storage",
    question:
      "Before designing lifecycle rules, a team wants data showing how often objects in a bucket are actually accessed by age group, to pick transition days scientifically. Which S3 feature produces these access-pattern analyses?",
    options: [
      "S3 Storage Class Analysis, reporting access frequency by age and prefix to inform transitions",
      "CloudWatch request metrics with manual analysis",
      "S3 Inventory object listings alone",
      "Storage Lens free-tier metrics",
    ],
    correctAnswers: [0],
    explanation:
      "Storage Class Analysis tracks access patterns by age and prefix and can suggest transition timing. Request metrics need hand analysis, inventories list objects without access frequency, and Storage Lens is organization-level metrics.",
  },
  {
    id: 970,
    category: "Storage",
    question:
      "An access point must be usable exclusively from inside a specific VPC — even its access policies should deny any other network path. Which S3 access point configuration enforces this?",
    options: [
      "A VPC-attached access point, whose policy requires the requests to arrive through that VPC endpoint",
      "A public access point with a bucket policy IP condition",
      "A dual-stack access point with TLS-only policy",
      "An access point with Object Lock enabled",
    ],
    correctAnswers: [0],
    explanation:
      "Access points can be created as VPC-attached, binding them to one VPC's network path with policy conditions enforcing it. Public access points with IP conditions are weaker, dual-stack is addressing, and Object Lock is retention.",
  },
  {
    id: 971,
    category: "Security",
    question:
      "A governance control must prevent any principal in the organization from scheduling KMS key deletion, protecting long-term data access. Which control expresses this preventive rule?",
    options: [
      "An SCP denying kms:ScheduleKeyDeletion organization-wide",
      "A Config rule alerting on scheduled deletions",
      "A CloudWatch alarm on key state changes",
      "Key rotation disabling deletion automatically",
    ],
    correctAnswers: [0],
    explanation:
      "Denying kms:ScheduleKeyDeletion via SCP prevents the deletion request entirely — a preventive guardrail. Config and alarms detect after scheduling, and rotation is unrelated to deletion.",
  },
  {
    id: 972,
    category: "High Availability & Scaling",
    question:
      "Which two disaster recovery strategies keep data continuously replicated to the recovery environment? (Select TWO.)",
    options: [
      "Warm standby, with the data layer always replicated",
      "Multi-site active/active, replicating in every direction",
      "Backup and restore with nightly copies",
      "Pilot light with weekly snapshots",
      "Cold archives on tape",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Warm standby and active/active both maintain live data replication continuously. Backup/restore and pilot light rely on periodic copies, and tape archives are the coldest pattern.",
  },
  {
    id: 973,
    category: "High Availability & Scaling",
    question:
      "A company tiers its applications: tier 1 requires a 5-minute RTO, tier 2 tolerates 24 hours. What is the cost-appropriate DR mapping?",
    options: [
      "Warm standby (or active/active) for tier 1; backup and restore for tier 2",
      "Multi-site active/active for every application uniformly",
      "Backup and restore for tier 1; nothing for tier 2",
      "Pilot light for tier 2 only, with no DR for tier 1",
    ],
    correctAnswers: [0],
    explanation:
      "Match strategy spend to recovery need: expensive continuous replication for the 5-minute tier, cheap backup/restore for the day-tolerant tier. Uniform maximum DR overpays, under-protecting tier 1 violates its RTO, and tier-2-only DR inverts priorities.",
  },
  {
    id: 974,
    category: "Management & Governance",
    question:
      "Which two services help quantify and validate resilience rather than just assert it? (Select TWO.)",
    options: [
      "AWS Resilience Hub scoring applications against RTO/RPO policies",
      "AWS Fault Injection Service injecting real failures to test recovery",
      "AWS Well-Architected Tool questionnaires",
      "AWS Config compliance dashboards",
      "AWS Trusted Advisor checks",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Resilience Hub quantifies against recovery targets and FIS empirically tests recovery — both measure resilience. Questionnaires, compliance dashboards, and advisor checks assess or advise without measuring recovery behavior.",
  },
  {
    id: 975,
    category: "Management & Governance",
    question:
      "Which two day-one practices serve every Well-Architected pillar simultaneously for a new workload? (Select TWO.)",
    options: [
      "Define everything as code with peer-reviewed changes",
      "Build observability (metrics, logs, traces, alarms) into the first release",
      "Operate through console clicks documented in a wiki",
      "Add security reviews after the first production incident",
      "Choose the largest instance sizes to avoid future scaling work",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Infrastructure as code enables operational excellence, reliability, and security reviewability, while built-in observability serves performance, reliability, and cost optimization from day one. Console operations, afterthought security, and overprovisioning undermine the pillars they touch.",
  },
];
