import { Callout, Diagram, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { AzSpreadDiagram, CloudFrontFlowDiagram, DnsHealthRoutingDiagram, HybridConnectivityDiagram, TgwRoutingDiagram } from "@/components/lesson/diagrams-3-4";

/** Section 3.4 lessons — network performance. Original content. */

export function Lesson341() {
  return (
    <>
      <Lead>
        VPC design for performance is mostly three habits: spread every tier
        across AZs, size and plan CIDRs before they box you in, and keep
        inter-AZ traffic patterns in mind when latency or throughput matters.
      </Lead>

      <H2>Subnets and AZ spread</H2>
      <UL
        items={[
          <>
            One (or more) public and private subnets{" "}
            <strong>per AZ</strong>; every resilient tier deploys into all of
            them. A tier in two AZs survives an AZ loss; three gives headroom.
          </>,
          <>
            Subnet sizing: carve /24s (or smaller) per tier per AZ — a subnet
            is AZ-bound, so capacity planning is per subnet.
          </>,
          <>
            <strong>Secondary CIDRs</strong> add IPv4 space to a VPC without
            recreation — the answer to “we ran out of IPs”.
          </>,
          <>
            <strong>IPv6</strong> removes address pressure entirely when
            dual-stack fits the workload.
          </>,
        ]}
      />

      <H2>Inter-AZ traffic realities</H2>
      <UL
        items={[
          <>
            Cross-AZ traffic is <strong>billed both directions</strong> and
            adds sub-millisecond latency — chatty tier-to-tier calls prefer
            same-AZ placement where resilience requirements allow.
          </>,
          <>
            Placement groups (cluster/spread/partition) shape hardware
            proximity for workloads that care about network performance.
          </>,
          <>
            <strong>Jumbo frames (MTU 9001)</strong> are supported inside VPC
            and peering traffic — check path MTU when throughput looks low.
          </>,
        ]}
      />

      <H2>IPAM and the planning loop</H2>
      <UL
        items={[
          <>
            <strong>IPAM</strong> allocates CIDRs across accounts and Regions
            from pools, detecting overlaps before they break future peering.
          </>,
          <>
            <strong>Plan for transitivity:</strong> TGW and peering require
            non-overlapping CIDRs everywhere — the number-one replanning
            trigger in real estates.
          </>,
          <>
            Network Access Analyzer validates that the implemented network
            matches the intended design.
          </>,
        ]}
      />
      <Callout type="exam">
        “We’re running out of private IP space across accounts” →{" "}
        <strong>IPAM</strong> for planning plus <strong>secondary
        CIDRs</strong> where needed. “Which design wastes the most address
        space?” → per-tier /16 subnets; the efficient answer carves /24s per
        tier per AZ.
      </Callout>
      <Callout type="tip">
        Performance-wise, keep latency-sensitive pairs (app ↔ cache, app ↔
        database) in the same AZ <em>when the design accepts the AZ-coupling
        trade-off</em> — and remember cross-AZ traffic is the cost lever the
        billing questions test.
      </Callout>

      <Diagram title="The AZ-spread layout" caption="Per-AZ NAT, per-AZ tiers, endpoints instead of internet — the full private-subnet pattern.">
        <AzSpreadDiagram />
      </Diagram>

      <H2>VPC limits that shape the design</H2>
      <UL
        items={[
          <>
            <strong>5 VPCs per Region</strong> by default (requestable
            increase) — multi-account strategies exist partly because one
            account’s VPC quota runs out.
          </>,
          <>
            <strong>200 subnets, ~5,000 route tables per Region</strong> —
            plan route-table sprawl before building a per-subnet topology.
          </>,
          <>
            <strong>~16,383 secondary IPs per ENI family class</strong> on
            large instances — container density on awsvpc networking rides on
            this number.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson342() {
  return (
    <>
      <Lead>
        Hybrid connectivity is a two-option decision — Direct Connect for
        dedicated private bandwidth, Site-to-Site VPN for fast encrypted
        setup — with Layer-2/3 variants that change cost and encryption.
      </Lead>

      <H2>Direct Connect family</H2>
      <UL
        items={[
          <>
            <strong>Dedicated connections:</strong> 1, 10, or 100 Gbps physical
            ports ordered from AWS — consistent latency and bandwidth.
          </>,
          <>
            <strong>Hosted connections:</strong> partner-delivered capacity
            (50 Mbps up to 10 Gbps) — the multi-tenant path into the same DX
            infrastructure.
          </>,
          <>
            <strong>LAG:</strong> bundle up to four dedicated connections into
            one logical higher-bandwidth, more resilient link.
          </>,
          <>
            <strong>MACsec:</strong> layer-2 encryption on 10/100 Gbps
            dedicated connections — the answer to “dedicated AND encrypted at
            L2”.
          </>,
          <>
            <strong>DX Gateway:</strong> associate one DX connection with VPCs
            across multiple Regions.
          </>,
        ]}
      />

      <H2>Site-to-Site VPN family</H2>
      <UL
        items={[
          <>
            <strong>Site-to-Site VPN:</strong> two IPsec tunnels per
            connection over the internet — minutes to deploy, encrypted by
            default, variable performance (~1.25 Gbps per tunnel typical).
          </>,
          <>
            <strong>DX + VPN combination:</strong> a VPN over DX as encrypted
            backup for the dedicated link — the standard resilience pattern.
          </>,
          <>
            <strong>Client VPN:</strong> individual users to AWS — not site
            connectivity.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Consistent 10 Gbps, low jitter, quick encryption optional", "Direct Connect dedicated 10 Gbps"],
          ["Layer-2 encryption mandated on the private link", "Direct Connect with MACsec"],
          ["Encrypted connectivity in days, moderate bandwidth", "Site-to-Site VPN (or DX + VPN for DX resilience)"],
          ["Fastest deployment, encryption required, low bandwidth", "VPN — hours, IPsec included"],
        ]}
      />
      <Callout type="exam">
        The performance tiebreak: DX has <strong>consistent latency and
        bandwidth</strong>; VPN rides the internet with variability. When the
        scenario says “consistent performance” or names large, predictable
        transfers — DX. When it says “quickly” or “temporarily” — VPN.
      </Callout>
      <Callout type="tip">
        Private VIFs reach VPCs (via DX Gateway cross-Region); public VIFs
        reach public AWS endpoints without the internet — knowing the VIF
        types answers several option distractors.
      </Callout>

      <Diagram title="Hybrid connectivity options" caption="VPN for speed of setup, DX for consistency, DX+VPN for resilient compliance.">
        <HybridConnectivityDiagram />
      </Diagram>

      <H2>VIF types and the DX Gateway in detail</H2>
      <UL
        items={[
          <>
            <strong>Private VIF:</strong> one VLAN to one VPC (or via DX
            Gateway, to VPCs in many Regions) — the database-replication and
            private-API path.
          </>,
          <>
            <strong>Public VIF:</strong> on-premises reaches S3, DynamoDB,
            and other public AWS endpoints over the private DX — no internet
            traversal, lower transfer pricing than VPN.
          </>,
          <>
            <strong>Transit VIF:</strong> attaches DX to a Transit Gateway
            for site-to-many-VPC routing — the hub answer for multiple
            VPCs.
          </>,
          <>
            <strong>DX Gateway:</strong> associates one DX connection with
            VPCs in multiple Regions — one port, global reach (with
            per-Region VGW/TGW attachments).
          </>,
        ]}
      />

      <H2>VPN throughput and failover mechanics</H2>
      <UL
        items={[
          <>
            Each Site-to-Site connection provisions <strong>two tunnels in
            different AZs</strong>; enable <strong>ECMP</strong> with BGP so
            both carry traffic (~2.5 Gbps aggregate) and fail over
            automatically.
          </>,
          <>
            <strong>Accelerated VPN</strong> routes tunnel traffic through
            the Global Accelerator edge — better performance over long
            distances without DX.
          </>,
          <>
            Tunnel auth: pre-shared keys or certificates; DPD detects dead
            peers and triggers failover to the surviving tunnel.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson343() {
  return (
    <>
      <Lead>
        Inter-VPC networking has three building blocks with different
        transitivity models — Transit Gateway (routed hub), peering (direct
        pairs), PrivateLink (service access without routes) — plus Cloud WAN
        for managed global networks.
      </Lead>

      <H2>The three connectivity models</H2>
      <UL
        items={[
          <>
            <strong>Transit Gateway:</strong> regional hub — attach VPCs and
            VPN/DX, route through route tables; supports{" "}
            <strong>inter-Region peering</strong> for global topologies.
          </>,
          <>
            <strong>VPC peering:</strong> direct private connection between
            two VPCs — <strong>non-transitive</strong> (A↔B, B↔C does not mean
            A↔C), no single bottleneck, best for few-to-few.
          </>,
          <>
            <strong>PrivateLink:</strong> publish/consume a{" "}
            <em>service</em> via interface endpoints — no routes at all,
            traffic one-directional to the service; the isolation answer.
          </>,
        ]}
      />

      <H2>Selection logic</H2>
      <KeyTable
        head={["Requirement", "Construct"]}
        rows={[
          ["Many VPCs, hub-and-spoke, central egress/inspection", "Transit Gateway"],
          ["Expose one app to another account/VPC privately, routes hidden", "PrivateLink (endpoint service)"],
          ["A handful of VPCs with full mutual access", "VPC peering"],
          ["Global managed WAN across Regions and offices", "Cloud WAN"],
        ]}
      />
      <Callout type="warn">
        Peering is <strong>non-transitive</strong> — a classic exam trap: “VPC
        A peered to B, B peered to C; can A reach C?” No — each pair needs
        its own connection, or use TGW. Also remember:{" "}
        <strong>overlapping CIDRs block peering</strong> entirely.
      </Callout>
      <Callout type="tip">
        Security-group referencing across a peering connection doesn’t work —
        peer-VPC rules must use CIDRs (or prefix lists), a detail that decides
        several “will this rule work?” questions.
      </Callout>

      <Diagram title="Transit Gateway route table design" caption="Isolation lives in the association + propagation choices, not a firewall.">
        <TgwRoutingDiagram />
      </Diagram>

      <H2>Transit Gateway mechanics that get tested</H2>
      <UL
        items={[
          <>
            <strong>Attachments</strong> (VPC, VPN, DX Gateway, peering,
            Connect) associate with one route table and propagate into chosen
            tables — association answers “where do my packets go,”
            propagation answers “who learns my routes.”
          </>,
          <>
            <strong>Blackhole routes</strong> drop traffic explicitly — the
            deny rule of TGW design.
          </>,
          <>
            <strong>MTU 8500</strong> across TGW (jumbo support minus
            overhead) and up to <strong>50 Gbps per AZ</strong> per
            attachment scaling with burst.
          </>,
          <>
            <strong>Inter-Region peering</strong> links TGWs with encrypted
            AWS-backbone transit — global hub-and-spoke without hairpinning.
          </>,
        ]}
      />

      <H2>Peering limits and PrivateLink depth</H2>
      <UL
        items={[
          <>
            <strong>Peering caps:</strong> 125 active peerings per VPC
            (requestable); <strong>no transitive routing</strong> —
            overlapping CIDRs block peering entirely.
          </>,
          <>
            <strong>PrivateLink detail:</strong> endpoint services front NLBs;
            consumers create interface endpoints; acceptance can require
            manual approval; cross-Region requires per-Region NLBs.
          </>,
          <>
            <strong>PrivateLink + NLB + TLS:</strong> terminate TLS at the
            consumer’s ALB or carry it end-to-end — the “private service
            with HTTPS” answer.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson344() {
  return (
    <>
      <Lead>
        CloudFront performance is cache design: what goes into the cache key,
        how long objects live, whether the origin is shielded, and what
        happens on a miss. Global Accelerator complements it for non-cacheable
        traffic.
      </Lead>

      <H2>Cache design levers</H2>
      <UL
        items={[
          <>
            <strong>Cache policies</strong> define the cache key: which
            headers, cookies, query strings differentiate cached objects —
            minimal keys raise hit ratios.
          </>,
          <>
            <strong>TTLs (min/max/default)</strong> control freshness; long
            TTLs + versioned filenames beat frequent invalidations.
          </>,
          <>
            <strong>Compression</strong> (gzip/Brotli) and{" "}
            <strong>origin request policies</strong> (forward only what the
            origin needs) round out the configuration.
          </>,
        ]}
      />

      <H2>Origin performance</H2>
      <UL
        items={[
          <>
            <strong>Origin Shield:</strong> an extra caching layer in front of
            the origin — collapses edge misses into few origin fetches,
            protecting origin capacity and cost.
          </>,
          <>
            <strong>Origin groups:</strong> primary + secondary origin with
            failover status codes — resilience for the cache misses.
          </>,
          <>
            <strong>S3 Origin Access Control:</strong> private bucket as
            origin without public access.
          </>,
        ]}
      />

      <H2>Global Accelerator in the picture</H2>
      <UL
        items={[
          <>
            For <strong>non-cacheable TCP/UDP</strong> (APIs, game servers,
            IoT): GA routes user traffic over the AWS backbone to the nearest
            healthy Regional endpoint — static anycast IPs, instant
            failover.
          </>,
          <>
            Pair them: GA accelerates the dynamic API path while CloudFront
            serves the static/cacheable path.
          </>,
        ]}
      />
      <Callout type="exam">
        Cache-hit improvement answers: <strong>“reduce origin load from
        global users”</strong> → Origin Shield.{" "}
        <strong>“identical content, different query strings creating
        duplicates”</strong> → exclude query strings from the cache key or
        use versioned filenames. <strong>“slow first-byte on cache
        misses”</strong> → Origin Shield again.
      </Callout>

      <Diagram title="CloudFront cache and edge compute flow" caption="Edge cache → Shield → origin, with edge functions on the request path and signed access at the door.">
        <CloudFrontFlowDiagram />
      </Diagram>

      <H2>Lambda@Edge vs CloudFront Functions</H2>
      <KeyTable
        head={["", "CloudFront Functions", "Lambda@Edge"]}
        rows={[
          ["Runs at", "Viewer request/response only (216 edge locations)", "Viewer + origin request/response (fewer Regions)"],
          ["Runtime/limits", "JavaScript, sub-ms, tiny packages", "Node.js/Python, up to 30s network-bound origins"],
          ["Use for", "URL rewrites, header adds, simple redirects", "Auth at edge, request signing, origin failover logic, heavy transforms"],
          ["Cost/latency", "Cheapest, fastest", "More expensive, slightly slower"],
        ]}
      />

      <H2>Origin access and authorized delivery</H2>
      <UL
        items={[
          <>
            <strong>Origin Access Control (OAC):</strong> CloudFront signs
            requests to S3 — bucket policy grants only the distribution,
            bucket stays private. (Legacy OAI is replaced by OAC.)
          </>,
          <>
            <strong>Signed URLs and signed cookies:</strong> time-boxed
            access with optional IP restrictions — per-object links vs
            whole-path cookies after login.
          </>,
          <>
            <strong>Field-level encryption:</strong> sensitive form fields
            stay encrypted at the edge until the origin decrypts with its
            private key.
          </>,
        ]}
      />

      <H2>Logging: standard vs real-time</H2>
      <UL
        items={[
          <>
            <strong>Standard logs:</strong> delivered to S3, batched and
            delayed minutes — billing/analysis use.
          </>,
          <>
            <strong>Real-time logs:</strong> stream to Kinesis within
            seconds, sampled by percentage — live debugging and alerting.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson345() {
  return (
    <>
      <Lead>
        DNS performance is routing intelligence: latency-based routing sends
        users to the fastest healthy endpoint, health checks automate the
        decisions, and low TTLs bound how long a bad answer persists.
      </Lead>

      <H2>Latency-based routing</H2>
      <UL
        items={[
          <>
            Route 53 serves the record for the{" "}
            <strong>Region with the lowest measured latency</strong> to that
            user — per resolver location, not per user guesswork.
          </>,
          <>
            Attach <strong>health checks</strong> to each record: unhealthy
            endpoints drop out automatically, traffic redistributes.
          </>,
          <>
            Pairs with multi-Region deployments (identical stacks per Region)
            as the standard active/active front door.
          </>,
        ]}
      />

      <H2>The supporting mechanics</H2>
      <UL
        items={[
          <>
            <strong>Health checks:</strong> HTTP(S)/TCP probes from global
            checkers (or VPC-internal for private endpoints); string matching
            on responses; fast/slow intervals; requesters options.
          </>,
          <>
            <strong>Low TTLs (60s)</strong> on records that can change — the
            failover speed bound.
          </>,
          <>
            <strong>Calculated health checks</strong> aggregate children
            (healthy only when all/any children healthy) for multi-component
            services.
          </>,
          <>
            <strong>Latency vs geolocation vs geoproximity:</strong> latency
            measures performance; geolocation polices location; geoproximity
            biases geography with a dial.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Routing answer"]}
        rows={[
          ["Serve from the Region with lowest observed latency", "Latency-based routing"],
          ["Route EU users to EU, US to US", "Geolocation routing"],
          ["Gradually shift traffic between Regions", "Geoproximity with bias (or weighted)"],
          ["Automatic failover to a static DR site", "Failover routing with health checks"],
        ]}
      />
      <Callout type="exam">
        The latency-routing questions pair with <strong>health checks</strong>{" "}
        — “unhealthy Region drops out automatically.” And the recurring
        distractor: geolocation ≠ latency (policy vs measurement).
      </Callout>

      <Diagram title="Latency routing with health-driven failover" caption="The resolver picks the fastest healthy record; TTLs bound the switch speed.">
        <DnsHealthRoutingDiagram />
      </Diagram>

      <H2>Resolver endpoints — hybrid DNS both directions</H2>
      <UL
        items={[
          <>
            <strong>Inbound endpoints:</strong> ENIs in the VPC that answer
            on-premises DNS queries forwarded over DX/VPN — hybrid resolvers
            point conditional forwarders at these IPs.
          </>,
          <>
            <strong>Outbound endpoints:</strong> forward VPC queries matching
            rules (e.g., corp.example.com) to on-premises resolvers — the
            reverse path.
          </>,
          <>
            <strong>Query logging</strong> to S3/CloudWatch for audit and
            threat-hunting the DNS layer.
          </>,
        ]}
      />

      <H2>Alias records and health check tuning</H2>
      <UL
        items={[
          <>
            <strong>Alias A/AAAA</strong> records map directly to AWS
            resources (ALB, CloudFront, S3 website) — no extra lookup, no
            charge, and the only way to put AWS targets at a zone apex
            (CNAMEs are illegal there).
          </>,
          <>
            <strong>Health check intervals:</strong> 30s standard, 10s fast;
            failure threshold typically 3 consecutive — tune faster for
            active/active, slower to avoid flapping.
          </>,
          <>
            <strong>String matching</strong> on HTTP bodies plus status codes
            defines “healthy” precisely; latency-based checks can route on
            measured performance.
          </>,
        ]}
      />
    </>
  );
}
