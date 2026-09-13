import type { QuizQuestion } from "../questions";

/** Practice Set 3 — questions 175–195 (performance and cost focus). Original questions. */
export const set3Part3: QuizQuestion[] = [
  {
    id: 175,
    category: "Networking & Content Delivery",
    question:
      "A content site versions its assets with query strings (style.css?v=2), but CloudFront keeps returning the old asset after releases because query strings are ignored. What must change so each version is cached separately?",
    options: [
      "Disable caching entirely and forward everything to the origin",
      "Include the query string in the cache policy's cache key",
      "Set the minimum TTL to zero on the behavior",
      "Serve assets through Lambda@Edge to strip query strings",
    ],
    correctAnswers: [1],
    explanation:
      "The cache key determines what CloudFront treats as distinct; adding query string parameters creates a separate cached object per version. Disabling caching destroys performance, TTL settings govern freshness not identity, and stripping query strings would worsen versioning.",
  },
  {
    id: 176,
    category: "Networking & Content Delivery",
    question:
      "A global application with many edge locations sees high origin fetch rates because caches miss each other's requests. Which CloudFront feature reduces origin load by adding an additional caching tier?",
    options: [
      "Adding more behaviors with longer TTLs",
      "Enabling Origin Shield",
      "Switching the origin protocol to HTTPS",
      "Enabling field-level encryption",
    ],
    correctAnswers: [1],
    explanation:
      "Origin Shield inserts a caching tier that consolidates cache misses from all edge locations into at most one origin fetch per object, protecting origins at global scale. Longer TTLs help only for cacheable stale-tolerant content, protocol choice does not change miss behavior, and field-level encryption secures fields.",
  },
  {
    id: 177,
    category: "Database",
    question:
      "A Redis cache in cluster mode disabled mode has hit its single-shard memory ceiling. Writes keep growing and cannot be reduced. What is the appropriate scaling action?",
    options: [
      "Scale the node to the largest available type only",
      "Enable cluster mode and partition keys across multiple shards",
      "Add read replicas, which also add write capacity",
      "Flush the cache nightly to reclaim memory",
    ],
    correctAnswers: [1],
    explanation:
      "Cluster mode partitions the keyspace across shards, scaling both memory and write throughput horizontally. Vertical scaling has a hard ceiling, replicas add read capacity only, and flushing discards the cache rather than scaling it.",
  },
  {
    id: 178,
    category: "Database",
    question:
      "An Aurora cluster with heavy I/O usage sees volatile monthly bills because I/O is billed separately from the cluster. The team prefers a predictable cost that includes I/O. Which configuration should be chosen?",
    options: [
      "Aurora Standard storage with provisioned IOPS",
      "Aurora I/O-Optimized cluster configuration",
      "Aurora Serverless v2 with on-demand ACUs",
      "RDS for MySQL with reserved instances",
    ],
    correctAnswers: [1],
    explanation:
      "Aurora I/O-Optimized includes I/O costs in a higher cluster rate, producing predictable pricing for I/O-heavy workloads. Standard storage bills I/O separately, Serverless v2 changes the compute model rather than I/O billing, and RDS pricing is a different engine.",
  },
  {
    id: 179,
    category: "Database",
    question:
      "Database CPU is at 90% and developers disagree about which SQL statements are responsible. Which RDS feature shows the specific statements driving load, with execution plans?",
    options: [
      "RDS event notifications",
      "Performance Insights",
      "Enhanced Monitoring at 1-second granularity",
      "Slow query logs exported to CloudWatch",
    ],
    correctAnswers: [1],
    explanation:
      "Performance Insights visualizes database load by wait events and top SQL statements, pinpointing the culprits directly. Enhanced Monitoring shows OS-level metrics, event notifications announce operational events, and slow query logs require manual analysis and parameter changes.",
  },
  {
    id: 180,
    category: "Database",
    question:
      "Whenever an item in a DynamoDB table changes, a downstream cache invalidation must run within seconds. The change must be captured in order with no polling. Which mechanism should be used?",
    options: [
      "A CloudWatch alarm on the table's ConsumedWriteCapacity metric",
      "Enable DynamoDB Streams and trigger the Lambda function from the stream",
      "A scheduled EventBridge rule scanning for changed items",
      "Global secondary index throttling events",
    ],
    correctAnswers: [1],
    explanation:
      "DynamoDB Streams emits an ordered record for every item modification and can invoke Lambda directly, giving near-real-time reactions without polling. Metrics alarms react to load not contents, scheduled scans add latency, and GSIs change query layout.",
  },
  {
    id: 181,
    category: "Storage",
    question:
      "A big data job writes and rewrites terabytes of temporary scratch files at very high IOPS. The data is disposable and recreated on every run, and jobs run on a single instance. Which storage option delivers the highest performance at the lowest cost?",
    options: [
      "An io2 Block Express EBS volume",
      "NVMe instance store attached to the instance",
      "A gp3 volume with maximum provisioned IOPS",
      "An EFS Elastic Throughput mount",
    ],
    correctAnswers: [1],
    explanation:
      "Instance store NVMe provides the highest IOPS and lowest latency with no storage charge, ideal for disposable scratch data — at the cost of losing the data when the instance stops. io2 and provisioned gp3 pay premium prices for persistence that scratch data does not need, and network file systems add latency.",
  },
  {
    id: 182,
    category: "Storage",
    question:
      "A clustered database software requires a single shared block volume that several instances in the same Availability Zone attach to simultaneously for coordinated access. Which EBS capability supports this?",
    options: [
      "EBS snapshots shared cross-account",
      "Multi-Attach on a Provisioned IOPS io2 volume",
      "EBS encryption with a shared KMS key",
      "Fast Snapshot Restore",
    ],
    correctAnswers: [1],
    explanation:
      "Multi-Attach allows an io2 volume to attach concurrently to multiple instances within one AZ, with the clustered software coordinating writes. Snapshots, encryption, and FSR address backup, confidentiality, and restore speed rather than concurrent attachment.",
  },
  {
    id: 183,
    category: "Compute",
    question:
      "A media company renders 4K video segments nightly. The pipeline splits work into thousands of independent parallel tasks, each CPU-bound for about 20 minutes. Which instance family and acquisition model should a solutions architect pair?",
    options: [
      "Memory optimized instances on Compute Savings Plans",
      "Compute optimized instances with Spot capacity through AWS Batch",
      "GPU instances running 24/7 on On-Demand",
      "Storage optimized instances with Reserved Instance pricing",
    ],
    correctAnswers: [1],
    explanation:
      "CPU-bound parallel rendering maps to compute optimized instances; independent interruptible tasks are the ideal Spot workload, and Batch provisions and queues them automatically. Memory optimization is wasted on rendering, GPUs are unnecessary for CPU codecs, and 24/7 On-Demand or storage-optimized choices waste money or target the wrong resource.",
  },
  {
    id: 184,
    category: "Compute",
    question:
      "A Lambda function is billed primarily on duration, and tests show that increasing its memory setting also increases its CPU allocation proportionally, shortening runtime. What is the recommended way to find the cheapest memory configuration?",
    options: [
      "Always use the maximum memory setting",
      "Use AWS Lambda Power Tuning to empirically measure cost and speed across memory settings",
      "Set memory to 128 MB for the lowest rate",
      "Move the logic to a container image where memory is free",
    ],
    correctAnswers: [1],
    explanation:
      "Because CPU scales with memory, the cheapest configuration is often mid-range memory; power tuning runs the function across settings and reports the cost-optimal point empirically. Max memory can overshoot cost, minimum memory can stretch runtime, and containers share the same compute billing model.",
  },
  {
    id: 185,
    category: "Storage",
    question:
      "Users uploading 10 GB video files over unstable connections see failed uploads restart from zero each time. Which S3 capability makes these uploads resilient and parallelizable?",
    options: [
      "S3 Versioning",
      "Multipart upload, resuming failed parts without restarting",
      "S3 Object Lock",
      "Cross-Region Replication of the destination bucket",
    ],
    correctAnswers: [1],
    explanation:
      "Multipart upload splits a large object into independently uploaded parts that retry individually and complete in parallel, surviving flaky connections. Versioning, Object Lock, and replication do not change upload mechanics.",
  },
  {
    id: 186,
    category: "Cost Optimization",
    question:
      "An analytics bucket stores objects that are fetched frequently and typically kept for only 20 days before deletion. A developer proposes Standard-IA to save storage cost. Why is this likely the wrong call?",
    options: [
      "Standard-IA charges per-GB retrieval fees that outweigh storage savings for frequently and briefly stored objects",
      "Standard-IA does not allow deletion before 90 days",
      "Standard-IA stores fewer copies, violating durability for analytics",
      "Standard-IA objects cannot be queried with Athena",
    ],
    correctAnswers: [0],
    explanation:
      "For frequently accessed, short-lived objects, Standard is cheaper once retrieval fees are included; IA pays off only for longer-lived infrequently accessed data. There is no minimum deletion age at 90 days, durability is equivalent, and IA objects remain queryable.",
  },
  {
    id: 187,
    category: "Cost Optimization",
    question:
      "A team holding Standard Reserved Instances wants to change the instance size within the same family and, next quarter, move part of the commitment to a different instance family. Which statements are correct? (Select TWO.)",
    options: [
      "Standard RIs can be modified within the same instance family using size normalization",
      "Changing instance family requires exchanging into Convertible Reserved Instances",
      "Standard RIs can be freely exchanged across families",
      "Reserved Instances cannot be modified in any way once purchased",
      "Convertible RIs can be exchanged for On-Demand capacity refunds",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Standard RIs support modification within a family through size-flexible normalization, while family changes require Convertible RIs, which permit exchanges among convertible RIs. Standard RIs cannot change family, RIs are modifiable within limits, and Convertible RIs exchange for other reservations, not refunds.",
  },
  {
    id: 188,
    category: "Cost Optimization",
    question:
      "A data pipeline runs containerized transformation tasks that tolerate interruption. The team wants up to roughly 70% savings on Fargate pricing for these tasks. Which option delivers this?",
    options: [
      "Fargate Spot capacity providers",
      "Fargate with smaller task CPU allocations",
      "EC2 launch type with On-Demand capacity",
      "EKS with Dedicated Hosts",
    ],
    correctAnswers: [0],
    explanation:
      "Fargate Spot runs interruptible tasks at a deep discount relative to regular Fargate, matching fault-tolerant pipelines. Smaller tasks reduce resource use but not the price model, On-Demand EC2 is the costlier baseline, and Dedicated Hosts apply to EC2 licensing scenarios.",
  },
  {
    id: 189,
    category: "Database",
    question:
      "A team using Aurora Serverless v1 needs to add read replicas for reporting queries and fine-grained capacity scaling. What should a solutions architect advise?",
    options: [
      "Serverless v1 supports replicas if the cluster is paused less often",
      "Migrate to Aurora Serverless v2, which supports Aurora Replicas and second-scale capacity adjustments",
      "Provision a separate RDS instance for reporting",
      "Enable the data API to replicate reads",
    ],
    correctAnswers: [1],
    explanation:
      "Aurora Serverless v2 adds fine-grained capacity scaling together with support for Aurora Replicas, closing v1's gaps. v1 cannot attach replicas, bolting on a separate RDS instance misses the point, and the data API is an HTTP interface without replication semantics.",
  },
  {
    id: 190,
    category: "Cost Optimization",
    question:
      "A company is hosting a product launch and must guarantee EC2 capacity in a specific Availability Zone for a 48-hour window, paying On-Demand rates only for that period. Which mechanism reserves capacity without a longer commitment?",
    options: [
      "A Compute Savings Plan",
      "An On-Demand Capacity Reservation in that AZ",
      "Zonal Reserved Instances purchased for one month",
      "A Spot Fleet with capacity rebalance",
    ],
    correctAnswers: [1],
    explanation:
      "On-Demand Capacity Reservations hold specific capacity in a chosen AZ for exactly as long as needed, billed at On-Demand rates. Savings Plans discount usage without guaranteeing capacity, one-month RIs are not the fit for a 48-hour need and RIs don't guarantee capacity, and Spot makes no availability guarantee.",
  },
  {
    id: 191,
    category: "Cost Optimization",
    question:
      "CloudWatch Logs charges grow because application logs are retained forever and re-read rarely. Which combination reduces cost while preserving long-term access?",
    options: [
      "Export older log streams to S3 and lower the CloudWatch Logs retention period",
      "Increase retention to 10 years to qualify for volume discounts",
      "Delete logs older than one day",
      "Compress logs inside the application and re-upload to CloudWatch",
    ],
    correctAnswers: [0],
    explanation:
      "Moving cold logs to S3 (cheap object storage) and shortening the CloudWatch retention window cuts ongoing log storage cost while retaining searchable archives in S3. Longer retention increases cost, deleting loses history, and re-upload doubles ingestion charges.",
  },
  {
    id: 192,
    category: "Cost Optimization",
    question:
      "A DynamoDB table runs steady provisioned throughput 24/7 with predictable, unchanging usage. Which pricing option reduces its cost the most?",
    options: [
      "Switching to on-demand capacity mode",
      "Purchasing DynamoDB reserved capacity",
      "Adding global tables in a second Region",
      "Enabling DynamoDB auto scaling with a higher maximum",
    ],
    correctAnswers: [1],
    explanation:
      "Reserved capacity commits to steady provisioned throughput for one or three years at a substantial discount, matching stable predictable usage. On-demand prices per request and suits unpredictable loads, global tables add cost for replication, and auto scaling manages capacity without discounting it.",
  },
  {
    id: 193,
    category: "Cost Optimization",
    question:
      "A chatty microservices pair communicates constantly and was deployed into different Availability Zones for variety. The monthly bill shows large data transfer charges. What is the cost-aware correction?",
    options: [
      "Keep the services in the same Availability Zone when latency-sensitive and chattiness dominates, accepting a resilience trade-off",
      "Enable cross-zone load balancing to distribute the charges",
      "Route inter-service traffic through CloudFront to avoid data transfer",
      "Compress payloads with gzip to eliminate transfer charges",
    ],
    correctAnswers: [0],
    explanation:
      "Cross-AZ data transfer is billed both directions; co-locating tightly coupled, latency-sensitive services removes that charge, weighing availability trade-offs deliberately. Cross-zone balancing affects load distribution, CloudFront is a web CDN, and compression reduces bytes but not the charge per GB crossing zones.",
  },
  {
    id: 194,
    category: "Storage",
    question:
      "A telemetry ingestion system writes hundreds of thousands of objects per second into one S3 bucket. Early tests show unexpected PUT throttling. What is the underlying scaling behavior and remedy?",
    options: [
      "S3 buckets have a fixed bucket-level request limit; request a quota increase",
      "S3 scales request rates automatically per prefix; partition object keys across multiple prefixes",
      "S3 PUTs must be spaced at least 10 ms apart; add client-side sleeps",
      "Multipart upload must be used for every write above 1 KB",
    ],
    correctAnswers: [1],
    explanation:
      "S3 scales automatically per prefix (on the order of thousands of writes per second each), so distributing keys across prefixes multiplies throughput with no quota requests. The bucket-level limit framing and artificial client throttling are outdated workarounds, and multipart applies to large single objects.",
  },
  {
    id: 195,
    category: "Cost Optimization",
    question:
      "Which two approaches reduce internet data transfer-out charges for a media-heavy site? (Select TWO.)",
    options: [
      "Serving media through CloudFront instead of directly from S3",
      "Using S3 Select to return only the needed subset of objects to callers",
      "Enabling Cross-Region Replication",
      "Enabling MFA delete on the bucket",
      "Disabling bucket versioning",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudFront reduces or eliminates per-request S3-to-internet charges by serving cached content at edge rates, and S3 Select cuts transferred bytes by filtering data server-side. Replication adds inter-Region cost, and versioning or MFA delete change data protection, not transfer billing.",
  },
];
