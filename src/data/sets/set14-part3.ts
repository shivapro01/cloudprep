import type { QuizQuestion } from "../questions";

/** Practice Set 14 — questions 890–910 (multi-Region DR design). Original questions. */
export const set14Part3: QuizQuestion[] = [
  {
    id: 890,
    category: "High Availability & Scaling",
    question:
      "A DR design must copy database backups to a second Region. The business needs an RPO of hours (not minutes) and wants the lowest cost. Which approach fits?",
    options: [
      "Scheduled cross-Region backup copies (for example, via AWS Backup)",
      "Continuous cross-Region replication of the live database",
      "Multi-site active/active deployment",
      "Nightly manual snapshot downloads to on-premises",
    ],
    correctAnswers: [0],
    explanation:
      "When the RPO is measured in hours, scheduled cross-Region backup copies are dramatically cheaper than continuous replication, which buys minute-level RPO at higher run cost. Active/active is the costliest option, and manual downloads add fragility without savings.",
  },
  {
    id: 891,
    category: "High Availability & Scaling",
    question:
      "Which pair of configurations provides an RPO of approximately zero for Availability Zone failures within a single Region?",
    options: [
      "RDS Multi-AZ (synchronous standby) and Aurora's six-way replication across three AZs",
      "RDS read replicas and Aurora read replicas, which replicate synchronously",
      "EBS gp3 volumes and instance store mirrors",
      "DynamoDB global tables and S3 CRR",
    ],
    correctAnswers: [0],
    explanation:
      "Multi-AZ RDS replicates synchronously to its standby, and Aurora maintains six copies across AZs with synchronous-style write quorum — both near-zero loss inside a Region. Replicas are asynchronous, EBS is single-AZ, and global tables/CRR are cross-Region asynchronous.",
  },
  {
    id: 892,
    category: "High Availability & Scaling",
    question:
      "A DR runbook requires dozens of precise failover steps — DNS changes, capacity promotion, config flips — executed identically every drill. Which tooling encodes and executes the runbook?",
    options: [
      "SSM Automation documents (runbooks) executing the failover steps with approvals and audit history",
      "A wiki page the on-call engineer follows manually",
      "CloudWatch dashboards highlighting failed resources",
      "A spreadsheet of AWS console URLs",
    ],
    correctAnswers: [0],
    explanation:
      "Automation documents codify steps as executable runbooks with approvals and logging, making drills and real events repeatable. Wiki pages and spreadsheets are unenforceable, and dashboards observe rather than act.",
  },
  {
    id: 893,
    category: "Database",
    question:
      "A DynamoDB global table exists in three Regions. What happens when an operator deletes one Regional replica table?",
    options: [
      "That Region's replica is removed from the global table; other Regional replicas continue independently (the last replica requires deleting the whole global table)",
      "All Regions' tables are deleted simultaneously",
      "The deletion is rejected in all cases",
      "The replica becomes read-only but remains",
    ],
    correctAnswers: [0],
    explanation:
      "Removing one replica detaches only that Region's table while survivors keep operating; a global table's last replica requires full deletion. The other behaviors don't match the replica model.",
  },
  {
    id: 894,
    category: "Database",
    question:
      "An Aurora Global Database's secondary Region lags more than usual during a traffic surge, threatening the DR RPO. Which monitoring directly measures this risk?",
    options: [
      "The Aurora global database replica lag metric (per secondary cluster)",
      "The primary cluster's CPU utilization",
      "The secondary Region's storage free space",
      "Route 53 health check latency",
    ],
    correctAnswers: [0],
    explanation:
      "Global database replica lag quantifies the replication delay to each secondary cluster — the direct measure of DR RPO risk. CPU, storage, and DNS metrics do not measure cross-Region replication delay.",
  },
  {
    id: 895,
    category: "High Availability & Scaling",
    question:
      "A compute fleet's Auto Scaling group must launch in a recovery Region using the correct regional AMI automatically, without hardcoding Region-specific AMI IDs in templates. Which pattern resolves the right AMI per Region?",
    options: [
      "Store the AMI ID per Region in SSM Parameter Store and reference the parameter (dynamically or via launch template resolution) at deploy time",
      "Copy the AMI into every Region and hardcode each ID in the template's conditions",
      "Use the same global AMI ID everywhere; AMI IDs are Region-independent",
      "Build a fresh AMI from scratch in the recovery Region at failover time",
    ],
    correctAnswers: [0],
    explanation:
      "SSM parameters keyed per Region (or public SSM parameters) let one template resolve the right AMI wherever it deploys — the standard multi-Region indirection pattern. Hardcoded conditionals multiply maintenance, AMI IDs are Region-scoped, and building at failover blows the RTO.",
  },
  {
    id: 896,
    category: "Compute",
    question:
      "An EKS workload needs a recovery Region deployment within 30 minutes. Workloads and manifests live in Git. What should be replicated ahead of time to meet the window?",
    options: [
      "Container images replicated cross-Region (ECR replication) with the same IaC manifests deployable to the recovery Region",
      "EKS control plane state copied via snapshot",
      "Node group instances cloned into the second Region",
      "Nothing; Kubernetes clusters rebuild themselves across Regions",
    ],
    correctAnswers: [0],
    explanation:
      "Declarative EKS recovery means Git-declared manifests redeploy into a second Region, with images pre-replicated via ECR replication so pulls are local. Control planes have no snapshot copy mechanism, node cloning isn't a thing, and clusters don't self-replicate.",
  },
  {
    id: 897,
    category: "Storage",
    question:
      "An FSx for Windows file system must be recoverable in a second Region within the RPO of one day. Which FSx capability supports cross-Region recovery?",
    options: [
      "Daily or scheduled FSx backups copied (automatically or via AWS Backup) to the second Region, restorable there",
      "Built-in FSx synchronous cross-Region replication",
      "Mounting the primary file system from the recovery Region over peering",
      "S3 replication of the NTFS metadata",
    ],
    correctAnswers: [0],
    explanation:
      "FSx backups (including AWS Backup-managed copies) can be copied to other Regions and restored there, meeting day-scale RPO. FSx doesn't natively replicate cross-Region, mounting across Regions performs poorly and isn't DR, and file systems aren't stored in S3.",
  },
  {
    id: 898,
    category: "Database",
    question:
      "A Redis-compatible workload needs its data replicated to a second Region as a durable primary store (not a cache), with regional failover. Which service and feature fit?",
    options: [
      "MemoryDB for Redis with the multi-Region capability",
      "ElastiCache Global Datastore, treating the data as disposable cache",
      "DynamoDB global tables with a Redis shim",
      "Self-managed Redis on EC2 with nightly snapshots",
    ],
    correctAnswers: [0],
    explanation:
      "MemoryDB is the durable Redis-compatible primary store, and its multi-Region capability replicates clusters across Regions with failover. Global Datastore applies to ElastiCache caches, global tables are DynamoDB, and self-managed snapshots miss minute-level durability.",
  },
  {
    id: 899,
    category: "Networking & Content Delivery",
    question:
      "A company is moving its public DNS from a legacy registrar's DNS to Route 53 with zero downtime. Which practice minimizes the cutover risk?",
    options: [
      "Create the Route 53 hosted zone with identical records first, lower record TTLs in advance, then update the registrar's name servers — keeping the old provider until propagation completes",
      "Point the registrar's name servers to Route 53 immediately after creating an empty hosted zone",
      "Delete all records at the legacy provider before creating any in Route 53",
      "Set every record's TTL to one week before migration",
    ],
    correctAnswers: [0],
    explanation:
      "Pre-building identical records, pre-lowering TTLs, and switching name servers (rather than records) keeps both providers serving during propagation. Empty zones, pre-deletion, and long TTLs each create outages or slow rollback.",
  },
  {
    id: 900,
    category: "Management & Governance",
    question:
      "When creating additional AWS accounts in an organization, what identity constraint applies to each account's root email address?",
    options: [
      "Each account requires a unique, accessible root email address distinct from every other account's",
      "All accounts can share the organization's single admin email",
      "Root emails are optional for member accounts",
      "Root email addresses must all belong to the aws.amazon.com domain",
    ],
    correctAnswers: [0],
    explanation:
      "Every account's root email must be unique (common pattern: plus-addressing like aws+billing@company.com) and remain accessible for resets. Shared emails block account creation, and member accounts still require root email access.",
  },
  {
    id: 901,
    category: "Security",
    question:
      "A Lambda function in Account A must read one bucket in Account B. The security team prefers not to manage cross-account roles for this simple read. Which access grant fits the preference?",
    options: [
      "A bucket policy in Account B directly allowing Account A's function role to read the prefix",
      "A cross-account role in B assumed by the function, doubling the identity chain",
      "Bucket ACLs granting the function's ARN",
      "Making the bucket public with an IP condition",
    ],
    correctAnswers: [0],
    explanation:
      "For simple cross-account service access, the resource policy (bucket policy) admitting the caller role is the lightest correct mechanism — no second identity hop. Cross-account roles suit richer delegation, ACLs don't take ARNs this way, and public exposure is never the answer.",
  },
  {
    id: 902,
    category: "Security",
    question:
      "A security operations center in us-east-1 must view Security Hub findings generated in eu-west-1 and ap-southeast-2 in one aggregation view. Which Security Hub feature consolidates cross-Region findings?",
    options: [
      "Cross-Region aggregation, configured with the aggregation Region and linked Regions",
      "CloudWatch cross-account observability",
      "An EventBridge rule forwarding findings to a bus",
      "Config aggregator with Security Hub enabled",
    ],
    correctAnswers: [0],
    explanation:
      "Security Hub cross-Region aggregation centralizes findings from linked Regions into an aggregation Region natively. Observability covers metrics/logs/alarms, EventBridge forwarding is a custom build, and Config aggregates configuration.",
  },
  {
    id: 903,
    category: "Security",
    question:
      "Enabling CloudTrail data events on all S3 objects organization-wide would be prohibitively expensive. How should object-level logging be scoped cost-effectively?",
    options: [
      "Advanced event selectors enabling data events only for chosen buckets/prefixes and event types",
      "Data events are all-or-nothing per Region; accept the cost",
      "Enable management events with verbose detail instead",
      "Use S3 server access logs as a cheaper exact substitute for CloudTrail data events",
    ],
    correctAnswers: [0],
    explanation:
      "Advanced event selectors filter data events by resource ARN/prefix and event type, scoping cost to what matters. Data events are not all-or-nothing, management events don't cover object reads, and access logs lack CloudTrail's identity and integration fidelity.",
  },
  {
    id: 904,
    category: "Security",
    question:
      "A data governance team wants Macie to continuously discover sensitive data across all organization accounts automatically, with findings centralized. Which Macie configuration provides this?",
    options: [
      "Automated (continuous) sensitive data discovery with a Macie delegated administrator for the organization",
      "One-time discovery jobs run manually per bucket",
      "S3 Inventory with PII columns guessed by analysts",
      "Inspector scans of bucket contents",
    ],
    correctAnswers: [0],
    explanation:
      "Automated sensitive data discovery continuously scans covered buckets org-wide under a delegated administrator, centralizing findings. Manual jobs are episodic, inventory carries no PII detection, and Inspector scans vulnerabilities.",
  },
  {
    id: 905,
    category: "Security",
    question:
      "A container platform wants continuous vulnerability rescanning of images as new CVEs are published — not only at push time. Which Inspector mode provides this?",
    options: [
      "Amazon ECR enhanced scanning (continuous scanning with rescan on new CVEs)",
      "Basic scan-on-push, which never rescans",
      "GuardDuty runtime monitoring",
      "Trusted Advisor security checks",
    ],
    correctAnswers: [0],
    explanation:
      "Enhanced scanning continuously rescan registry images as new CVE intelligence arrives, versus basic scan-on-push's single pass. Runtime monitoring detects behavior, and the other options don't scan images continuously.",
  },
  {
    id: 906,
    category: "Management & Governance",
    question:
      "An audit team must continuously collect evidence (configurations, activity, controls evidence) mapped to specific compliance frameworks for a recurring external audit. Which service automates evidence collection mapped to frameworks?",
    options: [
      "AWS Audit Manager assessments",
      "AWS Artifact report downloads",
      "AWS Config conformance packs alone",
      "AWS Security Hub standards alone",
    ],
    correctAnswers: [0],
    explanation:
      "Audit Manager maps controls to frameworks and continuously collects evidence into assessment reports. Artifact distributes AWS's own attestations, and Config or Security Hub feed controls but don't assemble audit evidence packages.",
  },
  {
    id: 907,
    category: "Management & Governance",
    question:
      "An enterprise needs a dedicated Technical Account Manager, concierge billing support, and architecture guidance reviews. Which AWS Support plan tier provides these?",
    options: [
      "Enterprise support",
      "Business support",
      "Developer support with add-ons",
      "Basic (free) support",
    ],
    correctAnswers: [0],
    explanation:
      "Enterprise support includes a TAM, concierge billing, and architecture guidance reviews. Business offers faster response SLAs without the TAM relationship, and lower tiers provide community or limited guidance.",
  },
  {
    id: 908,
    category: "Cost Optimization",
    question:
      "An organization asks which tools answer: (1) right-size my EC2 fleet, (2) recommend commitment purchases, (3) identify idle load balancers. Which trio maps correctly?",
    options: [
      "Compute Optimizer, Cost Explorer Savings Plans recommendations, Trusted Advisor cost checks",
      "Trusted Advisor, Compute Optimizer, Cost Explorer forecasts",
      "Cost Explorer recommendations, Trusted Advisor performance checks, Compute Optimizer idle advice",
      "Budgets, Cost Anomaly Detection, Pricing Calculator",
    ],
    correctAnswers: [0],
    explanation:
      "Compute Optimizer rightsizes, Cost Explorer recommends Savings Plan commitments, and Trusted Advisor flags idle resources — the correct mapping. The other trios shuffle tools across mismatched questions.",
  },
  {
    id: 909,
    category: "Cost Optimization",
    question:
      "Which two AWS services produce ML-driven recommendations for infrastructure and spend? (Select TWO.)",
    options: [
      "AWS Compute Optimizer",
      "Cost Explorer Savings Plans recommendations",
      "AWS Budgets",
      "AWS Config",
      "Service Quotas",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Compute Optimizer applies ML to utilization for sizing, and Cost Explorer's Savings Plans recommendations use ML on usage patterns for commitments. Budgets alert, Config evaluates rules, and Quotas manages limits.",
  },
  {
    id: 910,
    category: "High Availability & Scaling",
    question:
      "A regulated workload needs: multi-AZ resilience, encryption at rest and in transit, full audit trails, and a second-Region DR posture. Which service bundle satisfies all four requirements?",
    options: [
      "Multi-AZ deployments with KMS encryption, TLS via ACM, an organization CloudTrail with integrity validation, and AWS Backup cross-Region copies",
      "Single-AZ deployments with SSE-S3, a local application log file, and weekly manual exports",
      "Multi-AZ with plaintext internal traffic, Config rules only for audit, and no second Region",
      "Two Regions both writing independently with no encryption, using CloudWatch alarms as audit",
    ],
    correctAnswers: [0],
    explanation:
      "This bundle directly maps each requirement: multi-AZ for availability, KMS/ACM for encryption, CloudTrail (org trail, validated) for audit, and Backup's cross-Region copies for DR. The alternatives each fail at least one requirement outright.",
  },
];
