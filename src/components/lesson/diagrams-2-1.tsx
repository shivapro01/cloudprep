/** Hand-drawn SVG diagrams for the section 2.1 lessons (dark theme). */

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

/** 2.1.1 — ELB type selection. */
export function ElbSelectionDiagram() {
  return (
    <svg viewBox="0 0 760 535" width="100%" role="img" aria-label="Choosing between ALB, NLB, and GWLB" fontFamily={FONT}>
      <ArrowDefs id="el-arrow" />
      {[
        { x: 20, title: "Application LB (ALB)", color: SKY, lines: ["Layer 7 — HTTP/HTTPS/gRPC", "Path- and host-based routing", "Authentication actions (OIDC/Cognito)", "Targets: instances · IPs · Lambda", "WebSockets, TLS termination, redirects"] },
        { x: 265, title: "Network LB (NLB)", color: AMBER, lines: ["Layer 4 — TCP/UDP/TLS/QUIC", "Static IPs (Elastic IP per AZ)", "Millions of req/s, single-digit ms", "Source-IP stickiness, no proxies", "HTTP health checks (app-aware)"] },
        { x: 510, title: "Gateway LB (GWLB)", color: GREEN, lines: ["Inline third-party appliances", "Firewalls · IDS/IPS · deep packet", "GWLB endpoints in consumer VPCs", "Transparent to the traffic flow", "Centralized security fleet"] },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="20" width="230" height="180" rx="12" fill={BOX} stroke={EDGE} />
          <text x={card.x + 115} y="46" textAnchor="middle" fill={card.color} fontSize="13.5" fontWeight="600">{card.title}</text>
          {card.lines.map((line, i) => (
            <text key={i} x={card.x + 16} y={72 + i * 24} fill={TXT} fontSize="12">• {line}</text>
          ))}
        </g>
      ))}
      <Note x={20} y={222} width={720} lines={[
        "Selection one-liners",
        "“route /api and /admin to different backends” → ALB · “static IP for partner allowlists, ultra-low latency TCP” → NLB",
        "“send ALL traffic through a firewall appliance fleet” → GWLB",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={336} width={720} lines={[
        "Shared mechanics",
        "Listener (protocol + port) → rules → target groups · health checks per target group · cross-zone load balancing for even AZ distribution",
        "Internet-facing vs internal scheme · deregistration delay drains in-flight requests at scale-in",
      ]} />
      <Note x={20} y={448} width={720} lines={[
        "Legacy note",
        "Classic Load Balancer still appears in old exam questions — treat “basic L4+L7 legacy” as CLB and prefer ALB/NLB in every modern answer",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.2 — target group mechanics. */
export function TargetGroupDiagram() {
  return (
    <svg viewBox="0 0 760 450" width="100%" role="img" aria-label="Target group settings and behavior" fontFamily={FONT}>
      <ArrowDefs id="tg-arrow" />
      <rect x="30" y="40" width="170" height="80" rx="12" fill={BOX} stroke={EDGE} />
      <text x="115" y="72" textAnchor="middle" fill={TXT} fontSize="13">Load balancer</text>
      <text x="115" y="94" textAnchor="middle" fill={SUB} fontSize="12">listener + rules</text>
      <rect x="290" y="20" width="200" height="120" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="390" y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Target group</text>
      {[
        "Health check: path, protocol,",
        "interval, thresholds",
        "Deregistration delay: drain time",
        "Slow start: ramp new targets",
        "Stickiness: duration/app cookies",
      ].map((t, i) => (
        <text key={i} x="308" y={68 + i * 15} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      {[
        { x: 570, y: 20, label: "Target 1" },
        { x: 570, y: 100, label: "Target 2" },
        { x: 570, y: 180, label: "Target 3" },
      ].map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={t.y} width="170" height="60" rx="10" fill="#0f2e22" stroke={GREEN} />
          <text x={t.x + 85} y={t.y + 35} textAnchor="middle" fill={GREEN} fontSize="12.5">{t.label} — healthy</text>
          <line x1="490" y1={t.y + 30} x2={t.x - 4} y2={t.y + 30} stroke={SUB} strokeWidth="1.2" markerEnd="url(#tg-arrow)" />
        </g>
      ))}
      <path d="M200 80 h86" stroke={SUB} strokeWidth="1.5" markerEnd="url(#tg-arrow)" />
      <Note x={30} y={172} width={690} lines={[
        "The settings that decide user experience",
        "Health check grace period → let slow-booting apps finish starting before being judged",
        "Deregistration delay → keep serving in-flight requests during scale-in and deploys",
        "Slow start → protect cold caches and JIT warm-up from a full traffic share",
      ]} />
      <Note x={30} y={280} width={690} lines={[
        "Cross-zone load balancing",
        "ALB: always on · NLB: off by default — without it each AZ only serves its own targets, so uneven AZ load skews targets",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={30} y={366} width={690} lines={[
        "Unhealthy-target behavior",
        "Failed checks → target ejected, replaced by ASG (EC2) or relaunched (ECS) · thresholds and timeouts are per target group",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.3 — scaling policies. */
export function ScalingPoliciesDiagram() {
  return (
    <svg viewBox="0 0 760 480" width="100%" role="img" aria-label="Auto Scaling policy types" fontFamily={FONT}>
      <ArrowDefs id="sp-arrow" />
      {[
        { x: 20, title: "Target tracking", lines: ["Keep a metric AT a value:", "avg CPU 40% · ALB req/target 500", "Adds capacity reactively, no thresholds", "Configures scaling automatically"] },
        { x: 265, title: "Step & simple scaling", lines: ["Alarm breaches → sized steps:", "+2 instances at 70%, +4 at 85%", "Add instance warmup to avoid storms", "Simple = legacy single action + cooldown"] },
        { x: 510, title: "Predictive scaling", lines: ["ML forecast from history", "Scales BEFORE the daily peak hits", "Forecast-only vs forecast-and-scale", "Pairs well with target tracking"] },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="20" width="230" height="170" rx="12" fill={BOX} stroke={EDGE} />
          <text x={card.x + 115} y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">{card.title}</text>
          {card.lines.map((line, i) => (
            <text key={i} x={card.x + 16} y={72 + i * 24} fill={TXT} fontSize="12">• {line}</text>
          ))}
        </g>
      ))}
      <Note x={20} y={214} width={720} lines={[
        "Also in the policy toolbox",
        "Scheduled scaling — known calendar peaks · manual — runbook-driven · dynamic cooldowns vs instance warmup pace the actions",
      ]} />
      <Note x={20} y={300} width={720} lines={[
        "Mixed instances policy",
        "On-Demand base + Spot above it, multiple instance types with capacity weights, allocation: price-capacity-optimized or lowest-price",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={388} width={720} lines={[
        "Exam mapping",
        "“keep average CPU at 40%” → target tracking · “traffic follows daily/weekly patterns” → predictive · “scale for a known date” → scheduled",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.4 — lifecycle states and warm pools. */
export function LifecycleWarmPoolDiagram() {
  return (
    <svg viewBox="0 0 760 510" width="100%" role="img" aria-label="Auto Scaling lifecycle states and warm pools" fontFamily={FONT}>
      <ArrowDefs id="lc-arrow" />
      <rect x="30" y="30" width="150" height="60" rx="12" fill={BOX} stroke={EDGE} />
      <text x="105" y="56" textAnchor="middle" fill={TXT} fontSize="12.5">Scale-out event</text>
      <text x="105" y="76" textAnchor="middle" fill={SUB} fontSize="11.5">desired +1</text>
      <rect x="230" y="24" width="200" height="72" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="330" y="50" textAnchor="middle" fill={AMBER} fontSize="13" fontWeight="600">Pending:Wait (hook)</text>
      <text x="330" y="70" textAnchor="middle" fill={SUB} fontSize="11.5">bootstrap · install · register</text>
      <text x="330" y="88" textAnchor="middle" fill={SUB} fontSize="11.5">complete → continue, else abandon</text>
      <rect x="480" y="24" width="170" height="72" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="565" y="50" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="600">InService</text>
      <text x="565" y="70" textAnchor="middle" fill={SUB} fontSize="11.5">serving traffic</text>
      <rect x="480" y="140" width="170" height="72" rx="12" fill="#3f1d1d" stroke={RED} />
      <text x="565" y="166" textAnchor="middle" fill={RED} fontSize="13" fontWeight="600">Terminating</text>
      <text x="565" y="186" textAnchor="middle" fill={SUB} fontSize="11.5">deregistration delay drains</text>
      <path d="M180 60 h46" stroke={SUB} strokeWidth="1.5" markerEnd="url(#lc-arrow)" />
      <path d="M430 60 h46" stroke={SUB} strokeWidth="1.5" markerEnd="url(#lc-arrow)" />
      <path d="M565 96 v40" stroke={SUB} strokeWidth="1.5" markerEnd="url(#lc-arrow)" />
      <rect x="30" y="140" width="170" height="72" rx="12" fill={BOX} stroke={EDGE} />
      <text x="115" y="166" textAnchor="middle" fill={TXT} fontSize="12.5">Standby</text>
      <text x="115" y="186" textAnchor="middle" fill={SUB} fontSize="11">troubleshoot, out of rotation</text>
      <line x1="105" y1="90" x2="105" y2="136" stroke={SUB} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#lc-arrow)" />
      <Note x={30} y={240} width={720} lines={[
        "Warm pools — pre-initialized capacity waiting for scale-out",
        "States: Running, Stopped, or Hibernated · reuse policy recycles instances",
        "Result: scale-out promotes warm instances in seconds instead of minutes",
      ]} />
      <Note x={30} y={336} width={720} lines={[
        "The other lifecycle features",
        "Instance refresh — rolling AMI rollout with auto-rollback · capacity rebalancing — replace at-risk Spot early",
        "Scale-in protection / termination protection — stop unwanted terminations",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={30} y={424} width={720} lines={[
        "Exam mapping",
        "“run setup before serving traffic” → launch hook · “replace fleet gradually with rollback” → instance refresh",
        "“troubleshoot an instance without the group replacing it” → move to Standby",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.5 — SQS patterns. */
export function SqsPatternsDiagram() {
  return (
    <svg viewBox="0 0 760 490" width="100%" role="img" aria-label="SQS queue patterns" fontFamily={FONT}>
      <ArrowDefs id="sq-arrow" />
      <rect x="20" y="40" width="150" height="70" rx="12" fill={BOX} stroke={EDGE} />
      <text x="95" y="70" textAnchor="middle" fill={TXT} fontSize="13">Producer</text>
      <text x="95" y="90" textAnchor="middle" fill={SUB} fontSize="12">SendMessage</text>
      <rect x="250" y="20" width="230" height="110" rx="12" fill="#241a0b" stroke="#7c5b16" />
      <text x="365" y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Standard queue</text>
      {[
        "Unlimited TPS · best-effort order",
        "At-least-once delivery",
        "Long polling cuts empty responses",
        "Retention up to 14 days",
      ].map((t, i) => (
        <text key={i} x="268" y={70 + i * 15} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <rect x="250" y="150" width="230" height="110" rx="12" fill={BOX} stroke={EDGE} />
      <text x="365" y="176" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">FIFO queue</text>
      {[
        "Order per MessageGroupId",
        "Dedup by ID / content hash",
        "High-throughput mode available",
        "Exactly-once processing semantics",
      ].map((t, i) => (
        <text key={i} x="268" y={200 + i * 15} fill={TXT} fontSize="11.5">• {t}</text>
      ))}
      <rect x="560" y="40" width="180" height="70" rx="12" fill="#0f2e22" stroke={GREEN} />
      <text x="650" y="70" textAnchor="middle" fill={GREEN} fontSize="13">Consumer fleet</text>
      <text x="650" y="90" textAnchor="middle" fill={SUB} fontSize="12">ReceiveMessage · Delete</text>
      <path d="M170 75 h76" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <path d="M480 75 C530 75, 540 75, 556 75" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <path d="M480 205 C530 205, 540 150, 556 118" stroke={SUB} strokeWidth="1.5" fill="none" markerEnd="url(#sq-arrow)" />
      {/* DLQ */}
      <rect x="250" y="300" width="230" height="70" rx="12" fill="#3f1d1d" stroke={RED} />
      <text x="365" y="326" textAnchor="middle" fill={RED} fontSize="13" fontWeight="600">Dead-letter queue</text>
      <text x="365" y="348" textAnchor="middle" fill={SUB} fontSize="12">maxReceiveCount exceeded →</text>
      <path d="M365 300 v-36" stroke={SUB} strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <Note x={20} y={258} width={210} lines={[
        "Visibility timeout",
        "must exceed the longest processing time — otherwise messages redeliver as duplicates",
      ]} />
      <Note x={510} y={258} width={230} lines={[
        "Poison message path",
        "failed receives counted → quarantined in the DLQ after the threshold",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={394} width={720} lines={[
        "Exam mapping",
        "“absorb traffic spikes between services” → standard SQS · “strict per-order ordering” → FIFO + MessageGroupId · “messages stuck in a loop” → visibility timeout + DLQ",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.7 — EventBridge. */
export function EventBridgeDiagram() {
  return (
    <svg viewBox="0 0 760 515" width="100%" role="img" aria-label="EventBridge buses, rules, and targets" fontFamily={FONT}>
      <ArrowDefs id="eb-arrow" />
      <rect x="20" y="24" width="180" height="180" rx="12" fill={BOX} stroke={EDGE} />
      <text x="110" y="50" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Producers</text>
      {["AWS services (120+ emit)", "Custom apps — PutEvents", "SaaS partner sources", "Schedules (cron/rate)", "Cross-account buses"].map((t, i) => (
        <text key={i} x="38" y={78 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <rect x="290" y="60" width="180" height="120" rx="14" fill="#241a0b" stroke="#7c5b16" />
      <text x="380" y="88" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Event bus</text>
      {["default · custom buses", "rules match by pattern", "or content fields", "schema registry", "DLQ per rule target"].map((t, i) => (
        <text key={i} x="308" y={112 + i * 15} fill={TXT} fontSize="11.5">{t}</text>
      ))}
      {[
        { x: 560, y: 24, label: "Lambda / Step Functions" },
        { x: 560, y: 94, label: "SQS / SNS / EventBridge" },
        { x: 560, y: 164, label: "API destinations (rate-limited)" },
      ].map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={t.y} width="180" height="54" rx="10" fill="#0f2e22" stroke={GREEN} />
          <text x={t.x + 90} y={t.y + 32} textAnchor="middle" fill={GREEN} fontSize="12">{t.label}</text>
          <line x1="470" y1="120" x2={t.x - 4} y2={t.y + 27} stroke={SUB} strokeWidth="1.2" markerEnd="url(#eb-arrow)" />
        </g>
      ))}
      <Note x={20} y={230} width={720} lines={[
        "The extra capabilities exams probe",
        "Archive + replay — re-deliver past events to fixed consumers · Scheduler — one-time or cron invocations",
        "Pipes — point-to-point with enrichment · Input transformers reshape payloads per target",
        "Cross-account and cross-Region event delivery",
      ]} />
      <Note x={20} y={342} width={720} lines={[
        "EventBridge vs SNS vs SQS",
        "SNS = simple fan-out · SQS = one consumer queue · EventBridge = many producers, policy-based routing, schemas, replay",
      ]} color={AMBER} border="#7c5b16" />
      <Note x={20} y={428} width={720} lines={[
        "Exam mapping",
        "“route order events to different systems by type” → EventBridge rules · “replay the last 2 hours after a bug fix” → archive + replay",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}

/** 2.1.8 — Step Functions shapes. */
export function StepFunctionsDiagram() {
  return (
    <svg viewBox="0 0 760 515" width="100%" role="img" aria-label="Step Functions workflow patterns" fontFamily={FONT}>
      <ArrowDefs id="sf-arrow" />
      <rect x="20" y="20" width="350" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="195" y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Standard Workflows</text>
      {[
        "Exactly-once execution · up to 1 year",
        "Full execution history (audit-friendly)",
        "Priced per state transition",
        "Use: order pipelines, approvals, ML jobs",
      ].map((t, i) => (
        <text key={i} x="38" y={72 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      <rect x="390" y="20" width="350" height="150" rx="12" fill={BOX} stroke={EDGE} />
      <text x="565" y="46" textAnchor="middle" fill={AMBER} fontSize="13.5" fontWeight="600">Express Workflows</text>
      {[
        "At-least-once · up to 5 minutes",
        "100,000+ executions per second",
        "~10x cheaper — priced per run",
        "Use: streaming/event high-volume steps",
      ].map((t, i) => (
        <text key={i} x="408" y={72 + i * 24} fill={TXT} fontSize="12">• {t}</text>
      ))}
      {[
        { x: 20, t: "Task", d: "do work · Retry + Catch" },
        { x: 165, t: "Choice", d: "branch on input" },
        { x: 310, t: "Parallel", d: "concurrent branches" },
        { x: 455, t: "Map", d: "fan-out per item (Distributed: 10k+)" },
        { x: 620, t: "Wait", d: "delay · until timestamp" },
      ].map((s) => (
        <g key={s.t}>
          <rect x={s.x} y="200" width="130" height="70" rx="10" fill="#0b1526" stroke="#1e3a5f" />
          <text x={s.x + 65} y="228" textAnchor="middle" fill={SKY} fontSize="12.5" fontWeight="600">{s.t}</text>
          <text x={s.x + 65} y="248" textAnchor="middle" fill={SUB} fontSize="10.5">{s.d}</text>
        </g>
      ))}
      <Note x={20} y={296} width={720} lines={[
        "Integration patterns",
        ".sync — start ECS/Glue/etc. and wait for completion · waitForTaskToken — pause for human approval or external callback",
        "Run a Lambda inside the workflow vs calling the service directly — optimized integrations skip intermediate Lambdas",
      ]} />
      <Note x={20} y={430} width={720} lines={[
        "Exam mapping",
        "“coordinate steps with retries and error paths” → Step Functions · “fan out 50k files” → Distributed Map · “pause for approval” → callback token",
      ]} color={GREEN} border="#14532d" />
    </svg>
  );
}
