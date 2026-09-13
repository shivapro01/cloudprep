import type { QuizQuestion } from "../questions";

/** Practice Set 10 — questions 586–607 (troubleshooting and diagnosis). Original questions. */
export const set10Part1: QuizQuestion[] = [
  {
    id: 586,
    category: "Networking & Content Delivery",
    question:
      "Instances in a new VPC cannot resolve any public DNS names, though IP connectivity works. DNS hostnames is enabled on the VPC. What else must be enabled?",
    options: [
      "DNS support (enableDnsSupport) must be true so instances can resolve external names via the AmazonProvidedDNS resolver",
      "A NAT gateway must exist for DNS to function",
      "Route 53 public hosted zones must be attached to the VPC",
      "An interface endpoint for Route 53 must be created",
    ],
    correctAnswers: [0],
    explanation:
      "VPC DNS resolution requires both attributes: DNS support (which enables the resolver path for all names) and DNS hostnames (which assigns names to instances). NAT routes affect IP reachability, public zones aren't attached to VPCs, and a resolver endpoint is for hybrid resolution.",
  },
  {
    id: 587,
    category: "Compute",
    question:
      "A Lambda function works locally but every call through API Gateway returns 502 Bad Gateway. CloudWatch shows the function executed without errors. What is the most likely cause?",
    options: [
      "The function's response does not match the proxy integration format (missing statusCode/body structure)",
      "The Lambda timeout exceeds API Gateway's limit",
      "The function lacks internet access in its VPC",
      "API Gateway's throttling limit was exceeded",
    ],
    correctAnswers: [0],
    explanation:
      "Proxy integrations require the response shaped as { statusCode, headers, body }; a malformed payload produces 502 even though the function succeeded. Timeout breaches surface as 504s, VPC egress is unrelated to response shape, and throttling returns 429s.",
  },
  {
    id: 588,
    category: "Compute",
    question:
      "New Fargate tasks remain stuck in the PROVISIONING state and never start. The task definition and cluster are valid. Which networking misconfiguration commonly blocks task start?",
    options: [
      "The task's subnets lack a route to pull the container image (no NAT gateway or VPC endpoints for ECR/S3)",
      "The ECS cluster has no container insights enabled",
      "The service's desired count exceeds the account's task limit by one",
      "The task role lacks cloudwatch:PutMetricData",
    ],
    correctAnswers: [0],
    explanation:
      "Fargate pulls the image over the task's ENI networking; subnets without NAT or ECR/S3 endpoints cannot fetch the image, so tasks hang before running. Insights, small desired-count deltas, and metrics permissions do not prevent task startup.",
  },
  {
    id: 589,
    category: "Networking & Content Delivery",
    question:
      "GET requests to a CloudFront-backed API include an Authorization header, and CloudFront does not cache any of them. Why?",
    options: [
      "By default, requests carrying an Authorization header are forwarded to the origin and not cached by CloudFront",
      "Authorization headers are stripped by CloudFront automatically",
      "GET requests are never cacheable in CloudFront",
      "The distribution's protocol must be HTTPS-only for caching",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront's default behavior treats Authorization as a signal not to cache (to avoid leaking one user's response to another); caching such responses requires deliberate cache key design. Headers aren't stripped, GETs are cacheable, and the protocol is unrelated.",
  },
  {
    id: 590,
    category: "Management & Governance",
    question:
      "A CloudWatch alarm flips to INSUFFICIENT_DATA because its metric stopped arriving when an agent crashed. The on-call rotation should not be paged for missing data. Which alarm configuration handles this?",
    options: [
      "Set the alarm's treat-missing-data behavior to notBreaching",
      "Increase the alarm's evaluation periods to 24",
      "Change the statistic from Average to Sum",
      "Disable the alarm and rely on logs",
    ],
    correctAnswers: [0],
    explanation:
      "The missing-data treatment controls how gaps evaluate: notBreaching keeps the alarm in OK state when data points are absent. Longer evaluation windows delay real alerts, statistics don't govern gaps, and disabling removes coverage entirely.",
  },
  {
    id: 591,
    category: "Compute",
    question:
      "An EC2 launch attempt fails with 'Insufficient instance capacity' for the chosen type in the target AZ. What is the appropriate immediate remedy?",
    options: [
      "Retry in a different AZ or with a different instance type, or use Capacity Reservations for guaranteed capacity",
      "Request a higher EBS throughput quota",
      "Switch the instance to dedicated tenancy",
      "Increase the instance's EBS volume size",
    ],
    correctAnswers: [0],
    explanation:
      "Capacity errors are transient regional/hardware availability issues; retrying elsewhere, choosing another type, or reserving capacity resolves them. EBS and tenancy settings don't influence host capacity.",
  },
  {
    id: 592,
    category: "Database",
    question:
      "An Aurora cluster stored 50 TiB after years of churn. After deleting 20 TiB of obsolete tables, billing shows storage unchanged. What explains this?",
    options: [
      "Aurora storage grows automatically but does not shrink after deletions; reclaiming requires migrating data to a new cluster",
      "Billing lags actual usage by 30 days",
      "The deleted tables remain in read replicas only",
      "Aurora compresses deleted data but still bills at full rate",
    ],
    correctAnswers: [0],
    explanation:
      "Aurora allocates storage as data grows and retains the high-water mark; deletions free space internally but the cluster volume does not shrink, so migration to a fresh cluster is the reclaim path. Billing lag, replica isolation, and compression do not describe the behavior.",
  },
  {
    id: 593,
    category: "Application Integration",
    question:
      "A FIFO queue still delivers the same logical message twice within the deduplication interval. The producer never sets a MessageDeduplicationId. What happened?",
    options: [
      "Content-based deduplication was not enabled on the queue, so each send is treated as unique",
      "FIFO queues cannot deduplicate messages",
      "The consumer's visibility timeout expired",
      "Message groups reordered the messages",
    ],
    correctAnswers: [0],
    explanation:
      "FIFO deduplication requires either explicit deduplication IDs or queue-enabled content-based deduplication; without either, identical retries are treated as distinct messages. FIFO absolutely supports dedup, visibility timeout governs redelivery after receipt, and groups affect ordering not dedup.",
  },
  {
    id: 594,
    category: "Security",
    question:
      "A role in Account A cannot assume a role in Account B; the caller's policy plainly allows sts:AssumeRole on the target ARN. What is the next thing to inspect?",
    options: [
      "The target role's trust policy in Account B, which must allow the Account A principal",
      "The caller's MFA devices",
      "The SCP on Account A denying all STS",
      "The target role's permissions boundary for assume actions",
    ],
    correctAnswers: [0],
    explanation:
      "Assuming a cross-account role requires both halves: the caller's identity permission and the target role's trust policy admitting that caller. MFA only matters if conditioned, a blanket STS SCP would affect everything, and the target's permissions boundary limits the role's own actions, not who assumes it.",
  },
  {
    id: 595,
    category: "Security",
    question:
      "Users authenticating through Cognito successfully but receiving 403s from an API Gateway REST API configured with a Cognito authorizer. Tokens are present. What is the most likely misconfiguration?",
    options: [
      "The app client issuing the tokens lacks the scopes (or the user lacks group membership) required by the authorizer's configuration",
      "The user pool's password policy is too weak",
      "API Gateway's stage is not deployed",
      "The Cognito domain is not custom",
    ],
    correctAnswers: [0],
    explanation:
      "Cognito authorizers validate the access token against required scopes and group settings; a token from an app client without the needed scopes is rejected with 403. Password policy, deployment state, and custom domains don't affect authorization of valid requests.",
  },
  {
    id: 596,
    category: "Compute",
    question:
      "A marketing burst pushes a Lambda function to its concurrency limit and invocations throttle with 429s, even though reserved concurrency was raised to the account's burst ceiling. Which remediations apply? (Select TWO.)",
    options: [
      "Request a Regional concurrency quota increase",
      "Add provisioned concurrency for predictable warm capacity during the campaign",
      "Reduce the function's memory allocation",
      "Convert the function to a container image",
    ],
    correctAnswers: [0, 1],
    explanation:
      "When reserved concurrency is capped by the Regional quota, only a quota increase (or spreading across Regions) raises the ceiling, and provisioned concurrency guarantees warm capacity for the planned burst. Memory and packaging don't change concurrency limits.",
  },
  {
    id: 597,
    category: "Application Integration",
    question:
      "API Gateway begins returning 429 Too Many Requests during a flash sale despite healthy backends. Which API Gateway mechanism raised the rejection rate, and what raises the ceiling?",
    options: [
      "API Gateway throttling limits were hit; request a limit increase or smooth traffic with buffering",
      "The WAF web ACL blocked the burst automatically",
      "Usage plan quotas expired for all customers",
      "CloudFront edge locations rejected the requests",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway enforces Regional throttle limits (rate and burst) returning 429s; limits can be raised via quota requests, and buffering designs absorb bursts. WAF blocks look like 403s, expired quotas would be per-key 403/429 patterns, and CloudFront doesn't generate 429s for origin throttles.",
  },
  {
    id: 598,
    category: "Networking & Content Delivery",
    question:
      "CloudFront returns 502 errors intermittently for a custom HTTPS origin after an infrastructure change. The origin certificate was replaced with one from the company's internal CA. What is the cause?",
    options: [
      "The origin must present a certificate signed by a trusted CA (and valid SNI); internal-CA certificates fail CloudFront's origin TLS validation",
      "The origin's security group blocks CloudFront's IP range",
      "CloudFront requires HTTP origins for custom origins",
      "The origin's DNS TTL expired",
    ],
    correctAnswers: [0],
    explanation:
      "When CloudFront connects over HTTPS, it validates the origin's certificate against trusted CAs and the origin domain name; an internal-CA certificate fails validation. Security group blocks cause connection failures rather than TLS errors, HTTP origins are allowed, and DNS TTLs affect resolution not TLS.",
  },
  {
    id: 599,
    category: "Security",
    question:
      "Users receive 403 Forbidden responses from a CloudFront-served path where the origin serves 200s when tested directly. Which CloudFront-attached component is most likely rejecting the requests?",
    options: [
      "An AWS WAF web ACL rule matching the requests",
      "The origin access control policy",
      "The behavior's allowed HTTP methods",
      "The distribution's price class",
    ],
    correctAnswers: [0],
    explanation:
      "WAF web ACLs return 403s when rules match, before origin involvement — the classic mismatch of 'works directly, blocked via CDN.' OAC affects origin-side access, allowed methods yield 405s, and price class affects edge availability.",
  },
  {
    id: 600,
    category: "Networking & Content Delivery",
    question:
      "Users alternately land on two application versions behind Route 53 weighted records, breaking server-side sessions. The team assumed weighted routing would pick one endpoint per user. What is the correct takeaway?",
    options: [
      "Weighted routing chooses a record per DNS resolution, so users may bounce between endpoints; session continuity requires shared session state or stickiness at the app layer",
      "Weighted routing is broken and should be replaced with simple routing",
      "Route 53 caches a user's choice permanently for a year",
      "Weighted routing only works with Elastic Load Balancers",
    ],
    correctAnswers: [0],
    explanation:
      "Each DNS lookup independently selects a weighted record; per-user persistence must come from shared session stores or application-level stickiness, not from DNS weight. The routing isn't broken, TTLs are short-lived, and the policy works with any endpoint.",
  },
  {
    id: 601,
    category: "Compute",
    question:
      "After enforcing IMDSv2 (HttpTokens=required), an agent on the instances can no longer fetch credentials while newer tooling works. What happened?",
    options: [
      "The agent still requests metadata via IMDSv1 (without a token), which is now rejected; upgrade the agent or SDK",
      "The instance profile was detached during the change",
      "The metadata hop limit dropped to zero",
      "IMDSv2 requires public IP addresses",
    ],
    correctAnswers: [0],
    explanation:
      "Requiring tokens breaks IMDSv1-style direct requests; agents and SDKs must be updated to issue token-based IMDSv2 requests. The profile, hop limit, and IP addressing are unrelated to the protocol change.",
  },
  {
    id: 602,
    category: "Storage",
    question:
      "A database instance's CPU is modest, but storage metrics show its volume consistently at maximum IOPS with rising queue length. What is the bottleneck and remedy?",
    options: [
      "The EBS volume is the bottleneck; provision higher IOPS (gp3 increase or io2)",
      "The instance CPU needs upgrading",
      "The database needs more read replicas",
      "The VPC needs larger subnets",
    ],
    correctAnswers: [0],
    explanation:
      "Volume IOPS saturation with queue depth indicates storage contention independent of CPU; increasing provisioned IOPS addresses it directly. CPU upgrades and replicas address different bottlenecks, and subnet size is irrelevant.",
  },
  {
    id: 603,
    category: "Networking & Content Delivery",
    question:
      "Under heavy load, instances behind a NAT gateway see intermittent connection failures to external endpoints, while CloudWatch shows the NAT gateway healthy with elevated metrics. What is the likely cause?",
    options: [
      "NAT gateway port exhaustion under high connection churn; distribute load across additional NAT gateways (per AZ) or reduce connection churn",
      "The NAT gateway's elastic IP expired",
      "The private route tables lost their default routes",
      "The internet gateway lacks bandwidth allocation",
    ],
    correctAnswers: [0],
    explanation:
      "A single NAT gateway has finite source ports (roughly 64k per destination); heavy churn exhausts them causing resets, remedied by spreading across more gateways or taming connection behavior. IPs, routes, and IGW allocations are not the failure mode.",
  },
  {
    id: 604,
    category: "Management & Governance",
    question:
      "A CloudFormation stack creation fails with 'Insufficient capabilities' referencing IAM resources defined in the template. What resolves this?",
    options: [
      "Acknowledge the CAPABILITY_IAM (or CAPABILITY_NAMED_IAM) capability when creating the stack",
      "Remove all IAM resources from the template permanently",
      "Deploy the template from the root account",
      "Convert the IAM resources into parameters",
    ],
    correctAnswers: [0],
    explanation:
      "Templates creating IAM resources require explicit capability acknowledgment, a safety gate confirming intent. Removing IAM resources dodges the requirement but not the design, root adds nothing, and parameters don't change the capability requirement.",
  },
  {
    id: 605,
    category: "Management & Governance",
    question:
      "Systems Manager Run Command lists only some instances as managed; recently launched instances are missing from the fleet. What is the most common cause?",
    options: [
      "The new instances lack an instance profile with the AmazonSSMManagedInstanceCore policy (or the agent isn't running)",
      "The instances were launched in a different account",
      "Run Command requires instance store volumes",
      "The instances use IPv6 addressing",
    ],
    correctAnswers: [0],
    explanation:
      "SSM manages instances whose agent runs with permissions from the SSM core managed policy via their instance profile; missing either removes them from the fleet. Account, storage, and IP choices don't gate SSM registration.",
  },
  {
    id: 606,
    category: "Management & Governance",
    question:
      "Which two situations legitimately put a CloudWatch alarm into INSUFFICIENT_DATA? (Select TWO.)",
    options: [
      "The monitored metric stopped publishing because its source (agent or service) failed",
      "The alarm's evaluation period precedes the first available data point of a new metric",
      "The alarm breached its threshold twice",
      "The statistic was changed from Sum to SampleCount",
      "The alarm has an SNS action attached",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Algorithms report insufficient data when nothing arrives (source failure) or when history hasn't accumulated yet. Breaches produce ALARM, statistic changes don't cause the state, and actions are consequences not causes.",
  },
  {
    id: 607,
    category: "Management & Governance",
    question:
      "A solutions architect must map a new workload's design reviews to the AWS Well-Architected Framework. Which six pillars make up the framework?",
    options: [
      "Operational excellence, security, reliability, performance efficiency, cost optimization, sustainability",
      "Agility, elasticity, durability, redundancy, economy, observability",
      "Compute, storage, databases, networking, security, management",
      "Speed, scale, strength, stability, savings, simplicity",
    ],
    correctAnswers: [0],
    explanation:
      "The Well-Architected Framework's six pillars are operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. The other lists are invented groupings, not the framework's pillars.",
  },
];
