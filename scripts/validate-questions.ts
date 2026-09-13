/**
 * Validates the full question bank: structural integrity, uniqueness across all
 * 15 sets, and quality floors. Run with: node scripts/validate-questions.ts
 */
import { practiceSets } from "../src/data/sets/index.ts";

interface Issue {
  set?: number;
  id?: number;
  problem: string;
}

const issues: Issue[] = [];
const seenIds = new Map<number, string>();
const seenQuestions = new Map<string, { set: number; id: number }>();
const seenStems = new Map<string, { set: number; id: number }>();

let total = 0;
let multiTotal = 0;

console.log(`Sets: ${practiceSets.length}\n`);

for (const set of practiceSets) {
  const counts = new Map<string, number>();
  let multi = 0;

  if (set.questions.length !== 65) {
    issues.push({ set: set.id, problem: `has ${set.questions.length} questions, expected 65` });
  }
  if (set.durationMinutes !== 130) {
    issues.push({ set: set.id, problem: `duration is ${set.durationMinutes}, expected 140` });
  }

  set.questions.forEach((q, index) => {
    total += 1;

    // ID uniqueness (bank-wide).
    if (seenIds.has(q.id)) {
      issues.push({
        set: set.id,
        id: q.id,
        problem: `duplicate id with set ${seenIds.get(q.id)}`,
      });
    }
    seenIds.set(q.id, String(set.id));

    // Expected id range per set.
    const expectedId = (set.id - 1) * 65 + index + 1;
    if (q.id !== expectedId) {
      issues.push({
        set: set.id,
        id: q.id,
        problem: `expected id ${expectedId} at index ${index}`,
      });
    }

    // Exact question text uniqueness.
    const normalized = q.question.replace(/\s+/g, " ").trim().toLowerCase();
    if (seenQuestions.has(normalized)) {
      const other = seenQuestions.get(normalized)!;
      issues.push({
        set: set.id,
        id: q.id,
        problem: `duplicate question text of set ${other.set} q${other.id}`,
      });
    }
    seenQuestions.set(normalized, { set: set.id, id: q.id });

    // Near-duplicate stems (first 90 chars) to catch reworded repeats.
    const stem = normalized.slice(0, 90);
    if (seenStems.has(stem)) {
      const other = seenStems.get(stem)!;
      issues.push({
        set: set.id,
        id: q.id,
        problem: `question stem matches set ${other.set} q${other.id} (first 90 chars)`,
      });
    }
    seenStems.set(stem, { set: set.id, id: q.id });

    // Structure and quality.
    if (!q.question || q.question.length < 30) {
      issues.push({ set: set.id, id: q.id, problem: "question text too short" });
    }
    if (q.options.length < 2 || q.options.length > 5) {
      issues.push({ set: set.id, id: q.id, problem: `${q.options.length} options` });
    }
    const dupOptions = new Set(q.options.map((o) => o.trim().toLowerCase()));
    if (dupOptions.size !== q.options.length) {
      issues.push({ set: set.id, id: q.id, problem: "duplicate options" });
    }
    if (q.correctAnswers.length === 0) {
      issues.push({ set: set.id, id: q.id, problem: "no correct answer" });
    }
    for (const a of q.correctAnswers) {
      if (a < 0 || a >= q.options.length) {
        issues.push({ set: set.id, id: q.id, problem: `correct answer ${a} out of range` });
      }
    }
    if (q.correctAnswers.length > 1) {
      multi += 1;
      multiTotal += 1;
      const text = q.question.toLowerCase();
      if (!text.includes("select two") && !text.includes("select three")) {
        issues.push({
          set: set.id,
          id: q.id,
          problem: "multi-select question missing 'Select TWO/THREE' wording",
        });
      }
    }
    if (!q.explanation || q.explanation.length < 80) {
      issues.push({ set: set.id, id: q.id, problem: "explanation too short" });
    }
    if (!q.category) {
      issues.push({ set: set.id, id: q.id, problem: "missing category" });
    }
    counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
  });

  const coverage = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `${c}:${n}`)
    .join(", ");
  console.log(`Set ${String(set.id).padStart(2)} — ${set.questions.length} questions (${multi} multi) — ${coverage}`);
}

console.log(`\nTotal questions: ${total} (multi-select: ${multiTotal})`);

if (issues.length > 0) {
  console.log(`\nISSUES (${issues.length}):`);
  for (const issue of issues) {
    console.log(`  [set ${issue.set} q${issue.id}] ${issue.problem}`);
  }
  process.exit(1);
} else {
  console.log("\nAll checks passed — no duplicates, no structural issues.");
}
