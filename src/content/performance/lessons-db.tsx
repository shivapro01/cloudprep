import { Callout, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 3.3 lessons — database performance. Original content. */

export function Lesson331() {
  return (
    <>
      <Lead>
        RDS performance has four levers — read scaling, connection scaling,
        visibility, and storage — and the exam presents a symptom that points
        at exactly one.
      </Lead>

      <H2>Read replicas — offloading reads</H2>
      <UL
        items={[
          <>
            Up to 15 replicas (engine-dependent) serving reads with
            asynchronous replication; reporting and analytics move off the
            writer.
          </>,
          <>
            Cross-AZ and cross-Region replicas extend read locality; replicas
            can be promoted to standalone (one-way — plan it).
          </>,
          <>
            Replication lag is the trade-off — replicas can serve slightly
            stale data.
          </>,
        ]}
      />

      <H2>RDS Proxy — the connection fix</H2>
      <UL
        items={[
          <>
            Pools and shares database connections for thousands of
            short-lived Lambda/ECS clients; prevents{" "}
            <strong>connection exhaustion</strong> under bursts.
          </>,
          <>
            Also masks failover: the proxy re-establishes to the new
            instance, keeping the app’s endpoint stable.
          </>,
          <>
            IAM auth support, Secrets Manager integration — credentials never
            in the app.
          </>,
        ]}
      />

      <H2>Performance Insights and the tuning loop</H2>
      <UL
        items={[
          <>
            <strong>Performance Insights</strong> shows database load by wait
            state and top SQL — “what is the database waiting on” answered
            visually.
          </>,
          <>
            <strong>Storage:</strong> gp3 tuning or io1/io2 for IOPS-bound
            workloads; <strong>storage autoscaling</strong> removes the
            manual resize; <strong>Enhanced Monitoring</strong> gives
            OS-level metrics below the DB engine.
          </>,
        ]}
      />
      <Callout type="exam">
        Symptom → lever: <strong>“too many open connections from
        serverless”</strong> → RDS Proxy. <strong>“reporting queries slow
        the primary”</strong> → read replicas. <strong>“disk nearly
        full”</strong> → storage autoscaling. <strong>“which SQL is
        slow”</strong> → Performance Insights.
      </Callout>
      <Callout type="warn">
        Read replicas scale reads, Multi-AZ scales availability — neither
        fixes a write-heavy primary. When writes saturate, the answers are
        engine tuning, sharding, or a bigger class; Multi-AZ would only
        mirror the problem.
      </Callout>
    </>
  );
}

export function Lesson332() {
  return (
    <>
      <Lead>
        Aurora is MySQL/PostgreSQL-compatible with a distributed storage layer
        that changes the performance math: up to 15 low-latency replicas,
        storage that scales to 128 TiB, and several engines-level accelerators.
      </Lead>

      <H2>The performance features</H2>
      <UL
        items={[
          <>
            <strong>Up to 15 Aurora Replicas</strong> with ~1/10 the replica
            lag of typical MySQL replication, plus{" "}
            <strong>reader endpoints</strong> that load-balance automatically.
          </>,
          <>
            <strong>Aurora Serverless v2:</strong> capacity scales in
            fine-grained increments (fractional ACUs to full) — instant
            response to unpredictable load, no replica management.
          </>,
          <>
            <strong>Aurora parallel query:</strong> pushes analytic scans down
            to the storage layer without moving data to a warehouse.
          </>,
          <>
            <strong>I/O-Optimized:</strong> predictable pricing for
            I/O-intensive clusters (no I/O charges, higher instance rate).
          </>,
        ]}
      />

      <H2>The selection pairs</H2>
      <UL
        items={[
          <>
            <strong>“spiky dev/test, unpredictable load”</strong> → Serverless
            v2.
          </>,
          <>
            <strong>“heavy reporting mixed with OLTP”</strong> → parallel
            query (or offload to Redshift for serious analytics).
          </>,
          <>
            <strong>“steady heavy I/O, want predictable bills”</strong> →
            I/O-Optimized.
          </>,
        ]}
      />
      <Callout type="exam">
        Aurora vs RDS selection in one line: <strong>“MySQL/Postgres
        performance + faster failover + auto-scaling storage”</strong> →
        Aurora. The numbers to remember: up to 5x MySQL throughput, storage
        auto-scales 10 GiB → 128 TiB, replicas see ~1/10 the lag.
      </Callout>
      <Callout type="warn">
        Aurora is not automatically cheaper — instance types cost more per
        unit. The wins are performance-per-dollar at scale, storage
        elasticity, and operational headroom, not a lower line item.
      </Callout>
    </>
  );
}

export function Lesson333() {
  return (
    <>
      <Lead>
        Aurora’s operational accelerators replace slow maintenance tasks with
        near-instant operations — each one answers a specific “this used to
        take hours” question.
      </Lead>

      <H2>The four accelerators</H2>
      <UL
        items={[
          <>
            <strong>Backtrack:</strong> rewind the cluster to a previous point
            <em> in place</em>, without a restore — undo a bad DELETE within
            the backtrack window (up to 72 hours), MySQL-compatible.
          </>,
          <>
            <strong>Fast cloning:</strong> copy a multi-TiB cluster in minutes
            using copy-on-write — perfect for staging or test environments.
          </>,
          <>
            <strong>Zero-ETL integration to Redshift:</strong> transactional
            data appears in Redshift within seconds — analytics without
            building pipelines.
          </>,
          <>
            <strong>Blue/green deployments:</strong> create a synchronized
            staging environment, test changes (upgrades, schema, parameters),
            then switch over with controlled cutover.
          </>,
        ]}
      />
      <KeyTable
        head={["Task", "Old way (slow)", "Aurora accelerator"]}
        rows={[
          ["Undo a bad DELETE", "Point-in-time restore → new cluster → migrate changes", "Backtrack in place, minutes"],
          ["Copy cluster for testing", "Snapshot + restore, hours for TiB-scale", "Clone, minutes, copy-on-write"],
          ["Feed analytics warehouse", "Build and monitor an ETL pipeline", "Zero-ETL to Redshift, seconds lag"],
          ["Major version upgrade safely", "Restore snapshot to test, cut over manually", "Blue/green with managed switchover"],
        ]}
      />
      <Callout type="exam">
        Distinguish the three “copy” accelerators:{" "}
        <strong>clone</strong> = new environment from the cluster (testing),{" "}
        <strong>backtrack</strong> = rewind the same cluster (undo mistake,{" "}
        MySQL only), <strong>zero-ETL</strong> = continuously feed{" "}
        <em>Redshift</em>. The scenario’s goal word — test, undo, or
        analytics — picks the answer.
      </Callout>
      <Callout type="warn">
        Backtrack applies to <strong>Aurora MySQL only</strong>, must be{" "}
        <em>enabled in advance</em>, and has a window (up to 72 hours) — it
        is not a general PITR substitute (that’s continuous backups, up to 35
        days, restoring to a <em>new</em> cluster).
      </Callout>
    </>
  );
}

export function Lesson334() {
  return (
    <>
      <Lead>
        DynamoDB performance is decided at design time by one thing: the
        partition key. Everything the service does adaptively — splitting,
        isolation, routing — rides on how keys distribute traffic.
      </Lead>

      <H2>Partition keys and hot partitions</H2>
      <UL
        items={[
          <>
            Items with the <strong>same partition key live on the same
            partition</strong> and share its throughput — a hot key (one
            celebrity user, one trending product) throttles while others idle.
          </>,
          <>
            <strong>Write sharding:</strong> append a random suffix (0–N) to
            hot partition keys for writes, aggregate across shards on read —
            the classic pattern for counters and hot entities.
          </>,
          <>
            <strong>High-cardinality keys</strong> (IDs with natural
            randomness) distribute load automatically; sequential increasing
            keys (timestamps alone) concentrate writes on one partition.
          </>,
        ]}
      />

      <H2>Adaptive capacity and warm throughput</H2>
      <UL
        items={[
          <>
            <strong>Adaptive capacity</strong> automatically isolates hot
            partitions and rebalances — throughput recovers without action,
            but design still prevents the throttle in the first place.
          </>,
          <>
            <strong>Warm throughput</strong> pre-establishes a steady request
            level before a known event (product launch) so the first wave
            doesn’t throttle.
          </>,
        ]}
      />

      <H2>Key design — the access-pattern-first method</H2>
      <UL
        items={[
          <>
            List access patterns first, then design the table: partition key
            for even distribution, sort key for range queries,{" "}
            <strong>one table, many access patterns</strong> via GSIs.
          </>,
          <>
            <strong>Composite sort keys</strong> enable hierarchical queries
            (CustomerId#OrderDate prefixes) without filters.
          </>,
        ]}
      />
      <Callout type="exam">
        “Throttling on one partition while others are idle” → hot key →
        sharding or key redesign. “Look up users by email but the key is
        userId” → GSI on email. “Query orders by date range for one
        customer” → composite sort key starting with CustomerId. Each maps
        to one DynamoDB feature.
      </Callout>
      <Callout type="warn">
        Scans are the anti-pattern: a Filter on a Scan reads and bills{" "}
        <em>every item</em>. If a lesson/question shows Scan + Filter as the
        access path, the correct design is a GSI or a different key
        structure.
      </Callout>
    </>
  );
}

export function Lesson335() {
  return (
    <>
      <Lead>
        DynamoDB’s advanced features — DAX, capacity modes, transactions,
        Streams, TTL, and storage classes — are each a one-line answer to a
        specific requirement. Learn the trigger phrase for each.
      </Lead>

      <H2>The trigger-phrase table</H2>
      <KeyTable
        head={["Requirement", "Feature", "Detail"]}
        rows={[
          ["Microsecond reads of hot items, minimal code change", "DAX", "In-memory cache in front of the table; eventually consistent reads"],
          ["Unpredictable, spiky traffic; no capacity planning", "On-demand capacity mode", "Pay per request; scales instantly"],
          ["Steady, predictable traffic", "Provisioned + auto scaling (+ reserved capacity)", "Cheapest at steady state"],
          ["Multi-item atomic writes", "Transactions (TransactWriteItems)", "All-or-nothing across items/tables"],
          ["React to item changes in real time", "DynamoDB Streams / Kinesis Data Streams", "Ordered change feed for Lambda and consumers"],
          ["Expire sessions automatically", "TTL on a time attribute", "Deleted without consuming write throughput"],
          ["Rarely-accessed storage at ~10x cheaper", "Standard-IA table class", "Lower storage cost, higher per-access cost"],
          ["Access in microseconds without DAX code change", "Warm throughput + On-demand", "Complementary — warm for headroom, DAX for cache"],
        ]}
      />

      <H2>DAX in depth — the one that needs care</H2>
      <UL
        items={[
          <>
            DAX sits <strong>in front of the table</strong>: item cache and
            query/cache results, microsecond latency for hot reads.
          </>,
          <>
            <strong>Eventually consistent only</strong> for cached reads —
            strongly consistent reads bypass the cache.
          </>,
          <>
            Write-through: writes go through DAX to the table, keeping the
            cache coherent.
          </>,
          <>
            Choose DAX over ElastiCache when you want DynamoDB API
            compatibility and minimal code change; ElastiCache when you need
            richer cache structures or cross-engine caching.
          </>,
        ]}
      />
      <Callout type="exam">
        “Session data with TTL, occasionally hot, cost-sensitive” → TTL +
        on-demand. “Leaderboard with 10k reads/sec on few items” → DAX (or
        item sharding). “Two tables must update atomically” → transactions.
        The phrase <strong>“microsecond”</strong> is DAX’s fingerprint;
        <strong> “millisecond at any scale”</strong> is DynamoDB itself.
      </Callout>
    </>
  );
}

export function Lesson336() {
  return (
    <>
      <Lead>
        Caching turns database load into memory latency. ElastiCache offers
        two engines with different personalities, and two caching strategies
        that determine consistency behavior — the exam tests both mappings.
      </Lead>

      <H2>Redis vs Memcached</H2>
      <KeyTable
        head={["Capability", "Redis (ElastiCache/MemoryDB)", "Memcached"]}
        rows={[
          ["Data structures", "Rich: sorted sets, lists, hashes, pub/sub, streams", "Simple key-value strings"],
          ["Persistence / durability", "Snapshots (RDB) + append-only (AOF)", "None — cache only"],
          ["Replication / failover", "Multi-AZ replication groups, automatic failover", "None — nodes are independent"],
          ["Scaling", "Cluster mode (sharding) + read replicas", "Add nodes; client-side sharding"],
          ["Multi-threaded", "Single-threaded engine (I/O threads newer)", "Multi-threaded by design"],
          ["Choose for", "Rich semantics, durability, pub/sub, leaderboards", "Simple flat cache, pure speed, stateless"],
        ]}
      />
      <Callout type="warn">
        <strong>MemoryDB for Redis</strong> is the durable variant — a
        Redis-compatible <em>primary database</em> with multi-AZ
        transactional durability, not a cache. “Redis-compatible AND durable
        as the system of record” → MemoryDB, never ElastiCache.
      </Callout>

      <H2>Caching strategies — lazy loading vs write-through</H2>
      <UL
        items={[
          <>
            <strong>Lazy loading:</strong> cache fills on miss — only
            requested data cached, but stale until TTL and misses are slow.
            Default choice for read-heavy caches where staleness is
            tolerable.
          </>,
          <>
            <strong>Write-through:</strong> every write updates DB and cache
            together — cache is always fresh, but writes are slower and cold
            data occupies the cache (fix with TTL).
          </>,
          <>
            <strong>Invalidation:</strong> on data change, explicitly evict
            cache keys — the write-through companion.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Strategy"]}
        rows={[
          ["Staleness tolerable, minimize DB writes", "Lazy loading with TTL"],
          ["Cache must always match DB", "Write-through (accept write latency)"],
          ["Never serve stale for critical fields", "Write-through + short TTL as safety net"],
          ["Huge read load, writes rare", "Lazy loading + long TTL + pre-warming"],
        ]}
      />
      <Callout type="exam">
        “Reduce database load for a read-heavy catalog” → ElastiCache lazy
        loading. “Session store, fast, TTL eviction” → ElastiCache Redis.
        “Cache must never serve stale prices” → write-through. The engine
        question (“Redis or Memcached?”) hinges on durability/replication
        needs: Redis for HA and rich structures, Memcached for simple
        multithreaded flat caching.
      </Callout>
    </>
  );
}

export function Lesson337() {
  return (
    <>
      <Lead>
        Analytics engines split by query pattern: Redshift for warehouse SQL
        at scale, OpenSearch for search and log exploration. Each has a
        performance feature the exam names in the scenario.
      </Lead>

      <H2>Redshift — the petabyte warehouse</H2>
      <UL
        items={[
          <>
            <strong>Columnar storage + massive parallel processing:</strong>{" "}
            billions of rows, complex joins and aggregations at SQL speed.
          </>,
          <>
            <strong>RA3 nodes:</strong> managed storage separate from compute
            — pause/resume, cross-Region snapshot copies, data sharing across
            clusters.
          </>,
          <>
            <strong>Concurrency scaling:</strong> adds transient clusters
            automatically when query queues build — consistent fast queries
            under bursts.
          </>,
          <>
            <strong>Redshift Spectrum:</strong> query S3 data directly without
            loading — extend the warehouse to the lake.
          </>,
          <>
            <strong>Redshift Serverless:</strong> pay per use, no cluster
            management — spiky analytical workloads without capacity
            planning.
          </>,
        ]}
      />
      <Callout type="tip">
        Workload isolation pattern: heavy ETL and dashboards on separate{" "}
        <strong>workload management (WLM)</strong> queues so analytics never
        blocks operational reporting — a classic performance answer.
      </Callout>

      <H2>OpenSearch — search and logs</H2>
      <UL
        items={[
          <>
            Full-text <strong>search engine</strong>: relevance-ranked queries
            across millions of documents (product search, document discovery).
          </>,
          <>
            <strong>Log analytics:</strong> ingest CloudWatch/application logs
            via Firehose/Lambda, visualize with OpenSearch Dashboards.
          </>,
          <>
            <strong>UltraWarm / cold tiers:</strong> S3-backed read-only tiers
            for old indices at a fraction of hot storage cost.
          </>,
          <>
            Sizing: data nodes, dedicated masters (stability), shards per
            index — the exam stays at the “which service and why” level, but
            knows “dedicated masters for large domains.”
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Engine"]}
        rows={[
          ["Business analytics SQL over terabytes", "Redshift"],
          ["Ad-hoc queries on S3 data lake", "Athena"],
          ["Full-text search / faceted product search", "OpenSearch"],
          ["Operational log analytics with dashboards", "OpenSearch"],
          ["BI dashboards for business users", "QuickSight on Redshift/Athena"],
        ]}
      />
      <Callout type="exam">
        “Clickstream analytics with dashboards for analysts” → OpenSearch
        (or Redshift for warehouse-scale SQL — the differentiator is
        <em> search</em> vs <em>SQL over structured data</em>). “Log
        exploration with visualizations” → OpenSearch Dashboards.
      </Callout>
    </>
  );
}

export function Lesson338() {
  return (
    <>
      <Lead>
        DynamoDB covers key-value and documents. Everything else has a
        purpose-built database — and the exam gives you the data shape, not
        the engine name. The mapping table is the lesson.
      </Lead>

      <H2>The selection table</H2>
      <KeyTable
        head={["Data shape / requirement", "Purpose-built DB", "Signature detail"]}
        rows={[
          ["Connected data: social graphs, fraud rings, recommendations", "Amazon Neptune", "Gremlin/openCypher/SPARQL; cross-Region replicas"],
          ["Wide-column, Cassandra-compatible, always-on", "Amazon Keyspaces", "CQL driver compatibility, serverless scaling"],
          ["Time-series at scale: IoT, metrics, telemetry", "Amazon Timestream", "Auto retention policies, recent-data in memory, scheduled queries"],
          ["Immutable, cryptographically verifiable ledger", "Amazon QLDB", "Journal-based, digest verification"],
          ["MongoDB workloads, document model", "Amazon DocumentDB", "MongoDB-compatible APIs, elastic clustering"],
          ["SQL Server / Oracle with OS-level control", "RDS Custom", "Managed infra + OS/db admin access"],
        ]}
      />

      <H2>The reasoning pattern</H2>
      <P>
        Purpose-built databases win because each removes a constraint the
        general engine fights: relationships without expensive joins
        (Neptune), serverless scale without capacity planning (Keyspaces,
        Timestream), tamper-proof audit without external tooling (QLDB), and
        MongoDB semantics without managing replicasets (DocumentDB).
      </P>
      <UL
        items={[
          <>
            The exam gives the <strong>shape and the pain</strong>: “joins are
            killing us on friend-of-friend queries” → Neptune; “Cassandra
            cluster patching is toil” → Keyspaces; “need cryptographic proof
            of ledger integrity” → QLDB.
          </>,
          <>
            DynamoDB remains the default key-value/document store —{" "}
            purpose-built engines appear when the data model itself is
            specialized (graph, time-series, ledger, wide-column at Cassandra
            scale).
          </>,
        ]}
      />
      <Callout type="tip">
        A quick association drill: graph → Neptune; Cassandra → Keyspaces;
        ledger → QLDB; time-series → Timestream; MongoDB → DocumentDB;
        Redis-durable → MemoryDB. These one-word mappings decide several
        questions per exam.
      </Callout>
    </>
  );
}
