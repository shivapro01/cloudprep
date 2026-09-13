import type { QuizQuestion } from "../questions";

/** Practice Set 11 — questions 695–715 (cost nuances, migration heuristics, IoT). Original questions. */
export const set11Part3: QuizQuestion[] = [
  {
    id: 695,
    category: "Cost Optimization",
    question:
      "A cost review finds dozens of Elastic IP addresses not associated with any running instance. What is the current billing implication and remedy?",
    options: [
      "Unattached Elastic IP addresses are charged hourly; release the ones not needed",
      "Unattached EIPs remain free but consume quota only",
      "EIPs bill only while attached to instances",
      "EIPs convert to On-Demand IPs after 30 days automatically",
    ],
    correctAnswers: [0],
    explanation:
      "All public IPv4 addresses, including unattached Elastic IPs, incur hourly charges; releasing unused ones removes the cost. The free-while-unattached model no longer applies.",
  },
  {
    id: 696,
    category: "Cost Optimization",
    question:
      "For high-volume internet delivery, why does CloudFront often cost less than serving S3 directly, despite adding a service?",
    options: [
      "CloudFront's data-transfer-out rates are lower than S3's, and S3-to-CloudFront origin transfer is free",
      "CloudFront waives all request charges for cached hits",
      "S3 charges inter-AZ transfer for every direct GET",
      "CloudFront bills per distribution rather than per GB",
    ],
    correctAnswers: [0],
    explanation:
      "CDN egress pricing undercuts storage egress pricing, and data transfer from S3 into CloudFront is free, so cached delivery typically nets savings. Request charges still exist (at CDN rates), direct S3 GETs don't bill inter-AZ for public access, and billing is usage-based.",
  },
  {
    id: 697,
    category: "Cost Optimization",
    question:
      "An estate uses EC2 plus significant Fargate and Lambda. Leadership wants commitment discounts covering all three. Why is an EC2 Instance Savings Plan the wrong choice?",
    options: [
      "Instance Savings Plans apply to EC2 usage only (by family/Region); Compute Savings Plans are the cross-service commitment covering EC2, Fargate, and Lambda",
      "Instance Savings Plans cost more per hour than On-Demand",
      "Instance Savings Plans cannot be purchased for one-year terms",
      "Instance Savings Plans cover Fargate but not EC2",
    ],
    correctAnswers: [0],
    explanation:
      "Instance Savings Plans lock discounts to EC2 instance families within Regions; only Compute Savings Plans flex across compute services. The pricing and term claims are false, and its coverage description is inverted.",
  },
  {
    id: 698,
    category: "Cost Optimization",
    question:
      "Finance builds a chargeback report grouped by a custom Department tag, but the tag doesn't appear as a grouping option in Cost Explorer. What must happen first?",
    options: [
      "Activate the tag as a cost allocation tag in the billing console (tags take up to 24 hours to appear)",
      "Re-tag every resource manually",
      "Enable CloudTrail data events for tagging APIs",
      "Create a second account per department",
    ],
    correctAnswers: [0],
    explanation:
      "Cost allocation tags must be activated in billing preferences before Cost Explorer and CUR can group by them; activation propagates within about a day. Re-tagging doesn't activate the key, and the other options are unrelated mechanics.",
  },
  {
    id: 699,
    category: "Storage",
    question:
      "A self-managed Kafka cluster needs maximum sequential disk throughput; broker data is replicated across brokers so individual disk loss is tolerable. Which storage type maximizes throughput per dollar?",
    options: [
      "Instance store NVMe volumes",
      "io2 Block Express volumes",
      "EFS mounted by each broker",
      "gp3 volumes with maximum IOPS",
    ],
    correctAnswers: [0],
    explanation:
      "Instance store NVMe delivers the highest sequential throughput free of EBS charges, and broker replication absorbs disk loss — a common Kafka pattern. Provisioned SSDs pay premiums for IOPS that sequential streaming doesn't need, and network file systems add latency.",
  },
  {
    id: 700,
    category: "Cost Optimization",
    question:
      "An operator deletes the oldest 50 EBS snapshots expecting proportional savings, but the bill barely moves. What explains the weak savings?",
    options: [
      "EBS snapshots are incremental; deleting older snapshots saves only the unique blocks not referenced by newer snapshots",
      "Snapshot deletion queues for 30 days before billing stops",
      "Snapshots are billed annually regardless of deletion",
      "The deleted snapshots were already in the archive tier",
    ],
    correctAnswers: [0],
    explanation:
      "Because snapshots store only changed blocks since the previous one, each new snapshot references older blocks; deleting old snapshots saves just their unreferenced data. Deletion takes effect immediately, billing is monthly consumption, and archive tier status would actually increase savings potential.",
  },
  {
    id: 701,
    category: "Cost Optimization",
    question:
      "A serverless fleet of Python and Node functions seeks immediate cost reduction with minimal risk. Which change typically reduces compute charges directly?",
    options: [
      "Migrating functions to arm64 (Graviton) runtimes after compatibility testing",
      "Doubling memory across all functions for faster execution",
      "Adding provisioned concurrency everywhere",
      "Moving all functions into a VPC",
    ],
    correctAnswers: [0],
    explanation:
      "Graviton (arm64) Lambda pricing is about 20% lower per GB-second with equal or better price-performance for common runtimes. More memory raises the rate, provisioned concurrency adds spend, and VPC attachment is orthogonal to cost.",
  },
  {
    id: 702,
    category: "Compute",
    question:
      "A web application holds long-lived bidirectional connections (WebSockets) with a custom server process. The team wants containers with steady always-on capacity rather than per-request functions. Which compute choice fits better than Lambda?",
    options: [
      "A container service (ECS/Fargate or App Runner) running the server continuously",
      "Lambda with API Gateway WebSocket APIs for the server process",
      "Step Functions orchestrating connection state",
      "S3 event notifications driving the connections",
    ],
    correctAnswers: [0],
    explanation:
      "Long-lived stateful connections suit always-on container compute; Lambda's invocation model targets request-scoped work (API Gateway WebSockets pair Lambda with the connection layer, but the server process pattern described maps to containers). Orchestration and event notifications don't host sockets.",
  },
  {
    id: 703,
    category: "Migration & Transfer",
    question:
      "Before committing to a migration, leadership wants a business-case estimate comparing on-premises one-time and recurring costs against target AWS architecture costs. Which tool produces this business case?",
    options: [
      "Migration Evaluator",
      "AWS Pricing Calculator only",
      "Cost and Usage Report analysis",
      "Trusted Advisor cost checks",
    ],
    correctAnswers: [0],
    explanation:
      "Migration Evaluator builds the pre-migration business case with TCO comparisons from collected or estimated on-premises data. The Pricing Calculator estimates specific architectures without the on-premises baseline, CUR needs existing AWS spend, and Trusted Advisor advises on current environments.",
  },
  {
    id: 704,
    category: "Migration & Transfer",
    question:
      "After a Snow Family job's data is unloaded into S3, what verifies the transfer was complete and uncorrupted end to end?",
    options: [
      "The job manifest with checksums, verified during the import process, reported in the console",
      "A manual count of files by the operations team",
      "S3 Inventory compared against a spreadsheet",
      "The shipping carrier's chain-of-custody documents",
    ],
    correctAnswers: [0],
    explanation:
      "Snow jobs generate manifests with per-file checksums, and the import validates data against them, surfacing results in the job record. Manual counts, spreadsheets, and shipping documents provide no cryptographic verification.",
  },
  {
    id: 705,
    category: "Migration & Transfer",
    question:
      "DMS must migrate Oracle source data into DynamoDB tables as the target. What does this imply about DMS capabilities?",
    options: [
      "DMS supports DynamoDB as a target engine, mapping relational rows to items via object mapping settings",
      "DMS supports only relational targets",
      "DynamoDB targets require Schema Conversion Tool first",
      "DynamoDB targets are supported only for homogeneous MySQL sources",
    ],
    correctAnswers: [0],
    explanation:
      "DMS includes DynamoDB among target endpoints with object-mapping rules translating relational structure into items. Targets span relational and NoSQL stores, SCT is for schema conversion between relational engines, and source restrictions stated don't exist.",
  },
  {
    id: 706,
    category: "Migration & Transfer",
    question:
      "After a successful MGN cutover, source servers remain replicated in the staging area and continue generating cost. What is the proper lifecycle completion step?",
    options: [
      "Mark source servers as 'Not ready for cutover'? no — finalize cutover and disconnect the source servers in MGN, ending replication",
      "Terminate the EC2 launch templates",
      "Delete the AWS account containing the staging area",
      "Nothing; replication stops automatically after 30 days",
    ],
    correctAnswers: [0],
    explanation:
      "Finalizing cutover (marking sources migrated/disconnecting) stops replication and retires the staging resources, ending costs cleanly. Launch templates and accounts are shared infrastructure, and replication persists until you complete the lifecycle.",
  },
  {
    id: 707,
    category: "Migration & Transfer",
    question:
      "A team must move 6 TB of data to AWS over a decent 1 Gbps link, then later move 80 TB with only 100 Mbps available. Which approach pairing matches common guidance?",
    options: [
      "Network transfer (DataSync) for 6 TB at 1 Gbps; Snowball Edge for 80 TB at 100 Mbps",
      "Snowball for both jobs regardless of link speed",
      "DataSync for both jobs regardless of link speed",
      "Snowmobile for the 80 TB job",
    ],
    correctAnswers: [0],
    explanation:
      "Six terabytes crosses a gigabit link in about a day, so network tooling wins; 80 TB at 100 Mbps would take months, so physical devices win — the classic break-even heuristic. Uniform choices ignore the link math, and Snowmobile targets far larger volumes.",
  },
  {
    id: 708,
    category: "Application Integration",
    question:
      "An IoT rule fails to deliver messages to its DynamoDB target during an outage, and messages vanish. Which IoT Rules feature preserves failed messages?",
    options: [
      "The rule's error action, such as republishing failures to an SQS queue or another fallback",
      "Increasing the rule's SQL complexity",
      "Device-side message buffering alone",
      "Disabling the rule until the target recovers",
    ],
    correctAnswers: [0],
    explanation:
      "IoT rules support error actions that fire when the primary action fails, preserving messages in a fallback store for later processing. SQL changes don't affect failure handling, and device buffering covers the uplink rather than rule delivery.",
  },
  {
    id: 709,
    category: "Application Integration",
    question:
      "A device goes offline frequently; applications still need to read its last reported state and desired configuration changes must apply when it reconnects. Which IoT Core feature maintains this state?",
    options: [
      "IoT Device Shadows (classic and named)",
      "IoT Jobs with persistent documents",
      "MQTT retained messages on every topic",
      "DynamoDB written by devices directly",
    ],
    correctAnswers: [0],
    explanation:
      "Device Shadows hold reported and desired state documents in the cloud, syncing automatically when devices reconnect. Jobs schedule work, retained messages cover single topics crudely, and direct DB writes by constrained devices bypass shadow semantics.",
  },
  {
    id: 710,
    category: "Analytics",
    question:
      "Connected-vehicle telemetry must be enriched, filtered, and stored for time-series analytics with device-specific queries, as a managed pipeline purpose-built for IoT. Which service fits?",
    options: [
      "AWS IoT Analytics",
      "Amazon Kinesis Data Analytics over raw MQTT",
      "Athena queries on device logs",
      "Redshift streaming ingestion",
    ],
    correctAnswers: [0],
    explanation:
      "IoT Analytics is the managed pipeline (collect, enrich, filter, store, query) purpose-built for IoT telemetry. General streaming analytics requires assembling the device pipeline yourself, and the query services lack the IoT-specific enrichment chain.",
  },
  {
    id: 711,
    category: "Application Integration",
    question:
      "Factory equipment must run local inference and react in milliseconds without cloud connectivity, while being managed and updated from AWS centrally. Which service runs managed edge runtime on the devices?",
    options: [
      "AWS IoT Greengrass",
      "AWS IoT Core rules engine at the site",
      "Snowball Edge devices at each machine",
      "Outposts servers on the factory floor",
    ],
    correctAnswers: [0],
    explanation:
      "Greengrass brings Lambda/containers, local messaging, and ML inference onto edge devices with cloud-based fleet management. IoT Core is the cloud broker, Snowball is a transfer/compute appliance, and Outposts is data-center-scale infrastructure.",
  },
  {
    id: 712,
    category: "Application Integration",
    question:
      "A workflow must call three independent external APIs in parallel, then combine all results for the next step. Which Step Functions construct executes the calls concurrently?",
    options: [
      "The Parallel state, with a branch per API call, joining before the next state",
      "A Map state iterating a fixed array of three",
      "Three sequential Task states with retries",
      "A Choice state selecting one API",
    ],
    correctAnswers: [0],
    explanation:
      "The Parallel state runs branches concurrently and waits for all to complete, passing combined outputs forward. Map iterates dynamic arrays, sequential tasks serialize latency, and Choice picks one path.",
  },
  {
    id: 713,
    category: "Application Integration",
    question:
      "A Distributed Map processes 50,000 items, but downstream systems can absorb only 100 concurrent child executions. How is child concurrency limited?",
    options: [
      "Setting MaxConcurrency on the Distributed Map state",
      "Reducing the reader's batch size only",
      "Splitting the workflow into 100 copies",
      "Adding retries to child executions",
    ],
    correctAnswers: [0],
    explanation:
      "MaxConcurrency bounds how many child runs execute simultaneously, protecting downstream capacity. Batch size affects input reads, duplicate workflows add chaos, and retries address failures not concurrency.",
  },
  {
    id: 714,
    category: "Application Integration",
    question:
      "An API Gateway method returns generated PNG images. Clients receive corrupted payloads because binary bodies are treated as text. What must be configured?",
    options: [
      "Binary media types on the REST API (for example, image/png) so payloads pass through as binary",
      "Base64-encoding in the client only",
      "A larger integration timeout",
      "Content negotiation in the usage plan",
    ],
    correctAnswers: [0],
    explanation:
      "REST APIs treat bodies as text unless the media type is registered in binaryMediaTypes, which switches handling to passthrough binary handling. Client-side encoding and timeouts don't change API Gateway's content handling.",
  },
  {
    id: 715,
    category: "Database",
    question:
      "Which two AWS database services run PostgreSQL-compatible engines? (Select TWO.)",
    options: [
      "Amazon Aurora PostgreSQL",
      "Amazon RDS for PostgreSQL",
      "Amazon Redshift",
      "Amazon DocumentDB",
      "Amazon Keyspaces",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Aurora PostgreSQL and RDS for PostgreSQL are the PostgreSQL-compatible relational options. Redshift speaks a PostgreSQL-derived dialect for analytics but is a distinct warehouse engine, and the others are MongoDB- and Cassandra-compatible respectively.",
  },
];
