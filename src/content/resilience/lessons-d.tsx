import { Callout, Code, Diagram, H2, H3, KeyTable, Lead, P, UL } from "@/components/lesson/blocks";
import { BackupPipelineDiagram, ResilienceTestingDiagram, SpofAuditDiagram } from "@/components/lesson/diagrams-2-2";

/** Section 2.2 lessons — part D (2.2.7–2.2.12). Original content. */

export function Lesson227() {
  return (
    <>
      <Lead>
        Global Accelerator moves traffic at the network layer: two static
        anycast IPs front Regional endpoints, health checks steer flows, and
        Regional failover completes in seconds — no DNS propagation, no client
        changes.
      </Lead>

      <H2>Why it beats DNS failover for speed</H2>
      <UL
        items={[
          <>
            Clients connect to <strong>two static anycast IPs</strong> that
            advertise from AWS edge locations — the addresses never change,
            even as endpoints behind them change.
          </>,
          <>
            Traffic enters the <strong>closest edge location</strong> and
            rides the AWS backbone to the chosen Regional endpoint — better
            throughput and latency than the public internet for the long haul.
          </>,
          <>
            <strong>Endpoint groups per Region</strong> with traffic dials
            (0–100%) allow gradual Regional weighting and instant health-based
            failover.
          </>,
        ]}
      />

      <H2>What it carries and protects</H2>
      <UL
        items={[
          <>
            <strong>TCP and UDP</strong> — including WebSockets, QUIC, gaming,
            and voice protocols that a CDN can’t proxy.
          </>,
          <>
            Origins: NLBs, ALBs, EC2 instances, and Elastic IPs —
            application-layer features like caching stay with CloudFront.
          </>,
          <>
            <strong>Health checks</strong> per endpoint group with override
            settings; unhealthy Regional endpoints drop out automatically.
          </>,
          <>
            <strong>BYOIP</strong> addresses can front the accelerator when
            partners allowlist your ranges.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Cacheable HTTP content globally", "CloudFront"],
          ["TCP/UDP with static IPs and fast Regional failover", "Global Accelerator"],
          ["Both on one hostname", "CloudFront for content + GA for API/game endpoints behind separate hostnames"],
          ["Failover measured in seconds, not DNS minutes", "Global Accelerator (anycast, no DNS wait)"],
        ]}
      />
      <Callout type="exam">
        The pairing trap: CloudFront <strong>caches HTTP</strong> and
        terminates TLS at the edge; Global Accelerator{" "}
        <strong>forwards TCP/UDP</strong> without caching. “Global low latency
        for a video website” → CloudFront; “real-time game server traffic” →
        GA.
      </Callout>
      <Callout type="tip">
        Traffic dials double as disaster controls: dial a Region to 0% during
        an incident (manual or via ARC), then back up — traffic shifts at the
        edge in seconds.
      </Callout>
    </>
  );
}

export function Lesson228() {
  return (
    <>
      <Lead>
        AWS Backup centralizes data protection into policy: define a plan
        once — schedule, retention, cross-Region and cross-account copies —
        and every assigned resource in every account complies, with Vault Lock
        making the copies ransomware-proof.
      </Lead>

      <Diagram title="The backup governance pipeline" caption="Plans create; vaults hold; the security account controls deletes and restores.">
        <BackupPipelineDiagram />
      </Diagram>

      <H2>Plans, rules, and vaults</H2>
      <UL
        items={[
          <>
            A <strong>backup plan</strong> contains rules: resource selection
            by tags, cron schedule, lifecycle (warm → cold storage),
            retention window.
          </>,
          <>
            <strong>Copy actions</strong> replicate every backup to other
            Regions and other accounts automatically — the DR and isolation
            requirements in one rule.
          </>,
          <>
            <strong>Vaults</strong> hold the backups; Vault{" "}
            <strong>Lock</strong> (governance or compliance mode) makes them
            undeletable for the retention period.
          </>,
          <>
            <strong>Restore testing</strong> runs scheduled, automatic restore
            validations and reports the results — backups that were never
            restored are backups you can’t trust.
          </>,
        ]}
      />

      <H2>Organization-wide governance</H2>
      <UL
        items={[
          <>
            <strong>Backup policies</strong> in Organizations define plans at
            the OU level; member accounts inherit them automatically — new
            accounts are covered at birth.
          </>,
          <>
            <strong>Delegated administration</strong> lets a security account
            manage plans org-wide; <strong>Audit Manager</strong> reports
            prove coverage and success rates to auditors.
          </>,
          <>
            <strong>Cross-account custody</strong> is the ransomware answer:
            copies live in a vault the workload account cannot delete from.
          </>,
        ]}
      />
      <KeyTable
        head={["Question shape", "Answer"]}
        rows={[
          ["“central backup policy across 40 accounts, cross-Region copies”", "AWS Backup plans (organization)"],
          ["“backups undeletable for 7 years, even by admins”", "Vault Lock in compliance mode"],
          ["“prove restores actually work, automatically”", "Restore testing plans"],
          ["“compliance reports on backup coverage”", "AWS Backup Audit Manager"],
        ]}
      />
      <Callout type="tip">
        AWS Backup covers EBS, EC2 AMIs, RDS/Aurora, S3 (including continuous
        PITR), DynamoDB (backups + PITR), EFS, FSx, Aurora, Storage Gateway,
        and VMware/Cloud workloads — one plan, many services. The exam loves
        the breadth claim.
      </Callout>
    </>
  );
}

export function Lesson229() {
  return (
    <>
      <Lead>
        Elastic Disaster Recovery (DRS) protects <em>servers</em> — physical
        machines, VMs, and cloud instances — by replicating their disks
        continuously to a staging area in your account, then launching
        recovered copies on AWS within minutes of a disaster.
      </Lead>

      <H2>How the machine works</H2>
      <UL
        items={[
          <>
            An agent on each source server streams{" "}
            <strong>block-level changes</strong> to lightweight replication
            servers in a staging area subnet — data lands in EBS volumes,
            continuously synchronized.
          </>,
          <>
            Source servers keep running; the staging area is small and
            auto-scaled; <strong>non-disruptive test launches</strong> boot
            recovered instances from the replicated data in an isolated
            network for drill validation.
          </>,
          <>
            At disaster time, <strong>recovery instances</strong> launch from
            the replicated volumes into your VPC within minutes — RPO of
            seconds, RTO of minutes.
          </>,
          <>
            The same engine under <strong>AWS Application Migration Service
            (MGN)</strong> performs one-time rehost migrations — same
            replication mechanics, different lifecycle (migrate vs. stand
            ready).
          </>,
        ]}
      />

      <H2>DRS vs the alternatives</H2>
      <KeyTable
        head={["Requirement", "Answer", "Why not the neighbor"]}
        rows={[
          ["Servers standing by for disaster, RPO seconds, RTO minutes", "DRS", "Backup restores hours-old data and takes longer to boot everything"],
          ["One-time migration of servers to AWS", "MGN (Application Migration Service)", "DRS stands ready forever; MGN completes and retires"],
          ["Database-specific replication", "DMS / engine-native replication", "DRS replicates whole machines, not database transactions"],
          ["File server content sync", "DataSync", "DRS replicates disks, not file shares"],
        ]}
      />
      <Callout type="exam">
        The phrase <strong>“continuous replication of on-premises servers”</strong>{" "}
        with <strong>“recover in minutes on AWS”</strong> is DRS. When the
        story is a one-way move (“we’re migrating off this data center”), the
        answer shifts to MGN — same engine, migration purpose.
      </Callout>
      <Callout type="tip">
        DRS sizing detail worth knowing: the staging area scales
        automatically with the replication stream, and instances launch with{" "}
        <strong>right-sized instances</strong> recommendations — both details
        appear in answer options.
      </Callout>
    </>
  );
}

export function Lesson2210() {
  return (
    <>
      <Lead>
        Resilience must be measured and tested, not asserted. Two services
        close the loop: <strong>Resilience Hub</strong> scores your
        architectures against stated RTO/RPO policies, and{" "}
        <strong>Fault Injection Service</strong> breaks things on purpose to
        prove the recovery works.
      </Lead>

      <Diagram title="Assess, inject, observe, improve" caption="The resilience testing loop, tooling end to end.">
        <ResilienceTestingDiagram />
      </Diagram>

      <H2>Resilience Hub — scoring against targets</H2>
      <UL
        items={[
          <>
            Define <strong>resilience policies</strong> with RTO/RPO per
            application tier; Hub assesses the app’s AWS configuration
            against them.
          </>,
          <>
            Produces a <strong>resilience score</strong>, lists gaps (missing
            multi-AZ, no backups, single points), and recommends specific
            changes.
          </>,
          <>
            Can generate recommended CloudFormation/Terraform templates for
            the fixes — assessment leads directly to remediation.
          </>,
        ]}
      />

      <H2>Fault Injection Service — proving recovery</H2>
      <UL
        items={[
          <>
            Injects controlled failures:{" "}
            <strong>Availability Zone power interruption</strong>, Spot
            interruptions, API throttling, network blackholes, disk
            exhaustion.
          </>,
          <>
            <strong>Stop conditions</strong> (CloudWatch alarms) bound the
            blast radius — the experiment halts if real users are impacted.
          </>,
          <>
            Run in staging first, then production during low-traffic windows;
            observe with CloudWatch dashboards and alarms.
          </>,
        ]}
      />
      <KeyTable
        head={["Question shape", "Answer"]}
        rows={[
          ["“score our architecture against RTO/RPO targets”", "Resilience Hub"],
          ["“verify AZ failover works by simulating an AZ loss”", "Fault Injection Service experiment"],
          ["“continuously validate backup restores”", "AWS Backup restore testing"],
          ["“chaos-engineering-style game days on AWS”", "FIS experiment templates"],
        ]}
      />
      <Callout type="tip">
        The under-taught principle the exam encodes:{" "}
        <strong>untested DR is not DR.</strong> Resilience Hub tells you what
        should happen; FIS proves what actually happens. Audit answers that
        rely on “we have a runbook” score poorly.
      </Callout>
    </>
  );
}

export function Lesson2211() {
  return (
    <>
      <Lead>
        Database high availability has three distinct tools that solve three
        different problems: Multi-AZ for <strong>availability</strong>, read
        replicas for <strong>read scaling</strong>, and cross-Region
        replication for <strong>disaster recovery</strong>. Confusing them is
        the single most-tested database mistake.
      </Lead>

      <H2>RDS Multi-AZ: instance vs cluster</H2>
      <UL
        items={[
          <>
            <strong>Multi-AZ DB instance:</strong> a synchronous standby in a
            second AZ; failover in ~60–120 seconds automatically; the
            endpoint DNS re-points. The standby is not readable.
          </>,
          <>
            <strong>Multi-AZ DB cluster:</strong> writer +{" "}
            <strong>two readable standbys</strong> with semi-synchronous
            replication — faster failover plus offloaded reads.
          </>,
          <>
            Failover is automatic on storage failure, AZ failure, patching,
            or instance loss — <strong>no connection-string change</strong>;
            applications reconnect to the same endpoint.
          </>,
        ]}
      />

      <H2>Aurora — the HA upgrades</H2>
      <UL
        items={[
          <>
            Storage is shared across 6 copies in 3 AZs — adding replicas adds
            no storage cost, and failover to a replica is{" "}
            <strong>faster than RDS Multi-AZ</strong> (typically under 35
            seconds when a replica exists).
          </>,
          <>
            <strong>Replica promotion tiers</strong> control which replica
            becomes the new writer first.
          </>,
          <>
            <strong>Global Database</strong> extends to cross-Region DR with
            managed switchover and promotion (see the multi-Region lesson).
          </>,
        ]}
      />

      <H2>Read replicas — scaling, not (primary) HA</H2>
      <UL
        items={[
          <>
            Replicas serve reads with <strong>asynchronous</strong>{" "}
            replication — slight lag, so they can serve stale data.
          </>,
          <>
            Promotion converts a replica to a standalone writer — a manual DR
            action with RPO equal to the replication lag.
          </>,
          <>
            RDS Proxy keeps application connection storms from amplifying
            failover pain — clients reconnect to the proxy, not the instance.
          </>,
        ]}
      />
      <KeyTable
        head={["Requirement", "Answer"]}
        rows={[
          ["Survive AZ failure automatically, no data loss", "Multi-AZ (instance or cluster)"],
          ["Offload reporting reads", "Read replicas (Aurora replicas on Aurora)"],
          ["Readable standby + fast failover", "Multi-AZ DB cluster"],
          ["Absorb 5,000 short-lived connections during bursts", "RDS Proxy in front"],
          ["Slow queries hurting the primary", "Read replicas or Aurora parallel query — not Multi-AZ"],
        ]}
      />
      <Callout type="exam">
        The recurring trap: <strong>“the manager wants a readable standby for
        reporting.”</strong> RDS Multi-AZ instance standbys are{" "}
        <em>not</em> readable — the answer is read replicas (scaling) or a
        Multi-AZ <em>cluster</em> (readable standbys). Multi-AZ answers “will
        it survive,” never “can I read from it.”
      </Callout>
    </>
  );
}

export function Lesson2212() {
  return (
    <>
      <Lead>
        Every resilient design passes the same final test: walk the system
        tier by tier and ask “what happens if this dies?” Anywhere the answer
        involves a human scrambling, you’ve found a single point of failure.
      </Lead>

      <Diagram title="SPOFs and their fixes" caption="Six designs that fail, and the pattern that saves each.">
        <SpofAuditDiagram />
      </Diagram>

      <H2>The audit checklist, tier by tier</H2>
      <UL
        items={[
          <>
            <strong>Edge:</strong> one Route 53 record without health checks;
            a single distribution; DNS with long TTLs before a planned
            cutover.
          </>,
          <>
            <strong>Network:</strong> one NAT gateway shared across AZs; a
            VPC whose private subnets all route through it; one interface
            endpoint AZ serving everyone.
          </>,
          <>
            <strong>Compute:</strong> a standalone instance (even with
            CloudWatch alarms — someone must act); an ASG in one subnet; a
            scheduled task on one box.
          </>,
          <>
            <strong>Data:</strong> single-AZ RDS; EFS One Zone for critical
            data; S3 One Zone-IA for irreplaceable objects; a cache treated
            as the system of record.
          </>,
          <>
            <strong>Operational:</strong> CI/CD that can only deploy from one
            person’s laptop; backups stored in the same account as the
            workloads they protect.
          </>,
        ]}
      />

      <H2>The fix pattern</H2>
      <P>
        Every fix above follows the same three moves:{" "}
        <strong>replicate across boundaries</strong> (AZ at minimum, Region
        for the stated RTO), <strong>automate the reaction</strong> (health
        checks, scaling, failover policies — no human in the loop), and{" "}
        <strong>remove the standing privileges</strong> that let one failure
        cascade. If a proposed fix adds a component without removing the
        dependency on it, it isn’t a fix.
      </P>
      <Callout type="exam">
        The scenario gives you a described architecture and asks “which
        additional component makes it most resilient?” — answer by{" "}
        <strong>finding the first tier with no redundancy</strong>, not by
        adding the fanciest service. The most-resilient-sounding option
        (multi-Region!) is often wrong when the actual gap is a missing
        standby in the database tier.
      </Callout>
      <Callout type="tip">
        Then verify empirically: Fault Injection experiments that remove each
        component are the proof the SPOF is really gone — a design document
        claiming resilience is where the audit starts, not where it ends.
      </Callout>
    </>
  );
}
