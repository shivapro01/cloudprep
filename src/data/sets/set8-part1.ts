import type { QuizQuestion } from "../questions";

/** Practice Set 8 — questions 456–477 (advanced identity and data protection). Original questions. */
export const set8Part1: QuizQuestion[] = [
  {
    id: 456,
    category: "Security",
    question:
      "Each developer must access only their own S3 prefix (home/company/dev1/...), using a single shared policy rather than one policy per person. Which policy technique scopes access per principal automatically?",
    options: [
      "A policy variable such as ${aws:username} interpolated into the resource ARN",
      "A wildcard Resource of arn:aws:s3:::home/* for everyone",
      "A permissions boundary listing all developer names",
      "A bucket policy enumerating each developer's IAM ARN",
    ],
    correctAnswers: [0],
    explanation:
      "Policy variables substitute the caller's identity attributes into the Resource element at evaluation time, so one policy serves every developer. Full wildcards over-share, boundaries set ceilings rather than per-person scoping, and enumerated bucket policies recreate the per-person maintenance problem.",
  },
  {
    id: 457,
    category: "Security",
    question:
      "Developers may create Lambda functions but security requires that they can only attach specific execution roles — never an administrator role — when creating or updating functions. Which IAM mechanism enforces this?",
    options: [
      "A condition on iam:PassRole restricting the role ARN in the request",
      "A permissions boundary on every Lambda execution role",
      "A SCP denying lambda:CreateFunction entirely",
      "Resource-based policies on each allowed role",
    ],
    correctAnswers: [0],
    explanation:
      "Passing a role to a service requires iam:PassRole; conditioning that action on the iam:PassedToService or specific role ARNs lets developers create functions while capping which roles they can hand over. Boundaries govern the roles' own ceilings, blocking function creation is too blunt, and roles' resource policies don't regulate who passes them.",
  },
  {
    id: 458,
    category: "Security",
    question:
      "What distinguishes an IAM permissions boundary from a role session policy?",
    options: [
      "A boundary caps the identity's maximum permissions for all sessions; a session policy further narrows permissions for one assumed-role session only",
      "A boundary applies only to a single STS session; a session policy is permanent",
      "They are synonyms with different API names",
      "Session policies can grant permissions the role does not have",
    ],
    correctAnswers: [0],
    explanation:
      "The boundary is a persistent ceiling evaluated for every authorization of that principal; a session policy is passed at AssumeRole time and further intersects that one session's permissions. Neither can grant anything beyond the intersection of applicable policies.",
  },
  {
    id: 459,
    category: "Security",
    question:
      "When Elastic Beanstalk provisions environments, it needs to call services on the customer's behalf. Which IAM construct provides these service permissions without manual role wiring?",
    options: [
      "Service-linked roles created automatically for the service",
      "The account root role delegated per environment",
      "An administrator IAM user shared with the service",
      "Resource-based policies on every AWS service",
    ],
    correctAnswers: [0],
    explanation:
      "Service-linked roles are predefined, managed roles that AWS services create and use automatically, scoped to their own needs. Root delegation is never appropriate, shared users violate identity principles, and blanket resource policies are not how services assume permissions.",
  },
  {
    id: 460,
    category: "Security",
    question:
      "A bucket policy must allow every account belonging to the same AWS Organization, without listing account IDs individually and automatically covering new accounts. Which condition accomplishes this?",
    options: [
      "StringEquals on aws:PrincipalOrgID matching the organization ID",
      "StringLike on aws:PrincipalArn with a wildcard account list",
      "IpAddress on the organization's CIDR",
      "Bool on aws:SecureTransport combined with the account list",
    ],
    correctAnswers: [0],
    explanation:
      "The aws:PrincipalOrgID global condition key matches principals from any account in the organization, including accounts created later. ARN wildcards require enumerating account patterns, IP conditions address networks, and SecureTransport addresses encryption rather than membership.",
  },
  {
    id: 461,
    category: "Security",
    question:
      "An engineer initiated deletion of a customer managed KMS key. What happens during and (if needed) after the waiting period?",
    options: [
      "The key is deleted immediately and data encrypted with it becomes unrecoverable",
      "The key enters a waiting period (7–30 days) during which it cannot decrypt, and after the window deletion is permanent — cancellable only during the window",
      "The key rotates instead of deleting",
      "KMS prompts the root user for confirmation before proceeding",
    ],
    correctAnswers: [1],
    explanation:
      "Key deletion schedules a waiting window (minimum 7, maximum 30 days); during the window the key is unusable for cryptographic operations, deletion can be canceled, and after the window it is irreversible. Immediate deletion, rotation substitution, and root confirmation do not describe the behavior.",
  },
  {
    id: 462,
    category: "Security",
    question:
      "A new bucket must disable ACL-based permissions entirely so that all access control flows through bucket policies and IAM. Which S3 feature sets this default?",
    options: [
      "Object Ownership set to Bucket owner enforced",
      "Object Lock in compliance mode",
      "Requester Pays",
      "Intelligent-Tiering",
    ],
    correctAnswers: [0],
    explanation:
      "Bucket owner enforced object ownership disables ACLs for the bucket and objects, making policies the single permission model. Object Lock governs retention, Requester Pays shifts billing, and tiering affects storage class.",
  },
  {
    id: 463,
    category: "Security",
    question:
      "A CISO wants continuous automated compliance evaluation against the CIS AWS Foundations Benchmark across all accounts, with severity-rated findings. Which Security Hub capability provides this?",
    options: [
      "Enabling the CIS AWS Foundations Benchmark standard in Security Hub",
      "Running Inspector network assessments monthly",
      "Config conformance packs named after CIS controls",
      "Trusted Advisor security category checks",
    ],
    correctAnswers: [0],
    explanation:
      "Security Hub packages industry standards (CIS, PCI DSS, AWS FPR) as enabled standards producing scored, severity-rated findings organization-wide. Inspector scans vulnerabilities, conformance packs are custom rule bundles, and Trusted Advisor is advisory with different coverage.",
  },
  {
    id: 464,
    category: "Security",
    question:
      "A security architect must place controls where egress requests to specific external domains (for example *.evil.example) are blocked for all workloads in a VPC. Which service inspects DNS and HTTP egress at this layer?",
    options: [
      "AWS WAF on the public ALB",
      "AWS Network Firewall with domain list rule groups on the egress path",
      "Route 53 Resolver DNS Firewall alone, for HTTP path inspection",
      "Security groups denying outbound port 443",
    ],
    correctAnswers: [1],
    explanation:
      "Network Firewall inspects egress traffic including domain names through stateful domain list rule groups, blocking at the VPC boundary. WAF protects inbound web traffic, DNS Firewall blocks name resolution but not direct-IP or HTTP-layer policy, and port denies break all egress.",
  },
  {
    id: 465,
    category: "Security",
    question:
      "A production RDS credential must rotate monthly with zero application downtime, even while connections are active. How does Secrets Manager achieve rotation without breaking running applications?",
    options: [
      "By rotating using the single-user strategy, updating the user's password instantly everywhere",
      "By alternating between two users (master and clone), so applications always have a valid credential during the switch",
      "By requiring applications to reconnect at the rotation moment",
      "By emailing the new password to the application team",
    ],
    correctAnswers: [1],
    explanation:
      "The alternating-user strategy rotates a second user, swaps them into the primary slot, and updates the secret in stages, so valid credentials exist throughout. Single-user rotation has a brief invalid window requiring reconnect logic, forced reconnects defeat zero downtime, and emailed passwords are not secrets management.",
  },
  {
    id: 466,
    category: "Security",
    question:
      "Millions of IoT devices connect to AWS IoT Core. Each device must authenticate with its own identity and be permitted to publish only to its own topic prefix. How is this achieved?",
    options: [
      "A unique X.509 certificate per device with an IoT policy using thing-name policy variables",
      "One shared API key distributed to all devices",
      "Per-device IAM users with access keys",
      "A single certificate with a wildcard policy for all topics",
    ],
    correctAnswers: [0],
    explanation:
      "IoT Core authenticates devices with per-device X.509 certificates, and IoT policies support variables (like iot:Connection.Thing.Name) so each certificate authorizes only its own topics. Shared keys and wildcards collapse the isolation, and IAM users don't scale to device fleets.",
  },
  {
    id: 467,
    category: "Security",
    question:
      "A workforce of 5,000 needs console access to assigned AWS accounts through one portal, with credentials owned by the identity provider rather than AWS. Where do users sign in?",
    options: [
      "The IAM Identity Center access portal, federated from the corporate IdP",
      "The IAM console using per-employee users",
      "The root user email with delegated MFA",
      "Each account's sign-in page with cross-account role switching",
    ],
    correctAnswers: [0],
    explanation:
      "IAM Identity Center's access portal is the federated entry point listing the accounts and permission sets each user may assume. IAM users recreate identity sprawl, root is never for humans day-to-day, and per-account role switching lacks a central portal and IdP-owned credentials.",
  },
  {
    id: 468,
    category: "Security",
    question:
      "Internal microservices must mutually authenticate with TLS using certificates issued from a company-owned private hierarchy (not a public CA). Which AWS service issues and manages this private PKI?",
    options: [
      "AWS Certificate Manager public certificates",
      "AWS Private CA",
      "AWS KMS asymmetric keys",
      "Secrets Manager TLS secrets",
    ],
    correctAnswers: [1],
    explanation:
      "AWS Private CA operates managed private certificate authorities for internal mTLS and workload identity. ACM public certificates are publicly trusted only, KMS manages keys without a CA hierarchy, and storing TLS secrets sidesteps PKI lifecycle management.",
  },
  {
    id: 469,
    category: "Security",
    question:
      "A healthcare form served through CloudFront collects social security numbers. Compliance requires that this specific field be encrypted at the edge so only the backend holding a private key can read it, even from CloudFront. Which CloudFront feature does this?",
    options: [
      "Origin Access Control",
      "Field-level encryption",
      "Signed cookies",
      "Origin Shield",
    ],
    correctAnswers: [1],
    explanation:
      "Field-level encryption encrypts designated form fields at the edge using the backend's public key; the sensitive values stay encrypted through the CDN. OAC controls origin access, signed cookies authorize users, and Origin Shield is a caching tier.",
  },
  {
    id: 470,
    category: "Security",
    question:
      "A security team must ensure a standard WAF rule set is attached to every ALB and CloudFront distribution across 25 accounts automatically, including ones created in the future. Which service provides this central policy enforcement?",
    options: [
      "AWS Firewall Manager",
      "AWS WAF configured per resource by hand",
      "AWS Security Hub automation rules",
      "AWS Systems Manager State Manager",
    ],
    correctAnswers: [0],
    explanation:
      "Fire Manager applies WAF, Shield Advanced, and security group policies organization-wide from a central administrator account, auto-attaching to new resources of chosen types. Per-resource WAF setup does not scale or self-enforce, Security Hub reports findings, and State Manager manages instance software.",
  },
  {
    id: 471,
    category: "Security",
    question:
      "After GuardDuty raises a serious finding, an analyst must answer: which resources were involved, what else did this principal touch, and when did the behavior start? Which service visualizes this investigation over time?",
    options: [
      "Amazon Detective",
      "AWS Config timeline",
      "CloudWatch Logs Insights ad-hoc queries only",
      "AWS Audit Manager",
    ],
    correctAnswers: [0],
    explanation:
      "Detective ingests GuardDuty findings plus CloudTrail and VPC Flow Logs, building behavior graphs to scope and investigate incidents. Config timelines are per-resource, raw log queries require manual correlation, and Audit Manager collects compliance evidence.",
  },
  {
    id: 472,
    category: "Security",
    question:
      "An external auditor requests AWS's own SOC 1/SOC 2 and PCI compliance reports for the platform under review. Where does the customer obtain these official documents?",
    options: [
      "AWS Artifact",
      "AWS Well-Architected Tool",
      "AWS Security Hub",
      "AWS Support Center knowledge base",
    ],
    correctAnswers: [0],
    explanation:
      "Artifact is the self-service portal for AWS compliance documentation and agreements (SOC, PCI, ISO reports). The other services assess or monitor the customer's workloads rather than distributing AWS's audit artifacts.",
  },
  {
    id: 473,
    category: "Security",
    question:
      "Which two S3 protections harden buckets against accidental and malicious data loss? (Select TWO.)",
    options: [
      "Block Public Access at the account level",
      "Versioning with MFA delete enabled",
      "Enabling Intelligent-Tiering",
      "Setting a lifecycle rule to expire objects daily",
      "Enabling Requester Pays",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Blocking public access removes the largest accidental-exposure vector, and versioning plus MFA delete protects against unintended or malicious deletion. Tiering and Requester Pays are cost features, and aggressive expiration increases loss risk.",
  },
  {
    id: 474,
    category: "Database",
    question:
      "A security mandate eliminates database passwords. Applications connecting to RDS MySQL must authenticate using short-lived tokens signed by IAM. Which RDS feature implements this?",
    options: [
      "RDS Proxy authentication",
      "IAM database authentication generating signed connection tokens",
      "Secrets Manager with auto-rotation only",
      "SSL client certificates stored in KMS",
    ],
    correctAnswers: [1],
    explanation:
      "IAM database authentication issues short-lived signed tokens that the database validates against IAM, removing static passwords. The proxy pools connections, Secrets Manager rotates passwords rather than eliminating them, and bespoke certificates add management overhead.",
  },
  {
    id: 475,
    category: "Security",
    question:
      "An S3 bucket must be allowed to invoke a specific Lambda function on object events. Where does the permission permitting the S3 service principal live?",
    options: [
      "In the function's resource-based policy (function permissions)",
      "In the S3 bucket's IAM role",
      "In the Lambda execution role's trust policy",
      "In an SCP attached to the account",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda functions accept resource-based policies that authorize specific services or accounts to invoke them — added automatically when configuring S3 notifications. S3 uses its own service identity for the call, execution roles govern what the function does, and SCPs set account ceilings.",
  },
  {
    id: 476,
    category: "Security",
    question:
      "An SDK encrypts a 5 GB file using a per-file data key, then stores both the encrypted file and the encrypted form of that data key alongside it. What is this pattern called and why is it efficient?",
    options: [
      "Symmetric streaming; it avoids KMS network calls",
      "Envelope encryption; KMS encrypts only the small data key while the data key encrypts the bulk data locally",
      "Client-side rotation; it re-encrypts the file with every key version",
      "Key wrapping without a data key, using the KMS key directly on chunks",
    ],
    correctAnswers: [1],
    explanation:
      "Envelope encryption uses KMS to protect a small unique data key per object, while the data key encrypts the payload locally — combining KMS's governance with fast local bulk encryption. Calling KMS per chunk or encrypting gigabytes through KMS would be impractical and expensive.",
  },
  {
    id: 477,
    category: "Security",
    question:
      "Which two practices most reduce credential sprawl across an organization? (Select TWO.)",
    options: [
      "Using IAM roles for every workload instead of static access keys",
      "Centralizing human access through IAM Identity Center federation",
      "Creating IAM users per service with 90-day rotation",
      "Storing access keys in encrypted environment files",
      "Sharing one administrator credential per team",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Roles give workloads short-lived credentials automatically, and federated Identity Center removes AWS-resident human credentials — together eliminating most long-lived keys. Per-service users, encrypted key files, and shared credentials all keep static keys in circulation.",
  },
];
