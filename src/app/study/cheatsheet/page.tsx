import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Code, KeyTable, P, UL } from "@/components/lesson/blocks";

export const metadata = {
  title: "Cheatsheet & Exam Traps — AWS SAA-C03 | CloudPrep",
  description:
    "One-day revision cram: every number, mapping, and trap for the AWS SAA-C03 exam in dense tables.",
};

export default function CheatsheetPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/study"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
              aria-label="Back to study guide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </Link>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Cheatsheet &amp; Exam Traps
            </span>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">One-day revision cram</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          One-day revision cheatsheet
        </h1>
        <p className="mt-3 text-slate-400">
          Every number, mapping, and trap from the 15 sections compressed into
          one cram page. Work top to bottom; anything you hesitate on, revisit
          that section’s lesson.
        </p>

        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2 text-xs">
          {[
            ["#numbers", "Numbers to memorize"],
            ["#fingerprints", "Service fingerprints"],
            ["#routing", "Route 53 picker"],
            ["#dr", "DR ladder"],
            ["#confusions", "Don’t confuse"],
            ["#traps", "Trap list"],
            ["#shortcuts", "Decision shortcuts"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <h2 id="numbers" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Numbers to memorize
        </h2>
        <KeyTable
          head={["Area", "Number", "Why it’s asked"]}
          rows={[
            ["S3 durability / availability", "11 nines / 99.99%", "Standard multi-AZ classes — durability ≠ availability"],
            ["S3 max object / multipart", "5 TB · parts ≥ 5 MiB, ≤ 10,000", "multipart math questions"],
            ["S3 minimum billing duration", "IA 30 d · Glacier 90 d · Deep Archive 180 d", "early-deletion fee traps"],
            ["Intelligent-Tiering floor", "Objects < 128 KB not tiered", "monitoring fee vs savings"],
            ["Presigned URL max (SigV4)", "7 days", "temporary access questions"],
            ["Lambda", "15 min max · 10 GB memory · 6 MB sync payload · /tmp 10 GB", "“can Lambda do this?” gates"],
            ["Lambda package", "50 MB zipped · 250 MB unzipped · 10 GB container", "deployment questions"],
            ["Fargate", "Per-second billing · Fargate Spot ~30–70% off", "container cost questions"],
            ["EC2 Spot", "2-minute interruption notice", "interruption handling questions"],
            ["ASG default cooldown", "300 seconds", "scaling behavior questions"],
            ["Placement groups", "Spread: ≤ 7 per AZ · Cluster: single AZ", "placement group questions"],
            ["EBS gp3 baseline", "3,000 IOPS / 125 MB/s free", "volume cost/performance questions"],
            ["io2 max", "256,000 IOPS", "“database needs more than 16k IOPS”"],
            ["Instance store", "Lost on stop/termination/host failure", "durability traps"],
            ["Aurora", "Storage to 128 TiB · 15 replicas · backtrack ≤ 72 h (MySQL)", "Aurora feature questions"],
            ["RDS Multi-AZ failover", "~60–120 seconds", "failover time questions"],
            ["DynamoDB item size", "400 KB", "“store large files” → S3 + pointer"],
            ["DynamoDB PITR window", "35 days", "restore questions"],
            ["DynamoDB GSIs / LSIs", "20 / 5 per table", "design limits"],
            ["ElastiCache data tiering", "NVMe on r6gd, ~60% cheaper per GB", "cache cost questions"],
            ["SQS message size", "256 KB (pointer pattern beyond)", "large payload questions"],
            ["SQS retention", "1 min – 14 days", "replay window questions"],
            ["SNS / SQS payload", "256 KB", "pointer pattern again"],
            ["Kinesis shard", "1 MB/s in · 2 MB/s out", "shard capacity questions"],
            ["Kinesis retention", "24 h default → 7 d → 365 d", "replay window questions"],
            ["Step Functions Standard / Express", "1 year · 5 minutes", "workflow type selection"],
            ["API Gateway integration timeout", "29 seconds", "long-work → async questions"],
            ["CloudWatch Logs retention", "Never expire by default — set explicitly", "log cost questions"],
            ["CloudFront free tier", "1 TB egress/month", "small-site cost questions"],
            ["EFS-IA minimum bill", "128 KiB per file", "tiny-file cost traps"],
            ["IAM managed policy size", "6,144 characters", "policy size limit questions"],
          ]}
        />

        <h2 id="fingerprints" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Service fingerprints — requirement phrase → answer
        </h2>
        <P>
          The exam describes a requirement; you recognize the service. These
          are the highest-frequency fingerprints:
        </P>
        <KeyTable
          head={["If the question says…", "Answer"]}
          rows={[
            ["SQL injection / XSS / rate-limit per IP at the edge", "AWS WAF"],
            ["Volumetric DDoS, free and automatic", "Shield Standard"],
            ["DDoS response team + cost protection", "Shield Advanced"],
            ["Compromised instance, C2 traffic, anomalous API calls", "GuardDuty (+ EventBridge response)"],
            ["Outdated packages / CVEs on EC2, Lambda, ECR images", "Inspector"],
            ["Find PII in S3", "Macie"],
            ["Aggregate security findings org-wide with scores", "Security Hub"],
            ["Investigate a finding’s blast radius over time", "Detective"],
            ["Block domains / inspect egress in a VPC", "Network Firewall"],
            ["Apply WAF/SG policies org-wide automatically", "Firewall Manager"],
            ["Immutable backups even for admins", "Backup Vault Lock / S3 Object Lock (compliance)"],
            ["Microsecond reads of hot DynamoDB items", "DAX"],
            ["Durable Redis as system of record", "MemoryDB"],
            ["Cached Redis with replication/failover", "ElastiCache Redis"],
            ["Graph queries (social, fraud rings)", "Neptune"],
            ["Cassandra-compatible wide column", "Keyspaces"],
            ["Time-series with retention tiers", "Timestream"],
            ["Cryptographically verifiable ledger", "QLDB"],
            ["MongoDB-compatible", "DocumentDB"],
            ["Petabyte SQL warehouse", "Redshift"],
            ["Full-text search / log exploration", "OpenSearch"],
            ["Ad-hoc SQL on S3, pay per scan", "Athena"],
            ["Managed Hadoop/Spark clusters", "EMR"],
            ["Serverless Spark ETL + data catalog", "Glue"],
            ["BI dashboards for business users", "QuickSight"],
            ["Connect devices, MQTT at fleet scale", "IoT Core"],
            ["Process locally, no connectivity", "Greengrass"],
            ["Managed Kafka (existing tooling)", "MSK"],
            ["Ship 100 TB with no bandwidth", "Snowball Edge (Snowmobile for exabytes)"],
            ["Managed SFTP endpoint into S3", "Transfer Family"],
            ["Continuous server replication for DR", "Elastic Disaster Recovery"],
            ["One-time server rehost migration", "MGN (Application Migration Service)"],
            ["Score architecture against RTO/RPO", "Resilience Hub"],
            ["Deliberately break an AZ to test", "Fault Injection Service"],
            ["Provision new accounts with guardrails", "Control Tower"],
            ["Workforce SSO across accounts", "IAM Identity Center"],
            ["ML rightsizing from utilization history", "Compute Optimizer"],
            ["Unexpected spend spike detection", "Cost Anomaly Detection"],
            ["Personalize recommendations / extract document text / speech-to-text", "Personalize / Textract / Transcribe"],
          ]}
        />

        <h2 id="routing" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Route 53 routing policy picker
        </h2>
        <KeyTable
          head={["Requirement wording", "Policy"]}
          rows={[
            ["One resource, one record", "Simple"],
            ["Split traffic by percentage (canary/blue-green)", "Weighted"],
            ["Serve the lowest-latency healthy Region", "Latency-based (+ health checks)"],
            ["Primary fails health check → secondary", "Failover"],
            ["EU users → EU, US users → US", "Geolocation"],
            ["Shift geographic traffic gradually (bias dial)", "Geoproximity"],
            ["Return multiple healthy records at random", "Multivalue answer"],
            ["Route specific customer CIDRs to specific endpoints", "CIDR routing"],
          ]}
        />
        <Callout type="exam">
          Every latency/failover/weighted answer implies{" "}
          <strong>health checks</strong> — the policy is only half the
          answer. TTLs bound failover speed (keep 60s); for “failover in
          seconds,” the answer is Global Accelerator or ARC, not DNS.
        </Callout>

        <h2 id="dr" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          The DR ladder — pick the cheapest rung that meets RTO/RPO
        </h2>
        <KeyTable
          head={["Strategy", "What runs in DR", "RTO / RPO"]}
          rows={[
            ["Backup & restore", "Nothing — rebuild + restore on disaster", "Hours / backup interval"],
            ["Pilot light", "Data replicates; core services off (templates staged)", "10s of minutes / minutes"],
            ["Warm standby", "Scaled-down full stack, always on", "Minutes / seconds"],
            ["Multi-site active/active", "Full scale, all Regions serving", "~0 / ~0"],
          ]}
        />
        <UL
          items={[
            <>
              RDS Multi-AZ = <strong>AZ resilience</strong> (RPO ≈ 0, failover
              1–2 min). Cross-Region replicas = <strong>Regional DR</strong>{" "}
              (RPO = lag). Global tables = <strong>active/active data</strong>{" "}
              (LWW conflicts).
            </>,
            <>
              Aurora global: ~1s replica lag, managed switchover for planned
              events (RPO 0), promotion for unplanned.
            </>,
          ]}
        />

        <h2 id="confusions" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Don’t confuse — the classic pairs
        </h2>
        <KeyTable
          head={["Pair", "The distinction"]}
          rows={[
            ["Durability vs availability", "Not losing data vs being able to read it — IA classes trade availability, One Zone trades durability"],
            ["SG vs NACL", "Stateful instance-level allow-only vs stateless subnet-level allow+deny (ephemeral return ports!)"],
            ["ALB vs NLB vs GWLB", "L7 routing vs L4 static-IP speed vs inline appliances"],
            ["Multi-AZ vs read replicas", "Availability (unreadable standby) vs read scaling (async, promotable)"],
            ["Multi-AZ instance vs cluster", "Unreadable sync standby vs two readable standbys"],
            ["User pool vs identity pool", "Authentication (JWTs) vs temporary AWS credentials"],
            ["ElastiCache vs MemoryDB", "Cache (ephemeral) vs durable Redis system-of-record"],
            ["DAX vs ElastiCache", "DynamoDB-fronting microsecond cache vs app-level cache"],
            ["Latency vs geolocation routing", "Measured performance vs policy location"],
            ["SCT vs DMS vs MGN vs DRS", "Schema conversion / DB migration / one-time rehost / standing DR"],
            ["Glue vs Athena vs EMR", "ETL+catalog vs serverless query vs managed clusters"],
            ["Firehose vs Streams", "Managed delivery vs custom real-time consumers"],
            ["CloudTrail vs Config vs CloudWatch", "API audit vs resource configuration vs metrics/logs"],
            ["Compute Optimizer vs Trusted Advisor", "ML rightsizing vs best-practice checks"],
            ["Storage Lens vs Inventory vs SCA", "Dashboards vs object lists vs access-pattern analysis"],
            ["WAF vs Shield vs FMS vs NFW", "L7 rules vs DDoS vs central policy mgmt vs VPC egress firewall"],
            ["GuardDuty vs Inspector vs Macie", "Threats vs vulnerabilities vs PII discovery"],
            ["Snapshot vs backtrack vs clone (Aurora)", "Restore to new cluster vs rewind in place vs test copy"],
            ["GetSessionToken vs AssumeRole", "MFA temp creds for an IAM user vs assuming a role"],
            ["Roles Anywhere vs Cognito", "Non-AWS machine identity vs application end-user identity"],
          ]}
        />

        <h2 id="traps" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Trap list — sneaky wordings and gotchas
        </h2>
        <UL
          items={[
            <>
              <strong>“Encrypted by default”:</strong> S3 and DynamoDB only.
              EBS/RDS/EFS/Redshift are opt-in (EBS has a Region default
              toggle).
            </>,
            <>
              <strong>“Readable standby”:</strong> RDS Multi-AZ instance
              standbys are NOT readable — that’s a Multi-AZ DB cluster or
              read replicas.
            </>,
            <>
              <strong>“Failover in seconds”:</strong> Global Accelerator or
              Aurora replica promotion — never DNS (TTLs delay it).
            </>,
            <>
              <strong>“Block one malicious IP at the subnet”:</strong> NACL —
              security groups can’t deny.
            </>,
            <>
              <strong>“Connection hangs mid-session”:</strong> NACL missing
              ephemeral return ports.
            </>,
            <>
              <strong>“Same-account KMS Access Denied despite perfect
              IAM”:</strong> the key policy must delegate to IAM — KMS is the
              forgotten third policy.
            </>,
            <>
              <strong>“Passing session tags silently drops them”:</strong>{" "}
              the role trust policy must allow <Code>sts:TagSession</Code>.
            </>,
            <>
              <strong>“Temp credentials still valid after key deletion”:</strong>{" "}
              STS sessions live until expiry — short durations are the
              mitigation.
            </>,
            <>
              <strong>“CloudFront certificate”:</strong> must be in us-east-1
              (same for the Cognito hosted-UI domain).
            </>,
            <>
              <strong>“Only this VPC may reach the bucket”:</strong> bucket
              policy condition on <Code>aws:SourceVpce</Code>.
            </>,
            <>
              <strong>“Stop the exfiltration to outside-org buckets”:</strong>{" "}
              SCP Deny on s3:PutObject where{" "}
              <Code>aws:ResourceOrgID</Code> ≠ org — and carve out{" "}
              <Code>aws:PrincipalIsAWSService</Code> or you break services.
            </>,
            <>
              <strong>“Replication copies deletes too”:</strong> CRR/FIFO
              replication is not delete protection — that’s versioning,
              Object Lock, or backups.
            </>,
            <>
              <strong>“Lambda can’t run 40 minutes”:</strong> 15-minute hard
              cap → Fargate/Batch. API Gateway adds a 29-second integration
              cap → async pattern.
            </>,
            <>
              <strong>“Messages processed twice”:</strong> visibility timeout
              shorter than processing time (SQS) or missing idempotency —
              at-least-once delivery everywhere.
            </>,
            <>
              <strong>“One AZ at 100% CPU, others idle” (DynamoDB):</strong>{" "}
              hot partition key — shard or redesign; adaptive capacity only
              isolates.
            </>,
            <>
              <strong>“ALB requires two AZs”</strong> — one-subnet ALBs
              can’t exist; NLB needs targets in each AZ it has IPs for
              without cross-zone.
            </>,
            <>
              <strong>“EFS-IA bills 128 KiB per file”:</strong> tiny files
              cost more in IA than Standard.
            </>,
            <>
              <strong>“Spot: 2-minute warning”:</strong> checkpoint
              externally, diversify pools — Spot Blocks are retired.
            </>,
            <>
              <strong>“Cross-account KMS”: </strong> key policy AND caller
              IAM both required, or Decrypt fails.
            </>,
            <>
              <strong>“Object Lock compliance mode is irreversible”</strong>{" "}
              — governance mode is bypassable; pick per wording.
            </>,
            <>
              <strong>“Who deleted it?”:</strong> CloudTrail data events
              (object-level must be enabled) — access logs are weaker.
            </>,
            <>
              <strong>“NAT processing fees”:</strong> S3/DynamoDB → free
              gateway endpoints.
            </>,
            <>
              <strong>“At-least-once everywhere”:</strong> SQS, S3 events,
              EventBridge — design idempotency; FIFO + dedup narrows it.
            </>,
            <>
              <strong>“Failover faster than RDS Multi-AZ”:</strong> Aurora
              replica promotion (~&lt;1 min) or GA (network-layer, seconds).
            </>,
          ]}
        />

        <h2 id="shortcuts" className="mt-14 border-b border-white/10 pb-2 text-xl font-bold text-white">
          Decision shortcuts — “requirement → answer”
        </h2>
        <KeyTable
          head={["If the requirement is…", "Answer"]}
          rows={[
            ["Unpredictable spiky traffic, no capacity planning", "On-demand (DynamoDB/Kinesis) · Serverless (Aurora/Redshift) · Lambda"],
            ["Steady 3-year workload, cost floor", "Reserved / Savings Plans / reserved nodes"],
            ["Fault-tolerant batch, cheapest compute", "Spot + checkpointing + diversified pools"],
            ["Guaranteed AZ capacity for a launch window", "On-Demand Capacity Reservation / Capacity Blocks (GPU)"],
            ["Dev/test used business hours only", "Instance Scheduler stop/start (+ hibernation for VMs)"],
            ["Decouple services, absorb spikes", "SQS between them (+ DLQ, visibility timeout tuned)"],
            ["One event to many consumers", "SNS fan-out (filters for slices) or EventBridge"],
            ["Route events by content to many targets", "EventBridge rules"],
            ["Long workflow with retries/approvals", "Step Functions (callback tokens for humans)"],
            ["GraphQL + real-time subscriptions", "AppSync"],
            ["Bidirectional browser channels", "API Gateway WebSocket APIs"],
            ["Per-customer API keys with quotas", "API Gateway usage plans"],
            ["Cache hot reads in microseconds (DynamoDB)", "DAX"],
            ["Shared POSIX storage, multi-AZ", "EFS Standard"],
            ["Windows SMB shares with AD", "FSx for Windows"],
            ["HPC POSIX linked to S3", "FSx for Lustre"],
            ["Private S3/DynamoDB access, no NAT fees", "Gateway VPC endpoint"],
            ["Expose an internal service to another account privately", "PrivateLink"],
            ["Central firewall policy org-wide", "Firewall Manager"],
            ["Block egress to bad domains in a VPC", "Network Firewall / Route 53 DNS Firewall"],
            ["Encrypt keys in hardware you control", "CloudHSM"],
            ["Keys must stay outside AWS", "External key store (XKS)"],
            ["Sign code deployments", "Signer"],
            ["Detect compromised credentials", "GuardDuty (respond via EventBridge)"],
            ["Continuous vulnerability scanning", "Inspector"],
            ["Discover PII in S3", "Macie"],
            ["Immutable audit archive of API activity", "CloudTrail org trail + validation"],
            ["Fleet-wide patching without SSH", "SSM Patch Manager"],
            ["Shell without keys or bastion", "Session Manager"],
            ["Migrate files over the network", "DataSync"],
            ["Partners upload via SFTP", "Transfer Family"],
            ["Petabytes offline", "Snow family"],
            ["Continuous server replication for DR", "DRS"],
            ["Predictable daily traffic peaks", "Predictive scaling"],
            ["Reduce EC2 costs ~20% on ARM-compatible workloads", "Graviton"],
            ["Reduce a bill whose usage is unpredictable in shape", "Savings Plans (vs RIs for fixed fleets)"],
          ]}
        />

        <div className="mt-16 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-6">
          <Callout type="tip">
            <P>
              <strong>Final pass:</strong> run one{" "}
              <Link href="/exam" className="text-emerald-300 underline">
                Exam Mode simulation
              </Link>{" "}
              the day before, review every wrong answer’s explanation, and
              sleep on it. The exam is passable on pattern recognition — this
              page is the patterns.
            </P>
          </Callout>
        </div>
      </main>
    </div>
  );
}
