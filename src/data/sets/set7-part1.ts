import type { QuizQuestion } from "../questions";

/** Practice Set 7 — questions 391–412 (disaster recovery and multi-Region). Original questions. */
export const set7Part1: QuizQuestion[] = [
  {
    id: 391,
    category: "High Availability & Scaling",
    question:
      "A payments platform requires the lowest possible recovery time for a full regional failure and cost is explicitly secondary. Which disaster recovery strategy delivers the lowest RTO?",
    options: [
      "Backup and restore",
      "Pilot light",
      "Warm standby",
      "Multi-site active/active",
    ],
    correctAnswers: [3],
    explanation:
      "Multi-site active/active serves production from every Region simultaneously, so a regional failure requires no provisioning or scaling at all — traffic simply routes to surviving sites. The other strategies progressively require more bring-up time, with backup and restore being the slowest.",
  },
  {
    id: 392,
    category: "Storage",
    question:
      "Compliance requires that 99.99% of objects written to an S3 bucket appear in a second Region's bucket within 15 minutes, with metrics proving it. Which S3 feature provides this SLA-backed guarantee?",
    options: [
      "Standard Cross-Region Replication alone",
      "S3 Replication Time Control (RTC)",
      "S3 Batch Operations with 15-minute scheduling",
      "Cross-Region Replication with S3 Inventory validation",
    ],
    correctAnswers: [1],
    explanation:
      "Replication Time Control backs replication with an SLA: 99.99% of objects replicated within 15 minutes, plus visibility metrics and event notifications for monitoring. Standard CRR is a best-effort asynchronous process without the SLA, and batch jobs or inventory checks are not SLA-backed replication.",
  },
  {
    id: 393,
    category: "High Availability & Scaling",
    question:
      "An operations team wants to flip traffic between two Regions using explicit routing controls with safety rules that prevent both Regions being disabled at once — a deliberate, operator-driven failover switch. Which AWS feature provides these safety interlocks?",
    options: [
      "Route 53 weighted routing",
      "Route 53 Application Recovery Controller routing controls",
      "Global Accelerator traffic dials only",
      "CloudFront origin failover",
    ],
    correctAnswers: [1],
    explanation:
      "Application Recovery Controller routing controls act as operator-facing switches with safety rules (like no-total-outage checks) that gate Region-level traffic shifts. Weighted DNS lacks safety interlocks, traffic dials shift proportions without the assertion framework, and origin failover is per-distribution CDN logic.",
  },
  {
    id: 394,
    category: "Database",
    question:
      "A team runs quarterly disaster recovery drills by switching its Aurora Global Database from the primary Region to the secondary, and back — with zero data loss during the planned switch. Which Aurora capability performs this?",
    options: [
      "Manually promoting the secondary and re-seeding the old primary",
      "Aurora Global Database managed planned switchover",
      "Snapshot restore into the secondary Region",
      "Failing over to an in-Region Aurora replica",
    ],
    correctAnswers: [1],
    explanation:
      "Managed planned switchover reverses primary and secondary roles with zero data loss, designed for controlled drills and maintenance. Manual promotion and snapshot restores carry data loss or long re-seeding, and an in-Region replica failover does not switch Regions at all.",
  },
  {
    id: 395,
    category: "Database",
    question:
      "A DR testing plan requires restoring a DynamoDB table as it existed 12 hours ago into a different Region for validation, without touching production. Which capability performs a cross-Region restore?",
    options: [
      "DynamoDB global tables",
      "Point-in-time recovery with cross-Region restore",
      "DynamoDB Streams replay into the test Region",
      "Export to S3 and import with a BatchWrite job",
    ],
    correctAnswers: [1],
    explanation:
      "Point-in-time recovery supports restoring a table to a chosen second within its window — including into another Region — enabling non-disruptive DR validation. Global tables run live in both Regions rather than restoring a snapshot in time, and custom replay or export paths are manual approximations.",
  },
  {
    id: 396,
    category: "Management & Governance",
    question:
      "A reliability team wants to verify that its Auto Scaling and database failover actually work during an Availability Zone loss by deliberately stopping network traffic to one AZ — under controlled conditions with stop conditions. Which service runs such experiments?",
    options: [
      "AWS Fault Injection Service (FIS)",
      "AWS Config remediation",
      "Amazon CloudWatch Synthetics",
      "AWS Resilience Hub scoring only",
    ],
    correctAnswers: [0],
    explanation:
      "Fault Injection Service injects controlled failures — including AZ availability outages, spot interruptions, and resource throttling — with guardrail stop conditions, validating recovery paths empirically. Config remediates configuration, Synthetics probes endpoints, and Resilience Hub scores resilience without injecting faults.",
  },
  {
    id: 397,
    category: "Management & Governance",
    question:
      "A backup governance model requires that workload accounts can create backups but cannot delete them; only the security account can perform restores and deletions. Which design achieves this separation?",
    options: [
      "AWS Backup cross-account backups into a vault in the security account, with delete/restore IAM permissions granted only there",
      "Local vaults in each account with IAM denies on backup deletion",
      "S3 as the backup target with Object Lock in governance mode",
      "Weekly manual snapshots downloaded to on-premises storage",
    ],
    correctAnswers: [0],
    explanation:
      "Cross-account backup copies live in a vault owned by the security account; because IAM permissions are account-local, workload accounts simply cannot delete or restore there. Local denies are administered by the same accounts, governance-mode locks can be relaxed by the granting account, and offsite downloads are manual.",
  },
  {
    id: 398,
    category: "High Availability & Scaling",
    question:
      "In a pilot light disaster recovery architecture, which set of components is running continuously in the recovery Region?",
    options: [
      "The full application stack at production scale",
      "The replicated data layer only (for example cross-Region replicas), with AMIs and infrastructure templates staged but compute powered off",
      "A scaled-down copy of every tier serving 5% of traffic",
      "Nothing — pilot light only documents the recovery steps",
    ],
    correctAnswers: [1],
    explanation:
      "Pilot light keeps the critical data layer warm (replicated) plus ready-to-launch templates and AMIs, minimizing cost while cutting bring-up time versus backup and restore. Full stacks describe warm standby or active/active, a small serving copy is warm standby, and pilot light absolutely involves pre-staged infrastructure.",
  },
  {
    id: 399,
    category: "Database",
    question:
      "An analytics team wants a current, queryable copy of an RDS production snapshot in Parquet format on S3, refreshed after every nightly backup, without running a database instance. Which feature produces this?",
    options: [
      "RDS snapshot export to S3",
      "A DMS task into S3",
      "A read replica queried by a batch job",
      "Enhanced Monitoring log exports",
    ],
    correctAnswers: [0],
    explanation:
      "Snapshot export writes complete snapshots to S3 in Parquet, giving analysts a serverless-friendly copy without provisioning database compute. DMS is for live migration pipelines, a replica is a running database, and monitoring logs are not data exports.",
  },
  {
    id: 400,
    category: "Storage",
    question:
      "Account A must replicate its S3 bucket into a bucket owned by a central backup account. What must be in place for cross-account replication to work?",
    options: [
      "Only a replication rule in Account A; the destination accepts automatically",
      "A bucket policy on the destination bucket allowing Account A's replication role, and an IAM role in Account A with permissions to read source and write destination",
      "Root-to-root trust between the accounts",
      "A VPC peering connection between the accounts' networks",
    ],
    correctAnswers: [1],
    explanation:
      "Cross-account replication needs the source account's replication IAM role (read source, write destination) plus a destination bucket policy admitting that role — both halves are required. Destination buckets never accept silently, there is no root trust concept, and this is storage replication, not networking.",
  },
  {
    id: 401,
    category: "High Availability & Scaling",
    question:
      "A global REST API is deployed behind API Gateways in two Regions, backed by DynamoDB global tables. Users should hit the nearest healthy Region automatically. Which routing design completes the architecture?",
    options: [
      "Route 53 latency records with health checks on each regional endpoint",
      "A single CloudFront distribution caching API responses",
      "Weighted routing splitting traffic 50/50 regardless of location",
      "Failover routing with the second Region passive",
    ],
    correctAnswers: [0],
    explanation:
      "Latency-based records with health checks direct each caller to the nearest working API Gateway, while global tables keep both Regions' data synchronized for active/active writes. CloudFront caching does not make writes multi-Region, weighted splits ignore geography, and failover leaves a Region idle.",
  },
  {
    id: 402,
    category: "Networking & Content Delivery",
    question:
      "A company operates hub-and-spoke Transit Gateway networks in three Regions and must interconnect the Regional hubs, with traffic traversing the AWS global backbone. Which construct links the Regional Transit Gateways?",
    options: [
      "VPC peering between the TGW-attached VPCs",
      "Inter-Region Transit Gateway peering attachments",
      "A VPN mesh between the hubs",
      "PrivateLink endpoints between Regions",
    ],
    correctAnswers: [1],
    explanation:
      "Transit Gateway peering attachments connect Regional TGWs over the AWS global backbone, extending the hub-and-spoke model across Regions. VPC peering bypasses the TGW hierarchy, VPN links ride the public internet, and PrivateLink publishes services rather than routing networks.",
  },
  {
    id: 403,
    category: "Application Integration",
    question:
      "An SNS topic in us-east-1 publishes order events, and a consumer fleet in eu-west-1 must process the same messages with full durability. What is a supported pattern?",
    options: [
      "An SQS queue in eu-west-1 subscribed to the us-east-1 topic, with the consumer fleet polling locally",
      "SNS topic replication, which copies all messages to every Region automatically",
      "A Lambda in us-east-1 writing messages to DynamoDB for the eu-west-1 fleet to poll",
      "Consumers in eu-west-1 polling the us-east-1 queue over the internet",
    ],
    correctAnswers: [0],
    explanation:
      "SNS is Regional but its subscriptions can include SQS queues in other Regions in the same partition; the consuming fleet then works against a local queue with normal durability. SNS has no automatic cross-Region replication, the DynamoDB hop adds cost and latency, and cross-Region internet polling bypasses private connectivity best practices.",
  },
  {
    id: 404,
    category: "Application Integration",
    question:
      "A compliance rule requires that queue messages remain retrievable for replay for up to 14 days after being sent. Which SQS setting supports the longest such retention?",
    options: [
      "The default 4-day retention period, which is the maximum",
      "A message retention period of 14 days, the maximum allowed",
      "Visibility timeout extended to 12 hours",
      "FIFO mode with content-based deduplication",
    ],
    correctAnswers: [1],
    explanation:
      "SQS retention is configurable from one minute up to 14 days, so 14 days is the replay window available without moving to a log-based system. Four days is merely the default, visibility timeout hides messages rather than retaining them post-processing, and FIFO settings address ordering and deduplication.",
  },
  {
    id: 405,
    category: "Compute",
    question:
      "A serverless REST API (API Gateway plus Lambda plus DynamoDB) needs a full second-Region deployment for disaster recovery, with traffic switching automatically on failure. Which deployment and routing pattern fits?",
    options: [
      "Deploy the same infrastructure as code in the second Region with DynamoDB global tables, and front both with Route 53 failover or latency routing with health checks",
      "Copy Lambda code into S3 cross-Region replication and wait for automatic redeployment",
      "Enable API Gateway cross-Region failover as a stage setting",
      "Run the API only in the primary Region but enable DynamoDB global tables",
    ],
    correctAnswers: [0],
    explanation:
      "Serverless components are Regional, so DR means deploying the same stack in the second Region, keeping data synchronized with global tables, and routing with health-aware DNS. S3 replication of source code does not deploy anything, API Gateway has no built-in cross-Region failover, and data replication alone leaves the API unavailable.",
  },
  {
    id: 406,
    category: "High Availability & Scaling",
    question:
      "A stateful EC2 fleet of 100 instances must be recreated in a recovery Region within 15 minutes. Golden AMIs and launch templates exist. Which standing arrangement achieves this?",
    options: [
      "Warm compute: an ASG in the recovery Region with desired capacity 0 using the copied AMI and launch template, scaled up at failover",
      "Rebuilding all instances from the AMI manually at DR time",
      "Running a second full fleet at 10% serving weight continuously",
      "Copying EBS volumes cross-Region nightly and attaching them at failover",
    ],
    correctAnswers: [0],
    explanation:
      "A zero-capacity Auto Scaling group pre-wired to copied AMIs and templates launches the whole fleet in minutes when desired capacity is raised — a compute warm standby without idle cost. Manual rebuilds miss the window, a 10% fleet is a warm standby at constant cost (a valid but costlier strategy than described), and volume copies add hours of attach and bootstrapping.",
  },
  {
    id: 407,
    category: "Database",
    question:
      "A regional disaster hits the primary Region of an RDS for MySQL deployment that has a cross-Region read replica in the recovery Region. What is the correct recovery action and its data-loss characteristic?",
    options: [
      "Promote the cross-Region replica to a standalone primary; data loss equals the replication lag (minutes) since replication was asynchronous",
      "Wait for AWS to restore the primary automatically; no data loss",
      "Promote the replica; it is always exactly synchronized with zero loss",
      "Restore the latest automated snapshot into the recovery Region; loss equals one snapshot interval",
    ],
    correctAnswers: [0],
    explanation:
      "Cross-Region read replicas replicate asynchronously, so promotion yields minutes of potential data loss equal to the lag at failure time. AWS will not invisibly reconstruct a failed Region, replica promotion is not synchronous, and snapshot restore loses far more than the replica lag.",
  },
  {
    id: 408,
    category: "Storage",
    question:
      "A shared EFS file system in the primary Region must be mirrored into a recovery Region's EFS file system daily, with integrity verification and bandwidth automation. Which tool performs this sync?",
    options: [
      "AWS DataSync tasks between the two EFS file systems",
      "EFS built-in cross-Region replication",
      "S3 Batch Operations",
      "An rsync instance scheduled by cron",
    ],
    correctAnswers: [0],
    explanation:
      "DataSync supports EFS-to-EFS synchronization (including cross-Region) with scheduling, verification, and bandwidth controls — the managed tool for this mirror. EFS replication is not a native feature, S3 tooling doesn't move NFS data, and hand-rolled rsync lacks managed verification.",
  },
  {
    id: 409,
    category: "Storage",
    question:
      "An on-premises block storage gateway must be configured so that the primary copy of data lives in S3 in AWS, improving disaster recovery if the data center is lost, with local copies acting only as a cache. Which Volume Gateway mode fits?",
    options: [
      "Stored volume mode",
      "Cached volume mode",
      "Tape Gateway mode",
      "File Gateway mode",
    ],
    correctAnswers: [1],
    explanation:
      "Cached volumes keep the primary data in S3 with a local cache for hot data, so losing the site loses only cache — data remains in AWS. Stored mode keeps the primary on-premises with S3 as backup, Tape Gateway is a virtual tape library, and File Gateway serves files rather than iSCSI block volumes.",
  },
  {
    id: 410,
    category: "Management & Governance",
    question:
      "Which two AWS Backup capabilities directly support compliance-driven backup requirements? (Select TWO.)",
    options: [
      "Cross-account and cross-Region backup copies",
      "Backup Vault Lock for immutable retention",
      "Automatic instance rightsizing during restore",
      "Live replication of production databases",
      "Continuous change data capture",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Compliance commonly requires off-site (cross-account/Region) copies and immutable retention, both native AWS Backup capabilities. Rightsizing, live replication, and CDC are operational or migration functions, not backup compliance features.",
  },
  {
    id: 411,
    category: "Networking & Content Delivery",
    question:
      "A Route 53 health check against an ALB endpoint keeps marking the endpoint unhealthy even though the application serves users fine. The ALB returns 403 on the checked path because a WAF rule blocks unauthenticated probes. What is the fix?",
    options: [
      "Disable the WAF rule for all traffic",
      "Point the health check at a path that returns 2xx or 3xx without authentication, or align the health check with WAF exceptions",
      "Change the health check to TCP on port 443",
      "Increase the health check failure threshold to 10",
    ],
    correctAnswers: [1],
    explanation:
      "Health checks consider the check healthy on 2xx/3xx responses, so the probed path must answer successfully — typically a dedicated unauthenticated health endpoint. Loosening the WAF globally weakens security, TCP checks would pass regardless of application health, and thresholds only delay the verdict.",
  },
  {
    id: 412,
    category: "Database",
    question:
      "A regional failure occurs for an application using DynamoDB global tables. From the data layer's perspective, what does recovery involve?",
    options: [
      "Restoring the table from the last backup in the surviving Region",
      "Nothing — the surviving Regional replica tables are already active and consistent for reads and writes; only application/DNS routing shifts",
      "Promoting a read replica to primary",
      "Replaying Streams into the surviving table",
    ],
    correctAnswers: [1],
    explanation:
      "Global tables are active/active: every Region holds a fully writable replica, so no data-layer recovery is required — routing moves to the surviving Region. Backups, replica promotion, and stream replay are patterns for single-Region tables, not global tables.",
  },
];
