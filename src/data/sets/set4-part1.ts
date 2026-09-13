import type { QuizQuestion } from "../questions";

/** Practice Set 4 — questions 196–217 (database services focus). Original questions. */
export const set4Part1: QuizQuestion[] = [
  {
    id: 196,
    category: "Database",
    question:
      "Under the AWS shared responsibility model for Amazon RDS, which activity remains the customer's responsibility?",
    options: [
      "Installing security patches for the database engine",
      "Managing the underlying host operating system",
      "Optimizing database schemas and queries for the workload",
      "Replacing failed underlying storage hardware",
    ],
    correctAnswers: [2],
    explanation:
      "AWS manages the infrastructure layers for RDS, including the OS, engine patching, and hardware replacement, while customers own what runs inside the database: schema design, query performance, and user data. The other options are all AWS-managed for RDS.",
  },
  {
    id: 197,
    category: "Database",
    question:
      "The on-call engineer must be notified immediately by email whenever an RDS instance fails over or restarts, without polling the console. Which mechanism delivers these operational events?",
    options: [
      "An RDS event subscription forwarding the event categories to an SNS topic",
      "A CloudWatch alarm on the FreeableMemory metric",
      "A CloudTrail trail monitoring ModifyDBInstance calls",
      "AWS Health scheduled events emailed weekly",
    ],
    correctAnswers: [0],
    explanation:
      "RDS event subscriptions push operational events (failovers, restarts, configuration changes) to SNS, Lambda, or Queue targets as they occur. Memory alarms react to load, CloudTrail records control-plane calls without operational state, and AWS Health covers service-wide issues rather than instance failovers.",
  },
  {
    id: 198,
    category: "Database",
    question:
      "An Aurora cluster has several read replicas, and the team wants a specific replica to be the first promoted during a failover because it has the strongest hardware. Which setting controls this?",
    options: [
      "The replica's promotion tier, with tier 0 promoted first",
      "The replica's maintenance window ordering",
      "The cluster endpoint's reader priority",
      "The replica lag threshold in the parameter group",
    ],
    correctAnswers: [0],
    explanation:
      "Aurora replicas are assigned promotion tiers (0-15); on failover the replica in the lowest-numbered available tier is promoted, letting teams pin failover order by hardware capability. Maintenance windows, endpoints, and lag thresholds do not determine promotion order.",
  },
  {
    id: 199,
    category: "Database",
    question:
      "A heavy reporting workload must be isolated to two designated Aurora replicas so it never competes with the application's reader endpoint. As those replicas scale, the connection string must stay stable. Which endpoint should the report tooling use?",
    options: [
      "The cluster endpoint",
      "The reader endpoint",
      "A custom endpoint listing the two reporting replicas",
      "Each replica's instance endpoint in round-robin DNS",
    ],
    correctAnswers: [2],
    explanation:
      "Custom endpoints address a chosen static set of instances, isolating reporting traffic while staying stable as members are replaced within the set. The cluster endpoint is the writer, the reader endpoint includes all replicas, and raw instance endpoints move with failover and changes.",
  },
  {
    id: 200,
    category: "Database",
    question:
      "A DynamoDB table stores product records, and each record must now include a 4 MB product video. Storing the video as an attribute fails. What is the standard pattern?",
    options: [
      "Enable DynamoDB auto scaling so the limit increases",
      "Store the video in Amazon S3 and keep the S3 object key as an attribute in the table",
      "Compress the video with gzip until it fits under the limit",
      "Split the video across multiple attributes and reassemble on read",
    ],
    correctAnswers: [1],
    explanation:
      "DynamoDB items are capped at 400 KB, so the standard pattern keeps large binary payloads in S3 and stores the pointer (object key) in the item. Capacity settings do not alter the item size limit, compression cannot reach that ratio reliably, and manual splitting reconstructs a poor-man's object store.",
  },
  {
    id: 201,
    category: "Database",
    question:
      "A money-transfer operation must debit one DynamoDB item and credit another in a single all-or-nothing operation; a partial application would corrupt balances. Which DynamoDB capability provides this atomicity?",
    options: [
      "A BatchWriteItem call with both writes",
      "TransactWriteItems covering both items",
      "A conditional put on the debit followed by a put on the credit",
      "DynamoDB Streams replay of both changes",
    ],
    correctAnswers: [1],
    explanation:
      "TransactWriteItems commits a group of operations across items atomically — all succeed or all fail — which is required for debit/credit consistency. BatchWriteItem is not transactional (per-item results), and sequential conditional writes leave a window for partial failure.",
  },
  {
    id: 202,
    category: "Database",
    question:
      "Data analysts run complex ad-hoc joins and aggregations across two petabytes of historical sales data a few times per day. Which AWS service is designed for this analytics workload?",
    options: [
      "Amazon RDS for PostgreSQL",
      "Amazon Redshift",
      "Amazon DynamoDB",
      "Amazon ElastiCache for Redis",
    ],
    correctAnswers: [1],
    explanation:
      "Redshift is a petabyte-scale columnar data warehouse optimized for complex analytical queries across massive datasets. Operational relational engines, NoSQL tables, and caches are not built for petabyte-scale analytical scans.",
  },
  {
    id: 203,
    category: "Database",
    question:
      "Most of a company's historical data sits as Parquet files in S3, and analysts want to run Redshift queries that reach into that S3 data without loading it into the cluster first. Which feature enables this?",
    options: [
      "Redshift Spectrum",
      "Redshift concurrency scaling",
      "A Redshift materialized view over local tables only",
      "COPY command with automated scheduling",
    ],
    correctAnswers: [0],
    explanation:
      "Spectrum extends Redshift queries directly to data in S3, computing at Redshift Spectrum nodes without loading the data into cluster storage. Concurrency scaling adds cluster capacity, materialized views over local tables don't reach S3, and COPY loads data physically into the cluster, which is what the requirement avoids.",
  },
  {
    id: 204,
    category: "Database",
    question:
      "A company's application uses MongoDB drivers and aggregations. Leadership wants a managed AWS database with MongoDB API compatibility and minimal code change. Which service should be chosen?",
    options: [
      "Amazon Aurora PostgreSQL",
      "Amazon DocumentDB",
      "Amazon Neptune",
      "Amazon Keyspaces",
    ],
    correctAnswers: [1],
    explanation:
      "DocumentDB is a managed document database purpose-built for MongoDB API compatibility. Aurora PostgreSQL is relational, Neptune is a graph database, and Keyspaces is Cassandra-compatible wide-column.",
  },
  {
    id: 205,
    category: "Database",
    question:
      "A social platform must traverse millions of relationships — friends, follows, recommendations — with queries several hops deep. Relational joins are too slow. Which purpose-built database fits?",
    options: [
      "Amazon Neptune",
      "Amazon Redshift",
      "Amazon Timestream",
      "Amazon RDS for MySQL",
    ],
    correctAnswers: [0],
    explanation:
      "Neptune is a managed graph database optimized for traversing highly connected data with query languages like Gremlin and openCypher. Columnar warehouses, time-series stores, and relational engines degrade badly on multi-hop relationship traversal.",
  },
  {
    id: 206,
    category: "Database",
    question:
      "A payments company must maintain an immutable, cryptographically verifiable history of every transaction, with the ability to prove records were not tampered with. Which database is purpose-built for this?",
    options: [
      "Amazon QLDB",
      "Amazon Aurora with DynamoDB Streams",
      "Amazon Keyspaces",
      "Amazon DocumentDB",
    ],
    correctAnswers: [0],
    explanation:
      "QLDB is a ledger database with an immutable, append-only journal and cryptographic digest verification, designed for auditable transaction history. General-purpose databases can log changes but do not provide built-in tamper-evident verification.",
  },
  {
    id: 207,
    category: "Database",
    question:
      "A company runs a self-managed Apache Cassandra cluster and wants to migrate to a managed serverless wide-column store using the same CQL queries. Which service should be used?",
    options: [
      "Amazon DynamoDB",
      "Amazon Keyspaces",
      "Amazon DocumentDB",
      "Amazon MemoryDB",
    ],
    correctAnswers: [1],
    explanation:
      "Keyspaces is a serverless wide-column database compatible with Apache Cassandra query language, so CQL clients migrate with minimal change. DynamoDB uses its own API, DocumentDB is MongoDB-compatible, and MemoryDB is Redis-compatible.",
  },
  {
    id: 208,
    category: "Database",
    question:
      "An IoT fleet writes billions of small timestamped sensor readings per day, and queries always filter by device and time range. A general-purpose database is becoming expensive and slow. Which purpose-built store fits?",
    options: [
      "Amazon Timestream",
      "Amazon Aurora",
      "Amazon Redshift",
      "Amazon QLDB",
    ],
    correctAnswers: [0],
    explanation:
      "Timestream is a serverless time-series database with automatic partitioning, retention policies, and analytics functions tuned for high-volume timestamped data. General engines require heavy partitioning work and cost more at this volume.",
  },
  {
    id: 209,
    category: "Database",
    question:
      "A leaderboard service needs Redis data structures and microsecond latency, but the data must be durable as the system of record — losing it on failure is unacceptable. Which service fits?",
    options: [
      "ElastiCache for Redis in cluster mode",
      "Amazon MemoryDB for Redis",
      "DynamoDB with DAX",
      "An EBS-backed EC2 running Redis",
    ],
    correctAnswers: [1],
    explanation:
      "MemoryDB is Redis-compatible and durable, persisting data across multiple AZs as a primary database rather than a cache. ElastiCache is a cache whose loss must be tolerable, DAX sits in front of DynamoDB, and self-managing Redis on EBS reintroduces operational burden with weaker guarantees.",
  },
  {
    id: 210,
    category: "Migration & Transfer",
    question:
      "A production Oracle database must move to Aurora PostgreSQL with downtime limited to minutes. Ongoing changes must keep flowing to the target until cutover. Which service handles the migration with continuous replication?",
    options: [
      "AWS Schema Conversion Tool alone",
      "AWS Database Migration Service (DMS)",
      "AWS DataSync",
      "A full export/import during a maintenance window",
    ],
    correctAnswers: [1],
    explanation:
      "DMS performs the data movement with ongoing change data capture, keeping the target synchronized until the short cutover window. SCT converts schema and code (a complementary step for heterogeneous engines) but does not move data continuously, DataSync is file-based, and export/import exceeds the downtime budget.",
  },
  {
    id: 211,
    category: "Migration & Transfer",
    question:
      "During a migration from Oracle to PostgreSQL, dozens of stored procedures and PL/SQL packages must be converted to the target syntax. Which tool automates this conversion assessment and rewrite?",
    options: [
      "AWS Schema Conversion Tool",
      "AWS Database Migration Service",
      "Amazon RDS Performance Insights",
      "AWS Application Discovery Service",
    ],
    correctAnswers: [0],
    explanation:
      "SCT converts schemas, stored procedures, and application SQL between heterogeneous engines, flagging items needing manual work. DMS moves data after the schema exists, Performance Insights is operational tuning, and Application Discovery inventories on-premises estates.",
  },
  {
    id: 212,
    category: "Database",
    question:
      "A company in Europe reads an RDS for MySQL database in us-east-1 heavily and wants a local read copy in eu-west-1 that stays current, accepting slight lag. Which RDS capability supports this?",
    options: [
      "RDS Multi-AZ with a standby in eu-west-1",
      "A cross-Region read replica in eu-west-1",
      "RDS Proxy in both Regions",
      "Aurora global database over the RDS instance",
    ],
    correctAnswers: [1],
    explanation:
      "RDS for MySQL supports cross-Region read replicas, giving eu-west-1 readers a locally replicated copy with asynchronous lag. Multi-AZ standbys stay within a Region, RDS Proxy pools connections within a Region, and Aurora global databases apply to Aurora clusters, not RDS MySQL instances.",
  },
  {
    id: 213,
    category: "Database",
    question:
      "A Redis workload in ElastiCache must replicate to a second Region for disaster recovery, promoting the remote cluster if the primary Region fails. Which feature provides this?",
    options: [
      "ElastiCache Global Datastore",
      "Redis cluster mode with additional shards",
      "Nightly snapshots copied cross-Region",
      "A read replica in the same Region",
    ],
    correctAnswers: [0],
    explanation:
      "Global Datastore cross-Region replicates Redis clusters and supports fast promotion of the remote cluster during regional failover. Shards scale within a Region, snapshot copies have hours of RPO and slow recovery, and same-Region replicas do nothing for regional disasters.",
  },
  {
    id: 214,
    category: "Database",
    question:
      "A booking system must prevent two users from reserving the same slot; a DynamoDB write should only succeed when no item for that slot exists yet. Which mechanism enforces this race-safely?",
    options: [
      "A ConditionExpression using attribute_not_exists on the primary key",
      "Read the slot first, then write if absent",
      "A global secondary index on slot timestamps",
      "Enable DynamoDB auto scaling for concurrent writes",
    ],
    correctAnswers: [0],
    explanation:
      "Conditional writes with attribute_not_exists make the insert succeed only once, resolving concurrent reservations atomically at the storage layer. Read-then-write has a race window, indexes change query paths, and capacity settings do not add uniqueness semantics.",
  },
  {
    id: 215,
    category: "Analytics",
    question:
      "Analysts need to run occasional SQL over compressed Parquet files in S3, paying only for the bytes scanned and managing no servers. Which service fits?",
    options: [
      "Amazon Athena",
      "Amazon Redshift",
      "AWS Glue ETL jobs",
      "Amazon EMR",
    ],
    correctAnswers: [0],
    explanation:
      "Athena is serverless SQL over S3 with per-TB-scanned pricing, ideal for ad-hoc queries over open-format files. Redshift charges for a provisioned cluster, Glue is for building ETL jobs, and EMR requires operating a cluster.",
  },
  {
    id: 216,
    category: "Analytics",
    question:
      "A support application needs fast full-text search across millions of product reviews, plus log analytics dashboards for the ops team. Which managed service fits both use cases?",
    options: [
      "Amazon OpenSearch Service",
      "Amazon Athena",
      "Amazon Neptune",
      "Amazon Timestream",
    ],
    correctAnswers: [0],
    explanation:
      "OpenSearch provides managed full-text search and Kibana-style analytics dashboards, covering both requirements. Athena is batch SQL over S3, Neptune is graph queries, Timestream is time-series.",
  },
  {
    id: 217,
    category: "Database",
    question:
      "Which two statements about Amazon RDS storage are correct? (Select TWO.)",
    options: [
      "Storage autoscaling can grow RDS storage automatically when free space runs low",
      "gp3 volumes allow IOPS and throughput to be provisioned independently of size",
      "Storage can be shrunk back down after autoscaling grows it",
      "All RDS engines force io1 storage exclusively",
      "Storage changes always require a multi-hour outage",
    ],
    correctAnswers: [0, 1],
    explanation:
      "RDS storage autoscaling grows storage automatically, and gp3 lets you tune IOPS and throughput separately from capacity. Storage cannot be shrunk, multiple volume types are supported per engine, and most storage modifications occur without a prolonged outage.",
  },
];
