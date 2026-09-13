import type { QuizQuestion } from "../questions";

/** Practice Set 5 — questions 283–304 (storage and hybrid deep dive). Original questions. */
export const set5Part2: QuizQuestion[] = [
  {
    id: 283,
    category: "Storage",
    question:
      "A data platform requires that a nightly export lands in S3 exactly once even if the upload job retries after a network failure. Objects are written once and never modified. Which mechanism makes retries idempotent for a known object key and content?",
    options: [
      "S3 Versioning so each retry becomes a new version",
      "Multipart upload with a fixed upload ID per logical file, so retries reuse parts",
      "S3 Batch Operations to deduplicate at day end",
      "Bucket policies rejecting duplicate keys",
    ],
    correctAnswers: [1],
    explanation:
      "Multipart uploads with a deterministic part layout make retried uploads converge on the same complete object — the idempotency primitive for large writes. Versioning intentionally preserves every attempt, batch cleanup is after the fact, and duplicate keys simply overwrite rather than being rejected.",
  },
  {
    id: 284,
    category: "Storage",
    question:
      "An analytics team streams continuous writes into a single S3 prefix and observes throttled PUTs at a few thousand requests per second, well below what the bucket should handle. What resolves this?",
    options: [
      "Raise a support ticket to lift the bucket-level PUT limit",
      "Add high-cardinality elements (timestamps or hashes) to key names so writes spread across additional prefixes",
      "Enable S3 Transfer Acceleration for the writers",
      "Convert the writers to multipart uploads of 1 MB each",
    ],
    correctAnswers: [1],
    explanation:
      "S3 request throughput scales per prefix; introducing key-name randomness or time components spreads writes across many prefixes and multiplies capacity. There is no bucket-wide fixed cap to raise, acceleration targets distant clients rather than rate limits, and smaller multipart parts worsen request counts.",
  },
  {
    id: 285,
    category: "Storage",
    question:
      "A financial archive requires that every object written to a bucket is encrypted with a specific customer managed key, and writes without that key must fail. Which control enforces key choice at write time?",
    options: [
      "S3 default encryption configured with the key",
      "A bucket policy denying s3:PutObject unless the request specifies the required SSE-KMS key",
      "A SCP requiring KMS usage in the account",
      "Object Lock in compliance mode",
    ],
    correctAnswers: [1],
    explanation:
      "A bucket policy with a condition on the SSE-KMS key ID rejects uploads that don't use the mandated key — the enforce-at-write pattern. Default encryption fills in a key when none is supplied but does not reject requests that specify a different one, SCPs lack S3 key conditions at this granularity, and Object Lock governs retention.",
  },
  {
    id: 286,
    category: "Storage",
    question:
      "A backup process copies daily snapshots into S3. Restore SLAs require instant first-byte access for any snapshot, while cost must be minimized for copies rarely touched after 90 days. Which lifecycle strategy fits?",
    options: [
      "Transition to Glacier Flexible Retrieval after 90 days",
      "Transition to Glacier Instant Retrieval after 90 days",
      "Transition to Deep Archive after 30 days",
      "Keep everything in S3 Standard forever",
    ],
    correctAnswers: [1],
    explanation:
      "Glacier Instant Retrieval provides millisecond first-byte access at a much lower storage price than Standard, matching instant-restore SLAs with rare access. Flexible Retrieval can take minutes to hours to restore, Deep Archive is slower still and over-aggressive at 30 days, and Standard forever wastes money.",
  },
  {
    id: 287,
    category: "Storage",
    question:
      "A shared EFS mount is exhaustively read each morning by a reporting fleet (hundreds of instances reading the same files). Reads feel slow through the NFS metadata path. Which EFS setting targets this read pattern?",
    options: [
      "Elastic Throughput mode",
      "Max I/O performance mode",
      "General Purpose mode with more mount targets",
      "Provisioned throughput set to the daily peak",
    ],
    correctAnswers: [1],
    explanation:
      "Max I/O scales metadata operations and parallel access across many compute nodes, the recommended mode for highly parallel read-heavy workloads. Elastic Throughput scales bytes per second, General Purpose favors latency-sensitive small-file workloads, and provisioned throughput addresses bandwidth rather than metadata parallelism.",
  },
  {
    id: 288,
    category: "Storage",
    question:
      "A Windows application cluster stores transaction files that must be accessed by all cluster nodes concurrently in the same AZ with sub-millisecond latency, with no file system semantics required beyond block I/O. Which option fits?",
    options: [
      "An io2 Multi-Attach volume shared across the nodes",
      "Amazon EFS Standard",
      "An S3 bucket as a file share",
      "FSx for Lustre scratch file system",
    ],
    correctAnswers: [0],
    explanation:
      "io2 with Multi-Attach shares one block volume among same-AZ instances for coordinated block access by cluster-aware software. EFS and S3 introduce network file/object semantics with higher latency, and Lustre targets HPC-scale parallel file access rather than simple shared block storage.",
  },
  {
    id: 289,
    category: "Storage",
    question:
      "An on-premises application writes logs to a local directory that must be mirrored continuously to S3 for analytics with minimal latency after each write, over a stable 1 Gbps link. Which tool automates this one-to-one sync?",
    options: [
      "AWS DataSync with a scheduled task",
      "AWS Storage Gateway File Gateway with local caching",
      "AWS Snowball Edge with scheduled jobs",
      "S3 Transfer Acceleration endpoints",
    ],
    correctAnswers: [1],
    explanation:
      "File Gateway presents an NFS/SMB mount locally and uploads written files to S3 continuously behind the scenes, matching the write-through mirror pattern. DataSync excels at scheduled bulk transfers rather than continuous per-write mirroring, Snowball is bulk physical shipping, and Transfer Acceleration accelerates direct client uploads.",
  },
  {
    id: 290,
    category: "Storage",
    question:
      "A migration must move 50 TB of files from an on-premises NFS server to S3 while preserving permissions, timestamps, and verifying integrity, over the company's 2 Gbps link. Which tool is purpose-built?",
    options: [
      "AWS DataSync",
      "AWS Snowcone",
      "rsync on an EC2 instance",
      "S3 Transfer Acceleration",
    ],
    correctAnswers: [0],
    explanation:
      "DataSync migrates NFS/SMB sources to S3 with metadata preservation, integrity verification, and high parallelism over the network. Snow devices suit bandwidth-poor transfers of this size, hand-rolled rsync lacks managed verification and reporting, and acceleration only alters the S3 endpoint path.",
  },
  {
    id: 291,
    category: "Storage",
    question:
      "A compliance hold requires that a specific 10 TB EBS snapshot cannot be deleted by any automation mistake for two years, while remaining restorable instantly if needed. Which feature combination fits?",
    options: [
      "Snapshot archive tier with a lifecycle rule",
      "An EBS snapshot copy locked via Recycle Bin retention rules",
      "Exporting the snapshot to S3 with Object Lock",
      "Fast Snapshot Restore enabled permanently",
    ],
    correctAnswers: [1],
    explanation:
      "ECR/EBS Recycle Bin retention rules protect snapshots (and AMIs) from deletion for a defined period, and the snapshot remains a restorable resource. Archive tier lowers cost but the deletion-protection angle is Recycle Bin, an S3 export changes the restore path, and FSR is a performance feature.",
  },
  {
    id: 292,
    category: "Storage",
    question:
      "A global game ships 500 GB of patch files to players worldwide from S3. Downloads in some regions are slow. Which two changes improve delivery? (Select TWO.)",
    options: [
      "Serve the patches through CloudFront with caching enabled",
      "Enable S3 Transfer Acceleration for downloads",
      "Store patches in S3 One Zone-IA to reduce latency",
      "Enable multipart download through the S3 console",
      "Enable Requester Pays for players",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudFront caches patch content at edge locations close to players, and Transfer Acceleration routes distant fetches through edge-optimized paths — both directly improve global download speed. Storage class changes affect price not latency, console multipart is not a delivery feature, and Requester Pays shifts billing, not speed.",
  },
  {
    id: 293,
    category: "Storage",
    question:
      "An S3 bucket receives Parquet files from many producers. A nightly job must validate, tag, and copy selected objects to a second account — a one-time repetitive bulk operation across millions of objects listed in a manifest. Which tool executes this at scale?",
    options: [
      "S3 Batch Operations driven by a manifest",
      "A Fleet of EC2 workers polling the bucket",
      "A Lambda fan-out triggered per object upload",
      "Athena queries plus manual copy commands",
    ],
    correctAnswers: [0],
    explanation:
      "S3 Batch Operations process lists (manifests) of objects at any scale — copy, tag, restore, invoke Lambda — with retries and reporting. Worker fleets and per-object Lambdas are hand-built equivalents with more failure modes, and Athena only queries metadata/data.",
  },
  {
    id: 294,
    category: "Storage",
    question:
      "Two applications in the same VPC read a shared dataset bucket thousands of times per second. The team wants to eliminate NAT charges and keep traffic private. What should be implemented?",
    options: [
      "A VPC peering connection to the bucket",
      "An S3 gateway VPC endpoint with a bucket policy restricting the VPC endpoint",
      "A NAT gateway with S3 allow rules",
      "An interface endpoint for S3 at maximum throughput",
    ],
    correctAnswers: [1],
    explanation:
      "The S3 gateway endpoint keeps bucket traffic on the AWS network free of NAT processing, and pairing the bucket policy with the endpoint ID locks access to that VPC. Buckets have no VPC to peer with, NAT adds the very charges being eliminated, and gateway (not interface) endpoints are the free, native choice for S3.",
  },
  {
    id: 295,
    category: "Storage",
    question:
      "An ML team needs a POSIX file system for training that caches hot data locally on the GPU instances while the full dataset lives in S3, loading only what jobs touch. Which service fits?",
    options: [
      "Amazon EFS with Elastic Throughput",
      "Amazon FSx for Lustre linked to the S3 bucket",
      "Amazon FSx for NetApp ONTAP",
      "EBS io2 volumes on each training node",
    ],
    correctAnswers: [1],
    explanation:
      "FSx for Lustre integrates with S3 as a backing store, presenting the dataset as a POSIX file system and lazily loading accessed files, tuned for ML/HPC throughput. EFS general-purpose performance is far below Lustre for training, ONTAP targets enterprise NAS migration, and per-node EBS is not shared or S3-linked.",
  },
  {
    id: 296,
    category: "Storage",
    question:
      "A Windows enterprise NAS with SMB shares, NTFS ACLs, shadow copies, and DFS namespaces must be lifted to AWS with full feature parity. Which managed service matches?",
    options: [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon FSx for OpenZFS",
      "AWS Storage Gateway Volume Gateway",
    ],
    correctAnswers: [1],
    explanation:
      "FSx for Windows File Server supports SMB, NTFS ACLs, DFS, and shadow copies with Active Directory integration — full Windows file feature parity. EFS is NFS/Linux, OpenZFS serves NFS, and Volume Gateway is a hybrid block/iSCSI appliance.",
  },
  {
    id: 297,
    category: "Storage",
    question:
      "A VMware cluster is being migrated to AWS with the same VMware tooling and administrative experience, running on dedicated bare-metal EC2 capacity. Which service provides this?",
    options: [
      "AWS Outposts",
      "VMware Cloud on AWS",
      "Amazon EC2 Bare Metal instances with vSphere installed",
      "AWS Local Zones",
    ],
    correctAnswers: [1],
    explanation:
      "VMware Cloud on AWS delivers a managed, dedicated bare-metal environment running the VMware SDDC stack, preserving tooling and operations end to end. Outposts serves broader on-premises AWS services, hand-installing vSphere on bare metal forfeits the managed integration, and Local Zones are edge compute locations.",
  },
  {
    id: 298,
    category: "Storage",
    question:
      "A branch office with poor connectivity needs a local file server whose data lands in S3, but must keep serving files when the link is down for hours. Which deployment behavior satisfies this?",
    options: [
      "File Gateway with local cache, continuing to serve cached and written files during outages and uploading when connectivity returns",
      "Direct S3 access over Transfer Acceleration with retry logic",
      "DataSync agents queueing transfers in local memory",
      "A Snowball Edge in storage-only mode used as the primary file server",
    ],
    correctAnswers: [0],
    explanation:
      "File Gateway caches working sets locally and buffers writes, serving reads/writes during WAN outages and flushing to S3 on reconnection. Direct S3 access fails without the link, DataSync schedules transfers rather than serving files, and Snowball Edge is a transfer/edge device, not a managed branch file server.",
  },
  {
    id: 299,
    category: "Storage",
    question:
      "An application requires its EBS data to survive the loss of an entire Availability Zone with zero manual steps, storing three copies of every volume. Which storage option provides this?",
    options: [
      "EBS gp3 volumes, which replicate across three AZs automatically",
      "S3 Standard, which stores data across multiple AZs",
      "Instance store with scheduled snapshots",
      "EBS io2 volumes with Multi-Attach across AZs",
    ],
    correctAnswers: [1],
    explanation:
      "S3 Standard keeps objects redundantly across multiple Availability Zones by design. EBS volumes replicate within a single AZ (that is their durability model), instance store is ephemeral, and Multi-Attach is same-AZ only.",
  },
  {
    id: 300,
    category: "Storage",
    question:
      "A genomics pipeline reads the same 30 TB reference dataset from S3 thousands of times per day across a fleet. First-byte latency must be milliseconds and retrieval fees must be zero. Which storage class is the cost-correct choice?",
    options: [
      "S3 Standard-IA",
      "S3 Glacier Instant Retrieval",
      "S3 Standard",
      "S3 One Zone-IA",
    ],
    correctAnswers: [2],
    explanation:
      "At thousands of daily reads, retrieval-fee classes (IA variants, Glacier IR) cost more than Standard despite lower storage prices — Standard is the cost-correct class for frequently accessed data. IA/One Zone-IA charge per GB retrieved, and Glacier IR is for rarely accessed archives.",
  },
  {
    id: 301,
    category: "Storage",
    question:
      "A lifecycle policy transitions objects to S3 One Zone-IA after 30 days. An architect warns about a specific durability trade-off. Which one?",
    options: [
      "One Zone-IA stores data in a single Availability Zone, so data is lost if that zone's storage fails",
      "One Zone-IA objects cannot be made public",
      "One Zone-IA charges retrieval fees on write",
      "One Zone-IA disables TLS enforcement",
    ],
    correctAnswers: [0],
    explanation:
      "One Zone-IA replicates within a single AZ only, trading multi-AZ resilience for lower cost — the trade-off to surface when data can be recreated. Its retrieval fee applies on read, public access and TLS behave like other classes.",
  },
  {
    id: 302,
    category: "Storage",
    question:
      "A nightly ETL copies 5 TB between two S3 buckets in different Regions. Which configuration completes transfers fastest over the AWS backbone with managed retries?",
    options: [
      "S3 Batch Operations Copy with multi-Region access points",
      "An EC2 instance running aws s3 sync in a loop",
      "S3 Cross-Region Replication for ongoing copies and Batch Operations for the initial backlog",
      "Athena CTAS into the destination bucket",
    ],
    correctAnswers: [2],
    explanation:
      "CRR handles continuous replication over AWS-managed transfers, and Batch Operations can cover initial bulk copies; together they move data without managing transfer infrastructure. Batch copy alone handles manifests but CRR is the continuous backbone, ad-hoc sync scripts are unmanaged, and Athena is not a transfer engine.",
  },
  {
    id: 303,
    category: "Storage",
    question:
      "Auditors ask for the total storage footprint, object counts, and encryption status across thousands of buckets in the organization, with dashboards over time. Which tool provides this visibility?",
    options: [
      "S3 Storage Lens",
      "S3 Inventory reports per bucket",
      "AWS Config aggregator",
      "Cost and Usage Reports",
    ],
    correctAnswers: [0],
    explanation:
      "Storage Lens provides organization-wide S3 storage analytics — usage, activity, and protection metrics — with dashboards and trends. Inventory lists per-bucket objects in flat form, Config tracks configuration compliance, and CUR shows billing not object-level metrics.",
  },
  {
    id: 304,
    category: "Storage",
    question:
      "An EFS file system must be accessible from on-premises servers over a private link with the same mount path, as part of a hybrid migration. Which access method fits?",
    options: [
      "Mount via the public EFS endpoint with security groups",
      "Mount via an EFS access point through a Direct Connect or VPN with the on-premises client using the mount target IP",
      "Expose the file system through an ALB on port 2049",
      "Replicate files nightly with DataSync instead of mounting",
    ],
    correctAnswers: [1],
    explanation:
      "EFS mount targets are reachable privately over DX/VPN, and access points provide per-application mount paths — enabling hybrid mounts over private connectivity. The public endpoint bypasses the private-link requirement, ALBs do not proxy NFS, and nightly sync is not live mounting.",
  },
];
