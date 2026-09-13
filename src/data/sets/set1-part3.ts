import type { QuizQuestion } from "../questions";

/** Practice Set 1 — questions 45–65. Original questions written in SAA-C03 style. */
export const set1Part3: QuizQuestion[] = [
  {
    id: 45,
    category: "Networking & Content Delivery",
    question:
      "Users in Australia report slow, failed uploads of multi-gigabyte video files to an Amazon S3 bucket in us-east-1. Which S3 feature improves long-distance upload performance by transferring data through AWS edge locations?",
    options: [
      "S3 Cross-Region Replication",
      "S3 Transfer Acceleration",
      "S3 Batch Operations",
      "An S3 Lifecycle policy",
    ],
    correctAnswers: [1],
    explanation:
      "S3 Transfer Acceleration uploads files to a nearby edge location and forwards them to the destination bucket over the optimized AWS backbone, which significantly helps distant clients. Replication copies objects after they arrive, Batch Operations perform bulk tasks on existing objects, and lifecycle rules manage object aging.",
  },
  {
    id: 46,
    category: "Database",
    question:
      "A DynamoDB table serving a product catalog experiences throttling during sales events because the same popular items are read repeatedly. The team wants microsecond read latency with minimal application changes. Which solution should a solutions architect recommend?",
    options: [
      "Add an ElastiCache for Redis cluster and rewrite the data access layer",
      "Add Amazon DynamoDB Accelerator (DAX)",
      "Switch the table to on-demand capacity mode",
      "Export the table to S3 and query it with Athena",
    ],
    correctAnswers: [1],
    explanation:
      "DAX is an in-memory cache built for DynamoDB that returns eventually consistent reads in microseconds and requires only a change to the client endpoint, not a rewrite. ElastiCache works but demands a new caching layer in the application, capacity modes address throttling rather than read latency, and querying S3 is an analytics pattern unsuitable for a live catalog.",
  },
  {
    id: 47,
    category: "Networking & Content Delivery",
    question:
      "A company runs its primary application in us-east-1 and hosts a static recovery site in Amazon S3. Amazon Route 53 must send users to the recovery site only when the primary site fails its health check. Which routing policy should be used?",
    options: [
      "Failover routing",
      "Weighted routing",
      "Geolocation routing",
      "Multivalue answer routing",
    ],
    correctAnswers: [0],
    explanation:
      "Failover routing is an active/passive policy: the primary record is served while its health check passes, and traffic shifts to the secondary record only when it fails. Weighted routing splits traffic by ratio, geolocation routes by user location, and multivalue answer returns several healthy records rather than enforcing a primary/secondary order.",
  },
  {
    id: 48,
    category: "Management & Governance",
    question:
      "A company manages 40 AWS accounts. The security team must prevent all accounts from launching resources in unapproved Regions and from disabling CloudTrail, regardless of individual IAM permissions. Which solution should be used?",
    options: [
      "Carefully written IAM policies attached to every user in every account",
      "Service control policies (SCPs) defined in AWS Organizations",
      "A shared IAM role that users must assume for any AWS access",
      "AWS Trusted Advisor security checks",
    ],
    correctAnswers: [1],
    explanation:
      "Service control policies define maximum available permissions for every account in an organization, so disallowed actions such as launching in unapproved Regions are blocked centrally no matter what IAM policies allow. Per-user IAM policies cannot guarantee organization-wide guardrails, a shared role does not restrict what the role can do across accounts, and Trusted Advisor only produces recommendations.",
  },
  {
    id: 49,
    category: "Cost Optimization",
    question:
      "A finance team wants to visualize monthly spending broken down by service, forecast the next quarter's costs, and receive rightsizing recommendations for over-provisioned EC2 instances. Which tool provides all of these capabilities?",
    options: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "AWS CloudTrail",
    ],
    correctAnswers: [0],
    explanation:
      "Cost Explorer visualizes historical and forecasted spend by service, account, and tag, and includes rightsizing recommendations for EC2. Budgets alerts when costs cross thresholds but does not forecast or rightsize, the Pricing Calculator estimates the cost of planned architectures before deployment, and CloudTrail records API activity.",
  },
  {
    id: 50,
    category: "Application Integration",
    question:
      "A reporting Lambda function must run automatically every night at 02:00 with no servers to maintain. What is the simplest way to schedule this?",
    options: [
      "A cron job configured on a small always-on EC2 instance",
      "An Amazon EventBridge scheduled rule targeting the Lambda function",
      "A daily SNS message that developers acknowledge manually",
      "A CloudWatch alarm on the Lambda invocation metric",
    ],
    correctAnswers: [1],
    explanation:
      "EventBridge rules support cron or rate expressions and can invoke a Lambda target directly, providing scheduling with zero infrastructure. An EC2 cron job reintroduces a server to maintain, SNS delivery is not a scheduler, and alarms react to metric conditions rather than firing on a schedule.",
  },
  {
    id: 51,
    category: "Application Integration",
    question:
      "An order-processing workflow spans six Lambda functions with conditional branches, retries, and error handling. The code that chains the functions together has become difficult to maintain. Which AWS service should be used to orchestrate the workflow?",
    options: [
      "AWS Step Functions",
      "Amazon MQ",
      "AWS Glue",
      "Amazon EventBridge",
    ],
    correctAnswers: [0],
    explanation:
      "Step Functions models multi-step workflows as state machines with built-in sequencing, branching, parallel execution, retries, and error handling, replacing brittle hand-written chaining. Amazon MQ is a managed message broker, Glue is an ETL service, and EventBridge routes events but does not manage multi-step state.",
  },
  {
    id: 52,
    category: "Compute",
    question:
      "A platform team has deep Kubernetes expertise and wants to run containerized microservices on AWS using standard Kubernetes tooling, APIs, and ecosystem add-ons. Which managed service should be used?",
    options: [
      "Amazon ECS",
      "Amazon EKS",
      "AWS Lambda",
      "EC2 instances with manually installed Docker",
    ],
    correctAnswers: [1],
    explanation:
      "Amazon EKS runs a certified, managed upstream Kubernetes control plane, so teams keep their existing Kubernetes skills and tooling. ECS uses AWS-proprietary APIs, Lambda is a functions platform rather than a container orchestrator, and self-managed Docker on EC2 lacks orchestration entirely.",
  },
  {
    id: 53,
    category: "Compute",
    question:
      "A data conversion job reliably runs for 40 to 90 minutes. The team tried to implement it in AWS Lambda but the executions fail. Which compute option fits this workload with the least operational overhead?",
    options: [
      "Increase the Lambda function timeout to 120 minutes",
      "Run the job as a container on AWS Fargate",
      "Split the job into more concurrent Lambda functions",
      "Invoke the Lambda function asynchronously through API Gateway",
    ],
    correctAnswers: [1],
    explanation:
      "Lambda enforces a maximum execution time of 15 minutes per invocation, so a job that runs 40 to 90 minutes cannot complete regardless of configuration. Fargate runs containerized tasks of any duration without servers to manage. Adding concurrency does not lengthen the per-invocation limit, and asynchronous invocation is still bound by the same timeout.",
  },
  {
    id: 54,
    category: "Database",
    question:
      "A reporting application reads heavily from a production Amazon RDS MySQL database and is slowing the primary transactional workload. The reports tolerate data that is a few minutes old. Which solution offloads the read traffic?",
    options: [
      "Enable a Multi-AZ deployment",
      "Create RDS read replicas and point reporting queries at them",
      "Increase the frequency of automated snapshots",
      "Upgrade the primary instance to a larger class",
    ],
    correctAnswers: [1],
    explanation:
      "Read replicas serve read-only copies of the data with asynchronous replication, so slightly stale reporting queries move off the primary. Multi-AZ keeps a standby for high availability that cannot serve reads, snapshots are point-in-time backups, and upsizing adds cost without separating workloads.",
  },
  {
    id: 55,
    category: "Database",
    question:
      "A company needs a MySQL-compatible database that replicates to a second Region in under one second so that users in both Europe and America read from a nearby cluster, and the second Region can be promoted quickly during a regional disaster. Which solution should a solutions architect recommend?",
    options: [
      "Amazon RDS for MySQL in a Multi-AZ deployment",
      "Amazon Aurora Global Database",
      "Nightly cross-Region RDS snapshots restored on demand",
      "DynamoDB global tables",
    ],
    correctAnswers: [1],
    explanation:
      "Aurora Global Database replicates from a primary cluster to secondary clusters in other Regions with typical lag under one second and supports promotion in about a minute, while remaining MySQL compatible. Multi-AZ operates within a single Region, snapshot-based recovery has an RPO measured in hours, and DynamoDB global tables are not MySQL compatible.",
  },
  {
    id: 56,
    category: "Cost Optimization",
    question:
      "An Amazon EFS file system holds several terabytes of files, most of which are rarely accessed after their first month. The company wants to reduce storage cost without changing how applications access the files. Which feature should be used?",
    options: [
      "EFS Lifecycle Management with the Infrequent Access storage class",
      "Copying older files to EBS snapshots",
      "Switching the file system to elastic throughput mode",
      "Compressing the files and storing them in S3",
    ],
    correctAnswers: [0],
    explanation:
      "EFS lifecycle policies transparently move files that have not been accessed for a configurable period into the Infrequent Access class, which costs much less per GB while keeping the same path and access permissions. EBS snapshots are block backups rather than files, throughput modes affect performance pricing rather than storage cost, and moving to S3 changes the access method.",
  },
  {
    id: 57,
    category: "Storage",
    question:
      "A high-performance computing team runs simulations that need a shared POSIX file system delivering hundreds of GB/s of throughput and millions of IOPS across thousands of compute instances, with input data stored in Amazon S3. Which storage service should be used?",
    options: [
      "Amazon EFS",
      "Amazon FSx for Lustre",
      "An io2 EBS volume shared between instances",
      "Amazon S3 Standard accessed directly by each instance",
    ],
    correctAnswers: [1],
    explanation:
      "FSx for Lustre delivers massively parallel, high-throughput POSIX file access built for HPC and can link directly to an S3 bucket as its data repository. EFS is a general-purpose NFS system with lower per-file-system throughput ceilings, EBS volumes are block devices attached per instance, and reading directly from S3 does not provide a shared POSIX file system.",
  },
  {
    id: 58,
    category: "Networking & Content Delivery",
    question:
      "Instances in a private subnet upload large volumes of data to Amazon S3. A solutions architect must keep this traffic on the AWS network and avoid NAT gateway processing charges. Which solution meets these requirements at no additional cost?",
    options: [
      "Add a route from the private subnet to an internet gateway",
      "Create an S3 gateway VPC endpoint",
      "Deploy a NAT instance in the public subnet",
      "Peer the VPC with the S3 service VPC",
    ],
    correctAnswers: [1],
    explanation:
      "A gateway VPC endpoint for S3 routes traffic to S3 privately within the AWS network and is provided at no charge, eliminating both internet exposure and NAT costs. An internet gateway route would require public addressing, a NAT instance is self-managed and still incurs charges, and S3 is a service without a VPC to peer with.",
  },
  {
    id: 59,
    category: "Security",
    question:
      "Application instances behind an internal Application Load Balancer must accept traffic only from that load balancer, and the rule must continue to work automatically as the load balancer scales. How should the security groups be configured?",
    options: [
      "Allow the load balancer's security group as the source in the instances' security group",
      "Allow 0.0.0.0/0 on the application port in the instances' security group",
      "Hard-code the load balancer's IP addresses in the instances' security group",
      "Allow the entire VPC CIDR on all ports in the instances' security group",
    ],
    correctAnswers: [0],
    explanation:
      "Security groups can reference other security groups as the source, and the rule automatically follows the load balancer's nodes as it scales. A blanket allow-all rule exposes the instances directly, hard-coded IP lists break when nodes are added or replaced, and opening the whole VPC CIDR on all ports is far broader than the load balancer alone.",
  },
  {
    id: 60,
    category: "Analytics",
    question:
      "A marketing company must land clickstream events in Amazon S3 within about a minute of collection. The pipeline must be fully managed, with optional record transformation handled by a Lambda function, and the team must not operate stream consumers. Which service fits best?",
    options: [
      "Amazon Kinesis Data Firehose",
      "Amazon Kinesis Data Streams",
      "Amazon SQS FIFO queue",
      "AWS Glue",
    ],
    correctAnswers: [0],
    explanation:
      "Kinesis Data Firehose is a fully managed delivery service that buffers and loads streaming data into S3 with optional Lambda transformation and no consumer infrastructure to run. Data Streams requires building and operating consumers, an SQS FIFO queue is for ordered message processing rather than bulk delivery, and Glue is batch ETL.",
  },
  {
    id: 61,
    category: "Management & Governance",
    question:
      "An application writes its logs to Amazon CloudWatch Logs. The operations team must be notified whenever the word ERROR appears more than 10 times within 5 minutes. Which solution meets this requirement?",
    options: [
      "A CloudTrail trail with an S3 delivery and an email subscription",
      "A CloudWatch Logs metric filter plus a CloudWatch alarm that notifies an SNS topic",
      "A GuardDuty finding routed to an email endpoint",
      "An X-Ray trace annotation with a dashboard",
    ],
    correctAnswers: [1],
    explanation:
      "A metric filter counts log lines matching a pattern and publishes the count as a metric; a CloudWatch alarm on that metric can trigger an SNS notification when the threshold is breached. CloudTrail records API calls rather than application log contents, GuardDuty detects account-level threats, and X-Ray is for distributed tracing.",
  },
  {
    id: 62,
    category: "Security",
    question:
      "A public-facing website is targeted by layer 3 and layer 4 volumetric DDoS attacks. The protection must run automatically and be included at no additional cost for all AWS customers. Which service provides this?",
    options: [
      "AWS WAF",
      "AWS Shield Standard",
      "Amazon GuardDuty",
      "Amazon Inspector",
    ],
    correctAnswers: [1],
    explanation:
      "Shield Standard protects all AWS customers from the most common network and transport layer DDoS events automatically and at no extra cost. WAF is a paid layer 7 web firewall with rules you configure, GuardDuty performs threat detection and raises findings, and Inspector scans workloads for software vulnerabilities.",
  },
  {
    id: 63,
    category: "Storage",
    question:
      "An on-premises office is running out of capacity on its file server. Files must remain readable locally with low latency while being durably stored in Amazon S3, and users should keep using the same NFS and SMB shares. Which solution should a solutions architect recommend?",
    options: [
      "AWS Storage Gateway File Gateway deployed as a virtual appliance on premises",
      "Direct S3 API integration in every desktop application",
      "AWS DataSync scheduled transfers to S3",
      "An AWS Snowball Edge device shipped to the office",
    ],
    correctAnswers: [0],
    explanation:
      "File Gateway is a virtual appliance that serves standard NFS and SMB shares, caches frequently accessed files locally for low latency, and stores data durably in S3. Rewriting applications for the S3 API defeats the purpose, DataSync moves data on a schedule rather than serving files continuously, and Snowball is a one-time bulk transfer device.",
  },
  {
    id: 64,
    category: "Compute",
    question:
      "Researchers submit thousands of independent containerized jobs every day. The solution must queue jobs until capacity is available, scale compute automatically, and use Spot capacity to reduce cost. Which service is designed for this?",
    options: [
      "AWS Batch",
      "AWS Step Functions",
      "Amazon ECS with a manually managed cluster",
      "AWS Lambda",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Batch manages job queues and dynamically provisions the required EC2 or Spot compute, releasing it when jobs complete. Step Functions orchestrates workflows rather than scheduling batch compute, raw ECS would require custom queueing and scaling logic, and Lambda's 15-minute limit and memory caps do not fit large container jobs.",
  },
  {
    id: 65,
    category: "Management & Governance",
    question:
      "An operations team must apply security patches to hundreds of EC2 instances on a defined schedule without opening SSH access or maintaining bastion hosts, and must report patch compliance afterward. Which service provides this capability?",
    options: [
      "AWS Systems Manager Patch Manager",
      "AWS Config",
      "AWS CloudFormation",
      "Amazon Inspector",
    ],
    correctAnswers: [0],
    explanation:
      "Systems Manager agents communicate outbound over the SSM service endpoints, so Patch Manager can install patches through maintenance windows with no inbound SSH or bastion layer, and it produces patch compliance reports. Config records configuration state, CloudFormation provisions infrastructure, and Inspector identifies vulnerabilities without patching them.",
  },
];
