import { Callout, H2, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";

/** Section 4.4 lessons — network cost optimization (expanded). Original content. */

export function Lesson441() {
  return (
    <>
      <Lead>
        NAT gateways bill an hourly charge plus a per-GB data processing fee —
        and busy private subnets push thousands of dollars a month through
        them. The free alternatives for the two heaviest destinations are the
        cost answer.
      </Lead>

      <H2>The two free reroutes</H2>
      <UL
        items={[
          <>
            <strong>S3 and DynamoDB gateway endpoints</strong> carry that
            traffic with <strong>no charge at all</strong> — route tables
            point the prefixes at the endpoint instead of the NAT gateway.
          </>,
          <>
            Every GB that stops transiting the NAT gateway stops paying the{" "}
            <strong>per-GB data processing fee</strong> — on data-heavy
            workloads this dwarfs the endpoint’s zero cost.
          </>,
        ]}
      />

      <H2>The math and the pattern</H2>
      <P>
        A NAT gateway bills roughly $0.045 per GB processed on top of the
        hourly fee. A data pipeline pushing 10 TB/month through NAT pays
        ~$450 in processing alone — while the same traffic via a gateway
        endpoint costs nothing extra. The pattern:{" "}
        <strong>route AWS service traffic through endpoints, keep NAT only
        for genuine internet destinations</strong>.
      </P>
      <UL
        items={[
          <>
            <strong>Interface endpoints</strong> (hourly + per GB) suit
            other AWS services — SNS/SQS/STS/KMS — when private access
            matters more than the fee.
          </>,
          <>
            <strong>Endpoint policies</strong> scope each endpoint to
            intended resources — free security with the same change.
          </>,
        ]}
      />
      <Callout type="exam">
        “Private subnets upload large volumes to S3 and NAT processing fees
        are high” → <strong>S3 gateway endpoint</strong>. Any option
        proposing “move instances to public subnets” fails the security
        requirement; interface endpoints work but bill hourly + per GB.
      </Callout>
      <Callout type="tip">
        VPC Flow Logs to Athena quantify exactly how much traffic each
        destination gets — the evidence that justifies the endpoint change.
      </Callout>
    </>
  );
}

export function Lesson442() {
  return (
    <>
      <Lead>
        Data transfer is the stealth line item: it bills between AZs, between
        Regions, and out to the internet — and architecture choices move
        whole line items, not percentages.
      </Lead>

      <H2>The billing map</H2>
      <KeyTable
        head={["Path", "Billed?", "Levers"]}
        rows={[
          ["Same AZ", "No charge", "Co-locate chatty components"],
          ["Across AZs (same Region)", "Charged in both directions", "Keep latency-insensitive tiers together where possible"],
          ["Across Regions", "Charged both directions (higher)", "Only replicate what DR/residency truly needs"],
          ["Internet egress", "Charged per GB", "CloudFront (cheaper rates + caching), compression"],
          ["CloudFront → internet", "Lower per-GB edge rates, free caching after fill", "Serve downloads/streams via CDN"],
          ["S3 ↔ CloudFront", "Free origin fetches; only misses fetch", "High TTLs raise cache hit ratio"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>Inter-AZ:</strong> chatty tier-to-tier pairs (app ↔
            cache, app ↔ queue broker) cost double when split across AZs —
            placement is a cost control where the resilience trade-off
            allows.
          </>,
          <>
            <strong>Cross-Region:</strong> only replicate what DR actually
            requires; CRR of everything “just in case” is a bill with no
            requirement behind it.
          </>,
          <>
            <strong>Internet:</strong> compression cuts bytes before rates
            apply; CDN caching means origin pays once, not per user.
          </>,
        ]}
      />
      <Callout type="exam">
        “Transfer costs spiked after adding cross-AZ database reads” →
        co-locate the readers with the database AZ or accept the trade-off
        explicitly. “Serving large downloads to many users” → CloudFront —
        cached delivery is the cheaper path plus better latency.
      </Callout>
      <Callout type="tip">
        VPC Flow Logs + Athena attribute GBs to specific flows — the
        evidence step that turns a “transfer costs are high” complaint into
        a specific architectural fix.
      </Callout>
    </>
  );
}

export function Lesson443() {
  return (
    <>
      <Lead>
        Hybrid connectivity cost is a shape decision again: VPN bills hourly
        per connection plus internet transfer, Direct Connect bills a port
        plus much cheaper data transfer — the crossover is steady bandwidth.
      </Lead>

      <H2>The cost shapes</H2>
      <KeyTable
        head={["Option", "Fixed cost", "Variable cost", "Fits"]}
        rows={[
          ["Site-to-Site VPN", "Low hourly per connection", "Internet transfer (data out charges apply)", "Low/moderate steady traffic, quick setup, encryption by default"],
          ["Direct Connect", "Port hourly (by capacity) + data transfer out", "Lower per-GB than internet paths", "Steady, large, predictable transfers; consistent latency"],
          ["DX + VPN backup", "DX port + VPN hourly", "Resilience premium", "Compliance-grade hybrid with encrypted fallback"],
        ]}
      />
      <UL
        items={[
          <>
            <strong>The heuristic:</strong> the more steady the bandwidth and
            the longer the horizon, the faster DX pays back — VPN wins for
            spiky, temporary, or low-volume needs.
          </>,
          <>
            <strong>Hosted VIFs</strong> (partner-delivered DX capacity) let
            smaller estates get DX economics without ordering their own
            ports.
          </>,
        ]}
      />
      <Callout type="exam">
        “Steady 2 Gbps to on-premises, five-year horizon” →{" "}
        <strong>Direct Connect</strong> (port + lower per-GB beats VPN
        hourly + internet transfer). “Temporary migration connectivity” →
        VPN or hosted DX for the window. And remember MACsec is the
        layer-2 encryption add-on on 10/100G dedicated ports — a compliance
        option, not a cost one.
      </Callout>
      <Callout type="tip">
        Model it: at 2 Gbps sustained, internet transfer out costs more per
        month than a 1 Gbps DX port — the crossover is the exam’s real
        lesson: commitment beats metering when utilization is high and
        steady.
      </Callout>

      <H2>The crossover, worked</H2>
      <P>
        At 2 Gbps sustained, internet transfer out (~$0.09/GB) runs{" "}
        <strong>tens of thousands of dollars per month</strong>; a 1 Gbps
        Direct Connect port plus lower per-GB rates is a fraction of that.
        The crossover is typically around 1–2 Gbps sustained — below it,
        VPN; above it, DX.
      </P>
      <UL
        items={[
          <>
            <strong>Hosted VIFs</strong> (partner-delivered DX capacity)
            give smaller estates DX economics without ordering their own
            ports.
          </>,
          <>
            <strong>DX + VPN backup</strong> is the standard resilience
            pairing — the VPN rides the internet as an encrypted fallback
            path.
          </>,
          <>
            <strong>MACsec</strong> (layer-2 encryption on 10/100G dedicated
            ports) adds compliance-grade link encryption where required.
          </>,
        ]}
      />
    </>
  );
}

export function Lesson444() {
  return (
    <>
      <Lead>
        CloudFront cost has two dials — <strong>price class</strong> (where
        edge locations serve) and <strong>cache efficiency</strong> (how
        often the origin is touched). Both directly cut the delivery bill.
      </Lead>

      <H2>Price classes</H2>
      <UL
        items={[
          <>
            <strong>PriceClass_100:</strong> North America + Europe edges
            only — cheapest.
          </>,
          <>
            <strong>PriceClass_200:</strong> adds Asia, Middle East, Africa
            (most populated geographies).
          </>,
          <>
            <strong>PriceClass_All:</strong> every edge location including
            South America and Oceania — maximum coverage, highest cost.
          </>,
          <>
            Choose by where the audience actually is: serving only NA/EU on
            PriceClass_All pays for edges nobody uses.
          </>,
        ]}
      />

      <H2>Cache efficiency — the other half</H2>
      <UL
        items={[
          <>
            <strong>Higher cache hit ratio = fewer origin fetches</strong>{" "}
            (which bill data out from origin): long TTLs on versioned assets,
            minimal cache keys, Origin Shield for global audiences.
          </>,
          <>
            <strong>Compression</strong> (gzip/Brotli) cuts transfer bytes at
            no quality cost for text/assets.
          </>,
          <>
            <strong>Free tier:</strong> 1 TB egress per month free — real
            for small sites.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["NA/EU audience, cost-sensitive", "PriceClass_100"],
          ["Global audience including Asia-Pacific", "PriceClass_200 or All"],
          ["Origin overloaded by misses", "Origin Shield + longer TTLs"],
          ["Heavy text assets", "Enable compression"],
        ]}
      />
      <Callout type="exam">
        “Reduce delivery costs for a mostly-European audience” →{" "}
        <strong>PriceClass_100</strong>. And the pairing the exam likes:
        CloudFront isn’t just performance — <strong>cached delivery is the
        cheaper egress path</strong> than serving directly from S3/origin.
      </Callout>
      <Callout type="tip">
        Cost allocation tags on distributions split the bill per
        property/team, and Cost Explorer’s CloudFront views show spend by
        Region class — the visibility that justifies the price class
        choice.
      </Callout>

      <H2>The other dials</H2>
      <UL
        items={[
          <>
            <strong>Compression</strong> (gzip/Brotli) cuts transfer bytes
            for text-heavy content — no quality cost, no configuration on
            the client.
          </>,
          <>
            <strong>Origin choice:</strong> S3 origins bill no data transfer
            into CloudFront; on-premises origins route through DX or VPN.
          </>,
          <>
            <strong>Cost allocation tags</strong> on distributions split the
            bill per property/team for monthly reviews.
          </>,
        ]}
      />
      <Callout type="tip">
        The cost-performance pairing: <strong>price class cuts where edges
        serve; cache efficiency cuts how often the origin is
        touched</strong> — both levers reduce the same bill from different
        angles.
      </Callout>
    </>
  );
}
