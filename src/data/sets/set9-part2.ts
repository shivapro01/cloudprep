import type { QuizQuestion } from "../questions";

/** Practice Set 9 — questions 543–564 (operational scenarios). Original questions. */
export const set9Part2: QuizQuestion[] = [
  {
    id: 543,
    category: "Networking & Content Delivery",
    question:
      "After deploying updated CSS to an S3 origin, users still see the old stylesheet from CloudFront. The team is considering cache invalidations for every release. Which publishing practice avoids both staleness and invalidation cost at scale?",
    options: [
      "Run an invalidation on /* after every deploy",
      "Fingerprint release artifacts into the filename (app.a8f3.css) so each release is a new cache key, with long TTLs",
      "Set TTLs to 60 seconds on all assets",
      "Ask users to hard-refresh their browsers",
    ],
    correctAnswers: [1],
    explanation:
      "Content-hashed filenames make every release a distinct object, so caches fetch new versions naturally — invalidations become unnecessary. Invalidating wildcards is slow and costly, short TTLs degrade hit ratio, and user actions are not a strategy.",
  },
  {
    id: 544,
    category: "Database",
    question:
      "Before a planned maintenance, a team will promote an RDS read replica to primary. Reports show the replica consistently lags by several minutes. What should happen immediately before cutover to protect data integrity?",
    options: [
      "Promote immediately; lag resolves after promotion",
      "Pause or reduce writes on the primary and wait until the replica lag reaches zero, then promote",
      "Restart the replica to force synchronization",
      "Take a snapshot of the primary and promote the replica simultaneously",
    ],
    correctAnswers: [1],
    explanation:
      "Promoting a lagging replica loses every transaction still in flight; quiescing writes until lag reaches zero makes the cutover lossless. Restarting the replica does not accelerate asynchronous catch-up, and snapshots do not sync a replica.",
  },
  {
    id: 545,
    category: "Networking & Content Delivery",
    question:
      "Clients behind an ALB intermittently receive 504 Gateway Timeout errors for a specific endpoint. The target group shows healthy targets. What is the most likely cause?",
    options: [
      "The load balancer's security group blocks the clients",
      "The backend takes longer to respond than the load balancer's idle timeout on that slow endpoint",
      "The target group's health check path returns 404",
      "Cross-zone load balancing is disabled",
    ],
    correctAnswers: [1],
    explanation:
      "A 504 means the chosen target did not respond within the connection/idle timeout — the endpoint is simply too slow, so the backend must be optimized or the timeout tuned appropriately. Security group blocks would prevent connections entirely, a failing health check would show unhealthy targets, and cross-zone affects distribution.",
  },
  {
    id: 546,
    category: "High Availability & Scaling",
    question:
      "During an application deployment, Auto Scaling replaces instances that the load balancer marks unhealthy, repeatedly rolling back the change. The new version returns 500s while migrations run. What explains the terminations?",
    options: [
      "The ELB health check fails against the new version during its startup window, so the group considers the instances unhealthy and replaces them",
      "Termination protection is disabled on the instances",
      "The deployment exceeds the group's cooldown period",
      "Spot capacity was reclaimed during the deploy",
    ],
    correctAnswers: [0],
    explanation:
      "When new instances fail the load balancer's health criteria (500s during startup/migrations), the ASG treats them as failed and replaces them, cycling indefinitely. Termination protection, cooldowns, and Spot reclamation are unrelated to version-specific health failures.",
  },
  {
    id: 547,
    category: "Analytics",
    question:
      "Athena charges per byte scanned, and one analyst's exploratory queries occasionally scan the entire petabyte dataset. Which control caps the blast radius of any single query?",
    options: [
      "A workgroup-level data scan limit per query, with over-limit queries failing",
      "Partition projection on the S3 bucket",
      "Enabling query result reuse for the workgroup",
      "Compressing the underlying files with gzip",
    ],
    correctAnswers: [0],
    explanation:
      "Workgroups enforce per-query and per-workgroup scan limits, hard-capping the cost of runaway queries. Partitioning and compression reduce what a well-formed query scans but don't cap worst cases, and result reuse only helps repeated identical queries.",
  },
  {
    id: 548,
    category: "Storage",
    question:
      "A legal team urgently needs one archived object from S3 Glacier Flexible Retrieval restored within minutes. Which retrieval option applies?",
    options: [
      "Bulk retrieval",
      "Standard retrieval",
      "Expedited retrieval",
      "Instant retrieval without any request",
    ],
    correctAnswers: [2],
    explanation:
      "Expedited retrievals return archived objects typically within 1–5 minutes for urgent single-object needs. Standard takes 3–5 hours, bulk is cheapest for large batches at 5–12 hours, and Flexible Retrieval is not instantly readable by default.",
  },
  {
    id: 549,
    category: "Storage",
    question:
      "One million objects in S3 Glacier Flexible Retrieval must be restored for a quarterly audit, with no urgency. Which approach performs the restore most economically?",
    options: [
      "One million individual expedited retrievals",
      "An S3 Batch Operations job restoring all objects using the bulk retrieval tier",
      "A Lambda function looping GetObject until the objects return",
      "Copying the archive to Standard-IA with a lifecycle rule",
    ],
    correctAnswers: [1],
    explanation:
      "Batch Operations drives RestoreObject across a manifest with bulk-tier retrievals — the economical path for large-scale restores. Expedited per-object retrievals are the most expensive combination, GetObject loops fail on archived objects, and lifecycle rules don't restore.",
  },
  {
    id: 550,
    category: "Storage",
    question:
      "An enterprise NAS migration requires multi-protocol access (NFS, SMB, iSCSI?), snapshot-based cloning, deduplication, and ONTAP management tooling compatibility. Which managed file service matches?",
    options: [
      "Amazon FSx for NetApp ONTAP",
      "Amazon FSx for OpenZFS",
      "Amazon EFS",
      "Amazon FSx for Lustre",
    ],
    correctAnswers: [0],
    explanation:
      "FSx for ONTAP provides NetApp's file system — multi-protocol, snapshots, FlexClone, deduplication — for enterprises standardized on ONTAP. OpenZFS is NFS/Linux-centric without ONTAP tooling, EFS is simple elastic NFS, and Lustre targets HPC.",
  },
  {
    id: 551,
    category: "Storage",
    question:
      "A non-production FSx for Windows environment hosts test shares where performance is unimportant and cost matters most. Which deployment and storage choice fits?",
    options: [
      "Single-AZ 2 deployment with HDD storage",
      "Multi-AZ deployment with SSD storage",
      "Single-AZ with provisioned IOPS SSD",
      "Multi-AZ with SSD and daily backups",
    ],
    correctAnswers: [0],
    explanation:
      "Non-production test shares can trade availability and performance for cost: single-AZ with HDD storage is the economy option. Multi-AZ and SSD options add availability and performance the environment doesn't need.",
  },
  {
    id: 552,
    category: "Storage",
    question:
      "Which two modes are available for S3 Object Lock retention? (Select TWO.)",
    options: [
      "Compliance mode, which no one can bypass during the period",
      "Governance mode, which users with special permission can bypass",
      "Audit mode, which only logs lock events",
      "WORM mode with variable key rotation",
      "Archive mode, transitioning locked objects to Glacier",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Object Lock offers governance mode (bypassable with a specific permission) and compliance mode (absolute). Audit, WORM-rotation, and archive modes are not Object Lock concepts.",
  },
  {
    id: 553,
    category: "Compute",
    question:
      "A critical payment Lambda function suffers throttling because other functions in the account consume the shared regional concurrency pool during peaks. How is the payment function protected?",
    options: [
      "Set reserved concurrency on the payment function so its capacity is guaranteed",
      "Increase the account's concurrency only for the payment function's alias",
      "Move the payment function to a different Region",
      "Convert the payment function to a container image",
    ],
    correctAnswers: [0],
    explanation:
      "Reserved concurrency reserves a dedicated slice of concurrent executions for the function, immune to contention from other functions. Concurrency isn't set per alias as a guarantee, Regions don't share pools anyway, and packaging is unrelated.",
  },
  {
    id: 554,
    category: "Security",
    question:
      "A security comparison: why choose a customer managed KMS key over the AWS managed key for a data store?",
    options: [
      "Customer managed keys allow custom key policies, rotation control, grants, deletion scheduling, and per-key CloudTrail attribution",
      "Customer managed keys encrypt faster than AWS managed keys",
      "AWS managed keys cannot be used by AWS services",
      "Customer managed keys are free while AWS managed keys charge annually",
    ],
    correctAnswers: [0],
    explanation:
      "The value of customer managed keys is governance: policies, rotation choices, grants, deletion control, and distinct audit trails. Performance is equivalent, AWS managed keys are precisely the service-integrated option, and both carry equivalent pricing.",
  },
  {
    id: 555,
    category: "Application Integration",
    question:
      "An API Gateway POST must start a Step Functions execution and return the execution ARN immediately, without a Lambda bridging the two. What implements this directly?",
    options: [
      "A direct API Gateway service integration calling StartExecution on the state machine",
      "A Lambda function that runs the state machine to completion",
      "An EventBridge rule triggered by the POST",
      "SQS delivering the request body to the state machine",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway integrates directly with Step Functions' StartExecution API, avoiding a bridging function for fire-and-forget workflow starts. Running to completion would exceed API timeouts, EventBridge and SQS are different ingestion paths.",
  },
  {
    id: 556,
    category: "Application Integration",
    question:
      "An EventBridge rule matches order events, but the downstream target expects a different payload shape with only three fields renamed. Which EventBridge feature reshapes the event before delivery?",
    options: [
      "Input transformers on the rule target",
      "A schema registry evolution rule",
      "SQS message attributes",
      "Lambda environment templating",
    ],
    correctAnswers: [0],
    explanation:
      "Input transformers template the matched event into the target's expected structure — no glue code required. Schemas document shapes, message attributes label messages, and environment templating isn't an event mechanism.",
  },
  {
    id: 557,
    category: "Application Integration",
    question:
      "A GraphQL API on AppSync serves a hot query that resolves to the same data repeatedly, hammering DynamoDB. Which AppSync feature caches resolver responses?",
    options: [
      "AppSync resolver-level caching",
      "DynamoDB DAX enabled through the resolver",
      "CloudFront in front of AppSync",
      "API Gateway caching imported into AppSync",
    ],
    correctAnswers: [0],
    explanation:
      "AppSync provides server-side resolver caching with configurable TTLs, serving hot queries without hitting data sources. DAX would help if wired into the data source but is a different layer, CloudFront doesn't cache GraphQL responses well, and API Gateway caching is a different service.",
  },
  {
    id: 558,
    category: "Compute",
    question:
      "Teams in other accounts must pull container images from a central ECR registry without duplicating images. What must be configured?",
    options: [
      "A repository policy on the central ECR registry granting the other accounts pull permissions",
      "Pull-through cache rules pointing at the other accounts",
      "Cross-Region replication of the registry to each account",
      "Sharing images through S3 with presigned URLs",
    ],
    correctAnswers: [0],
    explanation:
      "ECR repositories accept resource policies granting cross-account pull (and push) permissions; clients authenticate to the central registry directly. Pull-through caches proxy upstream public registries, replication duplicates within one registry owner, and S3 sharing bypasses container tooling.",
  },
  {
    id: 559,
    category: "Compute",
    question:
      "An ECS on Fargate workload must route container logs both to CloudWatch and to a third-party analysis platform, configured declaratively per task. Which feature provides flexible log routing?",
    options: [
      "The awslogs driver only, which targets CloudWatch exclusively",
      "AWS FireLens (Fluent Bit) as the log router with task-defined destinations",
      "CloudWatch subscription filters re-exporting logs",
      "Kinesis Agent installed in each container",
    ],
    correctAnswers: [1],
    explanation:
      "FireLens runs as the task's log router, sending streams to CloudWatch, S3, or partner destinations based on task definition config. awslogs is single-destination, subscription filters add latency and cost after ingestion, and agents don't belong in Fargate tasks.",
  },
  {
    id: 560,
    category: "Compute",
    question:
      "An EKS cluster's node pool must add nodes within seconds of pod scheduling pressure, choosing optimal instance types automatically and consolidating underused nodes. Which provisioner is designed for this?",
    options: [
      "Karpenter with right-sized, just-in-time node provisioning",
      "The Cluster Autoscaler with pre-defined ASG size ranges only",
      "Manually scaling managed node groups on schedule",
      "Fargate profiles replacing all node groups",
    ],
    correctAnswers: [0],
    explanation:
      "Karpenter provisions right-sized nodes directly in response to pending pods within seconds and consolidates afterward. Cluster Autoscaler scales predefined groups more slowly with fixed types, scheduled scaling misses reactive needs, and Fargate changes the execution model.",
  },
  {
    id: 561,
    category: "Compute",
    question:
      "Microservices in ECS need simple service-to-service discovery and connectivity with mutual TLS options, using a native ECS feature rather than operating a service mesh. Which feature fits?",
    options: [
      "ECS Service Connect",
      "AWS App Mesh with Envoy sidecars",
      "Route 53 private zones per service",
      "Cloud Map namespace only, with manual connection handling",
    ],
    correctAnswers: [0],
    explanation:
      "Service Connect is ECS-native service discovery plus networking with optional TLS, requiring no separate mesh infrastructure. App Mesh is the fuller mesh (more moving parts), Route 53 namespaces only resolve names, and raw Cloud Map leaves traffic management manual.",
  },
  {
    id: 562,
    category: "Database",
    question:
      "A table was deleted 40 days ago. PITR (35-day window) can no longer restore it. Which design would have preserved restorability beyond the PITR window?",
    options: [
      "AWS Backup with a longer retention policy capturing the table on schedule",
      "Enabling DynamoDB auto scaling",
      "Adding a global secondary index before deletion",
      "Increasing read capacity on the table",
    ],
    correctAnswers: [0],
    explanation:
      "PITR's 35-day window is fixed; longer restorability requires scheduled backups retained longer, which AWS Backup provides. Scaling, indexes, and capacity have no bearing on recoverability windows.",
  },
  {
    id: 563,
    category: "Storage",
    question:
      "A lifecycle policy moves objects to S3 Intelligent-Tiering after 30 days, but an audit finds many small objects still in Standard. What explains the non-transition?",
    options: [
      "Intelligent-Tiering does not transition objects smaller than 128 KB; small objects remain in their original class",
      "Intelligent-Tiering requires objects to be at least one year old",
      "Small objects transition instantly at upload instead",
      "Lifecycle rules cannot target objects by size at all",
    ],
    correctAnswers: [0],
    explanation:
      "Intelligent-Tiering has a minimum object size (128 KB) below which monitoring fees would outweigh savings, so small objects are excluded from tiering. The one-year threshold is wrong, small objects do not transition at upload, and lifecycle rules can combine filters — but IT's own size floor applies regardless.",
  },
  {
    id: 564,
    category: "Database",
    question:
      "Which two statements describe Aurora storage architecture? (Select TWO.)",
    options: [
      "Cluster storage grows automatically in 10 GiB increments up to 128 TiB",
      "Data is maintained as six copies across three Availability Zones",
      "Storage must be pre-provisioned at the cluster's maximum expected size",
      "Each Aurora replica maintains its own independent full storage copy",
      "Storage shrinks automatically when data is deleted",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Aurora storage auto-grows to 128 TiB and keeps six copies across three AZs for self-healing durability. Provisioning a fixed maximum is the RDS model Aurora avoids, replicas share the cluster volume rather than copying it, and Aurora does not automatically shrink on deletes.",
  },
];
