import type { QuizQuestion } from "../questions";

/** Practice Set 9 — questions 565–585 (databases, streaming, migration). Original questions. */
export const set9Part3: QuizQuestion[] = [
  {
    id: 565,
    category: "Database",
    question:
      "A developer ran a mistaken DELETE on an Aurora MySQL table an hour ago. The team wants to undo it without restoring from backup or losing subsequent writes. Which Aurora feature rewinds the cluster to before the mistake?",
    options: [
      "Aurora backtrack",
      "Point-in-time restore to a new cluster",
      "Aurora cloning",
      "Fast database reset",
    ],
    correctAnswers: [0],
    explanation:
      "Backtrack rewinds the cluster in place to an earlier point within the backtrack window (up to 72 hours) without a restore and while preserving later configuration. PITR creates a new cluster and loses subsequent writes, cloning copies forward, and fast reset empties data.",
  },
  {
    id: 566,
    category: "Database",
    question:
      "A team wants Multi-AZ failover AND the ability to connect to the standby for read-only reporting queries on RDS MySQL. Which deployment mode provides readable standbys?",
    options: [
      "Multi-AZ DB instance deployment (synchronous standby, not readable)",
      "Multi-AZ DB cluster deployment with two readable standbys",
      "Multi-AZ with two writers active simultaneously",
      "Single-AZ with hourly snapshots",
    ],
    correctAnswers: [1],
    explanation:
      "The Multi-AZ DB cluster deployment runs a writer plus two readable standbys with semi-synchronous replication. The classic DB instance deployment keeps its standby passive and unreadable, dual writers are not an RDS mode, and snapshots are not a deployment topology.",
  },
  {
    id: 567,
    category: "Database",
    question:
      "A legacy Oracle application requires OS-level access and database settings (such as specific patches and file layouts) that standard RDS for Oracle does not expose, while still offloading infrastructure tasks. Which option balances both?",
    options: [
      "Amazon RDS Custom for Oracle",
      "Standard RDS for Oracle with the parameter group at maximum",
      "Oracle installed on Spot Instances",
      "Aurora PostgreSQL with an Oracle compatibility flag",
    ],
    correctAnswers: [0],
    explanation:
      "RDS Custom provides OS and database administrative access (with automated infrastructure management underneath), bridging managed and self-managed. Standard RDS blocks OS access, Spot instances risk interruption, and Aurora is a different engine.",
  },
  {
    id: 568,
    category: "Database",
    question:
      "Auditors require a record of every SQL statement executed against a production database, delivered to S3 for long-term retention. Which capability exports this activity log?",
    options: [
      "Enable database audit logging and publish logs to CloudWatch Logs, then export to S3",
      "Enable Enhanced Monitoring at one-second granularity",
      "Take snapshots before and after every query",
      "Enable Performance Insights retention extension",
    ],
    correctAnswers: [0],
    explanation:
      "Native database audit logging (for example, Oracle audit or MySQL general/audit logs) publishes to CloudWatch Logs, from which subscription filters deliver to S3 for retention. Enhanced Monitoring captures OS metrics, snapshots capture data states, and Performance Insights records load not statements.",
  },
  {
    id: 569,
    category: "Database",
    question:
      "A Redis workload keeps tens of gigabytes of keys where only a fraction are frequently accessed; memory costs dominate. Which ElastiCache option reduces cost while keeping hot keys in memory?",
    options: [
      "Data tiering on Graviton nodes (r6gd), placing infrequently accessed items on NVMe at lower cost",
      "Enabling cluster mode with more shards",
      "Increasing the TTL on all keys",
      "Moving cold keys to S3 nightly",
    ],
    correctAnswers: [0],
    explanation:
      "Data tiering uses local NVMe on r6gd nodes for less-frequently accessed items, cutting memory costs up to ~60% while Redis manages placement transparently. More shards add capacity at full memory price, TTLs expire data rather than tiering it, and S3 offloading breaks Redis semantics.",
  },
  {
    id: 570,
    category: "Database",
    question:
      "A Redshift workload needs to resize compute independently of storage and scale concurrency without repartitioning data. Which node type generation fits?",
    options: [
      "RA3 nodes with managed storage",
      "DC2 dense compute nodes",
      "DS2 dense storage nodes",
      "Serverless? no — reserved DC2 nodes",
    ],
    correctAnswers: [0],
    explanation:
      "RA3 separates compute from managed storage (backed by S3), enabling independent resizing and cross-AZ data sharing. DC2 couples compute with local SSD storage, DS2 is the legacy HDD generation, and the parenthetical distractor contradicts itself.",
  },
  {
    id: 571,
    category: "Database",
    question:
      "During month-end, concurrent Redshift queries queue and dashboards time out, though the rest of the month is quiet. Which Redshift feature adds transient capacity automatically during these bursts?",
    options: [
      "Concurrency scaling clusters",
      "Redshift Spectrum queries",
      "Elastic resize to a larger permanent cluster",
      "Workload management queues with more slots",
    ],
    correctAnswers: [0],
    explanation:
      "Concurrency scaling automatically adds cluster capacity when queues build and bills only while active, matching bursty query patterns. Spectrum queries S3 data, permanent resize pays all month, and WLM queues just split existing capacity.",
  },
  {
    id: 572,
    category: "Analytics",
    question:
      "Business dashboards on QuickSight must render in milliseconds for hundreds of concurrent viewers, importing data into a managed in-memory engine refreshed on schedule. Which QuickSight capacity mode fits?",
    options: [
      "SPICE in-memory engine with scheduled refreshes",
      "Direct query mode against the database for every view",
      "Exporting datasets to CSV attached to emails",
      "Embedding SQL queries in the dashboard pixel code",
    ],
    correctAnswers: [0],
    explanation:
      "SPICE imports data into QuickSight's in-memory engine for interactive scale with scheduled or incremental refreshes. Direct query defers to the source on each interaction, trading latency, and the other options are not dashboard architectures.",
  },
  {
    id: 573,
    category: "Analytics",
    question:
      "An OpenSearch domain holds two years of logs. Recent weeks are queried interactively; older logs are read occasionally and must cost dramatically less without leaving the domain's query surface. Which storage tier fits the older logs?",
    options: [
      "UltraWarm storage backed by S3 for read-only warm data",
      "Cold storage deleted after 30 days",
      "Duplicating old indices to DynamoDB",
      "Shrinking shard counts on hot indices",
    ],
    correctAnswers: [0],
    explanation:
      "UltraWarm keeps older indices queryable on S3-backed storage at a fraction of hot storage cost. Deleting violates retention, duplication adds cost and complexity, and shard tuning affects performance not tier economics.",
  },
  {
    id: 574,
    category: "Analytics",
    question:
      "A telemetry pipeline's ingestion rate is unpredictable — minutes of quiet followed by 10x bursts — and the team refuses capacity planning. Which Kinesis Data Streams mode fits?",
    options: [
      "Provisioned mode with 10 shards and auto scaling scripts",
      "On-demand mode, which scales capacity automatically per stream",
      "Firehose with buffering hints",
      "Enhanced fan-out for every consumer",
    ],
    correctAnswers: [1],
    explanation:
      "On-demand streams ingest up to double the previous peak automatically, billing per GB — no shard planning. Provisioned shards require manual or scripted resharding, Firehose is delivery rather than stream processing, and fan-out concerns consumer throughput.",
  },
  {
    id: 575,
    category: "Database",
    question:
      "An IoT platform queries recent sensor data at high frequency while historical data is queried rarely by batch jobs. Which Timestream configuration optimizes both?",
    options: [
      "Memory store for recent writes/queries with magnetic store retaining history under retention policies",
      "Magnetic store for everything to minimize cost",
      "Memory store retention set to 10 years",
      "Exporting to S3 and querying with Athena exclusively",
    ],
    correctAnswers: [0],
    explanation:
      "Timestream's two stores place recent data in fast memory storage and automatically age it into cheap magnetic storage per policies. All-magnetic slows recent queries, decade-long memory retention is costly, and S3 export forfeits native time-series queries.",
  },
  {
    id: 576,
    category: "Database",
    question:
      "A QLDB ledger must feed near-real-time analytics downstream whenever a block is committed. Which QLDB feature publishes the journal to streaming consumers?",
    options: [
      "QLDB streams to Kinesis Data Streams",
      "QLDB exports to S3 on a schedule only",
      "DynamoDB Streams mirroring",
      "CloudTrail data events on the ledger",
    ],
    correctAnswers: [0],
    explanation:
      "QLDB streams continuously emit journal blocks to Kinesis for real-time consumers. Exports are periodic snapshots, DynamoDB Streams belong to DynamoDB, and CloudTrail records API calls.",
  },
  {
    id: 577,
    category: "Database",
    question:
      "A Cassandra-compatible workload requires active/active tables in two Regions with local writes. Which Keyspaces capability provides this?",
    options: [
      "Amazon Keyspaces multi-Region replication",
      "CQL cross-cluster queries",
      "Keyspaces PITR copied cross-Region",
      "DynamoDB global tables with a CQL wrapper",
    ],
    correctAnswers: [0],
    explanation:
      "Keyspaces replicates tables across Regions for active/active access with last-writer-wins, native to the service. Cross-cluster queries, backup copies, and DynamoDB wrapper patterns are not the native multi-Region mechanism.",
  },
  {
    id: 578,
    category: "Database",
    question:
      "A graph database workload requires cross-Region replication for global read locality and disaster recovery. Which Neptune capability provides this?",
    options: [
      "Neptune global databases",
      "Neptune read replicas promoted across Regions",
      "Neptune snapshots restored weekly abroad",
      "Neptune Workbench replication",
    ],
    correctAnswers: [0],
    explanation:
      "Neptune global databases replicate clusters across Regions with replication lag under a second for reads and fast regional promotion. Cross-Region replica promotion, snapshot copies, and the Workbench (a query console) are not the global replication feature.",
  },
  {
    id: 579,
    category: "Migration & Transfer",
    question:
      "After a DMS migration completes full load and CDC, the business needs proof that source and target match — table counts and row-level integrity. Which DMS capability validates this?",
    options: [
      "DMS data validation with per-table statistics",
      "Schema Conversion Tool assessment report",
      "DMS fleet advisor? no — DMS task CloudWatch metrics only",
      "Manual spot checks with SQL clients",
    ],
    correctAnswers: [0],
    explanation:
      "DMS validation compares source and target rows and exposes per-table statistics, producing the reconciliation evidence. SCT reports schema conversion work, task metrics show throughput not equality, and manual checks don't scale or attest.",
  },
  {
    id: 580,
    category: "Migration & Transfer",
    question:
      "Before cutting production servers over through Application Migration Service, the team must verify the recovered servers work — without affecting the continuously replicated source machines. Which MGN capability provides safe verification?",
    options: [
      "Non-disruptive test launches of recovery instances",
      "Promoting the replication staging area to production",
      "Pausing data replication during the test",
      "Snapshotting the source VMs in the data center",
    ],
    correctAnswers: [0],
    explanation:
      "MGN test launches boot recovery instances from replicated data in an isolated network while replication continues untouched. The staging area is infrastructure, pausing replication risks the RPO, and hypervisor snapshots are outside MGN's flow.",
  },
  {
    id: 581,
    category: "Migration & Transfer",
    question:
      "A DataSync task must run nightly at 02:00, cap its bandwidth use to 500 Mbps to protect business-hours... rather, to protect the thin WAN link, and verify transferred files' integrity. Which DataSync configuration covers these?",
    options: [
      "Task scheduling with bandwidth throttling limits and verification options configured on the task",
      "Separate Lambda functions watching the folder",
      "Increasing the agent's disk size for speed",
      "Running the task manually whenever admins remember",
    ],
    correctAnswers: [0],
    explanation:
      "DataSync tasks natively support cron schedules, bandwidth throttling, and integrity verification levels in a single task configuration. Sidecar Lambdas, agent disk size, and manual runs do not provide scheduling or throttling guarantees.",
  },
  {
    id: 582,
    category: "Migration & Transfer",
    question:
      "Two enterprises exchange structured B2B documents (EDI/X12) over AS2 with signing and MDN acknowledgments. Files must land in S3. Which managed service supports the AS2 protocol?",
    options: [
      "AWS Transfer Family with AS2 enabled",
      "Amazon MQ with an AS2 bridge",
      "AWS DataSync with custom headers",
      "API Gateway with XML validation",
    ],
    correctAnswers: [0],
    explanation:
      "Transfer Family supports AS2 (with certificates, signing, and MDNs) as a managed protocol endpoint backed by S3. MQ hosts message brokers, DataSync moves files without AS2 semantics, and API Gateway does not speak AS2.",
  },
  {
    id: 583,
    category: "Migration & Transfer",
    question:
      "A remote drilling site must run EC2-compatible compute locally (with limited AWS connectivity) and later ship accumulated data to AWS. Which device supports local EC2-style instances plus storage transfer?",
    options: [
      "Snowball Edge Compute Optimized with compatible EC2 instances (sbe instances)",
      "Snowcone SSD without compute",
      "An Outposts rack at the drilling site",
      "A Local Zone in the nearest metro",
    ],
    correctAnswers: [0],
    explanation:
      "Snowball Edge Compute Optimized runs compatible EC2 instances at the edge and ships accumulated storage back to AWS. Snowcone's compute is minimal, Outposts requires a permanent data center presence, and Local Zones are metro infrastructure.",
  },
  {
    id: 584,
    category: "Networking & Content Delivery",
    question:
      "Workloads on AWS Outposts must reach the local on-premises network and a local S3 access point without traversing back to the parent AWS Region. Which Outposts component provides local connectivity?",
    options: [
      "The Outposts local gateway (LGW)",
      "The Regional service link",
      "A Transit Gateway in the parent Region",
      "An internet gateway in the Outpost subnet",
    ],
    correctAnswers: [0],
    explanation:
      "The local gateway routes Outpost subnet traffic to on-premises networks and local S3 access points directly on site. The service link connects Outposts to its parent Region for control plane and AWS service access, and Regional gateways aren't locally attached.",
  },
  {
    id: 585,
    category: "Networking & Content Delivery",
    question:
      "Which two options provide site-to-site (network-to-network) connectivity into a VPC? (Select TWO.)",
    options: [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "AWS Client VPN for individual laptops",
      "VPC peering to an on-premises data center",
      "API Gateway private integration",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Site-to-Site VPN and Direct Connect join networks to a VPC. Client VPN serves individual users, peering exists only between VPCs (not on-premises), and API Gateway private integration exposes specific services.",
  },
];
