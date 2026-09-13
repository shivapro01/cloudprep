import type { QuizQuestion } from "../questions";

/** Practice Set 2 — questions 88–109 (resilient architectures focus). Original questions. */
export const set2Part2: QuizQuestion[] = [
  {
    id: 88,
    category: "High Availability & Scaling",
    question:
      "A company's AMI requires a custom agent registration step that takes about two minutes after boot. Instances enter the load balancer before registration finishes and fail user requests. Which feature should a solutions architect use to delay serving traffic until the setup completes?",
    options: [
      "Increase the Auto Scaling group's cooldown period",
      "Add a lifecycle hook on instance launch that completes only when the registration finishes",
      "Set the load balancer's deregistration delay to 300 seconds",
      "Enable instance protection on the Auto Scaling group",
    ],
    correctAnswers: [1],
    explanation:
      "A launch lifecycle hook pauses the instance in the Pending:Wait state and marks it InService only when the hook completes, so it never receives traffic before setup ends. Cooldown affects when scaling actions can recur, deregistration delay governs connections during scale-in, and instance protection prevents termination without delaying availability.",
  },
  {
    id: 89,
    category: "High Availability & Scaling",
    question:
      "An operations team updated an Auto Scaling group's launch template with a new AMI and wants existing instances replaced gradually with automated health monitoring and rollback if replacements fail. Which feature performs this with minimal scripting?",
    options: [
      "Terminate instances manually one Availability Zone at a time",
      "Use the Auto Scaling group instance refresh feature",
      "Create a second Auto Scaling group and shift the load balancer's target group weights",
      "Detach all instances from the group and reattach them after patching",
    ],
    correctAnswers: [1],
    explanation:
      "Instance refresh rolls out the new launch template across the group in configurable batches, respecting warm-up time, and can automatically roll back on health check failures. Manual termination and detach/reattach are error-prone, and a blue/green pair of groups is more infrastructure to operate than the built-in rolling update.",
  },
  {
    id: 90,
    category: "High Availability & Scaling",
    question:
      "A Network Load Balancer spans three Availability Zones, but one healthy instance receives several times more connections than the others. What is the MOST likely cause and fix?",
    options: [
      "Cross-zone load balancing is disabled, so each node distributes only within its own zone; enable it",
      "The instances are of different instance types; make them identical",
      "Sticky sessions are enabled; disable session affinity",
      "The listener uses TCP instead of TLS; switch the listener to TLS",
    ],
    correctAnswers: [0],
    explanation:
      "Each NLB node distributes traffic only among targets registered in its own Availability Zone unless cross-zone load balancing is enabled; uneven client distribution across zones then produces uneven target load. Instance type and protocol have no bearing on distribution fairness, and sticky sessions affect per-client affinity rather than aggregate zone balance.",
  },
  {
    id: 91,
    category: "Networking & Content Delivery",
    question:
      "A company wants to send 5% of production traffic to a new application version running on separate infrastructure, increasing gradually as confidence grows. Traffic enters through Amazon Route 53. Which routing policy implements this?",
    options: [
      "Failover routing",
      "Latency-based routing",
      "Weighted routing",
      "Multivalue answer routing",
    ],
    correctAnswers: [2],
    explanation:
      "Weighted routing assigns a proportion of traffic to each record by weight, which is exactly the canary pattern as the weights are adjusted upward. Failover is active/passive, latency routing chooses by performance rather than a ratio, and multivalue answer returns multiple healthy records without percentage control.",
  },
  {
    id: 92,
    category: "Storage",
    question:
      "Two teams use paired S3 buckets in different Regions as active/active stores, and edits made in either bucket must appear in the other, including metadata changes and deletion markers. Which S3 feature should be configured?",
    options: [
      "Two one-way Cross-Region Replication rules with Replica Modification Sync enabled, forming bidirectional replication",
      "An S3 Batch Operations job scheduled every five minutes in both directions",
      "S3 Object Lock in governance mode on both buckets",
      "A Lambda function triggered by both buckets that copies new objects to the other bucket",
    ],
    correctAnswers: [0],
    explanation:
      "Configuring replication in both directions with replica modification synchronization keeps metadata and deletion markers consistent across the pair, the supported active/active pattern. Batch jobs and ad-hoc Lambda copies introduce lag, race conditions, and infinite copy loops, and Object Lock addresses retention rather than synchronization.",
  },
  {
    id: 93,
    category: "Database",
    question:
      "A shopping cart service runs in three Regions and must stay read/write available if any single Region fails, with conflicting writes resolved by keeping the most recent update. Which DynamoDB feature provides this?",
    options: [
      "DynamoDB Accelerator (DAX)",
      "DynamoDB global tables",
      "DynamoDB Streams with a cross-region Lambda copier",
      "Global secondary indexes",
    ],
    correctAnswers: [1],
    explanation:
      "Global tables replicate a table across multiple Regions as an active/active pair or set, with last-writer-wins conflict resolution, so remaining Regions keep serving writes after one fails. DAX is an in-Region cache, a custom Streams copier adds lag and conflict-handling code, and GSIs are alternate query structures within one table.",
  },
  {
    id: 94,
    category: "Database",
    question:
      "A developer accidentally issued a DeleteTable command against a production DynamoDB table holding critical data. Recovery of the exact table as it was one minute before deletion is required. Which feature, if enabled beforehand, provides this?",
    options: [
      "DynamoDB auto scaling",
      "Point-in-time recovery (PITR)",
      "DynamoDB Accelerator (DAX)",
      "Global secondary indexes",
    ],
    correctAnswers: [1],
    explanation:
      "Point-in-time recovery maintains a continuous backup stream allowing restore to any second within the last 35 days, including just before a deletion. Auto scaling manages capacity, DAX accelerates reads, and indexes change query access, none of which protect against deletion.",
  },
  {
    id: 95,
    category: "Database",
    question:
      "A data team needs an isolated copy of a 5 TiB Amazon Aurora production cluster for a one-day experiment. The copy must be ready within minutes and must not double storage cost for the short duration. Which approach fits best?",
    options: [
      "Take a manual snapshot and restore it into a new cluster",
      "Create an Aurora clone of the production cluster",
      "Create a read replica in the same cluster and detach it into a new cluster",
      "Export the cluster to S3 with Aurora export and import it elsewhere",
    ],
    correctAnswers: [1],
    explanation:
      "Aurora cloning uses copy-on-write references to the source volume, making the clone available in minutes while only changed pages consume new storage. Snapshot restore copies the full volume and takes much longer, replica promotion takes time proportional to data and consumes replica capacity meanwhile, and the export path is an analytics pipeline, not a fast clone.",
  },
  {
    id: 96,
    category: "Database",
    question:
      "A production RDS database repeatedly approaches its storage limit during monthly batch loads, and each manual storage increase causes pressure and toil. Which feature removes the operational burden without downtime?",
    options: [
      "RDS storage autoscaling with a configured maximum threshold",
      "Manual storage increases performed at midnight",
      "Enabling read replicas to absorb storage pressure",
      "Migrating the instance type to a memory-optimized class",
    ],
    correctAnswers: [0],
    explanation:
      "Storage autoscaling grows RDS storage automatically when free space falls below a threshold, with no outage, bounded by a set maximum. Manual increases still require humans on call, read replicas do not add storage to the primary, and instance class changes address compute rather than disk capacity.",
  },
  {
    id: 97,
    category: "High Availability & Scaling",
    question:
      "A company requires a relational database with an RPO of approximately zero and an RTO of a few minutes for Availability Zone failures, fully managed within a single Region. Which configuration meets this?",
    options: [
      "RDS Single-AZ with hourly snapshots",
      "RDS Multi-AZ with a synchronous standby",
      "RDS read replicas promoted manually on failure",
      "Aurora Serverless v2 with nightly snapshots",
    ],
    correctAnswers: [1],
    explanation:
      "Multi-AZ replicates synchronously to a standby, so committed transactions are not lost (RPO near zero), and automatic failover typically completes in one to two minutes. Snapshots have an RPO of one hour or more, manual promotion of replicas misses the automatic RTO, and Serverless v2 changes the scaling model without altering HA by itself.",
  },
  {
    id: 98,
    category: "High Availability & Scaling",
    question:
      "A business application requires an RPO of about 1 minute and an RTO of about 10 minutes for a full regional outage, while keeping steady-state cost moderate. Which disaster recovery pattern should a solutions architect choose?",
    options: [
      "Backup and restore with nightly cross-Region snapshots",
      "Pilot light with only data replicated and compute provisioned on demand",
      "Warm standby: a scaled-down but functional copy kept in sync continuously",
      "Multi-site active/active across three Regions",
    ],
    correctAnswers: [2],
    explanation:
      "A warm standby keeps a minimal but running copy continuously replicated (near-continuous RPO) that scales up quickly during failover, meeting a 10-minute RTO at moderate cost. Backup and restore cannot meet a 1-minute RPO, pilot light usually needs longer to become operational than a warm standby, and active/active exceeds the requirement at much higher cost.",
  },
  {
    id: 99,
    category: "High Availability & Scaling",
    question:
      "A global checkout API must continue operating with no meaningful downtime even if an entire Region is lost, and the company accepts paying for duplicate infrastructure in multiple Regions. Which architecture satisfies this?",
    options: [
      "Multi-site active/active with Route 53 latency routing and multi-Region data replication",
      "Backup and restore from cross-Region snapshots",
      "A single Region with Multi-AZ resources",
      "Pilot light with weekly disaster recovery drills",
    ],
    correctAnswers: [0],
    explanation:
      "Active/active multi-Region deployments serve traffic from all Regions simultaneously behind latency-aware DNS, so losing one Region only shifts load to the survivors; the data layer replicates across Regions. The other patterns all require a bring-up interval after a regional event, which fails the no-meaningful-downtime bar.",
  },
  {
    id: 100,
    category: "High Availability & Scaling",
    question:
      "A company runs critical workloads on VMware in its own data center. It must replicate server disks continuously to AWS and recover entire servers into EC2 within minutes during a site disaster, with near-zero data loss. Which service is purpose-built for this?",
    options: [
      "AWS Database Migration Service",
      "AWS Elastic Disaster Recovery",
      "AWS DataSync",
      "AWS Application Discovery Service",
    ],
    correctAnswers: [1],
    explanation:
      "Elastic Disaster Recovery continuously replicates block-level changes from physical, virtual, or cloud servers to a staging area in AWS and can launch recovered servers as EC2 instances within minutes at DR time. DMS moves databases, DataSync copies files in bulk, and Application Discovery Service only inventories workloads ahead of migration.",
  },
  {
    id: 101,
    category: "Management & Governance",
    question:
      "A platform team must enforce backup schedules and retention for RDS, EBS, DynamoDB, and EFS across a multi-account organization, including automatic copies to a second Region for compliance. Which service centralizes this?",
    options: [
      "AWS Backup with organization-wide backup plans",
      "Per-service lifecycle scripts run from a central account",
      "Amazon Data Lifecycle Manager for every resource type",
      "AWS Config with automatic remediation",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Backup provides policy-based backup plans spanning many AWS services and accounts, with retention, cross-Region and cross-account copies, and consolidated monitoring. Per-service scripts and per-service tools like Data Lifecycle Manager (EBS only) fragment policy enforcement, and Config records and remediates configuration rather than performing backups.",
  },
  {
    id: 102,
    category: "Application Integration",
    question:
      "An order pipeline requires strict ordering per order ID and exactly-once processing semantics. Some messages cause consumer crashes and must be quarantined after several failed attempts without blocking the queue. Which configuration fits?",
    options: [
      "A standard SQS queue with increased visibility timeout",
      "A FIFO SQS queue with a dead-letter queue and maxReceiveCount set",
      "A Kinesis stream with a single consumer",
      "An SNS topic with retries disabled",
    ],
    correctAnswers: [1],
    explanation:
      "FIFO queues guarantee ordering within a message group and support deduplication, while a dead-letter queue with a receive-count threshold quarantines poison messages after repeated failures. Standard queues lose strict ordering, a Kinesis consumer redesign does not quarantine poison messages by itself, and SNS without a buffer simply drops or retries without containment.",
  },
  {
    id: 103,
    category: "Application Integration",
    question:
      "Consumers of a standard SQS queue poll continuously around the clock, and most polls return empty, inflating request costs while adding latency to real messages. Which change reduces both cost and latency?",
    options: [
      "Increase the visibility timeout to 12 hours",
      "Enable long polling with a maximum receive wait time",
      "Switch the queue to FIFO",
      "Add more consumers to poll in parallel",
    ],
    correctAnswers: [1],
    explanation:
      "Long polling lets the ReceiveMessage call wait up to 20 seconds for messages to arrive, cutting empty responses to near zero and returning messages almost immediately when they exist. Visibility timeout affects how long a message is hidden after receipt, FIFO changes ordering semantics rather than polling efficiency, and more consumers increase polling traffic.",
  },
  {
    id: 104,
    category: "Application Integration",
    question:
      "A bug in an event consumer caused it to discard two hours of business events. The events were published through Amazon EventBridge. Operations wants to re-deliver those exact events to the fixed consumer. Which feature supports this?",
    options: [
      "SQS delay queues on the consumer's input",
      "EventBridge archives with replay to the rule's target",
      "CloudTrail event history export",
      "Re-publishing from the original producers manually",
    ],
    correctAnswers: [1],
    explanation:
      "EventBridge can archive matched events automatically and replay a chosen time window to the same or different targets, which restores the discarded events precisely. SQS delay and CloudTrail history do not reconstitute event payloads for consumers, and manual re-publishing is infeasible at scale.",
  },
  {
    id: 105,
    category: "Application Integration",
    question:
      "A Step Functions workflow must process tens of thousands of CSV files in parallel, launching a child workflow per file, exceeding what a standard Map state can orchestrate efficiently. Which feature handles this scale?",
    options: [
      "Nested Step Functions Express workflows only",
      "The Distributed Map state, which fans out at high concurrency",
      "A single Lambda function with an internal thread pool",
      "Parallel state with 40,000 branches",
    ],
    correctAnswers: [1],
    explanation:
      "Distributed Map iterates over items stored in S3 or other sources and starts child executions at very high concurrency, designed for tens of thousands of parallel items. The standard Map state is limited in concurrency, a single Lambda is constrained by its own limits, and the Parallel state has a small fixed branch limit.",
  },
  {
    id: 106,
    category: "Networking & Content Delivery",
    question:
      "A CloudFront distribution serves user uploads stored in an S3 bucket. The bucket becomes briefly unavailable, and the company wants CloudFront to automatically serve the same content from a secondary bucket in another Region. Which feature should be used?",
    options: [
      "Cross-Region Replication plus an origin group with failover criteria",
      "Lambda@Edge that rewrites 502 responses",
      "A second CloudFront distribution with Route 53 failover",
      "S3 Transfer Acceleration on the primary bucket",
    ],
    correctAnswers: [0],
    explanation:
      "An origin group lists a primary and secondary origin with failover status codes; when the primary returns those errors, CloudFront retries against the secondary, which relies on cross-Region replication keeping the fallback bucket current. Edge functions and a second distribution add complexity without native failover semantics, and Transfer Acceleration affects upload speed only.",
  },
  {
    id: 107,
    category: "High Availability & Scaling",
    question:
      "During application deployments, new EC2 instances pass their load balancer health checks before the application finishes initializing, so users receive errors from half-initialized instances. Which change prevents this?",
    options: [
      "Increase the target group's health check interval to 10 minutes",
      "Configure a health check grace period matching application startup time",
      "Set the deregistration delay to 30 seconds",
      "Switch the health check protocol from HTTP to TCP",
    ],
    correctAnswers: [1],
    explanation:
      "The health check grace period delays health evaluation for a fixed window after a target is registered, letting the application finish booting before traffic is routed. Longer intervals slow genuine failure detection, deregistration delay affects scale-in drain, and TCP checks would pass even earlier than HTTP checks.",
  },
  {
    id: 108,
    category: "High Availability & Scaling",
    question:
      "A legacy web application stores user sessions on local instance disk. When the Auto Scaling group replaces an instance or the load balancer routes a user elsewhere, users are logged out. The team needs the quickest stopgap while planning a proper fix. What should be applied first?",
    options: [
      "Enable connection draining on the Auto Scaling group",
      "Enable load balancer-generated cookie stickiness so users stay bound to one instance",
      "Increase the Auto Scaling group's minimum size to reduce replacements",
      "Move session data to an EBS volume shared across instances",
    ],
    correctAnswers: [1],
    explanation:
      "Sticky sessions keep a given user on the same target for the cookie duration, which masks the local-session problem immediately at minimal effort. Connection draining affects in-flight requests during deregistration, minimum size does not prevent routing to a different instance, and EBS volumes do not attach to multiple instances concurrently in a scalable way.",
  },
  {
    id: 109,
    category: "High Availability & Scaling",
    question:
      "Which two AWS configurations provide resilience against the loss of an entire Availability Zone? (Select TWO.)",
    options: [
      "An Auto Scaling group with instances spread across multiple Availability Zones",
      "An RDS Multi-AZ deployment",
      "An EBS io2 volume attached to a single instance",
      "An EC2 instance with an EBS snapshot taken weekly",
      "An Amazon EFS file system mounted by instances in one Availability Zone",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Auto Scaling groups redistribute replacements into surviving zones when instances fail, and RDS Multi-AZ keeps a synchronous standby in a second zone with automatic failover. A single-attached EBS volume, weekly snapshots, and an EFS mounted only from one zone do not keep the workload serving through a zone loss.",
  },
];
