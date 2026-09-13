import type { QuizQuestion } from "../questions";

/** Practice Set 14 — questions 846–867 (storage, security, delivery advanced). Original questions. */
export const set14Part1: QuizQuestion[] = [
  {
    id: 846,
    category: "Storage",
    question:
      "A bucket receives objects that should enter Intelligent-Tiering immediately, without waiting 30 days in Standard first. What does the lifecycle configuration support?",
    options: [
      "Transitioning objects to Intelligent-Tiering at 0 days after creation (at upload)",
      "Intelligent-Tiering requires a minimum 30-day wait before transition",
      "Only tags can place objects into Intelligent-Tiering at upload",
      "Intelligent-Tiering is a default class, not a lifecycle target",
    ],
    correctAnswers: [0],
    explanation:
      "Lifecycle rules may specify a 0-day transition to Intelligent-Tiering, placing new objects there at creation. The 30-day minimum applies to IA-class transitions (which bill minimum storage durations), not to Intelligent-Tiering.",
  },
  {
    id: 847,
    category: "Storage",
    question:
      "A compliance framework requires two independent layers of encryption with two different KMS keys applied to objects at rest. Which S3 encryption option provides this?",
    options: [
      "DSSE-KMS (dual-layer server-side encryption with KMS keys)",
      "SSE-KMS with a multi-Region key",
      "SSE-KMS combined with bucket keys",
      "SSE-C with two customer keys alternated",
    ],
    correctAnswers: [0],
    explanation:
      "DSSE-KMS applies two independent KMS encryption layers per object, satisfying mandates that require layered encryption. Single KMS keys (multi-Region or bucket-key assisted) are one layer, and SSE-C alternation is not dual encryption.",
  },
  {
    id: 848,
    category: "Storage",
    question:
      "An application moves from S3 General Purpose buckets to S3 Express One Zone directory buckets. Which API behavior difference must the application accommodate?",
    options: [
      "Directory buckets use session-based authentication (CreateSession) and support a subset of APIs compared with general purpose buckets",
      "Directory buckets support every S3 API with identical semantics",
      "Directory buckets require no credentials at all within the AZ",
      "Directory buckets use SOAP APIs exclusively",
    ],
    correctAnswers: [0],
    explanation:
      "Express One Zone directory buckets authenticate via session-based CreateSession tokens and implement a reduced API surface, so applications must adapt. Full API parity, credential-free access, and SOAP are incorrect.",
  },
  {
    id: 849,
    category: "Security",
    question:
      "A security team wants KMS API simplicity for workloads while key material is generated and stored in a CloudHSM cluster under the team's control. Which KMS construct bridges this?",
    options: [
      "A KMS custom key store backed by a CloudHSM cluster",
      "An external key store (XKS) backed by a non-AWS system",
      "A multi-Region key with replicated material",
      "An AWS managed key with annual rotation",
    ],
    correctAnswers: [0],
    explanation:
      "Custom key stores connect KMS to a customer's CloudHSM cluster: keys live in the HSM while APIs remain KMS-standard. XKS places the key management outside AWS entirely, and the other options keep keys in KMS-managed stores.",
  },
  {
    id: 850,
    category: "Security",
    question:
      "A policy condition must reject resource creation when the Environment tag is absent, while allowing any present value. Which condition operator expresses presence testing?",
    options: [
      "The Null condition operator (for example, aws:RequestTag/Environment is false)",
      "StringEquals with a wildcard value",
      "StringNotEquals with an empty string",
      "Bool on aws:RequestTag/Environment",
    ],
    correctAnswers: [0],
    explanation:
      "The Null operator tests key existence (true = missing, false = present), the standard way to require tags without constraining their values. Wildcard equality and empty-string comparisons don't reliably express absence.",
  },
  {
    id: 851,
    category: "Security",
    question:
      "Beyond gating role assumption on MFA, an identity policy must require that sensitive actions (iam:*) be performed only within MFA-authenticated sessions. Which condition pattern enforces this in the identity policy?",
    options: [
      "A Deny on sensitive actions with a condition that aws:MultiFactorAuthPresent is false",
      "A Deny on all actions when aws:PrincipalOrgID is absent",
      "An Allow on sensitive actions requiring source IP ranges",
      "Bool conditions on the session duration",
    ],
    correctAnswers: [0],
    explanation:
      "The MFA-protected API pattern is an explicit Deny on sensitive actions when MultiFactorAuthPresent is false, letting MFA sessions pass. Organization, IP, and duration conditions address different properties entirely.",
  },
  {
    id: 852,
    category: "Security",
    question:
      "An engineer's IAM user access keys are stolen. Deleting the keys stops future use, but what happens to credentials already issued to that identity, and how should designs limit this exposure?",
    options: [
      "Deleting long-lived keys does not revoke already-issued temporary session credentials; short session durations and explicit credential-report reviews limit exposure windows",
      "Deleting keys instantly revokes every session the identity ever opened",
      "Temporary credentials cannot be restricted, so stolen keys are unrecoverable incidents",
      "Rotating the password retroactively invalidates all sessions",
    ],
    correctAnswers: [0],
    explanation:
      "Temporary STS credentials continue to live until expiry regardless of key deletion; designs mitigate with short durations and monitoring (credential reports, alarms). Instant revocation and password-driven invalidation are myths, and 'unrecoverable' overstates the case.",
  },
  {
    id: 853,
    category: "Security",
    question:
      "In AWS WAF, how do the web ACL, rule groups, and statements relate?",
    options: [
      "A web ACL contains rules (and rule group references); each rule holds statements (like IP match, regex, rate) evaluated in priority order",
      "Rule groups contain web ACLs; statements contain rule groups",
      "Web ACLs and rule groups are synonyms; statements are metrics",
      "Statements attach directly to resources; web ACLs group statements for metrics only",
    ],
    correctAnswers: [0],
    explanation:
      "The hierarchy is: web ACL → rules / referenced managed rule groups → statements (the match conditions) with priorities. The other orderings invert the containment model.",
  },
  {
    id: 854,
    category: "Security",
    question:
      "Compliance requires the VPC firewall to decrypt and inspect outbound TLS traffic (with trusted CA handling) rather than only filtering by domain. Which Network Firewall capability performs TLS inspection?",
    options: [
      "TLS inspection configurations decrypting traffic with an associated private CA for inspection",
      "Domain list rule groups, which can decrypt payloads",
      "Stateless rule groups with port filters",
      "Suricata rules without certificate support",
    ],
    correctAnswers: [0],
    explanation:
      "Network Firewall TLS inspection configurations intercept and decrypt TLS using an associated AWS Private CA certificate, enabling payload inspection of egress. Domain lists filter by SNI without decryption, and the other constructs predate TLS inspection.",
  },
  {
    id: 855,
    category: "Security",
    question:
      "During a DDoS event, auto scaling ballooned infrastructure costs dramatically. Which Shield Advanced benefit addresses the financial impact of attack-driven scaling?",
    options: [
      "Cost protection — requesting credits for scaling charges caused by DDoS-driven autoscaling",
      "Free tier conversion of all On-Demand scaling during attacks",
      "Automatic downsizing of the fleet by AWS during events",
      "Insurance payouts handled by the support plan",
    ],
    correctAnswers: [0],
    explanation:
      "Shield Advanced cost protection lets customers request credits for scaling costs attributable to DDoS-driven autoscaling. There's no automatic conversion, AWS doesn't shrink customer fleets, and it's a credit process rather than insurance.",
  },
  {
    id: 856,
    category: "Management & Governance",
    question:
      "A StackSets deployment must automatically deploy into accounts created later in target OUs, without rerunning the deployment operation. Which permission model and option enable this?",
    options: [
      "Service-managed permissions with automatic deployment enabled for the organization or OUs",
      "Self-managed permissions with per-account role creation on demand",
      "Deployment to specific account IDs listed once, never updated",
      "A StackSet per future account created by Lambda",
    ],
    correctAnswers: [0],
    explanation:
      "Service-managed StackSets (via Organizations) deploy into OUs and can auto-deploy to accounts added later. Self-managed requires per-account roles and manual targeting, static lists miss new accounts, and Lambda choreography reimplements the feature.",
  },
  {
    id: 857,
    category: "Management & Governance",
    question:
      "A CloudFormation template must provision a resource that CloudFormation has no native type for, running custom Lambda logic during create/update/delete with results returned to the stack. Which mechanism implements this?",
    options: [
      "A Lambda-backed custom resource responding to the stack's request events",
      "A CloudFormation Hook that only validates existing resource types",
      "A parameter with Default values from Lambda",
      "An SSM Automation document referenced by ARN",
    ],
    correctAnswers: [0],
    explanation:
      "Custom resources invoke a Lambda for create/update/delete requests, returning outputs to the stack — extending provisioning to arbitrary logic. Hooks validate or modify existing types, parameters are static, and Automation isn't wired into stack lifecycles.",
  },
  {
    id: 858,
    category: "Management & Governance",
    question:
      "In the CDK, which construct levels correspond to raw CloudFormation resources versus intent-based, opinionated components with sensible defaults?",
    options: [
      "L1 mirrors raw resources; L2 and L3 (patterns) provide intent-based APIs with defaults",
      "L3 is raw; L1 and L2 are opinionated",
      "Levels refer to programming languages, not abstraction",
      "L1 and L3 are raw; L2 is synthetic",
    ],
    correctAnswers: [0],
    explanation:
      "L1 constructs map one-to-one to CloudFormation resources; L2 wrap them with intent and defaults; L3 (patterns) compose multiple resources into higher-level solutions. The other descriptions misassign the abstraction ladder.",
  },
  {
    id: 859,
    category: "Management & Governance",
    question:
      "Which three compute platforms can CodeDeploy deploy to?",
    options: [
      "EC2/on-premises instances, Amazon ECS, and AWS Lambda",
      "EC2, EKS, and S3 static sites",
      "Lambda, Fargate directly, and Lightsail",
      "ECS, Elastic Beanstalk, and Outposts only",
    ],
    correctAnswers: [0],
    explanation:
      "CodeDeploy's platforms are EC2/on-premises, ECS (blue/green on services), and Lambda (aliases with traffic shifting). The other groupings substitute platforms CodeDeploy doesn't target.",
  },
  {
    id: 860,
    category: "Management & Governance",
    question:
      "A production promotion in CodePipeline must pause for a named approver, notify via email, and record the approval comment in the pipeline history. Which pipeline action provides this?",
    options: [
      "A Manual approval action with SNS notification configuration",
      "A Wait state of fixed duration with an email beforehand",
      "A Lambda polling an approval ticket queue",
      "A CloudWatch alarm needing manual acknowledgment",
    ],
    correctAnswers: [0],
    explanation:
      "Manual approval actions pause the pipeline, publish SNS notifications, and capture approver identity and comments in history. Timed waits, ticket-polling functions, and alarms reimplement the built-in action.",
  },
  {
    id: 861,
    category: "Management & Governance",
    question:
      "Repeated CodeBuild runs spend minutes re-downloading identical dependency trees. Which CodeBuild feature shortens subsequent builds?",
    options: [
      "Local cache (or S3 cache) for dependency directories between builds",
      "Larger compute instances for the build project",
      "Increasing the build timeout",
      "Privileged mode for Docker builds",
    ],
    correctAnswers: [0],
    explanation:
      "Build caching stores dependency directories locally or in S3, skipping re-downloads on subsequent builds. Bigger instances and longer timeouts don't avoid the download, and privileged mode enables Docker-in-Docker.",
  },
  {
    id: 862,
    category: "Management & Governance",
    question:
      "An on-call engineer debugging a live incident wants to watch application log lines stream in as they're written, filtered by pattern — without running queries repeatedly. Which CloudWatch Logs feature provides this?",
    options: [
      "CloudWatch Logs Live Tail",
      "Metric filters with dashboards",
      "Logs Insights saved queries",
      "Subscription filters to Kinesis",
    ],
    correctAnswers: [0],
    explanation:
      "Live Tail streams matching log events in real time within the console — built for interactive incident debugging. Metric filters, saved queries, and subscriptions all operate on stored data rather than streaming the present.",
  },
  {
    id: 863,
    category: "Analytics",
    question:
      "OpenSearch indices for time-series data must roll over from hot to delete-eligible indices automatically based on age and size. Which OpenSearch feature automates this lifecycle?",
    options: [
      "Index State Management (ISM) policies with rollover and delete actions",
      "S3 lifecycle rules applied to indices",
      "Manual reindex scripts on schedule",
      "UltraWarm transitions only",
    ],
    correctAnswers: [0],
    explanation:
      "ISM policies define index lifecycle actions (rollover, replica changes, deletion) triggered by age, size, or doc counts. S3 lifecycles apply to objects, scripted reindexing is manual toil, and UltraWarm is a storage tier within ISM flows.",
  },
  {
    id: 864,
    category: "Database",
    question:
      "A Redshift cluster's snapshots must copy automatically to a second Region for disaster recovery, retaining per DR policy. Which Redshift configuration enables cross-Region snapshot copies?",
    options: [
      "Cross-Region snapshot copy configuration with the destination Region and retention period",
      "A Lambda job exporting snapshot manifests",
      "Redshift Spectrum reading the DR Region",
      "Elastic resize into the second Region",
    ],
    correctAnswers: [0],
    explanation:
      "Redshift natively copies snapshots to a configured destination Region with its own retention, satisfying DR without external orchestration. Spectrum reads data, and resizing is intra-cluster.",
  },
  {
    id: 865,
    category: "Database",
    question:
      "A DynamoDB application faces a known massive spike (a product launch at a scheduled time). Provisioned capacity configured now may not instantly absorb the launch burst. Which DynamoDB feature pre-warms capacity ahead of the event?",
    options: [
      "Warm throughput, pre-configuring the table to sustain a known request rate immediately",
      "On-demand capacity mode, which guarantees any spike instantly",
      "A higher TTL on items",
      "Adding a global secondary index before launch",
    ],
    correctAnswers: [0],
    explanation:
      "Warm throughput lets tables pre-provision the steady request level they must absorb instantly at launch, avoiding the ramp-up lag. On-demand ramps quickly but not instantaneously for extreme spikes, and TTL/index settings are unrelated.",
  },
  {
    id: 866,
    category: "Database",
    question:
      "A company standardizes SQL Server on RDS and wants to compare licensing payment options. Which RDS licensing models exist for SQL Server?",
    options: [
      "License included, bring-your-own-license (BYOL/BIYOL via License Manager), and marketplace AMI? no — license included and BYOL models via Microsoft License Mobility",
      "Only license-included is available for SQL Server",
      "Only bring-your-own with Dedicated Hosts exclusively",
      "Open-source conversion is mandatory",
    ],
    correctAnswers: [0],
    explanation:
      "RDS for SQL Server offers license-included pricing and bring-your-own-license (via License Mobility through License Manager/Dedicated Hosts arrangements). License-included is not the only model, BYOL isn't exclusive to hosts, and conversion isn't mandatory.",
  },
  {
    id: 867,
    category: "Database",
    question:
      "Which two DynamoDB features provide data protection and recovery? (Select TWO.)",
    options: [
      "On-demand backups",
      "Point-in-time recovery (PITR)",
      "DynamoDB Accelerator (DAX)",
      "Global secondary indexes",
      "Adaptive capacity",
    ],
    correctAnswers: [0, 1],
    explanation:
      "On-demand backups and PITR are the recovery mechanisms. DAX accelerates reads, indexes change query access, and adaptive capacity manages traffic distribution — none protect data.",
  },
];
