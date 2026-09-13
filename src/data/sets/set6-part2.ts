import type { QuizQuestion } from "../questions";

/** Practice Set 6 — questions 348–369 (governance, migration, operations). Original questions. */
export const set6Part2: QuizQuestion[] = [
  {
    id: 348,
    category: "Management & Governance",
    question:
      "An organization has three business units with different compliance postures: one highly regulated, two standard. Guardrails must differ by unit while remaining centrally managed. Which organizational design implements this?",
    options: [
      "One account per team with identical SCPs",
      "Organizational units per business unit with unit-specific SCPs attached, nested under a shared root",
      "Separate AWS organizations with a manual agreement",
      "One organization with tag-based SCP conditions only",
    ],
    correctAnswers: [1],
    explanation:
      "OU hierarchy with SCPs attached at each level applies different guardrails per business unit while retaining single-organization central control. Identical SCPs ignore the compliance differences, separate organizations forfeit centralized billing and management, and tag conditions alone cannot express full per-unit policy sets.",
  },
  {
    id: 349,
    category: "Management & Governance",
    question:
      "A platform team must collect AWS Config compliance data from 40 member accounts into one delegated administrator account for a single compliance view. Which configuration provides this?",
    options: [
      "A Config aggregator with a delegated administrator designated in Organizations",
      "Config recorders in every account writing to one shared S3 bucket queried with Athena",
      "CloudWatch dashboards shared via cross-account roles",
      "A conformance pack deployed per account with manual collection",
    ],
    correctAnswers: [0],
    explanation:
      "Config aggregators consolidate compliance data across accounts into a delegated administrator account, the native multi-account compliance view. Shared S3 plus Athena is a hand-built approximation, shared dashboards do not aggregate rule results, and per-account packs still lack the single view.",
  },
  {
    id: 350,
    category: "Management & Governance",
    question:
      "Operations wants AWS Health events (such as EC2 maintenance or service issues) that affect any account in the organization delivered to one central EventBridge bus for automated response. Which feature enables this?",
    options: [
      "AWS Health organizational view with EventBridge integration",
      "Subscribing each account to the public Service Health RSS feed",
      "CloudTrail management events routed to EventBridge",
      "Personal Health Dashboard screenshots reviewed weekly",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Health's organizational view consolidates account-specific health events and can emit them centrally into EventBridge for automation. RSS and dashboards are manual and not per-account, and CloudTrail records API activity rather than health events.",
  },
  {
    id: 351,
    category: "Migration & Transfer",
    question:
      "Before a large migration, a consultancy must inventory 500 on-premises VMs, map their network dependencies, and estimate monthly AWS costs. Which toolset performs discovery and dependency mapping?",
    options: [
      "AWS Application Discovery Service with Migration Evaluator / Migration Hub",
      "AWS X-Ray across the on-premises applications",
      "AWS Config advanced queries against the target account",
      "Amazon CloudWatch agent on a sample of servers",
    ],
    correctAnswers: [0],
    explanation:
      "Application Discovery Service inventories servers, collects utilization, and maps dependencies (agentless or agent-based), feeding Migration Hub for planning and cost estimates. X-Ray traces AWS-hosted request paths, Config evaluates cloud resources, and sampling with CloudWatch misses the estate view.",
  },
  {
    id: 352,
    category: "Migration & Transfer",
    question:
      "A company wants to rehost 200 VMs to AWS with continuous block-level replication and automated conversion at cutover, orchestrated waves with minimal downtime. Which service is purpose-built for the rehost wave?",
    options: [
      "AWS Application Migration Service (MGN)",
      "AWS Database Migration Service",
      "AWS Snowball Edge",
      "AWS DataSync",
    ],
    correctAnswers: [0],
    explanation:
      "Application Migration Service automates lift-and-shift: continuous replication of source servers, automated conversion to EC2, and orchestrated non-disruptive test and cutover. DMS moves databases, Snowball ships data physically, DataSync copies files.",
  },
  {
    id: 353,
    category: "Migration & Transfer",
    question:
      "A 40 TB Oracle database must migrate within a one-week window over a 200 Mbps WAN. Which combined approach meets the deadline?",
    options: [
      "DMS full load over the WAN in one pass",
      "Ship a Snowball Edge for the bulk transfer, then use DMS change data capture for the delta until cutover",
      "Export to CSV and upload via Transfer Acceleration",
      "Ship a Snowmobile and perform DMS afterwards over the WAN",
    ],
    correctAnswers: [1],
    explanation:
      "At 200 Mbps, 40 TB takes roughly three weeks one-way, so physical transfer carries the bulk while DMS CDC replays changes for a minutes-long cutover. A pure DMS full load cannot meet the window, CSV export loses constraints and still crosses the WAN, and Snowmobile is sized for exabyte-scale jobs.",
  },
  {
    id: 354,
    category: "Migration & Transfer",
    question:
      "A Java web application on on-premises Tomcat moves to Elastic Beanstalk while its Oracle database moves to Amazon RDS for the same engine. In the 6-R framework, how is this migration characterized?",
    options: [
      "Rehost",
      "Replatform (lift, tinker, and shift)",
      "Refactor",
      "Repurchase",
    ],
    correctAnswers: [1],
    explanation:
      "Replatform makes targeted managed-service substitutions (Tomcat to Beanstalk, Oracle to RDS) without re-architecting the application. Rehost moves as-is to EC2, refactor re-architects code, and repurchase replaces with SaaS.",
  },
  {
    id: 355,
    category: "Migration & Transfer",
    question:
      "A program manager must track the progress of dozens of migration streams — servers, databases, and data transfers — in one place, grouping them into applications with status dashboards. Which service provides this tracking?",
    options: [
      "AWS Migration Hub",
      "AWS Systems Manager OpsCenter",
      "AWS Service Catalog",
      "AWS Control Tower dashboard",
    ],
    correctAnswers: [0],
    explanation:
      "Migration Hub aggregates migration status from tools such as MGN and DMS, grouping servers into applications with progress visibility. OpsCenter tracks operational issues, Service Catalog curates products, and Control Tower governs the landing zone.",
  },
  {
    id: 356,
    category: "Management & Governance",
    question:
      "A solutions architect must run a structured review of a workload against the six Well-Architected pillars, record identified risks, and track improvement plans over time. Which tool supports this workflow?",
    options: [
      "AWS Well-Architected Tool",
      "AWS Trusted Advisor",
      "AWS Systems Manager Explorer",
      "AWS Config dashboard",
    ],
    correctAnswers: [0],
    explanation:
      "The Well-Architected Tool walks teams through pillar-based questionnaires, records risks and milestones, and tracks remediation over the workload's life. Trusted Advisor surfaces automated checks, Explorer aggregates operations data, and Config shows configuration compliance.",
  },
  {
    id: 357,
    category: "Management & Governance",
    question:
      "An incident responder must run a single diagnostic command on 500 instances at once, without SSH access, collecting output centrally. Which capability executes this?",
    options: [
      "AWS Systems Manager Run Command",
      "A bash loop over instance IPs from the operator's laptop",
      "EC2 user data executed at next reboot",
      "AWS CloudFormation custom resources",
    ],
    correctAnswers: [0],
    explanation:
      "Run Command executes documents across entire fleets through the SSM agent with centralized output, no inbound connectivity required. Laptop loops need SSH and network reachability, user data waits for reboots, and custom resources provision infrastructure rather than run commands.",
  },
  {
    id: 358,
    category: "Management & Governance",
    question:
      "A database administrator needs to reach a private RDS instance from a workstation using a GUI client, without exposing the database publicly or opening bastion SSH. Which Systems Manager capability tunnels this securely?",
    options: [
      "Session Manager port forwarding to the instance hosting the DB connection",
      "SSM Patch Manager with a maintenance window",
      "EC2 serial console access",
      "AWS PrivateLink for RDS",
    ],
    correctAnswers: [0],
    explanation:
      "Session Manager port forwarding opens an SSH-free encrypted tunnel from the workstation through an SSM-managed instance to the database port. Patch Manager updates software, serial console is for instance recovery, and RDS does not support PrivateLink directly.",
  },
  {
    id: 359,
    category: "Management & Governance",
    question:
      "A CloudFormation stack's resources were modified directly in the console, diverging from the template. Before updating the stack, the team wants to identify exactly which properties drifted. Which CloudFormation feature reports this?",
    options: [
      "Change sets",
      "Drift detection on the stack",
      "Stack policy evaluation",
      "Rollback triggers",
    ],
    correctAnswers: [1],
    explanation:
      "Drift detection compares deployed resource configuration with the template and reports each drifted property. Change sets preview proposed updates, stack policies protect resources from updates, and rollback triggers abort failed deployments.",
  },
  {
    id: 360,
    category: "Management & Governance",
    question:
      "A CloudFormation update fails partway through applying resource changes. What does CloudFormation do by default, and what is the result?",
    options: [
      "It leaves the stack in the partially updated state for manual repair",
      "It automatically rolls back to the last known good state of the stack",
      "It deletes the stack entirely on any update failure",
      "It retries the failed resource indefinitely",
    ],
    correctAnswers: [1],
    explanation:
      "On update failure, CloudFormation automatically rolls back the stack to its previous known-good template state (configurable per deployment). Partial states are not left by default, deletion applies to failed creation without rollback disabled, and failed resources are not retried indefinitely.",
  },
  {
    id: 361,
    category: "Management & Governance",
    question:
      "A developer-heavy organization wants infrastructure defined in TypeScript with reusable, testable constructs, compiled into CloudFormation templates and deployed through the same service. Which tool matches this workflow?",
    options: [
      "AWS Cloud Development Kit (CDK)",
      "AWS Elastic Beanstalk configurations",
      "Terraform Cloud",
      "AWS SAM CLI only",
    ],
    correctAnswers: [0],
    explanation:
      "The CDK lets infrastructure be authored in general-purpose languages with high-level constructs, synthesizing to CloudFormation for deployment. Beanstalk is application deployment, Terraform is a third-party tool with its own engine, and SAM is a serverless-focused template flavor rather than a programming model.",
  },
  {
    id: 362,
    category: "Compute",
    question:
      "An Elastic Beanstalk application deploys must replace every instance with the new version while keeping full serving capacity throughout and avoiding in-place mutation of running servers. Which deployment policy fits?",
    options: [
      "All at once",
      "Rolling with additional batch",
      "Immutable deployments",
      "Traffic splitting with health checks only",
    ],
    correctAnswers: [2],
    explanation:
      "Immutable deployments launch a brand-new set of instances from the new version, then swap — no existing instance is ever modified, and capacity stays whole (with a temporary surge). All at once causes an outage, rolling updates mutate instances in place, and traffic splitting is a canary pattern rather than a full-fleet replacement.",
  },
  {
    id: 363,
    category: "Management & Governance",
    question:
      "A compliance team must deploy a curated bundle of Config rules with remediations (for example encryption and public-access checks) consistently across all accounts in the organization. Which Config feature packages and distributes these?",
    options: [
      "Config conformance packs",
      "Config advanced queries saved as favorites",
      "Service Catalog portfolios",
      "CloudFormation StackSets with Config recorder only",
    ],
    correctAnswers: [0],
    explanation:
      "Conformance packs bundle Config rules and remediation actions as a template deployable organization-wide with a single operation. Saved queries are ad-hoc searches, Service Catalog curates deployable products, and raw StackSets require assembling what packs provide out of the box.",
  },
  {
    id: 364,
    category: "Management & Governance",
    question:
      "Which two Trusted Advisor checks fall under the cost optimization category? (Select TWO.)",
    options: [
      "Low utilization EC2 instances",
      "Idle load balancers",
      "IAM access key rotation",
      "Open security group ports",
      "Service limits approaching thresholds",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Low-utilization instances and idle load balancers are cost checks recommending rightsizing or removal. Key rotation and open ports are security checks, and service limits fall under fault tolerance/performance categories.",
  },
  {
    id: 365,
    category: "Management & Governance",
    question:
      "A launch is scheduled and the team wants advance notice of AWS-initiated events (such as instance retirements or maintenance) that will affect their own specific resources, so they can plan around them. Which source provides these personalized events?",
    options: [
      "AWS Health — the Personal Health Dashboard, also emit-able to EventBridge",
      "The public AWS Service Health status page",
      "CloudWatch Logs Insights queries",
      "AWS Trusted Advisor reliability checks",
    ],
    correctAnswers: [0],
    explanation:
      "AWS Health surfaces events scoped to the customer's own resources and Regions and integrates with EventBridge for automated planning. The public status page reports service-wide events without personalization, Logs analyze application data, and Trusted Advisor is advisory.",
  },
  {
    id: 366,
    category: "Management & Governance",
    question:
      "A global operations team wants a single view combining metrics from us-east-1 and eu-west-1 side by side, without leaving the CloudWatch console. Which CloudWatch feature composes this?",
    options: [
      "Cross-Region dashboards where widgets aggregate widgets from multiple Regions",
      "Metric Streams forwarded to a central account",
      "CloudWatch cross-account observability",
      "CloudWatch Logs destination subscriptions",
    ],
    correctAnswers: [0],
    explanation:
      "CloudWatch dashboards can embed widgets from any Region into one view for multi-Region visibility. Metric Streams and cross-account observability move data to other services or accounts — heavier machinery than the console requirement asks for, and log destinations concern log routing.",
  },
  {
    id: 367,
    category: "Management & Governance",
    question:
      "An on-call engineer must interactively query application logs across multiple log groups to find the distribution of HTTP 500s by endpoint in the last hour. Which CloudWatch capability runs this analysis?",
    options: [
      "CloudWatch Logs Insights",
      "CloudWatch metric filters with dashboards",
      "Athena over exported S3 logs",
      "X-Ray analytics console",
    ],
    correctAnswers: [0],
    explanation:
      "Logs Insights provides an interactive query language over log groups with aggregation, filtering, and visualization — built for exactly this ad-hoc investigation. Metric filters are predefined patterns rather than ad-hoc queries, Athena requires log export to S3, and X-Ray analyzes traces.",
  },
  {
    id: 368,
    category: "Management & Governance",
    question:
      "After configuring CloudWatch alarms, an engineer notices memory utilization metrics are missing for EC2 instances, though CPU and network metrics appear. What is the cause and fix?",
    options: [
      "Memory metrics require installing the CloudWatch agent on the instances",
      "Memory metrics require an EC2 detailed monitoring upgrade",
      "Memory metrics are only visible in the instance's Systems Manager tab",
      "Memory metrics appear only for instances with instance store volumes",
    ],
    correctAnswers: [0],
    explanation:
      "Hypervisor-level metrics exclude memory usage, so the CloudWatch agent must run inside the OS to publish memory (and disk) metrics. Detailed monitoring increases metric frequency, not breadth, and the other options describe non-existent sources.",
  },
  {
    id: 369,
    category: "Networking & Content Delivery",
    question:
      "A platform team wants to share one Transit Gateway — and selected subnets of a network account — with other accounts in the organization, without duplicating resources per account. Which service shares these resources?",
    options: [
      "AWS Resource Access Manager (RAM)",
      "Resource-based policies on the TGW",
      "IAM roles with switchable cross-account access",
      "CloudFormation StackSets deploying TGW per account",
    ],
    correctAnswers: [0],
    explanation:
      "RAM shares Transit Gateways, subnets, and other multi-account resources with principals or OUs, so consumers attach to shared resources without ownership duplication. TGWs and subnets are not shareable through resource policies, IAM roles grant access to operations rather than sharing the resource, and duplicating via StackSets defeats the purpose.",
  },
];
