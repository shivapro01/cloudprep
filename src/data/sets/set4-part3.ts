import type { QuizQuestion } from "../questions";

/** Practice Set 4 — questions 240–260 (compute, performance, cost). Original questions. */
export const set4Part3: QuizQuestion[] = [
  {
    id: 240,
    category: "Compute",
    question:
      "An HPC application runs across tightly coupled instances and needs the lowest possible inter-node network latency with throughput up to 100 Gbps. Which EC2 placement strategy should be used?",
    options: [
      "Cluster placement group",
      "Spread placement group",
      "Partition placement group",
      "No placement group; enable enhanced networking per instance",
    ],
    correctAnswers: [0],
    explanation:
      "Cluster placement groups pack instances close together on the same underlying hardware group for the lowest latency and highest inter-node bandwidth. Spread maximizes isolation, partition groups balance topology awareness for distributed systems, and enhanced networking alone does not deliver placement-level proximity.",
  },
  {
    id: 241,
    category: "Compute",
    question:
      "A large Cassandra cluster should spread across distinct underlying racks while letting each rack host several nodes, so a single hardware failure affects only one partition of the ring. Which placement strategy fits?",
    options: [
      "Cluster placement group",
      "Spread placement group",
      "Partition placement group",
      "Dedicated Host placement",
    ],
    correctAnswers: [2],
    explanation:
      "Partition placement groups isolate each partition on distinct underlying hardware, and big data frameworks use the partition index as a topology hint. Cluster groups maximize proximity instead of isolation, and spread groups limit each group to a small number of instances on distinct hardware — too restrictive for a large cluster.",
  },
  {
    id: 242,
    category: "Compute",
    question:
      "Three critical instances — a license server, a primary database, and an authentication node — must be placed so that no two ever share the same underlying hardware failure domain. Which placement strategy fits?",
    options: [
      "Cluster placement group",
      "Spread placement group",
      "Partition placement group with one partition",
      "Default placement with separate subnets",
    ],
    correctAnswers: [1],
    explanation:
      "Spread placement groups place each instance on distinct underlying hardware, ideal for a small set of critical, independent instances. Cluster groups colocate by design, one partition provides no isolation, and subnets change networking, not hardware placement.",
  },
  {
    id: 243,
    category: "Compute",
    question:
      "A development instance holds a large in-memory IDE workspace. Developers stop it nightly and want the RAM-resident workspace available within a minute of restarting, rather than reloading for 20 minutes. Which EC2 feature does this?",
    options: [
      "EBS fast snapshot restore",
      "EC2 hibernation",
      "Instance store persistence",
      "Elastic IP reassociation",
    ],
    correctAnswers: [1],
    explanation:
      "Hibernation writes RAM contents to the EBS root volume on stop and reloads it on start, resuming the instance with its memory state intact. FSR accelerates volume creation from snapshots, instance store does not persist, and Elastic IPs only fix addressing.",
  },
  {
    id: 244,
    category: "Compute",
    question:
      "A company licenses enterprise software per physical socket and must run it on AWS while satisfying the license terms and retaining visibility of core counts. Which EC2 tenancy option fits?",
    options: [
      "Shared tenancy with license-included AMIs",
      "Dedicated Hosts",
      "Dedicated Instances",
      "Spot Instances with placement groups",
    ],
    correctAnswers: [1],
    explanation:
      "Dedicated Hosts give visibility and control of physical sockets and cores, satisfying per-socket or per-core bring-your-own-license models. License-included AMIs apply to vendor-included pricing, Dedicated Instances isolate hardware but without socket-level control or affinity, and Spot is irrelevant to licensing.",
  },
  {
    id: 245,
    category: "Compute",
    question:
      "A configuration agent on each instance must read its instance ID, IAM role name, and Availability Zone at runtime, without calling AWS APIs and without SSH access. Where should it read from?",
    options: [
      "The instance metadata service (using IMDSv2 with a token request)",
      "CloudTrail event history for RunInstances",
      "The launch template's user data only",
      "An S3 object written at instance launch",
    ],
    correctAnswers: [0],
    explanation:
      "Instance metadata is served locally on the link-local address and includes identity, networking, and role details; IMDSv2 requires a session token, hardening it against SSRF. CloudTrail, user data, and external files are indirect and stale-prone.",
  },
  {
    id: 246,
    category: "Networking & Content Delivery",
    question:
      "A global website must execute custom A/B-testing logic that inspects the request, calls an external service, and rewrites the URL before CloudFront fetches from origin. The logic is too heavy for CloudFront Functions. Where should it run?",
    options: [
      "A Lambda@Edge function on the viewer request event",
      "An origin response Lambda function",
      "API Gateway in front of the origin",
      "A WAF rule with a custom body inspection",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda@Edge handles heavier logic on viewer request events — including URL rewriting before origin fetch — where CloudFront Functions' lightweight model is insufficient. Origin response runs after the origin replies, API Gateway is not in the CloudFront path, and WAF matches rules rather than transforming requests.",
  },
  {
    id: 247,
    category: "Networking & Content Delivery",
    question:
      "A paid video course is served through CloudFront from private S3 content. Thousands of lesson files must be accessible to a signed-in subscriber without generating URLs per file. What should be used?",
    options: [
      "CloudFront signed URLs generated for each lesson on demand",
      "CloudFront signed cookies issued once at login, unlocking the content path",
      "Origin Access Control alone, since it blocks anonymous access",
      "A WAF rule allowing logged-in user agents",
    ],
    correctAnswers: [1],
    explanation:
      "Signed cookies authorize access to many files for a period after a single authenticated login, avoiding per-file URL generation. Signed URLs work per object, OAC only controls origin access rather than end-user authorization, and WAF does not understand application sessions.",
  },
  {
    id: 248,
    category: "Compute",
    question:
      "A CI pipeline pulls many public images from Docker Hub and keeps hitting Docker Hub's rate limits, slowing builds. Which ECR feature reduces both external dependency and rate-limit exposure?",
    options: [
      "ECR pull-through cache rules for upstream registries",
      "ECR replication to a second Region",
      "ECR image scanning on push",
      "Switching the pipeline to pull images over HTTPS manually",
    ],
    correctAnswers: [0],
    explanation:
      "Pull-through cache rules proxy and cache upstream public registries through ECR, so repeated pulls come from AWS-side storage and rate limits stop affecting builds. Replication duplicates your own images, scanning finds CVEs, and manual pulls keep the same upstream limits.",
  },
  {
    id: 249,
    category: "Cost Optimization",
    question:
      "A compliance team keeps hundreds of EBS snapshots older than 90 days that are almost never restored. Storage cost must drop, accepting slower restore times for those old copies. Which feature fits?",
    options: [
      "EBS snapshot archive tier",
      "Fast Snapshot Restore for old snapshots",
      "Converting snapshots into AMIs",
      "Deleting snapshots and relying on current volumes",
    ],
    correctAnswers: [0],
    explanation:
      "The archive tier stores snapshots that have not been touched for 90+ days at a much lower price, with slower retrieval matching the requirement. FSR speeds restores at extra cost, AMIs package instances rather than archiving storage, and deletion loses compliance history.",
  },
  {
    id: 250,
    category: "Management & Governance",
    question:
      "An organization wants machine-learning-based recommendations to downsize over-provisioned EC2 instances, Lambda functions, and EBS volumes across accounts. Which service produces these recommendations?",
    options: [
      "AWS Compute Optimizer",
      "AWS Trusted Advisor performance checks",
      "Amazon CloudWatch anomaly detection",
      "AWS Config advanced queries",
    ],
    correctAnswers: [0],
    explanation:
      "Compute Optimizer applies ML to utilization telemetry and recommends optimal EC2 types, Lambda memory settings, and EBS configurations. Trusted Advisor checks broad best practices, anomaly detection flags metric deviations, and Config evaluates configuration rules.",
  },
  {
    id: 251,
    category: "Cost Optimization",
    question:
      "A sales engineer must produce a defensible monthly cost estimate for a proposed three-tier architecture before the customer commits. Which tool is designed for this estimate?",
    options: [
      "AWS Pricing Calculator",
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Billing Conductor",
    ],
    correctAnswers: [0],
    explanation:
      "The Pricing Calculator models planned architectures (compute, storage, networking) and exports estimates without an AWS account. Cost Explorer analyzes actual historical spend, Budgets alerts on thresholds, and Billing Conductor customizes billing views.",
  },
  {
    id: 252,
    category: "Management & Governance",
    question:
      "Finance requires that every resource carry Environment and CostCenter tags, and that reported spend rolls up by business-defined groupings regardless of raw tags. Which pair of tools enforces and organizes this?",
    options: [
      "Tag policies for enforcement and Cost Categories for roll-up groupings",
      "Config rules for tagging and Cost Explorer for forecasting",
      "SCPs denying untagged resource creation and Cost and Usage Reports only",
      "Trusted Advisor cost checks and Budgets actions",
    ],
    correctAnswers: [0],
    explanation:
      "Tag policies standardize required tags organization-wide, and Cost Categories map resources into business-meaningful cost groupings for reporting. Config can detect untagged resources but the pairing asked for governance-plus-rollup; SCPs cannot validate tag values robustly; Cost Explorer forecasts rather than remaps.",
  },
  {
    id: 253,
    category: "Cost Optimization",
    question:
      "A company operates 25 accounts. Leadership wants each account to pay its own spend while the organization qualifies for combined volume pricing tiers. Which feature provides this?",
    options: [
      "Consolidated billing through AWS Organizations",
      "Individual invoices consolidated manually each month",
      "Sharing Reserved Instances through IAM roles",
      "Resource sharing via Resource Access Manager",
    ],
    correctAnswers: [0],
    explanation:
      "Consolidated billing aggregates usage across member accounts, letting volume discounts and RI/Savings Plan sharing apply organization-wide, while each account still sees its own costs. Manual consolidation loses tier benefits, reservations share automatically under consolidated billing rather than via IAM, and RAM shares resources, not billing.",
  },
  {
    id: 254,
    category: "Management & Governance",
    question:
      "An auditor requires shell access to production instances that leaves no SSH keys on machines, no bastion host, and a full session log. Which capability fits?",
    options: [
      "AWS Systems Manager Session Manager over the SSM agent",
      "A hardened bastion host with key rotation",
      "EC2 Instance Connect with temporary keys",
      "SSH tunnels through the ALB",
    ],
    correctAnswers: [0],
    explanation:
      "Session Manager provides browser/CLI shells through the SSM agent with IAM authorization, no inbound ports, no key management, and CloudTrail/CloudWatch session logging. Bastions reintroduce key management and exposure, Instance Connect still uses SSH with temporary keys, and ALBs do not tunnel SSH.",
  },
  {
    id: 255,
    category: "Management & Governance",
    question:
      "A launch fails with an error indicating the account has reached its running On-Demand vCPU limit in the Region. What should the team do to proceed?",
    options: [
      "Request a service quota increase through Service Quotas",
      "Switch to Spot Instances, which ignore vCPU quotas",
      "Create the instances in a different VPC",
      "Use the root account to bypass the limit",
    ],
    correctAnswers: [0],
    explanation:
      "Service Quotas manages Regional limits such as running On-Demand vCPUs; a requested increase unlocks launches. Spot has its own separate quota and is not a guaranteed path, VPC choice is irrelevant, and root is subject to the same quotas.",
  },
  {
    id: 256,
    category: "Compute",
    question:
      "A distributed rendering engine runs on Spot capacity. Which pair of design practices makes it interruption-resilient? (Select TWO.)",
    options: [
      "Checkpoint job state to durable storage such as S3 so work resumes after interruption",
      "Diversify across multiple Spot capacity pools (instance types and AZs)",
      "Request an SLA guarantee from Spot capacity",
      "Use a single instance type to keep images consistent",
      "Set instance-initiated shutdown behavior to stop",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Spot tolerates interruption when state is checkpointed externally and capacity is spread across pools so a single pool's price spike or reclamation does not stop the job. Spot has no availability SLA, single-pool concentration raises interruption risk, and shutdown behavior concerns EBS-backed stops, not interruption handling.",
  },
  {
    id: 257,
    category: "Compute",
    question:
      "An ECS service's task count must scale automatically to keep average ALB request count per task at 500. Which mechanism implements this natively?",
    options: [
      "ECS service auto scaling with target tracking on ALBRequestCountPerTarget",
      "A Step Functions workflow resizing the service hourly",
      "CloudWatch alarm on cluster CPU invoking ecs:UpdateService manually",
      "Capacity provider with managed scaling only",
    ],
    correctAnswers: [0],
    explanation:
      "ECS service auto scaling supports target tracking on ALBRequestCountPerTarget, adjusting desired task count like an ASG does for EC2. Scheduled resizing, hand-built alarms, and capacity provider scaling address cluster capacity rather than the service's task-count target.",
  },
  {
    id: 258,
    category: "Compute",
    question:
      "An infrastructure team maintains instance launch definitions for dozens of Auto Scaling groups. They want versioned definitions, support for every launch feature, and safe reuse across groups and accounts. What should they standardize on?",
    options: [
      "Launch configurations stored in S3",
      "EC2 launch templates with versioning",
      "AMIs with embedded user data only",
      "CloudFormation parameters on each group",
    ],
    correctAnswers: [1],
    explanation:
      "Launch templates are versioned, support the full set of launch parameters (including Spot and mixed instance policies), and are the recommended replacement for launch configurations. Launch configurations are legacy, immutable, and feature-limited.",
  },
  {
    id: 259,
    category: "Compute",
    question:
      "Which two statements describe benefits of AWS Fargate? (Select TWO.)",
    options: [
      "No underlying instances to provision, patch, or scale",
      "Billing is per vCPU and memory resource used by tasks, per second",
      "Full root access to the underlying host for tuning",
      "Ability to run any licensed AMI on the host",
      "Automatic conversion of Lambda functions into containers",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Fargate removes host management entirely and bills for the task's requested CPU and memory per second. It does not grant host access or AMI choice (that is the EC2 launch type), and it has nothing to do with converting Lambda functions.",
  },
  {
    id: 260,
    category: "Networking & Content Delivery",
    question:
      "One Application Load Balancer serves api.example.com and admin.example.com, routing each hostname to a different target group. How should listeners be configured?",
    options: [
      "Two separate load balancers with Route 53 failover records",
      "Listener rules with host-header conditions mapping each domain to its target group",
      "Path-based routing rules differentiating the domains by prefix",
      "Separate target groups per Availability Zone with cross-zone routing",
    ],
    correctAnswers: [1],
    explanation:
      "ALB listener rules match host-header (and path) conditions and forward to distinct target groups, supporting multiple domains on one load balancer. Failover records do not route by hostname within one listener, path rules solve path routing, and AZ grouping is not a routing dimension.",
  },
];
