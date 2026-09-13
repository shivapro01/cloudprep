import type { QuizQuestion } from "../questions";

/** Practice Set 6 — questions 326–347 (cost optimization deep dive). Original questions. */
export const set6Part1: QuizQuestion[] = [
  {
    id: 326,
    category: "Cost Optimization",
    question:
      "A bank must retain monthly statement PDFs for seven years. They are retrieved roughly once per year, and a restoration taking several hours is acceptable. Which storage class minimizes cost while meeting the requirements?",
    options: [
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Flexible Retrieval",
      "S3 Glacier Deep Archive",
      "S3 Standard-IA",
    ],
    correctAnswers: [2],
    explanation:
      "Deep Archive is the cheapest storage per GB, designed for once-a-year access with retrieval times measured in hours — matching quarterly or annual restores of seven-year archives. Instant Retrieval pays a premium for millisecond access that is not needed here, Flexible Retrieval costs more than Deep Archive for the same rarity, and Standard-IA is far pricier for data this cold.",
  },
  {
    id: 327,
    category: "Cost Optimization",
    question:
      "Finance needs hourly line-item billing data including resource tags, service, and Region delivered to S3, then loaded into QuickSight for chargeback dashboards. Which feature produces this dataset?",
    options: [
      "AWS Cost and Usage Report",
      "AWS Budgets exports",
      "Cost Explorer CSV downloads",
      "AWS Billing alarms",
    ],
    correctAnswers: [0],
    explanation:
      "The Cost and Usage Report delivers the most granular billing line items (with tags, amortization, and resource IDs) to S3 for analytics pipelines. Budgets alert rather than export, Cost Explorer exports are summary-level, and billing alarms are legacy notifications.",
  },
  {
    id: 328,
    category: "Cost Optimization",
    question:
      "When a project's spend reaches 80% of its monthly budget, the finance team wants AWS to automatically attach a restrictive IAM policy to the project's role, halting further resource creation. Which feature executes this response?",
    options: [
      "AWS Budgets with a budget action",
      "An SCP that denies resource creation above a spend threshold",
      "Cost Anomaly Detection with an SNS notification",
      "A CloudWatch billing alarm with a Lambda that emails the team",
    ],
    correctAnswers: [0],
    explanation:
      "Budget actions attach IAM policies or SCPs and can even stop instances automatically when thresholds are crossed — the native automated-response mechanism. SCPs cannot trigger on spend, anomaly detection only alerts, and a hand-built Lambda re-implements what Budget actions do.",
  },
  {
    id: 329,
    category: "Cost Optimization",
    question:
      "A team's Spot workload suffers frequent interruptions on its chosen instance type. Before redesigning, they want a data-driven ranking of instance types and Regions by interruption likelihood for their workload shape. Which tool provides this?",
    options: [
      "Spot placement score",
      "Compute Optimizer",
      "Savings Plans recommendations",
      "EC2 capacity reservations report",
    ],
    correctAnswers: [0],
    explanation:
      "The Spot placement score scores Regions and instance pools by the likelihood of interruption for a specified workload, guiding pool selection. Compute Optimizer rightsizes instances, Savings Plans recommendations concern commitments, and capacity reservations guarantee (rather than rank) capacity.",
  },
  {
    id: 330,
    category: "Cost Optimization",
    question:
      "A company's 200 development EC2 instances run only during business hours, yet bill 24/7. Leadership wants automated nightly and weekend stop/start without touching application code. Which approach implements the schedule?",
    options: [
      "Deploy an EventBridge scheduled rule triggering Lambda to stop and start tagged instances (the Instance Scheduler pattern)",
      "Convert all instances to Spot capacity",
      "Purchase Scheduled Reserved Instances covering nights and weekends",
      "Reduce instance sizes by half",
    ],
    correctAnswers: [0],
    explanation:
      "A scheduled EventBridge rule driving Lambda (or the Instance Scheduler solution) stops and starts tagged instances automatically, paying only for attached EBS when stopped. Spot does not stop on a schedule, Scheduled RIs cover recurring time windows at commitment pricing but don't power off resources, and downsizing still pays around the clock.",
  },
  {
    id: 331,
    category: "Cost Optimization",
    question:
      "A read-heavy application needs 8 database replicas. Leadership asks why Aurora is cheaper than 8 RDS MySQL read replicas here. What is the correct explanation?",
    options: [
      "Aurora replicas share the cluster's single storage volume, so each replica adds compute cost only, not storage cost",
      "Aurora replicas are charged at half the rate of RDS replicas",
      "Aurora replicas do not count toward instance billing for the first 15",
      "Aurora automatically converts replicas into Reserved Instances",
    ],
    correctAnswers: [0],
    explanation:
      "Aurora's shared distributed storage means every replica reads the same volume copy — adding replicas costs compute only. RDS replicas each carry their own storage bill. There is no half-rate discount, no free-replica tier, and no automatic reservation conversion.",
  },
  {
    id: 332,
    category: "Cost Optimization",
    question:
      "A DynamoDB session table stores millions of items that are useless after 24 hours, and a nightly cleanup job scanning and deleting them dominates the bill. Which DynamoDB feature removes expired items automatically at no scan cost?",
    options: [
      "DynamoDB on-demand capacity mode",
      "Time to Live (TTL) with an expiry timestamp attribute",
      "A global secondary index on the expiry attribute",
      "Point-in-time recovery with daily restore",
    ],
    correctAnswers: [1],
    explanation:
      "TTL marks items with an expiry attribute and deletes them automatically in the background without consuming write throughput or requiring scans. Capacity modes affect pricing of traffic, indexes add cost, and PITR is a backup feature.",
  },
  {
    id: 333,
    category: "Cost Optimization",
    question:
      "A company's audience is concentrated in the United States and Europe. Its CloudFront bill includes edge locations the users never touch. Which setting trims delivery cost without impacting the audience?",
    options: [
      "Set the distribution's price class to cover only North America and Europe",
      "Disable compression at the edge",
      "Reduce the origin failover configuration to one origin",
      "Switch the origin protocol to HTTP",
    ],
    correctAnswers: [0],
    explanation:
      "CloudFront price classes restrict which edge locations serve the distribution; choosing the class covering only the served geographies cuts delivery cost without affecting the actual audience. Compression lowers bytes transferred, and origin and protocol settings do not change per-location pricing.",
  },
  {
    id: 334,
    category: "Cost Optimization",
    question:
      "A workload profile shows a steady 24/7 baseline of 60 instances and additional spiky demand of 0-100 instances that is fault-tolerant. Which purchasing mix minimizes total cost?",
    options: [
      "Reserved Instances or Savings Plans for the baseline, Spot for the spiky fault-tolerant portion",
      "On-Demand for everything, simplifying management",
      "Spot for the baseline, On-Demand for the spikes",
      "Dedicated Hosts for the baseline, Reserved for the spikes",
    ],
    correctAnswers: [0],
    explanation:
      "Commitment discounts match the predictable baseline, and Spot's deep discount matches interruptible spiky demand — the canonical cost-mix strategy. All On-Demand pays full price always, inverting the mix pays the wrong rates for each portion, and Dedicated Hosts serve licensing needs rather than discounting.",
  },
  {
    id: 335,
    category: "Cost Optimization",
    question:
      "An experimental service is idle most of the week and must cost nothing while idle. Which two service choices achieve scale-to-zero billing? (Select TWO.)",
    options: [
      "AWS Lambda",
      "DynamoDB in on-demand capacity mode",
      "A t3 EC2 instance stopped nightly by script",
      "A Multi-AZ RDS database",
      "An ElastiCache Redis cluster",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Lambda bills per invocation and DynamoDB on-demand bills per request — both genuinely bill zero while idle. A stopped t3 still accrues EBS charges, and RDS and ElastiCache bill continuously regardless of load.",
  },
  {
    id: 336,
    category: "Cost Optimization",
    question:
      "A fleet of gp2 EBS volumes carries a 20% cost premium over the equivalent gp3 configuration at identical performance. What is the correct migration action?",
    options: [
      "Modify each volume's type from gp2 to gp3 in place, keeping performance settings",
      "Snapshot every volume and restore to new gp3 volumes during downtime",
      "Resize each volume 20% smaller after switching to gp3",
      "Recreate instances with instance store volumes",
    ],
    correctAnswers: [0],
    explanation:
      "Elastic volume modification converts gp2 to gp3 online, preserving data and letting you match prior IOPS and throughput while saving cost. Snapshot-restore forces downtime, shrinking volumes is not possible, and instance store is ephemeral.",
  },
  {
    id: 337,
    category: "Cost Optimization",
    question:
      "A telemetry system stores billions of 2 KB objects. Storage cost is modest, but S3 request charges dominate the monthly bill. Which architectural change reduces request costs most?",
    options: [
      "Aggregate many small records into fewer larger objects before writing (batching into files)",
      "Enable S3 Transfer Acceleration for the writers",
      "Switch the bucket to Intelligent-Tiering",
      "Enable versioning to consolidate requests",
    ],
    correctAnswers: [0],
    explanation:
      "Request pricing is per-operation, so consolidating many tiny writes into fewer larger objects removes most of the request bill. Acceleration changes transfer path pricing upward, Intelligent-Tiering affects storage fees, and versioning adds objects rather than requests.",
  },
  {
    id: 338,
    category: "Cost Optimization",
    question:
      "A resilience design copies S3 objects to a second bucket. Compliance allows either same-Region or cross-Region copies. Finance wants the cheaper option that still protects against AZ-level events. Which replication choice fits?",
    options: [
      "Same-Region Replication to a bucket in a different AZ",
      "Cross-Region Replication to a bucket 1,000 miles away",
      "No replication; rely on S3's multi-AZ durability",
      "Bidirectional replication between two Regions",
    ],
    correctAnswers: [0],
    explanation:
      "S3 already stores data across multiple AZs, so same-Region replication into a separate bucket adds resilience at much lower transfer cost than cross-Region replication, which adds inter-Region data transfer charges and doubles distance-based exposure management. Skipping replication fails the extra-resilience goal, and bidirectional is the most expensive option.",
  },
  {
    id: 339,
    category: "Cost Optimization",
    question:
      "A cost review finds 40 unattached EBS volumes and 900 snapshots older than two years with no retention requirement. What is the appropriate remediation?",
    options: [
      "Move the volumes to gp3 and keep the snapshots",
      "Delete the unattached volumes and remove snapshots past their retention requirement, after confirmation",
      "Convert the volumes into AMIs for safekeeping",
      "Archive the volumes with EBS snapshot archive",
    ],
    correctAnswers: [1],
    explanation:
      "Unattached volumes and expired snapshots are pure storage spend; deleting them (with stakeholder confirmation) removes cost directly. Volume conversion and archiving reduce the rate but keep paying, and AMIs are instance images, not volume archival.",
  },
  {
    id: 340,
    category: "Cost Optimization",
    question:
      "A batch job runs for 5 minutes once per day and needs 16 GB of memory and 4 vCPUs. A team proposes a dedicated m5.xlarge (roughly $70/month) running 24/7. What is the cost-correct evaluation?",
    options: [
      "Keep the instance; Lambda cannot use 16 GB",
      "Run the job on Lambda, paying only for the ~2.5 minutes per day of execution, which is orders of magnitude cheaper",
      "Run the job on ECS with Fargate Spot, which guarantees 90% savings",
      "Keep the instance but stop it with a cron job",
    ],
    correctAnswers: [1],
    explanation:
      "For minutes-per-day workloads, per-invocation pricing like Lambda costs pennies per month versus a full instance bill. Lambda does support 16 GB configurations (up to 10 GB+ memory), Fargate Spot offers savings without the guarantee stated and still needs scheduling, and stopping an instance still leaves storage charges and coarse granularity.",
  },
  {
    id: 341,
    category: "Cost Optimization",
    question:
      "A burstable t3 instance's CPU credit balance is exhausted, and CPU utilization is being throttled during business peaks every day. Which remediation fits the sustained-load profile?",
    options: [
      "Enable T3 Unlimited mode and accept the small overage charges, or migrate to a fixed-performance family such as m5",
      "Purchase additional CPU credits from the marketplace",
      "Add more t3 instances behind the load balancer to share credits",
      "Reduce the application's CPU usage through code review",
    ],
    correctAnswers: [0],
    explanation:
      "Sustained daily peaks exhaust burst credits by design; Unlimited mode removes throttling for modest fees, and fixed-performance families remove the burst model entirely. Credits are not purchasable separately, spreading load multiplies burst-mode instances with the same ceiling, and code tuning does not change a capacity-model mismatch.",
  },
  {
    id: 342,
    category: "Cost Optimization",
    question:
      "Which two S3 configurations reduce total S3 cost? (Select TWO.)",
    options: [
      "Lifecycle rules transitioning objects to lower-cost classes by age",
      "A rule aborting incomplete multipart uploads after 7 days",
      "Enabling versioning on every bucket",
      "Cross-Region Replication for all buckets",
      "S3 Transfer Acceleration on all uploads",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Lifecycle transitions move cold data to cheaper classes, and aborting incomplete multipart uploads removes hidden orphaned-part storage. Versioning and CRR add storage (and transfer) cost, and acceleration increases transfer pricing.",
  },
  {
    id: 343,
    category: "Cost Optimization",
    question:
      "FinOps wants to verify that Compute Savings Plans commitments are actually being consumed and to see what percentage of eligible compute usage is covered by commitments. Which Cost Explorer reports show this?",
    options: [
      "Savings Plans utilization and coverage reports",
      "Reservation recommendations report",
      "Cost allocation tag report",
      "RI modification report",
    ],
    correctAnswers: [0],
    explanation:
      "Utilization shows how much of purchased commitment is consumed; coverage shows the share of eligible usage paid at commitment rates — together they measure commitment health. Recommendations suggest purchases, tag reports break down spend, and modification reports are RI-specific tooling.",
  },
  {
    id: 344,
    category: "Cost Optimization",
    question:
      "A finance analyst is tired of discovering cost spikes two weeks after they occur during invoice review. Which feature alerts within hours when spending patterns deviate from learned baselines for specific services or linked accounts?",
    options: [
      "AWS Cost Anomaly Detection",
      "AWS Budgets with a fixed monthly threshold",
      "CloudWatch billing metric alarms",
      "Trusted Advisor cost checks",
    ],
    correctAnswers: [0],
    explanation:
      "Cost Anomaly Detection applies ML to daily spend patterns per service, account, or cost category and raises alerts when behavior deviates — catching novel spikes early. Fixed budget thresholds only fire at aggregate numbers, billing alarms are coarse daily aggregates, and Trusted Advisor provides periodic recommendations.",
  },
  {
    id: 345,
    category: "Management & Governance",
    question:
      "An enterprise brings its own software licenses to AWS and must track license usage and compliance across 30 accounts, with alerts when usage approaches entitlement limits. Which service provides this?",
    options: [
      "AWS License Manager",
      "AWS Artifact",
      "AWS Compute Optimizer",
      "AWS Systems Manager Inventory",
    ],
    correctAnswers: [0],
    explanation:
      "License Manager tracks license entitlements and usage across accounts and enforces limits, integrating with Dedicated Hosts and BYOL workloads. Artifact holds compliance documents, Compute Optimizer sizes infrastructure, and Systems Manager inventories software without license-entitlement logic.",
  },
  {
    id: 346,
    category: "Compute",
    question:
      "A Spot fleet must minimize the chance that a capacity reclamation event stalls a critical job, even at slightly higher Spot prices. Which Spot allocation strategy should be chosen?",
    options: [
      "Lowest-price allocation",
      "Capacity-optimized allocation",
      "Price capacity-optimized with lowest price priority only",
      "Diversified across On-Demand only",
    ],
    correctAnswers: [1],
    explanation:
      "Capacity-optimized allocation selects pools with the most available spare capacity, minimizing interruption probability — the recommended strategy when interruptions are costly. Lowest-price optimizes cost but concentrates on volatile pools, and On-Demand diversity abandons Spot savings entirely.",
  },
  {
    id: 347,
    category: "Cost Optimization",
    question:
      "A company runs a 4-node Redshift cluster 24/7 for at least the next three years with stable sizing. Which pricing option reduces its cost most?",
    options: [
      "Redshift reserved node pricing for a three-year term",
      "Redshift Spectrum usage commitments",
      "Compute Savings Plans, which cover Redshift",
      "On-Demand with scheduled pause via pausing clusters",
    ],
    correctAnswers: [0],
    explanation:
      "Reserved node pricing offers the deepest discount for steady Redshift clusters over one- or three-year terms. Spectrum is a query feature, Compute Savings Plans do not cover Redshift (they cover EC2, Fargate, Lambda), and pausing is for intermittent clusters, not 24/7 analytics.",
  },
];
