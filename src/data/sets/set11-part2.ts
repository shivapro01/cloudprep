import type { QuizQuestion } from "../questions";

/** Practice Set 11 — questions 673–694 (S3 features, networking, observability). Original questions. */
export const set11Part2: QuizQuestion[] = [
  {
    id: 673,
    category: "Storage",
    question:
      "Thousands of applications each need a different logical view of one large S3 bucket — separate prefixes, permissions, and metrics — without creating thousands of bucket policies. Which S3 feature scales this access model?",
    options: [
      "S3 Access Points, each with its own hostname and policy over the shared bucket",
      "Thousands of separate buckets with per-bucket policies",
      "Prefix-scoped IAM roles per application with wildcards",
      "Signed URLs distributed to every application",
    ],
    correctAnswers: [0],
    explanation:
      "Access points provide per-application hostnames with individual policies (and VPC restrictions) against one bucket, scaling access management cleanly. Thousands of buckets multiply management, wildcard roles weaken isolation, and presigned URLs are ephemeral per-object grants.",
  },
  {
    id: 674,
    category: "Storage",
    question:
      "A high-write SSE-KMS bucket generates enormous KMS request charges per GB stored. Which S3 feature cuts these KMS calls substantially?",
    options: [
      "S3 Bucket Keys, which reduce per-object KMS requests by using a bucket-level key for batches of objects",
      "Switching to SSE-S3, which is free of KMS charges but loses key control",
      "Disabling encryption on small objects",
      "Caching KMS keys in the application memory",
    ],
    correctAnswers: [0],
    explanation:
      "Bucket keys let S3 use a time-limited bucket-level data key for many objects, drastically reducing calls to KMS while keeping SSE-KMS. SSE-S3 removes customer key control, and client-side caching re-implements the feature insecurely.",
  },
  {
    id: 675,
    category: "Storage",
    question:
      "A security team wants to prevent new public ACLs on a bucket but deliberately leave pre-existing public ACLs (grandfathered partners) untouched. Which Block Public Access configuration matches?",
    options: [
      "Enable 'Block public ACLs' (new public ACLs rejected) but leave 'Ignore public ACLs' off, so existing ones still apply",
      "Enable all four Block Public Access settings",
      "Disable all settings and rely on audits",
      'Enable "Ignore public ACLs" only',
    ],
    correctAnswers: [0],
    explanation:
      "Block Public Access settings are independent: blocking new public ACLs prevents future exposure while ignoring existing ACLs would freeze current partners out. The all-settings option removes the grandfathered access, and the other pairings don't match the requirement.",
  },
  {
    id: 676,
    category: "Networking & Content Delivery",
    question:
      "A public DNS zone must cryptographically sign its records so resolvers can verify answers haven't been spoofed. Which Route 53 feature provides this?",
    options: [
      "Route 53 DNSSEC signing for public hosted zones",
      "Route 53 query logging",
      "Alias records with health checks",
      "DNS failover routing",
    ],
    correctAnswers: [0],
    explanation:
      "DNSSEC signs zone records so validating resolvers detect forged or altered answers. Query logging observes traffic, aliases and failover route traffic — none protect integrity of the answers.",
  },
  {
    id: 677,
    category: "Networking & Content Delivery",
    question:
      "A private hosted zone lives in the networking account's VPC, but workloads in another account's VPC must resolve it. What enables cross-account association?",
    options: [
      "The zone owner authorizes association, and the other VPC associates the zone with a creation token/authorization ID",
      "VPC peering alone makes private zones visible",
      "Copying the zone records into the second account manually",
      "Making the hosted zone public with restricted records",
    ],
    correctAnswers: [0],
    explanation:
      "Cross-account VPC association uses an authorization created by the zone owner, which the associating account redeems to attach its VPC. Peering provides routing, not DNS visibility; duplicated zones drift; and publishing internally-named zones publicly is wrong.",
  },
  {
    id: 678,
    category: "Networking & Content Delivery",
    question:
      "A service is healthy only when both its database health check and its API health check pass. Which Route 53 construct aggregates multiple child health checks into one status?",
    options: [
      "A calculated health check combining child health checks with boolean logic",
      "A single health check with two endpoints",
      "Chained failover records",
      "CloudWatch composite alarms acting as health checks",
    ],
    correctAnswers: [0],
    explanation:
      "Calculated health checks evaluate other health checks with AND/OR/NOT logic, producing one aggregate status for routing. One check can't probe two endpoints, chained records don't combine conditions, and CloudWatch alarms don't drive Route 53 health directly.",
  },
  {
    id: 679,
    category: "Networking & Content Delivery",
    question:
      "During a regional traffic shift, a company wants to gradually bias traffic away from one geographic area toward another — in fine increments — while keeping a record of resource locations. Which routing policy supports biased geographic distribution?",
    options: [
      "Geoproximity routing with bias values",
      "Geolocation routing with equal records",
      "Latency routing with weights",
      "Multivalue answer with health checks",
    ],
    correctAnswers: [0],
    explanation:
      "Geoproximity routing uses resource locations plus bias values to expand or shrink a Region's geographic traffic share gradually. Geolocation is fixed per location, latency follows performance, and multivalue has no geography concept.",
  },
  {
    id: 680,
    category: "Management & Governance",
    question:
      "Product managers want real-user telemetry from the web app — page load times, errors, sessions, geographies — collected from actual browsers with minimal instrumentation. Which CloudWatch feature provides this?",
    options: [
      "CloudWatch RUM (Real User Monitoring)",
      "CloudWatch Synthetics canaries",
      "X-Ray daemon sampling",
      "Access log analysis in Athena",
    ],
    correctAnswers: [0],
    explanation:
      "RUM injects a small JavaScript snippet collecting real user performance, errors, and session geography into CloudWatch. Synthetics are scripted probes rather than real users, X-Ray traces backend requests, and access logs miss client-side performance.",
  },
  {
    id: 681,
    category: "Application Integration",
    question:
      "A high-security REST API custom domain must require client certificates (mutual TLS), rejecting any caller without a trusted certificate. Which API Gateway feature enforces mTLS?",
    options: [
      "Mutual TLS authentication for custom domains, with a truststore of client CAs",
      "A Lambda authorizer parsing client certificates from headers",
      "IAM authentication with certificate aliases",
      "Usage plans with certificate quotas",
    ],
    correctAnswers: [0],
    explanation:
      "API Gateway custom domains support mutual TLS, verifying client certificates against an uploaded truststore before requests proceed. Authorizers run after TLS, IAM is a different credential type, and usage plans meter usage.",
  },
  {
    id: 682,
    category: "Security",
    question:
      "A security engineer must import existing Suricata-compatible IPS rules into the VPC's egress firewall for consistent detection with the corporate standard. Which Network Firewall construct accepts these?",
    options: [
      "Stateful rule groups supporting Suricata-compatible rule imports",
      "Stateless rule groups with CIDR actions only",
      "WAF rule groups",
      "Security group references",
    ],
    correctAnswers: [0],
    explanation:
      "Network Firewall's stateful engine accepts Suricata-format rules, enabling reuse of existing intrusion-prevention rule sets. Stateless groups match simple five-tuple conditions only, and WAF/SG constructs don't ingest Suricata syntax.",
  },
  {
    id: 683,
    category: "Security",
    question:
      "Beyond WAF, an organization wants centrally managed, organization-wide security group policies (for example, mandated baseline rules) applied automatically to new VPCs and accounts. Which service administers these?",
    options: [
      "AWS Firewall Manager security group policies",
      "Per-account security group templates in SSM",
      "VPC sharing of a master security group",
      "Network Access Analyzer intents",
    ],
    correctAnswers: [0],
    explanation:
      "Firewall Manager centrally manages common security group policies (and WAF/Shield/NFW policies) across accounts, auto-applying to new resources. Templates and sharing don't auto-enforce organization-wide, and analyzers only report.",
  },
  {
    id: 684,
    category: "Security",
    question:
      "During a severe DDoS event, the company wants the AWS Shield Response Team (SRT) available to engage directly, plus proactive notification when attack patterns spike. Which Shield Advanced capability provides this relationship?",
    options: [
      "Shield Advanced with 24/7 SRT access and proactive engagement (contact list involvement)",
      "Shield Standard automatic mitigation only",
      "WAF managed rule groups",
      "GuardDuty DDoS findings",
    ],
    correctAnswers: [0],
    explanation:
      "Shield Advanced includes SRT access, and proactive engagement has the team reach out using your registered contacts during detected events. Standard mitigation is automatic with no human team, WAF is request filtering, and GuardDuty addresses threats like compromised credentials.",
  },
  {
    id: 685,
    category: "Security",
    question:
      "A security team wants threat detection for container runtime activity — suspicious processes inside EKS pods — in addition to control-plane findings. Which GuardDuty capability covers runtime behavior?",
    options: [
      "GuardDuty EKS Runtime Monitoring with agents",
      "GuardDuty S3 protection",
      "Amazon Inspector container image scanning",
      "CloudWatch Container Insights",
    ],
    correctAnswers: [0],
    explanation:
      "Runtime Monitoring deploys managed agents detecting suspicious OS-level behavior inside containers and pods. S3 protection watches data events, Inspector scans images for CVEs (not runtime), and Container Insights measures performance.",
  },
  {
    id: 686,
    category: "Security",
    question:
      "A specific database credential secret must be readable only by the payments role — enforced centrally in the secret itself, even though hundreds of principals have broad Secrets Manager IAM permissions. What restricts access in the secret?",
    options: [
      "A resource policy on the secret denying all but the payments principal",
      "A per-secret KMS rotation schedule",
      "A permissions boundary on every principal in the account",
      "Renaming the secret with a secret prefix",
    ],
    correctAnswers: [0],
    explanation:
      "Secrets Manager secrets accept resource policies, so a Deny/allow scoping to the payments role binds regardless of the breadth of callers' identity policies. Rotation, boundaries across all principals, and naming conventions don't scope this one secret correctly.",
  },
  {
    id: 687,
    category: "Management & Governance",
    question:
      "On-premises servers (not in AWS) must be managed through Systems Manager — Run Command, Patch Manager, Session Manager — registered as managed nodes. What enrolls them?",
    options: [
      "A Systems Manager hybrid activation creating activation codes and IDs for installing the agent on those servers",
      "Installing the CloudWatch agent only",
      "IAM instance profiles applied through VMware tools",
      "Nothing — SSM manages only EC2 instances",
    ],
    correctAnswers: [0],
    explanation:
      "Hybrid activations issue credentials that register non-EC2 machines as SSM managed nodes (mi-* IDs), unlocking the SSM toolset on them. The CloudWatch agent observes metrics, instance profiles apply only to EC2, and SSM explicitly supports hybrid fleets.",
  },
  {
    id: 688,
    category: "Management & Governance",
    question:
      "Compliance must produce a fleet-wide inventory of installed software, running configurations, and OS details across thousands of instances. Which Systems Manager capability collects this?",
    options: [
      "Systems Manager Inventory",
      "CloudWatch detailed monitoring",
      "Config advanced queries on EC2 resources",
      "EC2 serial console logs",
    ],
    correctAnswers: [0],
    explanation:
      "Inventory collects metadata (applications, files, network config, registry) from managed nodes centrally. Detailed monitoring is metrics, Config covers resource configuration state in AWS, and serial console output isn't an inventory system.",
  },
  {
    id: 689,
    category: "Management & Governance",
    question:
      "An operations team wants one per-service view unifying traces, metrics, logs, and alarms for each application component. Which CloudWatch capability composes these per service?",
    options: [
      "CloudWatch ServiceLens",
      "CloudWatch dashboards built manually per service",
      "X-Ray group views only",
      "Config conformance pack reports",
    ],
    correctAnswers: [0],
    explanation:
      "ServiceLens integrates X-Ray traces, metrics, and logs into a service map with per-node drill-downs linking telemetry. Manual dashboards lack the trace integration, X-Ray groups filter traces only, and conformance packs evaluate compliance.",
  },
  {
    id: 690,
    category: "Management & Governance",
    question:
      "An SRE practice requires defining SLOs (latency, availability) per application service and tracking performance against them with automated detection of SLO breaches. Which CloudWatch capability targets SLOs?",
    options: [
      "CloudWatch Application Signals",
      "CloudWatch anomaly detection on a single metric",
      "Synthetics canary pass rates",
      "Service Quotas utilization views",
    ],
    correctAnswers: [0],
    explanation:
      "Application Signals instruments services and lets teams define SLOs with dashboards and breach detection tied to the service catalog. Anomaly detection watches single metrics, canaries probe endpoints, and quota views track limits.",
  },
  {
    id: 691,
    category: "Management & Governance",
    question:
      "A team attaches request attributes to X-Ray segments and later wants to search traces by these values (for example, by customer_id). Which X-Ray construct is searchable versus not?",
    options: [
      "Annotations are indexed and searchable; metadata is visible but not searchable",
      "Metadata is searchable; annotations are display-only",
      "Both are searchable equally",
      "Neither is searchable — only segment names",
    ],
    correctAnswers: [0],
    explanation:
      "Annotations are designed for indexed, filterable search; metadata carries additional data for inspection without indexing. The other pairings reverse or deny this distinction.",
  },
  {
    id: 692,
    category: "Management & Governance",
    question:
      "A metric follows a strong daily cycle, so a static threshold alarms on every peak. What should drive the alarm instead?",
    options: [
      "CloudWatch anomaly detection, alarming against a learned model of the metric's normal band",
      "A higher static threshold that ignores all peaks",
      "Longer evaluation periods with Sum statistics",
      "Disabling the alarm during known peaks",
    ],
    correctAnswers: [0],
    explanation:
      "Anomaly detection learns seasonality and alarms on deviations from the expected band, removing static-threshold false alarms. Raising thresholds risks missing true incidents, and scheduling workarounds are brittle.",
  },
  {
    id: 693,
    category: "Management & Governance",
    question:
      "An SLO requires computing availability as good_requests divided by total_requests — a ratio of two existing metrics. How should the alarm evaluate this?",
    options: [
      "Metric math computing the ratio, with the alarm on the expression's output",
      "Two separate alarms averaged by the on-call engineer",
      "Publishing a new metric manually every minute",
      "Using the Sum statistic on both metrics independently",
    ],
    correctAnswers: [0],
    explanation:
      "Metric math expressions combine existing metrics (like division) and alarms evaluate the resulting time series directly. Manual averaging and hand-published metrics add toil, and independent sums don't compute a ratio.",
  },
  {
    id: 694,
    category: "Management & Governance",
    question:
      "Which two CloudWatch features reduce alarm noise for correlated failures? (Select TWO.)",
    options: [
      "Composite alarms combining multiple alarms with AND/OR logic",
      "Anomaly detection bands adapting to normal behavior",
      "Increasing every alarm's evaluation periods",
      "Deleting child alarms entirely",
      "Adding SNS topics to each alarm",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Composite alarms fire once when their underlying alarms match combined logic (one page instead of twenty), and anomaly bands cut threshold false positives. Longer periods delay detection, deletion loses coverage, and extra topics multiply notifications.",
  },
];
