import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { AcmFlowDiagram, KmsEnvelopeDiagram } from "@/components/lesson/diagrams-1-2";

/** Section 1.2 lessons — part C (1.2.9–1.2.12). Original content. */

export function Lesson129() {
  return (
    <>
      <Lead>
        KMS is the center of gravity for encryption on AWS. Nearly every
        “encrypt this properly” question resolves to choosing the right key
        type, writing the right key policy, and knowing which KMS mechanism —
        grants, rotation, encryption context, multi-Region keys — the scenario
        calls for.
      </Lead>

      <H2>Key taxonomy</H2>
      <KeyTable
        head={["Key type", "Who controls it", "Exam tell"]}
        rows={[
          ["AWS managed key", "AWS, per service (aws/s3, aws/rds)", "No key policy editing, no rotation control, free"],
          ["Customer managed key (CMK)", "You — policy, rotation, grants, aliases", "The default answer when any control over keys is required"],
          ["Data keys", "Generated per object by GenerateDataKey", "Envelope encryption (its own lesson)"],
          ["Asymmetric keys", "You — public part downloadable", "Signing outside AWS, encryption where the caller cannot share a secret"],
          ["Multi-Region keys", "You — replicated key material, independent policies", "Same logical key across Regions for cross-Region encryption and DR"],
          ["HSM-backed / external store keys", "CloudHSM cluster or an external key manager", "Compliance levels beyond KMS (its own lesson)"],
        ]}
      />

      <H2>Key policies — the permission that comes first</H2>
      <P>
        A key must have a <strong>key policy</strong>, and for IAM policies to
        work on the key, that key policy must delegate to the account. Beyond
        the delegation statement, key policies are where cross-account access
        is granted and where attestation conditions (enclaves) are enforced.
        Two mechanisms extend access beyond the policy:
      </P>
      <UL
        items={[
          <>
            <strong>Grants</strong> — lightweight, revocable delegations of
            specific operations to specific principals, created programmatically
            without touching the key policy. Used heavily by AWS services
            themselves.
          </>,
          <>
            <strong>Condition keys</strong> — including{" "}
            <Code>kms:ViaService</Code> (allow the key only when used through a
            specific service) and <Code>kms:Recipient/AttestationData</Code>{" "}
            (Nitro Enclaves).
          </>,
        ]}
      />
      <Callout type="warn">
        <strong>Encryption context</strong> is additional authenticated data
        attached to every encrypt call — for example the bucket and object key.
        It is integrity-bound: decryption succeeds only with an exact context
        match. Policies can even require a specific context via{" "}
        <Code>kms:EncryptionContext</Code> conditions. Tampering with stored
        context breaks decryption — an under-taught fact the exam uses.
      </Callout>

      <H2>Rotation, aliases, and cost controls</H2>
      <UL
        items={[
          <>
            <strong>Automatic rotation</strong> (customer managed keys, annual)
            keeps old material for decrypting old data — no re-encryption, no
            application change.
          </>,
          <>
            <strong>Aliases</strong> point at keys, letting applications track a
            name instead of an ID — re-pointing an alias switches keys without
            a redeploy.
          </>,
          <>
            <strong>Bucket keys</strong> reduce KMS request charges for
            high-volume S3 SSE-KMS writes by an order of magnitude.
          </>,
          <>
            Imported key material can be used but never auto-rotates — new
            material means a new key and re-encryption planning.
          </>,
        ]}
      />
      <Callout type="exam">
        Selection shortcuts: <strong>“rotate automatically with no application
        change”</strong> → CMK with automatic rotation. <strong>“same key in
        multiple Regions with independent policies”</strong> → multi-Region
        key. <strong>“only this service may use this key”</strong> →{" "}
        <Code>kms:ViaService</Code>. <strong>“proven not tampered with”
        context</strong> → encryption context. <strong>“delegated programmatic
        access without editing the key policy”</strong> → grants.
      </Callout>
    </>
  );
}

export function Lesson1210() {
  return (
    <>
      <Lead>
        KMS keys are protected by the KMS service. When compliance demands the
        keys live in hardware you control — or outside AWS entirely — three
        escalation paths exist: CloudHSM clusters, KMS custom key stores, and
        external key stores.
      </Lead>

      <H2>AWS CloudHSM</H2>
      <UL
        items={[
          <>
            Single-tenant, FIPS 140-2 Level 3 validated hardware security
            modules in multi-AZ clusters.
          </>,
          <>
            You manage the HSM’s users directly (crypto officers, crypto users)
            using standard HSM tooling; keys are generated and used{" "}
            <em>inside</em> the hardware and are never exportable.
          </>,
          <>
            Applications integrate with standard interfaces: PKCS #11, Java
            JCE, OpenSSL — not the KMS API.
          </>,
          <>
            Clusters are highly available across AZs, and KMS can treat a
            cluster as a <strong>custom key store</strong> so KMS-style keys
            are backed by your HSMs.
          </>,
        ]}
      />

      <H2>Custom key store vs external key store</H2>
      <KeyTable
        head={["Option", "Where key material lives", "API your apps use", "Choose when"]}
        rows={[
          ["KMS custom key store (CloudHSM-backed)", "AWS CloudHSM cluster in your account", "KMS API", "HSM-grade key custody with KMS-style integration"],
          ["External key store (XKS)", "A key manager outside AWS entirely", "KMS API (KMS proxies operations to your system)", "Regulators require keys never reside in AWS — KMS becomes a proxy"],
          ["Direct CloudHSM", "Your cluster, operated by you", "PKCS#11 / JCE / OpenSSL", "Applications need raw HSM operations, custom key hierarchies"],
        ]}
      />
      <Callout type="exam">
        The phrase <strong>“FIPS 140-2 Level 3, single-tenant, keys never leave
        the hardware”</strong> points to CloudHSM. <strong>“Key material must
        remain outside AWS”</strong> points to an external key store.{" "}
        <strong>“KMS API but hardware-backed custody”</strong> points to a
        custom key store. Note the boundaries: KMS keys (standard) are
        multi-tenant and software-protected — strong, but a different
        validation tier.
      </Callout>

      <H2>Shared responsibility shifts</H2>
      <P>
        With CloudHSM and XKS, availability and durability of key material
        become <em>your</em> operational problem — deleting or losing a key
        manager credential chain makes data permanently undecryptable. The exam
        occasionally frames this as a trade-off: absolute key custody in
        exchange for key-availability responsibility.
      </P>
    </>
  );
}

export function Lesson1211() {
  return (
    <>
      <Lead>
        KMS APIs cap payloads at 4 KB, so nothing large is ever encrypted by
        KMS directly. Everything uses envelope encryption: a unique data key
        encrypts the payload locally, and KMS encrypts only the data key.
      </Lead>

      <Diagram title="Envelope encryption — protect and unprotect" caption="KMS touches only the small data key; the bulk data never travels to KMS.">
        <KmsEnvelopeDiagram />
      </Diagram>

      <H2>Where you meet envelope encryption</H2>
      <UL
        items={[
          <>
            <strong>S3 server-side encryption</strong> runs this pattern for
            you invisibly — SSE-KMS stores the encrypted data key with the
            object metadata.
          </>,
          <>
            <strong>Client-side with the AWS Encryption SDK</strong> gives you
            the same pattern in application code, with keyrings (KMS keyring,
            multi-keyrings) choosing wrapping keys.
          </>,
          <>
            <strong>Lambda/EFS, RDS, DynamoDB, Redshift</strong> all apply
            envelope encryption internally under their encryption settings.
          </>,
        ]}
      />

      <H2>The AWS Encryption SDK extras</H2>
      <UL
        items={[
          <>
            <strong>Keyrings</strong> can wrap one data key under multiple
            master keys — decryptable by any of them (useful for key migration
            and shared access without re-encrypting data).
          </>,
          <>
            <strong>Data key caching</strong> (a caching cryptographic
            materials manager with a TTL and max-bytes-used bound) reuses data
            keys across many items, cutting KMS calls dramatically for
            high-write workloads — while keeping bounded exposure.
          </>,
          <>
            Every encrypted message carries its metadata (algorithm, wrapped
            keys, encryption context) in a structured header.
          </>,
        ]}
      />
      <Callout type="exam">
        Question shapes: <strong>“encrypt a 10 GB file with KMS”</strong> →
        GenerateDataKey + local encryption (envelope). <strong>“reduce KMS API
        costs for high-volume encryption”</strong> → data key caching (client
        side) and/or S3 bucket keys (server side).{" "}
        <strong>“decrypt without holding the master key in the app”</strong> →
        the app only ever calls Decrypt on the wrapped key.
      </Callout>

      <H2>Design trade-offs to internalize</H2>
      <UL
        items={[
          <>
            Data key caching trades a small security boundary (many items per
            data key within the TTL) for large cost/latency gains — tune TTL
            and entry limits deliberately.
          </>,
          <>
            Multi-keyring wrapping supports key rotation strategies without
            touching stored data: new items use the new key, old items remain
            decryptable under the old key.
          </>,
          <>
            The encryption context binds ciphertext to its location/identity —
            copy the object somewhere else without preserving context and
            decryption fails loudly.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson1212() {
  return (
    <>
      <Lead>
        Certificates are TLS made real: ACM issues and renews the public certs
        your load balancers and CDNs present, Private CA runs your internal
        certificate authority, and mutual TLS turns certificates into client
        identity.
      </Lead>

      <Diagram title="ACM issuance, renewal, and private CA" caption="DNS validation plus intact records is the whole renewal story.">
        <AcmFlowDiagram />
      </Diagram>

      <H2>Public certificates — the automatic tier</H2>
      <UL
        items={[
          <>
            Free, and <strong>auto-renewed</strong> as long as validation
            records remain — DNS validation is the automatable path (ACM can
            even create the Route 53 record).
          </>,
          <>
            Regional resources (ALB, API Gateway, Cognito) use certificates in{" "}
            <em>their</em> Region; <strong>CloudFront and Cognito hosted UI
            domains require us-east-1</strong>.
          </>,
          <>
            Importing a third-party certificate is supported — but renewal
            becomes your manual re-import job.
          </>,
        ]}
      />

      <H2>Private CA — identity for machines</H2>
      <P>
        AWS Private CA hosts your certificate authority hierarchy (offline
        root, online subordinate CAs) and issues certificates for internal
        services, devices, and mTLS. Pair it with{" "}
        <strong>ACM private certificates</strong> for simple internal use, or
        integrate the CA API with your own issuance tooling. Private
        certificates are deliberately <em>not</em> publicly trusted — browsers
        reject them, internal trust stores accept them.
      </P>

      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Auto-renewing TLS for a public ALB/CloudFront", "ACM public certificate, DNS-validated"],
          ["Internal mTLS between microservices", "Certificates from AWS Private CA (or ALB trust store with private certs)"],
          ["Client certificates at API Gateway custom domain", "Mutual TLS with a truststore of client CAs"],
          ["Certificate for CloudFront", "ACM public certificate in us-east-1"],
          ["Corporate CA-signed certificate you already own", "Import into ACM (manual renewal)"],
        ]}
      />
      <Callout type="exam">
        Renewal mechanics are a reliable question: <strong>issued</strong>{" "}
        certificates renew automatically while DNS validation records stay
        intact; <strong>imported</strong> ones must be re-imported before
        expiry. And “the certificate must be in us-east-1 for CloudFront”
        remains a favorite Region gotcha.
      </Callout>
    </>
  );
}
