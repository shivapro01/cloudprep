import type { QuizQuestion } from "../questions";

/** Practice Set 3 — questions 131–152 (security and compute focus). Original questions. */
export const set3Part1: QuizQuestion[] = [
  {
    id: 131,
    category: "Security",
    question:
      "Engineers can establish an SSH session to an instance in a subnet whose network ACL allows inbound TCP 22 from the corporate CIDR, but the connection hangs before a prompt appears. The instance's security group allows port 22 in and all traffic out. What is the MOST likely cause?",
    options: [
      "The network ACL's outbound rules do not allow traffic to the client's ephemeral port range, blocking return packets",
      "The instance is missing an IAM instance profile, which SSH requires",
      "Security groups are stateless, so an outbound rule for TCP 22 must be added",
      "The route table lacks a route to an internet gateway for SSH traffic specifically",
    ],
    correctAnswers: [0],
    explanation:
      "Network ACLs are stateless, so reply traffic to the engineer's randomly chosen ephemeral source port must be explicitly allowed outbound; missing ephemeral ranges is the classic NACL connectivity failure. Security groups are stateful and already allow all outbound, IAM is not involved in SSH, and a missing internet route would block the initial SYN rather than cause a mid-connection hang.",
  },
  {
    id: 132,
    category: "Security",
    question:
      "An S3 bucket owned by Account A must publish event notifications to an SNS topic owned by Account B. The bucket's S3 notification configuration points at the topic, but deliveries fail with authorization errors. What must Account B configure?",
    options: [
      "An IAM role in Account A that S3 assumes to publish messages",
      "A resource policy on the SNS topic granting the S3 service principal of Account A permission to publish",
      "A bucket policy on the S3 bucket granting the SNS topic publish rights",
      "A VPC endpoint between the bucket and the topic",
    ],
    correctAnswers: [1],
    explanation:
      "The service publishing is S3 on behalf of Account A, so the SNS topic's resource-based policy must allow the bucket (or the S3 service principal with the source condition) to call sns:Publish. Roles are not used for S3 event delivery, the permission flows from the resource being published to, not the reverse, and SNS is not addressable through VPC peering.",
  },
  {
    id: 133,
    category: "Security",
    question:
      "A Lambda function holds API keys in environment variables. Security mandates that the values be encrypted with a company-managed key whose usage is auditable and rotatable. What should be done?",
    options: [
      "Base64-encode the values before storing them in the environment variables",
      "Configure the function to use a customer managed KMS key for environment variable encryption",
      "Store the values in plaintext and rely on IAM role isolation of the function",
      "Write the values to a private ECR repository next to the function image",
    ],
    correctAnswers: [1],
    explanation:
      "Lambda environment variables can be encrypted at rest with a customer managed KMS key, giving rotation and CloudTrail-audited usage beyond the default AWS managed key. Base64 is encoding, not encryption, plaintext storage ignores the mandate, and ECR is a container registry.",
  },
  {
    id: 134,
    category: "Security",
    question:
      "A highly privileged administrative role must only be assumable by engineers who have just authenticated with MFA in their normal session. How should the trust relationship enforce this?",
    options: [
      "Add a trust policy condition requiring aws:MultiFactorAuthPresent to be true",
      "Require engineers to add the string MFA to their role session name",
      "Limit AssumeRole to requests arriving through a NAT gateway",
      "Set the maximum session duration to 15 minutes",
    ],
    correctAnswers: [0],
    explanation:
      "The trust policy condition on aws:MultiFactorAuthPresent ensures only MFA-authenticated sessions can assume the role, the native way to gate privileged access. Session names and durations carry no authorization meaning, and network origin does not prove MFA use.",
  },
  {
    id: 135,
    category: "Security",
    question:
      "Compliance policy requires that the encryption key protecting a data pipeline be rotated every year, automatically, with no application changes or re-encryption of stored data. Which mechanism satisfies this?",
    options: [
      "Enable automatic annual rotation on a customer managed KMS key",
      "Create a new KMS key each December and re-encrypt every object",
      "Use the AWS managed key for the service, which rotates every five years",
      "Rotate the key material manually by deleting and recreating the alias",
    ],
    correctAnswers: [0],
    explanation:
      "Customer managed KMS keys support automatic yearly rotation: KMS keeps prior key material for decryption of old data and uses new material for encryption, with no application change or bulk re-encryption. Manual rotation with re-encryption is unnecessary toil, AWS managed keys rotate on a three-year schedule and are not customer-controlled, and deleting keys destroys data access.",
  },
  {
    id: 136,
    category: "Security",
    question:
      "A single-page application served from app.example.com fetches JSON directly from an S3 bucket via the browser. The fetch fails in the browser console with a cross-origin error, though curl to the same URL succeeds. What must be configured?",
    options: [
      "A bucket policy allowing the browser's user agent",
      "A CORS configuration on the bucket allowing the origin app.example.com with the required methods",
      "A CloudFront distribution in front of the bucket with the same domain name",
      "CORS is a server setting; the browser must be configured to ignore it",
    ],
    correctAnswers: [1],
    explanation:
      "The browser enforces the same-origin policy, so the S3 bucket needs a CORS rule permitting the web origin, the HTTP method, and any headers the app sends. curl is not bound by CORS, which is why only the browser fails. Bucket policies govern authorization, not browser cross-origin checks.",
  },
  {
    id: 137,
    category: "Security",
    question:
      "A web backend running on EC2 currently receives user file uploads and forwards them to S3, doubling bandwidth and compute cost. Users upload through a browser form. Which change lets browsers upload directly to S3 securely?",
    options: [
      "Make the bucket public and post the bucket URL in the form",
      "Have the backend issue a presigned URL for a PUT request and let the browser upload directly to S3",
      "Open an S3 gateway endpoint on the users' home networks",
      "Store uploads in EBS and copy them to S3 nightly",
    ],
    correctAnswers: [1],
    explanation:
      "Presigned PUT URLs authorize the browser to upload a specific object for a limited time without proxying bytes through the backend, removing the double-hop. A public bucket removes access control entirely, gateway endpoints exist inside AWS networking rather than users' homes, and EBS staging reintroduces the same backend path.",
  },
  {
    id: 138,
    category: "Management & Governance",
    question:
      "A company with 60 accounts in AWS Organizations must have a single immutable record of API activity across all accounts delivered to one central S3 bucket. Which configuration achieves this?",
    options: [
      "An organization trail created in the management account, enabled for all members",
      "A separate trail in every account writing to the same bucket prefix",
      "CloudWatch Logs cross-account subscription filters",
      "A Config aggregator with recording of API calls",
    ],
    correctAnswers: [0],
    explanation:
      "An organization trail is defined once in the management account and automatically records events for every member account into chosen central storage. Per-account trails multiply management and risk gaps when an account is added, subscription filters solve log routing not API audit completeness, and Config records resource state rather than API activity.",
  },
  {
    id: 139,
    category: "Management & Governance",
    question:
      "A company wants a managed landing zone that automatically provisions new AWS accounts with pre-approved network baselines, logging, and preventive guardrails. Which service is designed for this?",
    options: [
      "AWS Control Tower",
      "AWS CloudFormation StackSets",
      "AWS Systems Manager",
      "AWS Service Catalog",
    ],
    correctAnswers: [0],
    explanation:
      "Control Tower builds and operates a landing zone on top of Organizations, providing account factory provisioning, guardrails (SCPs and Config rules), and a dashboard. StackSets deploys templates but not the governed account vending experience, Systems Manager manages operations, and Service Catalog curates product portfolios.",
  },
  {
    id: 140,
    category: "Security",
    question:
      "A company federates workforce sign-in through an external Okta identity provider and wants employees to see a single portal assigning them AWS account permissions based on their Okta groups. Which service should be configured?",
    options: [
      "IAM users created for every employee",
      "IAM Identity Center (successor to AWS SSO)",
      "Amazon Cognito user pools",
      "AWS Directory Service for Microsoft AD only",
    ],
    correctAnswers: [1],
    explanation:
      "IAM Identity Center connects to external identity providers, presents one employee portal, and maps groups to permission sets across many accounts. Per-user IAM accounts the problem away, Cognito targets application end users rather than workforce SSO, and a bare directory lacks the account-permission mapping layer.",
  },
  {
    id: 141,
    category: "Security",
    question:
      "A public API behind CloudFront is being overwhelmed by a small set of client IPs issuing thousands of requests per minute. Which AWS WAF control throttles these clients automatically while leaving normal users unaffected?",
    options: [
      "A geo-match statement blocking the attackers' country",
      "A rate-based rule that blocks source IPs exceeding a request threshold over five minutes",
      "An IP set containing the attackers' addresses, updated weekly",
      "A size constraint statement rejecting large requests",
    ],
    correctAnswers: [1],
    explanation:
      "WAF rate-based rules track requests per source address over a rolling window and automatically block and later unblock offenders, which is built for exactly this flood pattern. Geo blocks and static IP sets require knowing who to block in advance and need maintenance, and size constraints filter payloads, not request rates.",
  },
  {
    id: 142,
    category: "Security",
    question:
      "A solutions architect must inspect all egress traffic from a VPC's subnets, block connections to known malicious domains, and enforce stateful protocol rules at the VPC boundary, all as a managed service. Which service provides this?",
    options: [
      "Security groups applied to every instance",
      "AWS Network Firewall",
      "Amazon GuardDuty",
      "AWS WAF on an internet gateway",
    ],
    correctAnswers: [1],
    explanation:
      "Network Firewall provides managed stateful and stateless inspection, domain list filtering, and Suricata-compatible rules deployed at the VPC subnet boundary. Security groups filter per-instance without domain awareness, GuardDuty detects and alerts rather than blocking inline, and WAF protects web endpoints, not VPC egress.",
  },
  {
    id: 143,
    category: "Security",
    question:
      "A Lambda function in a public subnet must query an RDS instance in private subnets of the same VPC. Queries time out. What is the correct networking change?",
    options: [
      "Attach the function to the private subnets with a security group allowed by the database's group",
      "Assign the function an elastic IP address",
      "Move the database to the public subnet",
      "Increase the function's timeout to five minutes",
    ],
    correctAnswers: [0],
    explanation:
      "Lambda enforces networking through its attached ENIs, so the function must sit in subnets with a route to the database and a security group the DB group accepts; private subnets are the right home. Public IPs and a public database create exposure, and a longer timeout only waits longer on an unroutable path.",
  },
  {
    id: 144,
    category: "Security",
    question:
      "Compliance requires encryption of user traffic all the way to the application instances, not just to the load balancer. Traffic enters through an internet-facing ALB. Which design achieves end-to-end TLS?",
    options: [
      "Keep the ALB listener on HTTP but enable TLS only between users and the ALB",
      "Use an HTTPS listener on the ALB with ACM certificates, and HTTPS on targets with certificates installed on the instances",
      "Configure the ALB in an internal subnet with an NACL denying port 80",
      "Terminate TLS at CloudFront only and forward HTTP to the ALB",
    ],
    correctAnswers: [1],
    explanation:
      "End-to-end TLS means both legs are encrypted: the ALB terminates the user-facing TLS session and re-encrypts to targets over HTTPS with certificates on each instance. Terminating at the ALB or CloudFront leaves the backend leg in plaintext, and subnet ACLs do not encrypt anything.",
  },
  {
    id: 145,
    category: "Security",
    question:
      "A company uses Secrets Manager in us-east-1 and wants the same secrets available in eu-west-1 for its disaster recovery environment, kept automatically in sync. Which feature provides this?",
    options: [
      "Cross-Region secret replication managed by Secrets Manager",
      "A Lambda function that copies secret versions every hour",
      "Exporting secrets to an encrypted S3 bucket replicated cross-Region",
      "KMS multi-Region keys with identical secret values copied manually",
    ],
    correctAnswers: [0],
    explanation:
      "Secrets Manager supports replicating a secret into other Regions, keeping replicas synchronized with the primary until promoted to standalone during failover. Scripted copying introduces lag and gaps, an S3 mirror misses rotation, and KMS multi-Region keys address encryption keys, not secret values.",
  },
  {
    id: 146,
    category: "Security",
    question:
      "A security team wants GuardDuty enabled across an organization with findings sent to one delegated administrator account, while each member account keeps its own detector configuration visibility. How should this be set up?",
    options: [
      "Enable GuardDuty independently in every account and email findings to one address",
      "Designate a GuardDuty delegated administrator for the organization and enable membership through Organizations",
      "Create one GuardDuty detector in the management account and share its findings via S3",
      "Use CloudWatch cross-account dashboards for every account's GuardDuty metrics",
    ],
    correctAnswers: [1],
    explanation:
      "GuardDuty's organization feature centralizes management in a delegated administrator account while member accounts retain visibility of their own findings. Independent enablement defeats the central view, one shared detector cannot see member account data, and dashboards do not provide the management relationship.",
  },
  {
    id: 147,
    category: "Networking & Content Delivery",
    question:
      "A network engineer must determine whether packets dropped by security group rules in a VPC, capturing accept and reject decisions at the elastic network interface level. Which facility provides this?",
    options: [
      "AWS CloudTrail data events",
      "VPC Flow Logs with ALL traffic filtering",
      "Amazon CloudWatch network monitoring",
      "AWS X-Ray traces",
    ],
    correctAnswers: [1],
    explanation:
      "VPC Flow Logs record per-connection metadata including the accept/reject decision made by security groups and NACLs at the ENI level. CloudTrail records control-plane API calls, CloudWatch metrics aggregate without per-flow detail, and X-Ray traces application requests.",
  },
  {
    id: 148,
    category: "Security",
    question:
      "A solutions architect requests a public ACM certificate to attach to a CloudFront distribution, but the certificate request fails because the certificate was requested in eu-west-1 where the website operates. What is the correct approach?",
    options: [
      "CloudFront requires public ACM certificates to be requested in us-east-1 (N. Virginia)",
      "Certificates must be imported into IAM in the same Region as the distribution",
      "The certificate must be validated by DNS before CloudFront can use it in any Region",
      "CloudFront only supports certificates from third-party authorities",
    ],
    correctAnswers: [0],
    explanation:
      "For CloudFront, public ACM certificates must be requested in or imported into the us-east-1 Region regardless of where content is served; the distribution then references it globally. Regional services such as ALBs use Region-local certificates, and third-party CAs are supported but not required.",
  },
  {
    id: 149,
    category: "Security",
    question:
      "Which two AWS services encrypt newly written data at rest by default, with no customer configuration required? (Select TWO.)",
    options: [
      "Amazon S3, which applies SSE-S3 to all new objects automatically",
      "Amazon DynamoDB, which always encrypts tables at rest",
      "Amazon EBS, which encrypts every new volume by default in all accounts",
      "Amazon RDS, which encrypts storage without opt-in",
      "Amazon EFS, which encrypts only when requested at mount time",
    ],
    correctAnswers: [0, 1],
    explanation:
      "S3 automatically applies SSE-S3 encryption to every new object, and DynamoDB always encrypts tables at rest; both are default-on with no action. EBS and RDS encryption require explicit opt-in (or a Region default for EBS), and EFS encryption at rest is chosen when creating the file system or mounting.",
  },
  {
    id: 150,
    category: "Security",
    question:
      "As part of a least-privilege review, a security engineer must identify which AWS services an IAM role actually used over the last 90 days so unused permissions can be removed. Which tool shows this?",
    options: [
      "IAM Access Analyzer policy generation",
      "IAM Access Advisor (service last accessed data) on the role",
      "AWS CloudTrail LookupEvents filtered by role name",
      "AWS Config advanced queries",
    ],
    correctAnswers: [1],
    explanation:
      "Access Advisor surfaces the services last accessed by a role and when, which is the purpose-built input for rightsizing its policy. Access Analyzer generates policies from CloudTrail activity but is a different feature from last-accessed review, LookupEvents can approximate but is limited in window and effort, and Config tracks resource configuration.",
  },
  {
    id: 151,
    category: "Networking & Content Delivery",
    question:
      "A security team must audit which domain names internal instances resolve through the VPC DNS, retaining the queries for analysis. What should be enabled?",
    options: [
      "VPC Flow Logs at the NAT gateway",
      "Route 53 Resolver query logging to CloudWatch Logs",
      "DNSSEC signing on the hosted zone",
      "CloudTrail data events for Route 53",
    ],
    correctAnswers: [1],
    explanation:
      "Route 53 Resolver query logging records DNS queries made from the VPC, loggable to CloudWatch, S3, or Firehose for retention and analysis. Flow logs capture IP traffic without DNS names, DNSSEC protects integrity of answers, and CloudTrail records management API calls.",
  },
  {
    id: 152,
    category: "Management & Governance",
    question:
      "Two business units with strict compliance separation will share one AWS organization. Leadership requires that a misconfiguration or compromise in one unit cannot affect the other's resources or access. Which structural decision provides the strongest isolation?",
    options: [
      "Both units share one production account with different IAM groups",
      "Separate AWS accounts per business unit under the organization",
      "One account with resource-based policies denying cross-team actions",
      "Tag-based billing separation in a single account",
    ],
    correctAnswers: [1],
    explanation:
      "Separate accounts are the strongest isolation boundary: independent IAM, quotas, billing, and blast radius, coordinated through Organizations. Shared accounts with groups or policies couple failure and access domains, and tag-based separation affects reporting only.",
  },
];
