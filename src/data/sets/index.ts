import type { QuizQuestion } from "../questions";
import { set1Part1 } from "./set1-part1";
import { set1Part2 } from "./set1-part2";
import { set1Part3 } from "./set1-part3";
import { set2Part1 } from "./set2-part1";
import { set2Part2 } from "./set2-part2";
import { set2Part3 } from "./set2-part3";
import { set3Part1 } from "./set3-part1";
import { set3Part2 } from "./set3-part2";
import { set3Part3 } from "./set3-part3";
import { set4Part1 } from "./set4-part1";
import { set4Part2 } from "./set4-part2";
import { set4Part3 } from "./set4-part3";
import { set5Part1 } from "./set5-part1";
import { set5Part2 } from "./set5-part2";
import { set5Part3 } from "./set5-part3";
import { set6Part1 } from "./set6-part1";
import { set6Part2 } from "./set6-part2";
import { set6Part3 } from "./set6-part3";
import { set7Part1 } from "./set7-part1";
import { set7Part2 } from "./set7-part2";
import { set7Part3 } from "./set7-part3";
import { set8Part1 } from "./set8-part1";
import { set8Part2 } from "./set8-part2";
import { set8Part3 } from "./set8-part3";
import { set9Part1 } from "./set9-part1";
import { set9Part2 } from "./set9-part2";
import { set9Part3 } from "./set9-part3";
import { set10Part1 } from "./set10-part1";
import { set10Part2 } from "./set10-part2";
import { set10Part3 } from "./set10-part3";
import { set11Part1 } from "./set11-part1";
import { set11Part2 } from "./set11-part2";
import { set11Part3 } from "./set11-part3";
import { set12Part1 } from "./set12-part1";
import { set12Part2 } from "./set12-part2";
import { set12Part3 } from "./set12-part3";
import { set13Part1 } from "./set13-part1";
import { set13Part2 } from "./set13-part2";
import { set13Part3 } from "./set13-part3";
import { set14Part1 } from "./set14-part1";
import { set14Part2 } from "./set14-part2";
import { set14Part3 } from "./set14-part3";
import { set15Part1 } from "./set15-part1";
import { set15Part2 } from "./set15-part2";
import { set15Part3 } from "./set15-part3";

export interface PracticeSet {
  id: number;
  title: string;
  description: string;
  /** Time allowed in exam mode; practice mode has no timer. */
  durationMinutes: number;
  questions: QuizQuestion[];
}

export const practiceSets: PracticeSet[] = [
  {
    id: 1,
    title: "Practice Set 1",
    description:
      "Full-length SAA-C03 simulation covering all four exam domains — security, resilience, performance, and cost optimization.",
    durationMinutes: 130,
    questions: [...set1Part1, ...set1Part2, ...set1Part3],
  },
  {
    id: 2,
    title: "Practice Set 2",
    description:
      "Fresh full-length SAA-C03 simulation: IAM policy evaluation, VPC security controls, resilience patterns, and performance tuning.",
    durationMinutes: 130,
    questions: [...set2Part1, ...set2Part2, ...set2Part3],
  },
  {
    id: 3,
    title: "Practice Set 3",
    description:
      "Advanced security controls, DR patterns, container and serverless performance, and cost-aware design decisions.",
    durationMinutes: 130,
    questions: [...set3Part1, ...set3Part2, ...set3Part3],
  },
  {
    id: 4,
    title: "Practice Set 4",
    description:
      "Database services deep dive — RDS, Aurora, DynamoDB, purpose-built stores — plus containers, integration patterns, and compute selection.",
    durationMinutes: 130,
    questions: [...set4Part1, ...set4Part2, ...set4Part3],
  },
  {
    id: 5,
    title: "Practice Set 5",
    description:
      "Security services in depth — KMS delegation, WAF and Shield, threat detection — plus storage features and advanced networking.",
    durationMinutes: 130,
    questions: [...set5Part1, ...set5Part2, ...set5Part3],
  },
  {
    id: 6,
    title: "Practice Set 6",
    description:
      "Cost engineering, governance at scale, migration tooling, and operational excellence scenarios.",
    durationMinutes: 130,
    questions: [...set6Part1, ...set6Part2, ...set6Part3],
  },
  {
    id: 7,
    title: "Practice Set 7",
    description:
      "Disaster recovery patterns, multi-Region architectures, event-driven integration, and analytics services.",
    durationMinutes: 130,
    questions: [...set7Part1, ...set7Part2, ...set7Part3],
  },
  {
    id: 8,
    title: "Practice Set 8",
    description:
      "Advanced IAM and data protection, hybrid infrastructure and edge computing, plus DevOps and observability tooling.",
    durationMinutes: 130,
    questions: [...set8Part1, ...set8Part2, ...set8Part3],
  },
  {
    id: 9,
    title: "Practice Set 9",
    description:
      "Scenario-first questions combining security, cost, database internals, streaming, and migration judgement calls.",
    durationMinutes: 130,
    questions: [...set9Part1, ...set9Part2, ...set9Part3],
  },
  {
    id: 10,
    title: "Practice Set 10",
    description:
      "Troubleshooting and diagnosis, CI/CD pipelines, security operations, and CDN/authentication edge cases.",
    durationMinutes: 130,
    questions: [...set10Part1, ...set10Part2, ...set10Part3],
  },
  {
    id: 11,
    title: "Practice Set 11",
    description:
      "Container networking and placement, fine-grained S3 features, hybrid fleets, and observability practices.",
    durationMinutes: 130,
    questions: [...set11Part1, ...set11Part2, ...set11Part3],
  },
  {
    id: 12,
    title: "Practice Set 12",
    description:
      "Network design nuances, governance guardrails, database feature flags, and messaging throughput patterns.",
    durationMinutes: 130,
    questions: [...set12Part1, ...set12Part2, ...set12Part3],
  },
  {
    id: 13,
    title: "Practice Set 13",
    description:
      "Identity federation, data protection internals, platform services, streaming analytics, and migration operations.",
    durationMinutes: 130,
    questions: [...set13Part1, ...set13Part2, ...set13Part3],
  },
  {
    id: 14,
    title: "Practice Set 14",
    description:
      "Deep-cut features across storage, security, delivery, and multi-Region disaster recovery design.",
    durationMinutes: 130,
    questions: [...set14Part1, ...set14Part2, ...set14Part3],
  },
  {
    id: 15,
    title: "Practice Set 15",
    description:
      "Capstone simulation: multi-constraint scenarios across security, analytics, cost, and resilience.",
    durationMinutes: 130,
    questions: [...set15Part1, ...set15Part2, ...set15Part3],
  },
];

export function getSet(id: number): PracticeSet | undefined {
  return practiceSets.find((s) => s.id === id);
}

export const totalQuestionCount = practiceSets.reduce(
  (n, s) => n + s.questions.length,
  0,
);
