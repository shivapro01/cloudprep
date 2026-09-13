import type { QuizQuestion } from "../questions";

/** Practice Set 9 — questions 521–542 (scenario architecture decisions). Original questions. */
export const set9Part1: QuizQuestion[] = [
  {
    id: 521,
    category: "Storage",
    question:
      "A photo application stores original uploads in S3. When a user uploads a photo, a thumbnail must be generated once and served millions of times afterward. Originals are almost never read again after processing. Which design minimizes lifetime cost?",
    options: [
      "Keep originals and thumbnails in S3 Standard permanently",
      "Generate thumbnails on S3 event via Lambda into a thumbnails prefix; apply lifecycle rules moving originals to an infrequent or archive class shortly after upload",
      "Store originals on EBS volumes attached to a media server for fast regeneration",
      "Generate thumbnails on demand from originals for every request via Lambda",
    ],
    correctAnswers: [1],
    explanation:
      "Derived data (thumbnails) carries the traffic and stays cheap to serve, while originals — rarely re-read after processing — fall to lower-cost classes through lifecycle rules. Keeping everything hot overpays for originals, server volumes re-introduce instance management, and per-request regeneration is slow and expensive.",
  },
  {
    id: 522,
    category: "Database",
    question:
      "A chat platform tracks user presence (online/away/last-seen) with sub-millisecond reads updated constantly. Presence data is ephemeral — losing it is acceptable. Which store fits?",
    options: [
      "DynamoDB with on-demand capacity",
      "ElastiCache for Redis",
      "Aurora PostgreSQL",
      "S3 with frequent overwrites",
    ],
    correctAnswers: [1],
    explanation:
      "Ephemeral, write-heavy, sub-millisecond presence state is the classic Redis use case; TTLs expire stale presence automatically. Durable databases add cost and latency for data that does not need durability, and S3 is not a low-latency mutable store.",
  },
  {
    id: 523,
    category: "Application Integration",
    question:
      "A media platform's transcoding consumers are overwhelmed during evening upload spikes, and uploads fail when consumers fall behind. Which decoupling design absorbs the spikes?",
    options: [
      "Scale the upload API to reject requests during spikes",
      "Write upload events to an SQS queue; an ECS consumer fleet processes at its own pace with autoscaling on queue depth",
      "Process uploads synchronously in the upload API with retries",
      "Store upload events in ElastiCache and poll from consumers",
    ],
    correctAnswers: [1],
    explanation:
      "Queue-buffered consumers decouple acceptance from processing, and scaling the consumer fleet on queue backlog absorbs spikes without losing uploads. Rejecting uploads fails users directly, synchronous processing couples the failure domains, and a cache is not a durable buffer.",
  },
  {
    id: 524,
    category: "Security",
    question:
      "Privacy law requires that when a customer requests deletion, the company can prove their data is unrecoverable — including from encrypted backups that cannot be edited. Which cryptographic design satisfies this?",
    options: [
      "Encrypt each customer's data with a unique KMS key; deleting that key renders the customer's data (and their portion of backups) permanently undecryptable",
      "Write deletion markers into every backup file",
      "Restore each backup, delete rows, and re-store it on request",
      "Redact data at read time with a filter in the application",
    ],
    correctAnswers: [0],
    explanation:
      "Crypto-shredding destroys only the per-customer key, instantly and provably making that customer's data unrecoverable everywhere it is encrypted — including immutable backups. Markers and read-time filters leave the data recoverable, and restore-delete-restore does not scale and misses other copies.",
  },
  {
    id: 525,
    category: "Security",
    question:
      "An auditor asks which principals used a specific KMS key during the last month, with request context. Which data source answers this precisely?",
    options: [
      "KMS key rotation history",
      "CloudTrail management events for the key's ARN, queryable in CloudWatch Logs Insights or Athena",
      "The key policy's statement list",
      "AWS Config recorder for the KMS key",
    ],
    correctAnswers: [1],
    explanation:
      "Every KMS API call (encrypt, decrypt, describe) is a CloudTrail event carrying the principal and context, queryable over the retention window. Rotation history, key policies, and Config state do not record usage.",
  },
  {
    id: 526,
    category: "Networking & Content Delivery",
    question:
      "After a security group change, instances in one subnet cannot reach the internet, but instances in a peer subnet work fine. Network engineers need packet-level proof of where traffic is being rejected. Which evidence shows the drop and the reason?",
    options: [
      "VPC Flow Logs showing entries with the REJECT action for the affected ENIs",
      "CloudTrail LookupEvents for security group changes",
      "ALB access logs showing 502 responses",
      "AWS Config compliance timeline",
    ],
    correctAnswers: [0],
    explanation:
      "Flow logs record each flow's accept/reject decision at the ENI, directly proving which rule layer dropped the traffic. CloudTrail shows that a change happened but not its traffic effect, ALB logs only see app-layer failures, and Config shows configuration drift without packet outcomes.",
  },
  {
    id: 527,
    category: "Management & Governance",
    question:
      "Development, staging, and production must run identical architecture with different instance sizes, feature flags, and database names. Rolling out a change must update all three consistently. Which approach minimizes drift?",
    options: [
      "One parameterized infrastructure template deployed per environment with environment-specific parameters",
      "Three separately maintained templates copied by hand",
      "Production deployed by template; lower environments built manually to save time",
      "A single shared stack serving all environments with tags",
    ],
    correctAnswers: [0],
    explanation:
      "One parameterized template deployed three times keeps structure identical while parameters vary sizing and names — the core of drift-free multi-environment design. Copied templates diverge, manual environments drift immediately, and a shared stack cannot isolate environments.",
  },
  {
    id: 528,
    category: "Networking & Content Delivery",
    question:
      "A website serves static assets from S3 and dynamic API responses from an ALB, both under www.example.com. Users must reach both without cross-origin issues, with assets cached globally. Which design fits?",
    options: [
      "Two domains: assets.example.com (S3) and api.example.com (ALB)",
      "One CloudFront distribution with path-based behaviors: /api/* forwarding to the ALB, everything else serving the S3 origin",
      "S3 static hosting with API Gateway CORS headers only",
      "An ALB rule forwarding /assets/* to S3",
    ],
    correctAnswers: [1],
    explanation:
      "A single CloudFront distribution with path-based behaviors gives one origin domain (no CORS), global caching for assets, and direct forwarding for API calls. Multiple domains reintroduce CORS configuration, and ALBs cannot serve S3 object storage directly as a target.",
  },
  {
    id: 529,
    category: "Security",
    question:
      "European data protection rules require that a dataset's objects never leave EU Regions, including any copies. Which controls enforce residency for an S3-based system?",
    options: [
      "Deploy in EU Regions only, avoid cross-Region replication outside the EU, and restrict access policies accordingly",
      "Use cross-Region replication to us-east-1 with aggressive lifecycle deletion",
      "Encrypt with KMS; encryption satisfies residency rules everywhere",
      "Store in S3 Standard in us-east-1 but access it from EU users over Direct Connect",
    ],
    correctAnswers: [0],
    explanation:
      "Residency is a placement property: keeping storage and processing inside EU Regions, without replication outward, satisfies the constraint. Copying outside the EU violates it regardless of later deletion, and encryption does not relocate data.",
  },
  {
    id: 530,
    category: "Management & Governance",
    question:
      "New accounts created by a data science team must be unable to launch expensive GPU instances, with alerts if attempted. Which pair of controls implements this preventive + detective pattern?",
    options: [
      "An SCP denying the GPU instance families, plus a Cost Anomaly Detection or Budget alert on the account",
      "A permissions boundary on the root user of the new account",
      "Trusted Advisor service limit checks",
      "A Config rule that terminates GPU instances nightly",
    ],
    correctAnswers: [0],
    explanation:
      "The SCP prevents GPU launches before they happen, and cost alerting detects anything that slips through — prevention plus detection. Root boundaries are set from within the account, Trusted Advisor is advisory, and nightly termination pays for the usage first.",
  },
  {
    id: 531,
    category: "Management & Governance",
    question:
      "A development team wants a complete isolated environment (infrastructure plus data seed) created automatically for every pull request and destroyed when the PR merges. Which pattern delivers this?",
    options: [
      "One long-lived shared dev environment refreshed weekly",
      "Infrastructure as code deployed with a per-PR stack name (for example, pr-123), triggered by the CI system and deleted on merge",
      "Cloning the production account for each PR",
      "Manual environments built by the on-call engineer per request",
    ],
    correctAnswers: [1],
    explanation:
      "Ephemeral per-PR stacks from the same IaC codebase give isolated, reproducible environments with automatic lifecycle tied to the PR. Shared environments cause contention and drift, account cloning is heavy and risky, and manual builds cannot scale.",
  },
  {
    id: 532,
    category: "Analytics",
    question:
      "A retail site performs inventory searches with complex filters (multi-field, faceted, typo-tolerant) across 100,000 SKUs, requiring sub-second response. Which technology fits this search workload?",
    options: [
      "DynamoDB Scan with filter expressions",
      "Amazon OpenSearch Service with proper index mappings",
      "Athena queries over S3 per keystroke",
      "Aurora with LIKE queries across columns",
    ],
    correctAnswers: [1],
    explanation:
      "Faceted, fuzzy, full-text search at interactive latency is OpenSearch's core strength. DynamoDB scans read everything and are slow, Athena is batch SQL over S3, and relational LIKE queries cannot deliver typo-tolerant faceted search performance.",
  },
  {
    id: 533,
    category: "Analytics",
    question:
      "Two million call recordings are transcribed overnight. Transcript text must be searchable by analysts; raw audio is rarely needed after 30 days. Which storage design fits the outputs?",
    options: [
      "Store transcripts in S3 with a Glue catalog for Athena search, and transition raw audio to a colder storage class after 30 days via lifecycle",
      "Store transcripts and audio in DynamoDB for fast search",
      "Keep everything in S3 Standard indefinitely for simplicity",
      "Store transcripts in Redshift and audio on EBS volumes",
    ],
    correctAnswers: [0],
    explanation:
      "Text in S3 cataloged for Athena gives serverless search over transcripts, while lifecycle rules retire the bulky audio automatically. DynamoDB item limits and cost make it wrong for files, indefinite Standard storage wastes money, and EBS audio storage is operationally awkward.",
  },
  {
    id: 534,
    category: "Management & Governance",
    question:
      "A policy requires that every S3 bucket in the organization is encrypted, not publicly readable, and versioned — verified continuously with alerts on violations. Which combination provides ongoing enforcement visibility?",
    options: [
      "AWS Config rules evaluated organization-wide with findings aggregated in Security Hub",
      "A monthly manual review script run by the security team",
      "CloudTrail data events reviewed after incidents",
      "S3 Storage Lens protection metrics only",
    ],
    correctAnswers: [0],
    explanation:
      "Config evaluates each bucket against the policy rules continuously, and Security Hub aggregates and prioritizes the findings organization-wide. Manual reviews are periodic, CloudTrail is forensic, and Storage Lens reports metrics without policy verdicts.",
  },
  {
    id: 535,
    category: "Application Integration",
    question:
      "An IoT fleet manager must push firmware updates to subsets of devices (by model, region, or tag), tracking per-device completion and retrying failures. Which IoT Core feature orchestrates OTA updates?",
    options: [
      "AWS IoT Jobs (IoT Jobs DataPlane)",
      "A Lambda function publishing firmware bytes over MQTT directly",
      "S3 presigned URLs emailed to devices",
      "CodeDeploy with IoT compute platform",
    ],
    correctAnswers: [0],
    explanation:
      "IoT Jobs targets device groups with rollout controls, per-device job execution status, and retries — built for fleet OTA. Raw MQTT pushes lack targeting and tracking, email links are unmanageable at fleet scale, and CodeDeploy targets compute platforms, not devices.",
  },
  {
    id: 536,
    category: "Networking & Content Delivery",
    question:
      "A media site publishes new images constantly behind CloudFront. Using cache invalidations for every upload is becoming slow and costly. Which publishing pattern avoids mass invalidations?",
    options: [
      "Version object keys per release or upload (unique filenames) so new content is a cache miss naturally",
      "Set the default TTL to 5 seconds so content refreshes quickly everywhere",
      "Disable caching for image paths",
      "Purge the whole distribution path after each upload",
    ],
    correctAnswers: [0],
    explanation:
      "Immutable, unique object keys make every new version a distinct cacheable object — no invalidations needed. Tiny TTLs degrade cache hit ratios, disabled caching destroys the CDN benefit, and full-path invalidations are the expensive anti-pattern being replaced.",
  },
  {
    id: 537,
    category: "Database",
    question:
      "An inventory service must prevent lost updates when two writers modify the same item concurrently. Updates should apply only if the item has not changed since it was read. Which DynamoDB mechanism implements optimistic locking?",
    options: [
      "A ConditionExpression requiring the item's version attribute to equal the version that was read",
      "DynamoDB transactions with isolation level serializable across all items in the table",
      "A global secondary index on the version attribute",
      "Provisioned capacity with higher write units",
    ],
    correctAnswers: [0],
    explanation:
      "Storing a version number and conditionally writing only when it matches implements optimistic locking at item level, failing the write on concurrent modification. Full transactions are heavier than needed for single-item CAS, indexes don't enforce versions, and capacity doesn't change semantics.",
  },
  {
    id: 538,
    category: "Analytics",
    question:
      "A partner team must query specific tables of a data lake in S3 without downloading data or accessing the raw buckets. Fine-grained table- and column-level permissions are required. Which pair of services provides governed SQL access?",
    options: [
      "AWS Lake Formation permissions with Athena for governed queries",
      "S3 presigned URLs to the bucket shared with partners",
      "A Redshift cluster provisioned for partners with full access",
      "Glue crawlers run on behalf of partners weekly",
    ],
    correctAnswers: [0],
    explanation:
      "Lake Formation grants table, column, row, and cell-level access to the Glue catalog, and Athena enforces those grants at query time — governed sharing without data copies. Presigned URLs bypass fine-grained control, a shared cluster over-exposes, and crawlers only catalog data.",
  },
  {
    id: 539,
    category: "Compute",
    question:
      "A multi-step order workflow runs across several Lambda functions. Each function is stateless, yet the workflow's position and intermediate data must survive between steps and across function restarts. Where should workflow state live?",
    options: [
      "In Lambda environment variables updated between steps",
      "In the workflow engine's state — for example a Step Functions execution's context, passed between steps",
      "In an ElastiCache node local to the first function",
      "In the API Gateway stage variables",
    ],
    correctAnswers: [1],
    explanation:
      "The orchestration engine owns workflow state: Step Functions persists execution data between steps reliably, freeing functions to stay stateless. Lambda environment variables are per-version constants, cache nodes don't survive failures by design, and stage variables are static configuration.",
  },
  {
    id: 540,
    category: "Application Integration",
    question:
      "A low-traffic internal REST API must be reachable only from inside the VPC, with the lowest possible managed cost. Which API Gateway option fits?",
    options: [
      "An HTTP (API Gateway v2) API with a VPC endpoint (private integration), which prices lower than REST APIs",
      "A REST API regional endpoint with a usage plan",
      "A REST API private endpoint with a usage plan and API keys",
      "An ALB in front of Lambda functions in private subnets",
    ],
    correctAnswers: [0],
    explanation:
      "HTTP APIs offer the core REST features at a lower price than REST APIs, and private endpoints restrict reachability to the VPC through interface endpoints. REST APIs cost more for features this internal API doesn't need, and an ALB-plus-Lambda stack adds moving parts.",
  },
  {
    id: 541,
    category: "Cost Optimization",
    question:
      "Application logs must be searchable for 90 days and retained for 7 years for legal hold, queried rarely after the first year. Which logging lifecycle minimizes cost?",
    options: [
      "Keep all logs in CloudWatch Logs with 7-year retention",
      "Stream logs via subscription filter (Firehose) to S3, set CloudWatch retention to 90 days, and apply S3 lifecycle transitions to cold storage after a year",
      "Delete logs after 90 days to avoid storage cost",
      "Email daily logs to the legal department for archiving",
    ],
    correctAnswers: [1],
    explanation:
      "Hot search stays in CloudWatch for the active window; S3 holds the legal archive cheaply with lifecycle transitions for the long tail. Seven years of CloudWatch retention is prohibitively expensive, deletion violates the hold, and email is not an archive system.",
  },
  {
    id: 542,
    category: "Cost Optimization",
    question:
      "Which two services bill primarily per request rather than per hour of provisioned capacity? (Select TWO.)",
    options: [
      "Amazon API Gateway",
      "Amazon SQS",
      "An Application Load Balancer",
      "A NAT gateway",
      "Amazon EC2 On-Demand instances",
    ],
    correctAnswers: [0, 1],
    explanation:
      "API Gateway charges per request (plus data transfer) and SQS per request — both track usage directly. Load balancers, NAT gateways, and EC2 instances bill on time-based capacity regardless of use.",
  },
];
