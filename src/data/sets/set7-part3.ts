import type { QuizQuestion } from "../questions";

/** Practice Set 7 — questions 435–455 (analytics, AI services, EC2 and security nuances). Original questions. */
export const set7Part3: QuizQuestion[] = [
  {
    id: 435,
    category: "Analytics",
    question:
      "Business users need self-service dashboards and visualizations over Redshift and Athena data sources, with row-level security and no infrastructure to manage. Which service fits?",
    options: [
      "Amazon QuickSight",
      "Amazon Athena workgroups",
      "AWS Glue Studio",
      "Amazon OpenSearch Dashboards",
    ],
    correctAnswers: [0],
    explanation:
      "QuickSight is the managed BI service connecting to Redshift, Athena, RDS, and more, with SPICE in-memory caching and row-level security. Athena runs queries, Glue builds pipelines, and OpenSearch Dashboards serves its own engine.",
  },
  {
    id: 436,
    category: "Analytics",
    question:
      "A data lake on S3 must have tables automatically discovered and registered (with schema and partitions) so Athena and Redshift Spectrum can query them, refreshed as new data arrives. Which component provides the catalog?",
    options: [
      "AWS Glue Data Catalog with crawlers",
      "S3 Inventory reports",
      "Amazon DataZone",
      "Redshift external schema only",
    ],
    correctAnswers: [0],
    explanation:
      "Glue crawlers scan S3 data and populate the Glue Data Catalog with tables and partitions that Athena, Spectrum, EMR, and others consume. Inventory lists objects without schema, DataZone is a data governance portal, and a lone external schema doesn't discover data.",
  },
  {
    id: 437,
    category: "Analytics",
    question:
      "A data science team runs Spark and Hadoop workloads on clusters of hundreds of nodes for a few hours per day, wanting Spot nodes for task capacity and quick cluster spin-up with pre-installed frameworks. Which service fits?",
    options: [
      "Amazon EMR",
      "AWS Lambda with Docker images",
      "Amazon ECS on EC2",
      "Amazon Redshift",
    ],
    correctAnswers: [0],
    explanation:
      "EMR provides managed Hadoop/Spark clusters with instance fleets (including Spot task nodes) and fast provisioning. Lambda doesn't run cluster frameworks, ECS requires assembling the stack, and Redshift is SQL warehousing.",
  },
  {
    id: 438,
    category: "Compute",
    question:
      "A user-generated content platform must automatically detect and flag explicit or unsafe images before they are published. Which managed service performs content moderation without training custom models?",
    options: [
      "Amazon Rekognition content moderation",
      "Amazon Comprehend",
      "Amazon Textract",
      "Amazon Polly",
    ],
    correctAnswers: [0],
    explanation:
      "Rekognition's moderation APIs detect explicit and suggestive adult content in images and videos with pre-trained models. Comprehend handles text insights, Textract extracts documents, and Polly synthesizes speech.",
  },
  {
    id: 439,
    category: "Compute",
    question:
      "A call center platform must convert thousands of recorded calls to searchable text with speaker identification. Which managed service performs the transcription?",
    options: [
      "Amazon Transcribe",
      "Amazon Polly",
      "Amazon Translate",
      "Amazon Comprehend",
    ],
    correctAnswers: [0],
    explanation:
      "Transcribe converts speech to text with speaker diarization and custom vocabularies. Polly is text-to-speech, Translate converts languages, and Comprehend analyzes text that already exists.",
  },
  {
    id: 440,
    category: "Compute",
    question:
      "A video platform transcodes uploaded videos into multiple formats and resolutions with captions overlay — broadcast-grade processing, fully managed. Which service fits?",
    options: [
      "Amazon Elastic Transcoder",
      "AWS Elemental MediaConvert",
      "AWS Elemental MediaLive",
      "Amazon Kinesis Video Streams",
    ],
    correctAnswers: [1],
    explanation:
      "MediaConvert is the current managed file-based transcoding service with advanced features; Elastic Transcoder is the legacy predecessor. MediaLive handles live broadcasting, and Kinesis Video Streams ingests device streams rather than transcoding files.",
  },
  {
    id: 441,
    category: "Analytics",
    question:
      "Millions of connected cameras stream video to AWS for real-time frame analysis and playback. Which service ingests and stores streaming video for such processing?",
    options: [
      "Amazon Kinesis Video Streams",
      "Amazon Kinesis Data Streams",
      "AWS Elemental MediaStore",
      "Amazon S3 Transfer Acceleration",
    ],
    correctAnswers: [0],
    explanation:
      "Kinesis Video Streams ingests, stores, and enables processing of device video streams. Data Streams carries data records rather than media, MediaStore serves live-origin video delivery, and Transfer Acceleration accelerates S3 uploads.",
  },
  {
    id: 442,
    category: "Application Integration",
    question:
      "A manufacturer connects millions of IoT devices that publish telemetry over MQTT and must trigger downstream processing per message type with minimal latency. Which managed service ingests and routes these device messages?",
    options: [
      "AWS IoT Core with its rules engine routing to targets like DynamoDB and Lambda",
      "Amazon MQ with MQTT bridges",
      "Kinesis Data Firehose with device SDKs",
      "API Gateway WebSocket APIs",
    ],
    correctAnswers: [0],
    explanation:
      "IoT Core is the managed MQTT broker for massive device fleets, and its rules engine routes messages to services based on conditions. MQ hosts traditional brokers, Firehose delivers streams to storage rather than brokering devices, and WebSocket APIs target browser clients.",
  },
  {
    id: 443,
    category: "Security",
    question:
      "For a new public web application, security requires layer 7 rule-based filtering, automatic layer 3/4 volumetric attack absorption with 24/7 response support, and TLS at the edge. Which service combination at the edge meets all three?",
    options: [
      "CloudFront with ACM TLS, AWS WAF web ACL, and AWS Shield Advanced",
      "ALB with security groups and Network Firewall",
      "Route 53 with DNSSEC and GuardDuty",
      "Global Accelerator with Shield Standard and Inspector",
    ],
    correctAnswers: [0],
    explanation:
      "This is the canonical edge stack: CloudFront plus ACM for TLS, WAF for layer 7 rules, and Shield Advanced for DDoS absorption with the response team. The alternatives scatter these functions or drop advanced DDoS support.",
  },
  {
    id: 444,
    category: "Networking & Content Delivery",
    question:
      "An internal application's health must be monitored by Route 53, but the endpoint is private (no public reachability) for the health checkers. How can Route 53 health check it?",
    options: [
      "Create a Route 53 health checker within the VPC (private health checks) probing the private IP",
      "Expose the endpoint publicly with a security group allow list",
      "Use a CloudWatch alarm as a substitute; Route 53 cannot check private endpoints",
      "Point the health check at the instance's public DNS name",
    ],
    correctAnswers: [0],
    explanation:
      "Route 53 supports health checkers that run inside a VPC specifically to probe private endpoints over internal networking. Public exposure defeats the security posture, and CloudWatch alarms don't drive DNS health without workarounds.",
  },
  {
    id: 445,
    category: "Security",
    question:
      "When a user confirms signup in a Cognito user pool, a Lambda must copy the user profile into a CRM database before the user can proceed. Which Cognito mechanism invokes this logic?",
    options: [
      "A Cognito user pool Lambda trigger, such as Post confirmation",
      "An EventBridge rule on console sign-in events",
      "An IAM role attached to the user pool",
      "A CloudWatch alarm on SignUpCount",
    ],
    correctAnswers: [0],
    explanation:
      "User pools support Lambda triggers at lifecycle points; Post confirmation runs synchronously right after signup confirmation. EventBridge sees authentication events asynchronously, IAM roles grant the pool permissions, and alarms observe metrics.",
  },
  {
    id: 446,
    category: "Security",
    question:
      "A customer-facing web application must let enterprise users sign in with their corporate SAML 2.0 identity provider, while regular users use email and password — both through the same managed user directory. Which design fits?",
    options: [
      "A Cognito user pool federated with the corporate SAML IdP alongside native directory users",
      "IAM Identity Center with SAML only",
      "Two separate Cognito user pools merged by a custom Lambda",
      "A self-hosted Keycloak on EC2 federating both",
    ],
    correctAnswers: [0],
    explanation:
      "One Cognito user pool can host native users and federate enterprise identities via SAML, presenting a single app-facing directory. Identity Center targets workforce AWS access, dual pools complicate the app, and self-hosting abandons the managed service.",
  },
  {
    id: 447,
    category: "Security",
    question:
      "A company's mobile app authenticates users through a third-party OIDC provider and must receive temporary AWS credentials without any AWS-hosted user directory. Which access pattern applies?",
    options: [
      "AssumeRoleWithWebIdentity federation into an IAM role",
      "Create an IAM user per app user with generated keys",
      "Use the Cognito hosted UI without identity pools",
      "Embed a cross-account role ARN and keys in the app bundle",
    ],
    correctAnswers: [0],
    explanation:
      "AssumeRoleWithWebIdentity exchanges a trusted OIDC token for scoped temporary role credentials — no AWS user directory required. Per-user IAM users and embedded keys violate security fundamentals, and the hosted UI concerns sign-in flows rather than credential brokering.",
  },
  {
    id: 448,
    category: "Management & Governance",
    question:
      "A platform team wants to publish pre-approved, governed architectures (a standard three-tier web stack) that other teams can launch self-service with guardrails. Which service provides this catalog experience?",
    options: [
      "AWS Service Catalog with products and portfolios",
      "AWS Marketplace subscriptions",
      "CloudFormation templates in S3 with links",
      "AWS Proton",
    ],
    correctAnswers: [0],
    explanation:
      "Service Catalog packages approved CloudFormation products into portfolios with permissions, constraints, and versioning for governed self-service. Marketplace is third-party software, raw template links have no guardrails, and Proton targets container/serverless templates specifically.",
  },
  {
    id: 449,
    category: "Security",
    question:
      "A security baseline requires that EC2 instance metadata is only accessible through session-token-based requests (IMDSv2), blocking SSRF-style reads. Where is this enforced?",
    options: [
      "The instance's metadata options, set to require IMDSv2 with a token hop limit",
      "An SCP denying IMDSv1 usage account-wide",
      "The instance profile's trust policy",
      "A security group rule filtering the link-local address",
    ],
    correctAnswers: [0],
    explanation:
      "Instance metadata options enforce IMDSv2 (HttpTokens=required) and control the hop limit per instance or AMI/launch template. SCPs cannot inspect request mechanics, trust policies govern role assumption, and security groups don't filter the local metadata address.",
  },
  {
    id: 450,
    category: "Storage",
    question:
      "A database's four EBS volumes must be restorable after an AZ loss with near-instant first-read performance — no cold-start latency while data warms from the snapshot. Which feature pre-provisions this?",
    options: [
      "EBS Fast Snapshot Restore (FSR) for those snapshots in the AZ",
      "Snapshot archive tier",
      "Multi-Attach io2 volumes",
      "EBS elastic volumes modification",
    ],
    correctAnswers: [0],
    explanation:
      "FSR pre-warms snapshots in specified AZs so volumes created from them deliver full performance immediately, at per-AZ pricing. Archive tier trades restore speed for cost, Multi-Attach shares live volumes, and elastic modification resizes existing volumes.",
  },
  {
    id: 451,
    category: "Compute",
    question:
      "An operator stops an EC2 instance to save costs, then restarts it the next day. Which statement about data persistence is correct?",
    options: [
      "EBS volumes persist; instance store volumes are lost when the instance stops",
      "Both EBS and instance store volumes persist across stop/start",
      "EBS volumes are lost; instance store persists",
      "Both are lost; only hibernation preserves storage",
    ],
    correctAnswers: [0],
    explanation:
      "EBS is network-attached and durable across stop/start; instance store is physically attached ephemeral disk cleared on stop (and on certain failures). The inverse claims and the hibernation note misstate the model.",
  },
  {
    id: 452,
    category: "Compute",
    question:
      "An engineer wants a cluster placement group for an HPC job, but the job's instances must also span three Availability Zones for resilience. What is the correct guidance?",
    options: [
      "Cluster placement groups cannot span AZs; choose spread or partition placement for multi-AZ topologies",
      "Cluster placement groups span AZs by default",
      "Enable cross-zone load balancing on the cluster group",
      "Create three cluster placement groups and merge them into one logical group",
    ],
    correctAnswers: [0],
    explanation:
      "Cluster placement groups are confined to a single AZ to achieve their low-latency placement; multi-AZ resilience requires spread or partition strategies. The other options describe non-existent capabilities.",
  },
  {
    id: 453,
    category: "Compute",
    question:
      "Which two features prevent an EC2 workload's instances from being terminated unintentionally? (Select TWO.)",
    options: [
      "EC2 termination protection (disableApiTermination) on standalone instances",
      "Scale-in protection for members of Auto Scaling groups",
      "Enabling detailed monitoring",
      "Attaching an IAM role with ec2:StartInstances",
      "Placing instances in a cluster placement group",
    ],
    correctAnswers: [0, 1],
    explanation:
      "disableApiTermination blocks DeleteTermination API calls for standalone instances, and scale-in protection exempts ASG members from scale-in termination. Monitoring observes, start permissions don't block deletion, and placement groups affect hardware topology.",
  },
  {
    id: 454,
    category: "Compute",
    question:
      "A legacy monolith requires a custom hardened OS image, persistent local NFS mounts, and process-level tuning unavailable in managed runtimes. It runs continuously with steady traffic. Which compute option is the appropriate choice?",
    options: [
      "AWS Lambda",
      "Amazon EC2 with the custom AMI",
      "AWS Fargate for every process",
      "Amazon Lightsail databases",
    ],
    correctAnswers: [1],
    explanation:
      "Full OS customization, persistent attachments, and process tuning map directly to EC2 with a custom AMI. Lambda's environment is managed and time-limited, Fargate abstracts the OS away, and Lightsail databases are a managed data product.",
  },
  {
    id: 455,
    category: "Networking & Content Delivery",
    question:
      "A global static website with occasional API calls must be served securely: private S3 origin, HTTPS, protection from common web exploits, and low latency worldwide. Which architecture assembles the standard pattern?",
    options: [
      "S3 with public website hosting and a WAF directly attached",
      "CloudFront with Origin Access Control to a private S3 bucket, ACM certificate, and an AWS WAF web ACL on the distribution",
      "ALB in public subnets serving S3 through a Lambda layer",
      "Route 53 failover between two public S3 website endpoints",
    ],
    correctAnswers: [1],
    explanation:
      "The canonical secure static architecture pairs CloudFront with OAC (bucket stays private), an ACM certificate for HTTPS, and WAF for exploit filtering. Public S3 hosting removes the private-origin control, ALBs don't serve object storage as origins in this pattern, and DNS failover between public buckets drops both TLS-at-edge and WAF.",
  },
];
