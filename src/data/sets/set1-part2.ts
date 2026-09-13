import type { QuizQuestion } from "../questions";

/** Practice Set 1 — questions 23–44. Original questions written in SAA-C03 style. */
export const set1Part2: QuizQuestion[] = [
  {
    id: 23,
    category: "Analytics",
    question:
      "A utility company ingests millions of smart-meter readings per hour. Each reading must be processed in near real time, readings from the same meter must be processed in order, and multiple downstream analytics applications need to consume the same feed independently. Which AWS service meets these requirements?",
    options: [
      "Amazon SQS",
      "Amazon Kinesis Data Streams",
      "Amazon SNS",
      "AWS Batch",
    ],
    correctAnswers: [1],
    explanation:
      "Kinesis Data Streams provides ordered, replayable streams partitioned across shards, and multiple independent consumers can read the same data concurrently. SQS deletes each message after a single consumer processes it, so it supports neither multi-consumer fan-out nor per-key ordering, and SNS is a push-based notification service rather than a replayable stream.",
  },
  {
    id: 24,
    category: "Database",
    question:
      "A development team uses a MySQL-compatible database only a few hours per week, with load that is unpredictable and intermittent. The company wants to pay only for database capacity actually used. Which solution should a solutions architect recommend?",
    options: [
      "Amazon RDS for MySQL in a Multi-AZ deployment",
      "Amazon Aurora Serverless v2",
      "Amazon Redshift",
      "MySQL installed on a spot EC2 instance",
    ],
    correctAnswers: [1],
    explanation:
      "Aurora Serverless v2 automatically scales capacity in fine-grained increments to match actual demand, which suits intermittent and unpredictable workloads while remaining MySQL compatible. An always-on Multi-AZ instance is billed continuously regardless of use, Redshift is an analytics warehouse, and a self-managed spot instance risks interruption and adds administration overhead.",
  },
  {
    id: 25,
    category: "Storage",
    question:
      "Compliance requires that every object uploaded to an Amazon S3 bucket in us-east-1 also be stored in a bucket in eu-west-1, with copies arriving within minutes of the original upload. Which feature should a solutions architect use?",
    options: [
      "An S3 Lifecycle policy that transitions objects to another bucket",
      "S3 Cross-Region Replication",
      "A nightly AWS Batch job that copies new objects",
      "S3 Same-Region Replication",
    ],
    correctAnswers: [1],
    explanation:
      "Cross-Region Replication automatically and asynchronously copies new objects to a bucket in another Region, typically within 15 minutes. Lifecycle policies change storage classes rather than copy to other Regions, batch copies introduce delay and failure risk, and same-region replication keeps data within a single Region.",
  },
  {
    id: 26,
    category: "High Availability & Scaling",
    question:
      "A company is designing a disaster recovery strategy for a non-critical internal application. The business can tolerate a recovery time of 24 hours and the loss of up to 24 hours of data, and minimizing cost is the highest priority. Which strategy should be chosen?",
    options: [
      "Multi-site active/active across two Regions",
      "Warm standby in a second Region",
      "Backup and restore",
      "Pilot light in a second Region",
    ],
    correctAnswers: [2],
    explanation:
      "Backup and restore is the least expensive disaster recovery option: data is backed up on a schedule, and infrastructure is rebuilt from those backups only when a disaster occurs, which matches an RTO and RPO measured in hours. Pilot light and warm standby keep minimal or scaled-down environments running continuously at greater cost, and active/active is the most expensive approach, reserved for near-zero downtime requirements.",
  },
  {
    id: 27,
    category: "Networking & Content Delivery",
    question:
      "A financial company needs a dedicated private network connection between its on-premises data center and AWS with consistent 10 Gbps bandwidth and predictable latency, and it must not use the public internet. Which solution meets these requirements?",
    options: [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "Amazon CloudFront",
      "VPC peering",
    ],
    correctAnswers: [1],
    explanation:
      "AWS Direct Connect provides a dedicated private fiber link between on-premises equipment and AWS with consistent bandwidth and latency. Site-to-Site VPN is quick to set up but traverses the public internet with variable performance, CloudFront is a content delivery network, and VPC peering connects VPCs within AWS rather than a data center to AWS.",
  },
  {
    id: 28,
    category: "Security",
    question:
      "An application uses database credentials that must be rotated automatically every 30 days without redeploying code, and access to the credentials must be controlled through IAM policies. Which AWS service should be used?",
    options: [
      "AWS KMS",
      "AWS Secrets Manager",
      "An encrypted S3 bucket holding a credentials file",
      "Environment variables baked into the AMI",
    ],
    correctAnswers: [1],
    explanation:
      "Secrets Manager stores credentials, applies IAM-based access control, and natively automates rotation of Amazon RDS credentials on a schedule, so applications retrieve the current value at runtime with no redeployment. KMS encrypts data and keys but does not rotate application credentials, and files or environment variables are static values that age and leak.",
  },
  {
    id: 29,
    category: "High Availability & Scaling",
    question:
      "An Auto Scaling group serves traffic behind an Application Load Balancer. The operations team wants the number of instances to adjust automatically so that each instance handles an average of 1,000 requests per minute, with the simplest possible configuration. Which scaling approach should be used?",
    options: [
      "Step scaling based on a CPU utilization alarm",
      "Scheduled scaling actions every morning",
      "Target tracking on the ALBRequestCountPerTarget metric",
      "Manual scaling by changing the desired capacity",
    ],
    correctAnswers: [2],
    explanation:
      "Target tracking adds or removes instances automatically to keep a chosen metric at the target value, and it requires only a single configuration with no alarm tuning. Step scaling needs manually designed alarm thresholds, scheduled scaling fits predictable daily patterns rather than variable load, and manual scaling does not react to demand at all.",
  },
  {
    id: 30,
    category: "Networking & Content Delivery",
    question:
      "A containerized application must route requests with paths beginning with /api to one target group and /admin to another, with TLS termination performed at the load balancer. Which Elastic Load Balancing type should be used?",
    options: [
      "Application Load Balancer",
      "Network Load Balancer",
      "Gateway Load Balancer",
      "Classic Load Balancer",
    ],
    correctAnswers: [0],
    explanation:
      "The Application Load Balancer operates at layer 7 and supports path-based routing rules and TLS termination. The Network Load Balancer forwards TCP/UDP flows at layer 4 without content inspection, the Gateway Load Balancer deploys third-party virtual appliances, and the Classic Load Balancer is a legacy type without modern path routing.",
  },
  {
    id: 31,
    category: "Storage",
    question:
      "Log objects written to Amazon S3 are accessed only during their first week. Company policy requires that after 90 days the objects move to archival storage, and that they be deleted after 365 days, all without any application changes. Which feature should be used?",
    options: [
      "An S3 Lifecycle configuration with transition and expiration rules",
      "S3 Batch Operations",
      "A nightly Lambda function that deletes old objects",
      "S3 Versioning",
    ],
    correctAnswers: [0],
    explanation:
      "An S3 Lifecycle configuration automatically transitions objects to storage classes such as Glacier based on age and expires them after a set number of days, with no application changes. Batch Operations are for one-time bulk tasks, scripted deletions add maintenance burden, and versioning protects previous versions but does not manage object aging.",
  },
  {
    id: 32,
    category: "Storage",
    question:
      "A solutions architect must protect objects in an Amazon S3 bucket from accidental overwrites and deletions so that every previous version remains recoverable. Which combination of features should be enabled?",
    options: [
      "Bucket versioning and MFA delete",
      "Cross-Region Replication",
      "Default server-side encryption with KMS keys",
      "Requester Pays",
    ],
    correctAnswers: [0],
    explanation:
      "Versioning preserves every version of every object, so overwrites and deletes become recoverable prior versions, and MFA delete requires additional authentication to permanently remove versions. Replication copies deletions to the second bucket as well, encryption protects confidentiality rather than durability against deletion, and Requester Pays changes who pays for requests.",
  },
  {
    id: 33,
    category: "Compute",
    question:
      "A small team wants to deploy and manage a Java web application on AWS with minimal operational knowledge, while retaining the ability to access and customize the underlying EC2 instances when needed. Which service should be used?",
    options: [
      "AWS CloudFormation",
      "Manually provisioned Amazon EC2 instances",
      "AWS Elastic Beanstalk",
      "AWS Config",
    ],
    correctAnswers: [2],
    explanation:
      "Elastic Beanstalk handles provisioning the load balancer, Auto Scaling group, and instances from an uploaded application, while still exposing full control of the underlying resources. CloudFormation requires the team to author infrastructure templates themselves, manual EC2 deployment carries all operational burden, and Config records configuration but deploys nothing.",
  },
  {
    id: 34,
    category: "Management & Governance",
    question:
      "An enterprise must deploy the same set of IAM roles and centralized logging resources across 30 AWS accounts and three Regions, managed from a single template definition. Which feature should a solutions architect use?",
    options: [
      "A single AWS CloudFormation stack deployed in each Region",
      "AWS CloudFormation StackSets",
      "AWS Config aggregation",
      "Separate Elastic Beanstalk environments in each account",
    ],
    correctAnswers: [1],
    explanation:
      "CloudFormation StackSets deploy the same template across multiple accounts and Regions in a single operation with centralized drift management. A single stack operates within one account and Region, Config aggregates compliance data but does not deploy resources, and per-account Beanstalk environments are an application deployment pattern, not a multi-account infrastructure tool.",
  },
  {
    id: 35,
    category: "Security",
    question:
      "A security policy requires that every new EBS volume, and every snapshot created from one, is encrypted at rest automatically with no per-volume manual steps. What should a solutions architect do?",
    options: [
      "Remember to select a KMS key each time a volume is created",
      "Enable EBS encryption by default for the Region",
      "Switch the workloads to EC2 instance store volumes",
      "Enable default encryption on an S3 bucket",
    ],
    correctAnswers: [1],
    explanation:
      "EBS encryption by default is a Region-level setting that automatically encrypts every new volume and snapshot, including volumes created from encrypted snapshots. Relying on manual selection is error-prone, instance store is ephemeral and not persistent storage, and S3 encryption has no effect on EBS volumes.",
  },
  {
    id: 36,
    category: "Networking & Content Delivery",
    question:
      "A company operates 50 VPCs plus its on-premises network, and all of them must be able to communicate through a central hub without managing a mesh of individual connections. Which AWS service should be used?",
    options: [
      "A full mesh of VPC peering connections",
      "AWS Transit Gateway",
      "AWS PrivateLink",
      "An internet gateway",
    ],
    correctAnswers: [1],
    explanation:
      "Transit Gateway acts as a hub that routes traffic among thousands of VPCs and on-premises VPN or Direct Connect attachments with a single connection each. VPC peering requires a separate connection per pair and does not scale to 50 VPCs, PrivateLink publishes individual services rather than routing whole networks, and an internet gateway provides internet access.",
  },
  {
    id: 37,
    category: "Security",
    question:
      "A web application needs built-in sign-up and sign-in for millions of end users, multi-factor authentication, and federation with social identity providers such as Google and Facebook. Which AWS service should be used?",
    options: [
      "AWS IAM",
      "Amazon Cognito",
      "IAM Identity Center",
      "AWS Secrets Manager",
    ],
    correctAnswers: [1],
    explanation:
      "Amazon Cognito user pools provide managed authentication for applications, including user directories, MFA, and social and SAML federation at scale. IAM controls access to AWS resources for administrators and services, IAM Identity Center manages workforce single sign-on, and Secrets Manager stores secrets rather than end-user identities.",
  },
  {
    id: 38,
    category: "Management & Governance",
    question:
      "Auditors need a complete record of every API call made against a company's AWS resources, including who made each call, when, and from which IP address, retained for at least one year. Which service provides this?",
    options: [
      "Amazon CloudWatch Logs",
      "AWS CloudTrail",
      "AWS Config",
      "AWS X-Ray",
    ],
    correctAnswers: [1],
    explanation:
      "CloudTrail records account API activity with the caller identity, timestamp, source IP, and request parameters, and deliveries can be stored in S3 for as long as needed. CloudWatch Logs stores application logs, Config tracks resource configuration changes over time, and X-Ray traces requests through application code.",
  },
  {
    id: 39,
    category: "Application Integration",
    question:
      "When an order is placed, a single event must simultaneously trigger a confirmation email, an inventory Lambda function, and a message in an SQS queue for the fulfillment system. Which pattern should a solutions architect use?",
    options: [
      "Write the order to a DynamoDB table and have each consumer poll for changes",
      "Publish the order event to an SNS topic with email, Lambda, and SQS subscribers",
      "Send the order directly to the SQS queue and let one service forward it to the others",
      "Store the order in S3 and email a link to each consumer",
    ],
    correctAnswers: [1],
    explanation:
      "SNS fan-out delivers one published message to multiple subscribers of different types in parallel, which matches the requirement exactly. Polling a table is inefficient and slow, chaining through a single queue couples services and serializes delivery, and email links are not an integration mechanism.",
  },
  {
    id: 40,
    category: "Networking & Content Delivery",
    question:
      "A multiplayer game server communicates over UDP and requires two static public IP addresses, traffic steered to the healthiest regional endpoint over the AWS backbone, and near-instant failover between Regions without waiting for DNS caches to expire. Which service should be used?",
    options: [
      "Amazon CloudFront",
      "Route 53 latency-based routing on its own",
      "AWS Global Accelerator",
      "An Application Load Balancer",
    ],
    correctAnswers: [2],
    explanation:
      "Global Accelerator provides two static anycast IPs at the AWS edge, routes TCP and UDP traffic over the AWS backbone to the healthiest endpoint, and fails over in seconds because no DNS propagation is involved. CloudFront is an HTTP/HTTPS caching CDN, DNS-based routing waits out record TTLs during failover, and an ALB is layer 7 within a single Region.",
  },
  {
    id: 41,
    category: "Storage",
    question:
      "A solutions architect must back up an EBS volume every night, retain point-in-time recovery points for 30 days, and keep one copy in a second Region for resilience. Which approach uses native EBS capabilities with the least operational effort?",
    options: [
      "Automated EBS snapshots with an Amazon Data Lifecycle Manager policy and cross-Region snapshot copies",
      "A script that copies volume contents to S3 each night",
      "Creating a new AMI of the instance every hour",
      "Enabling Multi-Attach on the volume",
    ],
    correctAnswers: [0],
    explanation:
      "EBS snapshots are incremental point-in-time backups, the Data Lifecycle Manager automates the schedule and 30-day retention, and snapshots can be copied to another Region for off-site copies. Manual S3 copies are fragile and slow, AMIs capture an instance image rather than a volume backup schedule, and Multi-Attach shares a volume between instances without providing backups.",
  },
  {
    id: 42,
    category: "Networking & Content Delivery",
    question:
      "A high-throughput TCP service must sustain millions of requests per second with static IP addresses and ultra-low latency. Which Elastic Load Balancing type should be used?",
    options: [
      "Application Load Balancer",
      "Network Load Balancer",
      "Classic Load Balancer",
      "Gateway Load Balancer",
    ],
    correctAnswers: [1],
    explanation:
      "The Network Load Balancer handles millions of requests per second at layer 4 with fixed static IP addresses and single-digit-millisecond latency. The ALB is purpose-built for HTTP routing at layer 7, the Classic Load Balancer is legacy, and the Gateway Load Balancer is designed for transparently inserting third-party security appliances.",
  },
  {
    id: 43,
    category: "Cost Optimization",
    question:
      "A company wants the largest possible EC2 discount for steady workloads it will run for the next three years, while keeping the flexibility to change instance families, sizes, operating systems, and Regions as needs evolve. Which options meet these requirements? (Select TWO.)",
    options: [
      "On-Demand Instances",
      "Spot Instances",
      "Standard Reserved Instances",
      "Compute Savings Plans",
      "Dedicated Hosts",
    ],
    correctAnswers: [2, 3],
    explanation:
      "Standard Reserved Instances and Compute Savings Plans both provide deep discounts in exchange for one- or three-year commitments, and Savings Plans additionally allow changing instance family, size, OS, and Region while keeping the discount. On-Demand has no commitment and no discount, Spot is discounted but interruptible with no commitment, and Dedicated Hosts address software licensing and compliance needs rather than flexible discounts.",
  },
  {
    id: 44,
    category: "Compute",
    question:
      "A company is building a REST API for a mobile application. The API must scale automatically with no servers to manage and be billed per request rather than per hour of compute. Which combination should a solutions architect recommend?",
    options: [
      "EC2 instances in an Auto Scaling group behind an Application Load Balancer",
      "Amazon API Gateway with AWS Lambda",
      "Elastic Beanstalk with a relational database",
      "Amazon ECS on EC2 with capacity providers",
    ],
    correctAnswers: [1],
    explanation:
      "API Gateway plus Lambda is the standard serverless API pattern: no infrastructure to operate, automatic scaling, and per-request pricing. The other options all involve managing fleets of servers and paying for idle capacity.",
  },
];
