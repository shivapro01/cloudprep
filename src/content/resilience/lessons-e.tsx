import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { EbsResilienceDiagram, StorageDurabilityDiagram } from "@/components/lesson/diagrams-2-3";

/** Section 2.3 lessons — part A (2.3.1–2.3.3). Original content. */

export function Lesson231() {
  return (
    <>
      <Lead>
        S3’s resilience comes from its physical design — objects are stored
        redundantly across multiple Availability Zones and automatically
        healed — and from the features you layer on top: versioning,
        replication, and the right storage class for the durability the data
        deserves.
      </Lead>

      <H2>The durability and availability model</H2>
      <P>
        <strong>Durability</strong> is not losing objects (S3 Standard:
        99.999999999% — eleven nines); <strong>availability</strong> is being
        able to read them (S3 Standard: 99.99% design). They diverge in the
        infrequent-access classes: S3 Standard-IA keeps eleven-nines
        durability but a lower availability SLA, because after an AZ-level
        event it may need capacity restored before serving everything.
      </P>
      <UL
        items={[
          <>
            <strong>Multi-AZ by design:</strong> every object is stored across
            at least three AZs — no configuration, no snapshots needed.
          </>,
          <>
            <strong>Single-AZ classes trade durability:</strong> S3 One
            Zone-IA and S3 Express One Zone live in one AZ (99.95% range) —
            right only for rebuildable data.
          </>,
          <>
            <strong>Cross-Region Replication</strong> is the opt-in lever for
            Regional resilience — an order-of-magnitude rarer failure, at
            replication cost.
          </>,
        ]}
      />

      <H2>Versioning — the undo button</H2>
      <UL
        items={[
          <>
            Every overwrite and delete creates a new version: deletes insert a{" "}
            <strong>delete marker</strong>, and removes are recoverable by
            deleting the marker or restoring the prior version.
          </>,
          <>
            <strong>MFA delete</strong> requires an MFA code for permanent
            version deletion and versioning-state changes.
          </>,
          <>
            <strong>Lifecycle rules</strong> prune noncurrent versions after a
            window — resilience without unbounded storage growth.
          </>,
          <>
            Replication propagates deletes too (unless configured otherwise)
            — replication is availability, versioning is undo.
          </>,
        ]}
      />
      <Callout type="exam">
        Match the phrase: <strong>“thumbnail store, rebuildable, lowest
        cost”</strong> → S3 One Zone-IA. <strong>“must survive an AZ
        failure”</strong> → any multi-AZ class (Standard/IA/IT), never One
        Zone. <strong>“protect against accidental overwrite and delete”</strong>{" "}
        → versioning (plus MFA delete for extra control).
      </Callout>
    </>
  );
}

export function Lesson232() {
  return (
    <>
      <Lead>
        EBS lives in one AZ — replicated within it so host failure doesn’t
        lose data, but an AZ failure takes the volume down. The resilience
        chain is snapshots: point-in-time, S3-backed, restorable in any AZ or
        Region, wrapped in protection features that prevent and accelerate
        recovery.
      </Lead>

      <Diagram title="The EBS resilience chain" caption="Snapshot is the durability boundary — everything else is convenience on top of it.">
        <EbsResilienceDiagram />
      </Diagram>

      <H2>The protection features, one line each</H2>
      <UL
        items={[
          <>
            <strong>Snapshots:</strong> incremental, point-in-time, crash-consistent; schedule with Data Lifecycle Manager or AWS Backup.
          </>,
          <>
            <strong>Recycle Bin:</strong> retention rules keep deleted snapshots (and AMIs) recoverable for a set period — the accidental-deletion answer.
          </>,
          <>
            <strong>SnapLock:</strong> WORM-style immutability on snapshots for compliance retention.
          </>,
          <>
            <strong>Fast Snapshot Restore:</strong> pre-warmed snapshots per AZ — full performance on first read instead of a warm-up period.
          </>,
          <>
            <strong>Multi-Attach:</strong> io2 volumes shareable by multiple instances <em>in the same AZ</em> — clustering, not resilience.
          </>,
        ]}
      />
      <Callout type="warn">
        The AZ-loss scenario is the differentiator: a volume dies with its AZ,
        and only a <strong>snapshot restores data into a healthy AZ</strong> —
        FSR makes that restore instantly fast. Multi-Attach keeps working
        copies in the <em>same</em> AZ; it survives nothing.
      </Callout>

      <H2>The exam sequence for “volume lost”</H2>
      <UL
        items={[
          <>
            Identify the most recent snapshot (Data Lifecycle Manager /
            Backup-managed).
          </>,
          <>
            Create a new volume from it — in the same AZ for speed, another AZ
            to escape the failure, another Region if the disaster is Regional.
          </>,
          <>
            Attach and remount — same data, new hardware. With FSR, first-read
            performance is immediate.
          </>,
        ]}
      />
      <Callout type="tip">
        Encryption propagates: snapshots of encrypted volumes are encrypted,
        restores inherit it, and cross-Region copies re-encrypt under the
        destination key. Data never appears unencrypted in this chain.
      </Callout>
    </>
  );
}

export function Lesson233() {
  return (
    <>
      <Lead>
        Instance store is the performance outlier and the durability exile:
        physically attached NVMe disks with the highest IOPS and throughput on
        EC2, zero storage charge — and every byte gone when the instance
        stops, hibernates, or the underlying host fails.
      </Lead>

      <H2>What it’s right for</H2>
      <UL
        items={[
          <>
            <strong>Scratch space:</strong> intermediate data recreated on
            every run (big data shuffles, render temp files, ML checkpoint
            staging).
          </>,
          <>
            <strong>Buffers fronting durable storage:</strong> replicated
            systems that treat local disk as disposable — Kafka brokers with
            multi-broker replication, cache tiers.
          </>,
          <>
            Anything where the <em>system of record lives elsewhere</em> (S3,
            EFS, a database) and local speed is the point.
          </>,
        ]}
      />

      <H2>What disqualifies it instantly</H2>
      <UL
        items={[
          <>
            Data must survive <strong>instance stop/termination</strong> — it
            doesn’t.
          </>,
          <>
            Data must survive <strong>host hardware failure</strong> — it
            doesn’t.
          </>,
          <>
            Volume must <strong>detach and move</strong> to another instance —
            impossible.
          </>,
        ]}
      />

      <H2>Using it responsibly</H2>
      <P>
        The resilient pattern pairs instance store performance with durable
        durability elsewhere: replicate or checkpoint continuously to EBS
        snapshots, S3, or a peer — so a host failure costs re-processing, not
        data. RAID 0 across instance store volumes multiplies throughput but
        guards only against single-disk failure, not instance failure.
      </P>
      <Callout type="exam">
        The instant-recognizer: <strong>“highest performance temporary
        storage, data is disposable/re-derivable”</strong> → instance store.
        The moment “data must survive restarts” appears — even once — it’s
        EBS (gp3/io2) or another durable store, and instance store is the
        trap answer.
      </Callout>
      <Callout type="note">
        Sizing nuance: instance store capacity and count are fixed per
        instance type — choose the family for the disk layout, not the other
        way around.
      </Callout>
    </>
  );
}
