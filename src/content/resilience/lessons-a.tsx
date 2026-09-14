import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { ElbSelectionDiagram, LifecycleWarmPoolDiagram, ScalingPoliciesDiagram, SqsPatternsDiagram, TargetGroupDiagram } from "@/components/lesson/diagrams-2-1";

/** Section 2.1 lessons — part A (2.1.1–2.1.5). Original content. */

export function Lesson211() {
  return (
    <>
      <Lead>
        Elastic Load Balancing is the front door of every scalable AWS
        architecture — and the exam’s favorite “pick the right type” question.
        ALB, NLB, and GWLB each own a different layer and a different use case.
      </Lead>

      <Diagram title="Choosing the load balancer" caption="Layer, features, and target types decide the answer.">
        <ElbSelectionDiagram />
      </Diagram>

      <H2>The three types in depth</H2>
      <UL
        items={[
          <>
            <strong>ALB</strong> understands HTTP: routes by path, host, headers,
            query strings, and source IP; terminates TLS; supports
            authentication actions, WebSockets, gRPC, redirects, and fixed
            responses. Targets: instances, IP addresses (including on-premises
            over DX/VPN), and Lambda functions.
          </>,
          <>
            <strong>NLB</strong> forwards TCP/UDP/TLS at extreme scale with a
            static IP per AZ (assignable Elastic IPs — partners can allowlist
            them), single-digit-millisecond latency, and preserves the
            client’s source IP to the target. Health checks can be HTTP-based
            for app-aware detection.
          </>,
          <>
            <strong>GWLB</strong> exists to place third-party appliances
            (firewalls, IDS/IPS) inline in traffic paths, reached from other
            VPCs through GWLB endpoints — transparent to the flows being
            inspected.
          </>,
        ]}
      />
      <Callout type="exam">
        Matching phrases: <strong>“path-based routing between microservices”</strong>{" "}
        → ALB. <strong>“static IP addresses, millions of requests per second,
        TCP”</strong> → NLB. <strong>“all traffic through a firewall
        appliance”</strong> → GWLB with GWLB endpoints. <strong>“targets must
        be a Lambda function”</strong> → ALB.
      </Callout>

      <H2>Mechanics shared across types</H2>
      <UL
        items={[
          <>
            <strong>Scheme:</strong> internet-facing gets public nodes;{" "}
            <strong>internal</strong> serves private traffic only.
          </>,
          <>
            <strong>Cross-zone load balancing:</strong> ALB always on; NLB off
            by default — off means each AZ serves only its own targets, which
            skews load when AZ traffic is uneven (and adds cross-AZ transfer
            cost when on for NLB).
          </>,
          <>
            <strong>Listeners and rules:</strong> protocol + port on the
            front, rules routing to target groups — ALB adds condition-rich
            routing (path, host, header, query).
          </>,
          <>
            AZ coverage: an ALB needs subnets from <strong>at least two
            Availability Zones</strong> to exist.
          </>,
        ]}
      />
      <Callout type="tip">
        Deploy one load balancer per environment and route by path/host before
        adding more load balancers — ALB rules are cheaper and simpler than
        extra LBs, and the exam’s “reduce cost while keeping routing” answers
        lean on listener rules.
      </Callout>

      <H2>GWLB endpoints and ALB rule mechanics</H2>
      <UL
        items={[
          <>
            <strong>GWLB endpoints</strong> live in consumer VPC route tables:
            traffic to a prefix routes to the endpoint, traverses the
            appliance fleet, and returns — security teams inspect without
            touching the workload VPCs’ architecture.
          </>,
          <>
            <strong>ALB rule priorities:</strong> rules evaluate in priority
            order (lowest number first) with a final default action; overlapping
            path patterns need explicit priorities or the first match wins.
          </>,
          <>
            <strong>Rule condition combos:</strong> host-header + path + query
            string + source IP in one rule narrows precisely — the exam
            tests “route only tenant A’s /admin from office IPs” style
            combos.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson212() {
  return (
    <>
      <Lead>
        The load balancer is the visible part; the <strong>target
        group</strong> is where behavior is actually tuned. Health checks,
        stickiness, slow start, cross-zone, and deregistration delay each map
        to a specific symptom the exam describes.
      </Lead>

      <Diagram title="Target group anatomy" caption="Every user-experience setting lives here, not on the listener.">
        <TargetGroupDiagram />
      </Diagram>

      <H2>Health checks</H2>
      <P>
        Protocol, path, port, interval, timeout, healthy/unhealthy thresholds —
        per target group. Two traps: a check against a path that needs
        authentication always fails (use a dedicated health endpoint), and{" "}
        <strong>health check grace period</strong> lets slow-booting
        applications finish starting before their first evaluation — the fix
        for “instances pass checks, then fail users” versus “fail checks, then
        get replaced during deploys.”
      </P>

      <H2>The four behavior controls</H2>
      <KeyTable
        head={["Setting", "What it does", "Exam phrase"]}
        rows={[
          ["Deregistration delay", "Keeps serving in-flight requests while a target is deregistering (default 300s)", "“users lose requests during deploys or scale-in”"],
          ["Slow start", "Ramps traffic share to new targets over a duration", "“new instances get overwhelmed while caches warm”"],
          ["Stickiness", "Duration-based (LB-generated) or application cookies", "“users must stay on the same target for in-memory state”"],
          ["Cross-zone", "Distributes evenly across all AZs’ targets", "“one instance gets most of the traffic”"],
        ]}
      />
      <Callout type="warn">
        Stickiness is a stopgap, not a design: it concentrates load and breaks
        when instances die. The durable answer to in-memory sessions is an
        external store (ElastiCache/DynamoDB) — the exam may ask for the
        stopgap first and the proper fix second, in that order.
      </Callout>

      <H2>Target types and registration</H2>
      <UL
        items={[
          <>
            <strong>Instance targets</strong> register by instance ID — an Auto
            Scaling group registers automatically on launch.
          </>,
          <>
            <strong>IP targets</strong> accept any address in the VPC or
            on-premises ranges over hybrid connectivity — the pattern for
            mixed on-prem/cloud serving.
          </>,
          <>
            <strong>Lambda targets</strong> invoke a function per request — a
            single function per target group.
          </>,
        ]}
      />
      <Callout type="tip">
        When an exam scenario mixes on-premises servers and cloud instances
        behind one ALB, the answer is IP-type targets over Direct Connect or
        VPN — one load balancer, one URL, both fleets.
      </Callout>

      <H2>NLB TLS handling and health subtleties</H2>
      <UL
        items={[
          <>
            <strong>TLS passthrough vs termination:</strong> NLB can terminate
            TLS itself (certificates on the listener) or pass encrypted
            traffic straight to targets — passthrough keeps end-to-end
            encryption but hides HTTP details from the balancer.
          </>,
          <>
            <strong>Health check subtlety:</strong> NLB TCP checks only prove
            a port accepts connections; an HTTP check against a real path
            proves the application responds. “Healthy targets, failing
            requests” usually means TCP checks masking app failure.
          </>,
          <>
            <strong>Source IP preservation</strong> is default-on for NLB
            instance targets but requires client IP preservation settings
            for IP targets — security groups must allow the client ranges,
            not just the balancer.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson213() {
  return (
    <>
      <Lead>
        Auto Scaling policy selection is a pattern-match: the metric and its
        behavior point to exactly one policy type. Target tracking for “keep a
        metric at X”, predictive for known cycles, scheduled for known dates,
        step for shaped reactions.
      </Lead>

      <Diagram title="Scaling policy types" caption="Pick by how the load behaves, not by preference.">
        <ScalingPoliciesDiagram />
      </Diagram>

      <H2>Target tracking — the default choice</H2>
      <P>
        Define a metric and a target (average CPU 40%, ALB requests per target
        500, SQS backlog per instance 6); the group adds or removes capacity to
        hold the metric there. Predefined metrics exist (ALBRequestCountPerTarget,
        ASGAverageCPUUtilization), or bring a custom metric. It scales{" "}
        <em>in</em> as well as out, needs no alarm management, and respects{" "}
        <strong>instance warmup</strong> so freshly launched instances don’t
        skew the metric. This is the right answer unless the workload has a
        pattern that another policy serves better.
      </P>

      <H2>Step, simple, scheduled, predictive</H2>
      <UL
        items={[
          <>
            <strong>Step scaling:</strong> alarm breaches trigger sized
            adjustments (“+2 at 70%, +4 at 85%”) — precise control when you
            know the response curve, and pairs with instance warmup to avoid
            overshoot.
          </>,
          <>
            <strong>Scheduled scaling:</strong> for a launch event or known
            date — capacity set by time, not load.
          </>,
          <>
            <strong>Predictive scaling:</strong> ML forecasts daily/weekly
            cycles and provisions ahead of the ramp; “forecast only” mode lets
            you validate before it acts. The answer for{" "}
            “traffic follows predictable daily patterns and we’re tired of
            reacting late.”
          </>,
          <>
            <strong>Simple scaling:</strong> the legacy alarm-plus-cooldown
            model — recognize it, avoid it.
          </>,
        ]}
      />
      <Callout type="warn">
        Cooldown and instance warmup are different knobs: cooldown delays{" "}
        <em>subsequent scaling actions</em>; warmup excludes newly launched
        instances from the metrics so they aren’t counted before they can
        serve. Confusing them is a classic option trap.
      </Callout>

      <H2>Mixed instances — cost meets scale</H2>
      <P>
        One group, many instance types: an <strong>On-Demand base
        capacity</strong>, Spot above it, per-type <strong>weights</strong>
        reflecting capacity, and an allocation strategy —{" "}
        <strong>price-capacity-optimized</strong> has become the recommended
        Spot choice (lowest price among the pools least likely to be
        reclaimed). The exam presents “cheapest resilient fleet” scenarios
        expecting this exact assembly.
      </P>
      <Callout type="exam">
        <strong>“keep average requests per instance at N”</strong> → target
        tracking on ALBRequestCountPerTarget. <strong>“capacity must be ready
        before the morning peak”</strong> → predictive. <strong>“scale out
        more when CPU &gt; 70%, a lot more when &gt; 85%”</strong> → step scaling.
      </Callout>

      <H2>ASG limits and termination policies</H2>
      <UL
        items={[
          <>
            <strong>Default limits:</strong> 200 Auto Scaling groups, 500
            launch configurations/templates, 50,000 instances per Region
            (all adjustable) — “cannot create another ASG” questions point
            here.
          </>,
          <>
            <strong>Termination policies</strong> pick scale-in victims:
            default prefers AZ balance, then oldest launch template, then
            closest-to-billing-hour — custom policies protect stateful or
            spot-discounted members.
          </>,
          <>
            <strong>Instance protection</strong> (scale-in protection)
            exempts specific instances from scale-in termination —
            different from termination protection on the EC2 API.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson214() {
  return (
    <>
      <Lead>
        Lifecycle features are how an Auto Scaling group cooperates with
        reality: pausing for setup, keeping warm capacity, replacing images
        safely, and protecting instances from well-meaning terminations.
      </Lead>

      <Diagram title="Lifecycle states, hooks, and warm pools" caption="Hooks pause transitions; warm pools pre-initialize capacity.">
        <LifecycleWarmPoolDiagram />
      </Diagram>

      <H2>Lifecycle hooks — pausing transitions</H2>
      <UL
        items={[
          <>
            A <strong>launch hook</strong> holds an instance in{" "}
            <em>Pending:Wait</em> until your bootstrap completes — install
            agents, warm caches — then continue. Without it, instances join
            the load balancer half-configured.
          </>,
          <>
            A <strong>terminating hook</strong> holds a dying instance in{" "}
            <em>Terminating:Wait</em> to drain connections, upload final
            logs, or deregister from a service registry.
          </>,
          <>
            Hooks notify via SNS/EventBridge or are completed by heartbeat
            timeout; <Code>continue</Code> proceeds, <Code>abandon</Code>{" "}
            skips straight to termination.
          </>,
        ]}
      />

      <H2>Warm pools — capacity before you need it</H2>
      <P>
        A warm pool keeps pre-initialized instances (running, stopped, or{" "}
        <strong>hibernated</strong>) near the group. On scale-out they’re
        promoted instead of launched from scratch — turning a minutes-long
        boot into seconds. Combined with a launch lifecycle hook, promoted
        instances finish configuration before serving. The exam frames this
        as “scale-out must complete in seconds but AMI bootstrapping takes
        minutes.”
      </P>

      <H2>Instance refresh, rebalancing, standby</H2>
      <KeyTable
        head={["Feature", "What it does", "Exam phrase"]}
        rows={[
          ["Instance refresh", "Rolls the fleet onto the new launch template in batches, with warmup and automatic rollback", "“deploy a new AMI gradually and safely”"],
          ["Capacity rebalancing", "Proactively replaces Spot instances when interruption risk rises", "“maintain Spot capacity without disruption”"],
          ["Standby state", "Removes an instance from rotation for troubleshooting, group still owns it", "“fix this instance without the group replacing it”"],
          ["Scale-in protection", "Excludes instances from scale-in termination", "“long jobs must never be killed mid-run”"],
        ]}
      />
      <Callout type="warn">
        Detaching an instance and terminating it yourself bypasses group
        accounting — the group may launch a replacement while your detached
        instance still bills. Use Standby for temporary removal and complete
        lifecycle actions properly.
      </Callout>

      <H2>Suspended processes — the quiet ASG control</H2>
      <UL
        items={[
          <>
            Groups can <strong>suspend scaling processes</strong>
            (Launch, Terminate, ReplaceUnhealthy, AZRebalance, AlarmNotification…)
            individually — freezing behavior during deployments or incidents
            without deleting the group.
          </>,
          <>
            <strong>AZRebalance suspension</strong> stops automatic
            redistribution after a recovery — useful when rebalancing would
            churn healthy instances mid-incident.
          </>,
          <>
            Suspended ReplaceUnhealthy keeps failing instances alive for
            forensics — the exam’s “don’t terminate the evidence” answer.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson215() {
  return (
    <>
      <Lead>
        SQS is the buffer that lets two systems fail independently: the
        producer keeps accepting work while consumers process at their own
        pace. Every exam question about spikes, ordering, duplicates, or
        stuck messages is a knob on this one service.
      </Lead>

      <Diagram title="Queue patterns" caption="Standard vs FIFO decides ordering; visibility timeout and DLQ decide reliability.">
        <SqsPatternsDiagram />
      </Diagram>

      <H2>Standard vs FIFO — the fork in the road</H2>
      <KeyTable
        head={["Property", "Standard", "FIFO"]}
        rows={[
          ["Throughput", "Virtually unlimited", "300 TPS default, up to 3,000 with batching, ~1,800–18,000 with high-throughput mode"],
          ["Ordering", "Best-effort", "Strict within a MessageGroupId"],
          ["Delivery", "At-least-once (duplicates possible)", "Exactly-once processing semantics with deduplication"],
          ["Choose when", "Throughput > ordering", "Order and dedup matter (orders, ledger events)"],
        ]}
      />

      <H2>The four reliability knobs</H2>
      <UL
        items={[
          <>
            <strong>Visibility timeout:</strong> hides a message after receipt;
            it must exceed worst-case processing time or messages redeliver as
            duplicates. Consumers can extend it per message.
          </>,
          <>
            <strong>Dead-letter queue:</strong> after maxReceiveCount failed
            receives, messages quarantine into a DLQ instead of looping — and
            the redrive allow policy restricts who may drain it.
          </>,
          <>
            <strong>Long polling:</strong> wait up to 20 seconds per receive —
            nearly eliminates empty responses and their cost.
          </>,
          <>
            <strong>Delay queues / timers:</strong> hold messages up to 15
            minutes before first delivery — queue-wide or per message.
          </>,
        ]}
      />
      <Callout type="exam">
        Message payloads cap at <strong>256 KB</strong> — the bulky-payload
        answer is the <strong>S3 pointer pattern</strong> (store the payload
        in S3, send the key). And “consumers receive the same message twice”
        is a <strong>visibility timeout</strong> question, not a dedup
        question — unless the queue is FIFO, in which case it’s missing
        deduplication IDs.
      </Callout>

      <H2>Operational details that appear in options</H2>
      <UL
        items={[
          <>
            <strong>Retention:</strong> 1 minute to 14 days — the “keep
            messages replayable for a week” answer.
          </>,
          <>
            <strong>Server-side encryption:</strong> SSE-KMS on the queue, so
            even the DLQ contents are protected.
          </>,
          <>
            <strong>Partial batch responses:</strong> Lambda consumers report
            only the failed messages in a batch, so successes aren’t
            reprocessed.
          </>,
          <>
            <strong>Backpressure pattern:</strong> producer → queue →
            rate-limited consumer is the answer to “downstream API only
            allows N requests per second.”
          </>,
        ]}
      />

      <H2>Server-side details the exam loves</H2>
      <UL
        items={[
          <>
            <strong>Content-based deduplication:</strong> FIFO queues can hash
            the message body as the dedup ID automatically — no producer
            changes when body-uniqueness is the contract.
          </>,
          <>
            <strong>Dedup scope:</strong> 5-minute dedup interval — the same
            dedup ID sent 6 minutes later is a <em>new</em> message, not a
            duplicate.
          </>,
          <>
            <strong>Message timers vs delay queues:</strong> per-message DelaySeconds
            (up to 15 min) overrides the queue default — mixed-latency
            producers share one queue safely.
          </>,
          <>
            <strong>Redrive details:</strong> maxReceiveCount counts
            receives, not failures — a message received but never deleted
            advances toward the DLQ each visibility-timeout cycle.
          </>,
        ]}
      />
    </>
  );
}
