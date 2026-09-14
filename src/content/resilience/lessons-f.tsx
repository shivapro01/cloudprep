import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { BackupVsReplicationDiagram, EfsChoiceDiagram, FsxDurabilityDiagram } from "@/components/lesson/diagrams-2-3";

/** Section 2.3 lessons — part B (2.3.4–2.3.6). Original content. */

export function Lesson234() {
  return (
    <>
      <Lead>
        EFS resilience is a one-bit decision with a price tag:{" "}
        <strong>Standard</strong> stores file data across multiple AZs and
        shrugs off Zone loss; <strong>One Zone</strong> keeps everything in a
        single AZ at a discount and gambles that you can rebuild.
      </Lead>

      <Diagram title="EFS Standard vs One Zone" caption="Same protocol and interface; the difference is what an AZ failure costs you.">
        <EfsChoiceDiagram />
      </Diagram>

      <H2>The decision drivers</H2>
      <KeyTable
        head={["Requirement", "Class"]}
        rows={[
          ["Production shared storage — CMS media, home directories, app data", "Standard (multi-AZ)"],
          ["Build/scratch/regenerable data where cost wins", "One Zone"],
          ["Cheapest EFS for infrequently accessed files", "One Zone IA, or lifecycle into IA classes"],
          ["“must remain available if an AZ fails”", "Standard — One Zone is unavailable during the AZ event"],
        ]}
      />
      <UL
        items={[
          <>
            Mount targets follow the class: Standard has one per AZ; One Zone
            has exactly one — the resilience boundary is literal.
          </>,
          <>
            <strong>Backups apply to both</strong> via AWS Backup — and a
            restored file system lands in a chosen AZ, which is also the
            One-Zone recovery path.
          </>,
          <>
            Lifecycle policies (Standard → IA) change storage cost, not the AZ
            model — resilience and cost tiers are independent settings.
          </>,
        ]}
      />
      <Callout type="exam">
        The keyword pair is <strong>“rebuildable”</strong> (One Zone is fine)
        versus <strong>“must survive an AZ failure”</strong> (Standard). And
        when “lowest cost shared file system” appears with no resilience
        clause — One Zone IA with lifecycle policies is the cost answer.
      </Callout>

      <H2>Throughput modes and burst credits</H2>
      <UL
        items={[
          <>
            <strong>Bursting mode:</strong> baseline throughput scales with
            file system size; unused headroom accrues as burst credits spent
            during spikes — small file systems throttle sooner.
          </>,
          <>
            <strong>Provisioned mode:</strong> pay for a fixed MB/s
            regardless of size — predictable heavy workloads (media
            rendering, analytics scratch) where bursting would flap.
          </>,
          <>
            <strong>Elastic Throughput:</strong> automatically matches the
            workload up or down — the default answer when the pattern is
            unknown or spiky, at a premium per GB transferred.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson235() {
  return (
    <>
      <Lead>
        The FSx family splits by engine, and each engine splits again by
        availability. Windows and ONTAP offer multi-AZ HA; Lustre splits into
        scratch (ephemeral, unreplicated) and persistent (replicated,
        self-healing); OpenZFS adds multi-AZ for NFS. Availability and
        durability are chosen separately.
      </Lead>

      <Diagram title="FSx availability map" caption="Match the engine to the protocol first, then the availability option to the requirement.">
        <FsxDurabilityDiagram />
      </Diagram>

      <H2>Availability options by engine</H2>
      <KeyTable
        head={["Engine", "Availability options", "Resilience behavior"]}
        rows={[
          ["Windows File Server", "Multi-AZ (synchronous standby, automatic failover) or Single-AZ", "Multi-AZ survives AZ loss; SSD/HDD is the separate performance choice"],
          ["Lustre", "Scratch (no replication) or Persistent (replicated, self-healing)", "Scratch dies with the cluster by design; Persistent survives failures"],
          ["ONTAP", "Multi-AZ HA pairs", "HA within the pair; snapshots and SnapMirror for recovery"],
          ["OpenZFS", "Multi-AZ or Single-AZ", "Snapshots and clone-based recovery on NFS workloads"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Backups complete every engine:</strong> automatic daily
            backups plus AWS Backup integration, restorable cross-Region —
            in-service availability is one layer, backups are the durability
            layer.
          </>,
          <>
            <strong>Throughput/storage config is orthogonal:</strong> HDD
            storage for cost-sensitive Windows workloads, SSD/provisioned
            IOPS for demanding ones.
          </>,
        ]}
      />
      <Callout type="exam">
        Selection shortcuts: <strong>“Windows SMB shares, highly available”</strong>{" "}
        → FSx Windows Multi-AZ. <strong>“HPC scratch that can vanish”</strong>{" "}
        → Lustre Scratch. <strong>“long-lived Lustre dataset”</strong> →{" "}
        Lustre Persistent. <strong>“NetApp enterprise environment”</strong> →
        ONTAP. <strong>“cheapest Windows shares for dev”</strong> → Single-AZ
        with HDD.
      </Callout>

      <H2>FSx backup windows and retention</H2>
      <UL
        items={[
          <>
            <strong>Automatic daily backups</strong> run inside a configurable
            window with a retention period you set — align the window with
            off-peak hours to avoid I/O contention on HDD-backed systems.
          </>,
          <>
            <strong>AWS Backup</strong> adds cross-Region and cross-account
            copies plus centralized retention policies on top of the native
            backups.
          </>,
          <>
            Backups are crash-consistent file-system snapshots — restore
            creates a new file system, never overwrites in place.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson236() {
  return (
    <>
      <Lead>
        Backup and replication are complements, not substitutes — and the exam
        repeatedly checks that you know which one answers which failure.
        Replication keeps you <em>serving</em>; backups let you{" "}
        <em>undo</em>.
      </Lead>

      <Diagram title="Replication vs backups" caption="Replication fails together with its source; backups are the independent undo.">
        <BackupVsReplicationDiagram />
      </Diagram>

      <H2>The two failure families</H2>
      <UL
        items={[
          <>
            <strong>Infrastructure failure</strong> (AZ/Region/host dies):
            replication wins — live copies in healthy zones keep serving, RPO
            seconds to minutes.
          </>,
          <>
            <strong>Data failure</strong> (deletion, corruption, ransomware,
            bad deploy): replication loses — the delete copies everywhere.
            Only an <em>independent</em> backup (different account, Vault
            Lock, PITR window) recovers.
          </>,
        ]}
      />
      <P>
        The mature design runs both: replication for availability, backups
        for recoverability — and where ransomware is in scope, the backups
        are cross-account with Vault Lock or Object Lock so the attacker who
        owns the workload account still can’t destroy them.
      </P>

      <H2>Per-store pairing cheat sheet</H2>
      <KeyTable
        head={["Store", "Replication (availability)", "Backup (recoverability)"]}
        rows={[
          ["S3", "CRR / MRAP across Regions", "Versioning + replication + AWS Backup/Object Lock"],
          ["RDS/Aurora", "Multi-AZ + read replicas; Aurora global", "Automated backups, snapshots, Backup plans"],
          ["DynamoDB", "Global tables", "PITR (35 days) + on-demand backups"],
          ["EBS", "— (volume is AZ-bound)", "Snapshots, cross-Region copies, Recycle Bin"],
          ["EFS/FSx", "Multi-AZ deployment", "AWS Backup with cross-Region copies"],
        ]}
      />
      <Callout type="exam">
        The scenario tells you which family: <strong>“Region outage”</strong> →
        replication answers; <strong>“someone deleted the data”</strong> →
        backup answers; <strong>“both requirements in one design”</strong> →
        the layered answer with both. And the sneaky one:{" "}
        <strong>“a replicated delete”</strong> — replication copies deletes,
        so replication alone never protects against deletion.
      </Callout>
      <Callout type="tip">
        Cost check: replication runs continuously (storage in two places +
        transfer), backups bill on stored restore points. Right-sizing means
        matching the RPO: continuous where minutes matter, scheduled where
        they don’t.
      </Callout>

      <H2>RTO math — sizing restores against the clock</H2>
      <UL
        items={[
          <>
            <strong>RTO = detection + decision + restore + verification.</strong>{" "}
            Restore speed depends on data size ÷ restore throughput: a 5 TiB
            EBS snapshot restores in minutes to a warm AZ, while cross-Region
            copies add transfer time first.
          </>,
          <>
            <strong>Fast Snapshot Restore</strong> removes the lazy-loading
            penalty (first-touch latency on restored volumes) — without it,
            budget warm-up time into the RTO.
          </>,
          <>
            <strong>Test the math:</strong> restore drills measure actual
            elapsed time including DNS cutover and health-check pass — the
            exam’s “will this RTO be met” questions hinge on the slowest
            component, usually data transfer, not compute launch.
          </>,
        ]}
      />
    </>
  );
}
