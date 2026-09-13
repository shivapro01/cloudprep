/**
 * SAA-C03 study guide outline, ordered by the official exam guide domains.
 * Each topic is a placeholder for future lesson content — fill in `summary`
 * or attach full pages later without changing the page structure.
 */

export interface StudyTopic {
  id: string;
  title: string;
}

export interface StudySection {
  /** Exam guide objective number, e.g. "1.1". */
  number: string;
  title: string;
  topics: StudyTopic[];
}

export interface StudyDomain {
  number: number;
  title: string;
  /** Exam weighting in percent. */
  weight: number;
  sections: StudySection[];
}

export const studyDomains: StudyDomain[] = [
  {
    number: 1,
    title: "Design Secure Architectures",
    weight: 30,
    sections: [
      {
        number: "1.1",
        title: "Design secure access to AWS resources",
        topics: [
          { id: "1.1.1", title: "IAM identities: users, groups, roles, and policy types" },
          { id: "1.1.2", title: "IAM policy evaluation logic: explicit deny, SCPs, permission boundaries, session policies" },
          { id: "1.1.3", title: "Root user hardening and account-level security (MFA, break-glass)" },
          { id: "1.1.4", title: "Federation and workforce access: IAM Identity Center, SAML/OIDC" },
          { id: "1.1.5", title: "Application identity: Cognito user pools vs identity pools" },
          { id: "1.1.6", title: "Cross-account access: role assumption, resource policies, external ID" },
          { id: "1.1.7", title: "Attribute-based access control (ABAC) and policy variables" },
          { id: "1.1.8", title: "Service roles, service-linked roles, and iam:PassRole" },
          { id: "1.1.9", title: "Organizations, OUs, and service control policies (SCPs)" },
          { id: "1.1.10", title: "Control Tower landing zones and account guardrails" },
          { id: "1.1.11", title: "STS and temporary credentials: duration, session tags, transitivity" },
          { id: "1.1.12", title: "Secrets and configuration: Secrets Manager vs Parameter Store" },
        ],
      },
      {
        number: "1.2",
        title: "Design secure workloads and applications",
        topics: [
          { id: "1.2.1", title: "AWS WAF: rules, managed rule groups, bot control, rate limiting, CAPTCHA/challenge" },
          { id: "1.2.2", title: "AWS Shield Standard vs Advanced (SRT, cost protection, proactive engagement)" },
          { id: "1.2.3", title: "Threat detection: GuardDuty (incl. S3/EKS/RDS/runtime protections)" },
          { id: "1.2.4", title: "Vulnerability scanning: Inspector (EC2, Lambda, ECR enhanced)" },
          { id: "1.2.5", title: "Data discovery and classification: Amazon Macie" },
          { id: "1.2.6", title: "Security posture: Security Hub standards and automation, Detective investigations" },
          { id: "1.2.7", title: "VPC boundary controls: security groups vs NACLs, Network Firewall (incl. TLS inspection)" },
          { id: "1.2.8", title: "Centralized policy: AWS Firewall Manager" },
          { id: "1.2.9", title: "Encryption with KMS: key policies, grants, rotation, multi-Region keys, bucket keys" },
          { id: "1.2.10", title: "HSM options: CloudHSM, custom key stores, external key stores (XKS)" },
          { id: "1.2.11", title: "Envelope encryption and the AWS Encryption SDK (data key caching)" },
          { id: "1.2.12", title: "Certificates and TLS: ACM public/private, AWS Private CA, mutual TLS" },
          { id: "1.2.13", title: "Secrets rotation strategies (alternating users, zero downtime)" },
          { id: "1.2.14", title: "Nitro Enclaves for sensitive data processing" },
          { id: "1.2.15", title: "Application access controls: ALB authentication actions, API Gateway authorizers" },
          { id: "1.2.16", title: "Workload identity outside AWS: IAM Roles Anywhere and CI/CD OIDC federation" },
          { id: "1.2.17", title: "Secure access to compute: Session Manager, IMDSv2, no-SSH patterns" },
          { id: "1.2.18", title: "Service-to-service authentication: SigV4 signing, IAM auth, mTLS" },
        ],
      },
      {
        number: "1.3",
        title: "Select appropriate data security controls",
        topics: [
          { id: "1.3.1", title: "S3 security model: Block Public Access, bucket policies, presigned URLs" },
          { id: "1.3.2", title: "S3 immutability and sharing: Object Lock, access points, Multi-Region Access Points" },
          { id: "1.3.3", title: "Encryption at rest across stores (EBS, S3, RDS/Aurora, EFS, FSx, DynamoDB, ElastiCache, Redshift)" },
          { id: "1.3.4", title: "Encryption in transit: TLS enforcement, Site-to-Site VPN, Direct Connect (MACsec)" },
          { id: "1.3.5", title: "Private service access: gateway vs interface VPC endpoints, PrivateLink" },
          { id: "1.3.6", title: "Audit trails: CloudTrail organization trails, data events, log file integrity validation" },
          { id: "1.3.7", title: "Network visibility: VPC Flow Logs, Traffic Mirroring, Reachability Analyzer" },
          { id: "1.3.8", title: "Data isolation and residency: cross-account separation, replication boundaries, residency rules" },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Design Resilient Architectures",
    weight: 26,
    sections: [
      {
        number: "2.1",
        title: "Design scalable and loosely coupled architectures",
        topics: [
          { id: "2.1.1", title: "Elastic Load Balancing: ALB vs NLB vs GWLB selection and features" },
          { id: "2.1.2", title: "Target group mechanics: health checks, cross-zone, stickiness, slow start, deregistration delay" },
          { id: "2.1.3", title: "Auto Scaling groups: target tracking, step, predictive, and mixed-instance policies" },
          { id: "2.1.4", title: "ASG lifecycle: hooks, warm pools, instance refresh, capacity rebalancing, standby state" },
          { id: "2.1.5", title: "Decoupling with SQS: standard vs FIFO, DLQs, delays, high throughput, long polling" },
          { id: "2.1.6", title: "Fan-out with SNS: topics, filter policies, FIFO, mobile push, data protection" },
          { id: "2.1.7", title: "Event-driven design: EventBridge buses, rules, archives/replay, Scheduler, Pipes" },
          { id: "2.1.8", title: "Orchestration: Step Functions (Standard/Express, Map, callbacks, sync integrations)" },
          { id: "2.1.9", title: "API layers: API Gateway (REST/HTTP/WebSocket) and AppSync" },
          { id: "2.1.10", title: "Container orchestration patterns: ECS/EKS service discovery and deployment strategies" },
        ],
      },
      {
        number: "2.2",
        title: "Design highly available and/or fault-tolerant architectures",
        topics: [
          { id: "2.2.1", title: "Multi-AZ high availability patterns per service" },
          { id: "2.2.2", title: "Disaster recovery strategies: backup/restore, pilot light, warm standby, multi-site" },
          { id: "2.2.3", title: "RTO/RPO targets and cost trade-offs per strategy" },
          { id: "2.2.4", title: "Multi-Region patterns: active/passive vs active/active" },
          { id: "2.2.5", title: "Data-layer resilience: DynamoDB global tables, Aurora global, ElastiCache/MemoryDB global" },
          { id: "2.2.6", title: "DNS failover: Route 53 routing policies, health checks, ARC routing/zonal shift" },
          { id: "2.2.7", title: "Global Accelerator for fast regional failover" },
          { id: "2.2.8", title: "AWS Backup: plans, cross-Region/account copies, Vault Lock, restore testing, Audit Manager" },
          { id: "2.2.9", title: "Elastic Disaster Recovery (DRS) for lift-and-shift DR" },
          { id: "2.2.10", title: "Resilience Hub policies and Fault Injection Service testing" },
          { id: "2.2.11", title: "Database HA: Multi-AZ vs read replicas, promotion patterns, failover tuning" },
          { id: "2.2.12", title: "Single points of failure: auditing a design and removing SPOFs tier by tier" },
        ],
      },
      {
        number: "2.3",
        title: "Select appropriate highly available and/or resilient storage",
        topics: [
          { id: "2.3.1", title: "S3 durability and availability model (multi-AZ design, versioning)" },
          { id: "2.3.2", title: "EBS resilience: volumes, snapshots, Recycle Bin, SnapLock, Fast Snapshot Restore" },
          { id: "2.3.3", title: "Instance store characteristics and limits" },
          { id: "2.3.4", title: "EFS resilience: Standard vs One Zone trade-offs" },
          { id: "2.3.5", title: "FSx availability (Multi-AZ) and backup-based recovery" },
          { id: "2.3.6", title: "Backup vs replication trade-offs per storage service" },
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Design High-Performing Architectures",
    weight: 24,
    sections: [
      {
        number: "3.1",
        title: "Determine high-performing and/or scalable storage solutions",
        topics: [
          { id: "3.1.1", title: "S3 performance design: prefix scaling, multipart uploads, Transfer Acceleration, Express One Zone" },
          { id: "3.1.2", title: "EBS volume selection and tuning: gp3, io2, st1, sc1, Multi-Attach" },
          { id: "3.1.3", title: "Instance store NVMe for scratch and throughput" },
          { id: "3.1.4", title: "EFS performance: performance modes and throughput modes" },
          { id: "3.1.5", title: "FSx family selection: Windows, Lustre, ONTAP, OpenZFS" },
        ],
      },
      {
        number: "3.2",
        title: "Determine high-performing and/or elastic compute solutions",
        topics: [
          { id: "3.2.1", title: "EC2 instance family selection (general, compute, memory, storage, accelerated, Graviton)" },
          { id: "3.2.2", title: "Placement groups: cluster, spread, partition" },
          { id: "3.2.3", title: "Capacity options: On-Demand, Reserved, Savings Plans, Spot strategies, Capacity Reservations/Blocks" },
          { id: "3.2.4", title: "EC2 networking for HPC: EFA and cluster placement" },
          { id: "3.2.5", title: "Lambda deep dive: concurrency, cold starts, SnapStart, layers, EFS mounts, limits" },
          { id: "3.2.6", title: "Container compute: ECS launch types, EKS node options, Karpenter" },
          { id: "3.2.7", title: "Edge compute: Local Zones, Wavelength, Outposts" },
        ],
      },
      {
        number: "3.3",
        title: "Determine high-performing database solutions",
        topics: [
          { id: "3.3.1", title: "RDS performance: read replicas, write forwarding, RDS Proxy, Performance Insights" },
          { id: "3.3.2", title: "Aurora performance: replicas, global database, Serverless v2, parallel query, I/O-Optimized" },
          { id: "3.3.3", title: "Aurora operations: cloning, backtrack, zero-ETL, blue/green deployments" },
          { id: "3.3.4", title: "DynamoDB design: partition keys, GSIs/LSIs, adaptive capacity, warm throughput" },
          { id: "3.3.5", title: "DynamoDB advanced: DAX, capacity modes, transactions, Streams, TTL, Standard-IA" },
          { id: "3.3.6", title: "Caching: ElastiCache (Redis/Memcached), MemoryDB, caching strategies (lazy loading, write-through)" },
          { id: "3.3.7", title: "Analytics stores: Redshift (RA3, Serverless, Spectrum, concurrency scaling), OpenSearch" },
          { id: "3.3.8", title: "Purpose-built selection: Neptune, Keyspaces, Timestream, QLDB, DocumentDB" },
        ],
      },
      {
        number: "3.4",
        title: "Determine high-performing network architectures",
        topics: [
          { id: "3.4.1", title: "VPC design for performance: subnets, AZ spread, secondary CIDRs, IPAM" },
          { id: "3.4.2", title: "Hybrid connectivity: Direct Connect (dedicated/hosted, LAG, gateway) and VPN" },
          { id: "3.4.3", title: "Network topologies: Transit Gateway, peering, PrivateLink, Cloud WAN" },
          { id: "3.4.4", title: "Edge and content delivery: CloudFront caching design, Origin Shield, Global Accelerator" },
          { id: "3.4.5", title: "DNS performance: Route 53 latency routing, health-based resolution" },
        ],
      },
      {
        number: "3.5",
        title: "Determine high-performing data ingestion and transformation solutions",
        topics: [
          { id: "3.5.1", title: "Kinesis family: Data Streams, Data Firehose (incl. dynamic partitioning), Data Analytics, Video Streams" },
          { id: "3.5.2", title: "Amazon MSK: provisioned vs serverless, Connect, Replicator" },
          { id: "3.5.3", title: "Batch transformation: AWS Glue (bookmarks, catalogs), Amazon EMR" },
          { id: "3.5.4", title: "IoT ingestion: IoT Core, Rules, Device Shadows, Greengrass, IoT Analytics" },
          { id: "3.5.5", title: "Data movement: DataSync, Transfer Family, Snow Family, Database Migration Service" },
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Design Cost-Optimized Architectures",
    weight: 20,
    sections: [
      {
        number: "4.1",
        title: "Design cost-optimized storage solutions",
        topics: [
          { id: "4.1.1", title: "S3 storage class selection and lifecycle design (including Express One Zone and Glacier tiers)" },
          { id: "4.1.2", title: "Intelligent-Tiering behavior, minimum sizes, and monitoring fees" },
          { id: "4.1.3", title: "EBS cost design: gp3 right-sizing, snapshot archive, incremental snapshot economics" },
          { id: "4.1.4", title: "EFS lifecycle and Infrequent Access classes" },
          { id: "4.1.5", title: "S3 Storage Lens, Inventory, and Storage Class Analysis for cost visibility" },
        ],
      },
      {
        number: "4.2",
        title: "Design cost-optimized compute solutions",
        topics: [
          { id: "4.2.1", title: "Commitment strategy: Standard/Convertible RIs vs Compute/Instance Savings Plans" },
          { id: "4.2.2", title: "Spot strategies: allocation policies, checkpointing, capacity rebalancing, Spot placement score" },
          { id: "4.2.3", title: "Right-sizing with Compute Optimizer and Trusted Advisor" },
          { id: "4.2.4", title: "Serverless vs container vs EC2 cost decisions (Lambda memory tuning, Graviton, Fargate Spot)" },
          { id: "4.2.5", title: "Environment scheduling: Instance Scheduler patterns, EC2 hibernation, stop protection costs" },
          { id: "4.2.6", title: "Cost governance: Budgets actions, Cost Anomaly Detection, CUR, cost allocation tags" },
        ],
      },
      {
        number: "4.3",
        title: "Design cost-optimized database solutions",
        topics: [
          { id: "4.3.1", title: "Aurora vs RDS economics (shared storage, I/O-Optimized, Serverless v2)" },
          { id: "4.3.2", title: "DynamoDB cost: capacity modes, reserved capacity, Standard-IA class, TTL" },
          { id: "4.3.3", title: "ElastiCache/MemoryDB sizing, data tiering, and serverless caches" },
          { id: "4.3.4", title: "Redshift cost: RA3, reserved nodes, Serverless, concurrency scaling pricing" },
        ],
      },
      {
        number: "4.4",
        title: "Design cost-optimized network architectures",
        topics: [
          { id: "4.4.1", title: "NAT gateway vs VPC endpoint economics" },
          { id: "4.4.2", title: "Data transfer costs: inter-AZ, cross-Region, internet egress via CloudFront" },
          { id: "4.4.3", title: "Connectivity cost trade-offs: Direct Connect vs VPN vs internet" },
          { id: "4.4.4", title: "CloudFront price classes and delivery cost optimization" },
        ],
      },
    ],
  },
];

export const studyTopicCount = studyDomains.reduce(
  (n, d) => n + d.sections.reduce((m, s) => m + s.topics.length, 0),
  0,
);
