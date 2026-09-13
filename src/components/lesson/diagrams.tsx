/** Hand-drawn SVG diagrams for the section 1.1 lessons (dark theme). */

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

/** 1.1.2 — IAM policy evaluation flow. */
export function PolicyEvaluationDiagram() {
  return (
    <svg viewBox="0 0 760 780" width="100%" role="img" aria-label="IAM policy evaluation flow" fontFamily={FONT}>
      <ArrowDefs id="pe-arrow" />
      {/* start */}
      <rect x="230" y="16" width="300" height="44" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="43" textAnchor="middle" fill={TXT} fontSize="14">Request arrives (principal, action, resource)</text>
      <line x1="380" y1="60" x2="380" y2="86" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pe-arrow)" />

      {[
        { y: 90, label: "SCP: explicit Deny for this action?", no: 146 },
        { y: 168, label: "Resource policy: explicit Deny?", no: 224 },
        { y: 246, label: "Identity policy: explicit Deny?", no: 302 },
      ].map((n) => (
        <g key={n.y}>
          <rect x="230" y={n.y} width="300" height="44" rx="10" fill={BOX} stroke={EDGE} />
          <text x="380" y={n.y + 27} textAnchor="middle" fill={TXT} fontSize="14">{n.label}</text>
          <path d={`M530 ${n.y + 22} h55 v-10`} stroke={RED} strokeWidth="1.5" fill="none" markerEnd="url(#pe-arrow)" />
          <rect x="585" y={n.y - 6} width="150" height="40" rx="10" fill="#3f1d1d" stroke={RED} />
          <text x="660" y={n.y + 19} textAnchor="middle" fill={RED} fontSize="14">DENIED</text>
          <line x1="380" y1={n.y + 44} x2="380" y2={n.no} stroke={SUB} strokeWidth="1.5" markerEnd="url(#pe-arrow)" />
          <text x="394" y={n.y + 62} fill={SUB} fontSize="12">No</text>
        </g>
      ))}

      {/* allow decision */}
      <rect x="230" y="324" width="300" height="56" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="347" textAnchor="middle" fill={TXT} fontSize="14">Is there an explicit Allow in the</text>
      <text x="380" y="366" textAnchor="middle" fill={TXT} fontSize="14">identity policy OR resource policy?</text>
      <path d="M530 352 h55 v-10" stroke={RED} strokeWidth="1.5" fill="none" markerEnd="url(#pe-arrow)" />
      <rect x="585" y="320" width="150" height="40" rx="10" fill="#3f1d1d" stroke={RED} />
      <text x="660" y="345" textAnchor="middle" fill={RED} fontSize="14">DENIED</text>
      <text x="668" y="376" textAnchor="middle" fill={SUB} fontSize="11">(implicit deny)</text>
      <line x1="380" y1="380" x2="380" y2="404" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pe-arrow)" />
      <text x="394" y="397" fill={SUB} fontSize="12">Yes</text>

      {/* boundaries note */}
      <rect x="230" y="408" width="300" height="70" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="432" textAnchor="middle" fill={TXT} fontSize="14">Permissions boundary / session policy</text>
      <text x="380" y="451" textAnchor="middle" fill={TXT} fontSize="14">also allow it?</text>
      <text x="380" y="469" textAnchor="middle" fill={SUB} fontSize="11">(intersects the permissions above — both must allow)</text>
      <path d="M530 443 h55 v-10" stroke={RED} strokeWidth="1.5" fill="none" markerEnd="url(#pe-arrow)" />
      <rect x="585" y="411" width="150" height="40" rx="10" fill="#3f1d1d" stroke={RED} />
      <text x="660" y="436" textAnchor="middle" fill={RED} fontSize="14">DENIED</text>
      <line x1="380" y1="478" x2="380" y2="506" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pe-arrow)" />
      <text x="394" y="497" fill={SUB} fontSize="12">Yes</text>

      {/* service control final */}
      <rect x="230" y="510" width="300" height="56" rx="10" fill={BOX} stroke={EDGE} />
      <text x="380" y="533" textAnchor="middle" fill={TXT} fontSize="14">Service-specific conditions pass?</text>
      <text x="380" y="552" textAnchor="middle" fill={SUB} fontSize="11">(e.g., resource exists, KMS key grants the caller, MFA condition met)</text>
      <path d="M530 538 h55 v-10" stroke={RED} strokeWidth="1.5" fill="none" markerEnd="url(#pe-arrow)" />
      <rect x="585" y="506" width="150" height="40" rx="10" fill="#3f1d1d" stroke={RED} />
      <text x="660" y="531" textAnchor="middle" fill={RED} fontSize="14">DENIED</text>
      <line x1="380" y1="566" x2="380" y2="594" stroke={SUB} strokeWidth="1.5" markerEnd="url(#pe-arrow)" />
      <text x="394" y="585" fill={SUB} fontSize="12">Yes</text>

      {/* allowed */}
      <rect x="245" y="598" width="270" height="46" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="626" textAnchor="middle" fill={GREEN} fontSize="15" fontWeight="600">ALLOWED</text>

      {/* side notes */}
      <rect x="40" y="672" width="680" height="88" rx="10" fill="#0b1526" stroke="#1e3a5f" />
      <text x="60" y="698" fill={SKY} fontSize="13" fontWeight="600">Rules that never change:</text>
      <text x="60" y="719" fill={TXT} fontSize="12.5">• An explicit Deny anywhere beats every Allow. With no Allow anywhere, the request is implicitly denied.</text>
      <text x="60" y="741" fill={TXT} fontSize="12.5">• Same account: one Allow (either policy) suffices. • Cross-account: both sides must Allow.</text>
    </svg>
  );
}

/** 1.1.1 — IAM identities and where policies attach. */
export function IdentityTypesDiagram() {
  return (
    <svg viewBox="0 0 760 420" width="100%" role="img" aria-label="IAM identities and policy attachment" fontFamily={FONT}>
      <ArrowDefs id="it-arrow" />
      {[
        { x: 20, title: "IAM User", sub: "permanent identity", lines: ["Long-lived passwords / keys", "Avoid for humans & workloads"] },
        { x: 265, title: "IAM Group", sub: "container for users", lines: ["Attach managed policies", "Permissions apply to members"] },
        { x: 510, title: "IAM Role", sub: "assumable identity", lines: ["Temporary STS credentials", "Trust policy: who can assume"] },
      ].map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="16" width="230" height="150" rx="12" fill={BOX} stroke={EDGE} />
          <text x={c.x + 115} y="44" textAnchor="middle" fill={AMBER} fontSize="15" fontWeight="600">{c.title}</text>
          <text x={c.x + 115} y="63" textAnchor="middle" fill={SUB} fontSize="12">{c.sub}</text>
          {c.lines.map((line, i) => (
            <text key={i} x={c.x + 16} y={92 + i * 22} fill={TXT} fontSize="13">• {line}</text>
          ))}
        </g>
      ))}
      {/* membership arrows */}
      <path d="M140 166 C160 190, 240 190, 268 168" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#it-arrow)" />
      <text x="204" y="200" textAnchor="middle" fill={SUB} fontSize="12">members of</text>
      {/* policy chips */}
      <text x="380" y="206" textAnchor="middle" fill={SUB} fontSize="12">policies attach to every identity type</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 245} y="222" width="190" height="34" rx="8" fill="#0b1526" stroke="#1e3a5f" />
          <text x={135 + i * 245} y="244" textAnchor="middle" fill={SKY} fontSize="13">Identity policy (Allow/Deny)</text>
          <line x1={135 + i * 245} y1="166" x2={135 + i * 245} y2="220" stroke={SUB} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#it-arrow)" />
        </g>
      ))}
      {/* resource policy strip */}
      <rect x="40" y="286" width="680" height="52" rx="10" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="308" textAnchor="middle" fill={AMBER} fontSize="13" fontWeight="600">Resource-based policy (bucket policy, key policy, secret policy…)</text>
      <text x="380" y="327" textAnchor="middle" fill={SUB} fontSize="12">attached to the resource itself — can allow cross-account principals directly</text>
      <line x1="380" y1="256" x2="380" y2="284" stroke={SUB} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#it-arrow)" />
      {/* bottom rule */}
      <rect x="40" y="358" width="680" height="44" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="385" textAnchor="middle" fill={GREEN} fontSize="13">Rule of thumb: roles for humans and workloads · groups to organize users · policies define access</text>
    </svg>
  );
}

/** 1.1.6 — Cross-account role assumption with external ID. */
export function CrossAccountFlowDiagram() {
  return (
    <svg viewBox="0 0 760 430" width="100%" role="img" aria-label="Cross-account role assumption flow" fontFamily={FONT}>
      <ArrowDefs id="ca-arrow" />
      {/* Account A */}
      <rect x="16" y="16" width="320" height="398" rx="14" fill={BOX} stroke={EDGE} />
      <text x="176" y="44" textAnchor="middle" fill={AMBER} fontSize="15" fontWeight="600">Account A (customer)</text>
      <rect x="40" y="66" width="272" height="66" rx="10" fill="#111c2e" stroke={EDGE} />
      <text x="176" y="90" textAnchor="middle" fill={TXT} fontSize="13">IAM user / workload</text>
      <text x="176" y="112" textAnchor="middle" fill={SUB} fontSize="12">identity policy: Allow sts:AssumeRole</text>
      <rect x="40" y="150" width="272" height="66" rx="10" fill="#111c2e" stroke={EDGE} />
      <text x="176" y="174" textAnchor="middle" fill={TXT} fontSize="13">on ARN: arn:aws:iam::B:role/MonitorRole</text>
      <text x="176" y="196" textAnchor="middle" fill={SUB} fontSize="12">passes ExternalId: A-unique-9f3</text>
      {/* steps on A */}
      <text x="40" y="252" fill={SKY} fontSize="13" fontWeight="600">1. Calls sts:AssumeRole</text>
      <text x="40" y="276" fill={SUB} fontSize="12.5">with role ARN + ExternalId</text>
      <text x="40" y="308" fill={SKY} fontSize="13" fontWeight="600">3. Receives temporary credentials</text>
      <text x="40" y="332" fill={SUB} fontSize="12.5">access key + secret + session token,</text>
      <text x="40" y="352" fill={SUB} fontSize="12.5">valid for the session duration only</text>
      {/* Account B */}
      <rect x="424" y="16" width="320" height="398" rx="14" fill={BOX} stroke={EDGE} />
      <text x="584" y="44" textAnchor="middle" fill={AMBER} fontSize="15" fontWeight="600">Account B (service provider)</text>
      <rect x="448" y="66" width="272" height="82" rx="10" fill="#111c2e" stroke={EDGE} />
      <text x="584" y="90" textAnchor="middle" fill={TXT} fontSize="13">Role MonitorRole — trust policy:</text>
      <text x="584" y="110" textAnchor="middle" fill={SUB} fontSize="12">Principal: root of Account A</text>
      <text x="584" y="130" textAnchor="middle" fill={SUB} fontSize="12">Condition: sts:ExternalId = A-unique-9f3</text>
      <rect x="448" y="170" width="272" height="56" rx="10" fill="#111c2e" stroke={EDGE} />
      <text x="584" y="192" textAnchor="middle" fill={TXT} fontSize="13">Role permissions policy:</text>
      <text x="584" y="212" textAnchor="middle" fill={SUB} fontSize="12">Allow cloudwatch:GetMetricData, s3:List…</text>
      <text x="448" y="262" fill={SKY} fontSize="13" fontWeight="600">2. Trust policy evaluates:</text>
      <text x="448" y="286" fill={SUB} fontSize="12.5">principal allowed? external ID matches?</text>
      <text x="448" y="318" fill={SKY} fontSize="13" fontWeight="600">4. Calls made with temp credentials</text>
      <text x="448" y="342" fill={SUB} fontSize="12.5">CloudTrail shows the assumed-role</text>
      <text x="448" y="362" fill={SUB} fontSize="12.5">session — auditable per customer</text>
      {/* arrows between */}
      <path d="M316 99 h100" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ca-arrow)" />
      <text x="366" y="90" textAnchor="middle" fill={SUB} fontSize="11">AssumeRole</text>
      <path d="M448 205 C360 235, 400 300, 316 320" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#ca-arrow)" />
      <text x="382" y="262" textAnchor="middle" fill={SUB} fontSize="11">temp creds</text>
      {/* bottom note */}
      <rect x="16" y="378" width="728" height="0" fill="none" />
    </svg>
  );
}

/** 1.1.5 — Cognito user pools vs identity pools. */
export function CognitoFlowDiagram() {
  return (
    <svg viewBox="0 0 760 485" width="100%" role="img" aria-label="Cognito user pools vs identity pools" fontFamily={FONT}>
      <ArrowDefs id="cg-arrow" />
      {/* left actor */}
      <rect x="16" y="180" width="130" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="81" y="212" textAnchor="middle" fill={TXT} fontSize="14">Mobile / SPA</text>
      <text x="81" y="232" textAnchor="middle" fill={SUB} fontSize="12">application</text>
      {/* user pool lane */}
      <rect x="196" y="40" width="270" height="170" rx="14" fill={BOX} stroke={EDGE} />
      <text x="331" y="68" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Cognito USER POOL</text>
      <text x="331" y="88" textAnchor="middle" fill={SUB} fontSize="12">authentication — "who are you?"</text>
      {["Sign-up / sign-in, MFA", "Hosted UI, social + SAML federation", "Issues JWTs (id / access / refresh)"].map((t, i) => (
        <text key={i} x="216" y={118 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      {/* identity pool lane */}
      <rect x="196" y="252" width="270" height="160" rx="14" fill={BOX} stroke={EDGE} />
      <text x="331" y="280" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Cognito IDENTITY POOL</text>
      <text x="331" y="300" textAnchor="middle" fill={SUB} fontSize="12">authorization to AWS — "what can you call?"</text>
      {["Exchanges any trusted token for", "temporary AWS credentials (STS)", "Maps users to IAM roles"].map((t, i) => (
        <text key={i} x="216" y={328 + i * 24} fill={TXT} fontSize="12.5">• {t}</text>
      ))}
      {/* AWS services */}
      <rect x="566" y="150" width="178" height="80" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="655" y="184" textAnchor="middle" fill={GREEN} fontSize="14">AWS services</text>
      <text x="655" y="206" textAnchor="middle" fill={SUB} fontSize="12">S3 / DynamoDB / APIs</text>
      {/* flows */}
      <path d="M146 210 h42" stroke={SUB} strokeWidth="1.5" markerEnd="url(#cg-arrow)" />
      <path d="M466 125 C540 120, 600 130, 655 148" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#cg-arrow)" />
      <text x="570" y="112" textAnchor="middle" fill={SUB} fontSize="11.5">JWTs to your app</text>
      <path d="M146 236 C170 320, 180 330, 196 330" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#cg-arrow)" />
      <text x="150" y="330" textAnchor="end" fill={SUB} fontSize="11">JWT / IdP token</text>
      <path d="M466 330 C540 330, 600 280, 655 232" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#cg-arrow)" />
      <text x="568" y="322" textAnchor="middle" fill={SUB} fontSize="11.5">temporary AWS credentials</text>
      {/* note */}
      <rect x="16" y="428" width="728" height="30" rx="8" fill="#0b1526" stroke="#1e3a5f" />
      <text x="380" y="448" textAnchor="middle" fill={SKY} fontSize="12.5">Direct S3/DynamoDB access from the app needs an IDENTITY pool — a user pool alone only authenticates.</text>
    </svg>
  );
}

/** 1.1.7 — ABAC tag matching. */
export function AbacDiagram() {
  return (
    <svg viewBox="0 0 760 430" width="100%" role="img" aria-label="Attribute-based access control tag matching" fontFamily={FONT}>
      <ArrowDefs id="ab-arrow" />
      {/* policy center */}
      <rect x="230" y="24" width="300" height="120" rx="12" fill={BOX} stroke={EDGE} />
      <text x="380" y="52" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">ONE shared policy</text>
      <text x="380" y="76" textAnchor="middle" fill={TXT} fontSize="12.5">Allow s3:GetObject on object/*</text>
      <text x="380" y="98" textAnchor="middle" fill={TXT} fontSize="12.5">Condition: aws:PrincipalTag/Team</text>
      <text x="380" y="118" textAnchor="middle" fill={TXT} fontSize="12.5">StringEquals aws:ResourceTag/Team</text>
      {/* principals */}
      <rect x="30" y="200" width="200" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="130" y="228" textAnchor="middle" fill={TXT} fontSize="13">Engineer role (Blue)</text>
      <text x="130" y="250" textAnchor="middle" fill={SUB} fontSize="12">PrincipalTag Team = blue</text>
      <rect x="30" y="320" width="200" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="130" y="348" textAnchor="middle" fill={TXT} fontSize="13">Analyst role (Red)</text>
      <text x="130" y="370" textAnchor="middle" fill={SUB} fontSize="12">PrincipalTag Team = red</text>
      {/* resources */}
      <rect x="530" y="200" width="200" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="630" y="228" textAnchor="middle" fill={TXT} fontSize="13">Object: reports/q1.pdf</text>
      <text x="630" y="250" textAnchor="middle" fill={SUB} fontSize="12">ResourceTag Team = blue</text>
      <rect x="530" y="320" width="200" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="630" y="348" textAnchor="middle" fill={TXT} fontSize="13">Object: finance/q2.xlsx</text>
      <text x="630" y="370" textAnchor="middle" fill={SUB} fontSize="12">ResourceTag Team = red</text>
      {/* matches */}
      <path d="M230 235 C330 235, 420 235, 528 235" stroke={GREEN} strokeWidth="2" fill="none" markerEnd="url(#ab-arrow)" />
      <text x="380" y="226" textAnchor="middle" fill={GREEN} fontSize="12.5">tags match → Allow</text>
      <path d="M230 355 C330 400, 420 400, 528 372" stroke={RED} strokeWidth="2" strokeDasharray="5 5" fill="none" markerEnd="url(#ab-arrow)" />
      <text x="380" y="408" textAnchor="middle" fill={RED} fontSize="12.5">tags differ → implicit deny</text>
      <path d="M230 222 C330 150, 420 150, 528 226" stroke={RED} strokeWidth="2" strokeDasharray="5 5" fill="none" markerEnd="url(#ab-arrow)" />
      <text x="380" y="172" textAnchor="middle" fill={RED} fontSize="12.5">tags differ → implicit deny</text>
      {/* note */}
      <rect x="30" y="30" width="170" height="0" fill="none" />
      <rect x="40" y="168" width="0" height="0" fill="none" />
      <text x="380" y="18" textAnchor="start" fill="none" fontSize="1">.</text>
    </svg>
  );
}

/** 1.1.10 — Control Tower landing zone tree. */
export function ControlTowerDiagram() {
  return (
    <svg viewBox="0 0 760 460" width="100%" role="img" aria-label="Control Tower organization structure" fontFamily={FONT}>
      <ArrowDefs id="ct-arrow" />
      {/* management */}
      <rect x="270" y="20" width="220" height="64" rx="12" fill={BOX} stroke={AMBER} />
      <text x="380" y="46" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">Management account</text>
      <text x="380" y="66" textAnchor="middle" fill={SUB} fontSize="11.5">billing · governance · no workloads</text>
      <line x1="380" y1="84" x2="380" y2="112" stroke={SUB} strokeWidth="1.5" />
      <line x1="130" y1="112" x2="630" y2="112" stroke={SUB} strokeWidth="1.5" />
      <line x1="130" y1="112" x2="130" y2="140" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ct-arrow)" />
      <line x1="380" y1="112" x2="380" y2="140" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ct-arrow)" />
      <line x1="630" y1="112" x2="630" y2="140" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ct-arrow)" />
      {/* security OU */}
      <rect x="20" y="144" width="220" height="120" rx="12" fill="#0b1526" stroke="#1e3a5f" />
      <text x="130" y="170" textAnchor="middle" fill={SKY} fontSize="13.5" fontWeight="600">Security OU</text>
      <rect x="36" y="184" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="130" y="204" textAnchor="middle" fill={TXT} fontSize="12.5">Log Archive account</text>
      <rect x="36" y="222" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="130" y="242" textAnchor="middle" fill={TXT} fontSize="12.5">Audit account</text>
      {/* sandbox OU */}
      <rect x="270" y="144" width="220" height="120" rx="12" fill="#0b1526" stroke="#1e3a5f" />
      <text x="380" y="170" textAnchor="middle" fill={SKY} fontSize="13.5" fontWeight="600">Sandbox OU</text>
      <rect x="286" y="184" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="380" y="204" textAnchor="middle" fill={TXT} fontSize="12.5">Dev account (vended)</text>
      <rect x="286" y="222" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="380" y="242" textAnchor="middle" fill={SUB} fontSize="12.5">lighter guardrails</text>
      {/* workload OU */}
      <rect x="520" y="144" width="220" height="120" rx="12" fill="#0b1526" stroke="#1e3a5f" />
      <text x="630" y="170" textAnchor="middle" fill={SKY} fontSize="13.5" fontWeight="600">Production OU</text>
      <rect x="536" y="184" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="630" y="204" textAnchor="middle" fill={TXT} fontSize="12.5">Prod account (vended)</text>
      <rect x="536" y="222" width="188" height="30" rx="8" fill={BOX} stroke={EDGE} />
      <text x="630" y="242" textAnchor="middle" fill={SUB} fontSize="12.5">strict guardrails</text>
      {/* guardrails band */}
      <rect x="20" y="292" width="720" height="64" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="316" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Guardrails applied across OUs</text>
      <text x="380" y="340" textAnchor="middle" fill={SUB} fontSize="12.5">Proactive (block at provision time) · Preventive (SCPs) · Detective (Config rules)</text>
      {/* account factory band */}
      <rect x="20" y="372" width="720" height="64" rx="12" fill="#0b1526" stroke="#1e3a5f" />
      <text x="380" y="396" textAnchor="middle" fill={SKY} fontSize="13.5" fontWeight="600">Account Factory</text>
      <text x="380" y="420" textAnchor="middle" fill={SUB} fontSize="12.5">vends new accounts into the chosen OU with baselines: CloudTrail, Config, central logging, networking defaults</text>
    </svg>
  );
}

/** 1.1.11 — transitive session tags chain. */
export function SessionChainDiagram() {
  return (
    <svg viewBox="0 0 760 330" width="100%" role="img" aria-label="Session tag transitivity across role chain" fontFamily={FONT}>
      <ArrowDefs id="sc-arrow" />
      <rect x="16" y="120" width="140" height="76" rx="12" fill={BOX} stroke={EDGE} />
      <text x="86" y="150" textAnchor="middle" fill={TXT} fontSize="13">Developer</text>
      <text x="86" y="172" textAnchor="middle" fill={SUB} fontSize="12">principal tags:</text>
      <rect x="196" y="104" width="180" height="108" rx="12" fill={BOX} stroke={EDGE} />
      <text x="286" y="132" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Role: DeveloperAccess</text>
      <text x="286" y="156" textAnchor="middle" fill={SUB} fontSize="12">session tags set:</text>
      <text x="286" y="178" textAnchor="middle" fill={TXT} fontSize="12.5">Team = blue, Env = dev</text>
      <text x="286" y="200" textAnchor="middle" fill={SUB} fontSize="12">marked TRANSITIVE</text>
      <rect x="440" y="104" width="180" height="108" rx="12" fill={BOX} stroke={EDGE} />
      <text x="530" y="132" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Role: BuildRunner</text>
      <text x="530" y="156" textAnchor="middle" fill={SUB} fontSize="12">assumes with the same</text>
      <text x="530" y="178" textAnchor="middle" fill={TXT} fontSize="12.5">session tags still attached</text>
      <text x="530" y="200" textAnchor="middle" fill={SUB} fontSize="12">chain: dev → build</text>
      <rect x="660" y="120" width="86" height="76" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="703" y="146" textAnchor="middle" fill={GREEN} fontSize="12.5">Build bucket</text>
      <text x="703" y="168" textAnchor="middle" fill={SUB} fontSize="11">ResourceTag</text>
      <text x="703" y="184" textAnchor="middle" fill={SUB} fontSize="11">Team = blue ✓</text>
      <line x1="156" y1="158" x2="192" y2="158" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <line x1="376" y1="158" x2="436" y2="158" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <text x="406" y="146" textAnchor="middle" fill={SUB} fontSize="11">AssumeRole</text>
      <line x1="620" y1="158" x2="656" y2="158" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <text x="380" y="258" textAnchor="middle" fill={SKY} fontSize="12.5">The ABAC condition still matches two hops away — the tags were marked transitive at first assumption.</text>
      <text x="380" y="286" textAnchor="middle" fill={SUB} fontSize="12">Without transitivity, the second hop loses the tags and the condition fails.</text>
    </svg>
  );
}

/** 1.1.4 — Identity Center federation portal. */
export function IdentityCenterDiagram() {
  return (
    <svg viewBox="0 0 760 380" width="100%" role="img" aria-label="IAM Identity Center federation flow" fontFamily={FONT}>
      <ArrowDefs id="ic-arrow" />
      <rect x="16" y="140" width="180" height="90" rx="12" fill={BOX} stroke={EDGE} />
      <text x="106" y="172" textAnchor="middle" fill={TXT} fontSize="13.5">Corporate IdP</text>
      <text x="106" y="194" textAnchor="middle" fill={SUB} fontSize="12">(Okta / Entra / AD)</text>
      <text x="106" y="214" textAnchor="middle" fill={SUB} fontSize="12">SAML 2.0 + SCIM</text>
      <rect x="256" y="128" width="248" height="114" rx="14" fill={BOX} stroke={AMBER} />
      <text x="380" y="158" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="600">IAM Identity Center</text>
      <text x="380" y="180" textAnchor="middle" fill={SUB} fontSize="12">one identity store for the org</text>
      <text x="380" y="202" textAnchor="middle" fill={TXT} fontSize="12.5">Groups → permission sets</text>
      <text x="380" y="222" textAnchor="middle" fill={SUB} fontSize="12">assigned per account</text>
      <rect x="564" y="20" width="180" height="74" rx="12" fill={BOX} stroke={EDGE} />
      <text x="654" y="48" textAnchor="middle" fill={TXT} fontSize="13">Dev account</text>
      <text x="654" y="70" textAnchor="middle" fill={SUB} fontSize="12">role: DevAccess</text>
      <rect x="564" y="150" width="180" height="74" rx="12" fill={BOX} stroke={EDGE} />
      <text x="654" y="178" textAnchor="middle" fill={TXT} fontSize="13">Prod account</text>
      <text x="654" y="200" textAnchor="middle" fill={SUB} fontSize="12">role: ReadOnly + Ops</text>
      <rect x="564" y="280" width="180" height="74" rx="12" fill={BOX} stroke={EDGE} />
      <text x="654" y="308" textAnchor="middle" fill={TXT} fontSize="13">Security account</text>
      <text x="654" y="330" textAnchor="middle" fill={SUB} fontSize="12">role: SecurityAdmin</text>
      <path d="M196 185 h56" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ic-arrow)" />
      <text x="224" y="176" textAnchor="middle" fill={SUB} fontSize="11">SAML</text>
      <path d="M504 185 h56" stroke={SUB} strokeWidth="1.5" markerEnd="url(#ic-arrow)" />
      <text x="532" y="176" textAnchor="middle" fill={SUB} fontSize="11">portal</text>
      <path d="M560 240 C540 180, 548 90, 564 66" stroke="none" fill="none" />
      <path d="M560 160 C544 120, 548 80, 562 62" stroke={SUB} strokeWidth="1.2" fill="none" markerEnd="url(#ic-arrow)" />
      <line x1="560" y1="186" x2="562" y2="186" stroke={SUB} strokeWidth="1.2" markerEnd="url(#ic-arrow)" />
      <path d="M560 210 C544 250, 548 300, 562 316" stroke={SUB} strokeWidth="1.2" fill="none" markerEnd="url(#ic-arrow)" />
      <rect x="16" y="40" width="180" height="0" fill="none" />
      <rect x="16" y="290" width="728" height="64" rx="10" fill="#0f2e22" stroke={GREEN} />
      <text x="380" y="316" textAnchor="middle" fill={GREEN} fontSize="13">One portal lists every account the employee may enter — credentials live in the corporate IdP.</text>
      <text x="380" y="338" textAnchor="middle" fill={SUB} fontSize="12">A permission set becomes an actual IAM role provisioned in each assigned account when accessed.</text>
    </svg>
  );
}
