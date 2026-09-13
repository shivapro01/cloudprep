import type { QuizQuestion } from "../questions";

/** Practice Set 13 — questions 825–845 (streaming, analytics, databases, migration). Original questions. */
export const set13Part3: QuizQuestion[] = [
  {
    id: 825,
    category: "Analytics",
    question:
      "A Firehose delivery stream lands clickstream JSON in S3, but analysts need it partitioned by year/month/day and by campaign_id automatically, without a custom transformation writer. Which Firehose feature creates these partitions?",
    options: [
      "Dynamic partitioning, extracting partition keys from the data via JMESPath or metadata",
      "S3 lifecycle rules per campaign",
      "Athena partition projection only",
      "Firehose static error prefixes",
    ],
    correctAnswers: [0],
    explanation:
      "Dynamic partitioning parses records (JMESPath expressions or metadata) and delivers them to per-key S3 prefixes automatically. Lifecycles manage aging, projection maps existing layouts for queries, and error prefixes hold failures.",
  },
  {
    id: 826,
    category: "Analytics",
    question:
      "A Firehose stream must balance S3 request costs against delivery latency: many small files are costly, long waits delay analytics. Which Firehose settings tune this trade-off?",
    options: [
      "The buffer size and buffer interval hints, flushing when either is reached",
      "The data transformation Lambda's memory size",
      "The KMS key rotation period",
      "The destination compression codec alone",
    ],
    correctAnswers: [0],
    explanation:
      "Buffering hints control how much data (MB) or time (seconds) accumulates before delivery, directly setting the file-size/latency balance. Transform memory, key rotation, and compression don't control buffering.",
  },
  {
    id: 827,
    category: "Analytics",
    question:
      "A custom Kinesis consumer fleet of four EC2 workers must divide stream shards among themselves automatically, rebalancing when workers join or leave. Which library provides this coordination?",
    options: [
      "The Kinesis Client Library (KCL), checkpointing and balancing shards across workers",
      "Enhanced fan-out with manual shard assignment",
      "SQS distributing shard metadata",
      "The Firehose agent on each worker",
    ],
    correctAnswers: [0],
    explanation:
      "KCL coordinates workers: shards are leased and balanced across the fleet with checkpointing in DynamoDB. Fan-out delivers data to consumers but doesn't balance, and the other options aren't shard coordinators.",
  },
  {
    id: 828,
    category: "Analytics",
    question:
      "An MSK cluster must deliver records to external systems (S3, OpenSearch, HTTP endpoints) without writing custom consumer services. Which MSK capability provides managed connectors?",
    options: [
      "MSK Connect, running Kafka Connect connectors fully managed",
      "Kinesis Data Firehose attached to the Kafka cluster",
      "Lambda polling broker logs",
      "MSK Replicator to other systems",
    ],
    correctAnswers: [0],
    explanation:
      "MSK Connect runs Kafka Connect workers and connectors managed for you, streaming topics to standard destinations. Firehose serves Kinesis, Lambda polling is custom, and the Replicator mirrors between Kafka clusters.",
  },
  {
    id: 829,
    category: "Analytics",
    question:
      "A Kafka workload has highly variable throughput — near idle overnight, spiking to hundreds of MB/s — and the team refuses broker capacity planning. Which MSK option fits?",
    options: [
      "MSK Serverless, scaling capacity automatically per cluster",
      "Provisioned MSK with the largest broker type",
      "Self-managed Kafka on Spot instances",
      "Kinesis Data Streams as a broker replacement without code changes",
    ],
    correctAnswers: [0],
    explanation:
      "MSK Serverless scales cluster capacity automatically with per-GB pricing, eliminating broker planning. Fixed provisioned and self-managed brokers require sizing, and switching to Kinesis changes APIs.",
  },
  {
    id: 830,
    category: "Analytics",
    question:
      "Analysts want SQL queries joining S3 data lake tables with live data in an RDS MySQL database and a DynamoDB table, without moving data. Which Athena capability queries external data sources?",
    options: [
      "Athena federated queries using connectors for data sources",
      "COPY commands importing the databases into S3 nightly",
      "Redshift federated views only",
      "Glue crawlers copying rows into the catalog",
    ],
    correctAnswers: [0],
    explanation:
      "Federated queries run through Lambda-based connectors to RDS, DynamoDB, and other sources, joining with S3 data in place. Import pipelines move data, and crawlers catalog schemas without querying live sources.",
  },
  {
    id: 831,
    category: "Analytics",
    question:
      "A nightly Glue job reprocesses the entire source dataset every run, wasting hours. Which Glue feature makes jobs process only new data since the last run?",
    options: [
      "Job bookmarks tracking processed data",
      "Increasing DPU allocation",
      "Partition projection in the catalog",
      "A workflow trigger with a predicate",
    ],
    correctAnswers: [0],
    explanation:
      "Bookmarks persist state about processed data so subsequent runs skip it. More DPUs speed processing of everything, projections map partitions, and triggers schedule work without deduplication.",
  },
  {
    id: 832,
    category: "Analytics",
    question:
      "A data governance team wants a business catalog where stewards publish curated data products, analysts search by business terms, and access requests flow with context. Which service provides the data marketplace/catalog experience?",
    options: [
      "Amazon DataZone",
      "AWS Glue Data Catalog",
      "QuickSight asset bundles",
      "S3 Inventory manifests",
    ],
    correctAnswers: [0],
    explanation:
      "DataZone provides the business-level catalog: publish data products, search by business context, and manage access workflows. The Glue catalog is technical metadata, QuickSight serves dashboards, and inventory lists objects.",
  },
  {
    id: 833,
    category: "Database",
    question:
      "Redshift dashboards suffer because long analytical queries block short interactive ones. Which Redshift capability prioritizes short queries automatically?",
    options: [
      "Short Query Acceleration (SQA) with automatic WLM",
      "Increasing the cluster node count permanently",
      "Concurrency scaling only for writes",
      "Disabling result caching to force fresh execution",
    ],
    correctAnswers: [0],
    explanation:
      "SQA runs short queries ahead of queued long ones using forecasted runtimes, protecting dashboards. Permanent resizing pays for peaks always, concurrency scaling adds clusters rather than prioritizing, and result caching helps repeat queries.",
  },
  {
    id: 834,
    category: "Database",
    question:
      "An analytics workload runs a few hours daily with wildly variable demand; the team wants no cluster management and per-second billing for data warehousing capacity. Which Redshift option fits?",
    options: [
      "Amazon Redshift Serverless",
      "A reserved DC2 cluster sized for peaks",
      "Redshift Spectrum without a cluster",
      "Aurora Serverless v2",
    ],
    correctAnswers: [0],
    explanation:
      "Redshift Serverless scales warehouse capacity automatically, billing by RPU-hours consumed. Peak-sized reserved clusters pay around the clock, Spectrum queries S3 but still needs a provisioned cluster, and Aurora is operational OLTP.",
  },
  {
    id: 835,
    category: "Analytics",
    question:
      "An OpenSearch domain must (1) run inside a VPC with no public endpoints and (2) enforce per-index user permissions beyond the domain-level access policy. Which combination provides both?",
    options: [
      "VPC deployment plus fine-grained access control with internal user database or IAM/IAM+Cognito",
      "A public domain with IP-based domain policy only",
      "VPC deployment with resource-based policies alone",
      "UltraWarm storage with IAM roles",
    ],
    correctAnswers: [0],
    explanation:
      "VPC deployment removes public reachability, and fine-grained access control adds per-index/per-user authorization within the domain. IP policies on public domains don't meet the VPC requirement, and storage tiers don't grant permissions.",
  },
  {
    id: 836,
    category: "Analytics",
    question:
      "A SaaS company embeds analytics dashboards into its product so each customer sees only their own data, without QuickSight accounts for end viewers. Which QuickSight capabilities provide embedded, row-secured dashboards?",
    options: [
      "Dashboard embedding with row-level security (RLS) rules per customer identity",
      "Sharing dashboards publicly by URL",
      "One QuickSight namespace per customer with full accounts",
      "Exporting dashboards to PDF filtered per customer",
    ],
    correctAnswers: [0],
    explanation:
      "Embedded dashboards authenticate application users (anonymous or IdentityPool-based) and apply RLS rules so each viewer's data is scoped. Public URLs and per-customer accounts don't scale or secure, and PDF exports aren't interactive embedding.",
  },
  {
    id: 837,
    category: "Database",
    question:
      "A graph database cluster must be initially loaded with 500 GB of graph data currently stored as CSV files in S3. Which Neptune feature loads this efficiently?",
    options: [
      "The Neptune bulk loader, ingesting CSV/SparkQL-compatible graph formats from S3 in parallel",
      "Inserting vertices one by one through Gremlin",
      "Aurora S3 import repurposed for Neptune",
      "DMS with a Neptune target endpoint",
    ],
    correctAnswers: [0],
    explanation:
      "Neptune's bulk loader parallel-loads graph formats (CSV with Gremlin/openCypher/RDF) from S3, the designed path for initial loads. Per-record inserts are orders slower, Aurora imports are relational, and DMS doesn't target Neptune.",
  },
  {
    id: 838,
    category: "Database",
    question:
      "A Timestream platform must roll up raw sensor records into hourly aggregates continuously without running external ETL. Which Timestream feature computes these rollups?",
    options: [
      "Timestream scheduled queries",
      "DynamoDB Streams aggregation",
      "Athena CTAS nightly",
      "Kinesis Data Analytics attached to the table",
    ],
    correctAnswers: [0],
    explanation:
      "Scheduled queries run continuous multi-step SQL (rollups, interpolations) inside Timestream, writing results to destination tables. The alternatives are external pipelines requiring separate orchestration.",
  },
  {
    id: 839,
    category: "Database",
    question:
      "A DynamoDB workload has spiky, unpredictable reads with heavy repetition of hot items. Which combination absorbs spikes while cutting repeated-read cost and latency?",
    options: [
      "On-demand capacity mode plus DAX caching hot reads",
      "Provisioned mode with static high capacity plus CloudFront",
      "On-demand mode with a global secondary index on every attribute",
      "Provisioned mode with DAX and lower table RCUs? capacity is independent",
    ],
    correctAnswers: [0],
    explanation:
      "On-demand absorbs unpredictable spikes in billing terms, and DAX serves repeated hot reads from memory cheaper and faster. Static capacity wastes or throttles, GSIs don't cache, and the final option pairs mismatched settings.",
  },
  {
    id: 840,
    category: "Migration & Transfer",
    question:
      "Before a large database migration project, the team wants discovery of database fleets and their schemas from on-premises environments, feeding DMS planning. Which DMS-family tool automates this inventory?",
    options: [
      "DMS Fleet Advisor",
      "AWS Schema Conversion Tool assessments only",
      "AWS Application Discovery Service for files",
      "DMS table statistics",
    ],
    correctAnswers: [0],
    explanation:
      "Fleet Advisor inventories on-premises databases and schemas, feeding migration planning into DMS. SCT assesses conversion of known databases, ADS covers server-level discovery, and task statistics report running migrations.",
  },
  {
    id: 841,
    category: "Migration & Transfer",
    question:
      "After MGN launches recovered servers, operations wants automated post-boot configuration — network settings, hostname, licensing activation — applied consistently. Which MGN capability runs these steps?",
    options: [
      "MGN post-launch actions executed on launched instances",
      "EC2 user data added manually per instance",
      "SSM Run Command scheduled hourly",
      "CloudFormation cfn-init scripts",
    ],
    correctAnswers: [0],
    explanation:
      "Post-launch actions apply repeatable configuration (licensing, hostname, network) automatically to launched recovery servers. Manual user data, scheduled commands, and cfn-init are hand-built outside MGN's launch flow.",
  },
  {
    id: 842,
    category: "Migration & Transfer",
    question:
      "A DataSync task must transfer tens of millions of small files, exceeding the classic task model's throughput. Which DataSync capability handles very large transfers?",
    options: [
      "Enhanced mode tasks, designed for millions of files and higher throughput",
      "Basic tasks with increased bandwidth throttling",
      "Multiple agents reading the same files redundantly",
      "Snowball Edge for every batch of small files",
    ],
    correctAnswers: [0],
    explanation:
      "Enhanced mode tasks scale to millions of files with higher performance than the basic model. Bandwidth throttling caps speed, redundant agents duplicate work, and physical devices are unnecessary when the network can carry the data.",
  },
  {
    id: 843,
    category: "Migration & Transfer",
    question:
      "A business team (not IT) needs a simple web portal for exchanging files with partners over SFTP or browser upload, with admins managing users and folders without writing code. Which service provides this managed file portal?",
    options: [
      "AWS Transfer Family web apps",
      "A custom S3 console with IAM users",
      "WorkDocs? no — a CodePipeline-built portal",
      "Storage Gateway File Gateway console",
    ],
    correctAnswers: [0],
    explanation:
      "Transfer Family web apps provide a managed browser/SFTP file portal over S3 with user and folder administration. Raw consoles require IAM plumbing, custom portals are code to own, and File Gateway is a protocol appliance without a partner-facing portal.",
  },
  {
    id: 844,
    category: "Security",
    question:
      "A deployment pipeline must cryptographically sign Lambda deployment packages so runtime tampering is detectable. Which AWS service provides managed code signing for Lambda artifacts?",
    options: [
      "AWS Signer with signing profiles for Lambda",
      "KMS asymmetric keys applied manually to zips",
      "CodeArtifact package integrity checks",
      "S3 Object Lock on deployment buckets",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Signer provides managed code signing (including Lambda signing profiles and config validation on deploy). Hand-applied KMS signatures, artifact checks, and storage locks don't integrate the signing into the Lambda runtime verification chain.",
  },
  {
    id: 845,
    category: "Networking & Content Delivery",
    question:
      "Which two infrastructure options serve ultra-low-latency compute at the network edge? (Select TWO.)",
    options: [
      "AWS Wavelength Zones (carrier 5G networks)",
      "AWS Local Zones (metro locations)",
      "AWS Outposts racks in a corporate data center",
      "Snowball Edge devices in transit",
      "The parent Region's second Availability Zone",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Wavelength embeds compute in carrier 5G networks and Local Zones place compute in metro areas — both are edge locations. Outposts is on-premises, Snowball is transfer hardware, and a Regional AZ isn't edge.",
  },
];
