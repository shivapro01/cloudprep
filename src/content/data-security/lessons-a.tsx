import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { EncryptionDefaultDiagram, ObjectLockDiagram, PresignedFlowDiagram, S3AccessStackDiagram, TransitEncryptionDiagram } from "@/components/lesson/diagrams-1-3";

/** Section 1.3 lessons — part A (1.3.1–1.3.4). Original content. */

export function Lesson131() {
  return (
    <>
      <Lead>
        S3 is where most data lives, so it is where most data-security questions
        live. The model is a stack: Block Public Access, then bucket policies,
        then IAM, with ACLs retired — and presigned URLs standing outside the
        stack as temporary signed grants.
      </Lead>

      <Diagram title="The S3 access evaluation stack" caption="Every request passes the layers top to bottom.">
        <S3AccessStackDiagram />
      </Diagram>

      <H2>Block Public Access — the pre-evaluation kill switch</H2>
      <P>
        Four independent switches exist at the account level and mirrored at
        the bucket level: block new public ACLs, block new public bucket
        policies, ignore existing public ACLs, and ignore existing public
        bucket policies. They run <em>before</em> policy evaluation — a blocked
        public grant never even reaches the access decision. The exam’s “make
        it impossible for anyone to make a bucket public in this account”
        answer is <strong>Block Public Access at the account level</strong>,
        optionally backed by an SCP for organization-wide enforcement.
      </P>

      <H2>Bucket policies — the workhorse</H2>
      <UL
        items={[
          <>
            Enforce TLS: Deny when <Code>aws:SecureTransport</Code> is false.
          </>,
          <>
            Pin access to a VPC: Deny unless{" "}
            <Code>aws:SourceVpce</Code> matches the approved endpoint.
          </>,
          <>
            Allow the whole organization: condition on{" "}
            <Code>aws:PrincipalOrgID</Code>.
          </>,
          <>
            Require encryption: Deny <Code>s3:PutObject</Code> unless the
            request specifies the mandated SSE-KMS key.
          </>,
        ]}
      />

      <H2>Presigned URLs — temporary grants without identities</H2>
      <Diagram title="Presigned URL flow" caption="Entitlement stays with your app; bytes move directly between client and S3.">
        <PresignedFlowDiagram />
      </Diagram>
      <P>
        Presigned URLs work for downloads and uploads (PUT), can carry forced
        response headers, and are the standard answer for “give a third party
        or a browser time-limited access to one object without creating any
        IAM identity.” Remember the direction distinction: presigned{" "}
        <em>downloads</em> and presigned <em>uploads</em> are different
        signatures — the exam sometimes swaps them as a trap.
      </P>

      <H2>Access points — isolation without bucket sprawl</H2>
      <P>
        When hundreds of applications each need their own view of one bucket,
        access points give each one a unique hostname with its own policy —
        including <strong>VPC-attached access points</strong> that deny any
        access arriving from outside a specific VPC. Multi-Region access
        points extend the idea across replica buckets with one global
        endpoint.
      </P>
      <Callout type="exam">
        Selection shortcuts: <strong>“public website, private bucket”</strong> →
        CloudFront with Origin Access Control. <strong>“temporary single-object
        access for a partner”</strong> → presigned URL. <strong>“many apps,
        one bucket, isolated views”</strong> → access points.{" "}
        <strong>“prevent public buckets account-wide”</strong> → Block Public
        Access.
      </Callout>

      <H2>Object Ownership — who owns what gets uploaded</H2>
      <UL
        items={[
          <>
            <strong>Bucket owner enforced:</strong> the bucket owner owns
            every object regardless of uploader — ACLs are disabled
            entirely. The default for new buckets and the exam’s preferred
            answer for multi-account uploads.
          </>,
          <>
            <strong>Bucket owner preferred:</strong> objects stay with their
            uploader <em>unless</em> they carry the bucket-owner-full-control
            canned ACL — a migration stepping stone, not a destination.
          </>,
          <>
            <strong>Object writer:</strong> legacy behavior where uploaders
            keep ownership — the source of “I can’t read the file my partner
            uploaded” incidents.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson132() {
  return (
    <>
      <Lead>
        Object Lock is S3’s write-once-read-many mechanism: once a version is
        locked with a retention mode or legal hold, deletion and overwrite are
        refused at the storage layer — by design, even against privileged
        users.
      </Lead>

      <Diagram title="Object Lock modes" caption="Versioning is the prerequisite; the mode decides who can break the lock.">
        <ObjectLockDiagram />
      </Diagram>

      <H2>The mechanics worth memorizing</H2>
      <UL
        items={[
          <>
            Locks apply to <strong>object versions</strong> — which is why
            versioning must be enabled first.
          </>,
          <>
            <strong>Retention periods</strong> can be set per object, per
            bucket default, or by the writing application; governance mode can
            be bypassed with a specific IAM permission, compliance mode
            cannot be bypassed by <em>anyone</em>.
          </>,
          <>
            <strong>Legal holds</strong> are retention without a date: on until
            explicitly released, independent of any retention period.
          </>,
          <>
            A locked version still occupies storage until the lock releases
            and lifecycle rules handle it — deletion attempts return Access
            Denied rather than silently succeeding.
          </>,
        ]}
      />
      <Callout type="warn">
        Compliance mode is irreversible by design — a misapplied 7-year lock
        cannot be shortened, only waited out. The exam rewards knowing this
        absoluteness; real deployments usually start in governance mode and
        convert processes before enabling compliance.
      </Callout>

      <H2>Sharing locked and replicated data</H2>
      <UL
        items={[
          <>
            Cross-account sharing of objects uses bucket policies or access
            points; replication into a <strong>backup account</strong> gives
            deletion-proof custody because the workload account holds no
            delete rights there at all.
          </>,
          <>
            Replication is asynchronous and applies to new objects — existing
            objects need an S3 Batch Operations copy (a pairing the exam
            presents as “configure replication AND backfill”).
          </>,
          <>
            Multi-Region access points give one global hostname over replica
            buckets — but for data with residency limits, replicas must stay
            inside the permitted geography (see the isolation lesson).
          </>,
        ]}
      />
      <Callout type="exam">
        Match the wording: <strong>“retain seven years, no one can delete”</strong> →
        compliance mode. <strong>“protected unless a special permission is
        granted”</strong> → governance mode. <strong>“held until litigation
        concludes, no end date known”</strong> → legal hold.
      </Callout>

      <H2>Default retention — locking without per-object calls</H2>
      <UL
        items={[
          <>
            A bucket-level <strong>default retention rule</strong> (mode +
            period) applies automatically to every new object version — no
            PUT-time headers required from writers.
          </>,
          <>
            Per-object retention settings <strong>override the bucket
            default</strong> but can only extend the mode’s guarantees, never
            weaken compliance into governance.
          </>,
          <>
            Default retention plus versioning gives “everything written here
            is immutable for N days” — the compliance-bucket pattern for
            financial and healthcare archives.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson133() {
  return (
    <>
      <Lead>
        Every AWS data store encrypts at rest with KMS-backed keys — but the
        default behavior differs by service, and retrofitting encryption onto
        existing data follows per-service sequences the exam tests directly.
      </Lead>

      <Diagram title="Default-on vs opt-in encryption" caption="Knowing which column a service falls in answers half the questions.">
        <EncryptionDefaultDiagram />
      </Diagram>

      <H2>The key-choice ladder per store</H2>
      <KeyTable
        head={["Option", "Control level", "When the exam wants it"]}
        rows={[
          ["AWS owned keys", "None — held by AWS", "Never a stated requirement; a distractor"],
          ["AWS managed key", "Service-held key, visible in KMS", "“Encrypted with minimal management”"],
          ["Customer managed key (CMK)", "Your policies, rotation, grants, CloudTrail per key", "“Central control”, “our own keys”, audit requirements"],
          ["DSSE-KMS (S3 only)", "Two independent KMS layers", "“Dual-layer encryption required by policy”"],
          ["SSE-C", "Key supplied per request by the client", "“We rotate and hold keys, AWS never stores them”"],
        ]}
      />

      <H2>Retrofitting encryption — the sequences</H2>
      <UL
        items={[
          <>
            <strong>S3:</strong> new objects encrypt per the bucket default or
            the request; existing objects re-encrypt through an{" "}
            <strong>S3 Batch Operations copy</strong> (copy in place with the
            new encryption settings).
          </>,
          <>
            <strong>EBS:</strong> encryption cannot be toggled on a live
            volume — snapshot, copy the snapshot with encryption (choosing the
            CMK), create a new volume from the encrypted snapshot, swap.
          </>,
          <>
            <strong>RDS/Aurora:</strong> same shape — snapshot, copy with
            encryption, restore as an encrypted instance; or use RDS{" "}
            blue/green deployments to migrate cleanly.
          </>,
          <>
            <strong>EFS/FSx:</strong> created encrypted or not; retrofit means
            new file system + data sync.
          </>,
        ]}
      />
      <Callout type="warn">
        Unencrypted <em>snapshots cannot be encrypted in place</em>, and
        encryption status propagates: an encrypted EBS source produces
        encrypted snapshots, and cross-account copies need the destination to
        have key access. Both facts appear as answer-option traps.
      </Callout>

      <H2>Per-store defaults worth knowing cold</H2>
      <UL
        items={[
          <>
            S3: <strong>SSE-S3 applied automatically</strong> to every new
            object since 2023 — the question is which key, not whether.
          </>,
          <>
            DynamoDB: <strong>always encrypted</strong> at rest (AWS owned or
            customer managed) — no unencrypted mode exists.
          </>,
          <>
            ElastiCache/Redshift/OpenSearch: encryption at rest and in
            transit are <strong>configuration choices</strong> made at
            creation.
          </>,
          <>
            EBS: a Region-level “encrypt by default” setting makes every new
            volume and snapshot encrypted automatically.
          </>,
        ]}
      />

      <H2>Encryption by default — EBS and RDS mechanics</H2>
      <UL
        items={[
          <>
            <strong>EBS encryption by default</strong> is a per-Region
            account setting: every new volume and every snapshot copy
            encrypts automatically under the chosen KMS key (AWS managed
            unless you specify a customer managed key).
          </>,
          <>
            <strong>RDS encryption</strong> is set at instance creation and
            cannot be toggled later — encrypting an existing unencrypted
            instance means snapshot, copy with encryption, restore.
          </>,
          <>
            Automated backups, read replicas, and snapshot copies{" "}
            <strong>inherit the source’s encryption state</strong> — an
            encrypted primary never produces an unencrypted copy.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson134() {
  return (
    <>
      <Lead>
        Data in transit has four distinct paths, and each has its own
        encryption answer: users to AWS (TLS via ACM), on-premises to AWS (VPN
        or Direct Connect, optionally with MACsec), VPC to VPC (private
        backbone, encryption at the application layer), and instance to
        services (TLS enforced by policy).
      </Lead>

      <Diagram title="Encryption in transit by path" caption="The transport decides the tool; the exam decides by path.">
        <TransitEncryptionDiagram />
      </Diagram>

      <H2>The enforcement controls</H2>
      <UL
        items={[
          <>
            <strong>S3:</strong> bucket policy Deny where{" "}
            <Code>aws:SecureTransport</Code> is false — the canonical “HTTPS
            only” pattern.
          </>,
          <>
            <strong>ELB/API Gateway/CloudFront:</strong> HTTPS-only listeners,
            ACM certificates, and redirect rules from port 80.
          </>,
          <>
            <strong>End-to-end to instances:</strong> HTTPS listener on the
            ALB plus HTTPS on targets with certificates installed — TLS
            terminates and re-encrypts.
          </>,
          <>
            <strong>Service APIs:</strong> interface endpoints plus VPC
            routing keep API traffic private; SigV4 signs every call.
          </>,
        ]}
      />
      <Callout type="exam">
        Distinguish the hybrid answers: <strong>“quick, encrypted, over the
        internet”</strong> → Site-to-Site VPN. <strong>“dedicated private
        bandwidth with consistent latency”</strong> → Direct Connect (add{" "}
        <strong>MACsec</strong> only when the question demands layer-2
        encryption on a 10/100 Gbps dedicated connection). <strong>“private
        and encrypted service endpoint without internet”</strong> → PrivateLink
        with TLS.
      </Callout>

      <H2>Subtle facts that change answers</H2>
      <UL
        items={[
          <>
            VPC peering and Transit Gateway traffic stays on the AWS backbone
            and is <strong>not automatically encrypted</strong> — if a question
            demands encryption for cross-VPC service traffic, the answer is
            application TLS or PrivateLink, not “the backbone is private.”
          </>,
          <>
            CloudFront to origin can be HTTPS end to end — and origin access
            over HTTPS validates the origin certificate, which is why origins
            need trusted certificates.
          </>,
          <>
            Direct Connect alone is private but <strong>not
            encrypted</strong> unless MACsec is enabled on supported 10/100
            Gbps dedicated connections, or a VPN runs over it.
          </>,
        ]}
      />

      <H2>TLS versions and cipher policies — the hardening detail</H2>
      <UL
        items={[
          <>
            Load balancers, CloudFront, and API Gateway expose{" "}
            <strong>security policies</strong> (e.g., TLS 1.2+ only,
            forward-secret ciphers) — compliance questions asking to
            “disable TLS 1.0/1.1” are answered by selecting a modern
            predefined policy, not by application code.
          </>,
          <>
            <strong>End-to-end TLS</strong> (ALB HTTPS listener + HTTPS
            target group) keeps traffic encrypted behind the balancer;
            terminating at the ALB alone leaves the backend leg in
            plaintext.
          </>,
          <>
            Certificate rotation on listeners is hitless — swapping the ACM
            certificate never drops the listener, so “rotate without
            downtime” is a non-event.
          </>,
        ]}
      />
    </>
  );
}
