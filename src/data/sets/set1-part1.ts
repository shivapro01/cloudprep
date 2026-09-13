import type { QuizQuestion } from "../questions";

/** Practice Set 1 — questions 1–22. Original questions written in SAA-C03 style. */
export const set1Part1: QuizQuestion[] = [
  {
    id: 1,
    category: "Storage",
    question:
      "A company needs to store backup data that is accessed only a few times each year, but the data must be retrievable within minutes whenever it is requested. Which Amazon S3 storage class is the MOST cost-effective solution?",
    options: [
      "S3 Standard",
      "S3 Standard-Infrequent Access (S3 Standard-IA)",
      "S3 One Zone-IA",
      "S3 Glacier Flexible Retrieval",
    ],
    correctAnswers: [1],
    explanation:
      "S3 Standard-IA is designed for infrequently accessed data that still requires rapid access when needed. It offers the same millisecond latency as S3 Standard but with a lower storage price, charging a small per-GB retrieval fee. S3 Glacier Flexible Retrieval is cheaper to store, but retrievals can take minutes to hours, which makes it an archive class rather than one for minutes-level access. S3 Standard is not cost-effective for rarely accessed data, and S3 One Zone-IA stores data in a single Availability Zone, which is less resilient for backups.",
  },
  {
    id: 2,
    category: "Compute",
    question:
      "A company runs a fault-tolerant, distributed big data analytics workload on Amazon EC2. The workload can tolerate interruptions of individual worker nodes and reruns failed tasks automatically. Which EC2 purchasing option provides the LOWEST cost for this workload?",
    options: [
      "On-Demand Instances",
      "Reserved Instances",
      "Dedicated Hosts",
      "Spot Instances",
    ],
    correctAnswers: [3],
    explanation:
      "Spot Instances let you take advantage of unused EC2 capacity at discounts of up to 90% compared to On-Demand pricing. They can be interrupted with a two-minute warning, which makes them ideal for fault-tolerant and flexible workloads such as big data, batch processing, and distributed analytics. Reserved Instances and Dedicated Hosts suit steady-state workloads with predictable usage, and On-Demand is the most expensive option.",
  },
  {
    id: 3,
    category: "Database",
    question:
      "A company runs a production MySQL database on Amazon RDS. Business requirements state that the database must remain available even if a full Availability Zone becomes unavailable. Which solution should a solutions architect recommend?",
    options: [
      "Create a Multi-AZ deployment",
      "Create multiple Read Replicas in the same Availability Zone",
      "Take manual DB snapshots every hour",
      "Migrate the database to Amazon S3",
    ],
    correctAnswers: [0],
    explanation:
      "A Multi-AZ deployment provisions and maintains a synchronous standby replica in a different Availability Zone. Amazon RDS automatically fails over to the standby in the event of an AZ outage, infrastructure failure, or database instance failure, so no manual intervention is required. Read Replicas are for scaling read traffic, not availability, snapshots do not provide sub-minute recovery, and S3 is not a relational database engine.",
  },
  {
    id: 4,
    category: "Networking & Content Delivery",
    question:
      "A global media company streams on-demand video to users around the world. Users report high latency and buffering when watching videos from distant regions. Which AWS service will provide the LOWEST latency content delivery?",
    options: [
      "Amazon S3 Transfer Acceleration",
      "AWS Global Accelerator",
      "Amazon CloudFront",
      "An Application Load Balancer with cross-zone load balancing",
    ],
    correctAnswers: [2],
    explanation:
      "Amazon CloudFront is a global content delivery network (CDN) that caches video and other content at hundreds of edge locations worldwide, serving each user from the edge location closest to them. S3 Transfer Acceleration only speeds up uploads to S3 over the AWS edge network, Global Accelerator improves availability and performance for TCP/UDP traffic at the network layer without caching content, and a load balancer distributes traffic across targets within a Region.",
  },
  {
    id: 5,
    category: "Compute",
    question:
      "A development team wants to run application code without provisioning or managing any servers. Which AWS services meet this requirement? (Select TWO.)",
    options: [
      "Amazon EC2",
      "AWS Lambda",
      "Amazon RDS",
      "AWS Fargate",
      "Amazon ElastiCache",
    ],
    correctAnswers: [1, 3],
    explanation:
      "AWS Lambda runs code in response to events with zero server management — you upload code and Lambda handles provisioning, scaling, patching, and availability. AWS Fargate is a serverless compute engine for containers that removes the need to manage the underlying EC2 instances. Amazon EC2 requires you to provision and manage servers, while Amazon RDS and ElastiCache are managed data services, not compute for application code.",
  },
  {
    id: 6,
    category: "Security",
    question:
      "Which statement about Amazon EC2 security groups is CORRECT?",
    options: [
      "Security groups operate at the subnet level and are stateless",
      "Security groups support both allow and deny rules",
      "Security groups are stateful, and return traffic is automatically allowed",
      "Security groups evaluate rules in numerical order and stop at the first match",
    ],
    correctAnswers: [2],
    explanation:
      "Security groups are stateful: if you send a request out, the response traffic is automatically allowed in regardless of inbound rules, and all rules are evaluated before a decision is made. They operate at the instance (elastic network interface) level and support allow rules only. The other statements describe network ACLs, which are stateless, operate at the subnet level, support allow and deny rules, and evaluate numbered rules in order.",
  },
  {
    id: 7,
    category: "High Availability & Scaling",
    question:
      "A web application runs on Amazon EC2 instances behind an Application Load Balancer across two Availability Zones. The company expects traffic to grow significantly and wants capacity to be added and removed automatically based on demand. What should a solutions architect recommend?",
    options: [
      "Create an Amazon EC2 Auto Scaling group across multiple AZs",
      "Deploy the application on larger EC2 instance types",
      "Use Amazon Route 53 latency-based routing",
      "Enable Elastic Load Balancer health checks",
    ],
    correctAnswers: [0],
    explanation:
      "An EC2 Auto Scaling group automatically adds instances (scales out) when demand increases and removes them (scales in) when demand drops, based on scaling policies and CloudWatch metrics. It also replaces unhealthy instances, and spanning multiple AZs improves availability. Upsizing instances is vertical scaling with a hard ceiling, Route 53 is DNS routing rather than capacity management, and health checks detect failures but do not add capacity.",
  },
  {
    id: 8,
    category: "Security",
    question:
      "An application running on an Amazon EC2 instance needs to read objects from an Amazon S3 bucket. What is the MOST secure way to grant the application this access?",
    options: [
      "Store IAM user access keys in the application configuration file",
      "Attach an IAM role with the required S3 permissions to the EC2 instance",
      "Use the AWS account root user credentials on the instance",
      "Make the S3 bucket publicly readable",
    ],
    correctAnswers: [1],
    explanation:
      "IAM roles are the recommended way to grant permissions to applications running on EC2. The role is attached through an instance profile, and AWS automatically rotates the temporary credentials available to the instance — no long-lived keys need to be stored or managed. Root user credentials should never be used for applications, a public bucket exposes data to everyone on the internet, and hardcoded access keys are a security risk because they can leak and must be rotated manually.",
  },
  {
    id: 9,
    category: "Security",
    question:
      "A solutions architect must grant a development team read-only access to objects in one specific Amazon S3 bucket, following the principle of least privilege. Which solution meets this requirement?",
    options: [
      "Create an IAM policy that allows s3:GetObject and s3:ListBucket on that bucket, and attach it to the team's IAM role",
      "Make the bucket publicly readable and restrict access using an IP address condition",
      "Grant the team full administrative IAM access so they can manage their own permissions",
      "Give each developer a shared pair of S3 access keys embedded in the application",
    ],
    correctAnswers: [0],
    explanation:
      "A narrowly scoped IAM policy that allows only the required S3 actions on the specific bucket is the least-privilege approach. Publicly readable buckets expose data to the internet, administrative access violates least privilege, and shared embedded keys cannot be audited per user and must be rotated manually whenever someone leaves the team.",
  },
  {
    id: 10,
    category: "Security",
    question:
      "A company must encrypt all objects in an Amazon S3 bucket at rest. It also wants control over the encryption keys, automatic key rotation, and a usage audit trail in AWS CloudTrail. Which solution should a solutions architect recommend?",
    options: [
      "Server-side encryption with Amazon S3 managed keys (SSE-S3)",
      "Server-side encryption with AWS KMS keys (SSE-KMS)",
      "Client-side encryption with keys stored on the application servers",
      "Enforce HTTPS in transit and leave objects unencrypted at rest",
    ],
    correctAnswers: [1],
    explanation:
      "SSE-KMS uses AWS KMS keys that the customer controls, supports automatic annual key rotation, and records every key use in CloudTrail for auditing. SSE-S3 manages keys entirely inside S3 with no per-request audit trail, client-side keys add operational burden without AWS-managed rotation, and HTTPS only protects data in transit, not at rest.",
  },
  {
    id: 11,
    category: "Storage",
    question:
      "Hundreds of Linux EC2 instances spread across multiple Availability Zones need to read and write a shared set of files concurrently using standard file system semantics. Which AWS service should a solutions architect recommend?",
    options: [
      "Separate Amazon EBS volumes attached to each instance",
      "Amazon EFS",
      "Amazon S3",
      "Amazon EC2 instance store",
    ],
    correctAnswers: [1],
    explanation:
      "Amazon EFS is a fully managed elastic NFS file system that can be mounted concurrently by thousands of instances across multiple Availability Zones with standard POSIX semantics. EBS volumes are block storage attached to a single instance, S3 is object storage accessed through APIs rather than a mounted file system, and instance store is ephemeral, single-instance storage that is lost when the instance stops.",
  },
  {
    id: 12,
    category: "Database",
    question:
      "A company needs a managed relational database that is MySQL compatible, automatically grows storage as data increases, and delivers significantly higher throughput than standard MySQL for a high-traffic application. Which service should a solutions architect recommend?",
    options: [
      "Amazon RDS for MySQL on a larger instance type",
      "Amazon DynamoDB",
      "Amazon Aurora",
      "Amazon Redshift",
    ],
    correctAnswers: [2],
    explanation:
      "Amazon Aurora is a MySQL-compatible relational engine that delivers up to five times the throughput of standard MySQL, grows storage automatically from 10 GiB up to 128 TiB, and supports up to 15 low-latency read replicas. RDS for MySQL does not match Aurora's performance, DynamoDB is a NoSQL service, and Redshift is an analytics data warehouse, not an operational database.",
  },
  {
    id: 13,
    category: "Application Integration",
    question:
      "A company's image-processing service slows down during traffic spikes, which causes the upload service in front of it to fail. A solutions architect must decouple the two services so that incoming jobs wait in a buffer and are processed asynchronously as capacity allows. Which AWS service should be used?",
    options: [
      "Amazon SQS",
      "Amazon SNS",
      "AWS PrivateLink",
      "Amazon Elastic Transcoder",
    ],
    correctAnswers: [0],
    explanation:
      "Amazon SQS is a managed message queue that buffers requests between producers and consumers, letting the upload service accept work even while the processing service is busy. SNS is a push-based pub/sub service for fan-out notifications rather than a pull-based queue for absorbing backlogs, PrivateLink provides private connectivity, and Elastic Transcoder is a specific media conversion service, not a decoupling mechanism.",
  },
  {
    id: 14,
    category: "Database",
    question:
      "A read-heavy web application queries an Amazon RDS MySQL database for rarely changing reference data on nearly every request, causing high database load and slow response times. Which solution improves performance the MOST?",
    options: [
      "Add a read replica and point all requests to it",
      "Deploy Amazon ElastiCache for Redis in front of the database and cache the reference data",
      "Enable Multi-AZ deployment on the database",
      "Upgrade the database to a larger instance class",
    ],
    correctAnswers: [1],
    explanation:
      "ElastiCache for Redis stores the hot reference data in memory and serves it in microseconds, removing most queries from the database entirely. A read replica still serves queries from disk and does not reduce the number of database reads, Multi-AZ provides high availability rather than performance, and a larger instance only delays the scaling problem without removing repeated reads.",
  },
  {
    id: 15,
    category: "Networking & Content Delivery",
    question:
      "A company runs identical application stacks in us-east-1 and eu-west-1, each behind an Application Load Balancer. Amazon Route 53 must direct each user to the Region that provides the lowest latency, and traffic should shift automatically if a Region becomes unhealthy. Which routing policy should be used?",
    options: [
      "Simple routing",
      "Weighted routing",
      "Latency-based routing with health checks",
      "Geolocation routing",
    ],
    correctAnswers: [2],
    explanation:
      "Latency-based routing serves each user from the Region that provides the lowest measured latency, and Route 53 health checks remove an unhealthy Region from the answers automatically. Simple routing returns a single record, weighted routing splits traffic by fixed percentages rather than performance, and geolocation routes based on the user's geographic location rather than latency.",
  },
  {
    id: 16,
    category: "Database",
    question:
      "A gaming company must store player session data with a simple key-based access pattern. The workload requires consistent single-digit millisecond response times at any scale and must sustain hundreds of thousands of requests per second without the team managing any servers. Which service should be used?",
    options: [
      "Amazon DynamoDB",
      "Amazon RDS for PostgreSQL",
      "Amazon Redshift",
      "Amazon Athena",
    ],
    correctAnswers: [0],
    explanation:
      "Amazon DynamoDB is a serverless key-value and document database that delivers consistent single-digit millisecond performance at virtually any scale, making it the standard choice for session stores. Relational databases and data warehouses are not designed for this access pattern at this request rate, and Athena is an interactive query service for data in S3, not an operational store.",
  },
  {
    id: 17,
    category: "Storage",
    question:
      "A production Oracle database runs on a single Amazon EC2 instance and requires more than 20,000 provisioned IOPS with consistent low latency. Which Amazon EBS volume type should a solutions architect recommend?",
    options: [
      "General Purpose SSD (gp3)",
      "Throughput Optimized HDD (st1)",
      "Provisioned IOPS SSD (io2)",
      "Cold HDD (sc1)",
    ],
    correctAnswers: [2],
    explanation:
      "io2 (and io2 Block Express) volumes support provisioning of up to 256,000 IOPS with a durable performance SLA, making them the right choice for demanding transactional databases. gp3 tops out at 16,000 IOPS, which is below the requirement, while st1 and sc1 are hard-disk volume types designed for sequential throughput and infrequent access rather than high random IOPS.",
  },
  {
    id: 18,
    category: "Networking & Content Delivery",
    question:
      "Amazon EC2 instances in a private subnet must download operating system patches from the internet, but they must never accept inbound connections initiated from the internet. Which design meets these requirements?",
    options: [
      "Move the instances to a public subnet with auto-assigned public IP addresses",
      "Keep the instances in the private subnet and add a NAT gateway in the public subnet",
      "Attach an internet gateway directly to the instances' private subnet",
      "Keep the instances isolated and rebuild the AMI manually for every patch cycle",
    ],
    correctAnswers: [1],
    explanation:
      "A NAT gateway allows instances in a private subnet to initiate outbound connections to the internet (for downloads such as patches) while blocking unsolicited inbound connections. Placing instances in a public subnet exposes them to inbound traffic, an internet gateway alone cannot provide connectivity for private subnets, and manual AMI rebuilds add heavy operational overhead.",
  },
  {
    id: 19,
    category: "Security",
    question:
      "A web application behind an Application Load Balancer is receiving SQL injection and cross-site scripting attacks in HTTP requests. Which AWS service should a solutions architect use to block these attacks?",
    options: [
      "AWS WAF with managed rule groups attached to the load balancer",
      "AWS Shield Standard",
      "Security groups that allow traffic on port 443 only",
      "Amazon GuardDuty",
    ],
    correctAnswers: [0],
    explanation:
      "AWS WAF inspects web requests at layer 7 and can block SQL injection and cross-site scripting patterns using managed rule groups attached to an ALB, API Gateway, or CloudFront. Shield protects against DDoS attacks at layers 3 and 4, security groups filter by port and address without inspecting payloads, and GuardDuty is a threat detection service that raises findings rather than blocking requests inline.",
  },
  {
    id: 20,
    category: "Storage",
    question:
      "A company runs Windows file servers that share data over the SMB protocol and integrate with Active Directory for permissions. The company wants a fully managed, highly available replacement without changing how applications access the files. Which AWS service should be used?",
    options: [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
      "Amazon FSx for Lustre",
    ],
    correctAnswers: [1],
    explanation:
      "Amazon FSx for Windows File Server provides fully managed SMB file shares with native Active Directory integration, NTFS ACLs, and DFS support, so applications keep working unchanged. EFS serves the NFS protocol for Linux workloads, S3 is object storage accessed through APIs, and FSx for Lustre targets high-performance computing rather than Windows file shares.",
  },
  {
    id: 21,
    category: "Networking & Content Delivery",
    question:
      "A company hosts a static marketing website as files in an Amazon S3 bucket. The site must be delivered globally with low latency over HTTPS, and the bucket itself must remain private. Which solution meets these requirements?",
    options: [
      "Enable the S3 website endpoint and make the bucket publicly readable",
      "Use Amazon CloudFront with Origin Access Control to serve the private bucket",
      "Place an Application Load Balancer in front of the S3 bucket",
      "Enable S3 Transfer Acceleration for the bucket",
    ],
    correctAnswers: [1],
    explanation:
      "CloudFront with Origin Access Control lets the distribution fetch objects from the private bucket while users access the content over HTTPS at edge locations worldwide. A public bucket weakens security, an ALB does not cache content at the edge and adds cost without benefit for static files, and Transfer Acceleration accelerates uploads into S3 rather than website delivery.",
  },
  {
    id: 22,
    category: "Application Integration",
    question:
      "Whenever a new image is uploaded to an Amazon S3 bucket, a Lambda function must run within seconds to generate a thumbnail. Which mechanism should a solutions architect use to trigger the function?",
    options: [
      "A CloudWatch alarm that polls bucket size metrics every minute",
      "An S3 event notification configured to invoke the Lambda function",
      "A cron job on an EC2 instance that lists the bucket and calls new objects",
      "An SNS topic that subscribers poll for new objects",
    ],
    correctAnswers: [1],
    explanation:
      "S3 event notifications can invoke a Lambda function directly the moment an object is created, with no polling infrastructure. CloudWatch alarms and cron-based listing introduce delay and waste, and SNS is not a polling mechanism for S3 contents.",
  },
];
