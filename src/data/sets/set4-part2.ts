import type { QuizQuestion } from "../questions";

/** Practice Set 4 — questions 218–239 (containers and application integration). Original questions. */
export const set4Part2: QuizQuestion[] = [
  {
    id: 218,
    category: "Compute",
    question:
      "An ECS cluster must run critical production tasks on Fargate, burst to Fargate Spot when capacity allows, and run licensed workloads on customer-managed EC2. How should the cluster place tasks?",
    options: [
      "One launch type per cluster, so create three clusters",
      "A capacity provider strategy per service, ordering Fargate, Fargate Spot, and the EC2 provider with weights",
      "Manual placement using the console for each task",
      "A single Auto Scaling group that runs all task types",
    ],
    correctAnswers: [1],
    explanation:
      "Capacity provider strategies let each service express its preferred mix (base and weight) across Fargate, Fargate Spot, and EC2 providers within one cluster. Per-launch-type clusters and manual placement discard the scheduling flexibility that providers exist to provide.",
  },
  {
    id: 219,
    category: "Compute",
    question:
      "A security policy requires container images to be scanned for known CVEs automatically when they are pushed to the registry, with findings surfaced before deployment. Which capability provides this?",
    options: [
      "Amazon ECR image scanning on push",
      "AWS Inspector scanning the build server only",
      "CloudTrail data events on the repository",
      "A Lambda function hashing every layer",
    ],
    correctAnswers: [0],
    explanation:
      "ECR integrates scanning (basic or enhanced via Inspector) to detect vulnerabilities in pushed images and exposes findings in the repository and EventBridge. Scanning only the build machine misses the registry artifact, CloudTrail logs API calls, and hashing detects tampering rather than CVEs.",
  },
  {
    id: 220,
    category: "Compute",
    question:
      "An EKS cluster's worker nodes should be provisioned and patched by AWS while the platform team retains full control over pod scheduling and node configuration. Which node option fits?",
    options: [
      "Self-managed EC2 nodes with custom AMIs only",
      "EKS managed node groups",
      "EKS with Fargate profiles for every workload",
      "Manual EC2 registration through the API",
    ],
    correctAnswers: [1],
    explanation:
      "Managed node groups let EKS provision, scale, patch, and drain EC2 worker nodes while customers control node groups, labels, and workloads. Self-managed nodes push OS care onto the team, and Fargate profiles abstract nodes away entirely, which contradicts the control requirement.",
  },
  {
    id: 221,
    category: "Compute",
    question:
      "Twelve Lambda functions share the same 40 MB of common utility libraries, and each deployment today uploads all of them. Which Lambda feature reduces package duplication and deployment size?",
    options: [
      "Lambda aliases",
      "Lambda layers holding the shared dependencies",
      "Provisioned concurrency",
      "Function URL endpoints",
    ],
    correctAnswers: [1],
    explanation:
      "Layers package shared dependencies once and are referenced by many functions, shrinking deployment artifacts and centralizing updates. Aliases point to versions, provisioned concurrency affects cold starts, and URLs are an invocation mechanism.",
  },
  {
    id: 222,
    category: "Compute",
    question:
      "A machine learning inference function needs a 2 GB custom runtime with large bundled libraries, exceeding the standard ZIP deployment package limit. What is the appropriate Lambda packaging approach?",
    options: [
      "Split the libraries across multiple layers and exceed the limit anyway",
      "Deploy the function as a container image up to 10 GB",
      "Compress the libraries with a stronger algorithm to fit",
      "Store the libraries in S3 and mount them at runtime",
    ],
    correctAnswers: [1],
    explanation:
      "Lambda supports container images up to 10 GB for functions needing large runtimes and dependencies. Layers and ZIP archives share the unzipped size constraint, and Lambda has no S3 mount facility.",
  },
  {
    id: 223,
    category: "Application Integration",
    question:
      "A public API on API Gateway fronts a small backend that collapses under bursts. Operations wants per-client request ceilings with API keys so heavy consumers cannot starve others. Which API Gateway feature set provides this?",
    options: [
      "Usage plans with throttling and quota limits tied to API keys",
      "Stage variables pointing at different backends",
      "A resource policy denying anonymous callers",
      "Request validation against a JSON schema",
    ],
    correctAnswers: [0],
    explanation:
      "Usage plans bind API keys to per-client rate (throttling) and burst limits plus quotas, isolating noisy consumers. Stage variables switch backends, resource policies govern who may call at all, and validation checks payloads, not rates.",
  },
  {
    id: 224,
    category: "Application Integration",
    question:
      "A GET endpoint behind API Gateway returns catalog data that changes hourly, yet every request hits the backend database. Which API Gateway feature absorbs this read load?",
    options: [
      "Stage-level API caching with a TTL matching the data freshness",
      "A usage plan with a low daily quota",
      "Gateway responses with custom headers",
      "Private integration to an NLB",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway caching stores endpoint responses at the stage for a configurable TTL, serving repeat requests without touching the backend. Quotas ration callers, custom responses alter error payloads, and private integration changes the backend connection, not caching.",
  },
  {
    id: 225,
    category: "Application Integration",
    question:
      "A mobile team wants a single GraphQL endpoint that federates several data sources, with real-time subscriptions pushed to devices over WebSockets, fully managed. Which service provides this?",
    options: [
      "Amazon API Gateway REST APIs",
      "AWS AppSync",
      "Amazon EventBridge",
      "AWS Step Functions",
    ],
    correctAnswers: [1],
    explanation:
      "AppSync is a managed GraphQL service with built-in subscriptions over WebSockets and resolvers to DynamoDB, Lambda, RDS, and HTTP sources. REST APIs have no GraphQL or subscription model, and the other two services orchestrate or route events rather than serving typed APIs.",
  },
  {
    id: 226,
    category: "Application Integration",
    question:
      "A chat application needs a persistent bidirectional channel between browser clients and backend logic. Which API Gateway API type fits natively?",
    options: [
      "A REST API with polling resources",
      "A WebSocket API with Lambda integration for connect, send, and disconnect routes",
      "An HTTP API with long-polling endpoints",
      "A private REST API over VPC links",
    ],
    correctAnswers: [1],
    explanation:
      "API Gateway WebSocket APIs maintain stateful bidirectional connections and invoke backend routes on connect, message, and disconnect events. REST and HTTP APIs are request/response, and private APIs concern network reachability rather than connection style.",
  },
  {
    id: 227,
    category: "Application Integration",
    question:
      "A company runs two Step Functions workload classes: high-volume, short-lived event processing (up to 100,000 executions per second, under 5 minutes each, cost-sensitive) and low-volume, auditable order workflows running for hours. How should each be deployed?",
    options: [
      "Both on Standard Workflows for consistency",
      "Express Workflow for the high-volume class, Standard Workflow for the auditable long-running class",
      "Both on Express Workflows to minimize cost",
      "Express for long-running work because it supports unlimited duration",
    ],
    correctAnswers: [1],
    explanation:
      "Express Workflows are built for very high event rates, sub-five-minute durations, and lower cost; Standard Workflows run up to a year with full execution history and are the audit-grade choice. The mixed assignments get both the cost profile and the duration/history requirements wrong.",
  },
  {
    id: 228,
    category: "Application Integration",
    question:
      "Messages produced for a promotional campaign must sit unprocessed for 10 minutes after being queued, then become available to consumers together. Which SQS feature implements the hold?",
    options: [
      "Visibility timeout set to 10 minutes",
      "A delay queue on the queue set to 600 seconds",
      "A dead-letter queue with a wait period",
      "Message timers cannot exceed 60 seconds, so this is impossible",
    ],
    correctAnswers: [1],
    explanation:
      "A queue-level delay (up to 15 minutes) postpones delivery of every message added to the queue, matching the campaign hold. Visibility timeout applies after a consumer receives a message, DLQs hold failed messages, and per-message timers do go up to 15 minutes — the queue-level delay is the right mechanism here.",
  },
  {
    id: 229,
    category: "Application Integration",
    question:
      "One SNS topic publishes order events carrying an orderType attribute. Email subscribers want only returns; SQS subscribers want only cancellations; an audit Lambda wants everything. What should be configured?",
    options: [
      "Three separate topics and three publish paths in the producer",
      "SNS subscription filter policies per subscriber matching message attributes",
      "Consumers filtering messages after receiving them",
      "Fan-out with Lambda forwarding to the right consumer",
    ],
    correctAnswers: [1],
    explanation:
      "Subscription filter policies let each subscriber declare which attribute values it wants, so one publish fans out selectively with no producer changes. Multiple topics duplicate publisher logic, client-side filtering still delivers every message, and a custom forwarder is unnecessary infrastructure.",
  },
  {
    id: 230,
    category: "Application Integration",
    question:
      "A company consumes events from several third-party SaaS partners (Stripe-like sources) and internal services on one bus, wants schema discovery and validation of event payloads, and rule-based routing to targets. Which service fits?",
    options: [
      "Amazon SNS with protocol fan-out",
      "Amazon EventBridge with partner event sources and a schema registry",
      "AWS Step Functions with polling tasks",
      "Amazon MQ with topics",
    ],
    correctAnswers: [1],
    explanation:
      "EventBridge ingests partner SaaS event streams through partner event sources, routes by rules across sources, and provides a schema registry for payload validation and code bindings. SNS does simple fan-out without schema tooling, Step Functions orchestrates rather than ingests, and MQ targets protocol compatibility (JMS/MQTT).",
  },
  {
    id: 231,
    category: "Analytics",
    question:
      "Five independent analytics applications consume the same Kinesis stream, each needing dedicated read throughput of 2 MB/s per shard without competing with the others. Which Kinesis feature provides each consumer its own pipe?",
    options: [
      "Increasing the number of shards for all consumers",
      "Enhanced fan-out with registered consumers",
      "Kinesis Data Firehose delivery to five S3 buckets",
      "Reducing the record size below 1 KB",
    ],
    correctAnswers: [1],
    explanation:
      "Enhanced fan-out gives every registered consumer a dedicated pipeline reading at up to 2 MB/s per shard per consumer, with ~70 ms latency, instead of sharing the shard's default 2 MB/s pool. More shards raise capacity for everyone but still share it, Firehose delivers to destinations rather than serving five applications, and record size does not create dedicated throughput.",
  },
  {
    id: 232,
    category: "Analytics",
    question:
      "A team must compute rolling five-minute aggregates and anomaly scores over a Kinesis stream continuously in near real time, using managed stream processing rather than custom consumers. Which service fits?",
    options: [
      "Amazon Kinesis Data Analytics (Managed Service for Apache Flink)",
      "Amazon Athena querying the stream's S3 archive",
      "AWS Glue crawlers",
      "Amazon QuickSight",
    ],
    correctAnswers: [0],
    explanation:
      "Kinesis Data Analytics runs Flink/SQL stream processing over Kinesis input for real-time windows and analytics. Athena batch-queries stored data, Glue crawls catalogs, and QuickSight visualizes results rather than computing on streams.",
  },
  {
    id: 233,
    category: "Application Integration",
    question:
      "An integration must consume messages from a DynamoDB Streams change feed, enrich each record by calling three APIs, and deliver the result to an HTTP endpoint — as a managed point-to-point pipeline rather than custom consumer code. Which service fits?",
    options: [
      "Amazon EventBridge Pipes with enrichment steps",
      "Amazon SNS with filter policies",
      "AWS Glue with a JDBC connection",
      "SQS FIFO with consumer-side enrichment",
    ],
    correctAnswers: [0],
    explanation:
      "EventBridge Pipes connects a source (including DynamoDB Streams) to a target with an optional enrichment stage (Lambda, Step Functions, API destinations) in between, a managed point-to-point pattern. SNS fan-out is broadcast, Glue is batch ETL, and SQS still requires you to run the consumer.",
  },
  {
    id: 234,
    category: "Application Integration",
    question:
      "Which two targets can S3 event notifications invoke or deliver to directly? (Select TWO.)",
    options: [
      "An SQS queue",
      "An EventBridge rule (via EventBridge notification configuration)",
      "An EC2 instance over SSH",
      "An Aurora table write",
      "A Redshift cluster ingest",
    ],
    correctAnswers: [0, 1],
    explanation:
      "S3 event notifications deliver directly to Lambda, SNS, SQS, and (via the EventBridge integration) to EventBridge, which then routes anywhere. Instances, databases, and warehouses are not direct notification targets.",
  },
  {
    id: 235,
    category: "Compute",
    question:
      "An ECS service deployment must shift 100% of traffic from old tasks to new tasks only after new tasks pass tests on a separate port, with instant rollback capability. Which deployment strategy fits?",
    options: [
      "Rolling update with minimum healthy percent 100",
      "Blue/green deployment via CodeDeploy with a test listener and traffic re-route",
      "Recreate the service, deleting old tasks immediately",
      "External canary with a custom ALB and Lambda redeployer",
    ],
    correctAnswers: [1],
    explanation:
      "CodeDeploy blue/green for ECS stands up replacement tasks, offers an optional test traffic listener, reroutes the production listener when approved, and rolls back instantly by rerouting back. Rolling updates intermix versions in place, recreation is destructive, and a bespoke canary reimplements built-in functionality.",
  },
  {
    id: 236,
    category: "Compute",
    question:
      "A Lambda function is published as version 2 while alias PROD currently sends all traffic to version 1. Operations wants 10% of traffic to trial version 2 automatically, increasing later. What should be done?",
    options: [
      "Overwrite the PROD alias to point at version 2 and roll back manually if issues appear",
      "Configure weighted alias routing on PROD between versions 1 and 2",
      "Publish version 2 only in a second Region and split DNS",
      "Use provisioned concurrency on both versions equally",
    ],
    correctAnswers: [1],
    explanation:
      "Lambda aliases support weighted routing between two published versions, the native canary mechanism with a single stable ARN for callers. Overwriting the alias is all-or-nothing, Regions do not split traffic percentages, and provisioned concurrency is a performance control.",
  },
  {
    id: 237,
    category: "Database",
    question:
      "A self-managed Redis on EC2 must survive process crashes and reboots with minimal data loss, writing every mutation to disk as it happens. Which persistence configuration matches this?",
    options: [
      "RDB snapshots every hour",
      "Append-only file (AOF) persistence with every-second or every-write fsync",
      "No persistence, relying on replicas only",
      "Memory-only with nightly EBS snapshots",
    ],
    correctAnswers: [1],
    explanation:
      "AOF logs each write operation and replays it on restart, minimizing loss versus RDB's periodic snapshots. Hourly snapshots lose up to an hour, replica-only solutions lose data if the primary fails before replicating, and nightly snapshots are worse still.",
  },
  {
    id: 238,
    category: "Application Integration",
    question:
      "Rapid successive writes to the same S3 object generate multiple event notifications that consumers process out of order, corrupting state. Events flow through a queue the team controls. Which fix restores per-object ordering?",
    options: [
      "Switch consumers to a FIFO queue using the object key as the MessageGroupId",
      "Process notifications faster so ordering is never violated",
      "Disable S3 versioning on the bucket",
      "Increase the queue's polling interval to space events out",
    ],
    correctAnswers: [0],
    explanation:
      "S3 event ordering is not guaranteed; routing events into an SQS FIFO queue with the object key as message group preserves per-key processing order. Speed does not create ordering guarantees, versioning is unrelated to event order, and polling intervals cannot restore ordering.",
  },
  {
    id: 239,
    category: "Management & Governance",
    question:
      "A central operations team must observe CloudWatch alarms across 40 member accounts from a single account, with cross-account dashboards and alarm views, without granting broad console login to members. Which CloudWatch capability provides this?",
    options: [
      "CloudWatch cross-account observability with OAM monitoring accounts",
      "Emailing alarm notifications to a shared distribution list",
      "Exporting each account's metrics to S3 and querying with Athena",
      "Cross-region replication of alarms through EventBridge",
    ],
    correctAnswers: [0],
    explanation:
      "CloudWatch cross-account observability (built on CloudWatch OAM sinks and links) lets a monitoring account view metrics, logs, traces, and alarms of linked accounts centrally with scoped permissions. Email lists and S3 exports are fragmented and manual, and alarms are not replicated across accounts.",
  },
];
