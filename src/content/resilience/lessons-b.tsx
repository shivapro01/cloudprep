import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { EventBridgeDiagram, StepFunctionsDiagram } from "@/components/lesson/diagrams-2-1";

/** Section 2.1 lessons — part B (2.1.6–2.1.10). Original content. */

export function Lesson216() {
  return (
    <>
      <Lead>
        SNS is push-based pub/sub: one publish fans out to many subscribers
        across protocols. It decouples “something happened” from “everyone who
        cares reacts” — and filter policies make each subscriber hear only its
        slice.
      </Lead>

      <H2>Topics, subscriptions, protocols</H2>
      <UL
        items={[
          <>
            Publishers send to a <strong>topic</strong>; subscribers choose a
            protocol: <strong>SQS queues</strong> (durable pull),
            <strong> Lambda</strong>, <strong>HTTP/S endpoints</strong>,
            email/SMS, <strong>platform endpoints</strong> for mobile push
            (FCM/APNs), and Firehose.
          </>,
          <>
            <strong>Fan-out pattern:</strong> publish once → SNS delivers to
            an SQS queue per consumer type, a Lambda, and an email list — all
            in parallel, each retrying independently.
          </>,
          <>
            Mobile push uses <strong>platform endpoint applications</strong> —
            device tokens registered as endpoints, messages delivered through
            FCM/APNs.
          </>,
        ]}
      />

      <H2>Filter policies — selective delivery</H2>
      <P>
        A subscription can declare a <strong>filter policy</strong> over{" "}
        <strong>message attributes</strong>: exact matches, prefix matching,{" "}
        <Code>anything-but</Code>, numeric ranges. The producer publishes
        everything with attributes; each subscriber receives only its slice —
        no consumer-side filtering logic, no multiple topics.
      </P>

      <H2>SNS FIFO and delivery reliability</H2>
      <UL
        items={[
          <>
            <strong>FIFO topics</strong> preserve ordering within message
            groups and deduplicate — pairing with SQS FIFO subscribers for
            ordered fan-out pipelines.
          </>,
          <>
            Delivery retries back off over time, and a{" "}
            <strong>redrive policy (DLQ)</strong> per subscription captures
            messages a failing endpoint can’t accept.
          </>,
          <>
            <strong>Data protection policies</strong> can mask PII in message
            payloads for subscribers that must not see raw values.
          </>,
          <>
            Topics encrypt with KMS; delivery status can log to CloudWatch
            per protocol.
          </>,
        ]}
      />
      <Callout type="exam">
        <strong>“One order event must reach email, a queue, and a
        function”</strong> → SNS fan-out. <strong>“Subscribers only want their
        kind of events”</strong> → filter policies. <strong>“Mask customer
        emails in notifications”</strong> → SNS data protection policy.{" "}
        <strong>“Ordered events into SQS FIFO consumers”</strong> → SNS FIFO
        topic.
      </Callout>
      <Callout type="warn">
        SNS pushes; it doesn’t buffer for consumers. A slow HTTP subscriber
        gets retries and then a redrive — for “process later at your own
        pace,” the subscriber should be an SQS queue, not a flaky endpoint.
      </Callout>

      <H2>Size, filter, and fan-out limits</H2>
      <UL
        items={[
          <>
            <strong>256 KB per published message</strong> (same as SQS) —
            larger payloads use the S3-pointer pattern before publishing.
          </>,
          <>
            <strong>Filter policy limits:</strong> 200 policies per topic
            (standard), complex AND/OR nesting on attributes — but filters
            run on attributes, never the message body.
          </>,
          <>
            <strong>Fan-out scale:</strong> up to 100,000+ deliveries per
            topic; FIFO topics cap lower with per-group ordering preserved.
          </>,
          <>
            <strong>Raw message delivery</strong> skips the SNS JSON envelope
            for SQS/HTTP subscribers that want the payload untouched.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson217() {
  return (
    <>
      <Lead>
        EventBridge is the event bus for the well-architected application:
        many producers publish structured events, rules route them to many
        targets, and the platform adds schemas, archives, replay, and
        scheduling on top.
      </Lead>

      <Diagram title="Buses, rules, targets — plus archive, scheduler, pipes" caption="Adding a consumer is just another rule; producers never change.">
        <EventBridgeDiagram />
      </Diagram>

      <H2>Buses and rules</H2>
      <UL
        items={[
          <>
            The <strong>default bus</strong> receives AWS service events;{" "}
            <strong>custom buses</strong> take application <Code>PutEvents</Code>{" "}
            traffic; <strong>partner sources</strong> ingest SaaS events — all
            routed by the same rule engine.
          </>,
          <>
            <strong>Rules</strong> match on event patterns (fields, prefixes,
            numeric comparisons) or schedules, then deliver to targets — with{" "}
            <strong>input transformers</strong> reshaping each payload per
            target.
          </>,
          <>
            Rules support <strong>DLQs per target</strong> and retry policies,
            so a down consumer doesn’t lose events.
          </>,
        ]}
      />

      <H2>The four capabilities exams probe</H2>
      <KeyTable
        head={["Capability", "What it does", "Exam phrase"]}
        rows={[
          ["Archive + replay", "Stores matched events; replay to the same or new target", "“re-deliver events lost during an outage”"],
          ["Scheduler", "One-time or recurring invocations to any target", "“run this exactly at 2026-09-30 23:00”"],
          ["Pipes", "Point-to-point: source → optional enrichment → target", "“DynamoDB stream → enrich via Lambda → HTTP API”"],
          ["Schema registry", "Discovers event schemas, generates code bindings", "“consumers must validate against producer contracts”"],
        ]}
      />
      <Callout type="exam">
        The comparison trio: <strong>“one event, multiple consumers”</strong> →
        SNS or EventBridge (EventBridge when routing by content, schemas, or
        cross-account are mentioned). <strong>“buffer and decouple”</strong> →
        SQS. <strong>“route AWS service events by their detail fields”</strong>{" "}
        → EventBridge — AWS services emit there natively.
      </Callout>
      <Callout type="warn">
        EventBridge delivers <strong>at-least-once</strong> and rules run
        targets in parallel without ordering guarantees — strictly ordered
        processing still needs FIFO queues or Kinesis behind the rule.
      </Callout>

      <H2>Archives, retention, and cross-region buses</H2>
      <UL
        items={[
          <>
            <strong>Archives</strong> retain matched events with configurable
            retention — replay any window to the same or new targets for
            recovery, testing, or backfill.
          </>,
          <>
            <strong>Cross-Region event buses:</strong> EventBridge supports
            routing events to buses in other Regions (and accounts) via
            resource policies — the multi-Region event backbone pattern.
          </>,
          <>
            <strong>Schema discovery</strong> samples live events into the
            registry — consumers generate bindings from reality, not docs.
          </>,
          <>
            <strong>Dead-letter queues on rules</strong> capture failed
            invocations per target for replay after fixes.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson218() {
  return (
    <>
      <Lead>
        Step Functions turns “Lambda A calls Lambda B calls Lambda C, with
        retries and hope” into a declarative state machine: steps, branches,
        parallel work, retries, and error routing — with execution history as
        the audit log.
      </Lead>

      <Diagram title="Standard vs Express, and the state vocabulary" caption="Choose the workflow type by volume and auditability; compose logic from state types.">
        <StepFunctionsDiagram />
      </Diagram>

      <H2>Standard vs Express — the decision</H2>
      <KeyTable
        head={["", "Standard", "Express"]}
        rows={[
          ["Duration", "Up to 1 year", "Up to 5 minutes"],
          ["Execution model", "Exactly-once task execution", "At-least-once (idempotency on you)"],
          ["Rate", "2,000 executions/s", "100,000 executions/s"],
          ["History", "Full, console-inspectable", "None in-console (CloudWatch Logs)"],
          ["Price", "Per state transition", "Per run + duration — ~10x cheaper"],
          ["Choose for", "Auditable business workflows", "High-volume event/IoT/data processing"],
        ]}
      />

      <H2>State types and error handling</H2>
      <UL
        items={[
          <>
            <strong>Task</strong> states do work (Lambda, ECS, Glue, SNS,
            DynamoDB…), each with <strong>Retry</strong> (backoff, max
            attempts, interval) and <strong>Catch</strong> (route the error
            object to a fallback path via <Code>ResultPath</Code>).
          </>,
          <>
            <strong>Choice</strong> branches on input; <strong>Parallel</strong>{" "}
            runs branches concurrently and joins; <strong>Map</strong> iterates
            arrays — <strong>Distributed Map</strong> scales to tens of
            thousands of child executions with capped concurrency.
          </>,
          <>
            <strong>Wait</strong> pauses for a delay or timestamp;{" "}
            <strong>Pass</strong> shapes data;{" "}
            <strong>Succeed/Fail</strong> terminate.
          </>,
        ]}
      />

      <H2>Service integrations — the exam’s favorite details</H2>
      <UL
        items={[
          <>
            <strong>.sync integrations</strong> start a job (ECS RunTask,
            Glue, Fargate, DynamoDB?) and hold the state until it finishes.
          </>,
          <>
            <strong>waitForTaskToken callbacks</strong> pause until an external
            system — a human approver, a legacy app — calls{" "}
            <Code>SendTaskSuccess</Code> with the token.
          </>,
          <>
            The error object reaching a Catch state carries{" "}
            <Code>Error</Code> and <Code>Cause</Code> — the fallback state
            reads them from the input.
          </>,
        ]}
      />
      <Callout type="exam">
        Match: <strong>“six steps with retries and error branches”</strong> →
        Step Functions. <strong>“100k short executions per second, cheap”</strong>{" "}
        → Express. <strong>“wait for external approval”</strong> →{" "}
        waitForTaskToken. <strong>“process a huge S3 file list in parallel”</strong>{" "}
        → Distributed Map.
      </Callout>
      <Callout type="tip">
        Express pricing is per transition too — consolidating several tiny
        Lambdas into fewer states directly cuts the bill, an under-taught cost
        answer for high-volume workflows.
      </Callout>

      <H2>Execution limits and callback timeouts</H2>
      <UL
        items={[
          <>
            <strong>History limits:</strong> Standard executions cap at 25,000
            events — huge Map runs hit this before time limits, which is why
            Distributed Map exists.
          </>,
          <>
            <strong>waitForTaskToken timeouts:</strong> callbacks wait up to
            the task timeout (max ~1 year on Standard, minutes on Express)
            — set explicit timeouts or zombie executions linger.
          </>,
          <>
            <strong>Payload caps:</strong> 256 KB state input/output (1 MB
            with S3-backed large-payload patterns) — oversized payloads fail
            loudly, not silently.
          </>,
          <>
            <strong>Nested workflows:</strong> StartExecution from a state
            composes workflows; child history doesn’t count against the
            parent’s event limit.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson219() {
  return (
    <>
      <Lead>
        API Gateway and AppSync are the managed front doors: REST, HTTP, and
        WebSocket APIs on one side, GraphQL with subscriptions on the other.
        The exam tests type selection, authorizer pairing, and the
        per-feature limits.
      </Lead>

      <H2>REST vs HTTP vs WebSocket</H2>
      <KeyTable
        head={["API type", "Strengths", "Choose when"]}
        rows={[
          ["REST API (v1)", "Full feature set: usage plans, API keys, WAF per stage, request validation, caching, Canary releases, private endpoints, mTLS", "API keys per customer, detailed throttling, developer portal, request transformation"],
          ["HTTP API (v2)", "~70% cheaper, lower latency, JWT authorizers, CORS built-in", "Simple proxies to Lambda/ALB — “cost-optimized API”"],
          ["WebSocket API", "Bidirectional channels with connect/message/disconnect routes", "Chat, live dashboards, collaborative apps"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Endpoints:</strong> regional (same-Region clients),{" "}
            edge-optimized (global latency via CloudFront), or{" "}
            <strong>private</strong> (VPC interface endpoint + resource
            policy — unreachable from the internet).
          </>,
          <>
            <strong>Integrations:</strong> Lambda proxy, AWS service proxy
            (direct DynamoDB/SQS/Step Functions calls), VPC Link to private
            ALB/NLB, HTTP mock.
          </>,
          <>
            <strong>Limits:</strong> 29-second integration timeout (long work
            must go async), payload cap 10 MB, per-client usage plans.
          </>,
        ]}
      />

      <H2>AppSync — the GraphQL front door</H2>
      <P>
        AppSync serves a single GraphQL schema with resolvers into DynamoDB,
        Lambda, RDS, OpenSearch, and HTTP — plus{" "}
        <strong>managed real-time subscriptions over WebSockets</strong>,
        server-side caching per resolver, and fine-grained auth (Cognito,
        IAM, OIDC, Lambda, API keys). It answers every “GraphQL + real-time
        + multiple data sources” question in one service.
      </P>
      <Callout type="exam">
        Type selection: <strong>“API keys, quotas, and throttling per
        customer”</strong> → REST + usage plans. <strong>“cheapest proxy to
        Lambda”</strong> → HTTP API. <strong>“real-time updates to
        browsers”</strong> → WebSocket API or AppSync subscriptions.{" "}
        <strong>“GraphQL aggregating DynamoDB + Lambda”</strong> → AppSync.
      </Callout>
      <Callout type="warn">
        Two hard limits appear constantly: the{" "}
        <strong>29-second integration timeout</strong> (long work → 202 +
        async) and <strong>throttling 429s</strong> at Regional level (raise
        quota, buffer with SQS, or smooth at the edge with WAF rate rules).
      </Callout>

      <H2>Caching behavior and the CloudFront layer</H2>
      <UL
        items={[
          <>
            <strong>API Gateway caching</strong> (REST APIs): per-stage TTL,
            per-key invalidation, encrypted cache option — best for
            expensive, slowly-changing responses.
          </>,
          <>
            <strong>CloudFront in front of API Gateway</strong> adds edge
            caching with geographic distribution — the two caches stack
            (edge first, stage second).
          </>,
          <>
            <strong>Cache key discipline:</strong> authorization headers and
            API keys must <em>not</em> be part of the cache key, or one
            user’s response serves another.
          </>,
          <>
            <strong>Throttle + quota per usage plan:</strong> rate and burst
            per API key — the “noisy neighbor” answer for multi-tenant APIs.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson2110() {
  return (
    <>
      <Lead>
        Container orchestration on AWS reduces to two clusters (ECS, EKS) and
        two launch types (Fargate, EC2) — and the exam’s container questions
        are about placement, service discovery, and zero-downtime deployment
        mechanics.
      </Lead>

      <H2>ECS service mechanics</H2>
      <UL
        items={[
          <>
            A <strong>service</strong> keeps <em>desired count</em> running,
            registers tasks with a load balancer target group, and replaces
            unhealthy ones.
          </>,
          <>
            <strong>Service Connect / Cloud Map</strong> provide namespace-based
            discovery — services reach each other by logical name instead of
            hard-coded addresses.
          </>,
          <>
            <strong>Placement:</strong> strategies ordered per service —{" "}
            <Code>spread</Code> across AZs for resilience, then{" "}
            <Code>binpack</Code> memory/CPU for density — plus attribute{" "}
            <Code>constraints</Code> (e.g., GPU instances only).
          </>,
          <>
            <strong>Capacity providers</strong> mix Fargate, Fargate Spot, and
            EC2 with weights; cluster auto scaling manages the EC2 side.
          </>,
        ]}
      />

      <H2>Deployment strategies</H2>
      <KeyTable
        head={["Strategy", "Behavior", "Exam phrase"]}
        rows={[
          ["Rolling update", "Replaces tasks in batches; minimum healthy % keeps capacity", "“standard update with capacity maintained”"],
          ["Blue/green via CodeDeploy", "Provision replacement tasks, optional test listener, reroute production traffic, instant rollback", "“test new version before users see it; roll back instantly”"],
          ["Deployment circuit breaker", "Stops a failing rollout automatically and rolls back without CodeDeploy", "“deployment keeps failing — stop it automatically”"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>EKS:</strong> managed Kubernetes — managed node groups
            (AWS patches nodes), Fargate profiles (serverless pods by
            namespace), IRSA (per-service-account IAM roles), Karpenter for
            just-in-time nodes, Cluster Autoscaler for node-group scaling.
          </>,
          <>
            <strong>Task networking:</strong> awsvpc mode gives each task its
            own ENI — ELB target registration and security groups per task.
          </>,
        ]}
      />
      <Callout type="exam">
        Scenario shortcuts: <strong>“no servers to manage, per-second billing,
        spiky short tasks”</strong> → Fargate. <strong>“GPU or licensed-software
        hosts”</strong> → EC2 launch type with placement constraints.{" "}
        <strong>“Kubernetes APIs must be preserved”</strong> → EKS.{" "}
        <strong>“zero-downtime with instant rollback”</strong> → CodeDeploy
        blue/green.
      </Callout>
      <Callout type="tip">
        Health-check pairing matters: container-level health checks catch
        application failure that ELB checks miss; deployment circuit breakers
        use them to halt a bad rollout before it completes.
      </Callout>

      <H2>Service quotas and placement limits</H2>
      <UL
        items={[
          <>
            <strong>Service quotas:</strong> 1,000 services per cluster,
            5,000 tasks per service (soft limits) — “cannot create another
            service” questions point at quota increases, not architecture.
          </>,
          <>
            <strong>Task placement limits:</strong> 100 tasks per service
            with distinct placement constraints — spread requirements beyond
            that need multiple services.
          </>,
          <>
            <strong>Service discovery quotas:</strong> Cloud Map namespaces
            and services per namespace have their own caps that bite in
            microservice sprawl.
          </>,
        ]}
      />
    </>
  );
}
