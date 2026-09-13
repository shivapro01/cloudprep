import type { QuizQuestion } from "../questions";

/** Practice Set 5 — questions 305–325 (networking deep dive). Original questions. */
export const set5Part3: QuizQuestion[] = [
  {
    id: 305,
    category: "Networking & Content Delivery",
    question:
      "A VPC has one public subnet and two private subnets in different AZs. Instances in the private subnets cannot reach the internet. The route tables for the private subnets have no route to the NAT gateways. What is the missing configuration?",
    options: [
      "Attach an internet gateway route to the private route tables",
      "Add 0.0.0.0/0 routes in each private subnet's route table pointing to the NAT gateway in the same AZ",
      "Enable DNS hostnames on the VPC",
      "Add the private subnets to the public route table",
    ],
    correctAnswers: [1],
    explanation:
      "Private subnets need a default route to a NAT gateway (ideally the one in their own AZ) for outbound internet access; the gateway's subnet in turn routes to the internet gateway. Direct IGW routes would make the subnets public, DNS settings don't route traffic, and subnets are not members of other route tables by addition.",
  },
  {
    id: 306,
    category: "Networking & Content Delivery",
    question:
      "A company hosts a service behind an internal Network Load Balancer and wants hundreds of client VPCs in the same Region to reach it privately without VPC peering, keeping the connection to one stable DNS name. What should be used?",
    options: [
      "VPC peering to each client VPC",
      "A VPC endpoint service powered by PrivateLink, with client interface endpoints",
      "An internet-facing NLB with a Route 53 private zone",
      "Transit Gateway with a shared route table",
    ],
    correctAnswers: [1],
    explanation:
      "An NLB behind a VPC endpoint service exposes the app privately; clients create interface endpoints in their own VPCs and connect over AWS's network with no peering mesh. Peering scales as N×N links, public exposure defeats the requirement, and Transit Gateway is network routing rather than service publishing.",
  },
  {
    id: 307,
    category: "Networking & Content Delivery",
    question:
      "An application resolves an internal hostname that must return private IPs of healthy targets across multiple VPCs connected by Transit Gateway. Which DNS approach fits?",
    options: [
      "Public hosted zones with A records for each target",
      "Route 53 Resolver with inbound and outbound endpoints bridging on-premises and VPC DNS, plus private hosted zones shared across accounts",
      "DHCP options set pointing at each VPC's local resolver only",
      "Setting static hosts files through SSM Run Command",
    ],
    correctAnswers: [1],
    explanation:
      "Resolver endpoints and shared private hosted zones make private names resolvable across VPCs and hybrid links, with health-based answers where needed. Public zones leak internal names, DHCP options only pick the resolver, and hosts files are unmanageable at scale.",
  },
  {
    id: 308,
    category: "Networking & Content Delivery",
    question:
      "A corporate network must resolve a private hosted zone in a VPC over a Site-to-Site VPN. On-premises DNS forwards the zone to which IP addresses?",
    options: [
      "The VPC's NAT gateway elastic IPs",
      "The two IP addresses of a Route 53 Resolver inbound endpoint in the VPC",
      "The VPC's default DNS server at base +2 only, over the public internet",
      "The ALB nodes of the internal application",
    ],
    correctAnswers: [1],
    explanation:
      "A Resolver inbound endpoint provides ENI addresses inside the VPC that answer private zone queries forwarded from on-premises over the VPN. NAT addresses don't run DNS, the VPC+2 resolver is not directly addressable off-VPC, and ALBs don't answer DNS.",
  },
  {
    id: 309,
    category: "Networking & Content Delivery",
    question:
      "An IPv6-only requirement arrives: instances must receive IPv6 addresses while retaining IPv4 private addressing, with egress to IPv6 internet destinations. What must be added?",
    options: [
      "An egress-only internet gateway with a ::/0 route for IPv6",
      "A second internet gateway dedicated to IPv6",
      "A NAT gateway for the IPv6 prefix",
      "An additional VPC CIDR only",
    ],
    correctAnswers: [0],
    explanation:
      "An egress-only internet gateway provides outbound-only IPv6 internet access (the IPv6 analog of NAT) with a ::/0 route. A second IGW doesn't exist as a concept, NAT gateways handle IPv4 only, and adding a CIDR assigns addresses without egress routing.",
  },
  {
    id: 310,
    category: "Networking & Content Delivery",
    question:
      "A company requires consistent 10 Gbps connectivity to AWS with MACsec layer-2 encryption for a finance workload. Which connectivity option provides this?",
    options: [
      "Site-to-Site VPN with high-throughput tunnels",
      "Direct Connect with MACsec-capable 10/100 Gbps ports",
      "PrivateLink over a VPN",
      "Client VPN with group certificates",
    ],
    correctAnswers: [1],
    explanation:
      "Direct Connect supports MACsec encryption at layer 2 on dedicated 10 and 100 Gbps connections, meeting the deterministic bandwidth plus link-encryption requirement. VPN encrypts at layer 3 over the internet with lower determinism, PrivateLink is service exposure, and Client VPN is user remote access.",
  },
  {
    id: 311,
    category: "Networking & Content Delivery",
    question:
      "A global application wants traffic for users in Europe to always resolve to eu-west-1 even during low traffic, while North American users resolve to us-east-1, with a fallback to the other Region when one is unhealthy. Which Route 53 policy combination handles this?",
    options: [
      "Simple routing with multiple A records",
      "Geolocation routing with health checks and a default fallback record",
      "Latency-based routing only",
      "Multivalue answer routing with health checks",
    ],
    correctAnswers: [1],
    explanation:
      "Geolocation routes by user location deterministically, and health-checked records plus a default record provide regional fallback. Simple returns everything, latency routing follows performance not strict geography, and multivalue returns several records without location policy.",
  },
  {
    id: 312,
    category: "Networking & Content Delivery",
    question:
      "An ALB listener has rules: rule 1 forwards /api/* to tg-api; rule 2 forwards /api/v2/* to tg-v2. Requests to /api/v2/items go to tg-api. Why?",
    options: [
      "Listener rules evaluate in priority order and rule 1 matches first; rule 2 must have a lower priority number than rule 1",
      "Path patterns only match exact strings, so /api/v2/* is ignored",
      "ALB cannot combine host and path conditions",
      "The target groups have conflicting protocols",
    ],
    correctAnswers: [0],
    explanation:
      "ALB evaluates rules in priority order and applies the first match, so the more specific /api/v2/* rule must be evaluated before the broader /api/* rule. Path patterns do support wildcards, host and path conditions combine fine, and protocols are unrelated to rule matching.",
  },
  {
    id: 313,
    category: "Networking & Content Delivery",
    question:
      "A legacy application requires clients to reconnect to the same server mid-session due to in-memory state. Connections last minutes at a time over TCP. Which load balancer type and feature preserve session continuity with the least change?",
    options: [
      "NLB with TLS termination",
      "ALB with application-based cookies generated by the app",
      "NLB with source-IP-based stickiness (5-tuple hash)",
      "Gateway Load Balancer with flow symmetry",
    ],
    correctAnswers: [2],
    explanation:
      "NLB flows are hash-routed by 5-tuple, so the same client source IP:port keeps hitting the same target without any cookie support — the natural fit for TCP statefulness. ALB cookie stickiness applies to HTTP(S), TLS termination adds certificates the app doesn't need, and GWLB is for appliance inspection.",
  },
  {
    id: 314,
    category: "Networking & Content Delivery",
    question:
      "A web tier must terminate HTTP/3 (QUIC) connections at the load balancer for faster client handshakes on lossy mobile networks. Which ELB type supports QUIC listeners?",
    options: [
      "Application Load Balancer",
      "Network Load Balancer",
      "Classic Load Balancer",
      "Gateway Load Balancer",
    ],
    correctAnswers: [1],
    explanation:
      "Network Load Balancers support QUIC/HTTP3 listeners for UDP-based transport, terminating QUIC at the edge of the VPC. ALB listeners are TCP-based HTTP/1.1 and HTTP/2, and the other two types don't provide HTTP/3 termination.",
  },
  {
    id: 315,
    category: "Networking & Content Delivery",
    question:
      "An organization's security policy requires that instances in private subnets call AWS service APIs (S3, DynamoDB, STS) without traversing the internet, with private DNS resolving service names to internal addresses. Which construct provides private DNS for interface endpoints?",
    options: [
      "Setting the endpoint's private DNS enabled flag, backed by the VPC's Route 53 Resolver",
      "Creating manual hosted zone entries for each service's public name",
      "Using gateway endpoints for all services including STS",
      "Enabling DNS hostnames on the VPC",
    ],
    correctAnswers: [0],
    explanation:
      "Interface endpoints with private DNS enabled rewrite service DNS names to the endpoint's private IPs inside the VPC via the Resolver. Manual zones duplicate AWS-managed functionality, gateway endpoints exist only for S3/DynamoDB (not STS) and have no private DNS flag, and DNS hostnames alone don't rewrite service names.",
  },
  {
    id: 316,
    category: "Networking & Content Delivery",
    question:
      "Two applications in the same VPC communicate via their public elastic IPs even though private addresses exist, causing traffic to leave and re-enter the network. What corrects the path?",
    options: [
      "Enable DNS hostnames so applications resolve each other's private names",
      "Add a peering connection between the subnets",
      "Disable the NAT gateway to force private routing",
      "Create a transit gateway attachment for intra-VPC traffic",
    ],
    correctAnswers: [0],
    explanation:
      "Within a VPC, resolving a public IP of an address owned by the VPC returns the private IP when DNS hostnames/support is enabled, keeping traffic internal. Peering and TGW attach outside networks, and removing NAT breaks egress without fixing name resolution.",
  },
  {
    id: 317,
    category: "Networking & Content Delivery",
    question:
      "A security audit requires that no subnet in the production VPC can send traffic directly to the internet, verified at the subnet layer. Which evidence satisfies this?",
    options: [
      "Route tables of all subnets showing no 0.0.0.0/0 route to an internet gateway (only NAT gateways)",
      "Security groups without outbound rules on port 443",
      "CloudTrail showing no internet gateway was created",
      "A network ACL denying all inbound traffic",
    ],
    correctAnswers: [0],
    explanation:
      "Direct internet access is defined by routes: no IGW route in any subnet's route table proves no direct egress (NAT gateways provide mediated egress only). Security groups filter post-routing, an IGW may exist for public subnets, and inbound NACLs don't govern egress.",
  },
  {
    id: 318,
    category: "Networking & Content Delivery",
    question:
      "A latency-sensitive trading application is deployed in multiple Regions. Requests must go to the Region with the best measured performance per user at DNS resolution time, failing over automatically. Which policy applies?",
    options: [
      "Geoproximity with bias",
      "Latency-based routing with health checks",
      "Weighted routing with health checks",
      "Failover routing with two record sets",
    ],
    correctAnswers: [1],
    explanation:
      "Latency-based routing measures actual round-trip performance between users and Regions, and health checks remove failed Regions — the performance-driven multi-Region pattern. Geoproximity uses geographic distance with biasing, weighted is ratio-based, failover is strict primary/secondary.",
  },
  {
    id: 319,
    category: "Networking & Content Delivery",
    question:
      "A security appliance must transparently inspect all inbound and outbound traffic for a VPC at scale, with the appliance fleet managed by a third-party vendor as containers. Which architecture fits?",
    options: [
      "A Gateway Load Balancer with the appliance fleet as targets, integrated via GWLB endpoints",
      "An ALB in front of the appliances with proxy rules",
      "An NLB with UDP listener mirroring",
      "VPC traffic mirroring to an analyzer instance only",
    ],
    correctAnswers: [0],
    explanation:
      "Gateway Load Balancer transparently inserts third-party virtual appliances into traffic paths via GWLB endpoints, scaling the fleet. ALBs proxy application traffic rather than inline-inspecting all flows, NLB mirroring copies flows for observation instead of gating them, and traffic mirroring is passive.",
  },
  {
    id: 320,
    category: "Networking & Content Delivery",
    question:
      "A Global Accelerator standard accelerator fronts ALBs in two Regions. One Region's health check fails. What happens to client traffic using the accelerator's static IPs?",
    options: [
      "Traffic is redistributed to the healthy Regional endpoint within seconds, without DNS changes",
      "Clients receive connection errors until Route 53 TTLs expire",
      "The accelerator routes to the nearest healthy edge location only",
      "Traffic blackholes until an operator updates the endpoint group",
    ],
    correctAnswers: [0],
    explanation:
      "Global Accelerator health-checks endpoint groups and shifts the anycast IPs' traffic to healthy Regional endpoints in seconds at the network layer — no DNS involvement. DNS TTL delays are exactly what GA avoids, edge locations aren't the target layer here, and operators don't need to intervene for designed failover.",
  },
  {
    id: 321,
    category: "Networking & Content Delivery",
    question:
      "A hybrid deployment must extend a single subnet's address space into an on-premises site with Layer 2 adjacency for a database cluster. Which service provides cloud extension of on-premises networks with local ingress?",
    options: [
      "AWS Outposts with its local VPC extension",
      "A Transit Gateway attachment over DX",
      "VPC peering over VPN",
      "An AWS Local Zone subnet",
    ],
    correctAnswers: [0],
    explanation:
      "Outposts extends the VPC into the on-premises site with local gateways and Layer 2 adjacency for workloads like low-latency databases. TGW and peering route at layer 3 between sites, and Local Zones are AWS-owned metro infrastructure, not customer premises.",
  },
  {
    id: 322,
    category: "Networking & Content Delivery",
    question:
      "A solutions architect must design a target group health check for a WebSocket backend where only the /health path responds with HTTP 200. The ALB serves other paths to the app. Where is the health check configured?",
    options: [
      "On each listener rule individually",
      "On the target group, matching its healthy threshold and path",
      "On the ALB's attributes globally",
      "On the instances via user data scripts",
    ],
    correctAnswers: [1],
    explanation:
      "Health checks are target-group settings (path, protocol, thresholds, intervals), shared by all targets registered to it. Listener rules route traffic, ALB attributes don't carry per-group health configuration, and user data can't configure the load balancer's probes.",
  },
  {
    id: 323,
    category: "Networking & Content Delivery",
    question:
      "A compliance rule mandates that a specific S3 bucket be reachable only from one approved VPC, and access attempts from anywhere else logged and denied. What implements the denial and logging together?",
    options: [
      "Bucket policy denying s3:* unless aws:SourceVpce equals the approved endpoint, with CloudTrail data events enabled",
      "Interface endpoint with a strict security group and S3 access logs to CloudWatch",
      "VPC Flow Logs on the endpoint ENI alone",
      "SCP denying s3:GetObject for all accounts",
    ],
    correctAnswers: [0],
    explanation:
      "The bucket policy's SourceVpce condition enforces the single approved path, and CloudTrail data events record every denied/allowed object-level call. Interface SGs don't deny access originating outside the VPC, flow logs lack S3 API identity context, and a blanket SCP over-blocks.",
  },
  {
    id: 324,
    category: "Networking & Content Delivery",
    question:
      "A five-tier application runs in one VPC. Each tier sits in its own subnet with NACL rules referencing the tier above. After adding a sixth tier in a new subnet, inter-tier traffic intermittently fails only on long-lived connections. Which NACL behavior explains this?",
    options: [
      "NACLs are stateful and drop mid-connection traffic after idle timeouts",
      "Return traffic to ephemeral ports is missing from the new subnet's NACL rules",
      "NACL rule numbers changed automatically when the subnet was added",
      "NACLs evaluate both subnet and instance layers and conflict",
    ],
    correctAnswers: [1],
    explanation:
      "NACLs are stateless; each subnet's rules must allow return traffic to the ephemeral port range, and a new subnet's rules commonly miss it, breaking established long-lived connections intermittently. NACLs are stateless (not stateful), rule numbers don't auto-change, and there's no dual evaluation layer.",
  },
  {
    id: 325,
    category: "Networking & Content Delivery",
    question:
      "A mobile gaming backend needs UDP traffic from millions of players terminated at fixed IPs in three Regions with per-Region failover under a minute, without DNS dependency. Which pairing delivers this?",
    options: [
      "Route 53 latency records to three NLBs with health checks",
      "A Global Accelerator with three endpoint groups (one per Region) fronting NLBs",
      "CloudFront with UDP origins",
      "An ALB with cross-zone balancing in each Region",
    ],
    correctAnswers: [1],
    explanation:
      "Global Accelerator provides static anycast IPs, supports UDP, fronts Regional NLBs as endpoint groups with traffic dials, and fails over in seconds at the network layer. DNS-based routing waits on TTLs, CloudFront doesn't carry UDP, and ALBs don't serve UDP.",
  },
];
