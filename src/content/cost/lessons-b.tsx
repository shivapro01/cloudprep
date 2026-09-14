import { Callout, Code, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 4.2 lessons — compute cost optimization (expanded). Original content. */

export function Lesson421() {
  return (
    <>
      <Lead>
        Commitment discounts are the largest lever on steady compute spend —
        up to 72% off. The exam’s branching question is always the same:{" "}
        <em>which commitment type matches the flexibility requirement?</em>{" "}
        Get the flexibility wrong and the discount becomes a liability.
      </Lead>

      <H2>The commitment ladder</H2>
      <KeyTable
        head={["Option", "Covers", "Flexibility", "Discount"]}
        rows={[
          ["Compute Savings Plans", "Any EC2 family/size/OS/Region + Fargate + Lambda", "Maximum — commit $/hour of compute spend", "Up to 66%"],
          ["EC2 Instance Savings Plans", "EC2 only, one instance family per Region", "Size-flexible within the family", "Up to 72%"],
          ["Standard Reserved Instances", "Specific attributes (regional RIs are size-flexible)", "Modification within family only", "Up to 72%"],
          ["Convertible RIs", "Attribute-based, exchangeable during term", "Trade for different attributes", "Up to 54%"],
          ["Zonal RIs", "Capacity + discount in one AZ", "AZ-scoped", "Up to 72%"],
        ]}
      />

      <H2>The decision walk — the exam’s branching</H2>
      <UL
        items={[
          <>
            <strong>Steady usage, stable architecture</strong> →{" "}
            <strong>Standard RIs</strong> (max discount, fixed attributes) or{" "}
            <strong>EC2 Instance SP</strong> (size-flexible within the
            family).
          </>,
          <>
            <strong>Steady spend, changing architecture</strong> (instance
            families, Regions, OS, or Linux → Windows) →{" "}
            <strong>Convertible RIs</strong> — exchangeable during the term
            for different attributes at ~54%.
          </>,
          <>
            <strong>Compute mix may span EC2 + Fargate + Lambda</strong> →{" "}
            <strong>Compute Savings Plans</strong> — the broadest commitment,
            discounting spend across all three.
          </>,
          <>
            <strong>No steady baseline</strong> → don’t commit. Unused
            commitment is pure waste; monitor{" "}
            <strong>utilization</strong> (how much of the discount you use)
            and <strong>coverage</strong> (how much usage is discounted) in
            Cost Explorer.
          </>,
        ]}
      />
      <Callout type="exam">
        The branching keywords: <strong>“commitment while keeping instance
        family flexibility”</strong> → EC2 Instance SP.{" "}
        <strong>“planning to move to containers/serverless mid-term”</strong>{" "}
        → Compute SP. <strong>“fixed fleet, maximum discount”</strong> →
        Standard RI. <strong>“may change database engine or Region”</strong>{" "}
        → Convertible RI exchange.
      </Callout>

      <H2>Payment options and the recommendation loop</H2>
      <UL
        items={[
          <>
            <strong>Payment options:</strong> no upfront, partial upfront, or
            all upfront — deeper discounts for more money earlier.
          </>,
          <>
            <strong>Recommendations</strong> come from Cost Explorer, modeled
            on trailing 7/30/60-day usage with term and payment options
            selectable.
          </>,
          <>
            <strong>Utilization below 100%</strong> means you bought more
            commitment than you use; <strong>coverage below target</strong>{" "}
            means you’re leaving discounts unclaimed — both are Cost Explorer
            reports.
          </>,
        ]}
      />
      <Callout type="tip">
        The remembering device: <strong>flexibility costs discount
        points</strong>. Standard RI &gt; Convertible RI in discount,
        Compute SP trades family freedom for service breadth, On-Demand pays
        full price for total freedom. Match the commitment length to how
        certain the roadmap actually is.
      </Callout>

      <H2>Upfront math and exchange mechanics</H2>
      <UL
        items={[
          <>
            <strong>No upfront, partial, all upfront</strong> stack deeper
            discounts in that order — all-upfront on a 3-year Standard RI
            is the floor price of that capacity. But unused commitment is
            pure waste: a 60%-utilized RI portfolio costs <em>more</em>
            than On-Demand for the used portion.
          </>,
          <>
            <strong>Convertible exchange:</strong> trade the RI’s attributes
            (family, OS, scope) mid-term for a different convertible RI of
            equal or greater value — the difference is trued up, the term
            does not reset.
          </>,
          <>
            <strong>Marketplace resales</strong> exist for Standard RIs, but
            the exam tests exchanges and utilization math — a commitment
            bought for a retiring workload is a stranded discount.
          </>,
        ]}
      />

      <H2>The utilization trap</H2>
      <P>
        Utilization and coverage pull opposite directions. Buying RI/SP
        coverage for 100% of peak leaves troughs uncovered in value;
        covering 70–80% of the steady baseline and letting On-Demand/Spot
        absorb peaks is usually the cost floor. Monitor{" "}
        <strong>utilization</strong> (am I using what I bought) and{" "}
        <strong>coverage</strong> (how much spend is discounted) separately
        — both below target means the wrong product, not just the wrong
        size.
      </P>
    </>
  );
}

export function Lesson422() {
  return (
    <>
      <Lead>
        Spot is up to 90% off On-Demand for capacity AWS can reclaim with
        <strong> two minutes of warning</strong>. The exam tests the
        resilience pattern — checkpointing, pool diversification, and the
        signals — not just the discount.
      </Lead>

      <H2>The interruption flow</H2>
      <UL
        items={[
          <>
            AWS marks an instance for reclamation and emits{" "}
            <strong>two signals</strong>: an{" "}
            <Code>EC2 Spot Interruption Warning</Code> EventBridge event and
            an <Code>instance-action</Code> item in{" "}
            <strong>instance metadata (IMDSv2)</strong> — both exactly two
            minutes ahead.
          </>,
          <>
            <strong>Act in the window:</strong> checkpoint progress to S3/
            DynamoDB, drain from the load balancer, hand off to a surviving
            worker — then let it terminate.
          </>,
          <>
            <strong>Capacity rebalancing</strong> fires the rebalance
            recommendation signal even earlier, letting the fleet launch a
            replacement before reclamation — with a launch{" "}
            <em>lifecycle hook</em> draining the old instance gracefully.
          </>,
        ]}
      />

      <H2>Designing for interruption</H2>
      <UL
        items={[
          <>
            <strong>Checkpoint state externally:</strong> progress to S3/
            DynamoDB so replacements resume instead of restarting.
          </>,
          <>
            <strong>Diversify pools:</strong> multiple instance types and AZs
            in mixed-instance ASGs or Spot Fleets — one pool’s price spike or
            reclamation doesn’t stop the job.
          </>,
          <>
            <strong>Allocation strategy:</strong>{" "}
            price-capacity-optimized balances cost with interruption
            likelihood (the recommended default).
          </>,
          <>
            <strong>Spot placement score</strong> rates Regions and pools by
            interruption history for a specified workload — use it before
            committing a design.
          </>,
        ]}
      />

      <H2>Where Spot fits — and where it doesn’t</H2>
      <UL
        items={[
          <>
            <strong>Fits:</strong> batch, CI/CD builds, rendering,
            stateless web tiers behind an ASG, Spark workers, fault-tolerant
            microservices — anything resumable.
          </>,
          <>
            <strong>Doesn’t fit:</strong> single-instance stateful systems,
            databases without replication, anything with a strict deadline
            and no checkpointing.
          </>,
          <>
            <strong>Spot Blocks</strong> (uninterrupted windows) are retired
            — “uninterruptible Spot” is not an option; move to On-Demand for
            those phases.
          </>,
        ]}
      />
      <Callout type="exam">
        “Reduce compute costs by 90% for image-rendering workers that can
        retry” → <strong>Spot with ASG mixed-instance groups +
        capacity-optimized allocation</strong>. The words{" "}
        <em>fault-tolerant, flexible deadline, batch</em> are Spot flags;{" "}
        <em>single point of failure, strict deadline</em> are
        disqualifiers.
      </Callout>
      <Callout type="tip">
        Spot pricing varies by pool and demand — the discount is real but the
        rate isn’t fixed. Budget with the historical price in the Region, and
        keep an On-Demand fallback path for phases that can’t be
        interrupted.
      </Callout>

      <H2>Price history and the ASG mix that makes Spot safe</H2>
      <UL
        items={[
          <>
            <strong>Check price history first:</strong> the Spot price
            history API/console shows per-pool volatility — stable pools
            (low reclaim rates) are worth more than briefly-cheap volatile
            ones. Size the pool list from history, not just the current
            discount.
          </>,
          <>
            <strong>ASG mixed-instance policy:</strong> keep an On-Demand
            base (e.g., 2 instances or 30% of capacity) so reclamation never
            empties the fleet, and let Spot carry the elastic remainder.
            Capacity-optimized prioritization picks the healthiest pools
            first.
          </>,
          <>
            <strong>Attribute-based instance selection:</strong> specify vCPU
            and memory requirements instead of instance names — the ASG then
            spans dozens of types automatically, which is the deepest pool
            diversification you can buy.
          </>,
        ]}
      />

      <H2>EC2 hibernation prerequisites (the Spot-adjacent detail)</H2>
      <UL
        items={[
          <>
            Hibernation needs an <strong>encrypted EBS root volume</strong>{" "}
            sized to hold RAM, plus agent support — On-Demand and Reserved
            instances qualify; Spot hibernation exists but only preserves
            through interruptions the reclaiming allows.
          </>,
          <>
            Don’t confuse it with stop/start: hibernation preserves
            in-memory state (open sessions, warm caches); stop/start is a
            clean boot.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson423() {
  return (
    <>
      <Lead>
        Right-sizing is the cheapest optimization: pay for the performance
        you actually use. Two services find the candidates — Compute
        Optimizer (ML-driven) and Trusted Advisor (checklist-driven) — and
        the action items differ by tool.
      </Lead>

      <H2>Compute Optimizer — the ML recommender</H2>
      <UL
        items={[
          <>
            Analyzes CloudWatch utilization history and recommends{" "}
            <strong>EC2 instance types, EBS configurations, Lambda memory,
            and ECS services</strong> — with findings categorized:{" "}
            over-provisioned, under-provisioned, optimized, non-optimal.
          </>,
          <>
            Flags <strong>idle resources</strong> (low-CPU instances,
            unattached EBS volumes) and{" "}
            <strong>Graviton readiness</strong> estimates per workload.
          </>,
          <>
            <strong>Organization mode:</strong> enable at the management
            account; findings across member accounts, exportable to S3 for
            FinOps workflows.
          </>,
          <>
            Also covers <strong>Lambda memory</strong> (the CPU-coupling
            insight) and <strong>EBS</strong> volume recommendations — one
            pass, many services.
          </>,
        ]}
      />

      <H2>Trusted Advisor — the checklist view</H2>
      <UL
        items={[
          <>
            <strong>Cost pillar checks:</strong> low-utilization EC2, idle
            load balancers, unattached Elastic IPs, underutilized EBS
            volumes, idle Redshift clusters.
          </>,
          <>
            Availability depends on <strong>support plan</strong> — Business
            and above unlock the full check set (Security/Performance/
            Cost/Fault tolerance/Service limits).
          </>,
        ]}
      />
      <KeyTable
        head={["Finding", "Action"]}
        rows={[
          ["Instance at 3% CPU for 30 days", "Downsize or terminate"],
          ["Volume at 5% utilization", "Shrink workload or snapshot-and-remove"],
          ["Load balancer with zero backends", "Delete the idle LB"],
          ["Dev fleet running nights/weekends", "Schedule stop/start (Instance Scheduler)"],
        ]}
      />
      <Callout type="exam">
        “ML-driven rightsizing recommendations from utilization history” →{" "}
        <strong>Compute Optimizer</strong>. “Idle resources flagged as cost
        checks” → <strong>Trusted Advisor</strong>. The follow-up action
        (downsize) is part of the correct answer pattern.
      </Callout>
      <Callout type="tip">
        Compute Optimizer also estimates savings per recommendation and
        supports Lambda memory rightsizing — pair it with Graviton options
        for compounding savings.
      </Callout>

      <H2>The rightsizing loop — continuous, not annual</H2>
      <UL
        items={[
          <>
            <strong>Measure</strong> 2–4 weeks of CloudWatch utilization per
            workload (CPU, memory with agent, network, disk).
          </>,
          <>
            <strong>Decide</strong> from Compute Optimizer findings —
            downsize over-provisioned, terminate idle, move burstable where
            the pattern fits.
          </>,
          <>
            <strong>Verify</strong> post-change: performance unchanged, bill
            lower — then repeat. Fleets drift as usage grows; rightsizing is
            a loop, not a project.
          </>,
          <>
            <strong>Automate the guardrail:</strong> tag by environment so
            dev/test candidates for aggressive actions (hibernation,
            scheduling) never mix with production.
          </>,
        ]}
      />
      <Callout type="exam">
        The pairing the exam draws: <strong>Compute Optimizer finds the
        candidate; Instance Scheduler or Stop/Start acts on the schedule;
        Savings Plans discount what remains steady.</strong> Three answers
        to three different waste shapes — pick by the symptom in the
        scenario.
      </Callout>

      <H2>Trusted Advisor cost checks — the actual list</H2>
      <UL
        items={[
          <>
            <strong>Low-utilization EC2</strong> (under ~10% daily CPU or
            tiny network I/O over 14 days), <strong>idle load
            balancers</strong> (no backends or near-zero traffic),{" "}
            <strong>unassociated Elastic IPs</strong>,{" "}
            <strong>underutilized EBS</strong> volumes,{" "}
            <strong>idle Redshift clusters</strong>, and{" "}
            <strong>unassociated EIPs/RDS idle instances</strong> across the
            board.
          </>,
          <>
            <strong>Support plan gating:</strong> the full check set unlocks
            on Business/Enterprise support; Basic sees only the service
            limits and a few security checks. “Why isn’t this check
            visible?” is often a support-plan question in disguise.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson424() {
  return (
    <>
      <Lead>
        Choosing the compute model is the cost decision: idle-prone
        workloads belong on per-use services, steady workloads on committed
        capacity. The exam gives usage shape and asks for the cheapest fit.
      </Lead>

      <H2>The cost shape of each model</H2>
      <KeyTable
        head={["Model", "Bills when", "Fits"]}
        rows={[
          ["Lambda", "Per request + GB-second of execution", "Sporadic, short, event-driven; idle = $0"],
          ["Fargate", "Per vCPU/memory-second of running tasks", "Containers with variable duty cycles, no host management"],
          ["EC2 + commitments", "Hourly regardless, discounted by RI/SP", "Steady baselines, licensing, full control"],
          ["EC2 Spot", "Per hour, up to 90% off, interruptible", "Fault-tolerant batch/parallel work"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Lambda memory tuning is a cost lever:</strong> CPU scales
            with memory, so a 1,769 MB config often runs faster <em>and</em>{" "}
            cheaper — the AWS Lambda Power Tuning state machine finds the
            optimum empirically.
          </>,
          <>
            <strong>Graviton (arm64)</strong> Lambdas and instances are ~20%
            cheaper per unit with comparable performance — the compatibility
            test gates it.
          </>,
          <>
            <strong>Fargate Spot</strong> takes ~30-70% off interruptible
            container tasks.
          </>,
        ]}
      />
      <Callout type="exam">
        “Job runs 10 minutes twice a day” → <strong>Lambda</strong> (or
        Fargate task on schedule) — an always-on instance is pure waste.
        “Steady 24/7 load at 80% utilization” → <strong>EC2 with
        commitments</strong> — Lambda’s per-request model would cost more.
        The usage shape, not the technology fashion, decides.
      </Callout>
      <Callout type="warn">
        Watch for the trap option “Lambda with a 1-hour timeout” — 15
        minutes is the hard cap; anything longer is Fargate/Batch
        territory.
      </Callout>

      <H2>Concurrency has a cost side</H2>
      <UL
        items={[
          <>
            <strong>Provisioned concurrency bills while idle:</strong> you
            pay for always-warm environments whether invoked or not. Size
            provisioned counts to the steady baseline and let on-demand
            scaling absorb peaks — over-provisioning the warm pool is the
            quiet Lambda bill.
          </>,
          <>
            <strong>Reserved concurrency caps cost and throughput
            together:</strong> it throttles a runaway function’s spend (a
            recursive-loop guard) while guaranteeing capacity for the
            critical path.
          </>,
          <>
            <strong>Recursive invocation risk:</strong> a Lambda that
            triggers itself (S3 → Lambda → S3, SNS loops) multiplies cost
            exponentially; reserved concurrency plus DLQs and idempotency
            keys bound the blast radius.
          </>,
        ]}
      />

      <H2>The worked comparison — same job, three ways</H2>
      <P>
        A job that runs for 10 minutes once a day with 2 vCPU and 4 GB:
      </P>
      <UL
        items={[
          <>
            <strong>Always-on m5.xlarge:</strong> ~$140/month, 99% wasted.
          </>,
          <>
            <strong>Lambda with 4 GB:</strong> ~600 seconds/month of
            execution — single-digit dollars.
          </>,
          <>
            <strong>Fargate task on schedule:</strong> a few dollars, with
            container flexibility Lambda lacks (long runs, custom runtime).
          </>,
        ]}
      />
      <P>
        The break-even flips at sustained load: a process running 24/7 at
        high utilization is cheaper on committed EC2 — the usage shape, not
        the technology, decides. Watch for answer options that give a{" "}
        <em>usage pattern</em> plus a <em>service</em> — the pattern must
        match the billing model.
      </P>
    </>
  );
}

export function Lesson425() {
  return (
    <>
      <Lead>
        Non-production fleets are the easiest win in AWS: they bill nights,
        weekends, and holidays while nobody uses them. Scheduled stop/start
        typically cuts their bill by 60–70%.
      </Lead>

      <H2>The scheduling pattern</H2>
      <UL
        items={[
          <>
            <strong>Instance Scheduler on AWS</strong> (solution) or a
            custom EventBridge schedule: a Lambda stops tagged instances
            outside business hours and starts them before work begins —
            driven by a schedule table/DynamoDB config.
          </>,
          <>
            Tag-driven: instances tagged <Code>Schedule=office-hours</Code>{" "}
            participate; untagged ones are never touched.
          </>,
          <>
            <strong>RDS scheduling</strong> follows the same pattern (start/
            stop API on RDS instances — up to 120 hours stored state).
          </>,
        ]}
      />
      <Callout type="exam">
        “Developers use environments only during business hours; reduce the
        bill” → <strong>scheduled stop/start</strong> of tagged dev
        resources. Savings scale with the off-hours share (nights +
        weekends ≈ 70% of hours).
      </Callout>
      <Callout type="warn">
        Stopped instances still bill attached EBS volumes and Elastic IPs —
        full savings require also releasing unused EIPs and right-sizing
        attached storage.
      </Callout>
      <Callout type="tip">
        <strong>EC2 hibernation</strong> complements scheduling for dev VMs:
        stop preserves RAM to disk, resume restores the session in seconds
        — hibernation-enabled instances need enough root EBS for RAM.
      </Callout>

      <H2>The savings math, worked</H2>
      <P>
        Fifty dev instances at $0.10/hour running 24×7 bill{" "}
        <strong>~$3,600/month</strong>. Restricted to 10 hours × 22 business
        days, the same fleet bills for ~220 hours —{" "}
        <strong>~70% of the bill disappears</strong> for one Lambda and a
        schedule table.
      </P>
      <UL
        items={[
          <>
            <strong>Stopped instances still bill:</strong> attached EBS
            volumes, snapshots, and Elastic IPs keep charging — release
            unattached EIPs and right-size storage to capture the rest.
          </>,
          <>
            <strong>RDS can stop too</strong> — but it auto-starts after 7
            days, so schedulers must restart databases within the window.
          </>,
          <>
            <strong>Patch while running:</strong> maintenance windows pair
            with schedules — patch during the monthly start window, not
            ad hoc.
          </>,
        ]}
      />
      <Callout type="warn">
        The classic miss: schedulers stop EC2 but forget <strong>RDS,
        ElastiCache, OpenSearch, and NAT gateways</strong> — the data and
        network tiers keep billing 24/7. Schedule or right-size those too.
      </Callout>

      <H2>Scheduler shape and RDS stop limits</H2>
      <UL
        items={[
          <>
            <strong>Instance Scheduler config:</strong> periods defined by
            begin/end times plus weekdays (plus SSM maintenance windows for
            patching inside the running window); schedules attach to
            instances by tag, and opt-in beats opt-out for safety.
          </>,
          <>
            <strong>RDS stop limits:</strong> a stopped RDS instance
            auto-starts after 7 days — schedulers must restart databases
            inside the window, and Multi-AZ + read-replica topologies stop
            and start as units (or use Aurora Serverless v2 pausing for
            dev/test clusters).
          </>,
        ]}
      />
    </>
  );
}

export function Lesson426() {
  return (
    <>
      <Lead>
        Cost governance closes the loop: set expectations, detect deviations,
        and route accountability. Four services cover the exam’s questions —
        Budgets, Cost Anomaly Detection, Cost Explorer, and the Cost and
        Usage Report with allocation tags.
      </Lead>

      <H2>The four tools</H2>
      <KeyTable
        head={["Tool", "Job", "Exam phrase"]}
        rows={[
          ["AWS Budgets", "Fixed thresholds per account/tag/service with alerts and actions (e.g., restrict IAM on breach)", "“alert/act when project spend exceeds $X”"],
          ["Cost Anomaly Detection", "ML detects unusual spend patterns per service/account", "“bill spiked unexpectedly this week”"],
          ["Cost Explorer", "Visualize, filter, group, forecast by service/tag/Region", "“what drove last month’s increase”"],
          ["Cost & Usage Report", "Most granular line-item data to S3 for analysis", "“chargeback with per-tag detail”"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Cost allocation tags</strong> must be activated in
            billing before they appear in CE/CUR — the prerequisite step in
            chargeback designs.
          </>,
          <>
            <strong>Budget actions</strong> can attach a restrictive IAM
            policy or stop instances automatically on breach — governance
            with teeth.
          </>,
          <>
            <strong>Organization view</strong> aggregates member accounts;
            consolidated billing shares discounts and RI/SP coverage.
          </>,
        ]}
      />
      <Callout type="exam">
        Mapping: <strong>“unexpected spike alert”</strong> → Cost Anomaly
        Detection. <strong>“hard cap per project with automated
        response”</strong> → Budgets with actions.{" "}
        <strong>“detailed per-tag chargeback data”</strong> → CUR.{" "}
        <strong>“why did costs change”</strong> → Cost Explorer.
      </Callout>
      <Callout type="tip">
        Layered design: activated tags feed CUR/CE; Budgets guard totals;
        Anomaly Detection catches what fixed thresholds miss — detection
        plus response, not one tool alone.
      </Callout>

      <H2>The governance loop, assembled</H2>
      <UL
        items={[
          <>
            <strong>Tag at birth:</strong> enforced tagging (SCP/IAM
            conditions on aws:RequestTag) makes every resource attributable
            before it exists.
          </>,
          <>
            <strong>Measure:</strong> CUR to S3 → Athena chargeback per tag
            per account; Cost Explorer views per team for monthly reviews.
          </>,
          <>
            <strong>Guard:</strong> Budgets per project with actions;
            Anomaly Detection for shape deviations no threshold would catch.
          </>,
          <>
            <strong>Multi-account:</strong> the management account sees
            consolidated spend; member teams see their own — one bill, many
            accountable owners.
          </>,
        ]}
      />
      <Callout type="exam">
        The cadence question: <strong>“who notices a cost problem, and how
        fast?”</strong> — activated tags + CE (visibility), Budgets
        (thresholds), CAD (anomalies), actions (response). The wrong answer
        is any single tool claimed to do all four.
      </Callout>

      <H2>Billing alarms and shared commitments</H2>
      <UL
        items={[
          <>
            <strong>CloudWatch billing alarms</strong> fire on estimated
            charges (us-east-1 billing metric) for simple thresholds — the
            lightweight complement to Budgets when all you need is a page at
            $X with no actions attached.
          </>,
          <>
            <strong>RI/SP sharing in Organizations:</strong> zonal and
            regional RIs plus Savings Plans float across member accounts
            under consolidated billing — size commitments against the
            organization’s aggregate steady state, not per account.
          </>,
          <>
            <strong>Budgets scope to linked accounts:</strong> one budget can
            watch the whole org, a single account, or a tag/project slice —
            match the scope to who owns the response.
          </>,
        ]}
      />
    </>
  );
}
