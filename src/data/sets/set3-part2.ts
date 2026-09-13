import type { QuizQuestion } from "../questions";

/** Practice Set 3 — questions 153–174 (resilient architectures focus). Original questions. */
export const set3Part2: QuizQuestion[] = [
  {
    id: 153,
    category: "Database",
    question:
      "After an RDS Multi-AZ failover, applications using the database endpoint reconnect only after several minutes because cached DNS still points at the failed node. Which approach provides the fastest application recovery across failovers?",
    options: [
      "Lower the application's operating system DNS cache TTL to zero",
      "Connect through Amazon RDS Proxy, which rehomes connections without waiting for DNS changes",
      "Use the instance endpoint of the primary rather than the cluster endpoint",
      "Schedule application restarts immediately after every failover event",
    ],
    correctAnswers: [1],
    explanation:
      "RDS Proxy presents a stable endpoint that survives failover and re-establishes client connections to the new primary, removing dependence on DNS propagation. Zeroing DNS caches helps but must be done on every host and still drops connections, instance endpoints change with failover by definition, and restart scripts are reactive toil.",
  },
  {
    id: 154,
    category: "High Availability & Scaling",
    question:
      "An application's traffic reliably follows daily and weekly patterns, peaking predictably each workday morning. The team wants capacity ready ahead of the peak rather than reacting to CPU metrics. Which Auto Scaling policy type should be used?",
    options: [
      "Target tracking on average CPU",
      "Step scaling on a network-in alarm",
      "Predictive scaling using machine-learned forecasts",
      "Manual scaling by a runbook",
    ],
    correctAnswers: [2],
    explanation:
      "Predictive scaling analyzes historical load patterns and schedules capacity ahead of recurring peaks, removing the lag inherent in reactive policies. Target and step scaling act only after load arrives, which risks under-provisioning the morning ramp, and runbooks do not scale automatically.",
  },
  {
    id: 155,
    category: "Storage",
    question:
      "An S3 bucket with versioning enabled accumulates years of noncurrent versions that are never accessed, and storage costs keep growing. Current versions must remain untouched. Which lifecycle configuration addresses this?",
    options: [
      "Expire current object versions after 365 days",
      "Expire noncurrent object versions after a set number of days and delete expired delete markers",
      "Abort incomplete multipart uploads after 7 days",
      "Transition current versions to S3 One Zone-IA",
    ],
    correctAnswers: [1],
    explanation:
      "Lifecycle rules scoped to noncurrent versions prune old versions while preserving the latest, and removing expired delete markers cleans up residue. Expiring current versions deletes live data, multipart cleanup targets unfinished uploads rather than versions, and a storage-class transition changes cost per GB without reclaiming space from versions.",
  },
  {
    id: 156,
    category: "High Availability & Scaling",
    question:
      "A small stateless application currently runs on one EC2 instance in one Availability Zone. Management requires it to survive the loss of a single Availability Zone with no manual intervention. What is the minimum change that achieves this?",
    options: [
      "Take daily AMIs of the instance",
      "Add a second instance in another AZ behind an Application Load Balancer with a target group",
      "Enable CloudWatch detailed monitoring with an alarm",
      "Increase the instance to the largest available type",
    ],
    correctAnswers: [1],
    explanation:
      "Surviving an AZ failure requires a healthy instance in a second AZ plus a load balancer to shift traffic automatically. AMIs and monitoring detect or enable recovery but require human action, and a bigger single instance still fails with the zone.",
  },
  {
    id: 157,
    category: "Storage",
    question:
      "An executive asks why a single logical S3 bucket survives the loss of an entire Availability Zone without configuration. What is the underlying reason?",
    options: [
      "S3 automatically stores objects redundantly across a minimum of three Availability Zones",
      "S3 continuously replicates every bucket to a second Region by default",
      "S3 buckets are backed by EBS volumes snapshot every hour",
      "S3 mounts the bucket across subnets using multi-attach EBS",
    ],
    correctAnswers: [0],
    explanation:
      "S3 is designed for 99.999999999% durability by redundantly storing objects across at least three Availability Zones within a Region, invisible to the user. Cross-Region replication is opt-in, and S3 is a service built on its own storage infrastructure, not EBS.",
  },
  {
    id: 158,
    category: "Storage",
    question:
      "A team needs EFS for container scratch data that can be rebuilt from source at any time and wants the lowest possible storage price, accepting that a single AZ outage makes the data temporarily unavailable. Which configuration fits?",
    options: [
      "EFS Standard storage class across three AZs",
      "EFS One Zone storage class",
      "EFS Infrequent Access with lifecycle",
      "EFS Elastic throughput on Standard",
    ],
    correctAnswers: [1],
    explanation:
      "One Zone stores data in a single AZ at a discount, which is acceptable for rebuildable scratch data. Standard and IA on Standard keep multiple-AZ copies, and throughput mode is orthogonal to where data lives.",
  },
  {
    id: 159,
    category: "Management & Governance",
    question:
      "A security policy requires that backup data in AWS Backup cannot be deleted or altered by anyone, including administrators and the root user, for the retention period — protecting against ransomware. Which feature enforces this?",
    options: [
      "Backup plan lifecycle rules set to retain forever",
      "AWS Backup Vault Lock in compliance mode",
      "Copying backups to an S3 bucket with versioning",
      "Cross-account backup with IAM policies denying deletion",
    ],
    correctAnswers: [1],
    explanation:
      "Vault Lock applies WORM immutability to a backup vault in compliance mode, preventing deletion or retention changes even by privileged users once locked. Lifecycle rules can be edited, S3 versioning is a different store, and IAM denies can be bypassed by the same administrators who manage IAM — the point of the requirement is that no principal can undo it.",
  },
  {
    id: 160,
    category: "Storage",
    question:
      "Financial records written to S3 must be retained for seven years such that no user, including the account root, can overwrite or delete them during that period. Which S3 feature provides the strongest guarantee?",
    options: [
      "S3 Object Lock in compliance mode with a seven-year retention period",
      "S3 Object Lock in governance mode with special permissions required",
      "Bucket versioning alone",
      "Cross-Region Replication with delete markers replicated",
    ],
    correctAnswers: [0],
    explanation:
      "Compliance mode cannot be relaxed by anyone, including root, until the retention period elapses. Governance mode can be bypassed by principals granted a special permission, versioning alone allows overwriting via new versions and permanent deletion, and replication does not prevent deletes.",
  },
  {
    id: 161,
    category: "Database",
    question:
      "An RDS instance used for a now-finished project will be deleted next week. The team must keep a restorable copy of the database for one year after the instance is gone. Which action satisfies this?",
    options: [
      "Rely on automated backups; they persist after instance deletion by default",
      "Take a final manual snapshot (or retain the final snapshot) and keep it for the retention period",
      "Enable read replicas before deleting the instance",
      "Export the database schema only, since data is reproducible",
    ],
    correctAnswers: [1],
    explanation:
      "Manual snapshots persist independently of the instance and can be retained indefinitely, providing a restorable copy after deletion. Automated backups are removed when the instance is deleted unless explicitly retained, replicas cannot exist without their source, and schema alone does not preserve data.",
  },
  {
    id: 162,
    category: "High Availability & Scaling",
    question:
      "An Auto Scaling group mixes web servers and long-running batch workers. Scale-in events sometimes terminate batch workers mid-job, losing hours of progress. Which mechanism protects the workers?",
    options: [
      "Enable instance scale-in protection on the worker instances",
      "Increase the group's cooldown to one hour",
      "Set the group's minimum size to the total instance count",
      "Attach an EBS volume to store partial progress",
    ],
    correctAnswers: [0],
    explanation:
      "Scale-in protection marks specific instances as ineligible for termination during scale-in, letting batch jobs run to completion. Cooldown delays scaling actions but does not choose victims, raising minimum size prevents scale-in entirely at higher cost, and storage does not stop the termination.",
  },
  {
    id: 163,
    category: "Application Integration",
    question:
      "A consumer processes each SQS message for up to 10 minutes, but the queue's visibility timeout is 2 minutes. A second consumer receives the same message while the first still works, causing duplicates. Which fix is correct?",
    options: [
      "Switch to a FIFO queue, which prevents all duplicates",
      "Set the visibility timeout greater than the maximum expected processing time",
      "Delete messages immediately upon receipt, before processing",
      "Reduce batch size so messages are smaller",
    ],
    correctAnswers: [1],
    explanation:
      "A message becomes visible again when the visibility timeout expires; it must exceed worst-case processing time (consumers can also extend it per message). FIFO still redelivers unacknowledged messages, deleting before processing loses the message on crash, and batch size is unrelated to visibility.",
  },
  {
    id: 164,
    category: "Application Integration",
    question:
      "An EventBridge rule targets a Lambda function that is down for maintenance, and events delivered during the outage are lost. Which configuration preserves those events for later processing?",
    options: [
      "Configure a dead-letter queue on the rule's target",
      "Increase the Lambda function's memory so it never fails",
      "Enable an EventBridge archive and replay the window after the function returns",
      "Add a retry policy with exponential backoff on the target",
    ],
    correctAnswers: [0],
    explanation:
      "A DLQ attached to the target captures events that could not be delivered so they can be drained later. More memory addresses a different failure mode, archiving plus replay is a valid complementary approach but the standard target-level answer for preserving failed deliveries is the DLQ, and retry policies alone discard events after final failure.",
  },
  {
    id: 165,
    category: "Migration & Transfer",
    question:
      "Partner organizations exchange files with a company over SFTP. The company wants a managed SFTP endpoint with users authenticated against its identity provider and files landing in S3, without operating EC2-based SFTP software. Which service fits?",
    options: [
      "AWS Transfer Family",
      "AWS DataSync",
      "Amazon S3 Transfer Acceleration",
      "AWS Storage Gateway Volume Gateway",
    ],
    correctAnswers: [0],
    explanation:
      "Transfer Family provides managed SFTP/FTPS/FTP endpoints backed directly by S3, with custom identity provider integration. DataSync moves data between locations, Transfer Acceleration speeds S3 uploads over the internet without SFTP semantics, and Volume Gateway presents block storage, not SFTP.",
  },
  {
    id: 166,
    category: "Migration & Transfer",
    question:
      "A company must move 120 TB of archival backup tapes from a remote site whose internet uplink is 50 Mbps and unreliable. Which migration approach completes the transfer in a predictable window?",
    options: [
      "AWS DataSync agents over the existing link",
      "AWS Snowball Edge devices shipped to the site",
      "S3 Transfer Acceleration for the archive uploads",
      "Direct Connect provisioned temporarily for one week",
    ],
    correctAnswers: [1],
    explanation:
      "At 50 Mbps, 120 TB would take many months; a physical Snowball device sidesteps the bottleneck entirely. DataSync and Transfer Acceleration still depend on the thin link, and even a short-term Direct Connect for one week could not carry 120 TB reliably at reasonable cost compared with shipping.",
  },
  {
    id: 167,
    category: "Application Integration",
    question:
      "A Step Functions workflow calls a flaky third-party API through Lambda. Transient 5xx responses should be retried with backoff, and permanent failures should route to a compensation state. Which Step Functions construct pair implements this?",
    options: [
      "Parallel state with two branches, one for success and one for failure",
      "Retry with exponential backoff on the task, plus a Catch targeting a fallback state",
      "Choice state before the task evaluating a retry flag",
      "Map state iterating attempts until success",
    ],
    correctAnswers: [1],
    explanation:
      "Task states natively support Retry (with backoff intervals and max attempts) and Catch (routing errors to fallback states), the canonical pattern for flaky dependencies. Parallel states duplicate work, Choice evaluates input before execution, and Map is for per-item iteration.",
  },
  {
    id: 168,
    category: "Application Integration",
    question:
      "An asynchronously invoked Lambda function occasionally fails after exhausting its two retry attempts, and the events are dropped. Where should failed events be captured so they can be processed later?",
    options: [
      "The function's OnFailure destination, such as an SQS queue",
      "The dead-letter queue of an API Gateway stage",
      "CloudWatch alarm on the Errors metric with a manual re-invoke runbook",
      "The function's OnSuccess destination",
    ],
    correctAnswers: [0],
    explanation:
      "Async invocation supports failure destinations (SQS, SNS, Lambda, EventBridge) that receive the event payload after retries are exhausted. API Gateway DLQs belong to the API layer, alarm plus runbook is manual, and OnSuccess fires for successful invocations.",
  },
  {
    id: 169,
    category: "Management & Governance",
    question:
      "Operations wants continuous, scripted probes of a public endpoint every five minutes from outside the VPC, with screenshots and failure alarms — independent of real user traffic. Which feature provides this?",
    options: [
      "CloudWatch Synthetics canaries",
      "CloudWatch Logs metric filters",
      "AWS Health Dashboard notifications",
      "X-Ray sampling rules",
    ],
    correctAnswers: [0],
    explanation:
      "Synthetics canaries run scheduled scripts (with screenshots) against endpoints and raise alarms on failure, providing traffic-independent monitoring. Metric filters analyze existing logs, Health reports AWS-side service events, and X-Ray observes real requests.",
  },
  {
    id: 170,
    category: "Compute",
    question:
      "A small team deploys a containerized web application straight from a source repository or image registry and wants AWS to build, run, load balance, and scale it with near-zero configuration. Which service matches this description most closely?",
    options: [
      "Amazon ECS with EC2 launch type",
      "AWS App Runner",
      "Amazon EKS with Fargate",
      "Elastic Beanstalk with Docker images",
    ],
    correctAnswers: [1],
    explanation:
      "App Runner builds from source or a registry image and runs the web service with automatic load balancing and scaling and essentially no configuration. ECS on EC2 and EKS require cluster management, and Beanstalk, while managed, has more configuration surface than App Runner's source-to-service flow.",
  },
  {
    id: 171,
    category: "High Availability & Scaling",
    question:
      "A stateful web application stores login sessions in instance memory. Rather than pinning users to instances, the team wants sessions to survive instance replacement and allow any instance to serve any user. Where should session state live?",
    options: [
      "An EBS volume detached and reattached between instances",
      "An externalized session store such as ElastiCache for Redis",
      "The instance's instance store volume",
      "Duplicated session files on every instance via user data",
    ],
    correctAnswers: [1],
    explanation:
      "Externalizing sessions to a managed shared store like Redis decouples user state from instance lifecycle, so any instance can serve any session and replacements lose nothing. EBS and instance store are per-instance or awkward to share, and file duplication is not transactionally safe.",
  },
  {
    id: 172,
    category: "High Availability & Scaling",
    question:
      "During a disaster recovery review, an auditor asks for the definitions of RPO and RTO as they apply to the company's runbooks. Which pairing is correct?",
    options: [
      "RPO is the maximum tolerable time to restore service; RTO is the maximum tolerable data loss window",
      "RPO is the maximum tolerable data loss measured in time; RTO is the maximum tolerable time to restore service",
      "RPO and RTO both measure the duration of the recovery process under different protocols",
      "RPO measures replication lag; RTO measures replication distance",
    ],
    correctAnswers: [1],
    explanation:
      "Recovery Point Objective bounds how much data (in time) may be lost; Recovery Time Objective bounds how long the service may be down. The other pairings swap or redefine the terms.",
  },
  {
    id: 173,
    category: "Networking & Content Delivery",
    question:
      "A VPC spans three Availability Zones. Instances in each zone use the zone's single NAT gateway for outbound traffic. During an AZ outage, instances in that zone lose internet access entirely. What should be changed?",
    options: [
      "Replace NAT gateways with NAT instances in two zones",
      "Accept the loss; NAT gateways are Regional by default",
      "Keep one NAT gateway per AZ as designed; route each private subnet to its own zone's gateway and add cross-AZ fallback routes",
      "Move all private subnets into the zone with the healthiest NAT gateway",
    ],
    correctAnswers: [2],
    explanation:
      "A NAT gateway serves a single AZ; the resilient pattern is one per AZ with each private subnet routing to its local gateway, plus fallback routes (at the cost of cross-AZ data transfer) if a zone fails. NAT instances are less reliable replacements, NAT gateways are AZ-scoped not Regional, and collapsing zones multiplies the failure domain.",
  },
  {
    id: 174,
    category: "High Availability & Scaling",
    question:
      "Which two disaster recovery strategies are the two lowest-cost patterns in the standard cost-versus-recovery-time spectrum? (Select TWO.)",
    options: [
      "Multi-site active/active",
      "Backup and restore",
      "Warm standby",
      "Pilot light",
      "Chaos-engineered failover",
    ],
    correctAnswers: [1, 3],
    explanation:
      "Backup and restore (cheapest, slowest) and pilot light (core data replicated, minimal services off) are the two least expensive strategies; warm standby costs more because a scaled-down stack always runs, and active/active is the most expensive.",
  },
];
