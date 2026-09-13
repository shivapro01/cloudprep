/** Hand-drawn SVG diagrams for the section 2.3 lessons (dark theme). */

const BOX = "#1e293b";
const EDGE = "#475569";
const TXT = "#e2e8f0";
const SUB = "#94a3b8";
const AMBER = "#fbbf24";
const GREEN = "#34d399";
const RED = "#f87171";
const SKY = "#38bdf8";
const FONT = "ui-sans-serif, system-ui, sans-serif";

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={SUB} />
      </marker>
    </defs>
  );
}

function Note({ x, y, width, lines, color = SKY, border = "#1e3a5f" }: { x: number; y: number; width: number; lines: string[]; color?: string; border?: string }) {
  const maxChars = Math.max(24, Math.floor((width - 40) / 6.2));
  const wrapped = lines.flatMap((l) => {
    if (l.length <= maxChars) return [l];
    const words = l.split(" ");
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      const candidate = cur ? cur + " " + w : w;
      if (candidate.length > maxChars && cur) {
        out.push(cur);
        cur = w;
      } else {
        cur = candidate;
      }
    }
    if (cur) out.push(cur);
    return out;
  });
  return (
    <g>
      <rect x={x} y={y} width={width} height={34 + (wrapped.length - 1) * 22} rx="10" fill="#0b1526" stroke={border} />
      {wrapped.map((line, i) => (
        <text key={i} x={x + 20} y={y + 26 + i * 22} fill={i === 0 ? color : TXT} fontSize={i === 0 ? 13 : 12.5} fontWeight={i === 0 ? 600 : 400}>
          {line}
        </text>
      ))}
    </g>
  );
}

/** 2.3.1 — where each storage type physically lives. */
export function StorageDurabilityDiagram() {
  return (
    <svg viewBox="0 0 760 420" width="100%" role="img" aria-label="Storage durability models compared" fontFamily={FONT}>
      <ArrowDefs id="sd-arrow" />
      {/* AZ columns */}
      <rect x="30" y="20" width="220" height="44" rx="10" fill="#0b1526" stroke="#1e3a5f" />
      <text x="140" y="47" textAnchor="middle" fill={SKY} fontSize="12.5">AZ A</text>
      <rect x="270" y="20" width="220" height="44" rx="10" fill="#0b1526" stroke="#1e3a5f" />
      <text x="380" y="47" textAnchor="middle" fill={SKY} fontSize="12.5">AZ B</text>
      <rect x="510" y="20" width="220" height="44" rx="10" fill="#0b1526" stroke="#1e3a5f" />
      <text x="620" y="47" textAnchor="middle" fill={SKY} fontSize="12.5">AZ C</text>
      {/* S3 row */}
      {[
        { x: 60, label: "S3 copy" },
        { x: 300, label: "S3 copy" },
        { x: 540, label: "S3 copy" },
      ].map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="90" width="160" height="38" rx="8" fill="#0f2e22" stroke={GREEN} />
          <text x={c.x + 80} y="114" textAnchor="middle" fill={GREEN} fontSize="12">{c.label}</text>
        </g>
      ))}
      <text x="380" y="76" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">S3 — objects across 3+ AZs, auto-healing, 11 nines</text>
      {/* EBS row */}
      <rect x="60" y="170" width="160" height="38" rx="8" fill={BOX} stroke={EDGE} />
      <text x="140" y="194" textAnchor="middle" fill={TXT} fontSize="12">EBS volume (replicated)</text>
      <text x="300" y="194" textAnchor="middle" fill={SUB} fontSize="12">✕ stays in AZ A</text>
      <text x="540" y="194" textAnchor="middle" fill={SUB} fontSize="12">✕</text>
      <text x="380" y="156" textAnchor="middle" fill={AMBER} fontSize="12.5" fontWeight="600">EBS — replicated within its one AZ · survives host loss, not AZ loss</text>
      {/* instance store row */}
      <rect x="60" y="240" width="160" height="38" rx="8" fill="#3f1d1d" stroke={RED} />
      <text x="140" y="264" textAnchor="middle" fill={RED} fontSize="12">Instance store</text>
      <text x="380" y="226" textAnchor="middle" fill={RED} fontSize="12.5" fontWeight="600">Instance store — host-bound, gone on stop/failure</text>
      {/* EFS row */}
      <rect x="60" y="310" width="160" height="38" rx="8" fill="#0f2e22" stroke={GREEN} />
      <rect x="300" y="310" width="160" height="38" rx="8" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="296" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">EFS Standard — mount targets in each AZ</text>
      <Note x={20} y={366} width={720} lines={[
        "The selection axis",
        "does the data need to survive an AZ loss (EBS snapshots, multi-AZ stores) or is rebuild-from-source acceptable (instance store, One Zone classes)?",
      ]} color={AMBER} border="#7c5b16" />
    </svg>
  );
}

/** 2.3.2 — EBS snapshot resilience chain. */
export function EbsResilienceDiagram() {
  return (
    <svg viewBox="0 0 760 425" width="100%" role="img" aria-label="EBS volume resilience chain" fontFamily={FONT}>
      <ArrowDefs id="eb2-arrow" />
      <rect x="24" y="30" width="160" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="104" y="58" textAnchor="middle" fill={TXT} fontSize="12.5">EBS volume</text>
      <text x="104" y="78" textAnchor="middle" fill={SUB} fontSize="11">in AZ A · replicated in-AZ</text>
      <rect x="300" y="30" width="170" height="70" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="385" y="58" textAnchor="middle" fill={GREEN} fontSize="12.5">Snapshot (S3-backed)</text>
      <text x="385" y="78" textAnchor="middle" fill={SUB} fontSize="11">incremental · point in time</text>
      <rect x="586" y="30" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="661" y="58" textAnchor="middle" fill={TXT} fontSize="12.5">Restore anywhere</text>
      <text x="661" y="78" textAnchor="middle" fill={SUB} fontSize="11">any AZ, any Region</text>
      <path d="M184 65 h112" stroke={SUB} strokeWidth="1.5" markerEnd="url(#eb2-arrow)" />
      <path d="M470 65 h112" stroke={SUB} strokeWidth="1.5" markerEnd="url(#eb2-arrow)" />
      {[
        { x: 24, y: 140, title: "Recycle Bin", lines: ["retention rules protect", "snapshots from deletion"] },
        { x: 300, y: 140, title: "SnapLock", lines: ["WORM immutability", "for snapshot retention"] },
        { x: 586, y: 140, title: "Fast Snapshot Restore", lines: ["full performance instantly", "per AZ, premium priced"] },
      ].map((card) => (
        <g key={card.title}>
          <rect x={card.x} y={card.y} width="150" height="80" rx="12" fill={BOX} stroke={EDGE} />
          <text x={card.x + 75} y={card.y + 26} textAnchor="middle" fill={AMBER} fontSize="12.5" fontWeight="600">{card.title}</text>
          {card.lines.map((line, i) => (
            <text key={i} x={card.x + 14} y={card.y + 48 + i * 17} fill={TXT} fontSize="11">{line}</text>
          ))}
        </g>
      ))}
      <Note x={24} y={248} width={712} lines={[
        "The resilience chain",
        "volume dies with its AZ → restore snapshot into a healthy AZ (or another Region) → FSR removes the warm-up wait",
        "incremental snapshots + Data Lifecycle Manager automate the schedule and retention",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={24} y={360} width={712} lines={[
        "Multi-Attach nuance",
        "io2 volumes share one AZ — Multi-Attach is not multi-AZ resilience",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.3.4 — EFS resilience choice. */
export function EfsChoiceDiagram() {
  return (
    <svg viewBox="0 0 760 378" width="100%" role="img" aria-label="EFS Standard vs One Zone" fontFamily={FONT}>
      <ArrowDefs id="ef-arrow" />
      <rect x="20" y="20" width="350" height="180" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="195" y="48" textAnchor="middle" fill={GREEN} fontSize="14" fontWeight="600">EFS Standard — multi-AZ</text>
      {[
        "file data stored across multiple AZs",
        "survives AZ loss automatically",
        "mount targets in every AZ",
        "choose for: production, critical shared data",
      ].map((t, i) => (
        <text key={i} x="40" y={76 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <rect x="390" y="20" width="350" height="180" rx="12" fill={BOX} stroke={EDGE} />
      <text x="565" y="48" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">EFS One Zone — single AZ</text>
      {[
        "all data in one AZ — ~30% cheaper",
        "AZ loss = file system unavailable",
        "choose for: rebuildable data, dev/test,",
        "One Zone IA pairs with lifecycle policies",
      ].map((t, i) => (
        <text key={i} x="410" y={76 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <Note x={20} y={222} width={720} lines={[
        "Backup closes the gap either way",
        "AWS Backup protects both classes — a One Zone file system with automated backups restores into any AZ",
      ]} color={GREEN} border="#14532d" />
      <Note x={20} y={290} width={720} lines={[
        "Exam mapping",
        "“shared media for a CMS, must survive AZ failure” → EFS Standard · “scratch/build data that can be regenerated, lowest cost” → One Zone",
      ]} color={AMBER} border="#7c5b16" />
    </svg>
  );
}

/** 2.3.5 — FSx availability per file system. */
export function FsxDurabilityDiagram() {
  return (
    <svg viewBox="0 0 760 472" width="100%" role="img" aria-label="FSx family availability and durability" fontFamily={FONT}>
      <ArrowDefs id="fx-arrow" />
      {[
        { x: 20, title: "FSx for Windows", color: SKY, lines: ["Multi-AZ: sync standby in 2nd AZ,", "automatic failover, keeps DNS name", "Single-AZ: cheaper, AZ-bound", "SSD or HDD storage per performance"] },
        { x: 265, title: "FSx for Lustre", color: AMBER, lines: ["Scratch: no replication, ephemeral,", "extreme throughput for HPC runs", "Persistent: replicated, self-healing,", "for longer-lived datasets"] },
        { x: 510, title: "FSx ONTAP / OpenZFS", color: GREEN, lines: ["ONTAP: HA pairs in multi-AZ,", "multi-protocol (NFS+SMB)", "OpenZFS: multi-AZ option,", "snapshot-based protection"] },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="20" width="230" height="170" rx="12" fill={BOX} stroke={EDGE} />
          <text x={card.x + 115} y="46" textAnchor="middle" fill={card.color} fontSize="13.5" fontWeight="600">{card.title}</text>
          {card.lines.map((line, i) => (
            <text key={i} x={card.x + 16} y={72 + i * 24} fill={TXT} fontSize="12">• {line}</text>
          ))}
        </g>
      ))}
      <Note x={20} y={214} width={720} lines={[
        "Backups complete every flavor",
        "automatic daily backups + AWS Backup integration, cross-Region copies for DR — availability is in-service, durability is backups",
      ]} />
      <Note x={20} y={296} width={720} lines={[
        "Selection shortcuts",
        "“Windows shares with HA” → FSx Windows Multi-AZ · “HPC scratch that can vanish” → Lustre Scratch",
        "“long-running Lustre dataset” → Lustre Persistent · “NetApp enterprise features” → ONTAP",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={382} width={720} lines={[
        "Watch the word",
        "“scratch” in a Lustre question is the giveaway for ephemeral — persistent Lustre is the answer whenever data must outlive the cluster",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.3.6 — backup vs replication per store. */
export function BackupVsReplicationDiagram() {
  return (
    <svg viewBox="0 0 760 505" width="100%" role="img" aria-label="Backup vs replication decisions per store" fontFamily={FONT}>
      <ArrowDefs id="br-arrow" />
      <rect x="20" y="20" width="350" height="150" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="195" y="48" textAnchor="middle" fill={GREEN} fontSize="14" fontWeight="600">Replication — live copies</text>
      {[
        "RPO: seconds to minutes",
        "protects against AZ/Region failure",
        "deletes and corruption REPLICATE too",
        "CRR · global tables · Aurora global · read replicas",
      ].map((t, i) => (
        <text key={i} x="40" y={76 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <rect x="390" y="20" width="350" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="565" y="48" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Backups — point-in-time copies</text>
      {[
        "RPO: the backup interval",
        "protects against deletion, corruption, ransomware",
        "restore takes time; retained for windows",
        "AWS Backup · snapshots · PITR · Recycle Bin",
      ].map((t, i) => (
        <text key={i} x="410" y={76 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <Note x={20} y={196} width={720} lines={[
        "The mature answer is both, layered",
        "replication delivers availability (keep serving through failures) · backups deliver recoverability (undo deletion, corruption, ransomware)",
        "a replicated delete is a deleted replica — only an independent backup can undo it",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={306} width={720} lines={[
        "Per-store pairing",
        "RDS: Multi-AZ/read replicas + automated backups and snapshots · DynamoDB: global tables + PITR/backups",
        "S3: CRR + versioning/Object Lock · EFS/FSx: multi-AZ + AWS Backup",
      ]} color={GREEN} border="#14532d" />
      <Note x={20} y={424} width={720} lines={[
        "Exam lens",
        "“regional failure” scenarios → replication answers · “someone deleted/corrupted data” scenarios → backup, versioning, PITR answers",
      ]} />
    </svg>
  );
}
