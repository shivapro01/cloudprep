import type { QuizQuestion } from "../questions";

/** Practice Set 12 — questions 760–780 (network design, containers, messaging). Original questions. */
export const set12Part3: QuizQuestion[] = [
  {
    id: 760,
    category: "Networking & Content Delivery",
    question:
      "A VPC's primary CIDR is exhausted and existing subnets cannot expand further. New subnets with additional address space are required without recreating the VPC. What should be done?",
    options: [
      "Associate additional IPv4 CIDR blocks (secondary CIDRs) with the VPC, then create subnets from the new ranges",
      "Delete and recreate the VPC with a larger CIDR",
      "Enable IPv6 and abandon IPv4 capacity",
      "Resize existing subnets in place to overlap",
    ],
    correctAnswers: [0],
    explanation:
      "VPCs accept additional secondary CIDR associations; new subnets draw from the added ranges without touching existing resources. Recreating the VPC is disruptive and unnecessary, IPv6 doesn't supply IPv4 capacity, and subnets cannot resize in place.",
  },
  {
    id: 761,
    category: "Networking & Content Delivery",
    question:
      "A new production deployment starts in the account's default VPC. A solutions architect recommends moving to a custom VPC. What is the strongest justification?",
    options: [
      "Default VPCs have a predictable but inflexible design (public subnets everywhere, one AZ layout) and don't express intentional segmentation; custom VPCs define subnets, routes, and gateways deliberately",
      "Default VPCs cost more per hour than custom VPCs",
      "Resources cannot launch into default VPCs at scale",
      "Default VPCs don't support security groups",
    ],
    correctAnswers: [0],
    explanation:
      "The default VPC is a convenience scaffold — everything has public addressing and little intentional design — while custom VPCs encode deliberate architecture. Pricing, launchability, and security group support are equivalent; the difference is intentional design.",
  },
  {
    id: 762,
    category: "Networking & Content Delivery",
    question:
      "An S3 gateway VPC endpoint serves many teams, but policy requires it to reach only the team's specific buckets, nothing else in S3. What restricts the endpoint's reach?",
    options: [
      "An endpoint policy on the gateway endpoint limiting access to specific bucket ARNs",
      "The bucket policies alone, one per team",
      "A network ACL on the endpoint subnet",
      "A VPC peering connection to each bucket",
    ],
    correctAnswers: [0],
    explanation:
      "VPC endpoints accept their own resource policies, so the gateway endpoint can constrain traffic to enumerated buckets regardless of broader IAM permissions. Bucket policies govern buckets from the other side but don't restrict what this endpoint exposes, and the rest are unrelated constructs.",
  },
  {
    id: 763,
    category: "Networking & Content Delivery",
    question:
      "A security group rule must allow traffic from a large, centrally managed set of CIDR ranges that updates regularly. What should the rule reference?",
    options: [
      "A prefix list ID, maintained centrally and referenced by the security group",
      "Each CIDR as a separate rule updated manually",
      "The VPC's main route table",
      "An IAM policy variable containing the CIDRs",
    ],
    correctAnswers: [0],
    explanation:
      "Prefix list IDs let security group rules track a managed CIDR collection that updates in one place. Manual per-CIDR rules drift, route tables don't grant SG ingress, and IAM variables don't apply to network rules.",
  },
  {
    id: 764,
    category: "Networking & Content Delivery",
    question:
      "After adding a sixth application tier in a new subnet, long-lived TCP connections between tiers intermittently reset. The network ACL for the new subnet allows inbound on the application ports. What's missing?",
    options: [
      "Outbound rules allowing ephemeral port ranges (1024-65535) for return traffic, since ACLs are stateless",
      "Inbound rules for the ephemeral ports on the source subnet",
      "An updated route table entry for the new subnet",
      "Security group outbound rules for the application ports",
    ],
    correctAnswers: [0],
    explanation:
      "Stateless NACLs evaluate each direction independently; return packets to the clients' ephemeral source ports must be permitted outbound from the new subnet or established connections reset. Ephemeral inbound, routing, and security group statefulness don't address the return path.",
  },
  {
    id: 765,
    category: "Compute",
    question:
      "An EKS cluster's core networking add-on (VPC CNI), CoreDNS, and kube-proxy should be updated and patched by EKS rather than self-managed charts. Which EKS feature manages these as curated packages?",
    options: [
      "EKS managed add-ons",
      "Helm charts maintained by the platform team",
      "Karpenter provisioning",
      "Fargate profile add-ons",
    ],
    correctAnswers: [0],
    explanation:
      "Managed add-ons let EKS install, update, and patch the curated cluster software (VPC CNI, CoreDNS, kube-proxy, EBS/EFS CSI). Helm transfers that care to the team, Karpenter provisions nodes, and Fargate profiles select pod placement.",
  },
  {
    id: 766,
    category: "Compute",
    question:
      "Auditors require records of every Kubernetes API call made to an EKS cluster — who created which deployment and when. Which EKS control plane logging must be enabled?",
    options: [
      "API server, audit, and authenticator logs exported to CloudWatch Logs",
      "Container insights logs from pods",
      "CloudTrail data events on the EKS service",
      "Node-level syslog forwarding",
    ],
    correctAnswers: [0],
    explanation:
      "EKS control plane logging categories include API server, audit, authenticator, controller manager, and scheduler — audit logs record Kubernetes API activity for compliance. Pod logs cover applications, CloudTrail records AWS API calls (like CreateCluster), and node syslog misses the control plane.",
  },
  {
    id: 767,
    category: "Compute",
    question:
      "Kubernetes Secrets in an EKS cluster are base64-encoded in etcd by default. Compliance requires them encrypted with a KMS key so etcd snapshots are safe. Which EKS feature provides this?",
    options: [
      "KMS envelope encryption of Kubernetes secrets (secret encryption enablement)",
      "Encrypting each pod's environment variables with the SDK",
      "Moving secrets into S3 with Object Lock",
      "Using Docker secrets inside the image layers",
    ],
    correctAnswers: [0],
    explanation:
      "EKS integrates KMS envelope encryption for Kubernetes Secrets, encrypting them in etcd with a customer managed key. Application-level encryption, S3 relocation, and image-baked secrets don't protect etcd-stored Secrets.",
  },
  {
    id: 768,
    category: "Compute",
    question:
      "An engineer must open a shell inside a running ECS container for live debugging, without SSH keys or a bastion, using IAM authorization. Which feature provides this?",
    options: [
      "ECS Exec, using SSM agent inside the task container",
      "SSH enabled through the task's security group",
      "EC2 Instance Connect on the underlying host",
      "A debug sidecar with a shared volume only",
    ],
    correctAnswers: [0],
    explanation:
      "ECS Exec channels shell access through the SSM agent in the container with IAM controls and CloudTrail/CloudWatch audit trails. SSH reopens network paths, Instance Connect targets EC2 hosts not containers, and a sidecar alone can't authorize entry.",
  },
  {
    id: 769,
    category: "Compute",
    question:
      "An ECS service deployment should halt and roll back automatically when new tasks fail, rather than completing a bad rollout. Which ECS deployment feature provides this?",
    options: [
      "The deployment circuit breaker with automatic rollback",
      "A CloudWatch alarm detaching the target group",
      "Lifecycle hooks on task stop",
      "A placement constraint on failing hosts",
    ],
    correctAnswers: [0],
    explanation:
      "The circuit breaker stops a deployment when tasks fail to launch healthily and (configured) rolls the service back automatically. Alarms don't detach target groups, hooks run on task lifecycle events, and constraints influence placement only.",
  },
  {
    id: 770,
    category: "Compute",
    question:
      "A CI/CD system tags each image with latest plus a version. An engineer overwrote the production tag with an untested build, causing an incident. Which ECR setting prevents tag overwrites?",
    options: [
      "Image tag immutability on the repository",
      "Lifecycle policies expiring the latest tag",
      "Replication rules to a second Region",
      "Scan-on-push for every image",
    ],
    correctAnswers: [0],
    explanation:
      "Tag immutability rejects pushes that would overwrite existing tags, forcing new unique tags and preserving deployed references. Lifecycle rules delete, replication duplicates, and scanning checks vulnerabilities — none stop overwrites.",
  },
  {
    id: 771,
    category: "Compute",
    question:
      "A Lambda function re-establishes a database connection on every invocation, adding hundreds of milliseconds of latency. Where should connection setup live to be reused across invocations?",
    options: [
      "In the initialization code outside the handler, executed once per execution environment and reused by subsequent invocations",
      "Inside the handler, wrapped in try/catch",
      "In the function's environment variables as a connection string only",
      "In a /tmp cache file re-read each time",
    ],
    correctAnswers: [0],
    explanation:
      "Code in the init phase runs once per execution environment, so connections persist and are reused by warm invocations — the canonical connection reuse pattern. Handler-local setup re-runs every call, and configuration or temp files don't hold live connections.",
  },
  {
    id: 772,
    category: "Compute",
    question:
      "A Lambda function must return a generated 50 MB report to callers, exceeding the synchronous response payload limit. What is the standard workaround?",
    options: [
      "Write the report to S3 and return a presigned URL for the client to download",
      "Increase the function's memory to raise the payload limit",
      "Compress the response until it fits under the limit",
      "Return the report in 6 MB chunks the client reassembles blindly",
    ],
    correctAnswers: [0],
    explanation:
      "The synchronous response cap (6 MB) is fixed; writing large outputs to S3 and handing back a presigned URL is the standard pattern. Memory doesn't move the limit, compression rarely reaches the required ratio, and blind chunking breaks at the boundary.",
  },
  {
    id: 773,
    category: "Application Integration",
    question:
      "Only requests passing AWS WAF rules should reach one specific stage of an API Gateway REST API, while other stages remain unaffected. Where does WAF attach?",
    options: [
      "To the specific API Gateway stage (or the whole API, with per-stage behavior), providing per-stage association options",
      "Globally at the account level for all APIs",
      "To each Lambda function behind the stage",
      "To the VPC endpoint serving the API",
    ],
    correctAnswers: [0],
    explanation:
      "WAF web ACLs associate with API Gateway stages (or APIs), giving stage-scoped protection. Account-level blanket attachment and function- or endpoint-level placement don't match the per-stage requirement.",
  },
  {
    id: 774,
    category: "Application Integration",
    question:
      "A FIFO-based order system needs far beyond the standard per-queue throughput — tens of thousands of messages per second across many order groups. Which SQS capability raises FIFO throughput dramatically?",
    options: [
      "High throughput FIFO mode, raising per-second limits substantially (with deduplication scoped per message group)",
      "Increasing the visibility timeout on the queue",
      "Adding more consumer EC2 instances",
      "Converting the queue to standard during peaks",
    ],
    correctAnswers: [0],
    explanation:
      "High-throughput FIFO mode multiplies per-second message operations by scoping deduplication to message groups. Timeouts and consumer count don't lift queue-side limits, and standard mode drops ordering guarantees the business needs.",
  },
  {
    id: 775,
    category: "Application Integration",
    question:
      "Order events must fan out to multiple subscribers where at least one subscriber requires strict per-order-group ordering. Which SNS variant plus target satisfies ordered fan-out?",
    options: [
      "SNS FIFO topics delivering to SQS FIFO queues, preserving group ordering end to end",
      "SNS standard topics with SQS standard queues and consumer-side sorting",
      "EventBridge default bus with Lambda sorters",
      "SNS standard topic with per-subscriber FIFO flags",
    ],
    correctAnswers: [0],
    explanation:
      "SNS FIFO topics message-group ordering flows through to FIFO queue subscribers, preserving ordering across the fan-out. Standard topics and buses make no ordering promise regardless of consumer behavior.",
  },
  {
    id: 776,
    category: "Application Integration",
    question:
      "A disaster recovery design requires EventBridge's event archive to exist in a second Region, keeping business events recoverable regionally. Which EventBridge capability replicates events across Regions?",
    options: [
      "Event bus replication to a replica Region",
      "Archives copied by an S3 replication rule",
      "CloudWatch Logs cross-region subscriptions",
      "Rule targets in foreign Regions",
    ],
    correctAnswers: [0],
    explanation:
      "EventBridge supports replicating a bus's events to a replica Region for regional resilience. Archive copies, log subscriptions, and remote targets don't replicate the bus itself.",
  },
  {
    id: 777,
    category: "Application Integration",
    question:
      "One of many subscribers on an SNS topic repeatedly fails to accept messages. Delivery to other subscribers works fine. Where should this subscriber's failed deliveries be captured without affecting the topic's other endpoints?",
    options: [
      "A redrive policy (dead-letter queue) on the failing subscription",
      "A DLQ on the SNS topic affecting all subscribers",
      "Retry the topic's Publish calls",
      "Increase the subscriber's Lambda concurrency",
    ],
    correctAnswers: [0],
    explanation:
      "Subscription-level redrive policies isolate failed deliveries per subscriber into a DLQ, leaving other endpoints untouched. Topic-level DLQs are the legacy coarser mechanism, republishing doesn't fix consumer failures, and concurrency doesn't address an unreachable endpoint.",
  },
  {
    id: 778,
    category: "Management & Governance",
    question:
      "Three separate analytics systems must consume the same CloudWatch log group's stream. One subscription filter per log group is the limit. How do all three receive the data?",
    options: [
      "One subscription filter delivers to a fan-out intermediary (such as Firehose, Kinesis, or EventBridge) which distributes to the three systems",
      "Three subscription filters attached to the same log group",
      "Each system polls DescribeLogStreams continuously",
      "Exporting the log group to three S3 buckets hourly",
    ],
    correctAnswers: [0],
    explanation:
      "Log groups allow a single subscription filter, so the standard pattern is a fan-out target distributing to every consumer. Multiple filters aren't allowed, polling is fragile, and periodic exports lack real-time delivery.",
  },
  {
    id: 779,
    category: "Management & Governance",
    question:
      "A custom application metric needs one-second resolution for rapid alarms, finer than the default one-minute granularity. How is high-resolution publishing done?",
    options: [
      "Publish via PutMetricData with StorageResolution set to 1 (seconds)",
      "Increase the alarm's evaluation frequency to 1 second",
      "Enable detailed monitoring on the resource",
      "Publish the metric 60 times per minute as separate metrics",
    ],
    correctAnswers: [0],
    explanation:
      "Custom metrics support high resolution by declaring one-second storage resolution at publish time; alarms can then evaluate at 10-second or 30-second periods. Alarm frequency doesn't create data, detailed monitoring is EC1-hypervisor metrics, and metric spam wastes cost.",
  },
  {
    id: 780,
    category: "Management & Governance",
    question:
      "Which two practices harden a CloudWatch alarm strategy against noise and blind spots? (Select TWO.)",
    options: [
      "Configure missing-data treatment explicitly per alarm (breaching, notBreaching, ignore)",
      "Use composite alarms to page once for correlated failures",
      "Use maximum evaluation periods on every alarm to suppress alerts",
      "Disable alarms outside business hours",
      "Route every alarm to every subscriber",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Deliberate missing-data semantics prevent both false alarms and silent gaps, and composite alarms collapse correlated pages into one. Long periods suppress real alerts, after-hours disabling creates blind spots, and broadcast routing adds noise.",
  },
];
