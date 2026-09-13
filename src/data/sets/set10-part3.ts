import type { QuizQuestion } from "../questions";

/** Practice Set 10 — questions 630–650 (CDN, authentication, messaging nuances). Original questions. */
export const set10Part3: QuizQuestion[] = [
  {
    id: 630,
    category: "Networking & Content Delivery",
    question:
      "A CloudFront distribution's cache hit ratio sits at 40%, inflating origin costs. Operations wants to see which cache behaviors and query patterns cause misses. Which analysis path identifies the miss causes?",
    options: [
      "CloudFront cache statistics reports plus standard/real-time logs analyzed for miss reasons (cache behavior, query strings, headers)",
      "CloudWatch distribution request counts only",
      "Origin server CPU metrics during peak hours",
      "Route 53 query logs for the distribution domain",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront's cache statistics reports and request logs expose what varies per request (query strings, headers, cookies) behind misses, guiding cache key tuning. Aggregate counts, origin CPU, and DNS logs don't attribute cache misses.",
  },
  {
    id: 631,
    category: "Networking & Content Delivery",
    question:
      "Users on slow networks complain about transfer times for text-heavy pages from CloudFront. Which distribution setting reduces transferred bytes automatically for compressible content types?",
    options: [
      "Enable content compression, so CloudFront serves gzip/brotli-compressed responses to clients that accept them",
      "Increase the origin's EBS throughput",
      "Set the minimum TTL to one year",
      "Disable HTTP/3 on the behavior",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront compression serves automatically negotiated compressed responses, cutting bytes for text, CSS, JS, and similar types. Origin volume throughput, TTLs, and protocol toggles don't compress content.",
  },
  {
    id: 632,
    category: "Networking & Content Delivery",
    question:
      "Licensing rules prohibit serving content to users in specific countries. Which CloudFront feature blocks or allows requests by geography at the edge?",
    options: [
      "CloudFront geo restriction (allow/block country lists)",
      "Route 53 geolocation routing with missing records",
      "Origin IP allow lists in security groups",
      "S3 Object Lock regions",
    ],
    correctAnswers: [0],
    explanation:
      "Geo restriction is a native distribution setting filtering viewer requests by country before origin fetch. DNS routing shapes which endpoints serve, security groups filter by IP not country, and Object Lock is retention.",
  },
  {
    id: 633,
    category: "Networking & Content Delivery",
    question:
      "A security team requires that only the company's CloudFront distribution can fetch from the custom (non-S3) application origin, blocking direct-to-origin scraping. For custom origins, what verifies requests came via CloudFront?",
    options: [
      "An origin custom header carrying a shared secret, validated by the origin before serving",
      "Origin Access Control, which only works with S3 origins",
      "A WAF web ACL on the origin ALB only",
      "Signed URLs distributed to end users",
    ],
    correctAnswers: [0],
    explanation:
      "For non-S3 origins, the standard pattern is a secret custom header added by CloudFront and checked by the origin, since OAC applies to S3 origins. A WAF alone doesn't prove CloudFront provenance, and signed URLs authorize end users rather than gating origin fetches.",
  },
  {
    id: 634,
    category: "Networking & Content Delivery",
    question:
      "A single-page application served from S3 must route paths like /orders/42 to index.html client-side, instead of returning key-not-found errors. Where should the rewrite live for best performance?",
    options: [
      "A CloudFront Function rewriting non-asset request URIs to /index.html at the edge",
      "S3 website redirect rules evaluated per request",
      "A Lambda behind the distribution rewriting responses",
      "Route 53 weighted records alternating paths",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront Functions rewrite request URIs at the edge with sub-millisecond latency, making SPA fallback instant. S3 redirect rules work only with website endpoints and add origin round trips, and heavier functions are unnecessary for simple rewrites.",
  },
  {
    id: 635,
    category: "Networking & Content Delivery",
    question:
      "A team wants to safely test a new CloudFront configuration: send a small percentage of production traffic to the staged distribution while monitoring metrics, then promote. Which CloudFront feature manages this traffic split?",
    options: [
      "CloudFront continuous deployment policies (staging distribution with traffic percentage)",
      "Two distributions split by Route 53 weighted records and manual monitoring",
      "Origin groups switching per error",
      "Lambda@Edge selecting the distribution",
    ],
    correctAnswers: [0],
    explanation:
      "Continuous deployment policies send a configurable percentage of traffic to a staging distribution with its own config, with promotion when metrics look good. Hand-built dual distributions reimplement the managed feature, origin groups are failover, and edge selection adds code.",
  },
  {
    id: 636,
    category: "Security",
    question:
      "An ALB-fronted application must authenticate users through an OIDC provider before requests reach targets, offloading login flows from the application entirely. Which ALB feature performs authentication?",
    options: [
      "ALB listener authenticate-oidc (or authenticate-cognito) actions",
      "A WAF rule validating JWTs",
      "API Gateway Lambda authorizers on the target group",
      "Network ACL certificate inspection",
    ],
    correctAnswers: [0],
    explanation:
      "ALB natively supports authentication actions against Cognito or generic OIDC providers, redirecting unauthenticated users and forwarding verified identity headers to targets. WAF doesn't run login flows, authorizers belong to API Gateway, and NACLs are packet filters.",
  },
  {
    id: 637,
    category: "Security",
    question:
      "A Cognito user pool's hosted UI must be served from auth.example.com with HTTPS. Where must the certificate be requested?",
    options: [
      "In us-east-1, because the hosted UI custom domain is served through CloudFront regardless of pool Region",
      "In the same Region as the user pool",
      "In every Region where users live",
      "Self-signed, since Cognito serves it",
    ],
    correctAnswers: [0],
    explanation:
      "The Cognito hosted UI custom domain rides on CloudFront, so its ACM certificate must be in us-east-1 — a frequent gotcha distinct from Regional service certificates. Pool-Region certificates fail, multi-Region requests are unnecessary, and self-signature is rejected.",
  },
  {
    id: 638,
    category: "Security",
    question:
      "An API receives three Cognito JWTs from a client: one identifying the user, one authorizing API access, one used to obtain new tokens when expired. Which roles do these play?",
    options: [
      "ID token proves identity; access token authorizes API calls (carries scopes/groups); refresh token obtains new token pairs",
      "All three are interchangeable access credentials",
      "The refresh token is the primary API credential; the others are optional",
      "ID tokens authorize; access tokens identify; refresh tokens encrypt",
    ],
    correctAnswers: [0],
    explanation:
      "Each token type has a distinct role: identity claims for the app, scoped authorization for APIs, and long-lived renewal credentials. Treating them interchangeably is a common and dangerous error.",
  },
  {
    id: 639,
    category: "Security",
    question:
      "A Cognito user pool must detect credential-stuffing attempts, block logins from compromised passwords, and step up MFA for risky sign-ins automatically. Which feature set provides this?",
    options: [
      "Advanced security features with adaptive authentication and compromised-credential checks",
      "Longer password minimum length",
      "Email verification on every login",
      "Lowering token expiration to one minute",
    ],
    correctAnswers: [0],
    explanation:
      "Advanced security features evaluate risk per sign-in and trigger adaptive responses (allow, MFA, block), including known-breached credential checks. Password length, repeated verification, and token lifetimes don't provide risk-adaptive detection.",
  },
  {
    id: 640,
    category: "Application Integration",
    question:
      "The same API Gateway REST API must point at different Lambda aliases per environment (dev calls dev backend, prod calls prod backend) without duplicating the API. Which mechanism switches backend targets per stage?",
    options: [
      "Stage variables interpolated into integration endpoints (for example, ${stageVariables.lambdaAlias})",
      "Usage plans per environment",
      "Gateway responses per stage",
      "Request validators bound to stages",
    ],
    correctAnswers: [0],
    explanation:
      "Stage variables parameterize integrations, so identical API definitions in different stages hit different aliases or endpoints. Usage plans meter clients, gateway responses shape errors, and validators check payloads.",
  },
  {
    id: 641,
    category: "Application Integration",
    question:
      "A REST API must be completely unreachable from the internet, callable only through an interface VPC endpoint from inside the VPC. Which API Gateway endpoint type and control implements this?",
    options: [
      "A private endpoint type with a resource policy restricting calls to the VPC endpoint ID",
      "A regional endpoint with IP allowlisting",
      "An edge-optimized endpoint with WAF",
      "An HTTP API with CORS restrictions",
    ],
    correctAnswers: [0],
    explanation:
      "Private API Gateway endpoints are reachable only through VPC interface endpoints, and the resource policy pins authorization to the specific VPCE. Regional endpoints are public, edge optimization adds public presence, and CORS is a browser control.",
  },
  {
    id: 642,
    category: "Application Integration",
    question:
      "An API Gateway stage caches responses that include moderately sensitive fields. To protect cached copies at rest, which stage setting should be enabled?",
    options: [
      "Cache encryption of the cached responses",
      "Disabling metrics on the stage",
      "Reducing the cache TTL to zero and keeping the cache enabled",
      "Adding a usage plan to the stage",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway can encrypt cached response bodies, protecting data at rest in the cache. Metrics toggles are unrelated, zero TTL effectively disables caching, and usage plans meter clients.",
  },
  {
    id: 643,
    category: "Application Integration",
    question:
      "A WebSocket API must authenticate each client once at connection time, with the connection rejected before $default routes execute. Where does the authorizer attach?",
    options: [
      "On the $connect route, with the result applying for the connection's lifetime",
      "On every $default message individually",
      "In the disconnect route cleanup",
      "In the API's resource policy per IP",
    ],
    correctAnswers: [0],
    explanation:
      "WebSocket authorizers attach to the $connect route; authentication happens once and governs the whole connection. Per-message authorizers aren't the model, disconnect runs after closure, and resource policies gate network access rather than protocol auth.",
  },
  {
    id: 644,
    category: "Application Integration",
    question:
      "Which two mechanisms can authorize requests to an API Gateway REST API? (Select TWO.)",
    options: [
      "Cognito user pool authorizers validating JWTs",
      "Lambda authorizers implementing custom token or request validation",
      "S3 bucket policies attached to the stage",
      "NACL rules on the integration VPC",
      "Route 53 health checks",
    ],
    correctAnswers: [0, 1],
    explanation:
      "API Gateway natively supports Cognito JWT authorizers and Lambda-based custom authorizers (token or request style). Bucket policies, network ACLs, and health checks are not API authorization mechanisms.",
  },
  {
    id: 645,
    category: "Application Integration",
    question:
      "A Step Functions Express workflow bills per state transition and runs ten Lambda steps per execution at massive scale. Which structural change reduces its cost most directly?",
    options: [
      "Consolidate logic into fewer, larger task states to reduce the transition count per execution",
      "Increase each Lambda's memory so steps run faster",
      "Move the workflow to Standard without other changes",
      "Add a parallel state to duplicate steps for redundancy",
    ],
    correctAnswers: [0],
    explanation:
      "Express pricing scales with transitions, so merging logic into fewer states directly lowers per-execution cost. Memory affects duration not transition count, Standard has a different cost model but doesn't reduce transitions, and duplication multiplies work.",
  },
  {
    id: 646,
    category: "Compute",
    question:
      "A team must capture events from failed asynchronous Lambda invocations for replay. They recall the older dead-letter queue mechanism and ask what the modern recommendation is.",
    options: [
      "Lambda destinations (OnFailure), which support SQS, SNS, Lambda, and EventBridge targets with richer metadata",
      "Dead-letter queues remain the only option for async failures",
      "CloudWatch alarms with manual re-invocation",
      "Writing failures to /tmp inside the function",
    ],
    correctAnswers: [0],
    explanation:
      "Destinations supersede DLQs for asynchronous invocations, offering multiple target types and including request/response context in the delivered record. DLQs still work but are the legacy, SQS-only mechanism; the alternatives don't capture failure events.",
  },
  {
    id: 647,
    category: "Application Integration",
    question:
      "Producers in many member accounts must publish events to one central EventBridge bus in a security account. What must the central bus have for cross-account PutEvents?",
    options: [
      "A resource-based policy on the event bus allowing the member accounts (or the organization) to call PutEvents",
      "A shared KMS key for events",
      "Rule targets defined in each member account",
      "Cross-Region event bus replication enabled",
    ],
    correctAnswers: [0],
    explanation:
      "Event buses accept resource policies; granting member principals PutEvents lets any account publish to the central bus, where rules then route. KMS, target definitions, and replication don't gate who may publish.",
  },
  {
    id: 648,
    category: "Application Integration",
    question:
      "A single SQS dead-letter queue serves many source queues, and operators must ensure messages can only redrive back to their originating queue — not be consumed by arbitrary queues. Which SQS setting enforces this?",
    options: [
      "The DLQ's redrive allow policy listing permitted source queues",
      "The source queue's visibility timeout",
      "FIFO deduplication on the DLQ",
      "The DLQ's message retention period",
    ],
    correctAnswers: [0],
    explanation:
      "Redrive allow policies constrain which queues may move messages out of the DLQ, preventing unrelated consumers from draining others' failures. Timeouts, dedup, and retention don't govern redrive permissions.",
  },
  {
    id: 649,
    category: "Application Integration",
    question:
      "An SNS topic carries events containing customer emails and phone numbers. Compliance requires these fields be masked automatically for subscribers that must not see raw PII. Which SNS feature applies masking at publish time?",
    options: [
      "SNS data protection policies",
      "SNS filter policies on subscriptions",
      "KMS encryption of the topic",
      "Message attributes redaction flags",
    ],
    correctAnswers: [0],
    explanation:
      "Data protection policies use managed data identifiers to detect and mask or deny PII in message payloads automatically. Filter policies route messages, encryption protects at rest/in transit without masking fields, and attribute flags aren't a PII mechanism.",
  },
  {
    id: 650,
    category: "Compute",
    question:
      "Which pair of Lambda features attacks cold starts for latency-critical functions, with one tuned specifically for Java's initialization-heavy runtime? (Select TWO.)",
    options: [
      "Provisioned concurrency for pre-warmed environments",
      "SnapStart for Java, resuming from initialization snapshots",
      "Increasing function timeout",
      "Moving the function into a private VPC",
      "Disabling CloudWatch logging",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Provisioned concurrency keeps environments warm generally, and SnapStart specifically eliminates Java initialization latency via snapshot restore. Timeout, VPC placement, and logging settings don't affect initialization cost.",
  },
];
