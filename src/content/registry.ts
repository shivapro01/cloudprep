import type { ComponentType } from "react";
import { Lesson111, Lesson112, Lesson113, Lesson114, Lesson115, Lesson116 } from "./secure-access/lessons-a";
import { Lesson117, Lesson118, Lesson119 } from "./secure-access/lessons-b";
import { Lesson1110, Lesson1111, Lesson1112 } from "./secure-access/lessons-c";
import { Lesson121, Lesson122, Lesson123, Lesson124 } from "./secure-workloads/lessons-a";
import { Lesson125, Lesson126, Lesson127, Lesson128 } from "./secure-workloads/lessons-b";
import { Lesson129, Lesson1210, Lesson1211, Lesson1212 } from "./secure-workloads/lessons-c";
import { Lesson1213, Lesson1214, Lesson1215 } from "./secure-workloads/lessons-d";
import { Lesson1216, Lesson1217, Lesson1218 } from "./secure-workloads/lessons-e";
import { Lesson131, Lesson132, Lesson133, Lesson134 } from "./data-security/lessons-a";
import { Lesson135, Lesson136, Lesson137, Lesson138 } from "./data-security/lessons-b";
import { Lesson211, Lesson212, Lesson213, Lesson214, Lesson215 } from "./resilience/lessons-a";
import { Lesson216, Lesson217, Lesson218, Lesson219, Lesson2110 } from "./resilience/lessons-b";
import { Lesson221, Lesson222, Lesson223, Lesson224, Lesson225, Lesson226 } from "./resilience/lessons-c";
import { Lesson227, Lesson228, Lesson229, Lesson2210, Lesson2211, Lesson2212 } from "./resilience/lessons-d";
import { Lesson231, Lesson232, Lesson233 } from "./resilience/lessons-e";
import { Lesson234, Lesson235, Lesson236 } from "./resilience/lessons-f";
import { Lesson311, Lesson312, Lesson313, Lesson314, Lesson315 } from "./performance/lessons-storage";
import { Lesson321, Lesson322, Lesson323, Lesson324, Lesson325, Lesson326, Lesson327 } from "./performance/lessons-compute";
import { Lesson331, Lesson332, Lesson333, Lesson334, Lesson335, Lesson336, Lesson337, Lesson338 } from "./performance/lessons-db";
import { Lesson341, Lesson342, Lesson343, Lesson344, Lesson345 } from "./performance/lessons-network";
import { Lesson351, Lesson352, Lesson353, Lesson354, Lesson355 } from "./performance/lessons-ingest";
import { Lesson411, Lesson412, Lesson413, Lesson414, Lesson415 } from "./cost/lessons-a";
import { Lesson421, Lesson422, Lesson423, Lesson424, Lesson425, Lesson426 } from "./cost/lessons-b";
import { Lesson431, Lesson432, Lesson433, Lesson434 } from "./cost/lessons-c";
import { Lesson441, Lesson442, Lesson443, Lesson444 } from "./cost/lessons-d";

export interface LessonRecord {
  /** Matches the topic id in study-guide.ts, e.g. "1.1.3". */
  id: string;
  title: string;
  /** Compact label for the mobile pill bar. */
  short: string;
  minutes: number;
  Component: ComponentType;
}

export const sectionLessons: Record<string, LessonRecord[]> = {
  "1.1": [
    { id: "1.1.1", title: "IAM identities: users, groups, roles, and policy types", short: "IAM identities", minutes: 10, Component: Lesson111 },
    { id: "1.1.2", title: "IAM policy evaluation logic: explicit deny, SCPs, permission boundaries, session policies", short: "Policy evaluation", minutes: 12, Component: Lesson112 },
    { id: "1.1.3", title: "Root user hardening and account-level security (MFA, break-glass)", short: "Root hardening", minutes: 8, Component: Lesson113 },
    { id: "1.1.4", title: "Federation and workforce access: IAM Identity Center, SAML/OIDC", short: "Identity Center", minutes: 9, Component: Lesson114 },
    { id: "1.1.5", title: "Application identity: Cognito user pools vs identity pools", short: "Cognito", minutes: 10, Component: Lesson115 },
    { id: "1.1.6", title: "Cross-account access: role assumption, resource policies, external ID", short: "Cross-account", minutes: 10, Component: Lesson116 },
    { id: "1.1.7", title: "Attribute-based access control (ABAC) and policy variables", short: "ABAC", minutes: 9, Component: Lesson117 },
    { id: "1.1.8", title: "Service roles, service-linked roles, and iam:PassRole", short: "Service roles & PassRole", minutes: 9, Component: Lesson118 },
    { id: "1.1.9", title: "Organizations, OUs, and service control policies (SCPs)", short: "Organizations & SCPs", minutes: 10, Component: Lesson119 },
    { id: "1.1.10", title: "Control Tower landing zones and account guardrails", short: "Control Tower", minutes: 8, Component: Lesson1110 },
    { id: "1.1.11", title: "STS and temporary credentials: duration, session tags, transitivity", short: "STS sessions", minutes: 9, Component: Lesson1111 },
    { id: "1.1.12", title: "Secrets and configuration: Secrets Manager vs Parameter Store", short: "Secrets vs Parameters", minutes: 8, Component: Lesson1112 },
  ],
  "1.2": [
    { id: "1.2.1", title: "AWS WAF: rules, managed rule groups, bot control, rate limiting, CAPTCHA/challenge", short: "AWS WAF", minutes: 12, Component: Lesson121 },
    { id: "1.2.2", title: "AWS Shield Standard vs Advanced (SRT, cost protection, proactive engagement)", short: "Shield", minutes: 9, Component: Lesson122 },
    { id: "1.2.3", title: "Threat detection: GuardDuty (incl. S3/EKS/RDS/runtime protections)", short: "GuardDuty", minutes: 12, Component: Lesson123 },
    { id: "1.2.4", title: "Vulnerability scanning: Inspector (EC2, Lambda, ECR enhanced)", short: "Inspector", minutes: 9, Component: Lesson124 },
    { id: "1.2.5", title: "Data discovery and classification: Amazon Macie", short: "Macie", minutes: 8, Component: Lesson125 },
    { id: "1.2.6", title: "Security posture: Security Hub standards and automation, Detective investigations", short: "Security Hub & Detective", minutes: 10, Component: Lesson126 },
    { id: "1.2.7", title: "VPC boundary controls: security groups vs NACLs, Network Firewall (incl. TLS inspection)", short: "VPC firewalls", minutes: 12, Component: Lesson127 },
    { id: "1.2.8", title: "Centralized policy: AWS Firewall Manager", short: "Firewall Manager", minutes: 8, Component: Lesson128 },
    { id: "1.2.9", title: "Encryption with KMS: key policies, grants, rotation, multi-Region keys, bucket keys", short: "KMS", minutes: 12, Component: Lesson129 },
    { id: "1.2.10", title: "HSM options: CloudHSM, custom key stores, external key stores (XKS)", short: "HSM options", minutes: 8, Component: Lesson1210 },
    { id: "1.2.11", title: "Envelope encryption and the AWS Encryption SDK (data key caching)", short: "Envelope encryption", minutes: 9, Component: Lesson1211 },
    { id: "1.2.12", title: "Certificates and TLS: ACM public/private, AWS Private CA, mutual TLS", short: "ACM & TLS", minutes: 10, Component: Lesson1212 },
    { id: "1.2.13", title: "Secrets rotation strategies (alternating users, zero downtime)", short: "Secrets rotation", minutes: 9, Component: Lesson1213 },
    { id: "1.2.14", title: "Nitro Enclaves for sensitive data processing", short: "Nitro Enclaves", minutes: 8, Component: Lesson1214 },
    { id: "1.2.15", title: "Application access controls: ALB authentication actions, API Gateway authorizers", short: "App access controls", minutes: 10, Component: Lesson1215 },
    { id: "1.2.16", title: "Workload identity outside AWS: IAM Roles Anywhere and CI/CD OIDC federation", short: "Roles Anywhere", minutes: 9, Component: Lesson1216 },
    { id: "1.2.17", title: "Secure access to compute: Session Manager, IMDSv2, no-SSH patterns", short: "Session Manager", minutes: 10, Component: Lesson1217 },
    { id: "1.2.18", title: "Service-to-service authentication: SigV4 signing, IAM auth, mTLS", short: "SigV4", minutes: 9, Component: Lesson1218 },
  ],
  "1.3": [
    { id: "1.3.1", title: "S3 security model: Block Public Access, bucket policies, presigned URLs", short: "S3 security model", minutes: 12, Component: Lesson131 },
    { id: "1.3.2", title: "S3 immutability and sharing: Object Lock, access points, Multi-Region Access Points", short: "Object Lock & sharing", minutes: 10, Component: Lesson132 },
    { id: "1.3.3", title: "Encryption at rest across stores (EBS, S3, RDS/Aurora, EFS, FSx, DynamoDB, ElastiCache, Redshift)", short: "Encryption at rest", minutes: 12, Component: Lesson133 },
    { id: "1.3.4", title: "Encryption in transit: TLS enforcement, Site-to-Site VPN, Direct Connect (MACsec)", short: "Encryption in transit", minutes: 10, Component: Lesson134 },
    { id: "1.3.5", title: "Private service access: gateway vs interface VPC endpoints, PrivateLink", short: "Private access", minutes: 11, Component: Lesson135 },
    { id: "1.3.6", title: "Audit trails: CloudTrail organization trails, data events, log file integrity validation", short: "CloudTrail audit", minutes: 10, Component: Lesson136 },
    { id: "1.3.7", title: "Network visibility: VPC Flow Logs, Traffic Mirroring, Reachability Analyzer", short: "Network visibility", minutes: 9, Component: Lesson137 },
    { id: "1.3.8", title: "Data isolation and residency: cross-account separation, replication boundaries, residency rules", short: "Isolation & residency", minutes: 9, Component: Lesson138 },
  ],
  "2.1": [
    { id: "2.1.1", title: "Elastic Load Balancing: ALB vs NLB vs GWLB selection and features", short: "ELB selection", minutes: 12, Component: Lesson211 },
    { id: "2.1.2", title: "Target group mechanics: health checks, cross-zone, stickiness, slow start, deregistration delay", short: "Target groups", minutes: 10, Component: Lesson212 },
    { id: "2.1.3", title: "Auto Scaling groups: target tracking, step, predictive, and mixed-instance policies", short: "Scaling policies", minutes: 11, Component: Lesson213 },
    { id: "2.1.4", title: "ASG lifecycle: hooks, warm pools, instance refresh, capacity rebalancing, standby state", short: "ASG lifecycle", minutes: 10, Component: Lesson214 },
    { id: "2.1.5", title: "Decoupling with SQS: standard vs FIFO, DLQs, delays, high throughput, long polling", short: "SQS", minutes: 11, Component: Lesson215 },
    { id: "2.1.6", title: "Fan-out with SNS: topics, filter policies, FIFO, mobile push, data protection", short: "SNS fan-out", minutes: 10, Component: Lesson216 },
    { id: "2.1.7", title: "Event-driven design: EventBridge buses, rules, archives/replay, Scheduler, Pipes", short: "EventBridge", minutes: 11, Component: Lesson217 },
    { id: "2.1.8", title: "Orchestration: Step Functions (Standard/Express, Map, callbacks, sync integrations)", short: "Step Functions", minutes: 11, Component: Lesson218 },
    { id: "2.1.9", title: "API layers: API Gateway (REST/HTTP/WebSocket) and AppSync", short: "API Gateway & AppSync", minutes: 11, Component: Lesson219 },
    { id: "2.1.10", title: "Container orchestration patterns: ECS/EKS service discovery and deployment strategies", short: "Containers", minutes: 10, Component: Lesson2110 },
  ],
  "2.2": [
    { id: "2.2.1", title: "Multi-AZ high availability patterns per service", short: "Multi-AZ patterns", minutes: 11, Component: Lesson221 },
    { id: "2.2.2", title: "Disaster recovery strategies: backup/restore, pilot light, warm standby, multi-site", short: "DR strategies", minutes: 12, Component: Lesson222 },
    { id: "2.2.3", title: "RTO/RPO targets and cost trade-offs per strategy", short: "RTO/RPO targets", minutes: 9, Component: Lesson223 },
    { id: "2.2.4", title: "Multi-Region patterns: active/passive vs active/active", short: "Multi-Region patterns", minutes: 10, Component: Lesson224 },
    { id: "2.2.5", title: "Data-layer resilience: DynamoDB global tables, Aurora global, ElastiCache/MemoryDB global", short: "Data-layer resilience", minutes: 10, Component: Lesson225 },
    { id: "2.2.6", title: "DNS failover: Route 53 routing policies, health checks, ARC routing/zonal shift", short: "DNS failover", minutes: 10, Component: Lesson226 },
    { id: "2.2.7", title: "Global Accelerator for fast regional failover", short: "Global Accelerator", minutes: 8, Component: Lesson227 },
    { id: "2.2.8", title: "AWS Backup: plans, cross-Region/account copies, Vault Lock, restore testing, Audit Manager", short: "AWS Backup", minutes: 10, Component: Lesson228 },
    { id: "2.2.9", title: "Elastic Disaster Recovery (DRS) for lift-and-shift DR", short: "Elastic DR", minutes: 8, Component: Lesson229 },
    { id: "2.2.10", title: "Resilience Hub policies and Fault Injection Service testing", short: "Resilience testing", minutes: 9, Component: Lesson2210 },
    { id: "2.2.11", title: "Database HA: Multi-AZ vs read replicas, promotion patterns, failover tuning", short: "Database HA", minutes: 10, Component: Lesson2211 },
    { id: "2.2.12", title: "Single points of failure: auditing a design and removing SPOFs tier by tier", short: "SPOF audit", minutes: 9, Component: Lesson2212 },
  ],
  "2.3": [
    { id: "2.3.1", title: "S3 durability and availability model (multi-AZ design, versioning)", short: "S3 durability", minutes: 10, Component: Lesson231 },
    { id: "2.3.2", title: "EBS resilience: volumes, snapshots, Recycle Bin, SnapLock, Fast Snapshot Restore", short: "EBS resilience", minutes: 11, Component: Lesson232 },
    { id: "2.3.3", title: "Instance store characteristics and limits", short: "Instance store", minutes: 8, Component: Lesson233 },
    { id: "2.3.4", title: "EFS resilience: Standard vs One Zone trade-offs", short: "EFS resilience", minutes: 8, Component: Lesson234 },
    { id: "2.3.5", title: "FSx availability (Multi-AZ) and backup-based recovery", short: "FSx availability", minutes: 10, Component: Lesson235 },
    { id: "2.3.6", title: "Backup vs replication trade-offs per storage service", short: "Backup vs replication", minutes: 10, Component: Lesson236 },
  ],
  "3.1": [
    { id: "3.1.1", title: "S3 performance design: prefix scaling, multipart uploads, Transfer Acceleration, Express One Zone", short: "S3 performance", minutes: 10, Component: Lesson311 },
    { id: "3.1.2", title: "EBS volume selection and tuning: gp3, io2, st1, sc1, Multi-Attach", short: "EBS selection", minutes: 10, Component: Lesson312 },
    { id: "3.1.3", title: "Instance store NVMe for scratch and throughput", short: "Instance store", minutes: 8, Component: Lesson313 },
    { id: "3.1.4", title: "EFS performance: performance modes and throughput modes", short: "EFS performance", minutes: 8, Component: Lesson314 },
    { id: "3.1.5", title: "FSx family selection: Windows, Lustre, ONTAP, OpenZFS", short: "FSx selection", minutes: 9, Component: Lesson315 },
  ],
  "3.2": [
    { id: "3.2.1", title: "EC2 instance family selection (general, compute, memory, storage, accelerated, Graviton)", short: "EC2 families", minutes: 9, Component: Lesson321 },
    { id: "3.2.2", title: "Placement groups: cluster, spread, partition", short: "Placement groups", minutes: 8, Component: Lesson322 },
    { id: "3.2.3", title: "Capacity options: On-Demand, Reserved, Savings Plans, Spot strategies, Capacity Reservations/Blocks", short: "Capacity options", minutes: 10, Component: Lesson323 },
    { id: "3.2.4", title: "EC2 networking for HPC: EFA and cluster placement", short: "EFA for HPC", minutes: 7, Component: Lesson324 },
    { id: "3.2.5", title: "Lambda deep dive: concurrency, cold starts, SnapStart, layers, EFS mounts, limits", short: "Lambda deep dive", minutes: 10, Component: Lesson325 },
    { id: "3.2.6", title: "Container compute: ECS launch types, EKS node options, Karpenter", short: "Container compute", minutes: 10, Component: Lesson326 },
    { id: "3.2.7", title: "Edge compute: Local Zones, Wavelength, Outposts", short: "Edge compute", minutes: 8, Component: Lesson327 },
  ],
  "3.3": [
    { id: "3.3.1", title: "RDS performance: read replicas, write forwarding, RDS Proxy, Performance Insights", short: "RDS performance", minutes: 10, Component: Lesson331 },
    { id: "3.3.2", title: "Aurora performance: replicas, global database, Serverless v2, parallel query, I/O-Optimized", short: "Aurora performance", minutes: 10, Component: Lesson332 },
    { id: "3.3.3", title: "Aurora operations: cloning, backtrack, zero-ETL, blue/green deployments", short: "Aurora operations", minutes: 9, Component: Lesson333 },
    { id: "3.3.4", title: "DynamoDB design: partition keys, GSIs/LSIs, adaptive capacity, warm throughput", short: "DynamoDB design", minutes: 10, Component: Lesson334 },
    { id: "3.3.5", title: "DynamoDB advanced: DAX, capacity modes, transactions, Streams, TTL, Standard-IA", short: "DynamoDB advanced", minutes: 10, Component: Lesson335 },
    { id: "3.3.6", title: "Caching: ElastiCache (Redis/Memcached), MemoryDB, caching strategies (lazy loading, write-through)", short: "Caching", minutes: 10, Component: Lesson336 },
    { id: "3.3.7", title: "Analytics stores: Redshift (RA3, Serverless, Spectrum, concurrency scaling), OpenSearch", short: "Analytics stores", minutes: 10, Component: Lesson337 },
    { id: "3.3.8", title: "Purpose-built selection: Neptune, Keyspaces, Timestream, QLDB, DocumentDB", short: "Purpose-built DBs", minutes: 9, Component: Lesson338 },
  ],
  "3.4": [
    { id: "3.4.1", title: "VPC design for performance: subnets, AZ spread, secondary CIDRs, IPAM", short: "VPC design", minutes: 9, Component: Lesson341 },
    { id: "3.4.2", title: "Hybrid connectivity: Direct Connect (dedicated/hosted, LAG, gateway) and VPN", short: "Hybrid connectivity", minutes: 10, Component: Lesson342 },
    { id: "3.4.3", title: "Network topologies: Transit Gateway, peering, PrivateLink, Cloud WAN", short: "Network topologies", minutes: 10, Component: Lesson343 },
    { id: "3.4.4", title: "Edge and content delivery: CloudFront caching design, Origin Shield, Global Accelerator", short: "Edge & content delivery", minutes: 10, Component: Lesson344 },
    { id: "3.4.5", title: "DNS performance: Route 53 latency routing, health-based resolution", short: "DNS performance", minutes: 9, Component: Lesson345 },
  ],
  "3.5": [
    { id: "3.5.1", title: "Kinesis family: Data Streams, Data Firehose (incl. dynamic partitioning), Data Analytics, Video Streams", short: "Kinesis family", minutes: 11, Component: Lesson351 },
    { id: "3.5.2", title: "Amazon MSK: provisioned vs serverless, Connect, Replicator", short: "Amazon MSK", minutes: 9, Component: Lesson352 },
    { id: "3.5.3", title: "Batch transformation: AWS Glue (bookmarks, catalogs), Amazon EMR", short: "Glue & EMR", minutes: 10, Component: Lesson353 },
    { id: "3.5.4", title: "IoT ingestion: IoT Core, Rules, Device Shadows, Greengrass, IoT Analytics", short: "IoT ingestion", minutes: 10, Component: Lesson354 },
    { id: "3.5.5", title: "Data movement: DataSync, Transfer Family, Snow Family, Database Migration Service", short: "Data movement", minutes: 10, Component: Lesson355 },
  ],
  "4.1": [
    { id: "4.1.1", title: "S3 storage class selection and lifecycle design (including Express One Zone and Glacier tiers)", short: "S3 classes & lifecycle", minutes: 10, Component: Lesson411 },
    { id: "4.1.2", title: "Intelligent-Tiering behavior, minimum sizes, and monitoring fees", short: "Intelligent-Tiering", minutes: 8, Component: Lesson412 },
    { id: "4.1.3", title: "EBS cost design: gp3 right-sizing, snapshot archive, incremental snapshot economics", short: "EBS cost design", minutes: 9, Component: Lesson413 },
    { id: "4.1.4", title: "EFS lifecycle and Infrequent Access classes", short: "EFS lifecycle", minutes: 8, Component: Lesson414 },
    { id: "4.1.5", title: "S3 Storage Lens, Inventory, and Storage Class Analysis for cost visibility", short: "S3 cost visibility", minutes: 9, Component: Lesson415 },
  ],
  "4.2": [
    { id: "4.2.1", title: "Commitment strategy: Standard/Convertible RIs vs Compute/Instance Savings Plans", short: "Commitments", minutes: 10, Component: Lesson421 },
    { id: "4.2.2", title: "Spot strategies: allocation policies, checkpointing, capacity rebalancing, Spot placement score", short: "Spot strategies", minutes: 10, Component: Lesson422 },
    { id: "4.2.3", title: "Right-sizing with Compute Optimizer and Trusted Advisor", short: "Right-sizing", minutes: 9, Component: Lesson423 },
    { id: "4.2.4", title: "Serverless vs container vs EC2 cost decisions (Lambda memory tuning, Graviton, Fargate Spot)", short: "Compute model choice", minutes: 10, Component: Lesson424 },
    { id: "4.2.5", title: "Environment scheduling: Instance Scheduler patterns, EC2 hibernation, stop protection costs", short: "Environment scheduling", minutes: 9, Component: Lesson425 },
    { id: "4.2.6", title: "Cost governance: Budgets actions, Cost Anomaly Detection, CUR, cost allocation tags", short: "Cost governance", minutes: 10, Component: Lesson426 },
  ],
  "4.3": [
    { id: "4.3.1", title: "Aurora vs RDS economics (shared storage, I/O-Optimized, Serverless v2)", short: "Aurora vs RDS economics", minutes: 9, Component: Lesson431 },
    { id: "4.3.2", title: "DynamoDB cost: capacity modes, reserved capacity, Standard-IA class, TTL", short: "DynamoDB cost", minutes: 9, Component: Lesson432 },
    { id: "4.3.3", title: "ElastiCache/MemoryDB sizing, data tiering, and serverless caches", short: "Cache cost levers", minutes: 9, Component: Lesson433 },
    { id: "4.3.4", title: "Redshift cost: RA3, reserved nodes, Serverless, concurrency scaling pricing", short: "Redshift cost", minutes: 9, Component: Lesson434 },
  ],
  "4.4": [
    { id: "4.4.1", title: "NAT gateway vs VPC endpoint economics", short: "NAT vs endpoints", minutes: 9, Component: Lesson441 },
    { id: "4.4.2", title: "Data transfer costs: inter-AZ, cross-Region, internet egress via CloudFront", short: "Data transfer costs", minutes: 10, Component: Lesson442 },
    { id: "4.4.3", title: "Connectivity cost trade-offs: Direct Connect vs VPN vs internet", short: "Connectivity costs", minutes: 9, Component: Lesson443 },
    { id: "4.4.4", title: "CloudFront price classes and delivery cost optimization", short: "CloudFront cost", minutes: 9, Component: Lesson444 },
  ],
};

/** All topic ids that currently have lesson content. */
export const availableTopicIds = new Set(
  Object.values(sectionLessons).flatMap((lessons) => lessons.map((l) => l.id)),
);

export function lessonsForSection(sectionNumber: string): LessonRecord[] {
  return sectionLessons[sectionNumber] ?? [];
}

export function lessonHref(sectionNumber: string, topicId: string): string {
  return `/study/${sectionNumber}/${topicId}`;
}
