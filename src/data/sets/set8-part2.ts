import type { QuizQuestion } from "../questions";

/** Practice Set 8 — questions 478–499 (hybrid infrastructure and edge). Original questions. */
export const set8Part2: QuizQuestion[] = [
  {
    id: 478,
    category: "Storage",
    question:
      "A backup application at a branch office expects a physical tape library with iSCSI-attached virtual tape drives, writing archives that must land in S3 and Glacier. Which Storage Gateway type presents this interface?",
    options: [
      "File Gateway",
      "Volume Gateway (stored volumes)",
      "Tape Gateway",
      "S3 File Gateway with NFS",
    ],
    correctAnswers: [2],
    explanation:
      "Tape Gateway emulates a tape library over iSCSI for backup software, virtualizing tapes backed by S3 and archive tiers. File Gateway serves NFS/SMB files, Volume Gateway presents block disks, and File Gateway with NFS is again a file interface, not a tape library.",
  },
  {
    id: 479,
    category: "Migration & Transfer",
    question:
      "A media archive migration involves roughly 100 petabytes from a data center with no viable network path. Which transfer device is designed for this scale?",
    options: [
      "AWS Snowcone",
      "AWS Snowball Edge Storage Optimized",
      "AWS Snowmobile",
      "AWS DataSync over Direct Connect",
    ],
    correctAnswers: [2],
    explanation:
      "Snowmobile is an exabyte-scale shipping container truck purpose-built for very large migrations like 100 PB. Snowcone is a small portable device, Snowball Edge handles terabyte-to-petabyte-scale jobs, and a network path is explicitly unavailable.",
  },
  {
    id: 480,
    category: "Migration & Transfer",
    question:
      "A legal requirement forces an 80 TB dataset currently in S3 to be delivered physically to an on-premises evidence facility. Which Snow Family operation supports retrieving data from AWS to on-premises?",
    options: [
      "A Snowball Edge export job ordering devices shipped to the site with the data",
      "An import job with Snowcone devices",
      "DataSync agent pulls from S3 over a 10 Mbps link",
      "S3 Batch Operations writing to a bucket on premises",
    ],
    correctAnswers: [0],
    explanation:
      "Snow Family export jobs ship devices pre-loaded with your S3 data to a physical address, handling egress at scale. Import jobs bring data in, the tiny link makes network transfer impractical, and S3 buckets don't exist on premises.",
  },
  {
    id: 481,
    category: "Networking & Content Delivery",
    question:
      "A 5G mobile gaming company requires single-digit millisecond latency to carrier networks in specific cities, running compute at the telecom edge. Which infrastructure option matches?",
    options: [
      "AWS Local Zones",
      "AWS Wavelength Zones",
      "AWS Outposts servers",
      "Edge locations of CloudFront",
    ],
    correctAnswers: [1],
    explanation:
      "Wavelength Zones embed AWS compute inside telecom 5G networks for ultra-low-latency mobile edge applications. Local Zones are metro AWS extensions not tied to carrier networks, Outposts is customer premises, and CloudFront edge locations cache content rather than run general compute.",
  },
  {
    id: 482,
    category: "Networking & Content Delivery",
    question:
      "A cloud gaming and live-streaming product needs single-digit millisecond latency to end users in major metropolitan areas, with AWS-native services (EC2, EBS, VPC) running nearby. Which option places AWS compute in metro centers?",
    options: [
      "AWS Local Zones",
      "AWS Wavelength",
      "AWS Snowball Edge",
      "Additional Availability Zones in the closest Region",
    ],
    correctAnswers: [0],
    explanation:
      "Local Zones put compute, storage, and networking in metro areas adjacent to large population centers for single-digit millisecond access. Wavelength targets carrier 5G networks, Snowball is a transfer device, and Regional AZs are farther from end users by design.",
  },
  {
    id: 483,
    category: "Security",
    question:
      "A security team must block instances in a VPC from resolving known malware and phishing domains, with logs of blocked queries. Which Route 53 feature inspects VPC DNS requests?",
    options: [
      "Route 53 Resolver DNS Firewall with domain lists",
      "Network Firewall HTTP inspection",
      "Route 53 DNSSEC validation",
      "Security groups blocking port 53 outbound",
    ],
    correctAnswers: [0],
    explanation:
      "DNS Firewall attaches domain lists and rules to VPC Resolver query paths, blocking malicious domains and logging actions. HTTP inspection misses DNS-level blocking, DNSSEC protects answer integrity, and port blocks break DNS entirely.",
  },
  {
    id: 484,
    category: "Networking & Content Delivery",
    question:
      "A Transit Gateway interconnects development and production spoke VPCs plus a shared services VPC. Policy requires: dev and prod must not talk to each other, but both must reach shared services. How is this enforced?",
    options: [
      "A single TGW route table defaulting everywhere, restricted by NACLs",
      "Separate TGW route tables for dev and prod, each routing only to the shared services attachment",
      "Disabling route propagation on all attachments",
      "Security groups on the shared services only",
    ],
    correctAnswers: [1],
    explanation:
      "TGW route tables segment routing per environment: dev's table routes to shared services but not to prod's attachments, and vice versa. One default table reconnects everyone, disabling propagation isolates everything, and security groups don't create the required asymmetric routing.",
  },
  {
    id: 485,
    category: "Networking & Content Delivery",
    question:
      "A central network account owns all subnets. Workload accounts must launch EC2 instances into those centrally controlled subnets while the network team retains ownership. Which VPC feature enables cross-account subnet usage?",
    options: [
      "VPC sharing through AWS Resource Access Manager",
      "VPC peering with shared route tables",
      "Transit Gateway attachments per account",
      "Launching via a cross-account role into the network account",
    ],
    correctAnswers: [0],
    explanation:
      "VPC sharing lets a sharing account share subnets (via RAM) with other accounts, which launch their resources into the shared network while the owner controls routes and NACLs. Peering and TGW connect whole networks rather than sharing subnets for launches, and role-jumping into another account moves the workloads' ownership.",
  },
  {
    id: 486,
    category: "Networking & Content Delivery",
    question:
      "A network team struggles to plan non-overlapping CIDR ranges across 50 accounts and on-premises networks, auditing allocation continuously. Which service automates IP address planning and allocation?",
    options: [
      "VPC IP Address Manager (IPAM)",
      "AWS Network Manager for Transit Gateways",
      "Route 53 IP-based routing",
      "EC2 address pool management",
    ],
    correctAnswers: [0],
    explanation:
      "IPAM plans, allocates, and audits IP address space across accounts and Regions with automatic CIDR assignment and overlap detection. Network Manager tracks global networks, routing policies direct traffic, and manual pools lack org-wide automation.",
  },
  {
    id: 487,
    category: "Networking & Content Delivery",
    question:
      "An instance cannot reach a database endpoint, and engineers disagree about whether a security group, NACL, or route is at fault. Which tool analyzes the path and pinpoints the blocking component?",
    options: [
      "VPC Reachability Analyzer",
      "VPC Flow Logs analysis with Athena",
      "TCPtraceroute from a jump host",
      "AWS Network Access Analyzer",
    ],
    correctAnswers: [0],
    explanation:
      "Reachability Analyzer builds the hypothetical path between two endpoints and reports reachability or the exact component blocking it — without sending packets. Flow logs analyze historical traffic, manual tracing requires access, and Network Access Analyzer assesses overall network configuration against intent.",
  },
  {
    id: 488,
    category: "Networking & Content Delivery",
    question:
      "A compliance team requires full deep-packet inspection of all traffic to and from a subnet by a partner intrusion-detection appliance, sending a copy while leaving the original flow untouched. Which VPC feature mirrors traffic for this?",
    options: [
      "VPC Traffic Mirroring",
      "VPC Flow Logs",
      "Gateway Load Balancer endpoints",
      "Enhanced networking",
    ],
    correctAnswers: [0],
    explanation:
      "Traffic Mirroring duplicates ENI traffic to a mirroring target (an appliance ENI or NLB) for inspection without affecting production flows. Flow Logs capture metadata, not payloads; GWLB inserts appliances inline; enhanced networking is a performance feature.",
  },
  {
    id: 489,
    category: "Security",
    question:
      "A security architect must validate that no unintended network path exists between an internet-facing subnet and a database subnet (for example, a forgotten route or permissive NACL). Which analyzer evaluates entire network configurations against intent?",
    options: [
      "AWS Network Access Analyzer",
      "VPC Reachability Analyzer between the two subnets",
      "GuardDuty network findings",
      "AWS Firewall Manager policies",
    ],
    correctAnswers: [0],
    explanation:
      "Network Access Analyzer defines network intent (what should be reachable) and reports all paths violating it across the network configuration. Reachability Analyzer tests one specific path, GuardDuty detects active threats, and Firewall Manager deploys policies.",
  },
  {
    id: 490,
    category: "Networking & Content Delivery",
    question:
      "A global enterprise wants a managed overlay to operate its worldwide WAN — connecting VPCs, on-premises sites, and branch offices — with centralized policies instead of device-by-device management. Which service provides this core network?",
    options: [
      "AWS Cloud WAN",
      "AWS Transit Gateway alone",
      "AWS Direct Connect gateway",
      "AWS VPN CloudHub",
    ],
    correctAnswers: [0],
    explanation:
      "Cloud WAN builds a global core network with a central dashboard and network policies applied across Regions and sites. TGW is a strong Regional router but lacks the global policy plane, DX gateway connects DX connections to VPCs, and CloudHub is a legacy VPN hub pattern.",
  },
  {
    id: 491,
    category: "Networking & Content Delivery",
    question:
      "Remote employees must connect to a VPC privately from their laptops, with MFA-enforced authentication and per-user access logging, without installing a site-to-site tunnel. Which service fits?",
    options: [
      "AWS Client VPN",
      "AWS Site-to-Site VPN",
      "API Gateway with IAM",
      "AWS PrivateLink for every internal app",
    ],
    correctAnswers: [0],
    explanation:
      "Client VPN provides per-user remote access into a VPC with federation-based MFA and connection logs. Site-to-Site VPN connects networks, not individual laptops; API Gateway exposes APIs; PrivateLink publishes individual services rather than general network access.",
  },
  {
    id: 492,
    category: "Cost Optimization",
    question:
      "Which two networking constructs carry no hourly or per-use AWS charge? (Select TWO.)",
    options: [
      "S3 and DynamoDB gateway VPC endpoints",
      "Security groups and network ACLs",
      "NAT gateways",
      "Interface VPC endpoints",
      "VPC peering data transfer",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Gateway endpoints and security/NACL constructs are free; charges attach to the traffic and managed data planes they carry. NAT gateways bill hourly plus per GB, interface endpoints bill hourly plus per GB, and peering bills cross-AZ/Region transfer rates.",
  },
  {
    id: 493,
    category: "Networking & Content Delivery",
    question:
      "A new Region behind Global Accelerator must gradually take over traffic: starting at 0%, growing to 100% as confidence increases, without redeploying anything. Which accelerator control implements the shift?",
    options: [
      "Endpoint group traffic dial (percentage weighting)",
      "Listener port reconfiguration",
      "Client-side feature flags in the game client",
      "Changing the accelerator's IP addresses",
    ],
    correctAnswers: [0],
    explanation:
      "Each endpoint group has a traffic dial from 0 to 100 percent, redistributing traffic among Regional endpoint groups instantly. Listener settings define ports, client flags are application logic, and accelerator IPs are static by design.",
  },
  {
    id: 494,
    category: "Networking & Content Delivery",
    question:
      "An older distribution uses Origin Access Identity (OAI) to secure its S3 origin. The team must switch to the current approach, which also works with SSE-KMS encrypted origins. What should be adopted?",
    options: [
      "Origin Access Control (OAC)",
      "A public bucket policy with aws:SourceIp conditions",
      "Lambda@Edge signing requests",
      "CloudFront origin groups",
    ],
    correctAnswers: [0],
    explanation:
      "OAC is the successor to OAI, supporting all S3 Regions and SSE-KMS origins with stronger security posture. IP-based policies are spoofable and not the mechanism, edge signing re-implements OAC, and origin groups are failover constructs.",
  },
  {
    id: 495,
    category: "Networking & Content Delivery",
    question:
      "Security policy requires HSTS, CSP, and X-Frame-Options headers on every response from a CloudFront distribution, centrally and without touching application code. Which feature adds these headers?",
    options: [
      "A CloudFront response headers policy attached to the behavior",
      "Origin custom headers configured per origin",
      "A WAF rule injecting headers on allow",
      "CloudFront Functions adding headers per request",
    ],
    correctAnswers: [0],
    explanation:
      "Response headers policies attach managed or custom security headers to responses at the edge declaratively. Origin custom headers flow upstream, not to viewers; WAF rules block or allow rather than decorate; edge functions are code where a policy suffices.",
  },
  {
    id: 496,
    category: "Networking & Content Delivery",
    question:
      "An operations team must analyze request-level CloudFront data within seconds of delivery (status codes, edge, latency) to catch an active issue, rather than waiting for end-of-day log delivery. Which logging option provides near-real-time records?",
    options: [
      "Standard logs to S3",
      "Real-time logs streamed to Kinesis Data Streams",
      "CloudWatch metrics sampled per distribution",
      "Access logs via email digests",
    ],
    correctAnswers: [1],
    explanation:
      "Real-time logs push sampled request records to Kinesis within seconds for live analysis. Standard logs batch to S3 with delays, metrics aggregate rather than log requests, and the email option does not exist.",
  },
  {
    id: 497,
    category: "Storage",
    question:
      "A company replicates its data lake bucket to three Regions and wants applications to use one single global hostname that routes to the nearest healthy replica bucket. Which S3 feature provides this entry point?",
    options: [
      "S3 Multi-Region Access Point",
      "Route 53 latency records to three bucket websites",
      "S3 Transfer Acceleration",
      "CloudFront with three origins",
    ],
    correctAnswers: [0],
    explanation:
      "Multi-Region Access Points provide one global endpoint that routes requests to the nearest available Regional bucket replica, with failover built in. DNS records to bucket websites are fragile and lack failover intelligence, acceleration changes transfer paths only, and a CloudFront distribution serves content rather than providing S3 API access.",
  },
  {
    id: 498,
    category: "Storage",
    question:
      "Different consumers of the same object must receive different views: analysts get full data, partner apps get PII-redacted versions, without storing multiple copies. Which S3 feature transforms data at retrieval time?",
    options: [
      "S3 Object Lambda Access Points",
      "S3 Batch Operations with Lambda",
      "S3 Select per consumer",
      "EventBridge rules on GET requests",
    ],
    correctAnswers: [0],
    explanation:
      "Object Lambda access points run a Lambda during GET to transform the object per access point, so each consumer group gets its tailored view of one stored copy. Batch Operations rewrite stored data, S3 Select filters within files with limited logic, and EventBridge observes events rather than transforming responses.",
  },
  {
    id: 499,
    category: "Networking & Content Delivery",
    question:
      "Which two CloudFront features are security-focused? (Select TWO.)",
    options: [
      "Origin Access Control restricting origin access to the distribution",
      "Field-level encryption for sensitive form fields at the edge",
      "Price classes limiting edge locations",
      "Compression for cacheable objects",
      "Origin Shield caching tier",
    ],
    correctAnswers: [0, 1],
    explanation:
      "OAC locks the origin to the distribution, and field-level encryption protects sensitive fields end to the edge — both security controls. Price classes, compression, and Origin Shield are cost and performance features.",
  },
];
