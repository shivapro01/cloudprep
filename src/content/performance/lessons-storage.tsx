import { Callout, Code, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 3.1 lessons — storage performance. Original content. */

export function Lesson311() {
  return (
    <>
      <Lead>
        S3 performance is a design exercise, not a quota problem: request
        throughput scales per prefix, large objects split into parts, and
        distance is solved at the edge. The exam presents slow uploads and
        downloads and expects the matching fix.
      </Lead>

      <H2>Request scaling — prefixes and parallelism</H2>
      <UL
        items={[
          <>
            S3 automatically scales{" "}
            <strong>per prefix</strong> — each prefix (a “folder path”) sustains
            thousands of requests per second independently, so writing{" "}
            <Code>data/2026/09/13/hh/</Code> style keys spreads load across
            many scaled prefixes.
          </>,
          <>
            Historical “randomize the first characters” advice is obsolete —
            hashing helps only when keys would otherwise share one hot prefix.
          </>,
          <>
            <strong>Multipart uploads</strong> parallelize large writes: parts
            upload concurrently, retry independently, and can complete from
            multiple connections.
          </>,
          <>
            <strong>Byte-range fetches</strong> parallelize large reads —
            request chunks of one object concurrently instead of one stream.
          </>,
        ]}
      />

      <H2>Latency and distance</H2>
      <KeyTable
        head={["Symptom", "Feature", "How it helps"]}
        rows={[
          ["Uploads slow from distant offices/fleets", "S3 Transfer Acceleration", "Uploads land at an edge location and ride the AWS backbone to the bucket"],
          ["First byte must be single-digit milliseconds", "S3 Express One Zone", "Single-AZ class with tens-of-GB/s throughput and consistent single-digit ms latency"],
          ["Users far from the bucket read the same objects", "CloudFront in front of S3", "Caches at edge locations — origin fetch happens once"],
          ["Queries scan only part of large objects", "S3 Select-style range GETs (byte ranges)", "Fetch only the needed bytes in parallel"],
        ]}
      />
      <Callout type="exam">
        The trap pairing: <strong>Transfer Acceleration accelerates uploads
        (and downloads) over long distances</strong>, while{" "}
        <strong>CloudFront caches content at the edge for repeated
        reads</strong>. “Video editors in Australia uploading to us-east-1”
        → TA; “global users downloading the same videos” → CloudFront.
      </Callout>

      <H2>Two performance cost interactions</H2>
      <UL
        items={[
          <>
            <strong>SSE-KMS request charges:</strong> every SSE-KMS
            GET/PUT calls KMS — high-rate buckets use{" "}
            <strong>bucket keys</strong> to cut KMS requests, or accept
            SSE-S3 for sheer rate.
          </>,
          <>
            <strong>Express One Zone trade-off:</strong> single-AZ
            durability and a higher storage price buy the latency — right
            for latency-critical, short-lived, or rebuildable data.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson312() {
  return (
    <>
      <Lead>
        EBS selection is two decisions: the volume type for the I/O pattern,
        then the performance settings within it. Get the pattern right and the
        tuning follows.
      </Lead>

      <H2>The four volume families</H2>
      <KeyTable
        head={["Type", "Best for", "Performance shape", "Watch"]}
        rows={[
          ["gp3 (SSD)", "Boot volumes, general apps, most databases", "Baseline 3,000 IOPS / 125 MB/s, provision up to 16,000 IOPS / 1,000 MB/s independent of size", "Cheaper than gp2 at equal or better performance — the default migration"],
          ["io2 / Block Express (SSD)", "Databases needing >16,000 IOPS, consistent sub-ms latency", "Provision to 256,000 IOPS, high durability (99.999%)", "Priciest per IOPS — provision only what the workload needs"],
          ["st1 (HDD)", "Sequential, throughput-heavy: Kafka, logs, big data", "Throughput scales with volume size (up to 500 MB/s)", "Not for random small I/O — terrible at boot volumes"],
          ["sc1 (HDD)", "Cold, rarely accessed data at lowest cost", "Lowest throughput", "Even stricter throughput limits — archives only"],
        ]}
      />

      <H2>Tuning decisions the exam probes</H2>
      <UL
        items={[
          <>
            <strong>gp2 → gp3:</strong> performance decouples from size —
            provision IOPS/throughput directly and typically save ~20%.
          </>,
          <>
            <strong>RAID 0 across volumes</strong> multiplies performance on
            instance-store-style needs, but a single disk failure kills the
            array — snapshots still back it up.
          </>,
          <>
            <strong>Multi-Attach io2:</strong> one volume, multiple instances
            in the <em>same AZ</em> — for clustered file systems that manage
            concurrency themselves; not shared-nothing general storage.
          </>,
          <>
            <strong>Boot volumes:</strong> gp3 is the standard choice; io2 for
            boot is wasted unless IOPS-bound.
          </>,
        ]}
      />
      <Callout type="exam">
        “Database needs 30,000 IOPS” → <strong>io2</strong> (gp3 caps at
        16,000). “General workload, wants cheaper than gp2 with the same
        performance” → <strong>gp3</strong>. “Massive sequential log
        processing” → <strong>st1</strong>. “Compliance archive on a
        shoestring” → <strong>sc1</strong>.
      </Callout>
      <Callout type="tip">
        EBS volumes are AZ-bound: resilience comes from snapshots (restore
        anywhere), and performance from matching type + provisioning to the
        workload — never from “hoping another AZ helps.”
      </Callout>
    </>
  );
}

export function Lesson313() {
  return (
    <>
      <Lead>
        Instance store is NVMe storage physically attached to the host: the
        highest IOPS and lowest latency available on EC2, no storage charge —
        and completely ephemeral.
      </Lead>

      <H2>The performance case</H2>
      <UL
        items={[
          <>
            Millions of IOPS and GB/s of throughput for{" "}
            <strong>scratch data</strong>: sort/shuffle intermediates, render
            caches, ML training buffers, replication journaling where data is
            replicated elsewhere anyway.
          </>,
          <>
            <strong>RAID 0 across the instance’s disks</strong> multiplies
            throughput further — safe because the durability story is
            replication to peers, not the local disk.
          </>,
          <>
            Zero storage cost — capacity comes with the instance type.
          </>,
        ]}
      />

      <H2>The durability contract — precisely</H2>
      <UL
        items={[
          <>
            Data survives <strong>reboots</strong>.
          </>,
          <>
            Data is lost on <strong>stop/termination</strong>,{" "}
            <strong>host failure</strong>, and most{" "}
            <strong>instance type changes</strong>.
          </>,
          <>
            It cannot detach, resize, or move — capacity is fixed by the
            instance type.
          </>,
        ]}
      />
      <Callout type="exam">
        The pattern is always: <strong>high-performance disposable data + a
        durable copy elsewhere</strong>. “Kafka broker disks, data replicated
        across brokers” → instance store is perfect. “The only copy of the
        database” → instance store is malpractice; that’s EBS io2/gp3.
      </Callout>
      <Callout type="tip">
        Instance-type selection drives the storage: storage-optimized
        families (Im4gn, Is4gen, D3) pair many NVMe disks with compute — pick
        the family for the disk layout when scratch dominates the workload.
      </Callout>
    </>
  );
}

export function Lesson314() {
  return (
    <>
      <Lead>
        EFS performance is two independent dials — <strong>performance
        mode</strong> (metadata latency) and <strong>throughput mode</strong>{" "}
        (bytes per second) — plus Elastic Throughput, which removes planning
        entirely for most workloads.
      </Lead>

      <H2>Performance mode — metadata latency</H2>
      <KeyTable
        head={["Mode", "Behavior", "Choose for"]}
        rows={[
          ["General Purpose (default)", "Lowest per-operation latency", "Latency-sensitive: CMS, home dirs, container storage"],
          ["Max I/O", "Higher latency, massively higher IOPS/throughput via parallelization", "Big data analytics, media processing, highly parallel scale-out"],
        ]}
      />
      <P>
        Max I/O scales metadata operations across distributed servers — the
        win is aggregate throughput and IOPS, at the cost of slightly higher
        per-operation latency. General Purpose keeps latency tight for
        latency-bound small-file work.
      </P>

      <H2>Throughput mode — the bandwidth dial</H2>
      <UL
        items={[
          <>
            <strong>Elastic Throughput:</strong> scales up and down
            automatically with workload — the default recommendation for
            unpredictable or spiky patterns (on-demand workloads, analytics,
            container storage).
          </>,
          <>
            <strong>Provisioned Throughput:</strong> set exact MB/s when the
            requirement is known and constant.
          </>,
          <>
            <strong>Bursting Throughput:</strong> legacy mode — throughput
            scales with file system size and accumulates burst credits.
          </>,
        ]}
      />
      <Callout type="exam">
        Mapping: <strong>“shared media pipeline with wildly spiky
        throughput”</strong> → Elastic Throughput. <strong>“thousands of
        instances reading small files in parallel”</strong> → Max I/O
        performance mode. <strong>“known constant 1 GB/s for a rendering
        farm”</strong> → Provisioned Throughput.
      </Callout>
      <Callout type="warn">
        Throughput mode affects bandwidth; performance mode affects
        metadata/latency. Exam options often swap them — read the requirement
        for “throughput” versus “latency/small files” before answering.
      </Callout>
    </>
  );
}

export function Lesson315() {
  return (
    <>
      <Lead>
        FSx is four purpose-built file systems. Selection is protocol and
        workload first, performance numbers second.
      </Lead>

      <H2>The selection table</H2>
      <KeyTable
        head={["File system", "Protocol / users", "Performance character", "Signature features"]}
        rows={[
          ["FSx for Windows File Server", "SMB — Windows, AD-integrated", "SSD or HDD; up to 100s of MB/s; DFS + shadow copies", "NTFS ACLs, DFS namespaces, Group Policy — native Windows"],
          ["FSx for Lustre", "POSIX — HPC/ML at massive scale", "100s of GB/s, millions of IOPS; S3-linked", "Scratch (ephemeral) vs Persistent (HA, replicated)"],
          ["FSx for NetApp ONTAP", "Multi-protocol: NFS + SMB", "Low-latency SSD NAS", "ONTAP features: SnapMirror, FlexClone, data tiering"],
          ["FSx for OpenZFS", "NFS — Linux workloads", "Sub-ms latency up to 1M IOPS", "ZFS snapshots/clones, migration from ZFS on-prem"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Windows shares with AD:</strong> FSx Windows (Multi-AZ for
            HA, SSD for performance, HDD for cost).
          </>,
          <>
            <strong>HPC/ML POSIX at massive scale, S3-backed:</strong> Lustre
            — Scratch for ephemeral runs, Persistent for long-lived data.
          </>,
          <>
            <strong>NetApp shops migrating:</strong> ONTAP preserves
            management and data mobility.
          </>,
          <>
            <strong>Linux NAS replacement needing speed:</strong> OpenZFS.
          </>,
        ]}
      />
      <Callout type="exam">
        The distinguishing question is protocol + ecosystem:{" "}
        <strong>SMB/AD → Windows</strong>; <strong>massive-parallel POSIX →
        Lustre</strong>; <strong>NetApp tooling → ONTAP</strong>;{" "}
        <strong>generic NFS low latency → OpenZFS or EFS</strong> (EFS when
        elastic scale across AZs matters more than latency).
      </Callout>
      <Callout type="warn">
        Watch HDD vs SSD in options: HDD storage on FSx Windows suits
        cost-driven home directories, but performance questions (“database
        shares”, “media rendering”) demand SSD.
      </Callout>
    </>
  );
}
