/** Hand-drawn SVG diagrams for the section 1.2 lessons (dark theme). */

const BOX = "#1e293b";
const EDGE = "#475569";
const TXT = "#e2e8f0";
const SUB = "#94a3b8";
const AMBER = "#fbbf24";
const GREEN = "#34d399";
const RED = "#f87171";
const SKY = "#38bdf8";
const FONT = "ui-sans-serif, system-ui, sans-serif";

function ArrowDefs({ id, color = SUB }: { id: string; color?: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={color} />
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

/** 1.2.1 — WAF and Shield at the edge. */
export function WafShieldEdgeDiagram() {
  return (
    <svg viewBox="0 0 760 510" width="100%" role="img" aria-label="WAF and Shield layered defense at the edge" fontFamily={FONT}>
      <ArrowDefs id="ws-arrow" />
      <rect x="20" y="30" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="95" y="58" textAnchor="middle" fill={TXT} fontSize="13">Internet</text>
      <text x="95" y="78" textAnchor="middle" fill={SUB} fontSize="12">users · attackers</text>
      <line x1="170" y1="65" x2="196" y2="65" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ws-arrow)" />
      <rect x="200" y="16" width="250" height="112" rx="12" fill="#3f1d1d" stroke={RED} />
      <text x="325" y="44" textAnchor="middle" fill={RED} fontSize="14" fontWeight="600">AWS Shield — layers 3 &amp; 4</text>
      <text x="325" y="68" textAnchor="middle" fill={TXT} fontSize="11.5">SYN floods · UDP reflection</text>
      <text x="325" y="88" textAnchor="middle" fill={TXT} fontSize="11.5">volumetric absorption</text>
      <text x="325" y="108" textAnchor="middle" fill={SUB} fontSize="11">Standard free · Advanced +SRT</text>
      <line x1="450" y1="72" x2="476" y2="72" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ws-arrow)" />
      <rect x="480" y="16" width="264" height="112" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="612" y="44" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">AWS WAF — layer 7</text>
      <text x="612" y="68" textAnchor="middle" fill={TXT} fontSize="11.5">SQLi · XSS · rate limits · geo</text>
      <text x="612" y="88" textAnchor="middle" fill={TXT} fontSize="11.5">Bot Control · CAPTCHA</text>
      <text x="612" y="108" textAnchor="middle" fill={SUB} fontSize="11">managed + custom rules</text>
      <path d="M612 128 v24" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ws-arrow)" />
      <rect x="480" y="156" width="264" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="612" y="184" textAnchor="middle" fill={TXT} fontSize="13.5">Your origin</text>
      <text x="612" y="206" textAnchor="middle" fill={SUB} fontSize="12">CloudFront · ALB · API Gateway · AppSync</text>
      <line x1="320" y1="128" x2="320" y2="156" stroke={SUB} strokeWidth="1.2" strokeDasharray="4 4" />
      <Note x={20} y={132} width={360} lines={[
        "Which layer blocks what?",
        "Volumetric floods → Shield (network/transport)",
        "Malicious requests → WAF (application payloads)",
        "Both are inline — bad traffic never reaches origin",
      ]} />
      <Note x={20} y={280} width={724} lines={[
        "WAF web ACL placement",
        "CloudFront scope → CLOUDFRONT (managed in us-east-1)",
        "ALB / API Gateway / AppSync / Cognito pool → scope REGIONAL",
        "One web ACL per resource · rules run in priority order",
        "Actions: Allow, Block, Count, CAPTCHA, Challenge",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={410} width={724} lines={[
        "Rate-based rules",
        "Count requests per source IP over a rolling 5-minute window",
        "Exceed the threshold → temporary automatic block, no rule maintenance",
      ]} />
    </svg>
  );
}

/** 1.2.3 — GuardDuty sources and findings flow. */
export function GuardDutySourcesDiagram() {
  return (
    <svg viewBox="0 0 760 520" width="100%" role="img" aria-label="GuardDuty data sources, detector, and findings flow" fontFamily={FONT}>
      <ArrowDefs id="gd-arrow" />
      <text x="110" y="26" textAnchor="middle" fill={SKY} fontSize="13" fontWeight="600">Data sources (agentless)</text>
      {[
        "CloudTrail management events",
        "VPC Flow Logs",
        "DNS query logs",
        "S3 data events (S3 Protection)",
        "EKS audit logs + runtime events",
        "RDS login / query activity",
        "Lambda network activity logs",
      ].map((t, i) => (
        <g key={t}>
          <rect x="20" y={40 + i * 52} width="260" height="40" rx="10" fill={BOX} stroke={EDGE} />
          <text x="150" y={65 + i * 52} textAnchor="middle" fill={TXT} fontSize="12.5">{t}</text>
          <line x1="280" y1={60 + i * 52} x2="330" y2="245" stroke={SUB} strokeWidth="1" opacity="0.6" markerEnd="url(#gd-arrow)" />
        </g>
      ))}
      <rect x="334" y="180" width="200" height="130" rx="14" fill="#241a0b" stroke="#7c5b16" />
      <text x="434" y="212" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">GuardDuty detector</text>
      <text x="434" y="234" textAnchor="middle" fill={TXT} fontSize="12">ML anomaly detection</text>
      <text x="434" y="254" textAnchor="middle" fill={TXT} fontSize="12">+ threat intelligence feeds</text>
      <text x="434" y="274" textAnchor="middle" fill={TXT} fontSize="12">+ behavior modeling</text>
      <text x="434" y="296" textAnchor="middle" fill={SUB} fontSize="11">delegated admin for the org</text>
      <path d="M534 245 h46" stroke={SUB} strokeWidth="1.5" markerEnd="url(#gd-arrow)" />
      <rect x="584" y="150" width="160" height="190" rx="12" fill={BOX} stroke={EDGE} />
      <text x="664" y="176" textAnchor="middle" fill={TXT} fontSize="13" fontWeight="600">Findings (ASFF)</text>
      {["Critical: exfil, C2", "High: compromised keys", "Medium: recon", "Low: unusual scan"].map((t, i) => (
        <text key={i} x="598" y={204 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <text x="664" y="322" textAnchor="middle" fill={SUB} fontSize="11">severity + affected resource</text>
      <line x1="664" y1="340" x2="664" y2="368" stroke={SUB} strokeWidth="1.5" markerEnd="url(#gd-arrow)" />
      <text x="380" y="400" textAnchor="start" fill={SKY} fontSize="13" fontWeight="600">Destinations &amp; response:</text>
      {[["1", "EventBridge → Lambda/SSM: auto-isolate instance"], ["2", "Security Hub: aggregate + prioritize org-wide"], ["3", "S3 export: long-term finding retention"], ["4", "Malware Protection: EBS scan on suspects"]].map(([n, t], i) => (
        <text key={n} x="400" y={424 + i * 23} fill={TXT} fontSize="12.5">{n}. {t}</text>
      ))}
    </svg>
  );
}

/** 1.2.7 — security groups, NACLs, and Network Firewall placement. */
export function FirewallLayersDiagram() {
  return (
    <svg viewBox="0 0 760 540" width="100%" role="img" aria-label="Where each firewall control sits on the packet path" fontFamily={FONT}>
      <ArrowDefs id="fl-arrow" />
      <rect x="290" y="16" width="180" height="44" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="43" textAnchor="middle" fill={TXT} fontSize="13.5">Inbound packet</text>
      <line x1="380" y1="60" x2="380" y2="88" stroke={SUB} strokeWidth="1.5" markerEnd="url(#fl-arrow)" />
      {[
        { y: 92, title: "Network ACL — subnet boundary", lines: ["Stateless · numbered rules, lowest evaluated first", "Allow AND deny · must allow return (ephemeral) traffic", "Use for: explicit IP blocks, subnet-wide guardrails"] },
        { y: 208, title: "Network Firewall — optional inspection layer", lines: ["Stateful Suricata IPS/IDS · domain filtering · TLS inspection", "Deployed on firewall subnets; central inspection VPC pattern", "Use for: egress control, deep packet inspection, logging"] },
        { y: 324, title: "Security group — instance ENI", lines: ["Stateful · allow-only · every rule evaluated", "Default: deny all inbound, allow all outbound", "Use for: per-instance least-privilege port access"] },
      ].map((layer) => (
        <g key={layer.y}>
          <rect x="150" y={layer.y} width="460" height="96" rx="12" fill={BOX} stroke={EDGE} />
          <text x="380" y={layer.y + 24} textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">{layer.title}</text>
          {layer.lines.map((line, i) => (
            <text key={i} x="170" y={layer.y + 44 + i * 16} fill={TXT} fontSize="12">• {line}</text>
          ))}
          <line x1="380" y1={layer.y + 96} x2="380" y2={layer.y + 118} stroke={SUB} strokeWidth="1.5" markerEnd="url(#fl-arrow)" />
        </g>
      ))}
      <rect x="245" y="442" width="270" height="44" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="469" textAnchor="middle" fill={GREEN} fontSize="13.5">Instance receives traffic</text>
      <text x="380" y="520" textAnchor="middle" fill={SUB} fontSize="12">Return traffic: security groups allow it automatically (stateful); the NACL on the way out must permit the client’s ephemeral ports (stateless).</text>
    </svg>
  );
}

/** 1.2.11 — KMS envelope encryption. */
export function KmsEnvelopeDiagram() {
  return (
    <svg viewBox="0 0 760 545" width="100%" role="img" aria-label="Envelope encryption encrypt and decrypt flow" fontFamily={FONT}>
      <ArrowDefs id="ke-arrow" />
      <rect x="240" y="16" width="280" height="60" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="40" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">KMS customer managed key (CMK)</text>
      <text x="380" y="58" textAnchor="middle" fill={SUB} fontSize="12">never leaves KMS · policy + grants + rotation live here</text>
      <line x1="310" y1="76" x2="180" y2="128" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <line x1="450" y1="76" x2="580" y2="128" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <text x="196" y="96" fill={SUB} fontSize="11.5">GenerateDataKey</text>
      <rect x="80" y="132" width="240" height="92" rx="12" fill={BOX} stroke={EDGE} />
      <text x="200" y="158" textAnchor="middle" fill={TXT} fontSize="13">Data key — PLAINTEXT copy</text>
      <text x="200" y="180" textAnchor="middle" fill={SUB} fontSize="12">encrypts the 5 GB file locally,</text>
      <text x="200" y="200" textAnchor="middle" fill={SUB} fontSize="12">fast, no KMS involvement</text>
      <rect x="440" y="132" width="240" height="92" rx="12" fill={BOX} stroke={EDGE} />
      <text x="560" y="158" textAnchor="middle" fill={TXT} fontSize="13">Data key — ENCRYPTED copy</text>
      <text x="560" y="180" textAnchor="middle" fill={SUB} fontSize="12">returned alongside the plaintext key,</text>
      <text x="560" y="200" textAnchor="middle" fill={SUB} fontSize="12">stored next to the ciphertext</text>
      <line x1="200" y1="224" x2="200" y2="252" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <rect x="80" y="256" width="240" height="70" rx="12" fill="#3f1d1d" stroke={RED} />
      <text x="200" y="282" textAnchor="middle" fill={TXT} fontSize="13">Encrypted FILE (any size)</text>
      <text x="200" y="304" textAnchor="middle" fill={SUB} fontSize="12">plaintext data key discarded from memory</text>
      <line x1="560" y1="224" x2="560" y2="252" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <rect x="440" y="256" width="240" height="70" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="560" y="282" textAnchor="middle" fill={AMBER} fontSize="13">Encrypted data key (blob)</text>
      <text x="560" y="304" textAnchor="middle" fill={SUB} fontSize="12">stored in the file header/metadata</text>
      {/* decrypt */}
      <line x1="560" y1="326" x2="560" y2="354" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <rect x="440" y="358" width="240" height="56" rx="12" fill={BOX} stroke={EDGE} />
      <text x="560" y="380" textAnchor="middle" fill={TXT} fontSize="13">Decrypt(blob) → plaintext key</text>
      <text x="560" y="400" textAnchor="middle" fill={SUB} fontSize="12">needs kms:Decrypt on the CMK</text>
      <line x1="440" y1="386" x2="330" y2="386" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ke-arrow)" />
      <rect x="80" y="358" width="240" height="56" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="200" y="380" textAnchor="middle" fill={GREEN} fontSize="13">File decrypted locally</text>
      <text x="200" y="400" textAnchor="middle" fill={SUB} fontSize="12">KMS touched only once per file</text>
      <Note x={80} y={448} width={600} lines={[
        "Why envelope encryption wins",
        "KMS APIs cap payloads at 4 KB",
        "the data key encrypts any size locally while KMS keeps key governance",
      ]} />
    </svg>
  );
}

/** 1.2.12 — ACM issuance and renewal. */
export function AcmFlowDiagram() {
  return (
    <svg viewBox="0 0 760 430" width="100%" role="img" aria-label="ACM certificate issuance, renewal, and private CA" fontFamily={FONT}>
      <ArrowDefs id="ac-arrow" />
      <rect x="40" y="20" width="300" height="130" rx="12" fill={BOX} stroke={EDGE} />
      <text x="190" y="46" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Public certificates — ACM issued</text>
      {["Free · auto-renews · publicly trusted", "DNS validation (preferred, automated)", "or email validation", "ALB · CloudFront · APIGW · Cognito"].map((t, i) => (
        <text key={i} x="60" y={70 + i * 21} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <rect x="420" y="20" width="300" height="130" rx="12" fill={BOX} stroke={EDGE} />
      <text x="570" y="46" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Private certificates — AWS Private CA</text>
      {["Internal mTLS + service identity", "Offline root → subordinate CAs in ACM", "Per-certificate issuance pricing", "Not publicly trusted — by design"].map((t, i) => (
        <text key={i} x="440" y={70 + i * 21} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      <line x1="190" y1="150" x2="190" y2="188" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ac-arrow)" />
      <line x1="570" y1="150" x2="570" y2="188" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ac-arrow)" />
      <rect x="40" y="192" width="680" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="380" y="218" textAnchor="middle" fill={TXT} fontSize="13.5">Renewal behavior — the exam detail</text>
      <text x="380" y="240" textAnchor="middle" fill={SUB} fontSize="12.5">Issued certs auto-renew while validation records stay intact · imported certs are re-imported manually</text>
      <text x="380" y="260" textAnchor="middle" fill={SUB} fontSize="12.5">CloudFront certificates must be requested in us-east-1</text>
      <Note x={40} y={296} width={680} lines={[
        "Mutual TLS options",
        "ALB trust store · API Gateway custom-domain mTLS · Private CA certs for service identity",
      ]} color={GREEN} border="#14532d" />
      <Note x={40} y={372} width={680} lines={[
        "Selection shortcut",
        "Public hostname → ACM public · internal identity → Private CA · existing cert → import",
      ]} />
    </svg>
  );
}

/** 1.2.13 — Secrets Manager alternating-user rotation. */
export function SecretsRotationDiagram() {
  return (
    <svg viewBox="0 0 760 490" width="100%" role="img" aria-label="Alternating user secret rotation" fontFamily={FONT}>
      <ArrowDefs id="sr-arrow" />
      <rect x="40" y="24" width="180" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="130" y="50" textAnchor="middle" fill={TXT} fontSize="13">Application</text>
      <text x="130" y="70" textAnchor="middle" fill={SUB} fontSize="12">reads AWSCURRENT</text>
      <text x="130" y="88" textAnchor="middle" fill={SUB} fontSize="12">at startup / periodically</text>
      <rect x="290" y="24" width="180" height="80" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="48" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Secrets Manager</text>
      <text x="380" y="66" textAnchor="middle" fill={TXT} fontSize="12">version labels:</text>
      <text x="380" y="84" textAnchor="middle" fill={SUB} fontSize="12">AWSCURRENT · AWSPREVIOUS</text>
      <rect x="540" y="24" width="180" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="630" y="48" textAnchor="middle" fill={TXT} fontSize="13">Rotation Lambda</text>
      <text x="630" y="66" textAnchor="middle" fill={SUB} fontSize="12">triggered on schedule</text>
      <text x="630" y="84" textAnchor="middle" fill={SUB} fontSize="12">(e.g., every 30 days)</text>
      <line x1="220" y1="64" x2="286" y2="64" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sr-arrow)" />
      <line x1="470" y1="52" x2="536" y2="52" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sr-arrow)" />
      <line x1="630" y1="104" x2="630" y2="140" stroke={SUB} strokeWidth="1.5" />
      <line x1="630" y1="140" x2="130" y2="140" stroke={SUB} strokeWidth="1.5" />
      <line x1="130" y1="140" x2="130" y2="172" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sr-arrow)" />
      {/* DB */}
      <rect x="40" y="176" width="680" height="120" rx="14" fill={BOX} stroke={EDGE} />
      <text x="380" y="202" textAnchor="middle" fill={TXT} fontSize="13.5" fontWeight="600">Database — two users, swapped in four steps</text>
          {[
            ["1 create secret v2", "2 test new creds", "3 finish — label swap", "4 wait for removal window"],
          ].map((row) => (
            <g key={row[0]}>
              {row.map((step, i) => (
                <g key={step}>
                  <rect x={56 + i * 170} y={216} width="150" height="56" rx="10" fill="#111c2e" stroke={EDGE} />
                  <text x={131 + i * 170} y={238} textAnchor="middle" fill={SKY} fontSize="12">{step}</text>
                  <text x={131 + i * 170} y={256} textAnchor="middle" fill={SUB} fontSize="11">{["user2 = user1 + password2", "validate against DB", "AWSCURRENT → user2", "user1 retire window"][i]}</text>
                </g>
              ))}
            </g>
          ))}
      <Note x={40} y={324} width={680} lines={[
        "Why alternating users = zero downtime",
        "A valid credential pair always exists for the application",
        "rotation flips between two users instead of changing a password under a live connection",
      ]} color={GREEN} border="#14532d" />
      <Note x={40} y={408} width={680} lines={[
        "Non-RDS secrets rotate too — you supply the Lambda",
        "Secrets Manager handles schedule, versioning, AWSCURRENT labeling",
      ]} />
    </svg>
  );
}

/** 1.2.14 — Nitro Enclaves. */
export function NitroEnclaveDiagram() {
  return (
    <svg viewBox="0 0 760 470" width="100%" role="img" aria-label="Nitro Enclave isolated processing with KMS attestation" fontFamily={FONT}>
      <ArrowDefs id="ne-arrow" />
      <rect x="30" y="30" width="420" height="330" rx="16" fill={BOX} stroke={EDGE} />
      <text x="240" y="58" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Parent EC2 instance (signing service)</text>
      <rect x="60" y="80" width="170" height="60" rx="10" fill="#111c2e" stroke={EDGE} />
      <text x="145" y="104" textAnchor="middle" fill={TXT} fontSize="12">Application + data</text>
      <text x="145" y="124" textAnchor="middle" fill={SUB} fontSize="11">operators can SSH here</text>
      <rect x="250" y="80" width="170" height="240" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="335" y="108" textAnchor="middle" fill={GREEN} fontSize="13.5" fontWeight="600">Nitro Enclave</text>
      {["No persistent storage", "No interactive access", "No external network", "Own isolated kernel", "Runs only the signed image"].map((t, i) => (
        <text key={i} x="268" y={138 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <text x="240" y="344" textAnchor="middle" fill={SUB} fontSize="11.5">even the instance root / SSH admin cannot see inside the enclave</text>
      {/* vsock */}
      <path d="M230 190 h20" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ne-arrow)" />
      <text x="240" y="182" textAnchor="middle" fill={SUB} fontSize="10.5">vsock</text>
      {/* KMS */}
      <rect x="520" y="60" width="210" height="120" rx="14" fill="#241a0b" stroke="#7c5b16" />
      <text x="625" y="88" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">KMS key policy condition</text>
      <text x="625" y="112" textAnchor="middle" fill={TXT} fontSize="12">kms:Recipient AttestationData:</text>
      <text x="625" y="132" textAnchor="middle" fill={TXT} fontSize="12">ImageSha384 = enclave image hash</text>
      <text x="625" y="156" textAnchor="middle" fill={SUB} fontSize="11.5">key usable ONLY inside that enclave</text>
      {/* flow */}
      <path d="M420 140 C480 120, 500 110, 516 104" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#ne-arrow)" />
      <text x="470" y="96" textAnchor="middle" fill={SUB} fontSize="11">attestation document</text>
      <path d="M516 150 C500 180, 480 200, 424 214" stroke={GREEN} strokeWidth="1.5" fill="none" markerEnd="url(#ne-arrow)" />
      <text x="470" y="190" textAnchor="middle" fill={GREEN} fontSize="11">decrypts for valid enclave</text>
      <Note x={30} y={378} width={700} lines={[
        "The exam pattern",
        "Tokenization / card-data processing where even instance admins must not see plaintext",
        "the enclave holds the logic; KMS enforces the hardware proof",
      ]} />
    </svg>
  );
}

/** 1.2.15 — ALB authentication flow. */
export function AlbAuthDiagram() {
  return (
    <svg viewBox="0 0 760 450" width="100%" role="img" aria-label="ALB authentication action flow" fontFamily={FONT}>
      <ArrowDefs id="ab2-arrow" />
      <rect x="20" y="40" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="95" y="70" textAnchor="middle" fill={TXT} fontSize="13">Browser</text>
      <text x="95" y="90" textAnchor="middle" fill={SUB} fontSize="12">unauthenticated</text>
      <rect x="230" y="30" width="200" height="98" rx="14" fill="#241a0b" stroke="#7c5b16" />
      <text x="330" y="58" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">ALB — authenticate action</text>
      {["authenticate-oidc, or", "authenticate-cognito", "redirects if no valid session"].map((t, i) => (
        <text key={i} x="330" y={80 + i * 17} fill={SUB} fontSize="11.5">{t}</text>
      ))}
      <rect x="500" y="30" width="240" height="90" rx="14" fill={BOX} stroke={EDGE} />
      <text x="620" y="58" textAnchor="middle" fill={TXT} fontSize="13.5">Identity provider</text>
      <text x="620" y="80" textAnchor="middle" fill={SUB} fontSize="12">Cognito user pool · any OIDC IdP</text>
      <text x="620" y="100" textAnchor="middle" fill={SUB} fontSize="12">login page + MFA live outside your app</text>
      <path d="M170 60 h56" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ab2-arrow)" />
      <text x="198" y="50" textAnchor="middle" fill={SUB} fontSize="10.5">1. first request</text>
      <path d="M430 55 h66" stroke={RED} strokeWidth="1.5" markerEnd="url(#ab2-arrow)" />
      <text x="463" y="45" textAnchor="middle" fill={RED} fontSize="10.5">2. 302 login redirect</text>
      <path d="M560 120 C540 170, 480 190, 434 200" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#ab2-arrow)" />
      <text x="496" y="168" textAnchor="middle" fill={SUB} fontSize="10.5">3. authenticate + callback</text>
      <path d="M330 120 C330 180, 240 220, 172 240" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#ab2-arrow)" />
      <text x="240" y="215" textAnchor="middle" fill={SUB} fontSize="10.5">4. session cookie set</text>
      <rect x="20" y="250" width="720" height="92" rx="12" fill={BOX} stroke={EDGE} />
      <text x="380" y="276" textAnchor="middle" fill={TXT} fontSize="13.5">5. Authenticated requests forwarded with identity headers</text>
      <text x="380" y="298" textAnchor="middle" fill={SUB} fontSize="12">x-amzn-oidc-data · -identity · -accesstoken carry the assertion</text>
      <text x="380" y="318" textAnchor="middle" fill={SUB} fontSize="12">targets trust the ALB, not the internet · session expiry repeats the flow with no app code</text>
      <Note x={20} y={358} width={720} lines={[
        "API Gateway equivalents",
        "Cognito authorizer → JWT validation · Lambda authorizer → custom logic (results cached with a TTL)",
        "IAM/SigV4 → machine-to-machine · mutual TLS → client certificates",
      ]} />
    </svg>
  );
}

/** 1.2.17 — Session Manager flow. */
export function SsmSessionDiagram() {
  return (
    <svg viewBox="0 0 760 500" width="100%" role="img" aria-label="Session Manager connection flow" fontFamily={FONT}>
      <ArrowDefs id="sm-arrow" />
      <rect x="30" y="40" width="180" height="90" rx="12" fill={BOX} stroke={EDGE} />
      <text x="120" y="70" textAnchor="middle" fill={TXT} fontSize="13">Administrator</text>
      <text x="120" y="92" textAnchor="middle" fill={SUB} fontSize="12">browser or AWS CLI,</text>
      <text x="120" y="110" textAnchor="middle" fill={SUB} fontSize="12">IAM-authenticated</text>
      <rect x="290" y="30" width="200" height="140" rx="14" fill="#241a0b" stroke="#7c5b16" />
      <text x="390" y="58" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Systems Manager</text>
      {["Brokered TLS channel", "No inbound ports opened", "No SSH keys on hosts", "CloudTrail: who started what", "Session logs → S3/CloudWatch (KMS)"].map((t, i) => (
        <text key={i} x="310" y={82 + i * 18} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <rect x="560" y="40" width="180" height="90" rx="12" fill={BOX} stroke={EDGE} />
      <text x="650" y="68" textAnchor="middle" fill={TXT} fontSize="13">Private instance</text>
      <text x="650" y="90" textAnchor="middle" fill={SUB} fontSize="12">SSM agent, outbound 443,</text>
      <text x="650" y="108" textAnchor="middle" fill={SUB} fontSize="12">no bastion, no public IP</text>
      <path d="M210 78 h76" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
      <path d="M490 78 h66" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
      <text x="248" y="68" textAnchor="middle" fill={SUB} fontSize="10.5">start session (IAM)</text>
      <text x="523" y="68" textAnchor="middle" fill={SUB} fontSize="10.5">agent's outbound channel</text>
      <Note x={30} y={184} width={710} lines={[
        "What you must provision",
        "Instance profile with AmazonSSMManagedInstanceCore",
        "VPC route to SSM endpoints (NAT, or interface endpoints for private-only subnets)",
        "Session logging → S3/CloudWatch, enabled in Session Manager preferences",
      ]} />
      <Note x={30} y={296} width={710} lines={[
        "IMDSv2 — the other half of instance hardening",
        "Metadata requires a PUT-issued session token (hop limit 1) — SSRF-style reads of role credentials stop working",
        "Set HttpTokens=required in the instance metadata options",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={30} y={396} width={710} lines={[
        "Choosing the access path",
        "Shell with audit → Session Manager · one-off commands at scale → Run Command",
        "DB GUI tunnel → port forwarding · dead instance boot debug → EC2 serial console",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 1.2.18 — SigV4 signing flow. */
export function Sigv4FlowDiagram() {
  return (
    <svg viewBox="0 0 760 510" width="100%" role="img" aria-label="SigV4 signing process" fontFamily={FONT}>
      <ArrowDefs id="sv-arrow" />
      {[
        { y: 20, t1: "1. Canonical request", t2: "method · path · sorted query · headers · hashed payload" },
        { y: 108, t1: "2. String to sign", t2: "algorithm · credential scope (date/region/service) · hash of step 1" },
        { y: 196, t1: "3. Derived signing key", t2: "HMAC chain: secret → date → region → service → signing key" },
        { y: 284, t1: "4. Signature → Authorization header", t2: "adds X-Amz-Date, X-Amz-Security-Token (when STS), X-Amz-Content-Sha256" },
      ].map((step) => (
        <g key={step.y}>
          <rect x="60" y={step.y} width="640" height="66" rx="12" fill={BOX} stroke={EDGE} />
          <text x="86" y={step.y + 27} fill={AMBER} fontSize="13.5" fontWeight="600">{step.t1}</text>
          <text x="86" y={step.y + 49} fill={SUB} fontSize="12.5">{step.t2}</text>
          {step.y < 284 && (
            <line x1="380" y1={step.y + 66} x2="380" y2={step.y + 86} stroke={SUB} strokeWidth="1.5" markerEnd="url(#sv-arrow)" />
          )}
        </g>
      ))}
      <path d="M700 317 C730 340, 730 360, 700 372" stroke={GREEN} strokeWidth="1.5" fill="none" markerEnd="url(#sv-arrow)" />
      <rect x="380" y="376" width="320" height="44" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="540" y="403" textAnchor="middle" fill={GREEN} fontSize="13">Service verifies with the same derived key</text>
      <Note x={40} y={376} width={320} lines={[
        "Where it comes from",
        "SDKs and CLIs sign automatically",
        "you see SigV4 only with raw HTTP,",
        "presigning, or debugging signature",
        "mismatch errors",
      ]} />
    </svg>
  );
}
