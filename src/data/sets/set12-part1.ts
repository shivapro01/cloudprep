import type { QuizQuestion } from "../questions";

/** Practice Set 12 — questions 716–737 (database features and network design). Original questions. */
export const set12Part1: QuizQuestion[] = [
  {
    id: 716,
    category: "Database",
    question:
      "An application cluster uses RDS MySQL read replicas across AZs, and developers want replicas to accept writes that then flow back to the primary — simplifying multi-region-style writes within a deployment. Which RDS feature enables writes to replicas?",
    options: [
      "Write forwarding for Aurora MySQL read replicas",
      "Two-way snapshot replication",
      "Multi-AZ DB instance deployments with dual writers",
      "RDS Proxy write splitting",
    ],
    correctAnswers: [0],
    explanation:
      "Write forwarding lets Aurora MySQL replicas accept writes and forward them to the writer cluster, simplifying application logic for write-anywhere patterns. Snapshot replication isn't a live path, RDS has no dual-writer mode, and RDS Proxy pools connections rather than rewriting topology.",
  },
  {
    id: 717,
    category: "Database",
    question:
      "An analytics team wants transactional data from Aurora PostgreSQL in Redshift within seconds of commits, without building and operating ETL pipelines. Which integration provides this?",
    options: [
      "Zero-ETL integration from Aurora to Amazon Redshift",
      "Nightly DMS full loads",
      "Aurora snapshot exports processed into Redshift",
      "Shared S3 exports with scheduled COPY commands",
    ],
    correctAnswers: [0],
    explanation:
      "Zero-ETL replication streams committed transactional data into Redshift automatically, making it queryable within seconds with no pipeline to build or run. DMS and snapshot-based paths are managed pipelines that must be built and operated.",
  },
  {
    id: 718,
    category: "Database",
    question:
      "A DynamoDB table holds hundreds of gigabytes of rarely accessed audit history, and storage dominates the bill. Which table class reduces storage cost while keeping the table fully available?",
    options: [
      "DynamoDB Standard-IA table class",
      "DynamoDB on-demand capacity mode",
      "Table encryption with a customer managed key",
      "Global secondary index removal",
    ],
    correctAnswers: [0],
    explanation:
      "The Standard-IA table class cuts storage cost about 60% for infrequently accessed data while keeping full availability, trading higher per-request access pricing. Capacity and encryption settings don't change storage cost, and dropping indexes changes queries rather than storage economics.",
  },
  {
    id: 719,
    category: "Database",
    question:
      "Analysts need a point-in-time copy of a DynamoDB table exported to S3 for Athena queries, without consuming any table read capacity or affecting production latency. Which feature performs this?",
    options: [
      "DynamoDB export to S3 (from PITR data)",
      "A full table Scan writing to S3 via Lambda",
      "On-demand backup restored then exported manually",
      "DynamoDB Streams piped through Firehose",
    ],
    correctAnswers: [0],
    explanation:
      "Exports to S3 read from the PITR backup data, costing nothing on the table's capacity and not touching production performance. Scans consume throughput and alter workload latency, restore-plus-export adds cost and time, and Streams captures future changes rather than exporting current state.",
  },
  {
    id: 720,
    category: "Database",
    question:
      "A cache workload's memory demand swings unpredictably, and the team wants to stop sizing and managing individual cache nodes entirely. Which ElastiCache option fits?",
    options: [
      "ElastiCache Serverless for Redis and Memcached",
      "A larger cache.r6g node with manual monitoring",
      "Cluster mode with 30 shards pre-provisioned",
      "Self-managed Redis on EC2 Auto Scaling",
    ],
    correctAnswers: [0],
    explanation:
      "Serverless caches provision and scale compute and memory automatically within a simple per-unit pricing model — no nodes to plan. Node-based options (bigger, more, or self-managed) all retain sizing work.",
  },
  {
    id: 721,
    category: "Storage",
    question:
      "A real-time bidding system needs S3 storage co-located in a single AZ with up to 10x better first-byte latency and high request rates than Standard. Which storage class fits?",
    options: [
      "S3 Express One Zone",
      "S3 Standard",
      "S3 One Zone-IA",
      "S3 Standard-IA",
    ],
    correctAnswers: [0],
    explanation:
      "Express One Zone delivers single-digit millisecond data access from a chosen AZ at much higher request performance, built for latency-sensitive workloads. Standard and IA classes are Regional multi-AZ with standard latency, and One Zone-IA trades latency savings for access rarity.",
  },
  {
    id: 722,
    category: "Storage",
    question:
      "A bucket holds /logs (transition at 30 days) and /data (transition at 90 days) with different policies. How do lifecycle rules express this?",
    options: [
      "Separate lifecycle rules with prefix filters and their own transition days; more specific rules take precedence for matching objects",
      "One rule averaging the transition days across prefixes",
      "Tags must be applied to every object; prefix filtering isn't supported",
      "Separate buckets are the only way to vary policy by path",
    ],
    correctAnswers: [0],
    explanation:
      "Lifecycle rules filter by prefix, tags, size, or age, and overlapping rules resolve by precedence so each prefix gets its own schedule. Averaged rules, tag-only approaches, and bucket splits are unnecessary once filtered rules are understood.",
  },
  {
    id: 723,
    category: "Storage",
    question:
      "A governance team needs recurring machine-readable lists of every object in a bucket (names, sizes, encryption, replication status) delivered daily to another bucket for Athena analysis. Which S3 feature produces these?",
    options: [
      "S3 Inventory reports with an Athena-integrated destination",
      "S3 Storage Lens exports",
      "CloudTrail data events aggregated in Athena",
      "S3 Server access logs",
    ],
    correctAnswers: [0],
    explanation:
      "S3 Inventory generates scheduled CSV/ORC/Parquet manifests of objects with configurable fields, ideal for cataloging into Athena. Storage Lens reports aggregates, CloudTrail logs API calls, and access logs record requests.",
  },
  {
    id: 724,
    category: "Storage",
    question:
      "A ransomware-resilience policy requires that EBS snapshots cannot be deleted or modified during a retention window, enforced at the snapshot layer. Which EBS feature provides this?",
    options: [
      "EBS SnapLock for snapshots",
      "Recycle Bin retention rules only",
      "Snapshot archive tier",
      "Fast Snapshot Restore",
    ],
    correctAnswers: [0],
    explanation:
      "SnapLock applies WORM-style immutability to EBS snapshots for a retention period, preventing deletion or tampering. Recycle Bin offers soft-delete recovery rather than immutable locking, and the archive and FSR features address cost and performance.",
  },
  {
    id: 725,
    category: "High Availability & Scaling",
    question:
      "A workload's scale-out events take minutes because each new instance must download and install its application stack before serving. Which Auto Scaling feature pre-initializes instances so they serve almost instantly on scale-out?",
    options: [
      "Warm pools with instance reuse or hibernation",
      "Larger minimum group size",
      "Longer default cooldowns",
      "Detailed monitoring at one-minute intervals",
    ],
    correctAnswers: [0],
    explanation:
      "Warm pools keep pre-initialized instances waiting (running, hibernated, or stopped) so scale-out promotes them into service almost immediately. Larger minimums pay for capacity always-on, cooldowns slow reactions, and monitoring only observes.",
  },
  {
    id: 726,
    category: "High Availability & Scaling",
    question:
      "An Auto Scaling group should launch a mix of instance types with On-Demand covering a baseline percentage and Spot filling the rest, weighted by vCPU capacity. Which configuration expresses this?",
    options: [
      "A mixed instances policy with instance type overrides, on-demand base capacity, and weighted Spot allocation strategy",
      "Separate Auto Scaling groups per instance type behind two target groups",
      "A single instance type with Spot allocation only",
      "Launch template overrides with no allocation strategy",
    ],
    correctAnswers: [0],
    explanation:
      "Mixed instances policies combine overrides, weighting, and purchase options — On-Demand base plus Spot above it — in one group. Splitting groups doubles management, single-type Spot raises interruption exposure, and overrides without a strategy don't allocate.",
  },
  {
    id: 727,
    category: "High Availability & Scaling",
    question:
      "A misbehaving instance inside an Auto Scaling group must be pulled from rotation for diagnosis without the group terminating and replacing it, and returned later. Which group state supports this?",
    options: [
      "Move the instance into Standby state",
      "Set the instance to hibernated",
      "Enable termination protection and deregister it manually",
      "Detach the instance permanently from the group",
    ],
    correctAnswers: [0],
    explanation:
      "Standby removes the instance from active rotation while keeping it managed by the group and billed; returning it to In Service restores duty. Hibernation is an EC2 feature unrelated to ASG rotation, termination protection alone leaves it serving traffic, and detaching removes group management entirely.",
  },
  {
    id: 728,
    category: "Networking & Content Delivery",
    question:
      "Two stickiness modes exist on an ALB target group. Which statement correctly distinguishes them?",
    options: [
      "Duration-based cookies are generated by the load balancer with a fixed expiry; application-based cookies rely on a cookie the application sets",
      "Application cookies are always shorter-lived than duration cookies",
      "Duration cookies require application code changes; app cookies are zero-config",
      "Both are configured on the listener rules",
    ],
    correctAnswers: [0],
    explanation:
      "The load balancer can mint its own stickiness cookie with a set duration, or honor an application-set cookie for affinity. The other pairings reverse the implementation responsibilities or misplace the configuration.",
  },
  {
    id: 729,
    category: "Networking & Content Delivery",
    question:
      "An organization's Site-to-Site VPN must fail over between tunnels automatically as routes change, without manual route updates when subnets change. Which VPN routing configuration fits?",
    options: [
      "Dynamic (BGP) routing, advertising prefixes over both tunnels",
      "Static routes pinned to one tunnel at a time",
      "Policy-based routing with IP lists per tunnel",
      "Route 53 failover records for the VPN endpoints",
    ],
    correctAnswers: [0],
    explanation:
      "BGP advertises and withdraws routes automatically as tunnel health changes, giving seamless failover and updates. Static and policy routes require manual edits, and DNS has no role in VPN path selection.",
  },
  {
    id: 730,
    category: "Networking & Content Delivery",
    question:
      "A company needs a 1 Gbps Direct Connect into a colocation site where it cannot host router hardware of its own, ordering capacity through an AWS partner. Which connection type applies?",
    options: [
      "Hosted connection through a Direct Connect partner",
      "A dedicated 1 Gbps connection they own end to end",
      "A Site-to-Site VPN with a partner appliance",
      "A Direct Connect gateway",
    ],
    correctAnswers: [0],
    explanation:
      "Hosted connections are provisioned by DX partners for sub-10G capacities (1G and below tiers), suiting sites using partner colocation. Dedicated connections are the customer's own physical ports at 1/10/100G, VPNs use the internet, and a gateway links connections to VPCs.",
  },
  {
    id: 731,
    category: "Networking & Content Delivery",
    question:
      "Bandwidth requirements grew beyond a single Direct Connect link, and resilience across devices is required. Which construct aggregates multiple physical connections?",
    options: [
      "A Direct Connect LAG (link aggregation group)",
      "A Direct Connect gateway",
      "Multiple independent Virtual Private Gateways",
      "Equal-cost multipath over VPN",
    ],
    correctAnswers: [0],
    explanation:
      "A LAG bundles dedicated connections into one logical higher-bandwidth, more resilient link. Gateways connect connections to VPCs across Regions, virtual gateways terminate VPNs, and VPN ECMP is a different transport.",
  },
  {
    id: 732,
    category: "Networking & Content Delivery",
    question:
      "A single Direct Connect location must serve VPCs in multiple AWS Regions over one physical connection, without one VPC per connection. What enables this?",
    options: [
      "A Direct Connect gateway associating the connection's virtual interfaces with VPCs across Regions",
      "A Transit Gateway spanning all Regions natively",
      "Separate virtual interfaces per Region on the same connection with VPC peering",
      "VPC peering chains between Regions",
    ],
    correctAnswers: [0],
    explanation:
      "The DX gateway attaches a private virtual interface to VPCs in multiple Regions through transit virtual interfaces — one connection, many Regional VPCs. TGWs are Regional resources that then peer for cross-Region; raw VIFs plus peering chains are the workaround the gateway replaces.",
  },
  {
    id: 733,
    category: "Networking & Content Delivery",
    question:
      "An interface VPC endpoint serves an application in one AZ; traffic from instances in a second AZ crosses AZ boundaries, incurring data transfer charges. What is the cost-correct design?",
    options: [
      "Deploy one interface endpoint per AZ and configure subnet discovery so each AZ uses its local endpoint",
      "Use a single endpoint and accept cross-AZ charges",
      "Replace interface endpoints with internet egress",
      "Add a NAT gateway in the second AZ",
    ],
    correctAnswers: [0],
    explanation:
      "Interface endpoints are AZ resources; one per AZ keeps traffic local and avoids cross-AZ data transfer pricing. Accepting the charges, going back to the internet, or adding NAT all ignore or worsen the cost structure.",
  },
  {
    id: 734,
    category: "Networking & Content Delivery",
    question:
      "For an organization-wide traffic analysis, flow logs must capture traffic for every ENI in a VPC — including resources added in the future — with one configuration. Which flow log scope covers this?",
    options: [
      "VPC-level flow logs, which include current and future ENIs in the VPC",
      "Per-ENI flow logs maintained manually",
      "Subnet flow logs only for public subnets",
      "Transit Gateway flow logs for the VPC",
    ],
    correctAnswers: [0],
    explanation:
      "Flow logs can attach at the VPC level, covering all current and future ENIs in one setting. Per-ENI management doesn't scale, partial subnet coverage misses traffic, and TGW logs see only TGW-attached traffic.",
  },
  {
    id: 735,
    category: "Networking & Content Delivery",
    question:
      "Security policy demands that only requests originating from a specific set of partner CIDRs reach a public ALB, at the network layer. What should be referenced by the security group rule?",
    options: [
      "A managed prefix list containing the partner CIDRs",
      "A Route 53 hosted zone ID",
      "An IAM policy condition on source IP",
      "The ALB's security group",
    ],
    correctAnswers: [0],
    explanation:
      "Security group rules can reference managed prefix lists, giving a single maintained CIDR set for partner ranges. Hosted zones do DNS, IAM conditions govern API calls, and referencing the ALB's group would allow other ALB traffic instead of partners.",
  },
  {
    id: 736,
    category: "Networking & Content Delivery",
    question:
      "Multiple teams share a list of corporate office CIDRs used in dozens of security group rules and route tables. Updates must propagate in one place. Which VPC feature provides this shared CIDR set?",
    options: [
      "Customer-managed prefix lists, shared across accounts and referenced by rules and routes",
      "A DynamoDB table of CIDRs consulted by automation",
      "Separate security groups copied per team",
      "VPC DHCP options sets",
    ],
    correctAnswers: [0],
    explanation:
      "Customer-managed prefix lists are versioned CIDR collections referenced by security group rules and route table entries, updatable centrally and shareable via RAM. Databases feeding automation and copied groups reintroduce drift, and DHCP options configure DNS, not CIDR sets.",
  },
  {
    id: 737,
    category: "Cost Optimization",
    question:
      "Which two VPC constructs are free of charge in themselves? (Select TWO.)",
    options: [
      "Internet gateways",
      "Route tables and security groups",
      "NAT gateways",
      "Interface VPC endpoints",
      "Site-to-Site VPN connections",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Internet gateways, route tables, and security groups carry no charge — costs come from data transfer and attached managed services. NAT gateways, interface endpoints, and VPN connections all bill hourly plus usage.",
  },
];
