import { Callout, Code, H2, KeyTable, Lead, UL } from "@/components/lesson/blocks";

/** Section 3.5 lessons — data ingestion and transformation. Original content. */

export function Lesson351() {
  return (
    <>
      <Lead>
        The Kinesis family splits real-time streaming into three jobs:{" "}
        <strong>Data Streams</strong> for custom real-time consumption,{" "}
        <strong>Data Firehose</strong> for fully managed delivery, and{" "}
        <strong>Data Analytics</strong> for in-stream processing — plus Video
        Streams for device media.
      </Lead>

      <H2>Data Streams — the custom consumer stream</H2>
      <UL
        items={[
          <>
            <strong>Shards</strong> define capacity: 1 MB/s in, 2 MB/s out per
            shard; <strong>on-demand</strong> mode scales automatically
            instead.
          </>,
          <>
            <strong>Ordering per shard</strong> (partition key),{" "}
            <strong>replay window</strong> (24 h default, up to 365 days), and
            enhanced fan-out (2 MB/s per consumer) for multiple independent
            readers.
          </>,
          <>
            You build/consume with KCL or SDK — full control, custom
            processing logic.
          </>,
        ]}
      />

      <H2>Data Firehose — the managed delivery stream</H2>
      <UL
        items={[
          <>
            Fully managed: no consumers, no shards — data lands in{" "}
            <strong>S3, Redshift, OpenSearch, or HTTP endpoints</strong>,
            batched by size/time buffers.
          </>,
          <>
            <strong>Lambda transformation</strong> per record,{" "}
            <strong>dynamic partitioning</strong> by keys, format conversion
            (Parquet/ORC) en route.
          </>,
          <>
            The “collect-transform-load with zero streaming code” answer.
          </>,
        ]}
      />

      <H2>Buffering, retention, replay — the numbers that decide</H2>
      <UL
        items={[
          <>
            <strong>Firehose buffer hints</strong> control delivery: buffer
            size (1–128 MiB for S3, up to 100 MiB for Redshift) and buffer
            interval (60–900 seconds). Whichever threshold hits first
            triggers delivery — tune larger buffers for cost, smaller for
            latency.
          </>,
          <>
            <strong>Data Streams retention</strong> defaults to 24 hours and
            extends to 7 days (farther with long-term retention) — the replay
            window for reprocessing or backfill.
          </>,
          <>
            <strong>Enhanced fan-out</strong> gives each registered consumer
            2 MiB/s per shard with ~70 ms latency; without it, all consumers
            share the shard’s 2 MiB/s read throughput.
          </>,
        ]}
      />

      <H2>Consuming with the Kinesis Client Library</H2>
      <UL
        items={[
          <>
            The <strong>KCL</strong> handles shard-to-worker assignment,
            load balancing across fleet members, and{" "}
            <strong>checkpointing</strong> progress to DynamoDB.
          </>,
          <>
            <strong>Checkpoints</strong> mark the last processed sequence
            number — restarts resume from the checkpoint, not from the
            stream’s start.
          </>,
          <>
            Resharding (split/merge) redistributes keys; consumers using the
            KCL pick up the new shard topology automatically.
          </>,
        ]}
      />

      <H2>Data Analytics and Video Streams</H2>
      <UL
        items={[
          <>
            <strong>Managed Apache Flink</strong> (formerly Kinesis Data
            Analytics): windowed aggregation, anomaly detection, joins over
            streams in real time.
          </>,
          <>
            <strong>Kinesis Video Streams</strong>: ingest, store, and
            playback device video/audio for media pipelines and ML vision.
          </>,
          <>
            Flink operates on <strong>event time vs processing time</strong>{" "}
            semantics with <strong>watermarks</strong> tracking lateness —
            tumbling, sliding, and session windows define “what counts as one
            computation.”
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Multiple consumers, custom real-time processing, replay", "Data Streams"],
          ["Near-real-time delivery to S3/Redshift/OpenSearch, managed", "Data Firehose"],
          ["Real-time windowed analytics over the stream", "Managed Apache Flink"],
          ["Camera/audio device ingestion", "Video Streams"],
        ]}
      />
      <Callout type="exam">
        The Firehose vs Streams fork: <strong>Firehose = delivery
        (no consumers, S3/Redshift/OpenSearch destinations)</strong>;{" "}
        <strong>Streams = custom real-time processing with replay</strong>.
        “Analyze in real time” adds Flink; “just land it in S3” is Firehose.
      </Callout>
      <Callout type="warn">
        Shard-level ordering is per <strong>partition key</strong> — hot keys
        throttle one shard; reshard or use a better key. Retention: 24 h
        default, extendable to 7/365 days for replay needs.
      </Callout>
    </>
  );
}

export function Lesson352() {
  return (
    <>
      <Lead>
        Amazon MSK is managed Apache Kafka — chosen when Kafka’s ecosystem,
        protocols, and existing tooling must keep working. Provisioned or
        serverless brokers, with Connect for integrations and Replicator for
        multi-cluster DR.
      </Lead>

      <H2>The MSK surfaces</H2>
      <UL
        items={[
          <>
            <strong>Provisioned:</strong> broker size/count and storage you
            pick; Apache Kafka-compatible (clients, Connect, Streams,
            Schema Registry).
          </>,
          <>
            <strong>MSK Serverless:</strong> capacity scales automatically
            with throughput — no broker sizing; ideal for variable loads.
          </>,
          <>
            <strong>MSK Connect:</strong> managed Kafka Connect workers —
            source/sink connectors to S3, databases, external systems
            without hosting Connect clusters.
          </>,
          <>
            <strong>MSK Replicator:</strong> replicates topics and data
            between clusters/Regions — DR and aggregation.
          </>,
        ]}
      />

      <H2>Kafka vs Kinesis — the recurring fork</H2>
      <KeyTable
        head={["Signal", "Answer"]}
        rows={[
          ["Existing Kafka producers/consumers, Kafka APIs and tooling required", "MSK"],
          ["New ingestion pipeline, AWS-native, minimal ops", "Kinesis Data Streams"],
          ["Managed delivery to S3/Redshift without consumers", "Firehose"],
        ]}
      />
      <UL
        items={[
          <>
            MSK operations: multi-AZ brokers, storage auto-expansion,
            patching handled — but topic/partition design stays with you.
          </>,
          <>
            Security: TLS everywhere, SASL/IAM auth, VPC-based deployment.
          </>,
        ]}
      />

      <H2>MSK auth, storage, and mirroring — the tested details</H2>
      <UL
        items={[
          <>
            <strong>Authentication:</strong> SASL/SCRAM (stored in Secrets
            Manager), mutual TLS, and <strong>IAM access control</strong> —
            IAM lets MSK API actions and Kafka operations share one identity
            system.
          </>,
          <>
            <strong>Storage:</strong> EBS-backed brokers with provisioned
            volume sizes; <strong>tiered storage</strong> offloads older
            segments to S3, extending retention without paying for EBS.
          </>,
          <>
            <strong>Mirroring with MirrorMaker 2:</strong> replicate topics
            between clusters (active-passive DR, aggregation, migration)
            with offset translation and topic renaming controls.
          </>,
        ]}
      />
      <Callout type="exam">
        The word <strong>“Kafka”</strong> in the requirement (existing
        workloads, Kafka Connect, exactly the Kafka ecosystem) → MSK. A new
        AWS-native pipeline without Kafka constraints → Kinesis. And{" "}
        <strong>“managed Kafka Connect”</strong> by name → MSK Connect.
      </Callout>
      <Callout type="tip">
        When comparing MSK Serverless vs provisioned in options: serverless
        removes broker sizing for variable load; provisioned wins for
        steady, predictable high throughput with full control.
      </Callout>
    </>
  );
}

export function Lesson353() {
  return (
    <>
      <Lead>
        Batch transformation has two AWS-native engines:{" "}
        <strong>AWS Glue</strong> (serverless Spark ETL with a data catalog)
        and <strong>Amazon EMR</strong> (managed Hadoop/Spark clusters with
        full framework control). The exam splits them by operational
        appetite.
      </Lead>

      <H2>AWS Glue</H2>
      <UL
        items={[
          <>
            <strong>Serverless ETL:</strong> Spark jobs billed per
            DPU-second; auto-generated scripts; interactive sessions.
          </>,
          <>
            <strong>Job types that get tested:</strong> Spark ETL jobs,
            Python shell jobs (lightweight, no Spark cluster, single DPU),
            and streaming ETL for continuous micro-batch ingestion.
          </>,
          <>
            <strong>Data Catalog:</strong> central metadata store crawlers
            populate — Athena, Redshift Spectrum, EMR all query through it.
          </>,
          <>
            <strong>Job bookmarks:</strong> track processed data so reruns
            process only new data.
          </>,
          <>
            <strong>Glue Studio:</strong> visual drag-and-drop ETL authoring;
            DataBrew for no-code data prep.
          </>,
        ]}
      />
      <Callout type="tip">
        The Glue Catalog is the metadata backbone of the S3 lake: Athena and
        Redshift Spectrum read tables from it — “make S3 data queryable”
        starts with Glue crawlers + catalog.
      </Callout>

      <H2>Amazon EMR</H2>
      <UL
        items={[
          <>
            Managed <strong>Hadoop/Spark/Hive/Presto/Flink</strong> clusters —
            full framework control, custom versions, EC2 or EKS compute.
          </>,
          <>
            <strong>Node types:</strong> primary (HDFS NameNode, runs
            24/7), core (HDFS DataNodes, also runs 24/7 — don’t Spot these),
            <strong>task nodes</strong> (compute-only, safe for Spot, come
            and go). Spot belongs on task nodes; core nodes need stability.
          </>,
          <>
            <strong>Cost levers:</strong> Spot for task nodes, managed
            scaling, auto-termination, reserved for core.
          </>,
          <>
            <strong>EMR Serverless:</strong> run Spark/Hive jobs without
            managing clusters — submit, scale, pay per use.
          </>,
          <>
            <strong>EMR on EKS:</strong> Spark jobs on your Kubernetes
            clusters with namespace isolation.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Serverless ETL from S3 to S3, catalog-driven", "Glue (Studio + Catalog + jobs)"],
          ["Custom Spark/Hadoop versions, fine-grained cluster control", "EMR"],
          ["Occasional Spark jobs without idle clusters", "EMR Serverless"],
          ["Metadata shared by Athena/Redshift/EMR", "Glue Data Catalog"],
        ]}
      />
      <Callout type="exam">
        The fork: <strong>“run custom Hadoop/Spark with cluster control”</strong>{" "}
        → EMR. <strong>“serverless ETL with a catalog, pay per
        DPU-second”</strong> → Glue. When both appear, the differentiator is
        operational appetite and framework flexibility.
      </Callout>
      <Callout type="warn">
        Glue vs Athena: Glue is the <em>ETL engine + catalog</em>; Athena is{" "}
        <em>query</em>. “Transform data” → Glue; “query data” → Athena; both
        share the catalog.
      </Callout>
    </>
  );
}

export function Lesson354() {
  return (
    <>
      <Lead>
        IoT ingestion chains four services: <strong>IoT Core</strong> connects
        devices and routes messages, <strong>Rules</strong> forward to AWS
        services, <strong>Device Shadows</strong> hold device state, and{" "}
        <strong>Greengrass</strong> runs AWS logic at the edge.
      </Lead>

      <H2>IoT Core — the device front door</H2>
      <UL
        items={[
          <>
            Managed <strong>MQTT broker</strong> for millions of devices,{" "}
            <strong>X.509 certificates</strong> for mutual auth, per-device{" "}
            <strong>policies</strong> (publish/subscribe to specific topics).
          </>,
          <>
            <strong>Rules engine:</strong> SQL-like statements route messages
            to Lambda, DynamoDB, S3, Firehose, SNS, IoT Analytics —
            transformation and filtering in the rule.
          </>,
          <>
            <strong>Device Shadows:</strong> JSON state documents (reported vs
            desired) so apps and devices sync even when offline.
          </>,
          <>
            <strong>IoT Jobs:</strong> push OTA firmware or configuration
            updates to device fleets with tracking.
          </>,
        ]}
      />

      <H2>Greengrass — AWS logic at the edge</H2>
      <UL
        items={[
          <>
            Runs <strong>Lambda functions, containers, and ML models
            locally</strong> on devices/gateways — even when disconnected from
            the cloud.
          </>,
          <>
            Local pub/sub between components, local device control, and{" "}
            <strong>stream manager</strong> to export queued data to the
            cloud when connectivity returns.
          </>,
          <>
            The exam frames it as <strong>“process/react locally with
            intermittent connectivity”</strong>.
          </>,
        ]}
      />

      <H2>IoT Analytics and the ingestion chain</H2>
      <UL
        items={[
          <>
            <strong>IoT Analytics</strong>: purpose-built time-series
            collection, enrichment, and storage for device telemetry.
          </>,
          <>
            <strong>Sitewise</strong> for industrial equipment;{" "}
            <strong>Events</strong> for device-triggered alerts.
          </>,
          <>
            Typical chain: devices → IoT Core → Rules → IoT Analytics /
            DynamoDB / Firehose.
          </>,
        ]}
      />

      <H2>Fleet Indexing, Defender, and Greengrass versions</H2>
      <UL
        items={[
          <>
            <strong>Fleet Indexing</strong> aggregates device registry,
            shadow, and connectivity data into a queryable index — “find all
            devices with firmware older than X” without scanning shadows one
            by one.
          </>,
          <>
            <strong>IoT Device Defender:</strong> audits fleet security
            posture (certificates, policies, open ports) and monitors
            behavior anomalies from device-side metrics.
          </>,
          <>
            <strong>Greengrass v1 vs v2:</strong> v1 deploys Lambda
            functions to groups of devices; v2 adds a component model with
            versioned deployments, local CLI tooling, and Docker/container
            support. New designs target v2.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Millions of devices, MQTT, per-device certs and policies", "IoT Core"],
          ["Route device messages to services by condition", "IoT Rules engine"],
          ["React locally with no cloud connectivity", "Greengrass"],
          ["Latest device state readable while offline", "Device Shadows"],
        ]}
      />
      <Callout type="exam">
        The fork between Greengrass and IoT Core:{" "}
        <strong>“process locally / act without connectivity”</strong> →
        Greengrass; <strong>“connect and route to AWS services”</strong> →
        IoT Core. And Shadows answer <strong>“sync state for offline
        devices.”</strong>
      </Callout>
    </>
  );
}

export function Lesson355() {
  return (
    <>
      <Lead>
        Data movement is four tools by shape: <strong>DataSync</strong> for
        online bulk sync, <strong>Transfer Family</strong> for managed
        protocol endpoints (SFTP/FTPS), the <strong>Snow family</strong> for
        offline petabyte transport, and <strong>DMS</strong> for databases.
      </Lead>

      <H2>DataSync — online bulk sync</H2>
      <UL
        items={[
          <>
            Agent-based replication between <strong>NFS/SMB on-prem, EFS,
            FSx, S3</strong> — scheduled, bandwidth-throttled, integrity-
            verified, encryption in transit.
          </>,
          <>
            Preserves metadata and permissions; incremental transfers copy
            only changes.
          </>,
          <>
            The “migrate or sync file data at scale over the network”
            answer.
          </>,
        ]}
      />

      <H2>Transfer Family — managed protocol endpoints</H2>
      <UL
        items={[
          <>
            Fully managed <strong>SFTP, FTPS, FTP servers</strong> backed by
            S3 or EFS — partners upload with existing tools, no
            infrastructure.
          </>,
          <>
            Auth via IAM, AD, Lambda-backed custom IdP; VPC endpoints for
            private access; AS2 for B2B.
          </>,
          <>
            The “partners need SFTP into S3” answer.
          </>,
        ]}
      />

      <H2>Snow Family — offline at scale</H2>
      <UL
        items={[
          <>
            <strong>Snowcone</strong> (8 TB, portable, edge compute),{" "}
            <strong>Snowball Edge</strong> (up to 80 TB + compute),{" "}
            <strong>Snowmobile</strong> (PB-exabyte container).
          </>,
          <>
            Chosen when network transfer is too slow or too costly — days of
            shipping beat months of uploading.
          </>,
          <>
            Edge compute variants run Lambda/EC2 locally for preprocessing.
          </>,
        ]}
      />

      <H2>DMS — databases</H2>
      <UL
        items={[
          <>
            Homogeneous and heterogeneous <strong>database migration with
            continuous replication</strong> — minimal downtime cutovers,
            schema conversion via SCT for engine changes.
          </>,
          <>
            Ongoing CDC keeps source and target in sync until cutover.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Sync 50 TB of files nightly over a 10 Gbps link", "DataSync"],
          ["Partners upload via SFTP to S3", "Transfer Family"],
          ["100 TB offline, poor connectivity", "Snowball Edge"],
          ["Oracle → Aurora with minimal downtime", "DMS (+ SCT for schema)"],
        ]}
      />

      <H2>CLI vs SDK transfers and the bandwidth heuristic</H2>
      <UL
        items={[
          <>
            <strong>AWS CLI</strong> <Code>aws s3 sync/cp</Code> handles
            multipart, retries, and parallel transfers automatically — the
            default human and script answer for interactive or scheduled
            moves.
          </>,
          <>
            <strong>Application SDK transfers</strong> (TransferManager /
            high-level APIs) add the same parallelism inside application
            code for generated content, uploads from users, and custom
            retry/progress handling.
          </>,
          <>
            <strong>Bandwidth heuristic:</strong> estimate total bytes ÷
            available throughput — if the transfer takes days, optimize
            (multipart, parallelism, Acceleration); if it takes weeks,
            ship a Snow device instead.
          </>,
          <>
            <strong>S3 Transfer Acceleration</strong> helps only when the
            bottleneck is long-haul internet distance, not local bandwidth
            or disk — test which end constrains the transfer first.
          </>,
        ]}
      />
      <Callout type="exam">
        The bandwidth heuristic: if shipping beats uploading by weeks,{" "}
        <strong>Snow family</strong>. If the network can carry it,{" "}
        <strong>DataSync</strong> (files) or <strong>DMS</strong>
        (databases). <strong>Transfer Family</strong> is not migration —
        it’s an ongoing protocol endpoint.
      </Callout>
    </>
  );
}
