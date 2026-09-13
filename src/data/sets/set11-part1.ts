import type { QuizQuestion } from "../questions";

/** Practice Set 11 — questions 651–672 (containers and compute advanced). Original questions. */
export const set11Part1: QuizQuestion[] = [
  {
    id: 651,
    category: "Compute",
    question:
      "Individual pods in an EKS cluster need distinct least-privilege IAM permissions — one service account reads S3, another writes DynamoDB — without sharing the node's role. Which mechanism provides per-service-account IAM?",
    options: [
      "IAM Roles for Service Accounts (IRSA), federating role credentials to Kubernetes service accounts via OIDC",
      "Attaching multiple IAM roles directly to the node group AMI",
      "Hard-coding access keys into each pod's environment",
      "Granting the node role full S3 and DynamoDB access for all pods",
    ],
    correctAnswers: [0],
    explanation:
      "IRSA links Kubernetes service accounts to IAM roles through an OIDC identity provider, so each pod receives exactly its own scoped credentials. The node role is then a fallback rather than the source of truth, and keys-in-pods violates credential hygiene.",
  },
  {
    id: 652,
    category: "Compute",
    question:
      "An ECS service's tasks should spread across Availability Zones for resilience but pack onto as few instances as possible within each zone for cost. How should placement be configured?",
    options: [
      "A placement strategy ordering spread (attribute: availability-zone) first, then binpack (memory)",
      "Binpack first, then spread",
      "Random placement with constraints",
      "Manual placement through the console each launch",
    ],
    correctAnswers: [0],
    explanation:
      "Strategies apply in order: spread across AZs first for resilience, then binpack memory to fill instances densely within each zone. Reversing the order prioritizes packing over zone balance, and random or manual placement gives up the guarantees.",
  },
  {
    id: 653,
    category: "Compute",
    question:
      "GPU-accelerated tasks must land only on container instances that have GPUs registered as custom attributes. Which ECS placement control restricts target instances?",
    options: [
      "A placement constraint expression (memberOf) matching the instance attribute",
      "A capacity provider set to Fargate",
      "A service deployment circuit breaker",
      "A task definition CPU hint",
    ],
    correctAnswers: [0],
    explanation:
      "memberOf constraints evaluate instance attributes (such as gpuCount) so only qualifying hosts receive the task. Fargate has no GPUs, deployment circuit breakers handle rollback, and CPU hints don't select hosts.",
  },
  {
    id: 654,
    category: "Compute",
    question:
      "Stateless batch pods in one Kubernetes namespace should run on Fargate (no nodes to manage), while stateful pods stay on EC2 node groups. How is this split expressed in EKS?",
    options: [
      "Fargate profiles with namespace and label selectors matching the batch pods",
      "Node affinity rules alone with no profile",
      "Tainting all nodes so nothing schedules on them",
      "A separate EKS cluster for batch pods",
    ],
    correctAnswers: [0],
    explanation:
      "Fargate profiles select pods by namespace and labels, scheduling matches onto Fargate while everything else continues on node groups. Node affinity without a profile doesn't invoke Fargate, taints block scheduling, and a second cluster doubles operations.",
  },
  {
    id: 655,
    category: "Compute",
    question:
      "A Lambda function returns large generated reports (tens of megabytes) and clients want bytes as they're produced rather than waiting for full buffering. Which Lambda capability streams responses progressively?",
    options: [
      "Lambda response streaming, available through function URLs and SDKs",
      "Multipart uploads from the function to the client",
      "API Gateway caching with chunked transfer",
      "Writing chunks to S3 and emailing links",
    ],
    correctAnswers: [0],
    explanation:
      "Response streaming sends the payload as it's generated, cutting time-to-first-byte and removing payload size ceilings for streaming-capable invocation paths. Chunked uploads and email links don't stream to the caller, and API Gateway caching isn't a transport.",
  },
  {
    id: 656,
    category: "Compute",
    question:
      "A research group needs guaranteed GPU instance capacity for a fixed training window three months from now, paying only for the reserved window. Which EC2 purchasing option fits?",
    options: [
      "EC2 Capacity Blocks for ML",
      "Spot Instances with capacity-optimized allocation",
      "On-Demand Capacity Reservations held year-round",
      "Scheduled Reserved Instances",
    ],
    correctAnswers: [0],
    explanation:
      "Capacity Blocks for ML reserve specific GPU capacity for a future short window, priced for the block duration. Spot has no guarantee, year-round reservations overpay, and Scheduled RIs don't cover GPU families.",
  },
  {
    id: 657,
    category: "Compute",
    question:
      "An HPC simulation uses MPI across tightly coupled instances and requires OS-bypass networking for the lowest inter-node latency. Which EC2 networking feature provides this?",
    options: [
      "Elastic Fabric Adapter (EFA)",
      "Enhanced networking with the ENA driver alone",
      "A Network Load Balancer between the instances",
      "Multiple elastic network interfaces per instance",
    ],
    correctAnswers: [0],
    explanation:
      "EFA provides OS-bypass access to the instance network for HPC and ML communication patterns like MPI. ENA improves throughput but retains the kernel network stack, load balancers add hops, and extra ENIs are addressing, not bypass.",
  },
  {
    id: 658,
    category: "Compute",
    question:
      "Per-core software licensing requires an instance with fewer vCPUs than the instance type's default while keeping the same memory. Which EC2 capability customizes this?",
    options: [
      "CPU options, specifying cores and threads per core at launch",
      "Burstable mode throttling",
      "A smaller instance family with more RAM",
      "Instance metadata tag settings",
    ],
    correctAnswers: [0],
    explanation:
      "CPU options let launches specify exact core and thread counts, reducing licensable vCPUs while retaining the type's memory footprint. Burstable throttling reduces performance unpredictably, and no family shrinks cores while preserving memory exactly.",
  },
  {
    id: 659,
    category: "Compute",
    question:
      "An instance fails to boot (kernel panic) and has no reachable network stack. Engineers need console-level access to the boot output for diagnosis. Which EC2 feature exposes a text console without networking?",
    options: [
      "EC2 Serial Console",
      "Systems Manager Run Command",
      "EC2 Instance Connect over port 22",
      "Enhanced monitoring boot logs",
    ],
    correctAnswers: [0],
    explanation:
      "The serial console attaches to the instance's virtual serial port, showing boot output independent of network state. Run Command and Instance Connect require a reachable OS, and CloudWatch logs capture whatever the guest chose to log, not the console.",
  },
  {
    id: 660,
    category: "Compute",
    question:
      "A per-socket licensed workload must restart on the same Dedicated Host to preserve its license assignment across stops and starts. Which Dedicated Host behavior provides this?",
    options: [
      "Host affinity, targeting the instance to a specific host ID",
      "Auto-placement on any available dedicated host",
      "Dedicated Instances with tenancy isolation",
      "A cluster placement group on the host",
    ],
    correctAnswers: [0],
    explanation:
      "Host affinity pins an instance to a particular host so it relaunches there, preserving socket-level license state. Auto-placement floats across hosts, Dedicated Instances isolate hardware without host identity, and placement groups are unrelated to hosts.",
  },
  {
    id: 661,
    category: "Compute",
    question:
      "An outdated AMI is deregistered. What happens to running instances launched from it?",
    options: [
      "They continue running normally; deregistration only prevents new launches from the AMI",
      "They terminate immediately",
      "They restart onto the latest AMI",
      "They become read-only until restarted",
    ],
    correctAnswers: [0],
    explanation:
      "Deregistration removes the AMI as a launch source; already-running instances keep their volumes and state unaffected. Termination, replacement, and read-only behavior do not occur.",
  },
  {
    id: 662,
    category: "Compute",
    question:
      "A small business owner wants a simple virtual server with a static website and a database, preferring bundled simple pricing and a simplified console over granular AWS control. Which service targets this user?",
    options: [
      "Amazon Lightsail",
      "Raw EC2 with manually attached EBS and RDS",
      "AWS Outposts",
      "EKS with Fargate",
    ],
    correctAnswers: [0],
    explanation:
      "Lightsail packages compute, storage, networking, and databases with fixed pricing and a simplified experience for common workloads. Raw EC2/RDS offers more control at more complexity than this user wants, and the other options target advanced or niche scenarios.",
  },
  {
    id: 663,
    category: "Compute",
    question:
      "A frontend React application with a GraphQL backend should deploy from a Git repository automatically — build, test, host globally with HTTPS, and server-side rendering support. Which AWS service delivers this full-stack workflow?",
    options: [
      "AWS Amplify Hosting",
      "S3 website hosting with manual uploads",
      "CloudFront Functions building the app at the edge",
      "Elastic Beanstalk with a Node environment",
    ],
    correctAnswers: [0],
    explanation:
      "Amplify Hosting provides Git-connected CI/CD builds, global hosting with HTTPS, SSR support, and backend wiring for full-stack web apps. Manual S3 hosting lacks the pipeline, edge functions don't build apps, and Beanstalk targets application servers rather than frontend workflows.",
  },
  {
    id: 664,
    category: "Compute",
    question:
      "An Elastic Beanstalk environment needs extra packages installed and config files modified on every instance during provisioning, declared with the application source. Which mechanism applies these?",
    options: [
      ".ebextensions configuration files packaged with the application",
      "Manual SSH configuration after each deploy",
      "A separate CloudFormation stack per instance",
      "Editing the AMI after each deployment",
    ],
    correctAnswers: [0],
    explanation:
      ".ebextensions (and Buildfiles) run commands and modify configuration as part of environment provisioning, declaratively and reproducibly. SSH tinkering and AMI edits are untracked drift, and separate stacks don't ride along with app deploys.",
  },
  {
    id: 665,
    category: "Compute",
    question:
      "An Elastic Beanstalk team wants to codify reusable environment settings — instance type, VPC, scaling limits — and apply them when creating new environments. Which feature stores these?",
    options: [
      "Saved configurations (environment templates)",
      "Environment clones created by hand",
      "Platform hooks",
      "The application version bucket",
    ],
    correctAnswers: [0],
    explanation:
      "Saved configurations capture environment settings as reusable templates applied at environment creation. Hand cloning is informal, hooks run scripts, and application versions contain code, not settings.",
  },
  {
    id: 666,
    category: "Compute",
    question:
      "Multiple teams submit AWS Batch jobs to shared compute environments. Finance jobs must not starve research jobs (and vice versa), with priority weighting per team. Which Batch scheduling feature enforces fair sharing?",
    options: [
      "Fair-share scheduling within a job queue, with share identifiers and priority weights",
      "Separate clusters per team with manual balancing",
      "Random job ordering in a single queue",
      "Larger instances for whoever submits first",
    ],
    correctAnswers: [0],
    explanation:
      "Fair-share scheduling allocates compute across share identifiers proportionally with weights and priorities, preventing any team from monopolizing the queue. Separate clusters fragment capacity, random order ignores fairness, and first-come-first-served enables starvation.",
  },
  {
    id: 667,
    category: "Compute",
    question:
      "EC2 emits a signal that a Spot instance faces elevated interruption risk. The workload wants proactive replacement on new capacity before reclamation, draining gracefully. Which Auto Scaling feature handles the signal?",
    options: [
      "Capacity rebalancing, launching replacements when Spot instances are at elevated risk",
      "Instance scale-in protection",
      "Increasing the cooldown period",
      "Lifecycle hooks at termination only",
    ],
    correctAnswers: [0],
    explanation:
      "Capacity rebalancing reacts to Spot rebalance recommendations by launching fresh capacity and terminating at-risk instances, ideally with termination lifecycle hooks for draining. Scale-in protection does the opposite, cooldowns delay actions, and termination-only hooks miss the proactive window.",
  },
  {
    id: 668,
    category: "Compute",
    question:
      "Which two configurations together minimize inter-instance latency for a tightly coupled HPC application? (Select TWO.)",
    options: [
      "Cluster placement group",
      "Elastic Fabric Adapter (EFA)",
      "Spread placement across AZs",
      "Public IP addresses on each instance",
      "A Gateway Load Balancer between nodes",
    ],
    correctAnswers: [0, 1],
    explanation:
      "Cluster placement provides physical proximity, and EFA provides OS-bypass networking — together the lowest-latency pairing. Spread across AZs adds distance, public IPs add no speed, and a load balancer inserts hops.",
  },
  {
    id: 669,
    category: "Compute",
    question:
      "An operator's mistyped script stopped production instances unexpectedly. Which per-instance setting blocks StopInstances API calls while still allowing reboot?",
    options: [
      "Stop protection (disableStopProtection) on the instance",
      "Termination protection, which covers only termination",
      "Instance scale-in protection",
      "An SCP denying all EC2 actions",
    ],
    correctAnswers: [0],
    explanation:
      "Stop protection specifically rejects stop attempts while permitting reboot; termination protection guards deletion, scale-in protection applies to ASG members, and blanket SCP denials break necessary operations too.",
  },
  {
    id: 670,
    category: "Compute",
    question:
      "An agent running on instances needs the instance's Team and Environment tags but must not call the EC2 API (to avoid rate limits and API permissions). How can it read the tags locally?",
    options: [
      "Enable instance metadata tag access, exposing resource tags through instance metadata",
      "Parse the launch template from disk",
      "Query CloudWatch dimensions",
      "Read the instance profile's policy JSON",
    ],
    correctAnswers: [0],
    explanation:
      "Metadata tag access surfaces resource tags in the metadata endpoint, letting local agents read tags without DescribeTags API calls. Launch templates, CloudWatch dimensions, and policy JSON don't carry runtime tag values.",
  },
  {
    id: 671,
    category: "Compute",
    question:
      "A deep-learning inference endpoint runs continuously with latency requirements but doesn't need training-grade GPUs; cost per inference matters. Which instance family targets inference acceleration?",
    options: [
      "Inf/Inf2 (Inferentia) instances",
      "P-family training GPUs",
      "T-family burstable instances",
      "I-family storage optimized",
    ],
    correctAnswers: [0],
    explanation:
      "Inferentia-based instances deliver high throughput per dollar for inference workloads specifically. P instances are training-grade GPUs at higher cost, T instances lack acceleration, and I instances optimize storage.",
  },
  {
    id: 672,
    category: "Compute",
    question:
      "Which two are valid ECS launch types for running task definitions? (Select TWO.)",
    options: [
      "Fargate",
      "EC2",
      "EKS",
      "Lambda",
      "Lightsail",
    ],
    correctAnswers: [0, 1],
    explanation:
      "ECS tasks run on Fargate or EC2 launch types (with capacity providers). EKS is a separate Kubernetes service, and Lambda and Lightsail are not ECS launch types.",
  },
];
