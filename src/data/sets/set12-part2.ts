import type { QuizQuestion } from "../questions";

/** Practice Set 12 — questions 738–759 (governance and security operations). Original questions. */
export const set12Part2: QuizQuestion[] = [
  {
    id: 738,
    category: "Management & Governance",
    question:
      "Control Tower classifies its guardrails into behavioral types. A guardrail that blocks unsupported Regions via SCP before resource creation is which type?",
    options: [
      "A proactive guardrail",
      "A preventive guardrail? no — a detective guardrail",
      "A corrective guardrail",
      "A privileged guardrail",
    ],
    correctAnswers: [0],
    explanation:
      "Control Tower labels SCP-based rules that block noncompliant actions up front as proactive guardrails; Config-based rules that detect afterwards are preventive? — no: Control Tower's taxonomy is proactive (block via SCP), detective (find via Config), and no corrective category in the core taxonomy. The other labels don't exist or invert the mechanism.",
  },
  {
    id: 739,
    category: "Management & Governance",
    question:
      "A member account (not the management account) must administer Config aggregation and CloudTrail for the whole organization, separating security operations from billing administration. Which Organizations feature delegates this?",
    options: [
      "Trusted access with a designated delegated administrator account for each service",
      "Root credentials shared with the security team",
      "Cross-account IAM roles without service registration",
      "Moving the security account to be the management account",
    ],
    correctAnswers: [0],
    explanation:
      "Trusted access lets services like Config, CloudTrail, and GuardDuty register a delegated administrator member account to manage the organization-wide service, keeping the management account for billing and account work only. Shared root is never acceptable, ad-hoc roles lack the service registration, and reparenting the management account is not possible.",
  },
  {
    id: 740,
    category: "Management & Governance",
    question:
      "An account is moved from a loosely governed OU into the Production OU whose SCPs deny public S3 buckets. What immediately happens to resources in that account?",
    options: [
      "SCP changes apply immediately to all principals in the account; previously public buckets may become inaccessible where policies conflict",
      "Existing resources are grandfathered and unaffected until recreated",
      "The account must be re-created to inherit new SCPs",
      "SCPs apply only to new resources created after the move",
    ],
    correctAnswers: [0],
    explanation:
      "SCP inheritance follows the OU tree at evaluation time, so moving an account applies the destination OU's guardrails instantly — including Deny effects on existing access patterns. There is no grandfathering, no re-creation step, and no new-resources-only semantics.",
  },
  {
    id: 741,
    category: "Security",
    question:
      "A break-glass procedure must give engineers rare, fully audited administrative access during emergencies, with no standing human administrator accounts. Which pattern implements this?",
    options: [
      "A dedicated emergency role assumable only with MFA, monitored by alarms on every assumption, in an account with no everyday users",
      "A shared administrator password stored in a vault and rotated monthly",
      "Permanent IAM administrator users with quarterly access reviews",
      "Root user credentials distributed to the on-call rotation",
    ],
    correctAnswers: [0],
    explanation:
      "Break-glass uses an MFA-gated role whose every assumption alarms, so access exists only when invoked and is fully audited. Shared passwords, standing users, and distributed root credentials all create persistent high-value targets.",
  },
  {
    id: 742,
    category: "Security",
    question:
      "Before deploying new IAM policies, a CI pipeline must statically validate them against IAM best practices and the least-privilege model, catching problems pre-deployment. Which feature performs policy checks in the pipeline?",
    options: [
      "IAM Access Analyzer custom policy checks invoked via API during the build",
      "CloudTrail LookupEvents reviewing past actions",
      "A Config rule evaluating policies after deployment",
      "Manual peer review of the policy JSON",
    ],
    correctAnswers: [0],
    explanation:
      "Access Analyzer policy checks validate policies against IAM best practices (and CloudTrail-backed least privilege) via API — a natural CI gate. Post-deployment evaluation and manual review miss the pre-deploy window, and LookupEvents is retrospective.",
  },
  {
    id: 743,
    category: "Security",
    question:
      "A deployment pipeline role can update infrastructure across accounts. Least privilege requires it cannot touch resources outside its own stacks. What scopes the pipeline role correctly?",
    options: [
      "Identity policies scoped to the specific stack resources (CloudFormation ARNs, referenced bucket prefixes) plus deny conditions where needed",
      "AdministratorAccess with a permissions boundary allowing everything",
      "The pipeline assuming AdministratorAccess temporarily only during deploys",
      "Resource-based policies on every AWS service",
    ],
    correctAnswers: [0],
    explanation:
      "Pipeline roles should carry narrowly scoped permissions to exactly the resources their stacks manage, with explicit denies whereblast radius matters. AdministratorAccess — permanent or temporary — defeats least privilege, and services don't uniformly support resource policies for this.",
  },
  {
    id: 744,
    category: "Security",
    question:
      "An application's authorization logic (who may do what inside the product) is tangled in microservice code. The team wants externalized, centralized authorization with a policy language, evaluated at low latency. Which service provides application-level authorization?",
    options: [
      "Amazon Verified Permissions with the Cedar policy language",
      "IAM Identity Center permission sets",
      "Amazon Cognito user pool groups alone",
      "AWS Organizations SCPs",
    ],
    correctAnswers: [0],
    explanation:
      "Verified Permissions externalizes application authorization decisions using Cedar policies, integrating with Cognito identities. Identity Center and SCPs govern AWS access, and user pool groups alone don't evaluate fine-grained permissions.",
  },
  {
    id: 745,
    category: "Security",
    question:
      "A highly sensitive role must limit how long any single assumed session lives, even if callers request longer. Where is the session duration ceiling set?",
    options: [
      "The role's maximum session duration setting, which caps DurationSeconds in AssumeRole calls",
      "The caller's IAM user session policy",
      "The STS Regional endpoint configuration",
      "The role's permissions boundary",
    ],
    correctAnswers: [0],
    explanation:
      "Each role defines its maximum session duration; assume calls requesting more are capped to it. Session policies narrow permissions, endpoint choices affect latency and availability, and boundaries cap permissions, not time.",
  },
  {
    id: 746,
    category: "Security",
    question:
      "A third-party monitoring vendor assumes a role in your account to collect metrics. A malicious vendor could use the same role ARN against another customer. Which trust policy element prevents this confused-deputy problem?",
    options: [
      "A sts:ExternalId condition requiring the unique secret value the vendor uses only for your account",
      "A SourceIp condition restricting the vendor's office network",
      "Requiring MFA on the vendor's machine role",
      "A shorter maximum session duration",
    ],
    correctAnswers: [0],
    explanation:
      "The external ID is a shared secret unique per customer embedded in the trust policy condition, so the vendor cannot reuse its customer-A credentials against customer B. Network and MFA conditions don't identify which customer is being served, and session duration is unrelated.",
  },
  {
    id: 747,
    category: "Security",
    question:
      "A global application needs the same logical encryption key available in multiple Regions — each Regional copy with its own policy but synchronized key material. Which KMS capability provides this?",
    options: [
      "KMS multi-Region keys with replicas sharing key material but independent policies",
      "A single global KMS key usable in all Regions",
      "Copying key material between Regional keys with a Lambda job",
      "CloudHSM clusters peered across Regions",
    ],
    correctAnswers: [0],
    explanation:
      "Multi-Region keys replicate key material to Regional replicas whose policies and aliases are managed independently — ideal for cross-Region encryption with one logical key. There is no truly global single key, and manual material copying or HSM peering reimplements the feature poorly.",
  },
  {
    id: 748,
    category: "Security",
    question:
      "A banking workload demands FIPS 140-2 Level 3 validated single-tenant key storage with customer-managed crypto officer accounts and automatic multi-AZ availability. Which service fits exactly?",
    options: [
      "AWS CloudHSM clusters",
      "KMS with customer managed keys and annual rotation",
      "S3 Object Lock in compliance mode",
      "AWS Private CA in FIPS mode",
    ],
    correctAnswers: [0],
    explanation:
      "CloudHSM provides dedicated FIPS L3 HSM clusters spanning AZs with customer-managed crypto officer/user accounts. KMS keys are multi-tenant and software-protected at a different validation tier, Object Lock is S3 retention, and Private CA issues certificates.",
  },
  {
    id: 749,
    category: "Storage",
    question:
      "A replication rule is configured on a bucket holding five years of existing objects. Which objects replicate?",
    options: [
      "Only objects written after the rule is enabled; existing objects require an S3 Batch Operations copy-on-demand job",
      "All existing and new objects immediately upon rule creation",
      "Only objects deleted and re-uploaded after enabling",
      "Existing objects replicate, new ones do not",
    ],
    correctAnswers: [0],
    explanation:
      "Replication applies to new writes after configuration; backfilling existing objects is a Batch Operations task. The other options invert or invent the scope.",
  },
  {
    id: 750,
    category: "Storage",
    question:
      "When planning multipart uploads, what are the structural constraints on parts?",
    options: [
      "Each part except the last must be at least 5 MiB; up to 10,000 parts; part sizes can vary between parts",
      "All parts must be exactly equal in size",
      "Parts can be any size including zero, with unlimited count",
      "Parts must each be at least 5 GiB",
    ],
    correctAnswers: [0],
    explanation:
      "Multipart uploads allow 1–10,000 parts, with every part except the final one at least 5 MiB and variable sizes permitted. Equal sizing, zero-size parts, and GiB-scale minimums misstate the contract.",
  },
  {
    id: 751,
    category: "Storage",
    question:
      "A regulated workload requires Amazon S3 API access to data that physically never leaves the company's on-premises data center. Which service provides S3-compatible object storage on customer premises?",
    options: [
      "Amazon S3 on Outposts",
      "S3 Express One Zone",
      "Storage Gateway Volume Gateway",
      "Snowball Edge Storage Optimized",
    ],
    correctAnswers: [0],
    explanation:
      "S3 on Outposts delivers object storage with the S3 API on Outposts hardware at customer sites, keeping data on premises. Express One Zone is in-AWS, Volume Gateway is block storage with S3 in the cloud, and Snowball is a transfer device.",
  },
  {
    id: 752,
    category: "Storage",
    question:
      "An HPC team stores a large shared dataset used across many multi-week jobs; data loss is unacceptable. Which FSx for Lustre deployment type provides replicated storage for long-term use rather than ephemeral scratch?",
    options: [
      "Persistent SSD file system",
      "Scratch file system",
      "Scratch 1 with replication enabled",
      "Any Lustre type, since all replicate",
    ],
    correctAnswers: [0],
    explanation:
      "Persistent Lustre deployments replicate data and suit long-term or shared datasets; scratch deployments are unreplicated, high-performance temporary storage. There is no replicated scratch option, and not all types replicate.",
  },
  {
    id: 753,
    category: "Migration & Transfer",
    question:
      "A DataSync transfer between an on-premises NFS server and S3 is too slow on a single agent. How should throughput be increased?",
    options: [
      "Deploy additional DataSync agents to parallelize the transfer",
      "Increase the agent's EBS volume? agents don't use EBS",
      "Enable S3 Transfer Acceleration on the target bucket and restart",
      "Reduce verification to none and hope for the best",
    ],
    correctAnswers: [0],
    explanation:
      "Multiple agents working the same task scale transfer throughput; agent capacity is the bottleneck. Agents boot from their own virtual disk (not EBS), acceleration addresses internet paths rather than agent throughput, and dropping verification trades integrity for speed.",
  },
  {
    id: 754,
    category: "Migration & Transfer",
    question:
      "A Transfer Family SFTP server must be reachable only from inside the VPC (private subnets), not from the public internet. Which endpoint type provides this?",
    options: [
      "A VPC endpoint type server with internal IPs in chosen subnets",
      "A public endpoint with IP allowlisting",
      "A VPC endpoint with an Elastic IP attached, internet-facing",
      "A Serverless endpoint type",
    ],
    correctAnswers: [0],
    explanation:
      "The VPC endpoint type places the SFTP server's ENIs inside chosen subnets, reachable privately (optionally via VPN/Direct Connect). Public endpoints are internet-facing regardless of allowlists, and there is no serverless Transfer Family mode.",
  },
  {
    id: 755,
    category: "Analytics",
    question:
      "A data team wants to license third-party datasets (weather, financial) delivered directly into S3, with subscription management and entitlements handled by AWS. Which service provides curated data products?",
    options: [
      "AWS Data Exchange",
      "AWS Data Pipeline",
      "AWS Glue DataBrew",
      "Open Data on AWS (S3 open data only)",
    ],
    correctAnswers: [0],
    explanation:
      "Data Exchange is the marketplace for third-party data products delivered to S3 with managed subscriptions and entitlements. Data Pipeline is a legacy orchestration service, DataBrew prepares data, and open data lacks the commercial subscription model.",
  },
  {
    id: 756,
    category: "High Availability & Scaling",
    question:
      "Beyond routing controls, a resilience team wants continuous validation that recovery resources (replicas, capacity, AMIs) in the recovery Region are actually ready for failover right now. Which ARC capability provides this?",
    options: [
      "ARC readiness checks with readiness scopes and resource sets",
      "CloudWatch Synthetics probing the DR Region's public pages",
      "Resilience Hub monthly assessments",
      "AWS Backup restore tests only",
    ],
    correctAnswers: [0],
    explanation:
      "ARC readiness checks continuously evaluate cells and resource sets against readiness rules, flagging drift that would break a failover. Synthetic probes and periodic assessments are shallower or less continuous, and restore testing validates backups rather than live readiness.",
  },
  {
    id: 757,
    category: "Management & Governance",
    question:
      "Compliance must produce recurring reports proving backup jobs met policy — coverage, success rates, and retention — across the organization. Which AWS Backup feature generates these?",
    options: [
      "AWS Backup Audit Manager reports and frameworks",
      "CloudWatch dashboards over backup job metrics only",
      "AWS Config conformance packs about backups",
      "Backup vault lock reports",
    ],
    correctAnswers: [0],
    explanation:
      "Backup Audit Manager builds compliance frameworks and delivers automated reports on backup activity against controls. Dashboards and Config packs approximate pieces, and Vault Lock enforces immutability rather than reporting.",
  },
  {
    id: 758,
    category: "Management & Governance",
    question:
      "A backup governance policy requires periodic proof that backups actually restore successfully — automated, scheduled, without manual test servers. Which AWS Backup capability runs restore validation automatically?",
    options: [
      "Restore testing plans, which run scheduled restore jobs and validate results",
      "Manual quarterly DR drills documented in runbooks",
      "Copying backups to a second vault",
      "Enabling continuous backups on all resources",
    ],
    correctAnswers: [0],
    explanation:
      "Restore testing plans schedule and execute restore jobs automatically and report success, proving recoverability hands-free. Manual drills aren't automated, vault copies don't prove restorability, and continuous backups change RPO, not validation.",
  },
  {
    id: 759,
    category: "Management & Governance",
    question:
      "Which two resource types can AWS Backup protect natively? (Select TWO.)",
    options: [
      "Amazon DynamoDB tables",
      "Amazon EBS volumes",
      "Route 53 hosted zones",
      "IAM roles",
      "CloudFront distributions",
    ],
    correctAnswers: [0, 1],
    explanation:
      "AWS Backup supports EBS volumes, DynamoDB tables, RDS, EFS, FSx, S3, and more. DNS zones, IAM roles, and CDN distributions are not backup-supported resource types.",
  },
];
