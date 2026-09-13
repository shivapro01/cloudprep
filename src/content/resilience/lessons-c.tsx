import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { DataLayerResilienceDiagram, DnsFailoverDiagram, DRTiersDiagram, MultiAzPatternsDiagram } from "@/components/lesson/diagrams-2-2";

/** Section 2.2 lessons — part A (2.2.1–2.2.6). Original content. */

export function Lesson221() {
  return (
    <>
      <Lead>
        High availability starts with one question asked of every tier: “if
        this Availability Zone disappeared right now, does the tier keep
        serving — with zero human action?” Multi-AZ design is the discipline
        of making every tier answer yes.
      </Lead>

      <Diagram title="The multi-AZ pattern, tier by tier" caption="Every layer is duplicated across zones; failures are absorbed automatically.">
        <MultiAzPatternsDiagram />
      </Diagram>

      <H2>Per-tier patterns</H2>
      <KeyTable
        head={["Tier", "Multi-AZ pattern"]}
        rows={[
          ["Load balancing", "ALB/NLB subnets in 2+ AZs; cross-zone distribution to targets everywhere"],
          ["Compute", "Auto Scaling group spanning AZs with minimum per AZ; unhealthy instances replaced in-place"],
          ["Database", "RDS Multi-AZ (synchronous standby, automatic failover) or Aurora replicas across AZs"],
          ["Caching", "ElastiCache replication group with multi-AZ automatic failover"],
          ["File/object storage", "EFS Standard, S3, FSx Multi-AZ — multi-AZ by design"],
          ["Network egress", "One NAT gateway per AZ, each private subnet routing to its local gateway"],
        ]}
      />

      <H2>What breaks the pattern in practice</H2>
      <UL
        items={[
          <>
            Instances <em>in</em> an ASG but all launched into one subnet — the
            group spans nothing; check the AZ distribution.
          </>,
          <>
            A “Multi-AZ” database whose applications cache the writer’s IP —
            the endpoint moves on failover; reconnect logic or RDS Proxy keeps
            the app unaware.
          </>,
          <>
            State pinned to an instance (local sessions, local files) — AZ
            resilience is useless if losing the instance loses the users.
          </>,
          <>
            NAT gateways: one gateway shared by every AZ’s private subnets
            turns a zone failure into a full outage.
          </>,
        ]}
      />
      <Callout type="exam">
        The exam phrase <strong>“remains available if an Availability Zone
        becomes unavailable”</strong> demands that <em>every</em> tier pass the
        audit — compute across AZs, data with a standby/replica, no per-AZ
        chokepoints. A single missing tier fails the whole scenario.
      </Callout>

      <H2>HA is not DR — know the boundary</H2>
      <P>
        Multi-AZ protects against <strong>infrastructure failure</strong> (a
        zone going dark). It does nothing against a <strong>Regional
        failure</strong> or a bad deployment corrupting data — those need
        multi-Region design and backups, covered in the DR lessons. The exam
        is precise about this: “an AZ becomes unavailable” → multi-AZ
        answers; “a Region becomes unavailable” → multi-Region answers.
      </P>
    </>
  );
}

export function Lesson222() {
  return (
    <>
      <Lead>
        Four disaster recovery strategies form a cost ladder. The exam hands
        you an RTO, an RPO, and a budget — your job is to pick the cheapest
        rung that satisfies all three.
      </Lead>

      <Diagram title="The DR ladder" caption="Cost rises and recovery objectives tighten as you descend toward active/active.">
        <DRTiersDiagram />
      </Diagram>

      <H2>What runs in the recovery Region for each strategy</H2>
      <UL
        items={[
          <>
            <strong>Backup &amp; restore:</strong> nothing runs. Backups are
            copied across Regions; at DR time you rebuild infrastructure from
            IaC/AMIs and restore data. Cheapest; slowest recovery.
          </>,
          <>
            <strong>Pilot light:</strong> the data layer replicates
            continuously (read replicas, global tables); AMIs and templates
            are staged; compute stays off until needed.
          </>,
          <>
            <strong>Warm standby:</strong> a scaled-down but complete stack
            runs continuously; at DR you scale it to full production size.
          </>,
          <>
            <strong>Multi-site active/active:</strong> full production scale
            in every Region, all serving traffic simultaneously — failing a
            Region shifts load, nothing is “brought up.”
          </>,
        ]}
      />
      <Callout type="tip">
        Data-layer choices drive everything: backup copies give hour-level
        RPO, continuous replication gives second-level RPO — and the compute
        strategy rides on top of whichever data foundation you chose.
      </Callout>

      <H2>Choosing under constraints</H2>
      <KeyTable
        head={["Stated requirement", "Cheapest fit"]}
        rows={[
          ["RTO/RPO of a day or more", "Backup and restore"],
          ["RPO minutes, RTO hours, cost sensitive", "Pilot light"],
          ["RPO seconds, RTO ~10 minutes", "Warm standby"],
          ["RTO/RPO near zero, cost secondary", "Multi-site active/active"],
        ]}
      />
      <Callout type="exam">
        Two-step reasoning wins these: <strong>(1)</strong> discard every
        strategy whose RTO/RPO is worse than stated;{" "}
        <strong>(2)</strong> pick the cheapest survivor. If two fit, the
        cheaper one wins — “more resilient than required” is wasted budget in
        the exam’s eyes.
      </Callout>

      <H2>Don’t forget the non-infrastructure pieces</H2>
      <UL
        items={[
          <>
            DNS is the cutover mechanism in every strategy — failover records,
            health checks, and low TTLs belong to the design.
          </>,
          <>
            Runbooks matter: an untested DR plan is a document, not a
            capability (see the testing lesson).
          </>,
          <>
            Backups and replication only cover <strong>data</strong> — AMIs,
            launch templates, and configuration must be staged too.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson223() {
  return (
    <>
      <Lead>
        RTO and RPO are the two numbers every DR decision hangs on. Define
        them per application tier, then let the AWS service defaults tell you
        whether a design can possibly meet them.
      </Lead>

      <H2>Mapping AWS defaults to the objectives</H2>
      <KeyTable
        head={["Mechanism", "Typical RPO", "Typical recovery time"]}
        rows={[
          ["RDS/Aurora Multi-AZ (in-Region)", "~0 (synchronous)", "1–2 minutes automatic"],
          ["Aurora Global Database switchover", "~0 planned; <1s lag unplanned", "~1 minute promotion"],
          ["Cross-Region read replica promotion", "Minutes (replication lag)", "Minutes + DNS"],
          ["DynamoDB global tables", "Seconds (async)", "Instant — tables already active"],
          ["S3 CRR / RTC", "~15 min (99.99% with RTC)", "N/A — copies serve reads"],
          ["AWS Backup cross-Region copies", "Backup interval (hours)", "Restore time depends on size"],
          ["DRS / site recovery", "Seconds (continuous replication)", "Minutes to boot recovered servers"],
        ]}
      />
      <Callout type="exam">
        The exam states RTO/RPO numerically and expects you to eliminate
        designs that can’t hit them: nightly cross-Region snapshots cannot
        meet “lose at most 15 minutes,” and an active/active fleet is not the
        answer when the requirement is “hours.” Match the number, then take
        the cheapest option left standing.
      </Callout>

      <H2>Setting the numbers honestly</H2>
      <UL
        items={[
          <>
            <strong>RPO</strong> is a business decision (“how much data can we
            afford to re-enter?”), not an engineering one — poll the business
            owner per application tier.
          </>,
          <>
            <strong>RTO</strong> includes detection time, decision time,
            recovery execution, and verification — not just the technical
            restore.
          </>,
          <>
            Tiering is normal: tier-1 checkout gets active/active, tier-3
            internal tools get backup/restore. One policy per business
            criticality.
          </>,
        ]}
      />
      <Callout type="tip">
        Resilience Hub turns these stated policies into scored assessments per
        application — the service exists precisely because RTO/RPO drift from
        documents into reality (covered in the testing lesson).
      </Callout>
    </>
  );
}

export function Lesson224() {
  return (
    <>
      <Lead>
        Multi-Region design splits into two postures: <strong>active/passive</strong>{" "}
        (one Region serves; others wait) and <strong>active/active</strong>{" "}
        (every Region serves). The data layer and the traffic layer each have
        their own pattern — and they must agree.
      </Lead>

      <H2>Active/passive — failover posture</H2>
      <UL
        items={[
          <>
            <strong>Compute:</strong> full stack deployed in the secondary
            (warm) or staged as templates (pilot light) — scaled down or off.
          </>,
          <>
            <strong>Data:</strong> continuous replication into the passive
            Region — Aurora global, cross-Region replicas, S3 CRR, global
            tables if writes happen in both.
          </>,
          <>
            <strong>Traffic:</strong> Route 53 failover records with health
            checks, or Global Accelerator endpoint groups — cutover is
            automated on health, not on human decision speed.
          </>,
        ]}
      />

      <H2>Active/active — every Region serves</H2>
      <UL
        items={[
          <>
            <strong>Compute:</strong> full stacks in all Regions behind
            latency-based routing (or Global Accelerator), each absorbing its
            share.
          </>,
          <>
            <strong>Data:</strong> the hard part — DynamoDB global tables
            (active/active, last-writer-wins), Aurora global (single-writer
            with local reads), S3 with Multi-Region Access Points.
          </>,
          <>
            <strong>State:</strong> sessions and queues must be Regional or
            globally replicated — a Region failing cannot strand users’ state.
          </>,
        ]}
      />
      <Callout type="exam">
        The data-layer engine decision follows the write pattern:{" "}
        <strong>writes in both Regions</strong> → DynamoDB global tables or
        Aurora global with switchover; <strong>reads locally, writes
        primary-only</strong> → Aurora global read-local pattern. Residency
        constraints can forbid any of it (see the isolation lesson).
      </Callout>

      <H2>What the two postures share</H2>
      <UL
        items={[
          <>
            <strong>Identical infrastructure as code</strong> deployed per
            Region — drift between Regions is the top multi-Region failure
            mode.
          </>,
          <>
            <strong>Health-based traffic steering</strong> — Route 53 or
            Global Accelerator decides, using real health checks.
          </>,
          <>
            <strong>Data conflict rules</strong> defined before the first
            multi-Region write: last-writer-wins, per-Region ownership, or
            single-writer enforcement.
          </>,
        ]}
      />
      <Callout type="tip">
        Start active/passive and promote to active/active per service — the
        exam rewards choosing the <em>cheapest posture that meets the stated
        RTO/RPO</em>, and full active/active is rarely the stated requirement.
      </Callout>
    </>
  );
}

export function Lesson225() {
  return (
    <>
      <Lead>
        The data layer is the hardest part of any resilient design: state must
        survive Zone loss, Region loss, and concurrent writes. Each engine has
        one right replication mechanism — knowing them all is Domain 2’s
        densest exam territory.
      </Lead>

      <Diagram title="Replication per engine" caption="Match the engine to the write pattern and failure model.">
        <DataLayerResilienceDiagram />
      </Diagram>

      <H2>DynamoDB — global tables and their semantics</H2>
      <UL
        items={[
          <>
            <strong>Global tables</strong> replicate a table across Regions as
            active/active replicas with <strong>last-writer-wins</strong>
            conflict resolution — ideal for regional-failure resilience with
            multi-Region writes.
          </>,
          <>
            Writes propagate asynchronously (typically under a second);{" "}
            <strong>item-level timestamp</strong> decides conflicts, so design
            writes to avoid clobbering (unique IDs, per-Region data ownership
            when semantics demand).
          </>,
          <>
            Point-in-time recovery is <strong>per-Region</strong> — global
            tables give resilience, PITR gives restore granularity.
          </>,
        ]}
      />

      <H2>Aurora family — global databases and replicas</H2>
      <UL
        items={[
          <>
            <strong>Aurora global database:</strong> one writer cluster, up to{" "}
            5 secondary clusters replicated with ~1-second lag; local reads in
            every Region; <strong>managed switchover</strong> for planned
            events (RPO 0) and promotion for unplanned DR.
          </>,
          <>
            <strong>Aurora replicas (in-Region):</strong> up to 15, automatic
            failover targets, reader endpoint load balancing.
          </>,
          <>
            <strong>RDS cross-Region read replicas:</strong> promote to
            standalone during DR — replication lag is the RPO.
          </>,
        ]}
      />

      <H2>Redis-family and S3</H2>
      <UL
        items={[
          <>
            <strong>ElastiCache Global Datastore</strong>: cross-Region
            replication with fast promotion for cache workloads;{" "}
            <strong>MemoryDB multi-Region</strong> when the data is durable
            system-of-record.
          </>,
          <>
            <strong>S3 CRR / Multi-Region Access Points:</strong> async object
            replication with RTC’s 15-minute SLA; MRAP gives one global
            hostname over Regional buckets.
          </>,
        ]}
      />
      <Callout type="exam">
        The conflict-semantics question is a regular: <strong>“both Regions
        accept writes; conflicts resolve to the most recent write”</strong> →
        DynamoDB global tables (LWW). If the requirement says{" "}
        <strong>“no data loss ever, single writer”</strong> → Aurora global
        with managed switchover. Engine choice follows the write pattern —
        not preference.
      </Callout>
    </>
  );
}

export function Lesson226() {
  return (
    <>
      <Lead>
        DNS is the cheapest failover mechanism you own — provided health
        checks are truthful and TTLs are low. Route 53 combines routing
        policies with health checks and Recovery Controller switches to move
        traffic between endpoints.
      </Lead>

      <Diagram title="Failover records, health checks, and beyond" caption="Health checks decide; TTLs decide how fast.">
        <DnsFailoverDiagram />
      </Diagram>

      <H2>Health checks done right</H2>
      <UL
        items={[
          <>
            Probe a <strong>dedicated health endpoint</strong> that reflects
            real readiness — a path behind authentication or a generic 200
            page makes the check lie.
          </>,
          <>
            <strong>Calculated health checks</strong> combine child checks
            (AND/OR/NOT) for composite services;{" "}
            <strong>CloudWatch alarm checks</strong> turn any metric condition
            into DNS health.
          </>,
          <>
            For private resources, run{" "}
            <strong>health checkers inside the VPC</strong> — public checkers
            can’t reach them.
          </>,
          <>
            Keep <strong>TTLs low (60s)</strong> on failover records — TTL is
            the upper bound on how long users route to a dead endpoint.
          </>,
        ]}
      />

      <H2>Routing policies in failover contexts</H2>
      <KeyTable
        head={["Policy", "Failover use"]}
        rows={[
          ["Failover routing", "Strict primary/secondary with health checks — the DR workhorse"],
          ["Latency routing + health checks", "Active/active multi-Region with automatic Region drop"],
          ["Weighted routing + health checks", "Gradual migration or canary with automatic fallback"],
          ["Geoproximity/geolocation", "Residency-bound serving with health-aware fallback"],
          ["ARC routing controls", "Operator-driven Regional switches with safety rules"],
        ]}
      />
      <Callout type="exam">
        “Automatically route to the secondary only when the primary fails its
        health check” is <strong>failover routing</strong> — the exact policy.
        When the question adds “users worldwide hit the closest healthy
        Region,” upgrade to latency-based records with health checks attached
        to each.
      </Callout>
      <Callout type="warn">
        DNS failover speed is bounded by record TTLs plus resolver caching —
        seconds-to-minutes, not instant. When the requirement says
        “failover in seconds,” Route 53 alone is the wrong answer:{" "}
        <strong>Global Accelerator</strong> or <strong>ARC</strong> moves
        traffic at the network layer.
      </Callout>
    </>
  );
}
