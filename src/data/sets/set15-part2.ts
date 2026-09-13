import type { QuizQuestion } from "../questions";

/** Practice Set 15 — questions 933–954 (architecture selection gauntlet). Original questions. */
export const set15Part2: QuizQuestion[] = [
  {
    id: 933,
    category: "Analytics",
    question:
      "A team ingests 25 TB daily, transforms it, and runs unpredictable ad-hoc SQL a few times per day. They want minimal idle cost and no cluster to manage. Which analytics architecture fits?",
    options: [
      "Kinesis Data Firehose into S3 (Parquet, partitioned) cataloged in Glue, queried with Athena",
      "A 24/7 Redshift cluster sized for peak ingest",
      "EMR clusters left running for interactive notebooks only",
      "RDS for PostgreSQL with nightly batch imports",
    ],
    correctAnswers: [0],
    explanation:
      "The S3-data-lake-plus-Athena pattern pays only for stored bytes and scanned queries — ideal for ad-hoc analytics at this scale. Peak-sized warehouses and always-on clusters bill continuously, and relational imports don't fit 25 TB daily.",
  },
  {
    id: 934,
    category: "Database",
    question:
      "An Aurora cluster already runs the maximum 15 Aurora Replicas and read demand keeps growing. Which scaling paths apply beyond the replica limit? (Select TWO.)",
    options: [
      "Add additional reader clusters (for example via Aurora global database topology) and route reads to them",
      "Offload analytical reads to Redshift or another analytics store",
      "Convert replicas into writers to multiply capacity",
      "Increase the replica limit to 64 with a parameter change",
      "Enable multi-master writes on all replicas",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Beyond 15 replicas, additional clusters (global database reader clusters) or moving analytical reads to purpose-built analytics extend read capacity. Replicas cannot become independent writers, the limit is not tunable upward, and Aurora is single-writer (multi-master isn't an Aurora feature).",
  },
  {
    id: 935,
    category: "Database",
    question:
      "Nightly bulk loads of 100 GB of staged CSV data from S3 into Redshift must complete quickly before business hours. Which Redshift mechanism loads S3 data fastest?",
    options: [
      "The COPY command, parallel-loading S3 files across the cluster",
      "Row-by-row INSERT statements from a client",
      "Athena CTAS writing into Redshift directly",
      "Firehose streaming the CSVs record by record",
    ],
    correctAnswers: [0],
    explanation:
      "COPY parallelizes loads across slices and nodes from S3 — the designed bulk-load path. Row inserts are orders slower, Athena writes to S3 not Redshift, and streaming small records is inefficient for bulk loads.",
  },
  {
    id: 936,
    category: "Compute",
    question:
      "A stateful containerized application requires a shared POSIX directory across all its tasks for file persistence. How should the ECS service mount this?",
    options: [
      "An EFS file system defined as a volume in the task definition, mounted by every task",
      "An EBS volume attached to whichever task starts first",
      "Instance store volumes per container instance",
      "S3 mounted as a POSIX volume by the runtime",
    ],
    correctAnswers: [0],
    explanation:
      "EFS volumes declared in task definitions mount shared POSIX storage into every task across instances. EBS attaches single-instance, instance store is ephemeral, and S3 has no POSIX mount natively.",
  },
  {
    id: 937,
    category: "Compute",
    question:
      "Software licensed by MAC address must keep the same MAC across stop/start cycles and host moves within its dedicated environment. Which condition holds?",
    options: [
      "EBS-backed instances retain their ENI MAC across stop/start; Dedicated Hosts with affinity preserve hardware placement for stricter licensing",
      "MAC addresses change on every stop; licensing by MAC is impossible on EC2",
      "Only instance store instances keep stable MACs",
      "MAC stability requires a public elastic IP attachment",
    ],
    correctAnswers: [0],
    explanation:
      "The ENI (and its MAC) persists across stop/start for EBS-backed instances, and host affinity adds hardware-level stability for licensing that demands it. MACs don't rotate arbitrarily, instance store is the opposite of persistent, and EIPs address IP stability not MAC.",
  },
  {
    id: 938,
    category: "Analytics",
    question:
      "Five million messages per minute must be ingested with per-device ordering, transformed, and landed in both S3 (archive) and Redshift (analytics). Which pipeline fits?",
    options: [
      "Kinesis Data Streams for ordered ingestion, delivered via Firehose with Lambda transformation to S3 and Redshift",
      "SQS standard queues polled by a transformation fleet writing directly to both stores",
      "S3 uploads from devices with EventBridge copying to Redshift",
      "IoT Core rules writing directly to Redshift",
    ],
    correctAnswers: [0],
    explanation:
      "Streams order per key at scale; Firehose adds transformation and fans out to S3 and Redshift as managed destinations. Standard queues lose ordering, and the other pipelines bypass the ordering requirement or misuse targets.",
  },
  {
    id: 939,
    category: "Analytics",
    question:
      "Four hundred concurrent business users run dashboards over a 2 PB warehouse. Which trio keeps dashboards fast while controlling cost?",
    options: [
      "Redshift RA3 with concurrency scaling, QuickSight with SPICE datasets, and workload management prioritizing dashboards",
      "Athena per-dashboard-query with no limits",
      "A single r6i EC2 running PostgreSQL for everyone",
      "DynamoDB Scan-based dashboards",
    ],
    correctAnswers: [0],
    explanation:
      "RA3 plus concurrency scaling absorbs concurrent query bursts, SPICE caches dashboard data in memory, and WLM protects interactive queries from heavy jobs. Per-query Athena at dashboard latency for 400 users is costly and slow, and the other options aren't dashboard architectures.",
  },
  {
    id: 940,
    category: "Analytics",
    question:
      "Forty data domains share one Athena environment; per-team query cost visibility and hard scan caps are required. Which Athena construct delivers both?",
    options: [
      "Workgroups per team with scan limits, metrics, and cost tags",
      "One shared workgroup with polite requests",
      "Separate AWS accounts per query",
      "Partition projection across all datasets",
    ],
    correctAnswers: [0],
    explanation:
      "Workgroups isolate configuration, enforce per-query/per-workgroup scan caps, emit metrics, and carry cost tags — the unit of Athena governance. A shared workgroup can't attribute or cap per team, and the others don't provide multi-team governance.",
  },
  {
    id: 941,
    category: "Analytics",
    question:
      "A transformation job must run automatically whenever a new raw file lands in S3, skipping files already processed. Which pairing triggers and deduplicates this serverless ETL?",
    options: [
      "An S3 event (via EventBridge) starting a Glue job with job bookmarks enabled",
      "A cron job scanning the bucket hourly and reprocessing everything",
      "S3 lifecycle rules invoking the transformation",
      "A Step Functions Wait state polling for new objects",
    ],
    correctAnswers: [0],
    explanation:
      "Event-driven starts plus Glue bookmarks give exactly the trigger-once semantics for new files. Cron reprocessing wastes compute, lifecycle rules manage aging not events, and polling waits add latency without dedup.",
  },
  {
    id: 942,
    category: "Database",
    question:
      "Redshift must analyze Kinesis streaming data within seconds of arrival, using SQL over materialized views — no S3 landing step. Which Redshift feature ingests streams natively?",
    options: [
      "Redshift streaming ingestion with materialized views over Kinesis/MSK",
      "Firehose loading to Redshift hourly batches only",
      "Athena federated queries into the stream",
      "COPY from S3 triggered by Lambda",
    ],
    correctAnswers: [0],
    explanation:
      "Streaming ingestion materializes Kinesis/MSK records directly into Redshift materialized views for second-level SQL analytics. Firehose batches on intervals, Athena doesn't query live streams, and COPY is the batch path.",
  },
  {
    id: 943,
    category: "Compute",
    question:
      "A genomics pipeline submits 100,000 independent CPU tasks with array-style indexing, each producing an S3 output. Which AWS Batch construct expresses this fan-out?",
    options: [
      "Array jobs, submitting one parent job that expands into indexed child jobs",
      "One giant job with an internal thread pool",
      "A Step Functions Map with 100,000 Lambda children",
      "A single queue with manual job splitting",
    ],
    correctAnswers: [0],
    explanation:
      "Batch array jobs expand a parent into thousands of indexed children automatically, scheduled across compute environments. A monolithic job forfeits parallelism, Lambda children hit service constraints at that count, and manual splitting reintroduces toil.",
  },
  {
    id: 944,
    category: "Compute",
    question:
      "A trained fraud model must be hosted behind an HTTPS endpoint that scales automatically with prediction traffic. Which managed hosting option fits?",
    options: [
      "A SageMaker real-time inference endpoint with auto scaling",
      "Exporting the model into a Lambda layer invoked on demand",
      "Batch transform jobs run hourly",
      "An EC2 instance running a hand-deployed model server",
    ],
    correctAnswers: [0],
    explanation:
      "SageMaker real-time endpoints host models with built-in auto scaling and HTTPS. Lambda layers don't host model servers, batch transform is offline scoring, and a hand-run instance is unmanaged.",
  },
  {
    id: 945,
    category: "Compute",
    question:
      "After a model deploys, data drift silently degrades prediction quality. Which SageMaker capability detects input distribution changes in production traffic?",
    options: [
      "SageMaker Model Monitor comparing live traffic against the training baseline",
      "CloudWatch CPU alarms on the endpoint",
      "X-Ray traces of inference calls",
      "Model retraining on a fixed yearly schedule",
    ],
    correctAnswers: [0],
    explanation:
      "Model Monitor captures live inference traffic and flags distribution drift against the training baseline. CPU alarms see compute not data quality, tracing sees latency, and fixed schedules don't detect anything.",
  },
  {
    id: 946,
    category: "Compute",
    question:
      "An e-commerce site wants personalized product recommendations without building ML pipelines. Which managed service trains and hosts recommenders from interaction data?",
    options: [
      "Amazon Personalize",
      "Amazon Rekognition",
      "Amazon Kendra",
      "Amazon Translate",
    ],
    correctAnswers: [0],
    explanation:
      "Personalize builds recommendation models from user-interaction data as a managed service. Rekognition handles images/video, Kendra is search, Translate is language.",
  },
  {
    id: 947,
    category: "Compute",
    question:
      "Thousands of scanned PDFs must be mined for printed text, form fields, and table values into structured data. Which managed service extracts this document structure?",
    options: [
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Polly",
      "Amazon Rekognition",
    ],
    correctAnswers: [0],
    explanation:
      "Textract extracts printed text, forms (key-value), and tables from documents into structured output. Comprehend analyzes existing text, Polly speaks, Rekognition sees images/video.",
  },
  {
    id: 948,
    category: "Compute",
    question:
      "Support tickets must be auto-routed by detected sentiment and topic entities. Which managed service performs the text analysis?",
    options: [
      "Amazon Comprehend",
      "Amazon Textract",
      "Amazon Transcribe",
      "Amazon Personalize",
    ],
    correctAnswers: [0],
    explanation:
      "Comprehend derives sentiment, entities, and key phrases from text — the routing signals. Textract reads documents, Transcribe converts speech, Personalize recommends.",
  },
  {
    id: 949,
    category: "Compute",
    question:
      "Employees ask natural-language questions and need answers extracted from a corpus of 500,000 internal policy documents. Which managed intelligent search service fits?",
    options: [
      "Amazon Kendra",
      "Amazon OpenSearch raw cluster with hand-built NLP",
      "Amazon Personalize",
      "Athena over the documents",
    ],
    correctAnswers: [0],
    explanation:
      "Kendra provides managed natural-language question answering over document corpora with connectors and relevance tuning. Raw OpenSearch requires building the NLP stack, and the others serve different purposes.",
  },
  {
    id: 950,
    category: "Cost Optimization",
    question:
      "GPU capacity is needed: steady around-the-clock inference and a fixed training window next quarter. Which purchasing pattern fits each?",
    options: [
      "Inferentia instances for steady inference; Capacity Blocks for ML for the training window",
      "Reserved Instances for both, since GPUs are RI-eligible",
      "Spot for both, accepting interruption",
      "On-Demand for inference and On-Demand for training",
    ],
    correctAnswers: [0],
    explanation:
      "Inferentia delivers cheaper steady inference, and Capacity Blocks reserve GPU capacity exactly for the training window. Reserved Instances don't cover GPU families, Spot can't guarantee the training run, and full On-Demand overpays for both.",
  },
  {
    id: 951,
    category: "Security",
    question:
      "One asset class on a multi-tenant distribution must be blocked for users in a specific country, while other assets remain available there. Which control enforces geography for just those requests?",
    options: [
      "An AWS WAF geo-match rule scoped to the path or host serving that asset class",
      "CloudFront distribution-level geo restriction, which applies to the entire distribution",
      "A security group blocking the country's IP ranges at the origin",
      "Route 53 geolocation records per asset path",
    ],
    correctAnswers: [0],
    explanation:
      "WAF geo-match statements can combine with path/host conditions, restricting geography for specific requests. Distribution-level geo restriction is all-or-nothing, security groups are coarse network filters, and DNS doesn't route per path.",
  },
  {
    id: 952,
    category: "Networking & Content Delivery",
    question:
      "A new CloudFront distribution must take over production traffic from an old one gradually, with instant rollback, without client changes. Which DNS technique implements the gradual shift?",
    options: [
      "Route 53 weighted records between the two distributions, shifting weight gradually and rolling back by restoring weights",
      "Instantly updating the alias record to the new distribution",
      "Emailing clients the new distribution domain",
      "Deploying both distributions on the same CNAME simultaneously",
    ],
    correctAnswers: [0],
    explanation:
      "Weighted records split traffic by percentage between distributions, providing gradual cutover and instant rollback through weight changes. Hard alias swaps are all-or-nothing, and clients don't change configuration manually.",
  },
  {
    id: 953,
    category: "Cost Optimization",
    question:
      "Which two compute services bill per second of use? (Select TWO.)",
    options: [
      "Amazon EC2 (EBS-backed instances)",
      "AWS Fargate tasks",
      "AWS Lambda",
      "Amazon RDS instances",
      "Elastic Load Balancing",
    ],
    correctAnswers: [0, 1],
    explanation:
      "EC2 and Fargate bill per second with per-minute minimums. Lambda bills per millisecond of invocation (a different granularity), and RDS and load balancers bill hourly.",
  },
  {
    id: 954,
    category: "Management & Governance",
    question:
      "A team wants request tracing that is vendor-neutral — exportable to third-party backends — across Lambda and containers. Which instrumentation approach provides open-standard telemetry collection?",
    options: [
      "AWS Distro for OpenTelemetry (ADOT) instrumenting services with open-standard traces, metrics, and logs",
      "X-Ray daemon alone, locked to the X-Ray console",
      "CloudWatch agent custom JSON only",
      "VPC Flow Logs with application fields",
    ],
    correctAnswers: [0],
    explanation:
      "ADOT collects OpenTelemetry-format telemetry that can ship to X-Ray or third-party backends — the vendor-neutral route. X-Ray alone is AWS-locked, agent JSON is ad hoc, and flow logs see networks not requests.",
  },
];
