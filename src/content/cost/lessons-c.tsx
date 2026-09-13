import { Callout, Code, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 4.3 lessons — database cost optimization (expanded). Original content. */

export function Lesson431() {
  return (
    <>
      <Lead>
        Aurora vs RDS is a cost-shape comparison, not just a feature one.
        Aurora’s shared distributed storage changes the economics at scale —
        but its instances cost more per unit, so the breakeven depends on
        your workload’s shape.
      </Lead>

      <H2>The economic differences</H2>
      <UL
        items={[
          <>
            <strong>Shared cluster storage:</strong> Aurora replicas share
            the cluster volume — adding read replicas adds{" "}
            <strong>compute cost only</strong>. RDS replicas each carry
            their own full storage bill.
          </>,
          <>
            <strong>Storage auto-scaling:</strong> Aurora grows 10 GiB → 128
            TiB automatically; RDS storage needs autoscaling configured and
            is chosen up-front per class.
          </>,
          <>
            <strong>Replica economics:</strong> Aurora up to 15 replicas with
            ~1/10 typical lag; RDS MySQL up to 5, PostgreSQL up to 15
            (slower promotion).
          </>,
        ]}
      />

      <H2>The pricing modes</H2>
      <UL
        items={[
          <>
            <strong>Aurora Standard:</strong> lower instance/storage rates
            plus <strong>per-I/O charges</strong> — best when I/O volume is
            modest.
          </>,
          <>
            <strong>Aurora I/O-Optimized:</strong> higher instance rate,{" "}
            <strong>zero I/O charges</strong> — wins when I/O exceeds
            roughly 25–30% of cluster spend.
          </>,
          <>
            <strong>Aurora Serverless v2:</strong> capacity in fractional ACU
            steps — pays for actual demand, ideal for spiky dev/test.
          </>,
        ]}
      />
      <Callout type="exam">
        Selection logic: <strong>“many read replicas and growing storage
        without replica storage costs”</strong> → Aurora.{" "}
        <strong>“I/O-heavy and wants predictable pricing”</strong> → Aurora
        I/O-Optimized. <strong>“simple workload, occasional reads”</strong> →
        RDS Multi-AZ remains cheapest. And Serverless v2 answers the
        spiky/unpredictable demand variant.
      </Callout>
      <Callout type="tip">
        The rightsizing companion: switch <strong>instance classes</strong>{" "}
        (Graviton on Aurora) and storage <strong>type</strong> (Standard vs
        I/O-Optimized) — both are levers the options mix together.
      </Callout>

      <H2>The breakeven, roughly</H2>
      <P>
        The Aurora premium is real per instance-unit. Three breakeven checks
        decide whether it pays:
      </P>
      <UL
        items={[
          <>
            <strong>Replica count:</strong> at 3+ replicas, the shared
            storage typically makes Aurora cheaper overall than RDS with
            per-replica storage.
          </>,
          <>
            <strong>Storage growth:</strong> clusters growing past a few
            hundred GiB favor Aurora’s auto-scaling storage over RDS
            provisioned headroom.
          </>,
          <>
            <strong>I/O-Optimized:</strong> worth it when I/O charges exceed
            ~25–30% of cluster spend — check Performance Insights and
            CloudWatch I/O metrics before switching.
          </>,
        ]}
      />
      <Callout type="warn">
        The trap: Aurora Serverless v2 bills per ACU-hour — steady 24/7
        load at full ACU capacity can cost <em>more</em> than provisioned.
        Serverless fits spiky/intermittent; provisioned fits steady.
      </Callout>
    </>
  );
}

export function Lesson432() {
  return (
    <>
      <Lead>
        DynamoDB cost has two dials — the table class and the capacity mode —
        plus TTL for automatic expiry. Each dial matches a different usage
        pattern, and the exam describes patterns.
      </Lead>

      <H2>Capacity modes</H2>
      <UL
        items={[
          <>
            <strong>On-demand:</strong> pay per request, instant scaling, no
            capacity planning — but roughly 1.3x the unit cost of optimized
            provisioned at steady state. Right for unpredictable or new
            workloads.
          </>,
          <>
            <strong>Provisioned + auto scaling:</strong> set RCUs/WCUs with
            auto scaling — cheapest for steady or predictable traffic.
          </>,
          <>
            <strong>Reserved capacity:</strong> commit to provisioned
            throughput baseline for 1/3 years — deepest discount for stable,
            known workloads (minimum purchase 100 units).
          </>,
        ]}
      />
      <P>
        The switching rule: capacity modes can be changed freely, and the
        break-even is roughly steady utilization above ~30% of provisioned
        peak — below that, on-demand typically wins.
      </P>

      <H2>Table class and TTL</H2>
      <UL
        items={[
          <>
            <strong>Standard-IA table class:</strong> ~60% cheaper storage
            for tables storing rarely-accessed data (with higher read/write
            per-request costs) — audit logs, old orders.
          </>,
          <>
            <strong>TTL:</strong> delete expired items automatically at no
            WCU cost — session stores and ephemeral data stop paying storage
            for dead rows.
          </>,
        ]}
      />
      <Callout type="exam">
        Pattern matching: <strong>“unpredictable traffic, no planning”</strong>{" "}
        → on-demand. <strong>“steady, well-known throughput for years”</strong>{" "}
        → provisioned + reserved. <strong>“audit records rarely read”</strong>{" "}
        → Standard-IA table class. <strong>“session rows expire after 24
        hours”</strong> → TTL.
      </Callout>
      <Callout type="tip">
        Composite optimizations stack: on-demand for unpredictable phases,
        provisioned+reserved once steady, TTL to shrink storage, Standard-IA
        class for cold history — each is a separate dial on the same table.
      </Callout>

      <H2>The utilization rule, worked</H2>
      <P>
        A table provisioned at 100 write capacity units running at 30%
        utilization: on-demand pricing for the same traffic costs{" "}
        <strong>roughly 2–3x</strong> the optimized provisioned rate. Below
        ~30% sustained utilization, on-demand wins; above it, provisioned
        (with reserved capacity once stable) wins.
      </P>
      <UL
        items={[
          <>
            <strong>Batching:</strong> <Code>BatchWriteItem</Code> writes up
            to 25 items in one call — fewer round trips, same throughput
            accounting.
          </>,
          <>
            <strong>Throttle handling:</strong> exponential backoff on
            throttles beats blindly raising capacity — throttles signal
            design (hot keys), not just capacity.
          </>,
          <>
            <strong>RCU rounding:</strong> reads bill in 4 KB rounds and
            writes in 1 KB units — large items multiply effective cost per
            item.
          </>,
        ]}
      />
      <Callout type="warn">
        Switching capacity modes mid-month is allowed and takes effect
        immediately — but on-demand <em>rates</em> apply from the switch,
        so mode changes are a monitoring-driven decision, not a guessing
        game.
      </Callout>
    </>
  );
}

export function Lesson433() {
  return (
    <>
      <Lead>
        ElastiCache cost has three levers: node family and size, reserved
        nodes for steady fleets, and data tiering for large datasets with
        cold keys. Serverless removes sizing entirely for variable load.
      </Lead>

      <H2>The cost levers</H2>
      <UL
        items={[
          <>
            <strong>Node selection:</strong> family by need (general
            purpose, memory-optimized r-family) and size by working set —
            oversized caches are the common waste.
          </>,
          <>
            <strong>Reserved nodes (1/3 year):</strong> deep discounts for
            steady, predictable cache fleets.
          </>,
          <>
            <strong>Data tiering (r6gd):</strong> automatically moves
            least-recently-used items to local NVMe — up to ~60% cheaper per
            GB for datasets with cold tails, at small latency cost.
          </>,
          <>
            <strong>Serverless:</strong> pay for data stored and units
            processed — no nodes to size at all.
          </>,
        ]}
      />

      <H2>ElastiCache vs MemoryDB — the cost boundary</H2>
      <UL
        items={[
          <>
            <strong>ElastiCache</strong> is a cache: cheapest, but data is
            ephemeral by design — the database behind it is the system of
            record.
          </>,
          <>
            <strong>MemoryDB</strong> is a durable Redis-compatible
            database: higher price buys multi-AZ transactional durability.
            “Redis data must survive failures as the record” → MemoryDB.
          </>,
        ]}
      />
      <Callout type="exam">
        The tiering question: <strong>“multi-GB Redis dataset, part hot part
        cold, reduce cost”</strong> → data tiering on r6gd nodes. And the
        serverless variant answers <strong>“unpredictable cache load
        without node management.”</strong>
      </Callout>
      <Callout type="tip">
        Right-size the cache before resizing nodes: raise TTLs where
        staleness is acceptable, shard hot keys, and confirm hit ratio in
        CloudWatch (CacheHits/CacheMisses) — the cheapest capacity is the
        request you never make.
      </Callout>

      <H2>Sizing and the hit-ratio economics</H2>
      <P>
        Every cache hit is a database query you didn’t pay for — the{" "}
        <strong>hit ratio</strong> (CacheHits ÷ total requests in
        CloudWatch) is the cost metric. A 90% hit ratio on a database doing
        10,000 reads/sec removes 9,000 database reads per second from the
        bill.
      </P>
      <UL
        items={[
          <>
            <strong>Size from the working set:</strong> hot keys × item size
            → node memory; Monitor <Code>BytesUsedForCache</Code> against
            the node limit.
          </>,
          <>
            <strong>Reserved nodes</strong> for steady fleets;{" "}
            <strong>serverless</strong> when the load won’t sit still.
          </>,
          <>
            <strong>Data tiering</strong> only pays on r6gd nodes with large
            cold-tail items — verify item size distribution first.
          </>,
        ]}
      />
      <Callout type="warn">
        A cache with a low hit ratio is pure cost — it adds a hop without
        saving queries. Diagnose with hit-ratio metrics and TTL review
        before adding nodes.
      </Callout>
    </>
  );
}

export function Lesson434() {
  return (
    <>
      <Lead>
        Redshift cost splits into four dials: node generation, reserved
        pricing, serverless, and the add-ons (concurrency scaling,
        Spectrum) that bill only when used.
      </Lead>

      <H2>The cost levers</H2>
      <UL
        items={[
          <>
            <strong>RA3 nodes:</strong> managed storage decoupled from
            compute — resize compute independently, pay for storage used,
            cross-Region snapshots.
          </>,
          <>
            <strong>Reserved nodes (1/3 year):</strong> deep discount for
            steady, predictable warehouses.
          </>,
          <>
            <strong>Redshift Serverless:</strong> pay per RPU-second for
            variable or intermittent analytics — no cluster to manage.
          </>,
          <>
            <strong>Concurrency scaling:</strong> transient capacity when
            queues build — free credit covers most usage; only bursts beyond
            it bill.
          </>,
        ]}
      />

      <H2>Selection by usage shape</H2>
      <UL
        items={[
          <>
            <strong>Steady 24/7 warehouse, years ahead</strong> → RA3 with
            reserved nodes.
          </>,
          <>
            <strong>Variable analytics, occasional heavy runs</strong> →
            Redshift Serverless.
          </>,
          <>
            <strong>Rare queries over data-lake S3 files</strong> → Spectrum
            (pay per TB scanned), possibly without a cluster at all.
          </>,
          <>
            <strong>Bursty dashboards</strong> → concurrency scaling handles
            queues automatically.
          </>,
        ]}
      />
      <Callout type="exam">
        Cost-shape mapping: <strong>“variable load, no infrastructure”</strong>{" "}
        → Serverless. <strong>“steady multi-year analytics”</strong> →
        reserved RA3. <strong>“query S3 without loading”</strong> →
        Spectrum. <strong>“dashboard queues at month-end”</strong> →
        concurrency scaling.
      </Callout>
      <Callout type="tip">
        The interplay worth knowing: Spectrum bills per TB scanned —
        partitioning and columnar formats (Parquet) cut that bill
        directly; the lake layout is a Redshift cost control.
      </Callout>

      <H2>The levers, paired to usage shape</H2>
      <UL
        items={[
          <>
            <strong>Steady 24/7 warehouse, multi-year</strong> → RA3 with
            reserved nodes.
          </>,
          <>
            <strong>Variable/intermittent analytics</strong> → Redshift
            Serverless (pay per RPU-second).
          </>,
          <>
            <strong>Month-end dashboard bursts</strong> → concurrency
            scaling (free credit covers most usage).
          </>,
          <>
            <strong>Queries touching only S3 data</strong> → Spectrum, and
            partition the lake to cut per-TB scan cost.
          </>,
        ]}
      />
      <Callout type="warn">
        Two cost traps: <strong>Spectrum bills per TB scanned</strong> —
        unpartitioned lakes make every query expensive; and{" "}
        <strong>Serverless base RPUs</strong> set a floor — intermittent
        analytics can cost less than a always-on base RPU setting.
      </Callout>
    </>
  );
}
