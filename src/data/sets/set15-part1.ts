import type { QuizQuestion } from "../questions";

/** Practice Set 15 — questions 911–932 (exam-simulation scenario gauntlet). Original questions. */
export const set15Part1: QuizQuestion[] = [
  {
    id: 911,
    category: "Networking & Content Delivery",
    question:
      "A premium content app generates time-limited download links per purchase, optionally restricting the buyer's IP. Assets sit behind CloudFront. Which mechanism implements these expiring, optionally IP-locked links?",
    options: [
      "CloudFront signed URLs with a custom policy (expiry and IP conditions)",
      "S3 presigned URLs, which cannot include IP restrictions",
      "Origin Access Control alone, which authorizes the distribution not the user",
      "WAF rate rules keyed on the user's IP",
    ],
    correctAnswers: [0],
    explanation:
      "Signed URLs with custom policies carry expiry and IP conditions signed into the URL — exactly the requirement. Presigned S3 URLs lack IP conditions, OAC gates the origin not end users, and WAF throttles rather than authorizes purchases.",
  },
  {
    id: 912,
    category: "Analytics",
    question:
      "A telemetry platform ingests millions of events daily with per-device sequence ordering, spiky unpredictable volume, and a requirement to replay the last 7 days after consumer bugs. Which Kinesis configuration meets all three?",
    options: [
      "On-demand data streams with a 7-day retention period",
      "Provisioned streams with 24-hour retention and manual resharding",
      "Firehose delivery to S3 with Athena replay queries",
      "SQS FIFO with 14-day retention per device group",
    ],
    correctAnswers: [0],
    explanation:
      "On-demand absorbs unpredictable spikes without shard planning, per-key ordering is native, and 7-day retention enables the replay window. Provisioned/24-hour misses both elasticity and replay, Firehose is delivery not replayable processing, and SQS ordering groups don't give stream semantics.",
  },
  {
    id: 913,
    category: "Database",
    question:
      "A leaderboard serves 10,000 reads per second against a small set of hot items, with eventual consistency acceptable for display purposes. Which addition cuts both DynamoDB cost and latency most directly?",
    options: [
      "Amazon DynamoDB Accelerator (DAX) for in-memory item caching",
      "A global secondary index on the score attribute",
      "Provisioned capacity doubled for safety",
      "Moving leaderboard math into Lambda on every read",
    ],
    correctAnswers: [0],
    explanation:
      "DAX serves repeated hot-item reads from memory in microseconds, directly reducing table RCUs and read latency for an eventually-consistent display. Indexes change access patterns, extra capacity pays full price for repeat reads, and compute-per-read adds cost.",
  },
  {
    id: 914,
    category: "Compute",
    question:
      "Uploaded images flow through moderation, tagging, and thumbnail steps — each retryable, with an approval pause for flagged content — before publication. Which orchestration design coordinates this serverless pipeline?",
    options: [
      "A Step Functions state machine with retryable task states and an approval wait (callback token) before publishing",
      "Chained S3 event notifications where each Lambda triggers the next directly",
      "A cron-driven batch that processes all pending images hourly",
      "DynamoDB Streams triggering each step in sequence",
    ],
    correctAnswers: [0],
    explanation:
      "The pipeline has retries, branching, and a human pause — Step Functions models all three natively. Direct chaining couples steps with no retry/branch model, cron batches add latency, and Streams fire on data changes rather than orchestrating workflow.",
  },
  {
    id: 915,
    category: "Analytics",
    question:
      "Long-term log analytics must avoid per-query partition metadata management as daily partitions accumulate into tens of thousands. Which Athena feature eliminates manual partition registration?",
    options: [
      "Partition projection, computing partition locations from patterns instead of catalog metadata",
      "Glue crawlers run every hour",
      "Larger Athena workgroup scan limits",
      "Storing all logs unpartitioned with filters",
    ],
    correctAnswers: [0],
    explanation:
      "Partition projection derives partition locations from configuration patterns (dates, IDs), removing crawler runs and catalog registration entirely. Crawlers automate but add cost/latency, scan limits cap cost, and unpartitioned scans read everything.",
  },
  {
    id: 916,
    category: "Storage",
    question:
      "An ML training workload reads a 1 PB S3 dataset through a POSIX interface for several weeks, after which training stops and the dataset should revert to cheap archive storage. Which pairing fits the access phase and the aftermath?",
    options: [
      "FSx for Lustre linked to the S3 bucket during training; S3 lifecycle transitions the dataset to a cold class when training ends",
      "EFS Standard mounted on training nodes; originals deleted after training",
      "Instance store caches sized to 1 PB per node",
      "Redshift Spectrum queried by the training framework",
    ],
    correctAnswers: [0],
    explanation:
      "FSx for Lustre presents S3 data as a POSIX file system at HPC throughput for training, while lifecycle rules move the source data to cheap storage afterward. EFS doesn't reach HPC throughput, per-node caches can't reach 1 PB, and Spectrum is SQL analytics.",
  },
  {
    id: 917,
    category: "Security",
    question:
      "Which service stack assembles the standard organization-wide threat detection and response posture: continuous threat findings, aggregated prioritization, and investigation graphing?",
    options: [
      "GuardDuty (findings) + Security Hub (aggregation) + Detective (investigation)",
      "Inspector + Macie + Artifact",
      "Config + Trusted Advisor + Support Center",
      "CloudTrail + KMS + WAF",
    ],
    correctAnswers: [0],
    explanation:
      "This trio is the canonical detection-to-investigation chain: GuardDuty detects, Security Hub aggregates and prioritizes, Detective graphs root cause. The alternatives mix vulnerability scanning, data classification, attestations, and unrelated services.",
  },
  {
    id: 918,
    category: "Networking & Content Delivery",
    question:
      "A monolithic web application is being decomposed incrementally: new microservices must take over specific paths while the monolith keeps serving everything else, with clients unaware of the change. Which routing pattern implements the strangler approach?",
    options: [
      "ALB path-based listener rules forwarding rewritten paths to new microservice target groups, defaulting remaining paths to the monolith",
      "Deploying microservices on new subdomains and updating all clients immediately",
      "Cloning the monolith per service and deleting code paths one by one with downtime windows",
      "Route 53 weighted records splitting users between monolith and microservices randomly",
    ],
    correctAnswers: [0],
    explanation:
      "Path-based routing funnels only claimed paths to new services, leaving the monolith as default — the strangler fig pattern with zero client impact. New subdomains break the 'clients unaware' constraint, clones add downtime, and weighted splits send unready traffic anywhere.",
  },
  {
    id: 919,
    category: "Compute",
    question:
      "An on-demand video platform must transcode uploads into multiple bitrates automatically and serve them globally to entitled users with expiring access. Which service combination covers processing, private origin, and entitled delivery?",
    options: [
      "MediaConvert triggered on upload, CloudFront with Origin Access Control to the private assets, and signed cookies for entitlement windows",
      "Elastic Transcoder rendering through Lambda functions with public buckets",
      "Kinesis Video Streams ingesting MP4 files for playback",
      "MediaLive broadcasting to viewers directly from S3",
    ],
    correctAnswers: [0],
    explanation:
      "MediaConvert handles file-based transcodes on upload; OAC keeps the asset bucket private behind CloudFront; signed cookies grant entitled users time-boxed access. Elastic Transcoder is legacy, Kinesis Video is for device streams, and MediaLive is live broadcast encoding.",
  },
  {
    id: 920,
    category: "Analytics",
    question:
      "A fraud engine must score events end to end in under 100 milliseconds, joining event streams with feature lookups. Which streaming design meets the latency target?",
    options: [
      "Kinesis Data Streams consumed by Managed Service for Apache Flink, writing scores to DynamoDB read through DAX",
      "Athena queries fired per event over S3 event archives",
      "SQS FIFO queue consumed by a polling Lambda writing to Redshift",
      "Redshift streaming ingestion queried per transaction",
    ],
    correctAnswers: [0],
    explanation:
      "Flink processes Kinesis events in memory with millisecond latency, and DynamoDB with DAX serves feature/score lookups in single-digit milliseconds — together meeting 100 ms. Athena and Redshift are batch/warehouse latency classes, and SQS polling adds seconds.",
  },
  {
    id: 921,
    category: "Compute",
    question:
      "A media company must stream live events to 100,000 concurrent viewers with interactive chat, minimizing operational overhead. Which managed service pairs best?",
    options: [
      "Amazon IVS for managed live streaming with chat SDK",
      "Self-managed Nginx RTMP servers on EC2 behind CloudFront",
      "Kinesis Video Streams delivering to viewers directly",
      "MediaConnect distributing viewer streams",
    ],
    correctAnswers: [0],
    explanation:
      "IVS is the fully managed live streaming service (ingest, transcode, delivery, chat) built for large interactive audiences. Self-managed RTMP reintroduces operations, Kinesis Video Streams targets device ingestion rather than mass viewing, and MediaConnect moves contribution feeds.",
  },
  {
    id: 922,
    category: "Security",
    question:
      "Data residency rules prohibit European personal data from leaving EU Regions, yet the application must serve users worldwide. Which design respects residency while serving globally?",
    options: [
      "Keep personal data in EU-only storage; global users access the EU application, with only non-personal derived content (aggregates, assets) distributed globally",
      "Replicate personal data to us-east-1 with EU-only write permissions",
      "Encrypt personal data and place copies anywhere, since encryption satisfies residency",
      "Store personal data in a US Region behind an EU-only IAM policy",
    ],
    correctAnswers: [0],
    explanation:
      "Residency binds physical location; the compliant pattern keeps personal data in EU storage and serves global users from the EU, distributing only derived non-personal content. Replication outside the EU violates residency regardless of permissions, and encryption does not relocate data.",
  },
  {
    id: 923,
    category: "Storage",
    question:
      "Financial archives must be: immutable for 7 years, auditable for who accessed them, with periodic integrity verification. Which trio of S3 features satisfies all three?",
    options: [
      "Object Lock (compliance mode) + CloudTrail data events + additional checksums verified on read",
      "Versioning + server access logs + Intelligent-Tiering",
      "Object Lock governance mode + Storage Lens + CRR",
      "MFA delete + S3 Inventory + Transfer Acceleration",
    ],
    correctAnswers: [0],
    explanation:
      "Compliance-mode Object Lock gives absolute immutability, CloudTrail data events identify every reader, and stored checksums prove integrity on demand. The alternatives each swap a requirement for an unrelated feature.",
  },
  {
    id: 924,
    category: "Cost Optimization",
    question:
      "Which two architecture decisions reduce NAT gateway data processing charges in a private-subnet workload? (Select TWO.)",
    options: [
      "Route S3 and DynamoDB traffic through free gateway VPC endpoints",
      "Keep chatty services in the same AZ as their NAT gateway where feasible",
      "Move instances to public subnets with auto-assigned public IPs",
      "Add more NAT gateways in the same AZ",
      "Enable MTU discovery jumbo frames on instances",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Gateway endpoints remove S3/DynamoDB bytes from NAT processing entirely, and co-locating chatty services with their AZ's gateway avoids cross-AZ transfer and duplicated processing. Public subnets remove the isolation model, extra same-AZ gateways add cost without benefit, and MTU tuning doesn't change the charge model.",
  },
  {
    id: 925,
    category: "Migration & Transfer",
    question:
      "Fifty partner companies SFTP files to the platform, each landing in its own S3 prefix and seeing only its own directory. Credentials map to each partner's external identity store. Which Transfer Family configuration delivers per-partner isolation?",
    options: [
      "Custom identity provider integration with logical home directories mapping each user to their prefix",
      "One shared SFTP user with a bucket policy filtering by source IP per partner",
      "Fifty separate Transfer Family servers, one per partner",
      "S3 access points only, without Transfer Family",
    ],
    correctAnswers: [0],
    explanation:
      "Transfer Family's custom IdP integration plus logical directories (chroot-style) scopes each partner user to its own prefix from one server. IP-filtered shared users conflate authentication, fifty servers multiply operations, and access points alone don't provide the SFTP endpoint.",
  },
  {
    id: 926,
    category: "Database",
    question:
    "A Cassandra-compatible table stores session records that must expire automatically a fixed time after writing, without delete jobs. Which Keyspaces feature provides per-row expiry?",
    options: [
      "Amazon Keyspaces TTL on rows",
      "Cassandra compaction strategy settings",
      "A DynamoDB-style TTL attribute mapping automatically",
      "Keyspaces point-in-time recovery expiry",
    ],
    correctAnswers: [0],
    explanation:
      "Keyspaces supports per-row TTL, expiring session records automatically exactly like the Cassandra TTL model. Compaction strategies manage storage structure, and PITR governs backup windows.",
  },
  {
    id: 927,
    category: "Compute",
    question:
      "In an ECS task definition, one IAM role lets the containerized application call S3, while another role lets ECS pull the image and ship logs. How are these roles named?",
    options: [
      "Task role for application permissions; task execution role for image pull, logging, and secret retrieval",
      "Execution role for application permissions; task role for the ECS agent",
      "Both are task roles with merged policies",
      "Instance profile for the app; task role for logging",
    ],
    correctAnswers: [0],
    explanation:
      "The task role carries the application's AWS permissions; the execution role powers the ECS machinery around the task (ECR pull, CloudWatch logging, Secrets Manager/SSM retrieval). The other pairings swap or merge these distinct responsibilities.",
  },
  {
    id: 928,
    category: "Compute",
    question:
      "Container tasks need database credentials at launch, fetched from Secrets Manager without being baked into images or environment files. Which ECS mechanism injects them?",
    options: [
      "Secret references in the task definition, resolved by the task execution role at launch",
      "A startup script curling the Secrets Manager API with instance credentials",
      "Environment variables hardcoded in the Dockerfile",
      "S3 objects mounted as volumes containing credentials",
    ],
    correctAnswers: [0],
    explanation:
      "Task definitions can reference Secrets Manager or Parameter Store ARNs; ECS resolves them at launch using the execution role, injecting them as environment variables. Startup scripts, baked variables, and credential files all persist secrets improperly.",
  },
  {
    id: 929,
    category: "Compute",
    question:
      "Which two options serve a static website globally with managed HTTPS? (Select TWO.)",
    options: [
      "S3 bucket with a CloudFront distribution (OAC) and ACM certificate",
      "AWS Amplify Hosting connected to the Git repository",
      "An ALB in two AZs forwarding to S3",
      "A Lightsail database with a static IP",
      "Route 53 failover between two EBS volumes",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudFront-plus-S3 and Amplify Hosting are the two managed static-hosting patterns with HTTPS. ALBs don't serve S3 as targets, Lightsail databases store data, and EBS volumes aren't websites.",
  },
  {
    id: 930,
    category: "Cost Optimization",
    question:
      "CloudWatch Logs ingestion is dominated by debug and access noise lines the team doesn't analyze. Where should filtering occur to cut ingestion cost at the source?",
    options: [
      "Configure the CloudWatch agent (or logging framework) to drop or sample unneeded lines before sending",
      "Increase the log group's retention period",
      "Use Logs Insights to ignore noise at query time",
      "Compress log streams after ingestion",
    ],
    correctAnswers: [0],
    explanation:
      "Ingestion is billed on bytes accepted, so filtering or sampling at the agent/framework before delivery is the only point that removes the charge. Retention, query-time filtering, and post-ingestion compression bill the full ingestion first.",
  },
  {
    id: 931,
    category: "Management & Governance",
    question:
      "Twenty accounts must page one on-call system when critical alarms fire, with correlated multi-alarm incidents paging once. Which design wires this?",
    options: [
      "Account alarms publish to local SNS topics, EventBridge collects cross-account events into a central bus, and composite alarms suppress correlated pages before the pager integration",
      "Each account pages the pager system directly with no correlation",
      "CloudWatch cross-region dashboards reviewed every 15 minutes by operators",
      "Email digests of alarms sent hourly to the on-call inbox",
    ],
    correctAnswers: [0],
    explanation:
      "Local SNS + cross-account EventBridge centralizes events, and composite alarms collapse correlated failures into single pages before the pager integration fires. Direct paging drowns the on-call, dashboards aren't paging, and digests aren't urgent.",
  },
  {
    id: 932,
    category: "Compute",
    question:
      "Which two practices harden Fargate task security posture? (Select TWO.)",
    options: [
      "Scope each service's task role to exactly its resource needs",
      "Inject secrets via task definition secret references rather than baking them into images",
      "Run tasks as root inside containers for simpler file access",
      "Share one broad task role across all services for simplicity",
      "Disable container logs to reduce exposure",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Least-privilege task roles and launch-time secret injection remove the two most common container credential weaknesses. Root containers, shared broad roles, and disabled logging all worsen posture.",
  },
];
