import type { QuizQuestion } from "../questions";

/** Practice Set 7 — questions 413–434 (load balancing, messaging, eventing). Original questions. */
export const set7Part2: QuizQuestion[] = [
  {
    id: 413,
    category: "Networking & Content Delivery",
    question:
      "A security team must analyze detailed HTTP request metadata for every request hitting an Application Load Balancer — client IP, paths, user agents, and backend response codes — retained in S3 for querying. Which ELB capability provides this?",
    options: [
      "CloudWatch metrics on the load balancer",
      "ELB access logs delivered to S3",
      "VPC Flow Logs on the ALB nodes",
      "CloudTrail data events on the target group",
    ],
    correctAnswers: [1],
    explanation:
      "Access logs capture per-request details (timing, paths, client and target information, status codes) compressed into S3 for Athena analysis. Metrics are aggregates, Flow Logs see connections not HTTP semantics, and CloudTrail records control-plane actions.",
  },
  {
    id: 414,
    category: "Networking & Content Delivery",
    question:
      "A WebSocket application behind an ALB sees connections dropped after 60 seconds of client inactivity, breaking idle chat sessions. What is the appropriate fix?",
    options: [
      "Raise the ALB idle timeout above the client's keepalive interval, or have clients send periodic pings",
      "Move the workload to a Classic Load Balancer",
      "Enable sticky sessions on the target group",
      "Increase the target group's health check interval",
    ],
    correctAnswers: [0],
    explanation:
      "ALB closes idle connections after the idle timeout; aligning the timeout with (or exceeding) client ping/keepalive intervals keeps sessions alive. Switching balancer types is unnecessary for a timeout, stickiness affects routing affinity, and health checks target health rather than idle connections.",
  },
  {
    id: 415,
    category: "Networking & Content Delivery",
    question:
      "Newly launched targets behind an ALB receive full traffic immediately, overwhelming them while their caches warm. Which target group feature ramps traffic to new targets gradually?",
    options: [
      "Deregistration delay",
      "Slow start mode",
      "Connection termination on deregistration",
      "Sticky sessions",
    ],
    correctAnswers: [1],
    explanation:
      "Slow start mode linearly ramps the request share for newly healthy targets over a configurable duration, protecting warming instances. Deregistration delay governs scale-out draining, connection behavior at deregistration is separate, and stickiness affects which user reaches which target.",
  },
  {
    id: 416,
    category: "Networking & Content Delivery",
    question:
      "A Network Load Balancer's default TCP health checks mark targets healthy whenever the port is open, even when the application inside is hung. Which improvement makes NLB health checks application-aware?",
    options: [
      "Enable HTTP/HTTPS health checks with a request path on the target group",
      "Shorten the TCP health check interval to 5 seconds",
      "Register the targets with two different target groups",
      "Enable cross-zone load balancing",
    ],
    correctAnswers: [0],
    explanation:
      "NLB now supports HTTP/HTTPS health checks, which verify an actual application response path instead of merely an open TCP socket. Faster TCP checks still only prove connectivity, extra target groups add complexity without improving detection, and cross-zone balancing affects distribution.",
  },
  {
    id: 417,
    category: "Networking & Content Delivery",
    question:
      "An engineer tries to create an Application Load Balancer attached to subnets in only one Availability Zone and the request fails. What is the requirement?",
    options: [
      "ALBs require subnets from at least two Availability Zones",
      "ALBs require exactly three Availability Zones",
      "ALBs require one subnet per Availability Zone in the Region",
      "ALBs require public subnets only",
    ],
    correctAnswers: [0],
    explanation:
      "An ALB must span at least two AZs for availability; one-AZ configurations are rejected (internal ALBs may use private subnets, so public-only is false). Exactly three or Region-wide coverage is not the rule.",
  },
  {
    id: 418,
    category: "Storage",
    question:
      "S3 event notifications are delivered at least once, and a consumer occasionally receives the same event twice, corrupting stateful processing. How should consumers be hardened?",
    options: [
      "Assume exactly-once delivery and retry on duplicates",
      "Make processing idempotent, checking an event identifier (such as object version or a processed-events table) before acting",
      "Switch from standard notifications to FIFO queues, which eliminates all duplicates",
      "Reduce the consumer's concurrency to one",
    ],
    correctAnswers: [1],
    explanation:
      "Distributed event delivery is at-least-once, so consumers must tolerate duplicates through idempotent design (dedupe on event IDs or conditional writes). FIFO queues reduce but do not categorically eliminate redelivery, and lowering concurrency trades throughput for a false guarantee.",
  },
  {
    id: 419,
    category: "Application Integration",
    question:
      "A report generation job must run exactly once at a specific future timestamp (for example, 2026-09-30T23:00), not on a recurring schedule. Which feature schedules one-off invocations natively?",
    options: [
      "An EventBridge cron rule with a self-deleting target",
      "Amazon EventBridge Scheduler with a one-time schedule",
      "A Step Functions Wait state counting seconds",
      "A CloudWatch alarm on a time metric",
    ],
    correctAnswers: [1],
    explanation:
      "EventBridge Scheduler supports one-time schedules at exact timestamps plus recurring cron/rate patterns, with target invocation managed as a service. Self-deleting cron rules are a workaround, Wait states require the workflow to already be running, and alarms react to metrics.",
  },
  {
    id: 420,
    category: "Application Integration",
    question:
      "A Step Functions workflow must pause at a task until a human approver clicks a button in an external ticketing system, which then supplies the result. Which integration pattern implements the pause-and-resume?",
    options: [
      "A Wait state polling the ticketing system on a timer",
      "The .waitForTaskToken service integration, resuming when the external system calls SendTaskSuccess with the token",
      "A Map state iterating approvers",
      "A Lambda function with a 15-minute timeout holding the workflow open",
    ],
    correctAnswers: [1],
    explanation:
      "Callback patterns pass a task token to the external system; the workflow suspends until SendTaskSuccess/Failure is called with that token. Polling wastes invocations, Map is for parallel iteration, and holding a Lambda open for human timescales exceeds its limits.",
  },
  {
    id: 421,
    category: "Compute",
    question:
      "A Lambda function processes SQS messages in batches of 10. One poison message fails the entire batch, and all 10 messages retry — repeatedly reprocessing good messages. Which Lambda capability acknowledges only the failing message?",
    options: [
      "Increase the visibility timeout for failed batches",
      "Return partial batch item failures using ReportBatchItemFailures in the function response",
      "Configure the event source mapping's maximum retry attempts",
      "Route the whole batch to a dead-letter queue",
    ],
    correctAnswers: [1],
    explanation:
      "With biis (partial batch responses) enabled on the event source mapping, the function reports which message identifiers failed, so only those are retried or routed onward. Longer visibility extends hiding, retry settings apply to whole batches, and DLQing the batch discards the nine good messages.",
  },
  {
    id: 422,
    category: "Compute",
    question:
      "An API Gateway method invokes a Lambda that legitimately needs 60 seconds to respond, but clients receive 504 errors at 29 seconds. What is the architectural correction?",
    options: [
      "Increase the API Gateway integration timeout to 60 seconds in the stage settings",
      "Return 202 immediately and process asynchronously (for example, enqueue to SQS/Step Functions) with results polled or pushed",
      "Switch from Lambda proxy integration to non-proxy integration",
      "Move the function into the same VPC as the client",
    ],
    correctAnswers: [1],
    explanation:
      "API Gateway's integration timeout is capped at 29 seconds and cannot be raised, so long work must decouple from the request: acknowledge quickly and complete asynchronously. The 29-second cap is a hard limit, integration style does not change it, and VPC placement is unrelated.",
  },
  {
    id: 423,
    category: "Application Integration",
    question:
      "Malformed JSON payloads reach a Lambda function and fail inside it, wasting invocations. Which API Gateway feature rejects invalid bodies before invocation, per a defined schema?",
    options: [
      "Usage plans with request quotas",
      "Request validation using models defined in OpenAPI/JSON Schema",
      "Gateway responses with 400 templates",
      "WAF size constraints on the body",
    ],
    correctAnswers: [1],
    explanation:
      "Basic request validation compares payloads against declared models and rejects mismatches at the gateway — no Lambda cost, no downstream errors. Usage plans ration callers, gateway responses customize error output, and WAF inspects attack patterns rather than schema conformance.",
  },
  {
    id: 424,
    category: "Application Integration",
    question:
      "An S3 bucket's object-created events must reach four independent systems, and new systems are added regularly without touching the bucket's configuration each time. Which delivery design scales best?",
    options: [
      "Four direct S3 notification destinations, edited per addition",
      "Send events to an EventBridge bus and let each system subscribe via its own rule",
      "A nightly S3 Inventory diff shared by all systems",
      "Each system polls the bucket listing for changes",
    ],
    correctAnswers: [1],
    explanation:
      "With S3 events flowing into EventBridge, adding a consumer is just another rule on the bus — the bucket configuration never changes. Direct destinations require editing bucket notifications for every consumer, and inventory or polling patterns add minutes of latency and management burden.",
  },
  {
    id: 425,
    category: "Analytics",
    question:
      "One Kinesis shard receives disproportionately heavy traffic and throttles while other shards are idle. Which operation relieves the hot shard?",
    options: [
      "Merge the hot shard with an adjacent shard",
      "Split the hot shard into two shards, redistributing its hash key range",
      "Increase the consumers' batch sizes",
      "Switch the stream to on-demand data streams? no — use enhanced monitoring only",
    ],
    correctAnswers: [1],
    explanation:
      "Splitting a shard divides its key range so part of the traffic moves to a new shard, balancing load. Merging reduces capacity, batch size affects consumer reads rather than ingest throttling, and monitoring visibility does not redistribute keys.",
  },
  {
    id: 426,
    category: "Analytics",
    question:
      "A stream consumer was offline for 30 hours due to a deployment failure. Operations requires that no stream data be lost during such outages, which may last up to a week. What must be configured?",
    options: [
      "Extend the Kinesis data stream retention period to 7 days (or longer, up to 365)",
      "Enable enhanced monitoring on the stream shards",
      "Configure a dead-letter queue for the consumer",
      "Increase the number of shards during outages",
    ],
    correctAnswers: [0],
    explanation:
      "Records remain readable for the retention period (default 24 hours, extendable to 7 days and further to 365), so a week-long outage is survivable with extended retention. Monitoring exposes the problem without fixing it, DLQs are for failed deliveries not lag, and shard count is unrelated to retention.",
  },
  {
    id: 427,
    category: "Analytics",
    question:
      "A Kinesis Data Firehose delivery stream applies a Lambda transform, and some records fail transformation. Where do failed records go?",
    options: [
      "They are dropped permanently",
      "They are written to a designated error output S3 prefix for later processing",
      "They loop through the transform until they succeed",
      "They are delivered to the destination untransformed",
    ],
    correctAnswers: [1],
    explanation:
      "Firehose routes records that fail processing to a configured error S3 prefix (in the same delivery bucket) rather than blocking the stream or dropping them silently. Retry-until-success would stall the pipeline, and untransformed delivery would corrupt downstream data.",
  },
  {
    id: 428,
    category: "Application Integration",
    question:
      "A mobile app must receive push notifications through FCM and APNs when backend events occur. Which SNS capability delivers directly to these platforms?",
    options: [
      "SNS mobile push with platform endpoint applications for FCM/APNs",
      "SNS email subscriptions to the app's support address",
      "SQS queues polling the device's local database",
      "EventBridge API destinations posting to the app store",
    ],
    correctAnswers: [0],
    explanation:
      "SNS mobile push registers device tokens as platform endpoints and delivers messages straight to FCM or APNs. Email targets inboxes, SQS serves pull-based consumers, and API destinations are HTTP calls to services, not push networks.",
  },
  {
    id: 429,
    category: "Application Integration",
    question:
      "A chat application built on API Gateway WebSocket APIs must know which connection IDs are active so the backend can push messages to specific users. How is connection state tracked across stateless Lambda invocations?",
    options: [
      "Store connection IDs with user identifiers in DynamoDB, and use the management API's PostToConnection to deliver messages",
      "Store connection IDs in Lambda environment variables",
      "Use CloudFront sticky sessions to pin users to one connection",
      "Keep connections in an ElastiCache set and message clients directly",
    ],
    correctAnswers: [0],
    explanation:
      "WebSocket connections are tracked by ID; a DynamoDB mapping lets any Lambda look up a user's connection and call the API Gateway management endpoint to post messages. Environment variables are per-environment constants, sticky sessions don't span stateless push, and ElastiCache cannot deliver to sockets.",
  },
  {
    id: 430,
    category: "Application Integration",
    question:
      "A Step Functions workflow must start a Glue job and not proceed until the job finishes successfully. Which task configuration blocks until completion?",
    options: [
      "A standard Lambda wrapper polling job status",
      "The RunJob (.sync) service integration pattern",
      "A Wait state set to the expected job duration",
      "A Choice state evaluating job status each hour",
    ],
    correctAnswers: [1],
    explanation:
      "Optimized service integrations with .sync start the job and pause the workflow until completion, with the job's result available to subsequent states. Polling wrappers and timed waits reimplement this crudely, and Choice states evaluate conditions rather than awaiting jobs.",
  },
  {
    id: 431,
    category: "Compute",
    question:
      "A Lambda function must be callable over HTTPS with AWS IAM authentication, without deploying API Gateway or a custom authorizer. Which invocation option provides this?",
    options: [
      "A Lambda function URL with auth type AWS_IAM",
      "A public function URL with resource policy allow-all",
      "Direct invocation through the Lambda console share link",
      "An EventBridge rule targeting the function on request",
    ],
    correctAnswers: [0],
    explanation:
      "Function URLs provide a dedicated HTTPS endpoint; AWS_IAM auth requires SigV4-signed requests, giving IAM-grade access control with zero additional infrastructure. Open auth exposes the function publicly, the console has no invocable share link, and EventBridge responds to events, not HTTPS calls.",
  },
  {
    id: 432,
    category: "Application Integration",
    question:
      "Which two messaging services preserve ordering guarantees for related messages? (Select TWO.)",
    options: [
      "SQS FIFO queues, within a message group",
      "Kinesis Data Streams, within a shard key",
      "SQS standard queues with high concurrency",
      "SNS standard topics",
      "EventBridge default event bus",
    ],
    correctAnswers: [0, 1],
    explanation:
      "FIFO queues order strictly within message groups, and Kinesis orders strictly within a shard determined by the partition key — both provide scoped ordering. Standard SQS, standard SNS, and the default EventBridge bus make no ordering guarantee.",
  },
  {
    id: 433,
    category: "Application Integration",
    question:
      "A downstream vendor API allows only 50 requests per second and rejects bursts. The upstream producer is bursty, generating thousands of events in seconds. Which pattern protects the vendor endpoint?",
    options: [
      "Publish events to an SQS queue with a consumer that processes at a fixed, vendor-safe rate",
      "Fan the events out through SNS to hit the API from multiple sources",
      "Increase the Lambda concurrency and add retry-on-429 logic",
      "Batch all events into one giant request hourly",
    ],
    correctAnswers: [0],
    explanation:
      "A queue plus rate-limited consumer is the classic throttling/buffering pattern, absorbing bursts and emitting a smooth request stream. Fan-out multiplies pressure, bursty concurrency plus retries amplifies 429s, and giant batched requests typically break API contracts.",
  },
  {
    id: 434,
    category: "Application Integration",
    question:
      "Event producers evolve their payloads over time, and consumers must discover and validate against current schemas without hard-coding structure. Which EventBridge capability supports schema discovery and code bindings?",
    options: [
      "The EventBridge Schema Registry with auto-discovery and generated bindings",
      "SNS message attributes only",
      "Storing sample payloads in S3 and distributing links",
      "SQS message system attributes",
    ],
    correctAnswers: [0],
    explanation:
      "The Schema Registry discovers event schemas from the bus, versions them, and generates code bindings so consumers stay in sync as producers evolve. Message attributes carry metadata not structure, and sample files or system attributes provide no validation tooling.",
  },
];
