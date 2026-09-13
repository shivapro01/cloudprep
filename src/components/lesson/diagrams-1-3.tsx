/** Hand-drawn SVG diagrams for the section 1.3 lessons (dark theme). */

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

function wrapLine(line: string, max: number): string[] {
  if (line.length <= max) return [line];
  const words = line.split(" ");
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? cur + " " + w : w;
    if (candidate.length > max && cur) {
      out.push(cur);
      cur = w;
    } else {
      cur = candidate;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function Note({ x, y, width, lines, color = SKY, border = "#1e3a5f" }: { x: number; y: number; width: number; lines: string[]; color?: string; border?: string }) {
  // ~6.2px per character at 12.5px font; wrap so text never leaves the box.
  const maxChars = Math.max(24, Math.floor((width - 40) / 6.2));
  const wrapped = lines.flatMap((l) => wrapLine(l, maxChars));
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

/** 1.3.1 — the S3 access evaluation stack. */
export function S3AccessStackDiagram() {
  return (
    <svg viewBox="0 0 760 500" width="100%" role="img" aria-label="S3 access evaluation stack" fontFamily={FONT}>
      <ArrowDefs id="s3a-arrow" />
      <rect x="240" y="16" width="280" height="44" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="43" textAnchor="middle" fill={TXT} fontSize="13.5">Request to the bucket</text>
      <line x1="380" y1="60" x2="380" y2="86" stroke={SUB} strokeWidth="1.5" markerEnd="url(#s3a-arrow)" />
      {[
        { y: 90, title: "1 · Block Public Access", lines: ["Account-level and bucket-level switches", "Blocks or ignores any public grant before evaluation"] },
        { y: 172, title: "2 · Bucket policy", lines: ["Conditions: SecureTransport, SourceVpce, PrincipalOrgID", "Explicit Deny wins; can grant cross-account"] },
        { y: 254, title: "3 · IAM identity policy", lines: ["Same account: either IAM or bucket policy may allow", "Cross account: both sides must allow"] },
        { y: 336, title: "4 · ACLs (retired)", lines: ["Object Ownership = bucket owner enforced disables ACLs", "Legacy grants only — policies are the model now"] },
      ].map((layer) => (
        <g key={layer.y}>
          <rect x="150" y={layer.y} width="460" height="66" rx="12" fill={BOX} stroke={EDGE} />
          <text x="380" y={layer.y + 23} textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">{layer.title}</text>
          {layer.lines.map((line, i) => (
            <text key={i} x="170" y={layer.y + 41 + i * 15} fill={TXT} fontSize="12">• {line}</text>
          ))}
          <line x1="380" y1={layer.y + 66} x2="380" y2={layer.y + 84} stroke={SUB} strokeWidth="1.5" markerEnd="url(#s3a-arrow)" />
        </g>
      ))}
      <rect x="245" y="424" width="270" height="42" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="450" textAnchor="middle" fill={GREEN} fontSize="13">All four layers pass → access granted</text>
    </svg>
  );
}

/** 1.3.1 — presigned URL flow. */
export function PresignedFlowDiagram() {
  return (
    <svg viewBox="0 0 760 320" width="100%" role="img" aria-label="Presigned URL flow" fontFamily={FONT}>
      <ArrowDefs id="pf-arrow" />
      <rect x="20" y="30" width="160" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="100" y="60" textAnchor="middle" fill={TXT} fontSize="13">Your backend</text>
      <text x="100" y="82" textAnchor="middle" fill={SUB} fontSize="12">checks entitlement,</text>
      <text x="100" y="100" textAnchor="middle" fill={SUB} fontSize="12">signs URL (max 7 days)</text>
      <rect x="280" y="30" width="200" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="380" y="60" textAnchor="middle" fill={TXT} fontSize="13">Browser / client</text>
      <text x="380" y="82" textAnchor="middle" fill={SUB} fontSize="12">uploads or downloads</text>
      <text x="380" y="100" textAnchor="middle" fill={SUB} fontSize="12">directly with the URL</text>
      <rect x="560" y="30" width="180" height="80" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="650" y="60" textAnchor="middle" fill={GREEN} fontSize="13">S3 bucket (private)</text>
      <text x="650" y="82" textAnchor="middle" fill={SUB} fontSize="12">signature validated</text>
      <text x="650" y="100" textAnchor="middle" fill={SUB} fontSize="12">per request</text>
      <path d="M180 62 h96" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />
      <text x="228" y="52" textAnchor="middle" fill={SUB} fontSize="10.5">1. presigned URL</text>
      <path d="M480 62 h76" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />
      <text x="518" y="52" textAnchor="middle" fill={SUB} fontSize="10.5">2. GET / PUT</text>
      <Note x={20} y={150} width={720} lines={[
        "Signing details the exam checks",
        "SSE-KMS uploads: the encryption headers must be present when the URL is signed",
        "Expiry is capped at 7 days with SigV4 · object ACL changes do not affect an already-issued URL",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={240} width={720} lines={[
        "Why this pattern exists",
        "The backend never proxies bytes — bandwidth and compute stay with S3 while entitlement stays with your app",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.3.2 — Object Lock modes. */
export function ObjectLockDiagram() {
  return (
    <svg viewBox="0 0 760 375" width="100%" role="img" aria-label="Object Lock modes and legal hold" fontFamily={FONT}>
      <ArrowDefs id="ol-arrow" />
      {[
        { x: 20, title: "Governance mode", color: SKY, lines: ["Users with s3:BypassGovernance", "can delete/overwrite early", "Good for internal retention"], badge: "bypassable" },
        { x: 265, title: "Compliance mode", color: GREEN, lines: ["Nobody — including root —", "can relax or remove the", "retention until it expires"], badge: "absolute" },
        { x: 510, title: "Legal hold", color: AMBER, lines: ["No retention date at all —", "stays locked until explicitly", "released (litigation holds)"], badge: "indefinite" },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="20" width="230" height="150" rx="12" fill={BOX} stroke={EDGE} />
          <text x={card.x + 115} y="48" textAnchor="middle" fill={card.color} fontSize="14" fontWeight="600">{card.title}</text>
          {card.lines.map((line, i) => (
            <text key={i} x={card.x + 18} y={76 + i * 22} fill={TXT} fontSize="12.5">{line}</text>
          ))}
          <rect x={card.x + 18} y="136" width="120" height="24" rx="12" fill="#0b1526" stroke={EDGE} />
          <text x={card.x + 78} y="152" textAnchor="middle" fill={SUB} fontSize="11">{card.badge}</text>
        </g>
      ))}
      <Note x={20} y={196} width={720} lines={[
        "Prerequisites and mechanics",
        "Versioning must be enabled on the bucket · locks apply per object version, not per bucket",
        "Retention period set per object or as a bucket default · compliance mode cannot be undone once applied",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={282} width={720} lines={[
        "Exam mapping",
        "“retain for 7 years, nobody can delete” → compliance mode · “delete blocked unless special permission” → governance",
        "“hold until litigation ends, no date known” → legal hold",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.3.3 — default-on vs opt-in encryption at rest. */
export function EncryptionDefaultDiagram() {
  return (
    <svg viewBox="0 0 760 485" width="100%" role="img" aria-label="Encryption at rest defaults by service" fontFamily={FONT}>
      <ArrowDefs id="ed-arrow" />
      <rect x="20" y="20" width="350" height="170" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="195" y="48" textAnchor="middle" fill={GREEN} fontSize="14" fontWeight="600">Encrypted by default — no action</text>
      {[
        "S3 — all new objects get SSE-S3 automatically",
        "DynamoDB — tables always encrypted at rest",
        "S3 on Outposts · S3 Express (session-key model)",
      ].map((t, i) => (
        <text key={i} x="40" y={76 + i * 26} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <text x="195" y="166" textAnchor="middle" fill={SUB} fontSize="11.5">switching to a CMK is still a customer choice</text>
      <rect x="390" y="20" width="350" height="170" rx="12" fill="#3f1d1d" stroke={RED} />
      <text x="565" y="48" textAnchor="middle" fill={RED} fontSize="14" fontWeight="600">Opt-in — must be enabled deliberately</text>
      {[
        "EBS — per-volume, or Region-wide default setting",
        "RDS / Aurora — chosen at instance creation",
        "EFS — chosen at file system creation",
        "Redshift, ElastiCache, OpenSearch — at creation",
      ].map((t, i) => (
        <text key={i} x="410" y={76 + i * 26} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <text x="565" y="166" textAnchor="middle" fill={SUB} fontSize="11.5">detect with Config rules, fix with re-creation</text>
      <Note x={20} y={216} width={720} lines={[
        "Retrofitting existing data — the exam sequence",
        "S3: Batch Operations copy re-writes objects under the new key · EBS: snapshot → encrypted copy → new volume",
        "RDS: snapshot → copy with encryption → restore · unencrypted snapshots cannot be encrypted in place",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={312} width={720} lines={[
        "Key choice per store",
        "AWS owned (no visibility) · AWS managed (service key)",
        "customer managed CMK (policies, rotation, audit) · DSSE-KMS (two layers)",
      ]} />
      <Note x={20} y={384} width={720} lines={[
        "Snapshot rule",
        "Copies inherit source encryption unless you specify a destination key",
        "cross-account encrypted copies need the key shared too",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.3.4 — encryption in transit paths. */
export function TransitEncryptionDiagram() {
  return (
    <svg viewBox="0 0 760 440" width="100%" role="img" aria-label="Encryption in transit by path" fontFamily={FONT}>
      <ArrowDefs id="te-arrow" />
      {/* user to aws */}
      <rect x="20" y="24" width="160" height="64" rx="12" fill={BOX} stroke={EDGE} />
      <text x="100" y="50" textAnchor="middle" fill={TXT} fontSize="13">Users → AWS</text>
      <text x="100" y="70" textAnchor="middle" fill={SUB} fontSize="12">internet path</text>
      <rect x="300" y="24" width="220" height="64" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="410" y="50" textAnchor="middle" fill={GREEN} fontSize="13">TLS with ACM certificates</text>
      <text x="410" y="70" textAnchor="middle" fill={SUB} fontSize="12">CloudFront · ALB · API Gateway</text>
      <line x1="180" y1="56" x2="296" y2="56" stroke={SUB} strokeWidth="1.5" markerEnd="url(#te-arrow)" />
      <line x1="520" y1="56" x2="600" y2="56" stroke={SUB} strokeWidth="1.5" markerEnd="url(#te-arrow)" />
      <rect x="604" y="24" width="140" height="64" rx="12" fill={BOX} stroke={EDGE} />
      <text x="674" y="50" textAnchor="middle" fill={TXT} fontSize="13">Enforce on S3</text>
      <text x="674" y="70" textAnchor="middle" fill={SUB} fontSize="12">SecureTransport</text>
      {/* on prem to aws */}
      <rect x="20" y="140" width="160" height="76" rx="12" fill={BOX} stroke={EDGE} />
      <text x="100" y="168" textAnchor="middle" fill={TXT} fontSize="13">On-premises → AWS</text>
      <text x="100" y="188" textAnchor="middle" fill={SUB} fontSize="12">hybrid path</text>
      <rect x="300" y="132" width="440" height="96" rx="12" fill={BOX} stroke={EDGE} />
      {[
        ["Site-to-Site VPN", "IPsec tunnels over the internet — fast to stand up, encrypted by default"],
        ["Direct Connect", "dedicated private bandwidth — add MACsec (10/100G) or DX+VPN for encryption"],
        ["CloudFront / PrivateLink", "edge TLS and private connectivity without internet exposure"],
      ].map(([t, d], i) => (
        <g key={t}>
          <text x="322" y={156 + i * 26} fill={AMBER} fontSize="12.5" fontWeight="600">{t}</text>
          <text x="480" y={156 + i * 26} fill={SUB} fontSize="11.5">{d}</text>
        </g>
      ))}
      <line x1="180" y1="178" x2="296" y2="178" stroke={SUB} strokeWidth="1.5" markerEnd="url(#te-arrow)" />
      {/* vpc to vpc */}
      <rect x="20" y="264" width="160" height="76" rx="12" fill={BOX} stroke={EDGE} />
      <text x="100" y="292" textAnchor="middle" fill={TXT} fontSize="13">VPC ↔ VPC</text>
      <text x="100" y="312" textAnchor="middle" fill={SUB} fontSize="12">inside AWS</text>
      <rect x="300" y="256" width="440" height="96" rx="12" fill={BOX} stroke={EDGE} />
      {[
        ["Peering / Transit Gateway", "stays on the AWS backbone — private, not encrypted"],
        ["PrivateLink", "traffic via interface endpoints — private path, TLS from the app"],
        ["Client-side TLS between services", "the app encrypts; the network just carries ciphertext"],
      ].map(([t, d], i) => (
        <g key={t}>
          <text x="322" y={280 + i * 26} fill={AMBER} fontSize="12.5" fontWeight="600">{t}</text>
          <text x="540" y={280 + i * 26} fill={SUB} fontSize="11.5">{d}</text>
        </g>
      ))}
      <line x1="180" y1="302" x2="296" y2="302" stroke={SUB} strokeWidth="1.5" markerEnd="url(#te-arrow)" />
      <Note x={20} y={372} width={720} lines={[
        "Exam mapping",
        "“encrypted dedicated private 10 Gbps link” → DX with MACsec · “quickly encrypted hybrid connectivity” → VPN · “service traffic must be private AND encrypted” → PrivateLink + TLS",
      ]} />
    </svg>
  );
}

/** 1.3.5 — private service access. */
export function PrivateAccessDiagram() {
  return (
    <svg viewBox="0 0 760 495" width="100%" role="img" aria-label="Gateway endpoints, interface endpoints, and PrivateLink" fontFamily={FONT}>
      <ArrowDefs id="pa-arrow" />
      {/* VPC */}
      <rect x="20" y="20" width="440" height="360" rx="14" fill="#0b1526" stroke="#1e3a5f" />
      <text x="240" y="46" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="600">Your VPC</text>
      <rect x="44" y="66" width="180" height="66" rx="10" fill={BOX} stroke={EDGE} />
      <text x="134" y="92" textAnchor="middle" fill={TXT} fontSize="12.5">Private instances</text>
      <text x="134" y="112" textAnchor="middle" fill={SUB} fontSize="11.5">no public addressing</text>
      {/* gateway endpoint */}
      <rect x="44" y="160" width="180" height="76" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="134" y="186" textAnchor="middle" fill={GREEN} fontSize="12.5" fontWeight="600">Gateway endpoint</text>
      <text x="134" y="206" textAnchor="middle" fill={SUB} fontSize="11">S3 + DynamoDB only</text>
      <text x="134" y="224" textAnchor="middle" fill={SUB} fontSize="11">free · route-table based</text>
      {/* interface endpoint */}
      <rect x="256" y="160" width="180" height="96" rx="10" fill={BOX} stroke={AMBER} />
      <text x="346" y="186" textAnchor="middle" fill={AMBER} fontSize="12.5" fontWeight="600">Interface endpoint</text>
      <text x="346" y="206" textAnchor="middle" fill={SUB} fontSize="11">ENIs in your subnets</text>
      <text x="346" y="224" textAnchor="middle" fill={SUB} fontSize="11">any service · private DNS</text>
      <text x="346" y="242" textAnchor="middle" fill={SUB} fontSize="11">hourly + per GB</text>
      <path d="M224 99 C280 120, 280 150, 240 164" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#pa-arrow)" />
      <text x="246" y="130" textAnchor="middle" fill={SUB} fontSize="10.5">route entry</text>
      <path d="M224 99 C300 110, 320 130, 344 158" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#pa-arrow)" />
      <text x="344" y="128" textAnchor="middle" fill={SUB} fontSize="10.5">DNS points here</text>
      <path d="M134 236 v40" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pa-arrow)" />
      <path d="M346 256 v20" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pa-arrow)" />
      <rect x="44" y="290" width="392" height="66" rx="10" fill={BOX} stroke={EDGE} />
      <text x="240" y="314" textAnchor="middle" fill={TXT} fontSize="12.5">AWS services reached privately: S3, DynamoDB, STS,</text>
      <text x="240" y="334" textAnchor="middle" fill={SUB} fontSize="12">ECR, Secrets Manager, KMS, SNS, and dozens more</text>
      {/* PrivateLink */}
      <rect x="500" y="20" width="240" height="200" rx="14" fill={BOX} stroke={EDGE} />
      <text x="620" y="48" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">AWS PrivateLink</text>
      <text x="620" y="70" textAnchor="middle" fill={SUB} fontSize="11.5">publish YOUR service</text>
      {[
        "Endpoint service backed by an NLB",
        "Consumers create interface endpoints",
        "No peering, no route exposure",
        "Works cross-account and with partners",
      ].map((t, i) => (
        <text key={i} x="520" y={96 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <Note x={500} y={240} width={240} lines={[
        "Endpoint policies",
        "Pin a gateway endpoint to specific buckets — access beyond them is denied at the endpoint",
      ]} />
      {/* comparison note */}
      <Note x={20} y={400} width={720} lines={[
        "Selection shortcut",
        "S3/DynamoDB privately and free → gateway endpoint · other AWS services privately → interface endpoint",
        "expose your own service privately to other VPCs/accounts → PrivateLink",
      ]} />
    </svg>
  );
}

/** 1.3.6 — CloudTrail audit pipeline. */
export function CloudTrailAuditDiagram() {
  return (
    <svg viewBox="0 0 760 480" width="100%" role="img" aria-label="CloudTrail audit pipeline" fontFamily={FONT}>
      <ArrowDefs id="cta-arrow" />
      <rect x="20" y="30" width="220" height="180" rx="12" fill={BOX} stroke={EDGE} />
      <text x="130" y="56" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Event types</text>
      {[
        "Management events (default):",
        "control-plane API calls",
        "Data events (opt-in):",
        "S3 object reads/writes, Lambda invokes",
        "Advanced event selectors scope them",
      ].map((t, i) => (
        <text key={i} x="38" y={82 + i * 22} fill={i < 2 ? SUB : TXT} fontSize="12">{t}</text>
      ))}
      <rect x="300" y="40" width="180" height="160" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="390" y="68" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Trail</text>
      {["single-Region", "organization trail:", "all member accounts", "one central S3 bucket", "CloudWatch Logs delivery"].map((t, i) => (
        <text key={i} x="318" y={94 + i * 22} fill={TXT} fontSize="12">{t}</text>
      ))}
      <rect x="540" y="40" width="200" height="160" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="640" y="68" textAnchor="middle" fill={GREEN} fontSize="13.5" fontWeight="600">Integrity validation</text>
      {["hourly signed digest files", "validate against the logs", "tamper-evident history", "query with Athena in S3"].map((t, i) => (
        <text key={i} x="558" y={94 + i * 22} fill={TXT} fontSize="12">{t}</text>
      ))}
      <line x1="240" y1="120" x2="296" y2="120" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cta-arrow)" />
      <line x1="480" y1="120" x2="536" y2="120" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cta-arrow)" />
      <Note x={20} y={240} width={720} lines={[
        "Data events vs server access logs (S3)",
        "CloudTrail data events: principal identity, rich context, Athena-ready — the audit-grade record",
        "server access logs: request-level detail but weaker identity — not a substitute when “who” matters",
      ]} />
      <Note x={20} y={326} width={720} lines={[
        "Cost control",
        "data events on every bucket is expensive — advanced event selectors scope logging to chosen buckets/prefixes and event types",
      ]} />
      <Note x={20} y={412} width={720} lines={[
        "Neighbors",
        "Config records resource configuration over time · CloudWatch Logs powers near-real-time alerting — neither replaces CloudTrail’s API record",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.3.7 — network visibility trio. */
export function NetworkVisibilityDiagram() {
  return (
    <svg viewBox="0 0 760 440" width="100%" role="img" aria-label="Flow logs, traffic mirroring, reachability analysis" fontFamily={FONT}>
      <ArrowDefs id="nv-arrow" />
      <rect x="20" y="24" width="220" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="130" y="50" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">VPC Flow Logs</text>
      {["metadata per connection:", "accept/reject, bytes, ports", "VPC / subnet / ENI scope", "custom field formats", "→ CloudWatch or S3 + Athena"].map((t, i) => (
        <text key={i} x="38" y={76 + i * 20} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <rect x="270" y="24" width="220" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="380" y="50" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Traffic Mirroring</text>
      {["copies FULL packets", "from an ENI to an appliance", "or NLB target — passive IDS,", "content inspection, forensics", "filter expressions scope what’s copied"].map((t, i) => (
        <text key={i} x="288" y={76 + i * 20} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <rect x="520" y="24" width="220" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="630" y="50" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Reachability Analyzer</text>
      {["virtual path test —", "no packets are sent", "names the component", "blocking a route (SG, NACL,", "route table) between two points"].map((t, i) => (
        <text key={i} x="538" y={76 + i * 20} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <Note x={20} y={210} width={720} lines={[
        "Choosing per question",
        "“prove the security group rejected it” → Flow Logs with REJECT entries · “deep-packet inspect a copy of traffic” → Traffic Mirroring",
        "“why can’t A reach B — without sending anything” → Reachability Analyzer",
      ]} />
      <Note x={20} y={316} width={720} lines={[
        "Network Access Analyzer — the fourth sibling",
        "defines intended reachability org-wide and lists every path that violates the intent — an audit at configuration level",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={384} width={720} lines={[
        "Answering with Athena",
        "flow logs in S3 partitioned hourly + Athena = “who talked to this instance on port 22 last Tuesday” in seconds",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.3.8 — isolation and residency. */
export function SovereigntyDiagram() {
  return (
    <svg viewBox="0 0 760 440" width="100%" role="img" aria-label="Data isolation and residency controls" fontFamily={FONT}>
      <ArrowDefs id="so-arrow" />
      {/* EU */}
      <rect x="20" y="20" width="340" height="220" rx="14" fill="#0b1526" stroke="#1e3a5f" />
      <text x="190" y="46" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="600">EU Region — personal data</text>
      <rect x="40" y="64" width="140" height="56" rx="10" fill={BOX} stroke={EDGE} />
      <text x="110" y="88" textAnchor="middle" fill={TXT} fontSize="12">Primary bucket</text>
      <text x="110" y="106" textAnchor="middle" fill={SUB} fontSize="11">eu-west-1</text>
      <rect x="200" y="64" width="140" height="56" rx="10" fill={BOX} stroke={EDGE} />
      <text x="270" y="88" textAnchor="middle" fill={TXT} fontSize="12">Replica bucket</text>
      <text x="270" y="106" textAnchor="middle" fill={SUB} fontSize="11">eu-central-1</text>
      <path d="M180 92 h20" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#so-arrow)" />
      <text x="190" y="140" textAnchor="middle" fill={SUB} fontSize="11">replication stays inside the EU</text>
      <rect x="40" y="160" width="300" height="62" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="190" y="184" textAnchor="middle" fill={GREEN} fontSize="12">Controls: SCP denies writes to non-EU buckets</text>
      <text x="190" y="206" textAnchor="middle" fill={SUB} fontSize="11.5">(aws:ResourceOrgID / region conditions) · no CRR out</text>
      {/* wrong way */}
      <rect x="400" y="20" width="340" height="220" rx="14" fill="#3f1d1d" stroke={RED} />
      <text x="570" y="46" textAnchor="middle" fill={RED} fontSize="14" fontWeight="600">Patterns that violate residency</text>
      {[
        "Cross-Region Replication to us-east-1 “for DR”",
        "Multi-Region Access Point with non-EU replicas",
        "Global tables spreading personal data wide",
        "Staff access from outside the EU without controls",
      ].map((t, i) => (
        <text key={i} x="420" y={76 + i * 26} fill={TXT} fontSize="12.5">✕ {t}</text>
      ))}
      <text x="570" y="188" textAnchor="middle" fill={SUB} fontSize="11.5">encryption does not relocate data —</text>
      <text x="570" y="208" textAnchor="middle" fill={SUB} fontSize="11.5">encrypted copies still “leave” the EU</text>
      {/* isolation */}
      <rect x="20" y="264" width="340" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="190" y="290" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Cross-account isolation</text>
      {[
        "separate accounts = strongest blast-radius wall",
        "backups land in a security account’s vault",
        "workload accounts keep read-only IAM at most",
        "deletion authority lives only in the vault owner",
      ].map((t, i) => (
        <text key={i} x="40" y={316 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <rect x="400" y="264" width="340" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="570" y="290" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Access-point pinning</text>
      {[
        "VPC-attached access points deny any other path",
        "gateway endpoint policies pin buckets to the VPC",
        "bucket policies condition on SourceVpce + OrgID",
        "staff access still via IAM — network can’t be bypassed",
      ].map((t, i) => (
        <text key={i} x="420" y={316 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
    </svg>
  );
}
