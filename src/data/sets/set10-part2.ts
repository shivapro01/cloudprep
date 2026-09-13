import type { QuizQuestion } from "../questions";

/** Practice Set 10 — questions 608–629 (CI/CD and security operations). Original questions. */
export const set10Part2: QuizQuestion[] = [
  {
    id: 608,
    category: "Management & Governance",
    question:
      "A deployment strategy for EC2 behind a load balancer must create an entirely new set of instances and switch traffic, keeping the old fleet intact for instant rollback. Which CodeDeploy configuration matches?",
    options: [
      "In-place deployment with rolling batches",
      "Blue/green deployment provisioning a replacement Auto Scaling group and rerouting traffic",
      "Canary deployment shifting traffic linearly on the same instances",
      "All-at-once deployment during a maintenance window",
    ],
    correctAnswers: [1],
    explanation:
      "CodeDeploy blue/green for EC2/ASG provisions a new green ASG from the launch template, validates, and reroutes the listener — old fleet preserved for instant rollback. In-place and canary mutate the existing fleet, and maintenance-window deployments aren't a rollback strategy.",
  },
  {
    id: 609,
    category: "Management & Governance",
    question:
      "A CodeBuild project needs database credentials for integration tests. Hardcoding them in environment variables in the project is forbidden. What is the correct pattern?",
    options: [
      "Reference Secrets Manager or Parameter Store SecureString values from the buildspec, so credentials are injected at build time",
      "Store credentials in a plain-text file in the source repository",
      "Embed credentials into the built container image",
      "Pass credentials as build command-line arguments visible in logs",
    ],
    correctAnswers: [0],
    explanation:
      "CodeBuild integrates with Secrets Manager and Parameter Store, injecting secrets at runtime without placing them in source, images, or command lines. Repos, images, and command lines all persist or leak the secret.",
  },
  {
    id: 610,
    category: "Management & Governance",
    question:
      "A CodePipeline has a source stage in us-east-1 and a deploy action targeting a stack in eu-west-1; the pipeline fails at artifact handoff. What is the constraint and remedy?",
    options: [
      "Pipeline artifacts live in a single Region's bucket; deploy actions in another Region need the artifact replicated (cross-Region actions handle this via replica buckets)",
      "CodePipeline cannot deploy outside its Region at all",
      "The stack must be renamed to match the Region",
      "Artifacts must be zipped and emailed to the other Region",
    ],
    correctAnswers: [0],
    explanation:
      "Cross-Region actions work when the pipeline uses the cross-Region support, which replicates artifacts into the target Region's bucket automatically; without it, actions can't read artifacts across Regions. Pipelines do support cross-Region actions, and naming and email have no role.",
  },
  {
    id: 611,
    category: "Management & Governance",
    question:
      "An existing CodeCommit repository must trigger its pipeline automatically when a branch is updated. Which event wiring starts the pipeline on commit?",
    options: [
      "An EventBridge rule matching CodeCommit repository state change events targeting the pipeline",
      "A cron job polling the repository hourly",
      "A CloudWatch alarm on repository size",
      "Manual pipeline execution after each push notification email",
    ],
    correctAnswers: [0],
    explanation:
      "CodeCommit emits events through EventBridge; a rule filtered on branch changes invokes StartPipelineExecution automatically. Polling, size alarms, and manual runs are not event-driven triggers.",
  },
  {
    id: 612,
    category: "Management & Governance",
    question:
      "A serverless application (Lambda, API Gateway, DynamoDB) is defined in a template with a Transform header enabling shorthand syntax, local invoke, and guided deploys. Which framework is this?",
    options: [
      "AWS Serverless Application Model (SAM)",
      "AWS CDK in Python",
      "CloudFormation raw YAML without transforms",
      "Serverless Framework (third-party)",
    ],
    correctAnswers: [0],
    explanation:
      "SAM is the AWS-native serverless framework: a CloudFormation transform providing simplified syntax, sam local invoke for testing, and sam deploy guidance. CDK uses programming languages, raw CloudFormation lacks the transform conveniences, and Serverless Framework is not first-party.",
  },
  {
    id: 613,
    category: "Management & Governance",
    question:
      "An organization standard requires infrastructure changes to flow only through the deployment pipeline, with environment promotions gated by approvals across member accounts. Which combination implements multi-account gated IaC delivery?",
    options: [
      "CloudFormation StackSets scoped to OUs, deployed by a CodePipeline whose stages include manual approval gates per environment",
      "Developers deploying directly into each account's console with change tickets",
      "A single shared production stack with tags per environment",
      "Manual StackSet instance additions per account on request",
    ],
    correctAnswers: [0],
    explanation:
      "StackSets delivers the template to the right accounts and Regions while the pipeline adds the gating, approvals, and audit trail for environment promotion. Direct console deployment bypasses governance, shared stacks break isolation, and manual additions lose the gate.",
  },
  {
    id: 614,
    category: "Security",
    question:
      "An encrypted EBS snapshot must be shared with another account, which will copy it under its own KMS key. What must be granted for the cross-account copy to re-encrypt successfully?",
    options: [
      "The destination account needs kms:Decrypt (and related) permissions on the source key via the key policy, so it can read before re-encrypting with its own key",
      "Only the snapshot's modify-permission attribute on the volume",
      "Nothing — snapshot sharing automatically transfers key control",
      "The source account must first decrypt the snapshot to unencrypted form",
    ],
    correctAnswers: [0],
    explanation:
      "Sharing an encrypted snapshot grants metadata, but the recipient's copy operation must decrypt with the source key (via key policy grants) before re-encrypting under the destination key. There is no automatic key transfer, and decrypt-to-plaintext sharing is neither possible nor advisable.",
  },
  {
    id: 615,
    category: "Networking & Content Delivery",
    question:
      "A multi-account structure wants all internet egress — inspected and controlled — to flow through a central inspection VPC, with spokes across accounts using it. Which architecture implements centralized egress?",
    options: [
      "Spoke VPCs route 0.0.0.0/0 through a Transit Gateway to an inspection VPC containing firewalls and NAT gateways",
      "Each spoke runs its own NAT gateway with local firewall rules",
      "Peering every spoke to the internet gateway",
      "Route 53 Resolver forwarding egress through DNS",
    ],
    correctAnswers: [0],
    explanation:
      "The hub-and-spoke egress VPC pattern centralizes NAT and inspection via Transit Gateway routing, giving one audited exit point. Distributed NATs fragment the control, peering to an IGW isn't a construct, and DNS forwarding doesn't route traffic.",
  },
  {
    id: 616,
    category: "Compute",
    question:
      "A golden AMI backed by an encrypted snapshot and a customer managed KMS key must be usable by another account. Which set of grants is required?",
    options: [
      "Modify launch permissions on the AMI, share the underlying snapshot, and grant the other account access to the KMS key policy",
      "Only make the AMI public",
      "Copy the AMI to the other account with root credentials",
      "Attach the KMS key to the other account's SCP",
    ],
    correctAnswers: [0],
    explanation:
      "Encrypted AMI sharing touches three layers: AMI launch permissions, snapshot permissions, and the KMS key policy for the recipient — all three are required. Public AMIs can't carry encrypted snapshots usefully, cross-account copying with root violates practice, and SCPs don't grant key use.",
  },
  {
    id: 617,
    category: "Management & Governance",
    question:
      "A cost policy requires Environment and Owner tags on resource creation, rejecting requests that omit them. Which control enforces tagging at request time?",
    options: [
      "An SCP or IAM policy with a condition requiring aws:RequestTag keys (and enforcing TagResources) on create actions",
      "A nightly Config rule reporting untagged resources",
      "A Cost Explorer group-by that shows untagged spend",
      "Tag Editor batch operations run monthly",
    ],
    correctAnswers: [0],
    explanation:
      "Conditions on aws:RequestTag inside create-action statements reject untagged creation requests immediately — enforcement at the source. Config rules, cost grouping, and batch tagging are detective or corrective after the fact.",
  },
  {
    id: 618,
    category: "Management & Governance",
    question:
      "Session Manager activity must be logged to S3 with KMS encryption and audible to CloudWatch Logs simultaneously, configured once for all instances. Where is this set?",
    options: [
      "Session Manager preferences (SSM document SSM-SessionManagerRunShell settings)",
      "Each instance's user data script",
      "The SSM agent's local config file per host",
      "CloudTrail data events for SSM",
    ],
    correctAnswers: [0],
    explanation:
      "Session Manager preferences centralize logging destinations (S3 with KMS, CloudWatch Logs) for all sessions fleet-wide. User data and per-host config don't centralize, and CloudTrail records the API layer rather than session content.",
  },
  {
    id: 619,
    category: "Security",
    question:
      "An auditor questions whether CloudTrail log files were modified after delivery. Which CloudTrail feature provides tamper evidence for delivered logs?",
    options: [
      "Log file integrity validation, which delivers digest files signed hourly that can be verified against the logs",
      "S3 Versioning on the trail bucket",
      "CloudTrail event selectors",
      "Server-side encryption of the log bucket",
    ],
    correctAnswers: [0],
    explanation:
      "Integrity validation produces signed digest files of log hashes; re-running validation detects any alteration of delivered logs. Versioning and encryption protect but don't attest, and event selectors filter what's recorded.",
  },
  {
    id: 620,
    category: "Security",
    question:
      "A security review must find IAM roles, access keys, and passwords that haven't been used in 90+ days — candidates for revocation. Which IAM Access Analyzer feature generates these findings?",
    options: [
      "Unused access analysis (unused roles, keys, and permissions)",
      "External access analysis only",
      "Policy generation from CloudTrail",
      "Credential report sorting",
    ],
    correctAnswers: [0],
    explanation:
      "Access Analyzer's unused access analysis surfaces identities and credentials with no recent use, plus unused permissions, driving revocation. External access is a different analyzer type, policy generation drafts policies, and credential reports are point-in-time listings.",
  },
  {
    id: 621,
    category: "Security",
    question:
      "Workforce identities live in Okta. When employees join or leave, their AWS access through IAM Identity Center must update automatically without manual account edits. Which integration provides this?",
    options: [
      "SCIM provisioning between Okta and IAM Identity Center",
      "A nightly CSV upload of users to IAM",
      "Manual permission set assignment by the help desk",
      "Sharing the admin portal credentials with HR",
    ],
    correctAnswers: [0],
    explanation:
      "SCIM synchronizes identity lifecycle (create, update, disable) from the IdP into Identity Center automatically. CSV uploads and manual assignment reintroduce toil and lag, and credential sharing violates every principle.",
  },
  {
    id: 622,
    category: "Security",
    question:
      "Which two AWS services implement detective controls? (Select TWO.)",
    options: [
      "AWS CloudTrail",
      "Amazon GuardDuty",
      "Service control policies",
      "KMS encryption of volumes",
      "S3 Block Public Access",
    ],
    correctAnswers: [0, 1],
    explanation:
      "CloudTrail records activity for later review and GuardDuty detects threats — both detective. SCPs, encryption, and public-access blocks act before events, making them preventive.",
  },
  {
    id: 623,
    category: "Security",
    question:
      "Classify this control set: (1) an SCP denying public S3 buckets, (2) GuardDuty alerting on compromised keys, (3) a Config rule auto-remediating unencrypted volumes.",
    options: [
      "All three are preventive controls",
      "Preventive, detective, and corrective respectively",
      "Detective, preventive, and corrective respectively",
      "Corrective, detective, and preventive respectively",
    ],
    correctAnswers: [1],
    explanation:
      "The SCP stops the misconfiguration before it exists (preventive), GuardDuty identifies ongoing compromise (detective), and automated remediation repairs drift after detection (corrective). The other orderings misclassify at least one control.",
  },
  {
    id: 624,
    category: "Security",
    question:
      "An application must digitally sign documents in AWS and allow partners to verify signatures offline with a public key, without exposing any private key material. Which KMS key type supports sign and public-key distribution?",
    options: [
      "A KMS asymmetric key pair, where the public key can be downloaded for offline verification while the private half never leaves KMS",
      "A KMS symmetric key with the secret exported to partners",
      "An RSA key stored in an S3 bucket with KMS encryption",
      "A CloudHSM backup shipped to partners",
    ],
    correctAnswers: [0],
    explanation:
      "Asymmetric KMS keys support signing inside KMS while the public key is freely distributed for verification — the private half stays protected. Symmetric keys can't be verified offline without the secret, and exporting or shipping key material defeats the model.",
  },
  {
    id: 625,
    category: "Security",
    question:
      "When requesting ACM certificates for many domains programmatically, which validation method avoids manual intervention and scales?",
    options: [
      "DNS validation, satisfied by adding CNAME records (often automated via Route 53 integration)",
      "Email validation to the domain's administrative contacts",
      "HTTP file uploads to each domain's web root",
      "No validation is needed for public certificates",
    ],
    correctAnswers: [0],
    explanation:
      "DNS validation integrates with Route 53 for automatic record insertion and renewal — the programmatic choice. Email validation requires human responses per certificate, HTTP validation adds web-server dependencies, and validation is always required.",
  },
  {
    id: 626,
    category: "Security",
    question:
      "A database security team wants alerts when unusual database access patterns occur — such as atypical login volume or query behavior on RDS — without deploying agents. Which GuardDuty protection provides this?",
    options: [
      "GuardDuty RDS Protection",
      "Amazon RDS Performance Insights",
      "Amazon Inspector database scans",
      "RDS event subscriptions for failovers",
    ],
    correctAnswers: [0],
    explanation:
      "GuardDuty RDS Protection analyzes RDS login and query activity (via API surfaces) for anomalous patterns agentlessly. Performance Insights tunes performance, Inspector scans software, and event subscriptions report operations, not threats.",
  },
  {
    id: 627,
    category: "Security",
    question:
      "Security Hub receives thousands of low-severity findings that drown the queue. The team wants specific findings auto-archived based on criteria (severity, resource type) without writing custom Lambdas. Which feature applies?",
    options: [
      "Security Hub automation rules",
      "EventBridge rules archiving findings to S3",
      "A Config aggregator filter",
      "GuardDuty suppression tags",
    ],
    correctAnswers: [0],
    explanation:
      "Automation rules apply actions (including archiving and severity changes) to matching findings natively inside Security Hub. EventBridge approaches work but are custom builds, Config aggregates configuration, and GuardDuty suppressions are service-specific.",
  },
  {
    id: 628,
    category: "Security",
    question:
      "A security team wants automatic alerting whenever any S3 bucket in the account becomes publicly readable or shared with an external account — checked continuously, not on scan schedules. Which feature provides account-level S3 exposure findings?",
    options: [
      "IAM Access Analyzer for S3, enabled at the account level",
      "S3 Storage Lens protection metrics",
      "CloudTrail data event alerts",
      "Macie bucket policy review",
    ],
    correctAnswers: [0],
    explanation:
      "Access Analyzer for S3 continuously analyzes bucket ACLs and policies against external principals and raises active findings when exposure appears. Storage Lens reports aggregates, CloudTrail logs calls, and Macie targets data content.",
  },
  {
    id: 629,
    category: "Security",
    question:
      "Which two capabilities belong to AWS KMS? (Select TWO.)",
    options: [
      "Automatic annual key rotation for customer managed keys",
      "Grants delegating limited key usage to principals",
      "Terminating TLS connections for web servers",
      "Storing large raw data files for encryption on demand",
      "Acting as a certificate authority for public TLS",
    ],
    correctAnswers: [0, 1],
    explanation:
      "KMS rotates customer managed keys automatically (yearly) and delegates scoped usage via grants. It does not terminate TLS, store bulk data, or issue public certificates.",
  },
];
