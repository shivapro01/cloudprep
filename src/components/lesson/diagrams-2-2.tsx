/** Hand-drawn SVG diagrams for the section 2.2 lessons (dark theme). */

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

/** 2.2.2/2.2.3 — the DR strategy ladder. */
export function DRTiersDiagram() {
  return (
    <svg viewBox="0 0 760 545" width="100%" role="img" aria-label="Disaster recovery strategy ladder" fontFamily={FONT}>
      <ArrowDefs id="dr-arrow" />
      <text x="90" y="24" textAnchor="end" fill={SUB} fontSize="11.5">lowest cost</text>
      <text x="90" y="40" textAnchor="end" fill={SUB} fontSize="11.5">↑ cost ↓ RTO/RPO</text>
      {[
        { y: 50, name: "Backup & restore", color: SUB, rto: "RTO: hours+", rpo: "RPO: backup interval", cost: "$", desc: "rebuild from backups when disaster strikes" },
        { y: 146, name: "Pilot light", color: SKY, rto: "RTO: tens of minutes", rpo: "RPO: minutes", cost: "$$", desc: "data replicated, core services off until needed" },
        { y: 242, name: "Warm standby", color: AMBER, rto: "RTO: minutes", rpo: "RPO: seconds", cost: "$$$", desc: "scaled-down full stack always running" },
        { y: 338, name: "Multi-site active/active", color: GREEN, rto: "RTO: ~0", rpo: "RPO: ~0", cost: "$$$$", desc: "full scale in every Region, all serving" },
      ].map((row) => (
        <g key={row.name}>
          <rect x="110" y={row.y} width="500" height="80" rx="12" fill={BOX} stroke={EDGE} />
          <text x="130" y={row.y + 28} fill={row.color} fontSize="14" fontWeight="600">{row.name}</text>
          <text x="130" y={row.y + 50} fill={SUB} fontSize="12">{row.desc}</text>
          <text x="130" y={row.y + 68} fill={SUB} fontSize="11.5">{row.rto} · {row.rpo}</text>
          <text x="590" y={row.y + 50} textAnchor="middle" fill={row.color} fontSize="16" fontWeight="700">{row.cost}</text>
        </g>
      ))}
      <line x1="70" y1="50" x2="70" y2="410" stroke={SUB} strokeWidth="1.2" markerEnd="url(#dr-arrow)" />
      <text x="56" y="235" textAnchor="middle" fill={SUB} fontSize="11" transform="rotate(-90 56 235)">increasing cost &amp; resilience</text>
      <Note x={110} y={446} width={500} lines={[
        "Drill question frame",
        "match the strategy to the stated RTO/RPO + budget — never buy more resilience than the requirement",
      ]} />
    </svg>
  );
}

/** 2.2.1 — multi-AZ pattern per tier. */
export function MultiAzPatternsDiagram() {
  return (
    <svg viewBox="0 0 760 475" width="100%" role="img" aria-label="Multi-AZ pattern per tier" fontFamily={FONT}>
      <ArrowDefs id="ma-arrow" />
      <rect x="40" y="56" width="160" height="56" rx="10" fill={BOX} stroke={EDGE} />
      <text x="120" y="80" textAnchor="middle" fill={TXT} fontSize="12.5">Users</text>
      <rect x="280" y="40" width="200" height="88" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="66" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">ALB — 2+ AZs</text>
      <text x="380" y="86" textAnchor="middle" fill={SUB} fontSize="11">cross-zone to all targets</text>
      <text x="380" y="104" textAnchor="middle" fill={SUB} fontSize="11">health checks eject failures</text>
      <rect x="40" y="170" width="150" height="60" rx="10" fill={BOX} stroke={EDGE} />
      <text x="115" y="196" textAnchor="middle" fill={TXT} fontSize="12.5">ASG — AZ A</text>
      <text x="115" y="214" textAnchor="middle" fill={SUB} fontSize="11">min 1 per AZ</text>
      <rect x="250" y="170" width="150" height="60" rx="10" fill={BOX} stroke={EDGE} />
      <text x="325" y="196" textAnchor="middle" fill={TXT} fontSize="12.5">ASG — AZ B</text>
      <text x="325" y="214" textAnchor="middle" fill={SUB} fontSize="11">min 1 per AZ</text>
      <rect x="460" y="170" width="150" height="60" rx="10" fill={BOX} stroke={EDGE} />
      <text x="535" y="196" textAnchor="middle" fill={TXT} fontSize="12.5">ASG — AZ C</text>
      <text x="535" y="214" textAnchor="middle" fill={SUB} fontSize="11">min 1 per AZ</text>
      <rect x="120" y="266" width="240" height="70" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="240" y="292" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">RDS Multi-AZ</text>
      <text x="240" y="314" textAnchor="middle" fill={SUB} fontSize="11">writer in one AZ · sync standby in another · auto failover</text>
      <rect x="400" y="266" width="220" height="70" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="510" y="292" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">EFS regional · S3 · DynamoDB</text>
      <text x="510" y="314" textAnchor="middle" fill={SUB} fontSize="11">multi-AZ by design</text>
      <path d="M120 116 v50" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ma-arrow)" />
      <path d="M325 116 v50" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ma-arrow)" />
      <path d="M535 116 v50" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ma-arrow)" />
      <line x1="115" y1="230" x2="200" y2="262" stroke={SUB} strokeWidth="1.2" markerEnd="url(#ma-arrow)" />
      <line x1="325" y1="230" x2="300" y2="262" stroke={SUB} strokeWidth="1.2" markerEnd="url(#ma-arrow)" />
      <line x1="535" y1="230" x2="480" y2="262" stroke={SUB} strokeWidth="1.2" markerEnd="url(#ma-arrow)" />
      <text x="380" y="360" textAnchor="middle" fill={SUB} fontSize="11.5">also per AZ: one NAT gateway each (spokes route locally) · target groups span all AZs</text>
      <Note x={40} y={380} width={680} lines={[
        "The audit question per tier",
        "“if this Availability Zone disappeared right now, does the tier keep serving — with zero human action?” — every tier must answer yes",
      ]} color={AMBER} border="#7c5b16" />
    </svg>
  );
}

/** 2.2.5 — data-layer resilience. */
export function DataLayerResilienceDiagram() {
  return (
    <svg viewBox="0 0 760 430" width="100%" role="img" aria-label="Data-layer replication per engine" fontFamily={FONT}>
      <ArrowDefs id="dl-arrow" />
      {[
        { y: 20, engine: "DynamoDB global tables", a: "us-east-1 (read/write)", b: "eu-west-1 (read/write)", note: "active/active · last-writer-wins" },
        { y: 116, engine: "Aurora global database", a: "primary cluster", b: "secondary cluster", note: "~1s replication · promote in ~1 min" },
        { y: 212, engine: "RDS cross-Region read replica", a: "primary (write)", b: "replica → promote on DR", note: "async lag = RPO (minutes)" },
        { y: 308, engine: "ElastiCache Global Datastore / MemoryDB", a: "primary cluster", b: "replica cluster → promote", note: "cache and durable Redis DR" },
      ].map((row) => (
        <g key={row.engine}>
          <rect x="20" y={row.y} width="720" height="82" rx="12" fill={BOX} stroke={EDGE} />
          <text x="40" y={row.y + 26} fill={AMBER} fontSize="13" fontWeight="600">{row.engine}</text>
          <rect x="40" y={row.y + 38} width="240" height="32" rx="8" fill="#111c2e" stroke={EDGE} />
          <text x="160" y={row.y + 59} textAnchor="middle" fill={TXT} fontSize="11.5">{row.a}</text>
          <rect x="460" y={row.y + 38} width="240" height="32" rx="8" fill="#111c2e" stroke={EDGE} />
          <text x="580" y={row.y + 59} textAnchor="middle" fill={TXT} fontSize="11.5">{row.b}</text>
          <line x1="282" y1={row.y + 54} x2="456" y2={row.y + 54} stroke={SUB} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#dl-arrow)" />
          <text x="380" y={row.y + 76} textAnchor="middle" fill={GREEN} fontSize="11.5">{row.note}</text>
        </g>
      ))}
    </svg>
  );
}

/** 2.2.6 — DNS failover. */
export function DnsFailoverDiagram() {
  return (
    <svg viewBox="0 0 760 495" width="100%" role="img" aria-label="Route 53 failover with health checks" fontFamily={FONT}>
      <ArrowDefs id="df-arrow" />
      <rect x="20" y="30" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="95" y="60" textAnchor="middle" fill={TXT} fontSize="13">User</text>
      <text x="95" y="80" textAnchor="middle" fill={SUB} fontSize="12">DNS query</text>
      <rect x="250" y="20" width="240" height="90" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="370" y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Route 53 failover record</text>
      {[
        "primary → us-east-1 ALB",
        "secondary → DR endpoint",
        "health check probes primary",
      ].map((t, i) => (
        <text key={i} x="268" y={68 + i * 15} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      <rect x="560" y="16" width="180" height="60" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="650" y="42" textAnchor="middle" fill={GREEN} fontSize="12">Primary healthy?</text>
      <text x="650" y="62" textAnchor="middle" fill={GREEN} fontSize="12">serve PRIMARY</text>
      <rect x="560" y="110" width="180" height="60" rx="10" fill="#3f1d1d" stroke={RED} />
      <text x="650" y="136" textAnchor="middle" fill={RED} fontSize="12">Primary check fails?</text>
      <text x="650" y="156" textAnchor="middle" fill={RED} fontSize="12">serve SECONDARY</text>
      <path d="M170 65 h76" stroke={SUB} strokeWidth="1.5" markerEnd="url(#df-arrow)" />
      <path d="M490 55 h66" stroke={SUB} strokeWidth="1.5" markerEnd="url(#df-arrow)" />
      <path d="M490 90 C540 110, 540 140, 556 140" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#df-arrow)" />
      <Note x={20} y={190} width={720} lines={[
        "Health check flavors",
        "endpoint checks (HTTP/S/TCP with string matching) · calculated checks (AND/OR of children) · CloudWatch-alarm checks",
        "private endpoints: health checkers run inside a VPC",
      ]} />
      <Note x={20} y={288} width={720} lines={[
        "Beyond simple failover",
        "latency/weighted/geolocation + health checks for active topologies · ARC routing controls = operator switches with safety rules",
        "zonal shift moves traffic away from one impaired AZ in minutes",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={400} width={720} lines={[
        "DNS gotcha",
        "record TTLs delay failover — keep TTLs low (60s) on failover records · GA fails over in seconds without DNS at all",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.2.8 — AWS Backup pipeline. */
export function BackupPipelineDiagram() {
  return (
    <svg viewBox="0 0 760 445" width="100%" role="img" aria-label="AWS Backup governance pipeline" fontFamily={FONT}>
      <ArrowDefs id="bp-arrow" />
      <rect x="20" y="40" width="180" height="100" rx="12" fill={BOX} stroke={EDGE} />
      <text x="110" y="66" textAnchor="middle" fill={TXT} fontSize="13">Workload accounts</text>
      {["EBS · RDS · DynamoDB", "EFS · FSx · S3 · EC2", "assigned backup plans", "(delegated admin)"].map((t, i) => (
        <text key={i} x="38" y={90 + i * 15} fill={SUB} fontSize="11.5">{t}</text>
      ))}
      <rect x="290" y="30" width="200" height="120" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="390" y="56" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Backup plans</text>
      {["schedule (cron/rate)", "lifecycle: warm → cold", "copy rules: cross-Region", "cross-account to vaults", "Vault Lock: immutability"].map((t, i) => (
        <text key={i} x="308" y={80 + i * 15} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      <rect x="560" y="30" width="180" height="120" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="650" y="56" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="600">Security account vault</text>
      {["cross-Region copies", "cross-account custody", "Vault Lock (WORM)", "restore testing plans", "Audit Manager reports"].map((t, i) => (
        <text key={i} x="578" y={80 + i * 15} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      <line x1="200" y1="90" x2="286" y2="90" stroke={SUB} strokeWidth="1.5" markerEnd="url(#bp-arrow)" />
      <line x1="490" y1="90" x2="556" y2="90" stroke={SUB} strokeWidth="1.5" markerEnd="url(#bp-arrow)" />
      <Note x={20} y={180} width={720} lines={[
        "The governance story in one line",
        "workload teams get backups by policy; only the security account can delete or restore — ransomware cannot hold backups hostage",
      ]} color={GREEN} border="#14532d" />
      <Note x={20} y={262} width={720} lines={[
        "Coverage across services",
        "EBS, EC2, RDS/Aurora, S3 (continuous PITR), DynamoDB (PITR + backups), EFS, FSx, Aurora — one plan, many services",
      ]} />
      <Note x={20} y={344} width={720} lines={[
        "Exam mapping",
        "“central backup policy across accounts with cross-Region copies” → AWS Backup plans",
        "“backups must be undeletable for N years” → Vault Lock · “prove restores work” → restore testing plans",
      ]} color={AMBER} border="#7c5b16" />
    </svg>
  );
}

/** 2.2.9/2.2.10 — recovery tooling and testing. */
export function ResilienceTestingDiagram() {
  return (
    <svg viewBox="0 0 760 470" width="100%" role="img" aria-label="DRS recovery and resilience testing flow" fontFamily={FONT}>
      <ArrowDefs id="rt-arrow" />
      <rect x="20" y="24" width="200" height="120" rx="12" fill={BOX} stroke={EDGE} />
      <text x="120" y="50" textAnchor="middle" fill={TXT} fontSize="13" fontWeight="600">Elastic Disaster Recovery</text>
      {[
        "continuous block replication",
        "to a staging area in AWS",
        "non-disruptive test launches",
        "cutover in minutes",
      ].map((t, i) => (
        <text key={i} x="38" y={78 + i * 17} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <rect x="290" y="24" width="200" height="120" rx="12" fill={BOX} stroke={EDGE} />
      <text x="390" y="50" textAnchor="middle" fill={TXT} fontSize="13" fontWeight="600">Resilience Hub</text>
      {[
        "define RTO/RPO policies",
        "assess applications",
        "resilience scores",
        "gap recommendations",
      ].map((t, i) => (
        <text key={i} x="308" y={78 + i * 17} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <rect x="560" y="24" width="180" height="120" rx="12" fill={BOX} stroke={EDGE} />
      <text x="650" y="50" textAnchor="middle" fill={TXT} fontSize="13" fontWeight="600">Fault Injection Service</text>
      {[
        "inject AZ outage,",
        "Spot interruption, latency",
        "stop conditions bound risk",
        "observe actual recovery",
      ].map((t, i) => (
        <text key={i} x="578" y={78 + i * 17} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <path d="M220 84 h66" stroke={SUB} strokeWidth="1.5" markerEnd="url(#rt-arrow)" />
      <path d="M490 84 h66" stroke={SUB} strokeWidth="1.5" markerEnd="url(#rt-arrow)" />
      <Note x={20} y={180} width={720} lines={[
        "The testing loop",
        "assert targets (Resilience Hub) → inject failure (FIS) → observe recovery (CloudWatch) → fix gaps → repeat",
      ]} color={GREEN} border="#14532d" />
      <Note x={20} y={266} width={720} lines={[
        "DRS vs backup vs MGN",
        "DRS: minutes RPO/RTO for live servers · backup: hours-level restore · MGN: one-time rehost migration (same engine as DRS)",
      ]} />
      <Note x={20} y={356} width={720} lines={[
        "Exam mapping",
        "“prove RTO/RPO are met and scored” → Resilience Hub · “deliberately break an AZ to test failover” → FIS",
        "“continuous replication for disaster recovery of servers” → DRS · “one-time rehost migration” → MGN",
      ]} color={AMBER} border="#7c5b16" />
    </svg>
  );
}

/** 2.2.12 — SPOF audit. */
export function SpofAuditDiagram() {
  return (
    <svg viewBox="0 0 760 570" width="100%" role="img" aria-label="Single points of failure and their fixes" fontFamily={FONT}>
      <ArrowDefs id="sp-arrow" />
      <text x="170" y="26" textAnchor="middle" fill={RED} fontSize="13.5" fontWeight="600">SPOF design</text>
      <text x="590" y="26" textAnchor="middle" fill={GREEN} fontSize="13.5" fontWeight="600">Resilient fix</text>
      {[
        ["App in one AZ", "ASG across 2+ AZs behind an ALB"],
        ["Single-AZ RDS instance", "Multi-AZ (or Aurora with replicas)"],
        ["One NAT gateway for all AZs", "one NAT per AZ, spoke-local routes"],
        ["ALB in a single subnet", "ALB subnets in 2+ AZs"],
        ["EFS One Zone for critical data", "EFS Standard (multi-AZ)"],
        ["Single standalone instance", "ASG + self-healing health checks"],
      ].map(([bad, fix], i) => {
        const y = 44 + i * 70;
        return (
          <g key={bad}>
            <rect x="30" y={y} width="280" height="54" rx="10" fill="#3f1d1d" stroke={RED} />
            <text x="50" y={y + 24} fill={TXT} fontSize="12.5" fontWeight="600">{bad}</text>
            <text x="50" y={y + 44} fill={SUB} fontSize="11">single component dies → tier dies</text>
            <rect x="450" y={y} width="280" height="54" rx="10" fill="#0f2e22" stroke={GREEN} />
            <text x="470" y={y + 34} fill={GREEN} fontSize="12.5">{fix}</text>
            <line x1="314" y1={y + 27} x2="446" y2={y + 27} stroke={SUB} strokeWidth="1.5" markerEnd="url(#sp-arrow)" />
          </g>
        );
      })}
      <Note x={30} y={468} width={700} lines={[
        "How to audit",
        "walk every tier asking “what happens if this dies / this AZ dies / this Region dies” — wherever a human must act, you found a SPOF",
      ]} />
    </svg>
  );
}
