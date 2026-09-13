import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { AlbAuthDiagram, NitroEnclaveDiagram, SecretsRotationDiagram } from "@/components/lesson/diagrams-1-2";

/** Section 1.2 lessons — part D (1.2.13–1.2.15). Original content. */

export function Lesson1213() {
  return (
    <>
      <Lead>
        Credential rotation is where secrets management earns its price. The
        exam’s favorite pattern — “rotate database credentials with zero
        downtime” — resolves to Secrets Manager’s alternating-user strategy,
        driven by a rotation Lambda on a schedule.
      </Lead>

      <Diagram title="Alternating-user rotation" caption="A valid credential pair always exists; rotation flips between two users instead of mutating one.">
        <SecretsRotationDiagram />
      </Diagram>

      <H2>The four steps of a rotation</H2>
      <UL
        items={[
          <>
            <strong>createSecret:</strong> generate a new credential and store
            it as a new version (labelled AWSPENDING).
          </>,
          <>
            <strong>setSecret:</strong> apply it in the database — for
            alternating users, create or update the <em>second</em> user.
          </>,
          <>
            <strong>testSecret:</strong> actually authenticate with the new
            credential and run a read query.
          </>,
          <>
            <strong>finishSecret:</strong> move the AWSCURRENT label to the new
            version and retire the previous user after a grace window.
          </>,
        ]}
      />
      <P>
        Because the application always reads the{" "}
        <Code>AWSCURRENT</Code> version and one working user always exists,
        rotation never breaks a live connection pool. The single-user strategy
        exists but changes the master password in place — applications must
        tolerate a brief invalid window, which is why the exam’s “zero
        downtime” wording points to alternating users.
      </P>

      <H2>Scheduling, scoping, and the non-RDS case</H2>
      <UL
        items={[
          <>
            Rotation schedules are cron/rate expressions on the secret
            (RotateImmediately for the first pass); you can also trigger{" "}
            <Code>RotateSecret</Code> manually at any time.
          </>,
          <>
            Managed templates cover RDS/Aurora/Redshift/DocumentDB across
            engines; every other secret (API keys, tokens) uses a{" "}
            <strong>custom Lambda</strong> you write against the same
            four-step contract.
          </>,
          <>
            Cross-Region <strong>replication</strong> keeps DR copies
            synchronized; replicas become promotable standalones during
            failover.
          </>,
          <>
            Applications should fetch the secret at initialization and cache
            it, refreshing on authentication failures or on schedule — API
            calls cost money and add latency.
          </>,
        ]}
      />
      <Callout type="exam">
        <strong>“Rotate automatically, zero downtime”</strong> → Secrets
        Manager alternating users. <strong>“The third-party key cannot be
        rotated by AWS”</strong> → still Secrets Manager if you write the
        rotation, or Parameter Store SecureString if you accept no rotation —
        the exam usually rewards Secrets Manager only when rotation is
        actually possible.
      </Callout>
    </>
  );
}

export function Lesson1214() {
  return (
    <>
      <Lead>
        Nitro Enclaves create a vault inside your own EC2 instance: an isolated
        virtual machine with no storage, no interactive access, and no network
        — where sensitive processing runs and even the instance’s own
        administrators cannot look.
      </Lead>

      <Diagram title="Enclave isolation with KMS attestation" caption="KMS keys decrypt only for enclaves whose image hash matches the key policy.">
        <NitroEnclaveDiagram />
      </Diagram>

      <H2>Why the KMS attestation is the clever part</H2>
      <P>
        The enclave’s bootstrap produces an{" "}
        <strong>attestation document</strong> — a signed description including
        the enclave image hash and public key. Your KMS key policy adds a{" "}
        <Code>kms:Recipient</Code> condition on that attestation, so{" "}
        <Code>Decrypt</Code> succeeds <em>only</em> for code running inside
        that exact enclave image. Even someone with full KMS and EC2 admin
        permissions cannot decrypt the data outside the enclave — the policy
        and the hardware proof refuse.
      </P>

      <H2>The shape of an enclave application</H2>
      <UL
        items={[
          <>
            Parent instance runs the untrusted parts: request handling, storage,
            orchestration.
          </>,
          <>
            The enclave image (built from signed measurements) contains the
            sensitive logic — tokenization, credential handling, document
            signing.
          </>,
          <>
            Communication is a narrow local channel (vsock) — the parent passes
            requests in, the enclave passes processed results out; no direct
            network, no disk, no console.
          </>,
          <>
            Secrets the enclave needs are fetched via KMS with the attestation
            condition, never handed to the parent.
          </>,
        ]}
      />
      <Callout type="exam">
        Trigger phrasing: <strong>“process cardholder data where even
        administrators/operators of the instance cannot view it”, “isolated
        compute for cryptographic operations”, “attestation-based KMS
        access”</strong> → Nitro Enclaves. Do not confuse with Fargate/Lambda
        isolation (different trust model, admin-visible) or CloudHSM (key
        custody, not compute).
      </Callout>
    </>
  );
}

export function Lesson1215() {
  return (
    <>
      <Lead>
        Authentication can live in three places: the load balancer, the API
        gateway, or your application. Offloading it to the edge is the modern
        pattern — ALB authentication actions and API Gateway authorizers mean
        unauthenticated traffic never reaches code you pay for.
      </Lead>

      <Diagram title="ALB authentication action flow" caption="The ALB runs the login dance; your targets receive verified identity headers.">
        <AlbAuthDiagram />
      </Diagram>

      <H2>ALB authentication actions</H2>
      <P>
        A listener rule can carry an{" "}
        <strong>authenticate-cognito</strong> or{" "}
        <strong>authenticate-oidc</strong> action before forwarding. Users
        without a valid session are redirected to Cognito’s hosted UI or any
        OIDC provider; after login, the ALB validates the response, mints a
        session cookie, and forwards requests to targets with identity headers
        (<Code>x-amzn-oidc-identity</Code>,{" "}
        <Code>x-amzn-oidc-data</Code>,{" "}
        <Code>x-amzn-oidc-accesstoken</Code>). Applications read identity from
        headers and write zero authentication code.
      </P>

      <H2>API Gateway authorizers</H2>
      <KeyTable
        head={["Authorizer", "Validates", "Choose when"]}
        rows={[
          ["Cognito user pool authorizer", "JWTs from your user pool, against required scopes", "The app already uses Cognito for sign-in"],
          ["Lambda authorizer (TOKEN / REQUEST)", "Anything custom — opaque tokens, headers, query params", "Third-party tokens, bespoke schemes; cache results with a TTL"],
          ["IAM / SigV4", "AWS signatures from IAM principals", "Machine-to-machine calls within AWS"],
          ["Mutual TLS", "Client certificates at the custom domain", "High-assurance partner/API traffic"],
        ]}
      />
      <Callout type="exam">
        Scenario shortcuts: <strong>“offload login to the edge so unauthenticated
        users never hit the app”</strong> → ALB authentication action.{" "}
        <strong>“validate JWTs from the user pool before the Lambda runs”</strong>{" "}
        → Cognito authorizer on the API. <strong>“custom token logic with
        cached results”</strong> → Lambda authorizer. Remember the authorizer{" "}
        <strong>cache TTL</strong> determines how fast revocations take effect.
      </Callout>

      <H2>Depth details that separate answers</H2>
      <UL
        items={[
          <>
            ALB session cookies have a configurable expiry; the authentication
            session and the application session are decoupled.
          </>,
          <>
            API Gateway request validation can reject malformed bodies{" "}
            <em>before</em> the authorizer even matters — pair validation with
            authorization for defense in depth.
          </>,
          <>
            Mutual TLS (custom domain truststore) authenticates the{" "}
            <em>client program</em>, not the human — it layers with, not
            replaces, token authorizers.
          </>,
        ]}
      />
    </>
  );
}
