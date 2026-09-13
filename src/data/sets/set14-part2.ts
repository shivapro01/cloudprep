import type { QuizQuestion } from "../questions";

/** Practice Set 14 — questions 868–889 (networking and messaging advanced). Original questions. */
export const set14Part2: QuizQuestion[] = [
  {
    id: 868,
    category: "Networking & Content Delivery",
    question:
      "A SaaS platform must route specific enterprise customers (identified by their source CIDR ranges) to a dedicated infrastructure endpoint, while others use the default. Which Route 53 routing policy matches source IP to record?",
    options: [
      "CIDR routing policy, mapping IP ranges to endpoints",
      "Geolocation routing by country",
      "Latency routing with health checks",
      "Weighted routing by percentage",
    ],
    correctAnswers: [0],
    explanation:
      "CIDR routing resolves queries based on the source IP's location within configured CIDR collections — built for serving specific customer ranges differently. Geolocation works at country/continent granularity, and latency or weighted policies ignore source identity.",
  },
  {
    id: 869,
    category: "Networking & Content Delivery",
    question:
      "A Route 53 health check must reflect a CloudWatch alarm state (for example, queue depth indicating an unhealthy dependency) rather than probing an endpoint directly. Which health check type evaluates alarms?",
    options: [
      "A CloudWatch alarm health check, becoming healthy or unhealthy with the alarm state",
      "An endpoint health check with a custom string matcher",
      "A calculated health check referencing alarm ARNs",
      "A TCP health check on the metric port",
    ],
    correctAnswers: [0],
    explanation:
      "Alarm health checks link a CloudWatch alarm directly into DNS health, so DNS responses follow metric-derived conditions. Endpoint checks probe HTTP/TCP, calculated checks combine other health checks (not alarms), and metric ports are not a concept.",
  },
  {
    id: 870,
    category: "Networking & Content Delivery",
    question:
      "A company already brought its own public IP ranges into AWS via BYOIP for EC2. Can Global Accelerator use these customer-owned IPs as its static entry points?",
    options: [
      "Yes — Global Accelerator supports BYOIP address pools for accelerator static IPs",
      "No — accelerators only use AWS-provided anycast pools",
      "Yes, but only with dedicated hosts attached",
      "Yes, only in the us-east-1 endpoint group",
    ],
    correctAnswers: [0],
    explanation:
      "Global Accelerator accepts BYOIP addresses, letting accelerators front traffic with customer-owned ranges. AWS-provided pools are the default but not the only option, and host attachment or Region restrictions don't apply.",
  },
  {
    id: 871,
    category: "Networking & Content Delivery",
    question:
      "A WebSocket application is served through CloudFront in front of an ALB, and idle connections drop prematurely. What must be tuned?",
    options: [
      "The ALB idle timeout (and client keepalives) to exceed the WebSocket inactivity interval; CloudFront forwards WebSocket traffic natively",
      "CloudFront does not support WebSockets; remove it",
      "Enable sticky sessions on the CloudFront distribution",
      "Reduce the distribution's TTL to keep sockets alive",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront forwards WebSocket traffic to origins; premature drops come from idle timeouts, so the ALB timeout and client pings need alignment. WebSocket support exists, stickiness affects routing, and TTLs cache content not connections.",
  },
  {
    id: 872,
    category: "Networking & Content Delivery",
    question:
      "Microservices across many VPCs and accounts need service-to-service HTTP calls with built-in service discovery, mTLS, and authorization policies — without running service mesh sidecars. Which service provides application networking as a service?",
    options: [
      "AWS VPC Lattice",
      "A Transit Gateway with route tables",
      "App Mesh with Envoy sidecars",
      "VPC peering with security groups",
    ],
    correctAnswers: [0],
    explanation:
      "VPC Lattice provides managed service networks: discovery, HTTP/gRPC routing, mTLS, and auth policies across accounts and VPCs, with no sidecars. TGW routes packets, App Mesh requires mesh infrastructure, and peering plus security groups lacks the service layer.",
  },
  {
    id: 873,
    category: "Compute",
    question:
      "Within a single ECS cluster, services need simple discovery and connectivity; across clusters and accounts, broader service networking with policies is needed. Which pairing assigns the right tool to each scope?",
    options: [
      "ECS Service Connect inside the cluster; VPC Lattice across clusters and accounts",
      "VPC Lattice inside the cluster; Service Connect across accounts",
      "App Mesh everywhere regardless of scope",
      "Route 53 private zones everywhere with manual mTLS",
    ],
    correctAnswers: [0],
    explanation:
      "Service Connect is ECS-native for intra-cluster service-to-service needs; Lattice scales the same ideas across VPCs, clusters, and accounts with richer policies. Reversing or universalizing either tool misfits the scope.",
  },
  {
    id: 874,
    category: "Networking & Content Delivery",
    question:
      "A security review requires flow log records to include additional fields — VPC ID, subnet ID, TCP flags, and packet counts — beyond the default format. What should be configured?",
    options: [
      "A custom flow log format specifying the required fields at creation",
      "The default format plus CloudWatch metric filters to reconstruct fields",
      "Enhanced networking on all instances",
      "A different destination (S3 instead of CloudWatch) adds fields automatically",
    ],
    correctAnswers: [0],
    explanation:
      "Flow logs support custom formats listing exactly which fields (ids, flags, counters) each record carries. Metric filters and destinations change where or how data is viewed, not which fields exist.",
  },
  {
    id: 875,
    category: "Networking & Content Delivery",
    question:
      "Instances in a VPC must use a corporate DNS server pair instead of the AWS-provided resolver for all name resolution. Which VPC setting points them there?",
    options: [
      "The VPC's DHCP options set, specifying the DNS server IPs (and domain name)",
      "Each instance's /etc/resolv.conf edited by user data",
      "The route table's DNS entry",
      "The VPC's DNS hostnames attribute alone",
    ],
    correctAnswers: [0],
    explanation:
      "DHCP options sets deliver DNS configuration (servers, domain, NTP) to instances in the VPC. Editing resolv.conf per host is fragile, route tables don't configure DNS, and the hostnames flag only enables instance naming.",
  },
  {
    id: 876,
    category: "Security",
    question:
      "A strict egress policy requires instances to resolve only an allow-list of approved domains, blocking everything else at the DNS layer. Which Route 53 Resolver DNS Firewall configuration implements allow-listing?",
    options: [
      "A domain list rule group with an ALLOW action on the approved list and a BLOCK action as the default catch-all",
      "Individual BLOCK rules enumerating every malicious domain",
      "Blocking port 53 and forcing DoH",
      "Disabling DNS hostnames on the VPC",
    ],
    correctAnswers: [0],
    explanation:
      "DNS Firewall rules act on domain lists with ALLOW/BLOCK/ALERT actions; allow-listing pairs one allow rule with a default block. Enumerating bad domains is deny-listing (whack-a-mole), and the other options break resolution.",
  },
  {
    id: 877,
    category: "Cost Optimization",
    question:
      "A FinOps review of PrivateLink adoption wants to forecast its cost structure accurately. How does an interface VPC endpoint bill?",
    options: [
      "An hourly charge per endpoint per AZ plus a per-GB data processing charge",
      "A one-time provisioning fee with free data transfer",
      "Per-request pricing only, like API Gateway",
      "No charge; only the underlying service bills",
    ],
    correctAnswers: [0],
    explanation:
      "Interface endpoints bill hourly per endpoint per AZ plus per-GB processed — important when scaling endpoints across AZs. The other models misdescribe the pricing shape.",
  },
  {
    id: 878,
    category: "Application Integration",
    question:
      "An SQS message must reference a 50 MB video file. SQS payloads cap at 256 KB. What is the standard pattern for large payloads?",
    options: [
      "Store the payload in S3 and send the object key (pointer) in the message",
      "Compress the video below 256 KB",
      "Split the message into 200 sub-messages",
      "Increase the queue's maximum message size setting",
    ],
    correctAnswers: [0],
    explanation:
      "The claim-check pattern stores bulky payloads in S3 with the pointer in the message, keeping queues light. Compression cannot achieve the ratio, splitting corrupts atomicity, and the size limit is not configurable.",
  },
  {
    id: 879,
    category: "Application Integration",
    question:
      "Most messages in a queue must process immediately, but one producer's messages must wait 10 minutes. Rather than delaying the whole queue, what applies per message?",
    options: [
      "Per-message delay timers (up to 15 minutes) set by the producer",
      "A queue-wide delay queue of 10 minutes",
      "A visibility timeout of 10 minutes for those consumers",
      "A dead-letter queue with a delayed redrive",
    ],
    correctAnswers: [0],
    explanation:
      "Message timers delay individual messages (up to 15 minutes) independent of the queue's default delay. Queue-wide delay affects every producer, visibility timeout applies post-receipt, and DLQ delays don't implement producer intent.",
  },
  {
    id: 880,
    category: "Application Integration",
    question:
      "A legacy application written against JMS must move to AWS with minimal code changes, using a managed message broker supporting JMS, AMQP, MQTT, STP?, STOMP, and OpenWire. Which service fits?",
    options: [
      "Amazon MQ",
      "Amazon SQS, which implements JMS natively",
      "Amazon SNS with protocol adapters",
      "Amazon MSK with a JMS bridge",
    ],
    correctAnswers: [0],
    explanation:
      "Amazon MQ hosts ActiveMQ (and RabbitMQ) brokers with native JMS and other industry protocols, minimizing migration code changes. SQS is a proprietary API (no JMS), SNS is pub/sub push, and MSK is Kafka.",
  },
  {
    id: 881,
    category: "Application Integration",
    question:
      "A Step Functions task fails and the Catch clause triggers. The workflow must record the error name, cause, and stack for the fallback path. How does the error payload reach the fallback state?",
    options: [
      "Catch with ResultPath places the error object (Error, Cause fields) into the state input for the fallback state",
      "The error is written only to CloudWatch Logs and unreadable in the workflow",
      "Retry clauses deliver errors to the fallback state",
      "Errors must be re-thrown through a Choice state to be visible",
    ],
    correctAnswers: [0],
    explanation:
      "Catch captures the failure as an error object (with Error and Cause) and ResultPath injects it into the input passed onward. Retries retry, they don't route; logs are observability, not workflow data.",
  },
  {
    id: 882,
    category: "Application Integration",
    question:
      "A Step Functions workflow must launch an ECS task and pause until that task completes, continuing with the task's outcome. Which integration pattern blocks until finish?",
    options: [
      "The RunTask (.sync) optimized integration",
      "A WaitForTaskToken callback from the ECS container",
      "A Map state watching cluster events",
      "A Lambda polling DescribeTasks every second",
    ],
    correctAnswers: [0],
    explanation:
      "RunTask with .sync starts the task and holds the state until completion, surfacing results downstream. Callback tokens and polling loops are hand-built alternatives to the managed sync pattern.",
  },
  {
    id: 883,
    category: "Compute",
    question:
      "A misconfigured producer and consumer both trigger Lambdas that invoke each other, creating an invocation loop that runs up the bill. Which Lambda capability detects and stops such loops?",
    options: [
      "Recursive loop detection, which terminates invocations caught in a loop and notifies via CloudWatch",
      "Provisioned concurrency caps on the loop",
      "Reserved concurrency set to zero by AWS automatically",
      "Function URL throttling",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda's recursive loop detection identifies cyclic invocation patterns, stops them, and raises a CloudWatch metric/alarm signal. Concurrency settings limit scale but don't detect cycles, and URLs aren't involved.",
  },
  {
    id: 884,
    category: "Compute",
    question:
      "A Lambda function needs read access to a 200 GB reference dataset with file-system semantics, without bundling it in the deployment package. Which Lambda feature mounts this data?",
    options: [
      "Attaching an Amazon EFS access point to the function",
      "Embedding the data in a container image up to 10 GB",
      "Downloading from S3 into /tmp on every cold start",
      "Using a Layer with the dataset included",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda functions can mount EFS file systems via access points for large datasets with file semantics. Container images cap at 10 GB, /tmp downloads are slow and size-capped, and layers share the package size limit.",
  },
  {
    id: 885,
    category: "Application Integration",
    question:
      "One expensive method on an otherwise cheap API needs its own tighter throttling limit, independent of stage-level settings. Where is a per-method throttle set?",
    options: [
      "Method-level throttling settings overriding the stage defaults for that method",
      "A usage plan applied only to that path",
      "A Lambda alias concurrency for the backend",
      "A resource policy on the method resource",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway supports per-method overrides of rate and burst on top of stage-level throttling. Usage plans meter API keys across the API, alias concurrency is backend-side, and resource policies gate identity.",
  },
  {
    id: 886,
    category: "Application Integration",
    question:
      "A Lambda authorizer's policy is cached by API Gateway, so a recently revoked caller still passes for minutes. What controls how quickly revocation takes effect?",
    options: [
      "The authorizer's TTL (results cache setting) — reducing it shortens the revocation window",
      "The API Gateway stage deployment timestamp",
      "The Lambda function's timeout",
      "The caller's token signature algorithm",
    ],
    correctAnswers: [0],
    explanation:
      "Authorizer results cache for the configured TTL; revocations take effect when the cached entry expires, so the TTL is the tuning point. Stage deployments, function timeouts, and signature algorithms don't drive the cache.",
  },
  {
    id: 887,
    category: "Analytics",
    question:
      "Records produced by the Kinesis Producer Library aggregate multiple logical records into one Kinesis record for efficiency. What must consumers do?",
    options: [
      "Deaggregate aggregated records (via the KCL or deaggregation modules) to process each logical record",
      "Process each Kinesis record as exactly one logical record",
      "Configure the stream to disable aggregation",
      "Convert the stream to Firehose to auto-deaggregate",
    ],
    correctAnswers: [0],
    explanation:
      "KPL aggregation packs many records per Kinesis record, so consumers must deaggregate (KCL does this transparently) to see logical records. Treating records 1:1 loses data, and aggregation is a producer-side setting that consumers handle.",
  },
  {
    id: 888,
    category: "Management & Governance",
    question:
      "Which two are valid destinations for a CloudWatch Logs subscription filter? (Select TWO.)",
    options: [
      "A Kinesis Data Stream",
      "A Kinesis Data Firehose delivery stream",
      "An S3 Transfer Acceleration endpoint",
      "A Route 53 hosted zone",
      "An EC2 instance store",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Subscription filters stream logs to Kinesis Data Streams, Data Firehose, Lambda, or OpenSearch. The other targets aren't subscription destinations.",
  },
  {
    id: 889,
    category: "Networking & Content Delivery",
    question:
      "Which three target group types can an Application Load Balancer forward requests to? (Select THREE.)",
    options: [
      "EC2 instances",
      "IP addresses (including on-premises via private connectivity)",
      "Lambda functions",
      "S3 bucket websites",
      "DynamoDB tables",
    ],
    correctAnswers: [0, 1, 2],
    explanation:
      "ALB target groups register instances, IP addresses (VPC or on-premises over DX/VPN), and Lambda functions. S3 buckets and DynamoDB tables are not ALB targets.",
  },
];
