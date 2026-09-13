import { Callout, Code, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 3.2 lessons — elastic compute performance. Original content. */

export function Lesson321() {
  return (
    <>
      <Lead>
        EC2 instance selection is a workload-mapping exercise. The families
        are named for what they optimize — and the exam gives you workload
        descriptions that map to exactly one.
      </Lead>

      <H2>The family map</H2>
      <KeyTable
        head={["Family", "Optimizes", "Workload tells"]}
        rows={[
          ["General purpose (M, T)", "Balance of CPU/RAM/network", "Web servers, app servers, small-medium databases; T-family for bursty, steady-low baselines"],
          ["Compute optimized (C)", "Highest vCPU per dollar", "Batch, rendering, HPC front-ends, game servers, CPU-bound ML inference"],
          ["Memory optimized (R, X, u-)", "RAM per vCPU (up to 24 TiB)", "In-memory caches, SAP HANA, real-time analytics, large relational DBs"],
          ["Storage optimized (I, D, Im4gn)", "Local NVMe throughput/IOPS", "NoSQL, data warehouse nodes, Elasticsearch, Kafka brokers"],
          ["Accelerated (P, G, Inf, Trn)", "GPUs / Inferentia / Trainium", "ML training (P/Trn), ML inference (Inf), graphics (G)"],
        ]}
      />

      <H2>Graviton — the price-performance default</H2>
      <UL
        items={[
          <>
            <strong>Graviton (ARM)</strong> delivers up to ~40% better
            price-performance for common workloads — web apps, containers,
            databases, caching.
          </>,
          <>
            Requirement: the software stack supports ARM64 (most modern
            runtimes, containers, and managed services do).
          </>,
          <>
            The exam frames it as “improve price-performance for a fleet
            whose dependencies are ARM-compatible” — Graviton, with testing
            as the gate.
          </>,
        ]}
      />
      <Callout type="exam">
        The mapping traps: <strong>in-memory analytics → R/X (memory)</strong>,
        not C. <strong>Elasticsearch/Kafka → I (NVMe local)</strong>, not EBS
        talk. <strong>ML training → P/Trn</strong>, inference → Inf/G.
        Burstable T-instances are for spiky baselines, not sustained load.
      </Callout>
      <Callout type="tip">
        Size with data, not vibes: Compute Optimizer recommends types from
        CloudWatch utilization history, including Graviton candidates.
      </Callout>
    </>
  );
}

export function Lesson322() {
  return (
    <>
      <Lead>
        Placement groups control which underlying hardware your instances
        share. Three strategies, three different failure/latency trade-offs —
        and the exam describes the workload and expects the right group.
      </Lead>

      <H2>The three strategies</H2>
      <KeyTable
        head={["Strategy", "Hardware behavior", "Choose for"]}
        rows={[
          ["Cluster", "Packed close together in one AZ — lowest latency, up to 100 Gbps (with EFA)", "Tightly coupled HPC, MPI, low-latency trading"],
          ["Spread", "Every instance on distinct underlying hardware — max 7 per AZ per group", "Small critical fleets that must not share failure domains"],
          ["Partition", "Instances grouped into partitions on distinct racks; partitions visible to the app", "Large distributed systems (Hadoop/Cassandra/Cassandra-like) aware of rack topology"],
        ]}
      />

      <H2>The constraints that answer questions</H2>
      <UL
        items={[
          <>
            <strong>Cluster groups cannot span AZs</strong> — an “HPC across
            AZs with lowest latency” requirement is impossible with one
            cluster group.
          </>,
          <>
            <strong>Launch templates/ASG placement:</strong> spread and
            partition work with ASGs (cluster typically used via launch-time
            placement on standalone fleets).
          </>,
          <>
            <strong>Huge spread needs:</strong> more than 7 per AZ →
            partition groups give multiple isolated partitions per AZ.
          </>,
        ]}
      />
      <Callout type="exam">
        Scenario keywords: <strong>“lowest inter-node latency”</strong> →
        cluster. <strong>“each instance on separate hardware”</strong> →
        spread. <strong>“topology/rack awareness for a big data cluster”</strong>{" "}
        → partition. The distractors swap these three constantly.
      </Callout>
    </>
  );
}

export function Lesson323() {
  return (
    <>
      <Lead>
        Capacity purchasing is a matrix: commitment level × flexibility ×
        guarantee. The exam gives three facts — duration of need, tolerance
        for interruption, and whether capacity must be guaranteed — and one
        option satisfies all three.
      </Lead>

      <H2>The options mapped</H2>
      <KeyTable
        head={["Option", "Commitment", "Guarantees capacity?", "Discount"]}
        rows={[
          ["On-Demand", "None", "Yes (subject to quota)", "None — baseline"],
          ["Savings Plans (Compute / EC2 Instance)", "1 or 3 years, $/hour committed", "No — discount on usage", "Up to ~72% / ~64%"],
          ["Standard / Convertible RIs", "1 or 3 years, attribute-based", "Capacity reservation (zonal RIs)", "Up to ~72%"],
          ["Spot", "None — reclaimable with 2-min notice", "No", "Up to ~90%"],
          ["On-Demand Capacity Reservations", "As long as you hold them", "Yes — specific AZ", "None (regional RIs can discount it)"],
          ["Capacity Blocks for ML", "Reserved future GPU window", "Yes — for the block duration", "Fixed block price"],
        ]}
      />

      <H2>The decision walk</H2>
      <UL
        items={[
          <>
            <strong>Steady 24/7 baseline for years</strong> → Reserved
            Instances or Savings Plans (Savings Plans if flexibility across
            instance families or services matters).
          </>,
          <>
            <strong>Interruptible, flexible work</strong> → Spot (with
            checkpointing and multiple pools).
          </>,
          <>
            <strong>Must-not-fail capacity at a known time in a known AZ</strong>{" "}
            → On-Demand Capacity Reservation (or Capacity Blocks for ML
            windows).
          </>,
          <>
            <strong>Spiky-but-predictable daily peaks</strong> → Scheduled
            scaling with On-Demand, or Scale-in at night — commitment only if
            the peak is truly steady.
          </>,
        ]}
      />
      <Callout type="exam">
        The 3-year steady-state trap: if usage is steady <em>and</em> the
        instance family is fixed → Standard RI. If the family may change →
        Convertible RI. If compute type itself may change (EC2 → Lambda) →
        Compute Savings Plan. The exam tests exactly this branching.
      </Callout>
    </>
  );
}

export function Lesson324() {
  return (
    <>
      <Lead>
        Elastic Fabric Adapter (EFA) is a special network interface that
        bypasses the OS for HPC and ML communication — combining EC2 scaling
        with supercomputer-class interconnect.
      </Lead>

      <H2>What EFA changes</H2>
      <UL
        items={[
          <>
            Installs a kernel-bypass driver: applications using{" "}
            <strong>Libfabric/MPI</strong> talk to the NIC directly, cutting
            latency and raising per-node bandwidth for tightly coupled
            traffic.
          </>,
          <>
            Works <strong>within a cluster placement group</strong> — the
            pairing is the HPC recipe (same AZ, packed placement, EFA NICs).
          </>,
          <>
            Also used by distributed ML training frameworks that need
            high-bandwidth, low-latency node-to-node collectives.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Networking answer"]}
        rows={[
          ["MPI-based tightly coupled HPC", "EFA + cluster placement group"],
          ["Loosely coupled embarrassingly parallel batch", "Standard networking, Spot, batch queues"],
          ["Shared low-latency storage alongside compute", "Instance store or FSx for Lustre over EFA-class network"],
        ]}
      />
      <Callout type="exam">
        The word <strong>“MPI”</strong> or <strong>“OS-bypass”</strong> in a
        question is an EFA flag. If latency is the requirement but the app
        uses plain TCP, cluster placement plus standard enhanced networking
        (ENA) suffices — EFA needs libfabric-aware software.
      </Callout>
    </>
  );
}

export function Lesson325() {
  return (
    <>
      <Lead>
        Lambda performance is a small set of levers: concurrency controls,
        initialization strategy, package composition, and knowing the hard
        limits. Each exam question maps to one lever.
      </Lead>

      <H2>The levers</H2>
      <KeyTable
        head={["Lever", "What it controls", "When the exam uses it"]}
        rows={[
          ["Memory setting (128 MB–10 GB)", "Scales CPU linearly with memory", "“function too slow” → more memory often faster AND cheaper"],
          ["Provisioned concurrency", "Pre-initialized environments, always warm", "“latency-sensitive API with cold-start spikes”"],
          ["SnapStart", "Snapshot-restore initialization for Java (and newer runtimes)", "“Java cold starts” — up to 10x faster startup at no idle cost"],
          ["Reserved concurrency", "Guaranteed capacity + per-function cap", "“protect a critical function from noisy neighbors”"],
          ["Layers", "Shared dependencies across functions", "“common code reused by many functions”"],
          ["EFS mount", "Large datasets/Shared assets with POSIX access", "“ML models or reference data larger than the package limit”"],
        ]}
      />

      <H2>The limits that answer “can Lambda do this?”</H2>
      <UL
        items={[
          <>
            <strong>Execution timeout 15 minutes</strong> — longer jobs belong
            on Fargate/Batch.
          </>,
          <>
            <strong>Memory up to 10 GB</strong>; deployment package{" "}
            50 MB zipped / 250 MB unzipped (container images up to 10 GB).
          </>,
          <>
            <strong>/tmp storage up to 10 GB</strong> configurable —
            ephemeral across invocations unless persisted.
          </>,
          <>
            Concurrency: Regional soft cap (requestable), burst limits per
            function, and account-level scaling behavior.
          </>,
        ]}
      />
      <Callout type="exam">
        “Image processing function occasionally times out at 1 GB” → raise
        memory (more CPU, shorter runtime — often cheaper). “Video rendering
        takes 40 minutes” → Step Functions + Fargate, never a longer Lambda
        timeout. “Sudden 10x API traffic causes cold starts” → provisioned
        concurrency on the alias.
      </Callout>
      <Callout type="warn">
        VPC-attached Lambdas need ENI capacity and reach: NAT (or VPC
        endpoints) for internet/AWS service calls — a missing NAT in private
        subnets is a classic “Lambda times out” scenario.
      </Callout>
    </>
  );
}

export function Lesson326() {
  return (
    <>
      <Lead>
        Container compute is three decisions: orchestrator (ECS vs EKS),
        launch type (Fargate vs EC2), and node management (managed groups,
        Karpenter, capacity providers).
      </Lead>

      <H2>ECS decisions</H2>
      <UL
        items={[
          <>
            <strong>Fargate launch type:</strong> per-task pricing, no hosts
            to patch; choose for spiky, small-to-medium tasks.
          </>,
          <>
            <strong>EC2 launch type:</strong> host control (GPUs, licenses,
            dense binpacking) with capacity providers managing the fleet.
          </>,
          <>
            <strong>Capacity providers:</strong> mix Fargate, Fargate Spot,
            and EC2 Auto Scaling groups with weights — one cluster, multiple
            cost tiers.
          </>,
          <>
            <strong>Task placement:</strong> strategies (spread across AZs,
            binpack for density) and constraints (GPU hosts only) on EC2
            launch type.
          </>,
        ]}
      />

      <H2>EKS decisions</H2>
      <UL
        items={[
          <>
            <strong>Managed node groups:</strong> AWS provisions and patches
            EC2 workers; you keep full Kubernetes node control.
          </>,
          <>
            <strong>Fargate profiles:</strong> serverless pods selected by
            namespace/labels — isolation for untrusted or bursty workloads.
          </>,
          <>
            <strong>Karpenter:</strong> open-source autoscaler that provisions
            right-sized nodes in seconds directly from pending pods — the
            fast-scaling answer.
          </>,
          <>
            <strong>IRSA:</strong> IAM Roles for Service Accounts give each
            workload its own least-privilege IAM role.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Kubernetes APIs and ecosystem must be preserved", "EKS (vs ECS’s AWS-native model)"],
          ["Simplest managed containers, no cluster to operate", "ECS on Fargate"],
          ["Pods need direct host access / specific kernel", "EKS or ECS on EC2 — not Fargate"],
          ["Hundreds of pods, aggressive binpacking, custom instances", "EKS + Karpenter"],
        ]}
      />
      <Callout type="exam">
        The orchestrator tiebreaker is <strong>team skill and API preference</strong>:
        Kubernetes tooling → EKS; AWS-native simplicity → ECS. Everything
        else (launch type, capacity provider, autoscaler) is a follow-on
        decision inside that choice.
      </Callout>
    </>
  );
}

export function Lesson327() {
  return (
    <>
      <Lead>
        Edge compute brings AWS capacity close to users when a Region’s
        distance adds too much latency. Three flavors answer three different
        distances.
      </Lead>

      <H2>The three flavors</H2>
      <KeyTable
        head={["Flavor", "Where it runs", "Choose when"]}
        rows={[
          ["Local Zones", "AWS-managed sites in metro areas, extension of a Region (same APIs)", "Single-digit ms to metro users: media rendering, game matchmaking, simulation"],
          ["Wavelength Zones", "Inside telecom 5G networks, attached to carrier fiber", "Ultra-low latency to 5G devices: autonomous vehicles, AR/VR, industrial automation"],
          ["Outposts", "Your own data center / on-prem facility, AWS hardware operated for you", "Workloads that must stay on-prem (low latency to local systems, data residency, local processing)"],
        ]}
      />
      <UL
        items={[
          <>
            All three run <strong>the same EC2/ECS/EKS/EBS/RDS surfaces</strong>{" "}
            — apps deploy unchanged; the difference is location and
            connectivity.
          </>,
          <>
            <strong>Local Zones</strong> connect back to the parent Region for
            heavier services; <strong>Outposts</strong> connect via your own
            network; <strong>Wavelength</strong> traffic never leaves the
            carrier network (the point).
          </>,
        ]}
      />
      <Callout type="exam">
        Selection by the words: <strong>“5G / carrier / MEC”</strong> →
        Wavelength. <strong>“metro / city / single-digit ms to end users in a
        city”</strong> → Local Zones. <strong>“on-premises data center, AWS
        APIs locally”</strong> → Outposts. <strong>“satellite/very remote,
        disconnected”</strong> → Snowball Edge.
      </Callout>
      <Callout type="warn">
        Latency isn’t the only edge question — some scenarios are about{" "}
        <strong>data locality</strong> (process locally, ship results) or{" "}
        <strong>residency</strong>; those can also point at Outposts/Snow
        families rather than edge latency zones.
      </Callout>
    </>
  );
}
