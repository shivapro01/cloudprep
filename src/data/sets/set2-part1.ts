import type { QuizQuestion } from "../questions";

/** Practice Set 2 — questions 66–87 (secure architectures focus). Original questions. */
export const set2Part1: QuizQuestion[] = [
  {
    id: 66,
    category: "Security",
    question:
      "An IAM user's permission policy allows s3:GetObject on a company bucket. However, the bucket's resource-based policy contains an explicit Deny statement for s3:GetObject whenever the request does not originate through the company's VPC endpoint. The user calls the S3 API directly from their laptop. What happens and why?",
    options: [
      "The request succeeds, because identity-based policies take precedence over bucket policies",
      "The request is denied, because an explicit deny in any applicable policy always overrides every allow",
      "The request succeeds, because resource-based policies can only grant permissions, never restrict them",
      "The request is denied, because S3 requires all requests to come from a VPC endpoint by default",
    ],
    correctAnswers: [1],
    explanation:
      "AWS evaluates all applicable policies together, and an explicit deny always wins over any allow, regardless of which policy contains it. This pattern (deny unless requests come through a specific VPC endpoint or TLS) is a common control. Identity policies and bucket policies both grant permissions, but neither can override an explicit deny, and S3 does not require VPC endpoint access by default.",
  },
  {
    id: 67,
    category: "Security",
    question:
      "A company has two AWS accounts. Administrators in Account A must be able to manage resources in Account B without creating IAM users in Account B and without sharing long-lived credentials. What is the MOST secure way to provide this access?",
    options: [
      "Create identical IAM users in both accounts and distribute access keys for each",
      "Create an IAM role in Account B whose trust policy allows the administrators from Account A, and grant those administrators permission to call sts:AssumeRole",
      "Share the Account B root user credentials with the Account A administrators through a secrets vault",
      "Attach an inline AdministratorAccess policy to each Account A user that references Account B's account ID",
    ],
    correctAnswers: [1],
    explanation:
      "Cross-account access is granted by assuming a role: Account B defines a role trusting specific principals in Account A, and Account A's users are given permission to call sts:AssumeRole on it. This yields short-lived, auditable credentials with no duplicated users or shared long-lived secrets. Duplicated IAM users multiply key management, root credentials must never be shared, and an identity policy in Account A cannot grant permissions on resources governed by Account B without a trust relationship.",
  },
  {
    id: 68,
    category: "Security",
    question:
      "A company runs an internship program where interns receive broad access to EC2 and S3 for learning. Security requires that no intern can ever modify IAM users, roles, or policies, even though their job-function policies are generous. Which IAM feature enforces this ceiling?",
    options: [
      "An SCP that blocks all IAM actions for the whole account",
      "An IAM permissions boundary attached to the interns' roles",
      "An IAM group that is placed outside the organization's OU",
      "A resource-based policy on every IAM resource in the account",
    ],
    correctAnswers: [1],
    explanation:
      "A permissions boundary sets the maximum permissions an IAM entity can ever have; any action outside the boundary is denied even if the identity policy allows it. An SCP would constrain the entire account rather than just the interns, OU placement has no effect on permissions, and IAM resources generally do not support the resource-based policies this option describes.",
  },
  {
    id: 69,
    category: "Security",
    question:
      "A solutions architect must give a third-party auditor temporary access to download exactly one object from a private Amazon S3 bucket. The auditor must not receive any IAM user, and access must expire automatically after 24 hours. Which solution meets these requirements?",
    options: [
      "Create an IAM user for the auditor with an attached policy and delete it after the audit",
      "Generate a presigned URL for the object with a 24-hour expiration",
      "Make the object public for 24 hours using a bucket policy condition on a timestamp",
      "Add the auditor's email to the bucket policy with a condition on aws:CurrentTime",
    ],
    correctAnswers: [1],
    explanation:
      "A presigned URL embeds the signer's temporary credentials and an expiration time, granting time-boxed access to a single object with no new identities or public exposure. Creating an IAM user for a third party adds key-management burden, and S3 policies cannot flip an object public automatically after a timestamp.",
  },
  {
    id: 70,
    category: "Security",
    question:
      "A security team wants continuous, automated identification of S3 buckets, IAM roles, and KMS keys in the organization that are shared with an external account or made public. Which service provides this analysis?",
    options: [
      "AWS Trusted Advisor",
      "AWS Config conformance packs",
      "IAM Access Analyzer",
      "Amazon Macie",
    ],
    correctAnswers: [2],
    explanation:
      "IAM Access Analyzer analyzes resource policies and flags resources that are reachable from outside an account or organization. Trusted Advisor provides best-practice checks of a more general nature, Config tracks configuration state against rules, and Macie specializes in discovering sensitive data inside S3 objects rather than external access paths.",
  },
  {
    id: 71,
    category: "Security",
    question:
      "Account A owns an S3 bucket and the KMS key that encrypts it. A role in Account B must be able to download and decrypt the objects. Both an IAM policy on B's role and the bucket policy already allow the read. What is still required for decryption to succeed?",
    options: [
      "Nothing further — the bucket policy alone authorizes KMS decryption cross-account",
      "Account B must create its own KMS key and re-encrypt the objects",
      "The KMS key policy in Account A must grant the Account B role kms:Decrypt on the key",
      "The objects must be re-uploaded with SSE-S3 encryption instead of SSE-KMS",
    ],
    correctAnswers: [2],
    explanation:
      "With SSE-KMS, the caller needs permission on three things: the S3 object, and the KMS key. The key policy is the only place a cross-account principal can be granted access to the key, so Account A must add the Account B role to the key policy with kms:Decrypt. A bucket policy cannot delegate KMS permissions, and re-encrypting or switching encryption modes is unnecessary.",
  },
  {
    id: 72,
    category: "Security",
    question:
      "A compliance rule states that objects in an S3 bucket must never be delivered over unencrypted connections. Which control enforces this for every request without changing application code?",
    options: [
      "Enable S3 default encryption with an SSE-KMS key",
      "Add a bucket policy statement that denies s3:* when aws:SecureTransport is false",
      "Require IAM users to enable MFA on their accounts",
      "Configure the bucket for Cross-Region Replication over TLS",
    ],
    correctAnswers: [1],
    explanation:
      "A bucket policy with a Deny on aws:SecureTransport = false rejects every plain-HTTP request, which is the standard pattern for enforcing TLS in transit on S3. Default encryption protects data at rest and has no effect on the transport protocol, MFA is unrelated to request encryption, and replication does not control how clients connect.",
  },
  {
    id: 73,
    category: "Security",
    question:
      "A web application is served through an Application Load Balancer and must present HTTPS to users with a certificate that renews automatically at no extra cost. Which solution meets the requirement?",
    options: [
      "Import a certificate purchased from a third-party CA into ACM and attach it to the ALB",
      "Request a public certificate in AWS Certificate Manager and associate it with the ALB's HTTPS listener",
      "Generate a self-signed certificate on each EC2 instance behind the load balancer",
      "Terminate TLS on the instances using certificates stored in Secrets Manager",
    ],
    correctAnswers: [1],
    explanation:
      "Public ACM certificates are free and renew automatically, and they integrate directly with load balancer HTTPS listeners. Imported third-party certificates do not auto-renew, self-signed certificates are rejected by browsers, and Secrets Manager stores secrets rather than serving as a TLS terminator.",
  },
  {
    id: 74,
    category: "Security",
    question:
      "A security team has identified one external IP address that is actively probing an application subnet. All other traffic must continue to flow normally. Which mechanism should be used to block that single address at the subnet boundary?",
    options: [
      "Add an inbound deny rule for the IP to the instances' security groups",
      "Add an inbound deny rule for the IP to the subnet's network ACL",
      "Add a route in the route table sending the IP to the blackhole",
      "Create an IAM policy denying the IP address in the VPC",
    ],
    correctAnswers: [1],
    explanation:
      "Network ACLs are the only VPC construct that supports deny rules, and they operate at the subnet level, making them the right tool for blocking specific addresses. Security groups evaluate allow rules only and have no explicit deny, a blackhole route drops the traffic path for everything using it, and IAM policies do not govern network packets.",
  },
  {
    id: 75,
    category: "Security",
    question:
      "Application instances launch with security group sg-app. Their security group provides no path to the RDS database secured by security group sg-db, so connections to port 3306 time out. Which change restores connectivity with the least exposure?",
    options: [
      "Add an inbound rule to sg-app allowing outbound... no — add an inbound rule on sg-db permitting TCP 3306 with sg-app as the source",
      "Add an inbound rule on sg-db permitting TCP 3306 from 0.0.0.0/0",
      "Add an outbound rule on sg-db permitting TCP 3306 to sg-app",
      "Move the database into the same subnet as the application instances",
    ],
    correctAnswers: [0],
    explanation:
      "Security groups are stateful, so the instances' outbound traffic is allowed by default; the missing piece is an inbound allow on the database's group with the application group as the source. Referencing the group keeps the rule correct as instances scale and keeps the database closed to everything else. Opening 0.0.0.0/0 exposes the database publicly, the database does not need an outbound rule for reply traffic because security groups are stateful, and co-locating subnets has no bearing on security group rules.",
  },
  {
    id: 76,
    category: "Security",
    question:
      "A CloudWatch metric shows an EC2 instance sending an unusual volume of traffic to an unknown IP range, and CloudTrail shows API calls from the instance that no deployment made. Which service continuously analyzes these signals and raises a finding for a potentially compromised instance?",
    options: [
      "Amazon Inspector",
      "Amazon GuardDuty",
      "AWS Systems Manager",
      "AWS Firewall Manager",
    ],
    correctAnswers: [1],
    explanation:
      "GuardDuty continuously analyzes CloudTrail management and data events, VPC Flow Logs, and DNS logs using threat intelligence and anomaly detection, and raises findings for compromised instances and anomalous behavior. Inspector performs vulnerability scanning, Systems Manager manages instances operationally, and Firewall Manager centralizes WAF and security group policy deployment.",
  },
  {
    id: 77,
    category: "Security",
    question:
      "A platform team must automatically scan the software packages installed on its EC2 fleet and its Lambda function dependencies for known CVEs, both continuously and before deployment. Which service performs these vulnerability scans?",
    options: [
      "Amazon Inspector",
      "Amazon GuardDuty",
      "AWS Security Hub",
      "Amazon Macie",
    ],
    correctAnswers: [0],
    explanation:
      "Amazon Inspector scans EC2 instances and ECR container images for software vulnerabilities (CVEs) and network exposure, and it scans Lambda functions and their layers for vulnerable dependencies. GuardDuty detects malicious activity rather than package vulnerabilities, Security Hub aggregates findings from other services, and Macie finds sensitive data in S3.",
  },
  {
    id: 78,
    category: "Security",
    question:
      "A legal team suspects that files uploaded to a company S3 bucket by customers may contain unencrypted personally identifiable information such as names, addresses, and credit card numbers among millions of objects. Which service should be used to discover and classify this data?",
    options: [
      "AWS Glue Data Catalog",
      "Amazon Macie",
      "AWS Config",
      "Amazon Inspector",
    ],
    correctAnswers: [1],
    explanation:
      "Macie uses machine learning to discover, classify, and alert on sensitive data such as PII and financial data stored in S3 at scale. Glue catalogs data for analytics, Config evaluates resource configurations, and Inspector looks for software vulnerabilities, not personal data.",
  },
  {
    id: 79,
    category: "Security",
    question:
      "A security operations center receives findings from GuardDuty, Inspector, Macie, and Firewall Manager across dozens of accounts and wants a single prioritized view with consolidated automation. Which service should be used?",
    options: [
      "AWS Security Hub",
      "Amazon EventBridge",
      "AWS Organizations",
      "AWS Systems Manager OpsCenter",
    ],
    correctAnswers: [0],
    explanation:
      "Security Hub aggregates security findings from AWS services and partner tools into a normalized format, provides a consolidated compliance and posture score, and supports organization-wide enablement and automated response. EventBridge can route individual events but does not normalize and prioritize security posture, Organizations manages accounts, and OpsCenter aggregates operational issues rather than security findings.",
  },
  {
    id: 80,
    category: "Security",
    question:
      "A mobile application lets users sign in with Google and Facebook. After sign-in, the app must upload files directly to Amazon S3 using temporary AWS credentials scoped to a per-user prefix. Which component should a solutions architect use?",
    options: [
      "An Amazon Cognito user pool configured with the social identity providers",
      "An Amazon Cognito identity pool federating Google and Facebook, issuing credentials limited by IAM policy",
      "IAM roles with embedded long-lived access keys shipped inside the mobile app",
      "An IAM user created for each mobile application user",
    ],
    correctAnswers: [1],
    explanation:
      "Cognito identity pools exchange external identity provider tokens for temporary AWS credentials, which can be scoped per user through policy variables so each app user can only touch their own prefix. User pools handle authentication and issue their own tokens but do not hand out AWS credentials. Long-lived keys in an app are a serious security violation, and per-user IAM users do not scale.",
  },
  {
    id: 81,
    category: "Security",
    question:
      "A team needs to store feature flags and third-party license codes centrally with encryption at rest and fine-grained IAM access, but the values never rotate and cost must be minimized. Which service fits best?",
    options: [
      "AWS Secrets Manager",
      "AWS Systems Manager Parameter Store (SecureString)",
      "An encrypted DynamoDB table",
      "S3 Object Lock in compliance mode",
    ],
    correctAnswers: [1],
    explanation:
      "Parameter Store with the SecureString type provides KMS-encrypted, IAM-controlled storage of configuration values at no charge for standard parameters, which fits non-rotating values at minimal cost. Secrets Manager is the better tool when automatic rotation is required, and its per-secret pricing is unnecessary here. DynamoDB and S3 add build-your-own access control overhead for a solved problem.",
  },
  {
    id: 82,
    category: "Security",
    question:
      "EC2 instances in a private subnet build Docker images and must pull base images from Amazon ECR. The subnet has no NAT gateway and the company wants the traffic to remain entirely on the AWS network. Which combination should a solutions architect configure?",
    options: [
      "An internet gateway with a restrictive security group",
      "Interface VPC endpoints for the ECR API and Docker registry APIs, plus a gateway VPC endpoint for S3",
      "A peering connection between the VPC and the ECR service VPC",
      "A public IP address auto-assigned to each build instance",
    ],
    correctAnswers: [1],
    explanation:
      "ECR's API and its Docker registry layers are accessible through interface VPC endpoints, and ECR stores image layers in S3, which needs a gateway endpoint as well; together the builds stay fully private. An internet gateway or public IPs expose the instances, and services like ECR cannot be reached through VPC peering.",
  },
  {
    id: 83,
    category: "Security",
    question:
      "Users frequently mistype http://shop.example.com and reach the site over plain HTTP. The site runs behind an Application Load Balancer with an HTTPS listener. What should a solutions architect add so that all plain-HTTP visitors are sent to HTTPS automatically?",
    options: [
      "An additional HTTPS listener on port 8443",
      "An HTTP listener on port 80 with a default rule that returns a 301 redirect to the HTTPS URL",
      "A network ACL rule denying port 80 inbound",
      "A Route 53 alias record pointing HTTP traffic to the HTTPS endpoint",
    ],
    correctAnswers: [1],
    explanation:
      "The standard ALB pattern is to keep port 80 open only to issue a permanent redirect to the HTTPS listener, which fixes mistyped URLs with no client changes. A second listener does nothing for port 80 traffic, a network ACL would drop the visitor instead of redirecting them, and DNS has no notion of HTTP versus HTTPS.",
  },
  {
    id: 84,
    category: "Security",
    question:
      "Which two practices harden the AWS account root user? (Select TWO.)",
    options: [
      "Enable multi-factor authentication on the root user",
      "Delete the root user's access keys and use it only where irreversibly required",
      "Use the root user for daily administration so activities are visible in CloudTrail",
      "Create an IAM user named root as a backup administrator",
      "Attach the AdministratorAccess policy to the root user's group",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Root hardening means enabling MFA, deleting root access keys, and reserving the root user for the few tasks only it can perform, while day-to-day work uses federated or IAM administrators. Using root daily broadens blast radius and obscures accountability, a user named root gains no special powers and adds confusion, and the root user cannot be placed in groups or given policies.",
  },
  {
    id: 85,
    category: "Security",
    question:
      "Which two statements about IAM roles are correct? (Select TWO.)",
    options: [
      "A role provides temporary security credentials obtained through the AWS Security Token Service",
      "A role can be assumed by AWS services such as EC2 and Lambda",
      "A role is a permanent identity intended for long-lived access keys",
      "A role can only be assumed by principals in the same AWS account",
      "Every IAM user must be assigned exactly one role to function",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Roles issue temporary STS credentials and are the standard mechanism for granting AWS services and cross-account principals permissions without long-lived keys. Roles are not identities with permanent keys, they can be configured to trust principals in other accounts, and IAM users function independently of roles.",
  },
  {
    id: 86,
    category: "Security",
    question:
      "An organization has hundreds of teams, each deploying EC2 instances tagged with Team and Environment. Security wants permissions such that a principal tagged Team=A can only manage instances tagged Team=A, without editing policies each time a team is onboarded. Which approach scales best?",
    options: [
      "Generate one customer-managed policy per team and attach it manually at onboarding",
      "Use attribute-based access control: condition keys comparing aws:PrincipalTag/Team with aws:ResourceTag/Team in a single shared policy",
      "Create a separate AWS account per team and peer all the VPCs",
      "Grant each team's role ec2:* on all resources and rely on auditing to catch misuse",
    ],
    correctAnswers: [1],
    explanation:
      "ABAC compares principal tags with resource tags through condition keys in one policy, so onboarding a team requires only tagging, not new policies. Per-team policies require ongoing policy authoring, one account per team solves isolation but at high overhead unrelated to the tagging requirement, and granting ec2:* removes enforcement entirely.",
  },
  {
    id: 87,
    category: "Security",
    question:
      "An auditor asks for evidence showing which principals read objects in a specific S3 bucket, including object-level API activity, for the past 90 days. Management-level CloudTrail is enabled. What must be added?",
    options: [
      "Enable S3 server access logging on the bucket",
      "Enable CloudTrail data events for S3 object-level operations on that bucket",
      "Enable AWS Config recording for the S3 bucket resource",
      "Enable CloudWatch detailed monitoring on the bucket",
    ],
    correctAnswers: [1],
    explanation:
      "By default CloudTrail records management events only; object-level reads and writes are data events, which must be enabled explicitly per bucket (or via an advanced event selector). Server access logging captures requests in a separate log with less identity detail and no query integration, Config tracks configuration, and detailed monitoring provides metrics, not who did what.",
  },
];
