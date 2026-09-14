import { Callout, Code, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 4.1 lessons — storage cost optimization (expanded). Original content. */

export function Lesson411() {
  return (
    <>
      <Lead>
        S3 cost optimization is a matching exercise: access frequency and
        retrieval speed determine the class, and lifecycle rules move objects
        along it automatically as they age. The exam gives you an access
        pattern and a retention period — the answer falls out of two tables.
      </Lead>

      <H2>Storage class selection — the full ladder</H2>
      <KeyTable
        head={["Class", "Durability / AZs", "Access speed", "Retrieval fee", "Min billing duration"]}
        rows={[
          ["S3 Standard", "11 nines, multi-AZ", "ms", "None", "None"],
          ["Intelligent-Tiering", "11 nines, multi-AZ", "ms (frequent/infrequent tiers)", "None", "None (auto-tiering fee)"],
          ["Standard-IA", "11 nines, multi-AZ", "ms", "Per GB retrieved", "30 days"],
          ["One Zone-IA", "99.95%, single AZ", "ms", "Per GB retrieved", "30 days"],
          ["Glacier Instant Retrieval", "11 nines, multi-AZ", "ms", "Highest per-GB retrieval", "90 days"],
          ["Glacier Flexible Retrieval", "11 nines, multi-AZ", "Minutes–hours (expedited/bulk)", "Per GB + request", "90 days"],
          ["Glacier Deep Archive", "11 nines, multi-AZ", "Up to 12+ hours", "Per GB + request", "180 days"],
        ]}
      />
      <P>
        Read the table as three questions: <strong>how often is it
        accessed</strong> (picks the storage-cost tier), <strong>how fast
        must it come back</strong> (picks instant vs flexible vs deep), and{" "}
        <strong>how long will it be kept</strong> (the minimum-duration
        floor — deleting earlier still bills the full minimum).
      </P>

      <H2>Lifecycle design rules</H2>
      <UL
        items={[
          <>
            Transitions trigger by <strong>age, prefix, or tag</strong> — logs
            to Glacier Flexible at 90 days, quarterly reports to Deep Archive
            at 180, stale staging data expired at 7.
          </>,
          <>
            <strong>Noncurrent versions</strong> have separate rules —
            transition old versions to colder classes and expire them
            eventually, or versioned buckets quietly become the largest line
            item.
          </>,
          <>
            <strong>Abort incomplete multipart uploads</strong> after 7 days —
            orphaned parts are pure storage waste that inventories reveal.
          </>,
          <>
            Transitions respect <strong>minimum storage durations</strong>:
            moving data to IA for a 10-day stay costs more than leaving it in
            Standard (IA bills a 30-day minimum on write).
          </>,
        ]}
      />
      <Callout type="exam">
        The wording map: <strong>“accessed once a quarter, restore within
        hours”</strong> → Glacier Flexible Retrieval. <strong>“monthly,
        immediately”</strong> → Glacier Instant Retrieval. <strong>“rarely,
        next business day is fine”</strong> → Deep Archive.{" "}
        <strong>“frequently, unknown pattern”</strong> → Intelligent-Tiering.
        And the classic cost trap: data accessed <em>weekly</em> in
        Standard-IA pays more in retrieval fees than Standard would — the
        requirement wording (“frequently accessed, immediate”) decides.
      </Callout>

      <H2>Versioning and replication interact with cost</H2>
      <UL
        items={[
          <>
            Versioned buckets store <strong>every noncurrent
            version</strong> at the same class rate — noncurrent transition
            and expiration rules are what keep them from becoming the largest
            line item.
          </>,
          <>
            <strong>Cross-Region Replication</strong> doubles storage and adds
            inter-Region transfer — configure it where DR requires it, and
            use Same-Region Replication where it doesn’t.
          </>,
          <>
            <strong>Incomplete multipart uploads</strong> bill as storage
            until aborted — a lifecycle rule closes the leak.
          </>,
          <>
            <strong>S3 request costs:</strong> PUT/COPY/POST/LIST and GET
            requests are billed per thousand — trivial for humans, decisive
            for applications making millions of small operations. Short-lived
            objects favor fewer, larger writes (multipart) plus lifecycle
            expiration over many tiny PUTs.
          </>,
        ]}
      />

      <H2>The annual restore-count trap</H2>
      <P>
        A Glacier class looks nearly free per GB until you pull data back. A
        yearly audit that restores a full archive every year turns a
        “$0.004/GB/month” class into a retrieval bill that dwarfs the storage
        line — because restore volume is billed per GB <em>plus</em> per
        request. Two questions follow: is the restore pattern monthly
        (Instant Retrieval) or yearly (Flexible); and do you even need to
        restore everything (partial restores, Athena over the archive,
        or keeping a hot subset in Standard).
      </P>
      <Callout type="warn">
        The trap phrasing: <strong>“archive once, restore fully every year
        for compliance”</strong> — Flexible looks cheap per GB, but model
        the yearly restore count before assuming. “Restore twice a year”
        flips some archives back to Instant Retrieval.
      </Callout>
      <Callout type="tip">
        The retention-first ordering: pick the class from{" "}
        <em>retrieval speed</em> and <em>minimum duration</em> first, then
        tune transitions. Retention periods longer than the minimum make
        colder classes safe; early deletion is where the fee traps live.
      </Callout>
    </>
  );
}

export function Lesson412() {
  return (
    <>
      <Lead>
        Intelligent-Tiering (IT) is S3’s automatic cost optimizer: objects move
        between access tiers based on observed usage — no retrieval fees, no
        restore delays, no lifecycle rules to design. The cost is a small
        monitoring fee per object, which is why it fits some buckets perfectly
        and others badly.
      </Lead>

      <H2>How the tiering engine works</H2>
      <UL
        items={[
          <>
            Objects begin in <strong>Frequent Access</strong>; after 30 days
            without access they move to <strong>Infrequent Access</strong>;
            after 90 further days of no access, optional{" "}
            <strong>Archive Access</strong> and then{" "}
            <strong>Deep Archive Access</strong> tiers apply (both enabled per
            bucket/prefix).
          </>,
          <>
            Any read or write of an archived object promotes it back to
            Frequent automatically — <strong>no retrieval fees, no restore
            delay</strong>, ever.
          </>,
          <>
            A monitoring fee applies per object (a fraction of a cent per
            object per month) — negligible on large objects, decisive on
            tiny ones.
          </>,
        ]}
      />

      <H2>The 128 KB floor and the tiny-object trap</H2>
      <P>
        Objects <strong>smaller than 128 KB are never tiered</strong> — the
        monitoring fee would exceed the storage saving, so they remain in
        Frequent Access regardless. A bucket of millions of small JSON files
        therefore gets no IT benefit; either aggregate small objects, or
        accept Standard pricing. The exam tests exactly this boundary: “a
        bucket of log lines, each a few KB, unpredictable access” — IT won’t
        help until objects are aggregated.
      </P>

      <H2>When IT is the designed answer</H2>
      <KeyTable
        head={["Pattern", "IT?"]}
        rows={[
          ["Unknown, changing, or unpredictable access patterns", "Yes — the designed use case"],
          ["Long-lived objects with long quiet periods", "Yes — enable the Archive tiers too"],
          ["Long-lived mixed data lake with uncertain aging", "Yes — including new objects at upload"],
          ["Billions of tiny objects", "No — monitoring fee vs negligible storage"],
          ["Known steady access pattern (always hot / always cold)", "No — pick the matching class directly"],
        ]}
      />
      <Callout type="exam">
        “Access patterns are unknown or unpredictable, minimize operational
        overhead” → <strong>Intelligent-Tiering</strong>. The distractors:
        Standard-IA (adds retrieval fees for unpredictable access), Deep
        Archive (hours of delay), and lifecycle rules (require knowing the
        pattern to write rules for).
      </Callout>
      <Callout type="tip">
        IT objects between 128 KB and the tier thresholds sit in Frequent
        Access — for datasets dominated by small objects, pair IT with
        aggregation at write time to get both the tiering and the request
        cost benefits.
      </Callout>

      <H2>The restore-cadence trap — when IT beats Glacier and when it doesn’t</H2>
      <P>
        Two buckets can hold the “same” cold data with opposite bills. An
        Intelligent-Tiering bucket restored quarterly promotes objects back
        to Frequent for free — zero retrieval fees, no restore requests to
        budget. A Glacier Flexible bucket restored quarterly pays per-GB
        retrieval plus per-request restore costs every time. The exam probes
        this as “cheapest class for data restored every quarter”: the
        Glacier number looks smaller per GB, but quarterly restores erase
        the gap.
      </P>
      <UL
        items={[
          <>
            <strong>Restored monthly or more:</strong> IT or Standard
            wins — retrieval fees dominate Glacier math.
          </>,
          <>
            <strong>Restored yearly or never:</strong> Flexible/Deep Archive
            wins — storage dominates.
          </>,
          <>
            <strong>Unpredictable cadence:</strong> IT wins by construction —
            the free promotion absorbs any pattern including surprises.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson413() {
  return (
    <>
      <Lead>
        EBS cost optimization is three moves: right-size to <strong>gp3</strong>{" "}
        (the default answer), understand the incremental snapshot model so
        retention deletes actually save money, and automate the whole
        lifecycle with policies.
      </Lead>

      <H2>gp3 right-sizing — the guaranteed win</H2>
      <UL
        items={[
          <>
            gp3 includes <strong>3,000 IOPS and 125 MB/s free</strong>,
            independent of volume size, with provisioning up to 16,000 IOPS
            and 1,000 MB/s.
          </>,
          <>
            gp2 couples IOPS to size (~3 IOPS/GB) — a 1 TiB gp2 volume bills
            for 3,000 IOPS whether you use them or not; the same gp3 volume
            costs roughly 20% less at identical performance.
          </>,
          <>
            Migration is online: modify volume type, keep data, adjust
            IOPS/throughput after measuring.
          </>,
        ]}
      />

      <H2>Snapshot economics — how the billing actually works</H2>
      <UL
        items={[
          <>
            The first snapshot copies <strong>all used blocks</strong> to S3;
            every later snapshot stores only{" "}
            <strong>blocks changed since the previous snapshot</strong>.
          </>,
          <>
            Deleting an old snapshot removes only the{" "}
            <strong>blocks unique to it</strong> — later snapshots may
            reference the same blocks. That’s why deleting 50 old snapshots
            can save almost nothing while one delete saves a lot.
          </>,
          <>
            <strong>Archive tier:</strong> snapshots untouched for 90+ days
            move to full-performance archive at roughly 1/10 the standard
            rate; restores from archive take up to several hours — right for
            compliance copies nobody restores fast.
          </>,
          <>
            <strong>Data Lifecycle Manager</strong> automates schedules,
            retention, and cross-Region copies for EBS and AMIs.
          </>,
        ]}
      />
      <KeyTable
        head={["Cost symptom", "Fix"]}
        rows={[
          ["Dozens of gp2 volumes", "Migrate to gp3 in place"],
          ["Snapshot backlog growing", "Lifecycle retention + delete unreferenced snapshots"],
          ["Compliance copies never restored", "Archive tier"],
          ["Orphaned volumes after instance deletion", "Find unattached volumes, remove"],
        ]}
      />

      <H2>st1/sc1 migration path and gp2 burst credits</H2>
      <UL
        items={[
          <>
            <strong>st1 → gp3/sc1 migration:</strong> st1 fits sequential
            throughput-heavy workloads (Kafka, logs). When the pattern turns
            random or latency-sensitive, migrate to gp3; when the data goes
            cold enough to abandon throughput, sc1 (or EBS snapshots in S3)
            is the floor.
          </>,
          <>
            <strong>gp2 burst credits:</strong> gp2 volumes earn IOPS credits
            while idle and spend them under load — a sustained workload
            drains the bucket and drops to baseline 3 IOPS/GiB. That’s the
            real cost story: gp2 <em>looks</em> cheaper until the workload
            outgrows idle bursts, then gp3’s provisioned IOPS are both faster
            and cheaper.
          </>,
        ]}
      />
      <Callout type="exam">
        Three phrasings to map: <strong>“cut EBS cost 20% at the same
        performance”</strong> → gp2→gp3 migration. <strong>“reduce snapshot
        spend for rarely restored copies”</strong> → archive tier.{" "}
        <strong>“ automate backup retention and cross-Region copies”</strong>{" "}
        → DLM or AWS Backup. The distractors — “delete the oldest snapshots
        saves proportionally” — fail on the incremental model.
      </Callout>
      <Callout type="tip">
        The same hygiene applies fleet-wide: unattached volumes, idle
        Elastic IPs (now billed even when unassociated), and empty instance
        store configurations are the classic “budget leak” findings.
      </Callout>
    </>
  );
}

export function Lesson414() {
  return (
    <>
      <Lead>
        EFS storage cost is a lifecycle-policy problem: files automatically
        transition to Infrequent Access (or Archive) classes after a period
        without access, cutting storage cost dramatically with zero
        application change.
      </Lead>

      <H2>Lifecycle policies</H2>
      <UL
        items={[
          <>
            <strong>Transition-into-IA policies:</strong> move files not
            accessed for 7/14/30/60/90 days into IA (or Archive) — data stays
            at the same path, transparent to applications.
          </>,
          <>
            <strong>IA economics:</strong> storage roughly 1/8 the Standard
            price with higher per-GB access charges — the trade pays off when
            reads are rare.
          </>,
          <>
            <strong>Transition-out-of-IA:</strong> return files to
            Standard on access (or keep them in IA — configurable).
          </>,
          <>
            Metadata (names, permissions) always stays hot and is billed
            separately — only file <strong>data</strong> tiers.
          </>,
        ]}
      />

      <H2>Selection nuances</H2>
      <UL
        items={[
          <>
            Accessing an IA file flips it back to Standard (and bills access)
            — lifecycle is access-based, not a one-way move.
          </>,
          <>
            <strong>One Zone IA</strong> combines both levers for rebuildable
            datasets: single-AZ plus infrequent-access pricing.
          </>,
          <>
            Small-file workloads: IA has a per-file{" "}
            <strong>128 KiB minimum billable size</strong> — tiny files may
            cost more in IA.
          </>,
        ]}
      />
      <Callout type="exam">
        “Most files in the shared file system are rarely accessed after the
        first month; reduce cost without application changes” →{" "}
        <strong>EFS lifecycle policy into IA</strong>. If the dataset is
        also rebuildable and single-AZ acceptable, One Zone + IA stacks both
        discounts.
      </Callout>

      <H2>The decision math, worked</H2>
      <P>
        A 1 TiB file system where 90% of data goes untouched after 30 days:
        at Standard rates that data dominates the bill. With a{" "}
        <Code>transition-to-IA after 30 days</Code> policy, the cold 900 GiB
        bills at the IA rate — typically an order-of-magnitude cut on that
        portion — and reads of an archived file flip it back automatically.
      </P>
      <UL
        items={[
          <>
            <strong>Archive class</strong> extends the same idea for data
            untouched even longer — same IA-style semantics, cheaper still.
          </>,
          <>
            <strong>Throughput modes interact:</strong> Elastic Throughput
            bills per GB transferred — reducing read traffic to cold data
            cuts that line too.
          </>,
          <>
            The <Code>TransitionOutOfIAPolicy</Code> governs whether archived
            files return to Standard on access — a decision, not an accident.
          </>,
        ]}
      />
      <Callout type="warn">
        Lifecycle transitions are <strong>per file system</strong> — a
        One Zone file system transitions into One Zone IA only. Standard and
        One Zone classes can’t be mixed inside one EFS file system.
      </Callout>

      <H2>Archive waits, transition charges, and IA access fees</H2>
      <UL
        items={[
          <>
            <strong>Archive class:</strong> the coldest EFS tier — first-byte
            latencies stretch into <strong>hours</strong>, matching Glacier
            Flexible semantics for file data. Reads that need minutes belong
            in IA, not Archive.
          </>,
          <>
            <strong>Lifecycle transitions bill per file</strong> (a small
            transition request fee): millions of tiny files transitioning
            monthly can cost more in transitions than the storage saved —
            aggregate or exclude tiny-file prefixes.
          </>,
          <>
            <strong>IA access fees:</strong> every read/write against an IA
            file bills per GB on top of storage. A “cold” prefix that turns
            out to be read weekly belongs back in Standard — the exam probes
            this as “lifecycle policy is losing money” scenarios.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson415() {
  return (
    <>
      <Lead>
        You can’t optimize what you can’t see. Three S3 tools turn storage
        into measurable, actionable data — org-wide dashboards, object-level
        listings, and access-pattern analysis.
      </Lead>

      <H2>S3 Storage Lens — the org-wide dashboard</H2>
      <UL
        items={[
          <>
            Aggregate <strong>usage and activity metrics</strong> across the
            entire organization, per account/Region/bucket: total storage,
            object counts, versioning/encryption status, cost-optimize and
            data-protection categories.
          </>,
          <>
            <strong>Free tier:</strong> 28-day summary metrics.{" "}
            <strong>Advanced tier:</strong> additional metrics (activity,
            cost-optimization, data protection), prefixes, and 15-month
            history.
          </>,
          <>
            Publishes to a metrics bucket for custom dashboards; answers{" "}
            “how much, where, how classified, what’s unprotected.”
          </>,
        ]}
      />

      <H2>Inventory + Storage Class Analysis — the object-level view</H2>
      <UL
        items={[
          <>
            <strong>S3 Inventory</strong> delivers daily/weekly object lists
            (size, storage class, encryption, status) to a bucket — feed it
            to Athena for object-level questions.
          </>,
          <>
            <strong>Storage Class Analysis</strong> observes{" "}
            <em>access frequency by age group and prefix</em> and surfaces{" "}
            <strong>transition recommendations</strong> — the input for
            lifecycle tuning.
          </>,
        ]}
      />
      <KeyTable
        head={["Question", "Tool"]}
        rows={[
          ["Org-wide storage usage and protection dashboards", "Storage Lens"],
          ["Which objects are in IA past their retention window?", "S3 Inventory + Athena"],
          ["Is this prefix actually accessed often enough for Standard?", "Storage Class Analysis"],
          ["What did this bucket look like last quarter?", "Inventory historical reports"],
          ["Bulk-tag a million objects", "S3 Batch Operations (fed by Inventory)"],
        ]}
      />
      <Callout type="exam">
        The trio splits by <strong>granularity</strong>: Storage Lens =
        aggregate dashboards, Inventory = object listings, Storage Class
        Analysis = transition recommendations. The cost-visibility tools
        with different shapes — Cost Explorer (spend), CUR (line items),
        Storage Lens (S3-specific) — appear as distractors.
      </Callout>
      <Callout type="tip">
        Chain the tools into a loop: Storage Lens finds the worst bucket →
        Inventory lists its objects → Storage Class Analysis confirms the
        pattern → a lifecycle rule fixes it → Storage Lens confirms the
        saving. That loop is the remembering device for all four tools.
      </Callout>

      <H2>Backup cost decomposition and advanced visibility</H2>
      <UL
        items={[
          <>
            <strong>Backup cost decomposition:</strong> AWS Backup bills
            storage (warm vs cold tiers), plus restore operations and
            cross-Region transfer. Cutting retention from 90 to 30 days is
            often the single biggest lever — restore drills are cheap;
            hoarding restore points is not.
          </>,
          <>
            <strong>Storage Lens advanced metrics:</strong> the paid tier
            adds activity metrics (which buckets are actually read), prefix
            aggregation, and longer history — the difference between “how
            much” and “what’s hot vs dead weight.”
          </>,
          <>
            <strong>Inventory → S3 Batch Operations:</strong> Inventory CSVs
            feed Batch manifests directly — copy a million objects to a new
            class, apply tags, or invoke Lambda per object at scale. The
            exam pairs them as one pipeline.
          </>,
        ]}
      />
    </>
  );
}
