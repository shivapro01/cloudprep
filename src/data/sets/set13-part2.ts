import type { QuizQuestion } from "../questions";

/** Practice Set 13 — questions 803–824 (compute, storage, platform services). Original questions. */
export const set13Part2: QuizQuestion[] = [
  {
    id: 803,
    category: "Compute",
    question:
      "An On-Demand Capacity Reservation held by one account must be usable by several other accounts in the organization when their workloads launch. How is the reservation shared?",
    options: [
      "Shared via AWS Resource Access Manager with the organization or specific accounts",
      "Copied into each account with a Lambda job",
      "Made public through the AMI catalog",
      "Attached to the organization's management account SCP",
    ],
    correctAnswers: [0],
    explanation:
      "Capacity Reservations support sharing through RAM so member accounts consume the reserved capacity when launching matching instances. Copying, public catalog entries, and SCP attachments don't share capacity.",
  },
  {
    id: 804,
    category: "Compute",
    question:
      "Which statement distinguishes EBS-backed AMIs from instance store-backed AMIs?",
    options: [
      "EBS-backed instances boot faster, support stop/start with volume persistence, and can use all instance types; instance store-backed boot from S3-hosted templates with limitations",
      "Instance store-backed AMIs boot faster and support hibernation; EBS-backed do not",
      "Both behave identically except for pricing",
      "EBS-backed AMIs cannot be shared cross-account",
    ],
    correctAnswers: [0],
    explanation:
      "Modern AMIs are EBS-backed: fast boot, persistent volumes across stop/start, full instance type support. Instance store-backed AMIs are legacy with slower boots and operational limits, and EBS-backed AMIs share across accounts routinely.",
  },
  {
    id: 805,
    category: "Networking & Content Delivery",
    question:
      "A single ALB serves three TLS hostnames (shop, api, admin). Only one certificate can be the default. How do the other certificates get selected?",
    options: [
      "Server Name Indication (SNI): the listener holds additional certificates and selects by the client's requested hostname",
      "Separate listeners per certificate on port 443",
      "Wildcards cannot be combined; use one certificate only",
      "Certificates rotate hourly so each hostname gets a turn",
    ],
    correctAnswers: [0],
    explanation:
      "ALB HTTPS listeners support multiple certificates using SNI, matching the client's SNI hostname to the right certificate with one designated default. Extra port-443 listeners aren't possible, and combined hostnames are exactly what SNI enables.",
  },
  {
    id: 806,
    category: "Networking & Content Delivery",
    question:
      "A Network Load Balancer is deployed across three AZs, and clients in one AZ experience latency to targets in another. What governs where NLB connections terminate?",
    options: [
      "NLB assigns per-AZ load balancer IP addresses; without cross-zone load balancing, each AZ's traffic stays on its own zone's targets",
      "NLB concentrates all connections through one central AZ by design",
      "NLB routes per-request across zones always",
      "Latency zones are chosen by Route 53 records alone",
    ],
    correctAnswers: [0],
    explanation:
      "Each NLB node serves its AZ with zonal IPs, and traffic stays in-zone unless cross-zone load balancing is enabled (with its data transfer cost). Central concentration and per-request routing misdescribe NLB's zonal model.",
  },
  {
    id: 807,
    category: "Networking & Content Delivery",
    question:
      "During an outage of the primary API, users should see a friendly maintenance page instead of raw CloudFront error codes. Which CloudFront feature serves custom content per error code?",
    options: [
      "Custom error responses mapping error codes to custom pages and caching times",
      "Origin failover to a maintenance bucket automatically on any 4xx",
      "WAF block response customization only",
      "Behavior-level header rewrites",
    ],
    correctAnswers: [0],
    explanation:
      "Custom error responses define per-error-code pages (and caching TTLs) served to viewers. Origin failover switches to a healthy origin but isn't the custom-page mechanism, WAF customizes block pages for WAF blocks only, and header rewrites don't replace error bodies.",
  },
  {
    id: 808,
    category: "Networking & Content Delivery",
    question:
      "Real-time logs on a very high-traffic distribution would produce overwhelming volume and cost. How is record volume controlled?",
    options: [
      "Configure the real-time log configuration's sampling rate (percentage of requests)",
      "Limit logs to error status codes only via the configuration",
      "Aggregate logs at the edge before streaming",
      "Real-time logs cannot be sampled; use standard logs",
    ],
    correctAnswers: [0],
    explanation:
      "Real-time log configurations include a sampling rate, streaming a chosen percentage of requests to Kinesis to balance visibility and cost. Status-code filtering, edge aggregation, and non-sampling claims misdescribe the feature.",
  },
  {
    id: 809,
    category: "Networking & Content Delivery",
    question:
      "A multiplayer game backend needs Global Accelerator to map tens of thousands of distinct client ports to specific game servers behind the scenes. Which accelerator type supports this port mapping?",
    options: [
      "Custom routing accelerators, mapping listener port ranges to instance ports deterministically",
      "Standard accelerators with weighted endpoint groups",
      "CloudFront behaviors with port forwarding",
      "An NLB with 65,000 listeners",
    ],
    correctAnswers: [0],
    explanation:
      "Custom routing accelerators expose client port ranges and map them deterministically to ports on EC2 instances in target groups — designed for game server fleets. Standard accelerators front fixed ports, and the other options don't provide the mapping model.",
  },
  {
    id: 810,
    category: "Networking & Content Delivery",
    question:
      "A financial firm must use its own public IP address ranges (allowlisted by regulators and partners) for its AWS-hosted services. Which feature brings customer-owned public IPs into AWS?",
    options: [
      "Bring Your Own IP (BYOIP), advertising customer-owned ranges from AWS",
      "Elastic IP address transfers from another AWS account",
      "EC2 address pool requests",
      "Route 53 IP allocation records",
    ],
    correctAnswers: [0],
    explanation:
      "BYOIP lets customers bring publicly routable ranges they own into AWS, so services present the allowlisted addresses. EIP transfers and address pools don't import external ranges, and DNS records don't create address ownership.",
  },
  {
    id: 811,
    category: "Networking & Content Delivery",
    question:
      "Two peered VPCs use overlapping CIDR ranges, so standard peering cannot route between them. Which gateway preserves private connectivity despite overlapping addresses?",
    options: [
      "A private NAT gateway translating overlapping ranges across the peered networks",
      "A public NAT gateway readdressing egress only",
      "A Transit Gateway, which resolves overlapping CIDRs natively",
      "An egress-only internet gateway for the duplicate range",
    ],
    correctAnswers: [0],
    explanation:
      "Private NAT gateways NAT traffic between networks with overlapping space, keeping flows private. Public NAT is for internet egress, Transit Gateway requires non-overlapping CIDRs to route, and egress-only gateways are IPv6 constructs.",
  },
  {
    id: 812,
    category: "Networking & Content Delivery",
    question:
      "An engineer tries to write a security group rule referencing a security group in a peered VPC and finds it unsupported. What is the correct way to allow that peer's instances?",
    options: [
      "Reference the peer's CIDR ranges in the security group rule (or a prefix list of them)",
      "Reference the peer VPC's ID in the security group",
      "Security group references work across peering automatically",
      "Disable rule evaluation for peered traffic",
    ],
    correctAnswers: [0],
    explanation:
      "Security group references don't cross VPC boundaries even when peered; peer CIDRs (ideally via prefix lists) must be used. The VPC ID isn't a rule target, and peering does not extend group references.",
  },
  {
    id: 813,
    category: "Storage",
    question:
      "Hundreds of containers mount one EFS file system, each requiring its own root directory, POSIX identity, and permission boundary without seeing other apps' files. Which EFS feature provides per-app entry points?",
    options: [
      "EFS access points, enforcing per-access-point root directories and POSIX users",
      "Separate EFS file systems per container",
      "Subnet-level mount target isolation",
      "IAM conditions on the file system ARN alone",
    ],
    correctAnswers: [0],
    explanation:
      "Access points create per-application entry points into a shared EFS, enforcing root directory, user/group identity, and permissions per access point. Separate file systems multiply cost, mount targets are network attach points, and file-system-level IAM doesn't create directory boundaries.",
  },
  {
    id: 814,
    category: "Storage",
    question:
      "An enterprise file platform must serve the same dataset over both SMB (Windows, NTFS ACLs) and NFS (Linux, UNIX permissions) with coordinated security styles. Which managed service provides multi-protocol access?",
    options: [
      "Amazon FSx for NetApp ONTAP (or FSx for Windows with SMB focus); ONTAP adds native multi-protocol security styles",
      "Amazon FSx for Lustre",
      "Amazon EFS with dual stack",
      "S3 with both protocols enabled",
    ],
    correctAnswers: [0],
    explanation:
      "FSx for ONTAP serves SMB and NFS simultaneously with NetApp's security-style coordination between NTFS and UNIX permissions. Lustre is HPC POSIX-only, EFS is NFS-only, and S3 is object storage.",
  },
  {
    id: 815,
    category: "Management & Governance",
    question:
      "An S3 backup copy must support point-in-time restoration of objects to any second within the last 30 days, similar to database PITR. Which AWS Backup capability provides continuous backup for S3?",
    options: [
      "AWS Backup continuous backup mode for S3, enabling point-in-time recovery",
      "S3 Versioning alone, listing every version",
      "Cross-Region Replication with hourly schedules",
      "Storage Lens with version counts",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Backup supports continuous backups for S3, enabling restore to a chosen point in time within the retention window. Versioning records versions but doesn't offer point-in-time restore tooling, and replication or metrics aren't recovery mechanisms.",
  },
  {
    id: 816,
    category: "Management & Governance",
    question:
      "Backup policy administration must be centralized: a security account defines backup plans that member accounts inherit automatically, without each team creating plans. Which AWS Backup feature provides organization-wide policy inheritance?",
    options: [
      "AWS Backup policies (delegated administration across the organization)",
      "Per-account backup plans copied via StackSets",
      "Lifecycle rules inherited from S3",
      "A Lambda sweep enforcing plans weekly",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Backup policies (with delegated administration) let a central account define backup plans that member accounts inherit and cannot easily skip. Copied plans drift, S3 lifecycles are service-specific, and sweeps are reactive.",
  },
  {
    id: 817,
    category: "Migration & Transfer",
    question:
      "An Elastic Disaster Recovery staging area must sustain thousands of replicating servers with enough network throughput and disk for the replication stream, while keeping costs contained. What governs staging area sizing?",
    options: [
      "The number and size of replication servers, which scale with the replication volume; automated the right-sizing by DRS",
      "A fixed single t3.micro replication server regardless of fleet size",
      "The number of recovery instances launched at failover",
      "The source servers' vCPU count only",
    ],
    correctAnswers: [0],
    explanation:
      "DRS's staging area holds lightweight replication servers whose count scales with incoming replication load — DRS manages this automatically to sustain the stream. A single fixed server bottlenecks, failover instances exist only post-cutover, and source vCPU alone doesn't determine staging needs.",
  },
  {
    id: 818,
    category: "Compute",
    question:
      "A Beanstalk application pairs a web tier with an asynchronous background-processing tier consuming SQS messages, scaled on queue depth. Which Beanstalk environment type runs the consumer tier?",
    options: [
      "A worker environment tier with the SQS daemon",
      "A second web server environment polling manually",
      "A Lambda environment type (not offered by Beanstalk)",
      "The same web tier with a cron script",
    ],
    correctAnswers: [0],
    explanation:
      "Worker environment tiers run a daemon that pulls SQS messages and POSTs them to the application, scaling on queue metrics. Web tiers serve HTTP, Lambda isn't a Beanstalk tier, and cron polling is a manual approximation.",
  },
  {
    id: 819,
    category: "Compute",
    question:
      "Elastic Beanstalk platform updates (patched AMIs and runtimes) should apply automatically during maintenance windows without changing the platform version. Which setting enables this?",
    options: [
      "Managed platform updates with a maintenance window",
      "Manual environment rebuilds each quarter",
      "Immutable deployments on every push",
      "Disabling managed updates and patching AMIs by hand",
    ],
    correctAnswers: [0],
    explanation:
      "Managed platform updates apply patch-level platform updates automatically in the configured window, keeping instances patched. Manual rebuilds, deployment-triggered changes, and hand patching reintroduce toil.",
  },
  {
    id: 820,
    category: "Compute",
    question:
      "A frontend team wants every pull request to produce a live preview URL of the built app for review, discarded when merged. Which Amplify capability does this?",
    options: [
      "Amplify branch previews with auto-generated URLs per branch/PR",
      "Manual S3 uploads per review",
      "CloudFront invalidations on a staging bucket",
      "CodeBuild artifacts emailed to reviewers",
    ],
    correctAnswers: [0],
    explanation:
      "Amplify Hosting builds and hosts preview deployments per branch or PR automatically, cleaning them up when merged. Manual uploads, staging invalidations, and emailed artifacts lack the lifecycle automation.",
  },
  {
    id: 821,
    category: "Compute",
    question:
      "An App Runner service must reach an RDS database inside a VPC while remaining an fully managed source-to-service platform. Which App Runner feature provides VPC access?",
    options: [
      "An App Runner VPC connector (ENI-based) linked to the service",
      "Placing App Runner inside the VPC by changing its network mode",
      "A peering connection from the service's default VPC",
      "Public internet access to the database endpoint",
    ],
    correctAnswers: [0],
    explanation:
      "VPC connectors attach App Runner services to customer VPCs via managed ENIs, reaching private resources. App Runner services don't run inside customer VPCs directly, peering doesn't apply, and public databases defeat the purpose.",
  },
  {
    id: 822,
    category: "Compute",
    question:
      "An AWS Batch job portfolio mixes short CPU-light jobs and long GPU jobs. Which compute environment pairing fits each?",
    options: [
      "Fargate compute environments for short CPU-light jobs; EC2 (GPU instance) environments for GPU jobs",
      "Fargate for both, since Fargate supports GPUs",
      "EC2 Spot for both, since Spot has GPUs",
      "Lambda environments for short jobs and Fargate for GPU",
    ],
    correctAnswers: [0],
    explanation:
      "Batch runs on Fargate (serverless, good for short CPU jobs) and EC2 environments (needed for GPU instance types). Fargate doesn't provide GPUs, Spot doesn't guarantee GPU availability, and Lambda isn't a Batch compute environment.",
  },
  {
    id: 823,
    category: "Compute",
    question:
      "A hardened AMI built by Image Builder must distribute automatically to multiple accounts and Regions with test validation before release. Which Image Builder component defines build tests and distribution targets?",
    options: [
      "The distribution configuration (with test instances) and infrastructure configuration of the pipeline",
      "The recipe's component list alone",
      "ECR repository policies",
      "A CloudFormation StackSet with AMI IDs",
    ],
    correctAnswers: [0],
    explanation:
      "Distribution configurations carry the AMI to target accounts and Regions, while pipeline test instances validate builds before release. Recipes define what's installed, ECR stores containers, and StackSets would need hardcoded IDs.",
  },
  {
    id: 824,
    category: "Cost Optimization",
    question:
      "Which two ECS choices directly reduce container compute cost for interruptible and spiky workloads? (Select TWO.)",
    options: [
      "Fargate Spot capacity providers for interruptible tasks",
      "Cluster auto scaling with binpack placement on the EC2 launch type to raise utilization",
      "Doubling task CPU reservations for faster completion",
      "Running one large task per instance for isolation",
      "Always-on ECS clusters in three Regions",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Fargate Spot discounts interruptible tasks, and dense binpack placement on EC2 raises utilization per dollar. Doubling reservations increases billed capacity, one-task-per-instance lowers density, and multi-Region always-on multiplies spend.",
  },
];
