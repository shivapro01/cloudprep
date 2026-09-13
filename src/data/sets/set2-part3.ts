import type { QuizQuestion } from "../questions";

/** Practice Set 2 — questions 110–130 (performance and cost focus). Original questions. */
export const set2Part3: QuizQuestion[] = [
  {
    id: 110,
    category: "Networking & Content Delivery",
    question:
      "A company must add a security header and rewrite a cookie on every viewer request at the CloudFront edge. The logic is simple, must run in under a millisecond, and must be the cheapest option available. Which technology should be used?",
    options: [
      "A Lambda@Edge function on the viewer request",
      "A CloudFront Function on the viewer request",
      "An origin response custom header setting",
      "An AWS WAF rule that injects headers",
    ],
    correctAnswers: [1],
    explanation:
      "CloudFront Functions run lightweight JavaScript on viewer requests or responses with sub-millisecond execution at the lowest cost, ideal for header manipulation. Lambda@Edge is better for heavier logic or origin-facing events but costs more and adds latency, static custom headers cannot compute values per request, and WAF blocks or allows requests rather than rewriting headers.",
  },
  {
    id: 111,
    category: "Database",
    question:
      "A product catalog is cached in ElastiCache for Redis. Business rules state that cached prices must match the database as closely as possible, accepting slightly higher write latency. Which caching strategy fits?",
    options: [
      "Lazy loading with a long TTL",
      "Write-through, updating the cache whenever the database is written",
      "Lazy loading with no TTL",
      "Serving only from the cache and syncing the database nightly",
    ],
    correctAnswers: [1],
    explanation:
      "Write-through pushes every database update into the cache immediately, keeping cached prices consistent with the source of truth at the cost of a small write delay. Lazy loading only fills the cache on miss, so stale values persist until TTL expiry, and nightly sync abandons consistency entirely.",
  },
  {
    id: 112,
    category: "Database",
    question:
      "A shared cache layer must survive node failures with automatic failover and retain data across restarts. Operators also need pub/sub messaging support. Which ElastiCache engine and configuration should be used?",
    options: [
      "Memcached with auto discovery",
      "Redis with a replication group and automatic failover",
      "Memcached with multiple nodes and client-side sharding",
      "Redis in cluster mode with persistence disabled",
    ],
    correctAnswers: [1],
    explanation:
      "Redis replication groups provide read replicas, multi-AZ automatic failover, persistence options for restart survival, and native pub/sub, matching every requirement. Memcached lacks failover and persistence by design, and disabling persistence defeats the restart requirement.",
  },
  {
    id: 113,
    category: "Database",
    question:
      "Hundreds of concurrent Lambda invocations open a connection to an RDS PostgreSQL database each time they run, exhausting the database's connection limit during traffic bursts. What is the purpose-built fix?",
    options: [
      "Move the database to a larger instance class",
      "Place Amazon RDS Proxy between the functions and the database",
      "Increase the max_connections parameter to 100,000",
      "Replace the database with DynamoDB",
    ],
    correctAnswers: [1],
    explanation:
      "RDS Proxy pools and multiplexes database connections so many short-lived clients share a small set of database connections, preventing connection exhaustion during bursts. A larger instance raises the ceiling but not the root cause and costs more, the parameter cannot reach that magnitude, and a NoSQL migration is disproportionate to the connection problem.",
  },
  {
    id: 114,
    category: "Database",
    question:
      "A read-heavy Aurora cluster scales from 3 to 12 Aurora Replicas during the day. Application connection strings must not change as replicas come and go. Which endpoint should the application use?",
    options: [
      "The cluster endpoint",
      "The reader endpoint",
      "Custom endpoints pinned to specific replicas",
      "Instance endpoints of the oldest replica",
    ],
    correctAnswers: [1],
    explanation:
      "The Aurora reader endpoint automatically load balances read-only connections across the current set of replicas and updates as replicas are added or removed. The cluster endpoint points at the writer, custom endpoints are for selected static groups, and instance endpoints address one node each.",
  },
  {
    id: 115,
    category: "Database",
    question:
      "A DynamoDB table uses device serial number as its partition key. One fleet device generates half of all traffic, causing throttled requests while other partitions sit idle. Which change fixes the distribution?",
    options: [
      "Provision more read capacity units",
      "Use a higher-cardinality partition key, such as serial number combined with a timestamp bucket",
      "Create a global secondary index on the serial number",
      "Switch the table to on-demand capacity mode",
    ],
    correctAnswers: [1],
    explanation:
      "Hot partitions come from low-cardinality or skewed key choices; distributing writes across many distinct partition key values spreads load evenly across partitions. More capacity on one partition does not help because per-partition limits still apply, a GSI does not change the base table's write distribution, and on-demand mode still throttles a single hot key.",
  },
  {
    id: 116,
    category: "Database",
    question:
      "A new application has highly unpredictable traffic: mostly idle for days, then spiking to tens of thousands of requests per second within minutes. The team wants to avoid capacity planning entirely. Which DynamoDB capacity mode should be used?",
    options: [
      "Provisioned mode with auto scaling",
      "On-demand mode",
      "Provisioned mode with fixed high capacity",
      "Reserved capacity purchased annually",
    ],
    correctAnswers: [1],
    explanation:
      "On-demand mode charges per request and absorbs immediate spikes without any capacity configuration, ideal for unpredictable or idle-heavy workloads. Auto scaling reacts to metrics with a delay that can be exceeded by sudden spikes, fixed high capacity wastes money during idle periods, and reserved capacity prices steady known usage, not spiky unknown usage.",
  },
  {
    id: 117,
    category: "Database",
    question:
      "A DynamoDB table's partition key is user_id, but the application frequently looks up accounts by email address. Scanning the table is too slow. What is the correct structural change?",
    options: [
      "Add a local secondary index on email",
      "Add a global secondary index with email as its key",
      "Duplicate the table keyed by email and sync it with Streams",
      "Store the email in a set attribute and use a filter expression",
    ],
    correctAnswers: [1],
    explanation:
      "A global secondary index provides an alternate partition/sort key layout queryable independently of the base table's key, enabling fast email lookups. A local secondary index requires the same partition key as the base table, so it cannot be keyed by email, a duplicated table is an operational burden, and filter expressions still read every item.",
  },
  {
    id: 118,
    category: "Storage",
    question:
      "A general purpose gp3 EBS volume attached to a busy database needs more IOPS than its current baseline, but budget rules forbid moving to the most expensive volume family. What should be done?",
    options: [
      "Migrate the volume to io1 and provision the needed IOPS",
      "Increase the gp3 volume's provisioned IOPS setting independently of its size",
      "Resize the volume to twice the capacity",
      "Add a second gp3 volume and stripe it with RAID 0 in the file system",
    ],
    correctAnswers: [1],
    explanation:
      "gp3 decouples IOPS and throughput from volume size, letting you provision additional IOPS at a lower price than migrating to the io family. Resizing raises the baseline only indirectly and wastes capacity, and RAID 0 adds administration and leaves a single point of failure for availability.",
  },
  {
    id: 119,
    category: "Compute",
    question:
      "An in-memory analytics workload performs large joins over datasets held in RAM. Which EC2 instance family should a solutions architect select?",
    options: [
      "Compute optimized (C family)",
      "Memory optimized (R and X families)",
      "Storage optimized (D and I families)",
      "Accelerated computing (P and G families)",
    ],
    correctAnswers: [1],
    explanation:
      "Memory-optimized families provide the highest memory-per-vCPU ratios for in-memory engines and large RAM-resident datasets. Compute optimized favor CPU-bound work, storage optimized favor local disk throughput, and accelerated families target GPU workloads such as machine learning and graphics.",
  },
  {
    id: 120,
    category: "Compute",
    question:
      "A containerized microservice fleet runs on x86 today. Engineering confirms the code and dependencies build for ARM. Leadership wants better price performance with no commitment discounts. What should be recommended?",
    options: [
      "Move the fleet to Graviton-based instances",
      "Move the fleet to Dedicated Hosts",
      "Double the fleet size on the same x86 instances",
      "Move the fleet to GPU instances",
    ],
    correctAnswers: [0],
    explanation:
      "Graviton (ARM-based) instances typically deliver up to 40% better price performance for common workloads, and containerized services usually recompile for ARM easily. Dedicated Hosts address licensing, more x86 instances raises cost rather than efficiency, and GPU instances are for accelerated computing.",
  },
  {
    id: 121,
    category: "Cost Optimization",
    question:
      "A data lake bucket holds objects whose access patterns are unpredictable and change over time. The team wants automatic per-object tiering between frequent and infrequent access without retrieval fees or lifecycle management. Which storage class fits?",
    options: [
      "S3 Standard-IA",
      "S3 Intelligent-Tiering",
      "S3 One Zone-IA",
      "S3 Glacier Instant Retrieval",
    ],
    correctAnswers: [1],
    explanation:
      "Intelligent-Tiering monitors per-object access and moves objects between tiers automatically with no retrieval fees, designed exactly for unknown or changing patterns. Standard-IA and One Zone-IA charge retrieval fees and need lifecycle rules, and Glacier Instant Retrieval targets rarely accessed archives.",
  },
  {
    id: 122,
    category: "Storage",
    question:
      "An EFS file system serves a media pipeline whose throughput demand swings between nearly zero and 3 GB/s within minutes. Which throughput mode handles these swings without pre-planning?",
    options: [
      "Bursting throughput mode with Max I/O performance mode",
      "Elastic Throughput mode",
      "Provisioned throughput at 3 GB/s permanently",
      "General Purpose performance mode with more mount targets",
    ],
    correctAnswers: [1],
    explanation:
      "Elastic Throughput scales read and write throughput up and down automatically to match workload demand, which suits spiky pipelines without constant provisioning. Provisioned at peak wastes money, bursting has limits tied to file system size, and performance mode affects metadata latency rather than throughput scaling.",
  },
  {
    id: 123,
    category: "Compute",
    question:
      "A team runs short-lived containerized batch jobs of varying size a few times per hour. They want per-second billing without managing a cluster of instances, accepting a small per-task premium. Which compute option fits best?",
    options: [
      "Amazon ECS on EC2 launch type with a persistent cluster",
      "Amazon ECS on Fargate",
      "EC2 Spot fleet with custom scheduling scripts",
      "A single always-on EC2 instance running Docker",
    ],
    correctAnswers: [1],
    explanation:
      "Fargate runs each task in its own compute with per-second billing and no instances to patch or size, ideal for intermittent short jobs. A persistent EC2 cluster or always-on instance pays for idle time, and Spot tooling adds management for a workload that does not need it.",
  },
  {
    id: 124,
    category: "Compute",
    question:
      "A latency-sensitive API built on Lambda shows occasional slow requests caused by cold starts. Steady invocation volume is high and predictable. Which Lambda feature mitigates cold starts for these requests?",
    options: [
      "Increase the function memory allocation only",
      "Enable provisioned concurrency for the published function version",
      "Move the function into a VPC with more subnets",
      "Use the function URL instead of API Gateway",
    ],
    correctAnswers: [1],
    explanation:
      "Provisioned concurrency keeps a pre-initialized pool of execution environments warm, so requests are served without initialization delay. More memory shortens initialization but does not eliminate cold starts, VPC attachment adds its own init overhead, and the invocation front end is unrelated to cold starts.",
  },
  {
    id: 125,
    category: "Cost Optimization",
    question:
      "A company wants deep compute discounts through a one-year commitment, but its roadmap may shift parts of the workload from EC2 to Fargate and Lambda mid-year. Which commitment should be recommended?",
    options: [
      "Standard Reserved Instances for the current instance mix",
      "A Compute Savings Plan",
      "Dedicated Hosts with the current licensing",
      "Scheduled Reserved Instances for business hours",
    ],
    correctAnswers: [1],
    explanation:
      "Compute Savings Plans apply committed-spend discounts across EC2, Fargate, and Lambda regardless of instance family or Region, absorbing the planned shift. Standard RIs lock discounts to specific instance attributes, Dedicated Hosts are for licensing, and Scheduled RIs cover predictable time windows, not flexible compute spend.",
  },
  {
    id: 126,
    category: "Networking & Content Delivery",
    question:
      "A startup currently runs a self-managed NAT instance on a small EC2 instance for its private subnet. The instance drops connections under peak load and becomes a single point of failure. What should a solutions architect recommend?",
    options: [
      "Deploy a second NAT instance behind an Application Load Balancer",
      "Replace the NAT instance with a NAT gateway",
      "Move the private instances to the public subnet",
      "Attach an elastic IP to the NAT instance and enlarge the instance",
    ],
    correctAnswers: [1],
    explanation:
      "NAT gateways are managed, scale automatically up to high bandwidth, run redundantly within an Availability Zone, and require no administration. Two NAT instances behind an ALB is unsupported architecture for NAT semantics, public subnets defeat the isolation purpose, and enlarging a single instance still leaves the failure mode.",
  },
  {
    id: 127,
    category: "Cost Optimization",
    question:
      "A research organization distributes terabytes of public datasets from S3 to universities worldwide and does not want to bear the transfer costs for each download. Which S3 feature shifts download costs to the party downloading?",
    options: [
      "S3 Select",
      "Requester Pays buckets",
      "S3 Batch Operations",
      "Cross-Region Replication",
    ],
    correctAnswers: [1],
    explanation:
      "With Requester Pays, the requester rather than the bucket owner pays the request and data transfer charges, which suits public dataset distribution. The other features address querying, bulk operations, and replication, none of which transfer costs.",
  },
  {
    id: 128,
    category: "Management & Governance",
    question:
      "A microservices platform shows rising end-to-end latency, and engineers cannot tell which downstream service adds the delay for a given request. Which tool visualizes the request path and per-service timing?",
    options: [
      "Amazon CloudWatch dashboards",
      "AWS X-Ray",
      "AWS CloudTrail",
      "AWS Config timeline",
    ],
    correctAnswers: [1],
    explanation:
      "X-Ray collects traces with segments for each service a request traverses, building a service map with per-segment latency that pinpoints the delay. Dashboards aggregate metrics but not per-request paths, CloudTrail records API calls, and Config tracks resource configuration.",
  },
  {
    id: 129,
    category: "Analytics",
    question:
      "An enterprise already runs self-managed Apache Kafka for telemetry and wants to migrate to AWS while keeping Kafka tooling, connector compatibility, and APIs unchanged, with brokers managed for them. Which service should be used?",
    options: [
      "Amazon Kinesis Data Streams",
      "Amazon MSK",
      "Amazon SQS FIFO",
      "AWS Glue streaming ETL",
    ],
    correctAnswers: [1],
    explanation:
      "Amazon MSK provides managed Kafka clusters with full Apache Kafka API compatibility, preserving existing clients, connectors, and tooling. Kinesis is a proprietary streaming API requiring client rewrites, SQS is a queue rather than a log, and Glue is an ETL layer on top of a stream source.",
  },
  {
    id: 130,
    category: "Cost Optimization",
    question:
      "Which two actions reduce EC2 costs for a workload that is fault-tolerant in parts and steady in others? (Select TWO.)",
    options: [
      "Run the fault-tolerant portion on Spot Instances",
      "Right-size instances using AWS Compute Optimizer recommendations",
      "Purchase On-Demand capacity reservations for all instances",
      "Move every workload to memory-optimized instances for headroom",
      "Enable dedicated tenancy for the whole account",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Spot capacity cuts costs up to 90% for interruptible components, and rightsizing removes chronic over-provisioning identified by Compute Optimizer. Capacity reservations add cost without discount, oversizing with headroom increases spend, and dedicated tenancy is a compliance feature that costs more than shared tenancy.",
  },
];
