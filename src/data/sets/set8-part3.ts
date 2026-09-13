import type { QuizQuestion } from "../questions";

/** Practice Set 8 — questions 500–520 (multi-constraint scenarios and DevOps tooling). Original questions. */
export const set8Part3: QuizQuestion[] = [
  {
    id: 500,
    category: "Storage",
    question:
      "A compliance officer must be able to prove that archived compliance files have not been modified since upload, verifying integrity years later. Which S3 capability provides a verifiable checksum recorded at upload?",
    options: [
      "S3 additional checksums (SHA-256/SHA-1/CRC) stored with the object and returned on demand",
      "S3 Versioning",
      "S3 server access logs",
      "CloudTrail data events",
    ],
    correctAnswers: [0],
    explanation:
      "Additional checksums compute and store a digest at upload time; later comparisons prove the object is byte-identical. Versioning preserves versions but does not attest integrity, and logs or CloudTrail record activity rather than verifying content.",
  },
  {
    id: 501,
    category: "Database",
    question:
      "A production Aurora MySQL cluster must upgrade from MySQL 5.7-compatibility to 8.0-compatibility with near-zero downtime and instant rollback capability. Which RDS feature performs staged migration with switchover?",
    options: [
      "In-place engine version upgrade during a maintenance window",
      "RDS Blue/Green Deployments",
      "Snapshot restore into a new cluster and DNS cutover by hand",
      "Aurora clone and manual endpoint reconfiguration",
    ],
    correctAnswers: [1],
    explanation:
      "Blue/Green Deployments create a synchronized staging environment running the target engine version, let you test it, and switch over in under a minute with instant fallback. In-place upgrades carry downtime and no instant rollback, and manual clone/cutover paths are hand-built versions of the managed feature.",
  },
  {
    id: 502,
    category: "Database",
    question:
      "A DynamoDB table experiences brief hot partitions during viral events, but within minutes performance normalizes without any intervention. Which DynamoDB behavior explains this self-healing?",
    options: [
      "On-demand capacity mode repartitioning automatically",
      "Adaptive capacity isolating hot keys and splitting partitions automatically",
      "DAX absorbing the spike transparently",
      "Global tables balancing traffic across Regions",
    ],
    correctAnswers: [1],
    explanation:
      "Adaptive capacity isolates frequently accessed keys, splits hot partitions, and routes traffic efficiently, letting bursts absorb without sustained throttling. On-demand changes billing behavior, DAX must be configured ahead of time, and global tables address Regional resilience.",
  },
  {
    id: 503,
    category: "Database",
    question:
      "A Redis cluster must reject unauthenticated connections and encrypt traffic between clients and nodes. Which ElastiCache settings enable both?",
    options: [
      "In-transit encryption (TLS) with Redis AUTH token",
      "At-rest encryption with KMS only",
      "Cluster mode with 15 shards",
      "Auth disabled with security groups restricting by IP",
    ],
    correctAnswers: [0],
    explanation:
      "Transit encryption enables TLS on connections, and AUTH requires a token with every connection — together satisfying both requirements. At-rest encryption protects stored files, sharding is capacity, and IP-restricted open ports remain unauthenticated.",
  },
  {
    id: 504,
    category: "Storage",
    question:
      "On a bucket with versioning and MFA delete enabled, which operation requires the caller to supply the MFA device serial and current token?",
    options: [
      "Uploading a new object version",
      "Permanently deleting an object version (or changing the bucket's versioning state)",
      "Listing object versions",
      "Enabling default encryption",
    ],
    correctAnswers: [1],
    explanation:
      "MFA delete gates the destructive root-level operations: permanent version deletion and changes to versioning configuration. Uploads, listings, and encryption settings are routine operations not requiring MFA.",
  },
  {
    id: 505,
    category: "Security",
    question:
      "A generated policy for a data team approaches the identity policy size limit and must be attached to hundreds of users, updated centrally. Which IAM structure fits?",
    options: [
      "Inline policies embedded in each user",
      "A customer managed policy attached to the users (or a group)",
      "One SCP replicating the permissions",
      "A resource policy on every referenced resource",
    ],
    correctAnswers: [1],
    explanation:
      "Customer managed policies are standalone, reusable, centrally updatable objects attached to many identities, and they carry their own size ceiling versus inline policies. Inline duplicates live inside each principal and are a maintenance hazard, SCPs are account guardrails, and resource policies don't aggregate identity permissions.",
  },
  {
    id: 506,
    category: "Security",
    question:
      "In IAM Identity Center, the administrator defines a bundle of IAM policies specifying what a 'DatabaseAdmin' may do, and assigns it to groups across many accounts. What is this construct called?",
    options: [
      "A permission set, materialized as roles in each assigned account",
      "A service control policy",
      "A resource-based policy",
      "An IAM role shared across accounts by ARN",
    ],
    correctAnswers: [0],
    explanation:
      "Permission sets define templates of permissions; Identity Center provisions corresponding roles in every assigned account so users assume consistent access through the portal. SCPs guardrail accounts, resource policies attach to resources, and sharing one role ARN bypasses Identity Center's model.",
  },
  {
    id: 507,
    category: "Security",
    question:
      "GuardDuty detects a suspicious binary executing on an instance. The security team wants the instance automatically isolated (network cut) and its volume scanned for malware, hands-free. Which GuardDuty feature chains these actions?",
    options: [
      "GuardDuty Malware Protection with automated response via EventBridge and SSM",
      "Inspector vulnerability scans scheduled nightly",
      "CloudWatch alarm emailing the on-call engineer",
      "AWS Firewall Manager pushing new WAF rules",
    ],
    correctAnswers: [0],
    explanation:
      "GuardDuty Malware Protection can scan EBS volumes when triggered by findings, and EventBridge rules can drive automated isolation (security group changes via SSM) — a hands-free response chain. Scheduled scans are periodic rather than finding-driven, email is manual, and WAF rules address web attacks.",
  },
  {
    id: 508,
    category: "Security",
    question:
      "A media site is scraped aggressively by botnets rotating IPs and user agents, degrading performance. Which AWS WAF capability identifies and mitigates automated traffic without custom rule writing?",
    options: [
      "AWS WAF Bot Control managed rule group",
      "A hand-built IP reputation list",
      "Shield Standard automatic mitigation",
      "Rate limiting every path to 10 requests per minute",
    ],
    correctAnswers: [0],
    explanation:
      "Bot Control is a managed rule group that detects and labels common bots, scrapers, and frameworks with labels for targeted responses. Manual IP lists trail rotating adversaries, Shield addresses volumetric DDoS, and a blanket rate limit punishes legitimate users.",
  },
  {
    id: 509,
    category: "Security",
    question:
      "A team imported a third-party TLS certificate into ACM for a public ALB. What must they plan for regarding renewal?",
    options: [
      "ACM renews it automatically before expiry",
      "Imported certificates must be re-imported manually before expiry; ACM only auto-renews certificates it issues",
      "The third-party CA transfers the certificate into ACM for renewal",
      "Imported certificates cannot be used on ALBs",
    ],
    correctAnswers: [1],
    explanation:
      "Auto-renewal applies to ACM-issued certificates; imported certificates require the owner to re-import renewed material before expiry or connections fail. Third-party CAs don't renew through ACM, and imported certificates work fine on ALBs.",
  },
  {
    id: 510,
    category: "High Availability & Scaling",
    question:
      "One Availability Zone is impaired (network degradation) but not down. Operations must shift production traffic away from just that AZ within minutes, at the Route 53 level, without touching infrastructure. Which capability performs a zonal shift?",
    options: [
      "Route 53 Application Recovery Controller zonal shift",
      "Updating the ASG's AZ list in the console",
      "A network ACL denying the AZ's CIDR",
      "Global Accelerator traffic dial",
    ],
    correctAnswers: [0],
    explanation:
      "ARC zonal shift temporarily moves traffic away from a single impaired AZ in minutes with a simple control and automatic expiry options. Editing ASG settings triggers replacements and is slower, NACL blocks are blunt and manual, and the traffic dial shifts between Regions, not zones.",
  },
  {
    id: 511,
    category: "Management & Governance",
    question:
      "An organization must state its RTO and RPO targets as policy, have AWS assess application configurations against those targets, and receive resilience scores with recommendations. Which service does this assessment?",
    options: [
      "AWS Resilience Hub",
      "AWS Well-Architected Tool",
      "AWS Fault Injection Service",
      "AWS Trusted Advisor",
    ],
    correctAnswers: [0],
    explanation:
      "Resilience Hub codifies RTO/RPO policies, analyzes application definitions, and scores resilience with actionable recommendations. The WA Tool runs advisory questionnaires, FIS injects real faults, and Trusted Advisor performs best-practice checks.",
  },
  {
    id: 512,
    category: "Management & Governance",
    question:
      "A feature-flag service must roll out configuration changes gradually to thousands of Lambda instances, with automatic rollback if error rates rise during deployment. Which service provides validated, watched configuration deployment?",
    options: [
      "AWS AppConfig (part of Systems Manager) with validators and CloudWatch alarm rollback",
      "S3 versioned configuration files polled hourly",
      "Parameter Store SecureStrings rotated nightly",
      "Secrets Manager staging secrets",
    ],
    correctAnswers: [0],
    explanation:
      "AppConfig deploys configuration with validation, staged rollout strategies, and monitoring-linked automatic rollback. Versioned files and rotated parameters lack deployment guardrails, and Secrets Manager addresses credentials rather than feature configuration.",
  },
  {
    id: 513,
    category: "Management & Governance",
    question:
      "Multiple teams publish shared internal software packages (npm, Maven, Python) that other teams consume with version pinning and upstream proxying to public registries. Which AWS service provides this package management?",
    options: [
      "AWS CodeArtifact",
      "Amazon ECR public gallery",
      "AWS Systems Manager Distributor",
      "S3 presigned download URLs",
    ],
    correctAnswers: [0],
    explanation:
      "CodeArtifact is a managed artifact repository supporting standard package managers with versioning and upstream public-registry proxying. ECR serves container images, Distributor packages on-instance software bundles, and S3 links lack package-manager semantics.",
  },
  {
    id: 514,
    category: "Management & Governance",
    question:
      "On every commit to main, the team wants: source checkout, unit tests, container build, push to ECR, then deployment — orchestrated as a pipeline with manual approval before production. Which service combination orchestrates and builds?",
    options: [
      "CodePipeline orchestrating stages, with CodeBuild executing the build and test actions",
      "CodeCommit alone with webhook scripts",
      "CodeDeploy without a build stage",
      "CodeArtifact with lifecycle policies",
    ],
    correctAnswers: [0],
    explanation:
      "CodePipeline composes source, build, approval, and deploy stages; CodeBuild performs the actual compile/test/container build steps. A repository alone runs nothing, CodeDeploy deploys but doesn't build, and CodeArtifact stores packages.",
  },
  {
    id: 515,
    category: "Compute",
    question:
      "A Lambda function release must shift traffic gradually (10% → 50% → 100%) with automatic rollback on CloudWatch alarm breach, hands-free after configuration. Which service automates this deployment?",
    options: [
      "AWS CodeDeploy with a canary deployment configuration for Lambda",
      "Manually updating the alias weights per hour",
      "Provisioned concurrency rolling increases",
      "A Step Functions workflow invoking version ARNs alternately",
    ],
    correctAnswers: [0],
    explanation:
      "CodeDeploy's Lambda compute platform shifts alias traffic per canary/linear configurations and rolls back automatically on configured alarms. Manual weights need an operator, provisioned concurrency affects warmth not deployment safety, and workflow-based routing reimplements the service.",
  },
  {
    id: 516,
    category: "Management & Governance",
    question:
      "Which two infrastructure-as-code services are AWS-native first-party tools? (Select TWO.)",
    options: [
      "AWS CloudFormation",
      "AWS CDK",
      "Terraform",
      "Pulumi",
      "Ansible",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudFormation and the CDK (which synthesizes to CloudFormation) are AWS-native. Terraform, Pulumi, and Ansible are third-party tools that can target AWS.",
  },
  {
    id: 517,
    category: "Management & Governance",
    question:
      "Tracing every request through X-Ray is too expensive at full volume, but engineers need a representative, consistent sample — for example, all errors plus 5% of successes. What controls this?",
    options: [
      "X-Ray sampling rules, including custom rules and reservoir sizes",
      "Lambda provisioned concurrency levels",
      "CloudWatch Logs subscription filters",
      "The X-Ray daemon buffer size",
    ],
    correctAnswers: [0],
    explanation:
      "Sampling rules decide which requests are traced (fixed rates, per-service rules, reservoirs), balancing cost and visibility — errors can be traced at higher rates. Concurrency, log subscriptions, and daemon buffers do not govern trace selection.",
  },
  {
    id: 518,
    category: "Management & Governance",
    question:
      "An operations team needs CPU, memory, network, and restart metrics collected from every task in ECS and EKS clusters, aggregated into performance dashboards without manual instrumentation. Which CloudWatch capability provides container metrics?",
    options: [
      "CloudWatch Container Insights",
      "CloudWatch agent with custom scripts",
      "X-Ray service maps",
      "CloudTrail event history",
    ],
    correctAnswers: [0],
    explanation:
      "Container Insights collects and aggregates cluster, pod, task, and service-level metrics and logs automatically for ECS, EKS, and Kubernetes. Custom agents work but require building the aggregation, X-Ray traces requests, and CloudTrail audits APIs.",
  },
  {
    id: 519,
    category: "Management & Governance",
    question:
      "Engineers cannot correlate a failing request's logs across five microservices because log lines lack a shared identifier. What should be injected at request start and propagated to make logs searchable end to end?",
    options: [
      "The X-Ray trace header (trace ID), added to every structured log line across services",
      "Each service's instance ID",
      "The API Gateway stage name",
      "The Lambda function version",
    ],
    correctAnswers: [0],
    explanation:
      "Propagating the trace ID (from the X-Ray trace header) into every service's logs lets Logs Insights pull all lines for one request across the whole chain. Instance IDs, stage names, and versions do not identify a single request journey.",
  },
  {
    id: 520,
    category: "Database",
    question:
      "Which two RDS and Aurora features directly reduce routine database operations toil? (Select TWO.)",
    options: [
      "Storage autoscaling",
      "Automatic minor engine version patching during maintenance windows",
      "Manually provisioning storage headroom each month",
      "Hand-run major version upgrades every quarter",
      "Disabling automated backups to simplify restores",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Storage autoscaling removes manual capacity operations, and automatic minor version patching (within a window) removes routine patch work. Manual headroom and hand-run upgrades are the toil itself, and disabling backups increases risk.",
  },
];
