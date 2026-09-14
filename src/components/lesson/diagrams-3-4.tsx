/** Hand-drawn SVG diagrams for the section 3.4 lessons (dark theme). */

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

/** 3.4.1 — AZ spread with per-AZ NAT. */
export function AzSpreadDiagram() {
  return (
    <svg viewBox="0 0 760 490" width="100%" role="img" aria-label="Multi-AZ subnet and NAT layout" fontFamily={FONT}>
      <ArrowDefs id="az-arrow" />
      {[
        { x: 20, az: "AZ A", cidr: "10.0.1.0/24 pub · 10.0.11.0/24 priv" },
        { x: 265, az: "AZ B", cidr: "10.0.2.0/24 pub · 10.0.12.0/24 priv" },
        { x: 510, az: "AZ C", cidr: "10.0.3.0/24 pub · 10.0.13.0/24 priv" },
      ].map((col) => (
        <g key={col.x}>
          <rect x={col.x} y="20" width="230" height="180" rx="12" fill={BOX} stroke={EDGE} />
          <text x={col.x + 115} y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">{col.az}</text>
          <text x={col.x + 115} y="64" textAnchor="middle" fill={SUB} fontSize="11">{col.cidr}</text>
          <rect x={col.x + 18} y="78" width="194" height="48" rx="8" fill="#0f2e22" stroke={GREEN} />
          <text x={col.x + 115} y="98" textAnchor="middle" fill={GREEN} fontSize="12">NAT gateway (local)</text>
          <text x={col.x + 115} y="116" textAnchor="middle" fill={SUB} fontSize="11">private route → this NAT</text>
          <rect x={col.x + 18} y="138" width="194" height="48" rx="8" fill="#111c2e" stroke={EDGE} />
          <text x={col.x + 115} y="158" textAnchor="middle" fill={TXT} fontSize="12">app tier (2+ instances)</text>
          <text x={col.x + 115} y="176" textAnchor="middle" fill={SUB} fontSize="11">ALB targets span all AZs</text>
        </g>
      ))}
      <Note x={20} y={222} width={720} lines={[
        "The per-AZ egress rule",
        "each private subnet routes 0.0.0.0/0 to its own AZ’s NAT gateway — one shared NAT turns an AZ failure into a full egress outage",
      ]} />
      <Note x={20} y={308} width={720} lines={[
        "Sizing guardrails",
        "5 VPCs, 200 subnets, 5,000 route tables per Region by default · /24 per tier per AZ is the efficient carve",
        "default VPC quota is 5 per Region — request increases before onboarding fleets",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={398} width={720} lines={[
        "Interfaces beyond NAT",
        "gateway endpoints (S3/DynamoDB, free) + interface endpoints (everything else, hourly + per GB) keep private subnets off NAT",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 3.4.2 — DX vs VPN vs DX Gateway. */
export function HybridConnectivityDiagram() {
  return (
    <svg viewBox="0 0 760 440" width="100%" role="img" aria-label="Hybrid connectivity options" fontFamily={FONT}>
      <ArrowDefs id="hc-arrow" />
      <rect x="20" y="60" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="95" y="90" textAnchor="middle" fill={TXT} fontSize="13">On-premises</text>
      <text x="95" y="112" textAnchor="middle" fill={SUB} fontSize="12">data center</text>
      {[
        { y: 24, title: "Site-to-Site VPN", color: SKY, lines: ["2 IPsec tunnels · ~1.25 Gbps each", "ECMP across tunnels · BGP failover", "hours to deploy · encrypted by default"] },
        { y: 170, title: "Direct Connect", color: AMBER, lines: ["dedicated 1/10/100 Gbps · hosted 50M–10G", "LAG bundling · MACsec on 10/100G dedicated", "DX Gateway → VPCs in many Regions"] },
        { y: 316, title: "DX + VPN backup", color: GREEN, lines: ["private VIF for primary traffic", "VPN over DX as encrypted failover", "compliance-grade resilient pattern"] },
      ].map((row) => (
        <g key={row.y}>
          <rect x="250" y={row.y} width="280" height="110" rx="12" fill={BOX} stroke={EDGE} />
          <text x="390" y={row.y + 26} textAnchor="middle" fill={row.color} fontSize="13.5" fontWeight="600">{row.title}</text>
          {row.lines.map((line, i) => (
            <text key={i} x="270" y={row.y + 50 + i * 20} fill={TXT} fontSize="12">• {line}</text>
          ))}
          <line x1="170" y1="95" x2="246" y2={row.y + 55} stroke={SUB} strokeWidth="1.5" markerEnd="url(#hc-arrow)" />
          <rect x="570" y={row.y + 20} width="170" height="70" rx="10" fill="#0b1526" stroke="#1e3a5f" />
          <text x="655" y={row.y + 48} textAnchor="middle" fill={SUB} fontSize="11.5">
            {row.y === 24 ? "internet path" : row.y === 170 ? "private fiber" : "both paths"}
          </text>
          <text x="655" y={row.y + 68} textAnchor="middle" fill={SUB} fontSize="11.5">
            {row.y === 24 ? "variable latency" : row.y === 170 ? "consistent latency" : "automatic failover"}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** 3.4.3 — Transit Gateway routing with a shared-services exception. */
export function TgwRoutingDiagram() {
  return (
    <svg viewBox="0 0 760 515" width="100%" role="img" aria-label="Transit Gateway route table design" fontFamily={FONT}>
      <ArrowDefs id="tg-arrow" />
      <rect x="240" y="16" width="280" height="60" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="42" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Transit Gateway</text>
      <text x="380" y="62" textAnchor="middle" fill={SUB} fontSize="12">route table per tenant type</text>
      {[
        { x: 20, label: "Prod VPC", table: "prod-rt" },
        { x: 280, label: "Shared VPC", table: "shared-rt" },
        { x: 540, label: "Dev VPC", table: "dev-rt" },
      ].map((v) => (
        <g key={v.label}>
          <rect x={v.x} y="120" width="200" height="64" rx="10" fill={BOX} stroke={EDGE} />
          <text x={v.x + 100} y="146" textAnchor="middle" fill={TXT} fontSize="12.5">{v.label}</text>
          <text x={v.x + 100} y="166" textAnchor="middle" fill={SUB} fontSize="11.5">associated: {v.table}</text>
          <line x1="380" y1="76" x2={v.x + 100} y2="116" stroke={SUB} strokeWidth="1.2" markerEnd="url(#tg-arrow)" />
        </g>
      ))}
      {[
        { y: 224, title: "prod-rt: 10.0.0.0/8 → prod + shared only", sub: "Prod reaches prod + shared services · NOT dev" },
        { y: 286, title: "dev-rt: 10.0.0.0/8 → dev + shared only", sub: "Dev reaches dev + shared services · NOT prod" },
        { y: 348, title: "shared-rt: 10.0.0.0/8 → all attachments", sub: "Shared services (DNS, logging) reachable from everyone" },
      ].map((row) => (
        <g key={row.y}>
          <rect x="120" y={row.y} width="520" height="52" rx="10" fill="#0b1526" stroke="#1e3a5f" />
          <text x="380" y={row.y + 22} textAnchor="middle" fill={SKY} fontSize="12.5" fontWeight="600">{row.title}</text>
          <text x="380" y={row.y + 40} textAnchor="middle" fill={SUB} fontSize="11.5">{row.sub}</text>
        </g>
      ))}
      <Note x={60} y={424} width={640} lines={[
        "The TGW exam pattern",
        "associate each attachment with its route table + propagate only allowed routes — isolation lives in the tables, not the firewall",
      ]} />
    </svg>
  );
}

/** 3.4.4 — CloudFront request flow through cache layers and edge functions. */
export function CloudFrontFlowDiagram() {
  return (
    <svg viewBox="0 0 760 500" width="100%" role="img" aria-label="CloudFront cache and edge compute flow" fontFamily={FONT}>
      <ArrowDefs id="cf-arrow" />
      <rect x="16" y="60" width="120" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="76" y="92" textAnchor="middle" fill={TXT} fontSize="12.5">Viewer</text>
      <text x="76" y="112" textAnchor="middle" fill={SUB} fontSize="11">request</text>
      {[
        { x: 176, title: "Edge location", sub: ["cache lookup by key", "Functions: URL rewrites", "field-level decrypt"] },
        { x: 342, title: "Origin Shield (optional)", sub: ["collapses misses", "one origin fetch", "protects capacity"] },
        { x: 516, title: "Origin", sub: ["ALB / S3 + OAC", "custom / API", "signed URL checks"] },
      ].map((stage) => (
        <g key={stage.x}>
          <rect x={stage.x} y="24" width="150" height="140" rx="12" fill={BOX} stroke={EDGE} />
          <text x={stage.x + 75} y="50" textAnchor="middle" fill={AMBER} fontSize="12.5" fontWeight="600">{stage.title}</text>
          {stage.sub.map((line, i) => (
            <text key={i} x={stage.x + 14} y={76 + i * 22} fill={TXT} fontSize="11.5">• {line}</text>
          ))}
        </g>
      ))}
      <line x1="136" y1="95" x2="172" y2="95" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cf-arrow)" />
      <line x1="326" y1="95" x2="338" y2="95" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cf-arrow)" />
      <line x1="492" y1="95" x2="512" y2="95" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cf-arrow)" />
      <Note x={16} y={196} width={728} lines={[
        "Lambda@Edge vs CloudFront Functions",
        "Functions: viewer request/response rewrites (sub-ms, cheapest) · Lambda@Edge: origin request/response + auth, signing, heavy transforms",
        "ordinary origin logic stays at the origin — edge compute is for the request path",
      ]} />
      <Note x={16} y={300} width={728} lines={[
        "Private origins and authorized delivery",
        "S3 origins: Origin Access Control (no public bucket) · signed URLs/cookies: time-boxed, IP-restricted access per user",
        "field-level encryption: sensitive form fields encrypted at the edge with the origin’s public key",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={16} y={408} width={728} lines={[
        "Logging",
        "standard logs (S3, delayed/batched) vs real-time logs (Kinesis, seconds, sampled) — match the debugging urgency",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 3.4.5 — DNS health routing decision. */
export function DnsHealthRoutingDiagram() {
  return (
    <svg viewBox="0 0 760 475" width="100%" role="img" aria-label="Latency routing with health-driven failover" fontFamily={FONT}>
      <ArrowDefs id="dh-arrow" />
      <rect x="20" y="56" width="130" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="85" y="86" textAnchor="middle" fill={TXT} fontSize="12.5">EU resolver</text>
      <text x="85" y="106" textAnchor="middle" fill={SUB} fontSize="11">DNS query</text>
      <rect x="220" y="40" width="320" height="102" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="66" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Latency records + health</text>
      {[
        "alias → eu-west-1 ALB · health check H1",
        "alias → us-east-1 ALB · health check H2",
        "resolver location picks lowest-latency healthy record",
      ].map((t, i) => (
        <text key={i} x="240" y={90 + i * 18} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      <rect x="590" y="30" width="150" height="60" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="665" y="54" textAnchor="middle" fill={GREEN} fontSize="12">H1 healthy</text>
      <text x="665" y="72" textAnchor="middle" fill={GREEN} fontSize="12">serve EU endpoint</text>
      <rect x="590" y="110" width="150" height="60" rx="10" fill="#3f1d1d" stroke={RED} />
      <text x="665" y="134" textAnchor="middle" fill={RED} fontSize="12">H1 failing</text>
      <text x="665" y="152" textAnchor="middle" fill={RED} fontSize="12">serve US endpoint</text>
      <line x1="150" y1="91" x2="216" y2="91" stroke={SUB} strokeWidth="1.5" markerEnd="url(#dh-arrow)" />
      <line x1="540" y1="80" x2="586" y2="66" stroke={SUB} strokeWidth="1.5" markerEnd="url(#dh-arrow)" />
      <line x1="540" y1="108" x2="586" y2="136" stroke={SUB} strokeWidth="1.5" markerEnd="url(#dh-arrow)" />
      <Note x={20} y={200} width={720} lines={[
        "Health check sources",
        "endpoint HTTP/HTTPS or TCP checks · calculated (child AND/OR) · CloudWatch alarm-backed checks for metric health",
        "private hosted zones resolvable only inside linked VPCs — health checks observe via public or VPC endpoints",
      ]} />
      <Note x={20} y={304} width={720} lines={[
        "Alias vs CNAME at the edge",
        "alias A/AAAA records point at AWS resources (ALB, CloudFront, S3 website) with no extra lookup and no charge",
        "zone apex names cannot be CNAMEs — aliases are the only apex answer",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={380} width={720} lines={[
        "Resolver pieces",
        "inbound endpoints answer on-premises DNS over DX/VPN · outbound endpoints forward VPC queries to corporate DNS · query logging to S3/CloudWatch",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}
