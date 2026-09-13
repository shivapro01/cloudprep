import type { QuizQuestion } from "../questions";

/** Practice Set 6 — questions 370–390 (mixed compute, storage, performance). Original questions. */
export const set6Part3: QuizQuestion[] = [
  {
    id: 370,
    category: "Storage",
    question:
      "A Kafka broker fleet and a log-processing pipeline write and read large sequential files continuously. Cost must stay low, and random small-file access is not required. Which EBS volume type fits?",
    options: [
      "gp3",
      "io2",
      "Throughput Optimized HDD (st1)",
      "Cold HDD (sc1)",
    ],
    correctAnswers: [2],
    explanation:
      "st1 delivers high sequential read/write throughput at low cost, matching log and stream workloads. gp3 and io2 are SSDs priced for random IOPS that sequential workloads don't need, and sc1 is for infrequently accessed cold data with much lower throughput.",
  },
  {
    id: 371,
    category: "Storage",
    question:
      "A compliance replica of full-volume backups is stored on EBS and accessed at most twice a year. Storage cost must be minimized above all. Which volume type fits?",
    options: [
      "gp3",
      "Cold HDD (sc1)",
      "io2",
      "Instance store NVMe",
    ],
    correctAnswers: [1],
    explanation:
      "sc1 is the cheapest EBS volume per GB, built for rarely accessed data with infrequent throughput. gp3 and io2 price for performance this replica doesn't need, and instance store is ephemeral and dies with the instance.",
  },
  {
    id: 372,
    category: "High Availability & Scaling",
    question:
      "A legacy single-instance application cannot be re-architected this quarter, but unplanned underlying hardware failures must trigger automatic recovery of the same instance onto healthy hardware, preserving its IP, EBS volumes, and instance ID. Which EC2 capability does this?",
    options: [
      "EC2 auto recovery via a CloudWatch StatusCheckFailed_System alarm with a recover action",
      "An Auto Scaling group of size one",
      "Elastic IP remapping through a Lambda function",
      "EC2 hibernation on failure",
    ],
    correctAnswers: [0],
    explanation:
      "The CloudWatch alarm on system status checks with a recover action migrates the instance to healthy hardware automatically while keeping its instance ID, private/Elastic IP, and attached volumes. A one-instance ASG relaunches with a new instance ID, custom Lambda recovery re-implements the built-in feature, and hibernation is unrelated to failures.",
  },
  {
    id: 373,
    category: "Compute",
    question:
      "A company must run workloads on physically isolated hardware for compliance but does not need socket-level license visibility or host affinity. Which EC2 tenancy provides hardware isolation at lower cost than full host control?",
    options: [
      "Default shared tenancy",
      "Dedicated Instances",
      "Dedicated Hosts",
      "Capacity Reservations with dedicated tenancy for every workload",
    ],
    correctAnswers: [1],
    explanation:
      "Dedicated Instances run on hardware isolated to one customer without the per-host management or licensing visibility that Dedicated Hosts provide, fitting the isolation requirement at a lower price point. Shared tenancy fails the isolation requirement, and blanket capacity reservations add cost without adding isolation.",
  },
  {
    id: 374,
    category: "Compute",
    question:
      "A SAP HANA production system requires up to 24 TiB of memory in a single instance. Which EC2 family should be evaluated?",
    options: [
      "C-family compute optimized",
      "High Memory (u-/high-memory) instances",
      "I-family storage optimized",
      "T-family burstable",
    ],
    correctAnswers: [1],
    explanation:
      "High Memory instances offer multi-TiB memory per instance purpose-built for SAP HANA and similar in-memory databases. Compute-optimized instances maximize CPU, storage-optimized maximize local disk, and burstable instances cap memory far below this scale.",
  },
  {
    id: 375,
    category: "Compute",
    question:
      "A Java-based Lambda function suffers multi-second cold starts from JVM and framework initialization, hurting p99 latency for a customer-facing API. Which Lambda feature restores execution environments from a memory snapshot to cut initialization to milliseconds?",
    options: [
      "Provisioned concurrency only",
      "Lambda SnapStart",
      "Increasing memory to 10 GB",
      "Moving the function into a VPC",
    ],
    correctAnswers: [1],
    explanation:
      "SnapStart snapshots a fully initialized execution environment (initially for Java) and resumes new invocations from it, cutting cold starts dramatically without paying for always-on capacity. Provisioned concurrency achieves low latency but at continuous cost, memory changes shrink init time only partially, and VPC attachment typically adds initialization work.",
  },
  {
    id: 376,
    category: "Compute",
    question:
      "A team already runs an Application Load Balancer for its services and wants to add a Lambda function as an additional backend behind the same ALB, avoiding a separate API Gateway. How is Lambda integrated with an ALB?",
    options: [
      "Register the function as a target in a target group of type lambda",
      "Deploy the function inside an EC2 instance behind the ALB",
      "Point the ALB at the Lambda function URL as a custom origin",
      "Use CloudFront Functions to invoke the function",
    ],
    correctAnswers: [0],
    explanation:
      "ALBs support Lambda functions as registered targets in a lambda-type target group, routing HTTP requests directly to the function. Lambda functions cannot run inside EC2, function URLs are invoked directly rather than as ALB origins, and CloudFront is a CDN.",
  },
  {
    id: 377,
    category: "Cost Optimization",
    question:
      "A CI system pushes a new image version to ECR on every commit, and container registry storage costs keep rising with hundreds of stale images per repository. Which ECR feature prunes old images automatically?",
    options: [
      "ECR lifecycle policies",
      "ECR pull-through cache rules",
      "Image scan-on-push findings",
      "Cross-Region replication rules",
    ],
    correctAnswers: [0],
    explanation:
      "Lifecycle policies define rules (such as keeping only the newest N tagged images or expiring untagged ones) that ECR applies automatically to remove stale images. Pull-through caching affects upstream pulls, scanning finds CVEs, and replication multiplies storage.",
  },
  {
    id: 378,
    category: "Compute",
    question:
      "Security mandates freshly patched, hardened golden AMIs built weekly from a versioned pipeline with automated vulnerability scanning and distribution across accounts. Which service orchestrates this image factory?",
    options: [
      "EC2 Image Builder",
      "AWS Systems Manager Patch Manager alone",
      "ECR with replication",
      "Packer running on an operator laptop",
    ],
    correctAnswers: [0],
    explanation:
      "Image Builder automates build schedules, component installation, tests, and distribution of AMIs across accounts and Regions. Patch Manager patches running instances rather than producing AMIs, ECR stores container images, and a laptop pipeline is unmanaged.",
  },
  {
    id: 379,
    category: "Networking & Content Delivery",
    question:
      "A CloudFront behavior must exclude session cookies from the cache key (so all users share cached objects) while still forwarding those cookies to the origin for personalization logic. How are the policies configured?",
    options: [
      "One cache policy that includes cookies for both caching and forwarding",
      "A cache policy excluding cookies for the cache key, combined with an origin request policy that forwards cookies to the origin",
      "Disable caching and forward all headers",
      "Lambda@Edge copying cookies into query strings",
    ],
    correctAnswers: [1],
    explanation:
      "Separating the cache policy (which defines the cache key — no cookies) from the origin request policy (which defines what is sent upstream — cookies) delivers shared caching with personalized origin requests. Including cookies in the cache key fragments the cache per user, disabling caching wastes the CDN, and edge functions are unnecessary complexity.",
  },
  {
    id: 380,
    category: "Networking & Content Delivery",
    question:
      "Personalized API responses must never be cached by CloudFront, while static assets on the same distribution cache aggressively. How should behaviors be split?",
    options: [
      "One behavior with TTL zero for all paths",
      "Separate behaviors: API paths use a cache policy with no caching; asset paths use a long-TTL caching policy",
      "Two distributions with identical settings except TTL",
      "Origin request policies with compression enabled for assets",
    ],
    correctAnswers: [1],
    explanation:
      "Path-based behaviors let API routes bypass caching entirely while asset routes cache long term — the standard mixed-content configuration. Zero TTL everywhere defeats caching, duplicate distributions double management, and origin request policies control forwarding rather than caching.",
  },
  {
    id: 381,
    category: "Networking & Content Delivery",
    question:
      "A company points www.example.com and the apex example.com at an ALB and a CloudFront distribution. Which record configuration avoids Route 53 query charges and supports the apex domain?",
    options: [
      "CNAME records for both names to the ALB DNS name",
      "Alias records (A/AAAA alias) for both names to the ALB and distribution",
      "A single A record with multiple public IPs",
      "NS delegation from the apex to the ALB",
    ],
    correctAnswers: [1],
    explanation:
      "Alias records are free for AWS resource targets and work at the zone apex (which CNAMEs cannot), so both requirements are met with aliases. CNAMEs incur query charges and are invalid at the apex, multiple A records pin changing IPs, and NS delegation is not how routing to an ALB works.",
  },
  {
    id: 382,
    category: "Networking & Content Delivery",
    question:
      "Which two services directly reduce perceived latency for globally distributed users of TCP and HTTP applications? (Select TWO.)",
    options: [
      "Amazon CloudFront for cacheable HTTP content",
      "AWS Global Accelerator for TCP/UDP traffic over the AWS backbone",
      "A larger EC2 instance in a single Region",
      "Additional Availability Zones within one Region",
      "S3 Transfer Acceleration for website HTML",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudFront serves content from edge locations near users, and Global Accelerator routes non-HTTP traffic over optimized backbone paths with anycast entry points — both attack geographic latency directly. Scaling a single Region's instances or AZs doesn't shorten distance, and Transfer Acceleration is an S3 upload/download feature.",
  },
  {
    id: 383,
    category: "Database",
    question:
      "A DynamoDB leaderboard increments one counter item thousands of times per second, throttling writes on that single item. Which pattern removes the per-item write ceiling while preserving a total?",
    options: [
      "Shard the counter across multiple items with random suffixes and sum them on read",
      "Increase the table's write capacity units",
      "Use a global secondary index on the counter value",
      "Switch the table to on-demand capacity",
    ],
    correctAnswers: [0],
    explanation:
      "Per-item limits bind regardless of table capacity, so sharding the counter across suffixed items distributes writes, with reads aggregating shards. Extra capacity or on-demand mode cannot exceed the single-item ceiling, and an index adds a query path, not write distribution.",
  },
  {
    id: 384,
    category: "Database",
    question:
      "An Aurora MySQL cluster serves OLTP traffic but also runs periodic analytical queries that scan large portions of tables. Moving analytics to Redshift is planned for next year. Which Aurora feature accelerates these scans now without changing the query layer?",
    options: [
      "Aurora parallel query",
      "Aurora Serverless v2",
      "Adding more reader replicas only",
      "Enabling the aurora lab mode backtrack feature",
    ],
    correctAnswers: [0],
    explanation:
      "Parallel query pushes analytical scan and aggregation work down to the storage layer across many nodes, accelerating such queries transparently with no application change. Serverless and replicas change capacity or routing, and backtrack is a time-travel recovery feature.",
  },
  {
    id: 385,
    category: "Database",
    question:
      "An application writes to the primary and immediately reads the record back through a read replica endpoint, and users occasionally see stale data. Which change guarantees read-your-writes consistency for those critical reads?",
    options: [
      "Increase the number of read replicas",
      "Route the read-after-write requests to the writer endpoint while leaving other reads on replicas",
      "Enable Multi-AZ on the cluster",
      "Add DAX in front of the replicas",
    ],
    correctAnswers: [1],
    explanation:
      "Asynchronous replication means replicas lag briefly; only the writer endpoint reflects the just-committed write, so critical read-after-write traffic must target it. More replicas replicate the same lag, Multi-AZ standby is not readable, and DAX caches introduce their own consistency windows.",
  },
  {
    id: 386,
    category: "Storage",
    question:
      "Three WordPress instances behind a load balancer must share the same media library (images and uploads) with standard file semantics, and admins upload through any instance. Which storage choice fits?",
    options: [
      "Each instance keeps a local EBS volume synced by cron",
      "Amazon EFS mounted by all three instances at the media directory",
      "An S3 bucket accessed through the file system path on each instance",
      "An io2 Multi-Attach volume shared across the instances",
    ],
    correctAnswers: [1],
    explanation:
      "EFS provides a shared POSIX file system mountable concurrently by all instances, the standard shared-media pattern for WordPress fleets. Cron syncing is laggy and fragile, S3 needs plugin-level changes rather than file paths, and Multi-Attach requires cluster-aware software to coordinate block writes.",
  },
  {
    id: 387,
    category: "Database",
    question:
      "A SQL Server workload uses OS-level features (specific trace flags, filegroups across custom storage layouts) that Amazon RDS for SQL Server does not support. The team wants to keep SQL Server on AWS regardless. Where should it run?",
    options: [
      "Amazon RDS for SQL Server Multi-AZ, accepting the gaps",
      "SQL Server on EC2 with EBS storage, self-managed, retaining full OS control",
      "Aurora PostgreSQL with a translation layer",
      "Redshift with a SQL Server dialect mode",
    ],
    correctAnswers: [1],
    explanation:
      "When engine-adjacent OS features are required, SQL Server on EC2 keeps full administrative control at the cost of self-management. RDS cannot expose unsupported OS features, and the other engines are different products entirely.",
  },
  {
    id: 388,
    category: "Cost Optimization",
    question:
      "A FinOps analyst wants Amazon's recommended Compute Savings Plan purchase amount based on recent actual usage. Where does this recommendation come from?",
    options: [
      "Savings Plans recommendations in Cost Explorer, computed from trailing 7/30/60-day usage",
      "AWS Budgets forecasts",
      "Compute Optimizer rightsizing output",
      "The billing console's invoice PDF",
    ],
    correctAnswers: [0],
    explanation:
      "Cost Explorer generates Savings Plans recommendations by analyzing historical hourly usage over selectable lookback windows, suggesting commitment levels. Budgets alert, Compute Optimizer rightsizes, and invoices report history rather than recommend commitments.",
  },
  {
    id: 389,
    category: "Storage",
    question:
      "An upload-heavy application uses multipart uploads, and after auditing, the bucket holds many orphaned uploaded parts that are billed monthly. Which S3 lifecycle rule removes this hidden cost automatically?",
    options: [
      "Expire current object versions",
      "AbortIncompleteMultipartUpload after a set number of days",
      "Transition to Glacier Instant Retrieval",
      "Delete expired delete markers",
    ],
    correctAnswers: [1],
    explanation:
      "The abort-incomplete-multipart-upload lifecycle rule cleans up parts of uploads that never completed, which are billed as storage until removed. Version expiration, transitions, and delete-marker cleanup address other object states entirely.",
  },
  {
    id: 390,
    category: "Cost Optimization",
    question:
      "Which two AWS offerings carry no charge for the offering itself? (Select TWO.)",
    options: [
      "IAM users, roles, and policies",
      "VPCs, subnets, and route tables",
      "NAT gateways",
      "Classic Load Balancers",
      "CloudFront data transfer out",
    ],
    correctAnswers: [0, 1],
    explanation:
      "IAM and core VPC constructs are free; costs arise from what runs through them. NAT gateways bill hourly plus per GB processed, load balancers bill hourly plus LCUs, and CloudFront charges for data transfer out at the edge.",
  },
];
