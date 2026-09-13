# CloudPrep — AWS SAA-C03 Practice Platform

A self-hosted study platform for the AWS Certified Solutions Architect –
Associate (SAA-C03) exam: **15 full-length practice sets (975 questions)**, a
**115-topic study guide** with in-depth lessons, and a **one-day cheatsheet**
— all in one Next.js app.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production:

```bash
npm run build
npm start
```

## What's inside

| Route | What it is |
|---|---|
| `/` | Homepage — entry points to practice, exam, study guide, cheatsheet |
| `/practice` | Practice set list → `/practice/set/[1-15]` (no timer, instant feedback + explanation per question) |
| `/exam` | Exam set list → `/exam/set/[1-15]` (130-min countdown, results + full answer review at the end) |
| `/study` | Study guide outline — 115 topics across the 4 exam domains and 15 objectives |
| `/study/[section]/[topic]` | Lesson pages — sidebar navigation, in-depth content, prev/next |
| `/study/cheatsheet` | One-day revision cram — numbers, service fingerprints, traps, decision shortcuts |

## Practice question bank

- **15 sets × 65 questions** (matching the real exam length), 130-minute exam
  timer per set
- Coverage across all four official domains: Secure Architectures (30%),
  Resilient Architectures (26%), High-Performing Architectures (24%),
  Cost-Optimized Architectures (20%)
- Each question has 3–5 options, a correct-answer set (including
  multi-select), and a full explanation of why each option is right or wrong
- Questions are **original content** written in exam style — not dumped from
  any source. Edit them freely in `src/data/sets/`

### Question bank structure

```
src/data/
├── sets/
│   ├── index.ts        # set definitions: id, title, duration, question list
│   ├── set1-part1.ts   # questions 1–22
│   ├── set1-part2.ts   # questions 23–44
│   ├── set1-part3.ts   # questions 45–65
│   ├── set2-part1.ts   # questions 66–130 … and so on to set15
│   └── …
```

Adding a new set: create the part files, add one entry to
`src/data/sets/index.ts`, and both modes pick it up automatically.

## Study guide

`src/data/study-guide.ts` defines the 115-topic outline across 15 objective
sections (1.1–4.4). Lesson content lives in `src/content/` per section:

```
src/content/
├── registry.ts              # maps section numbers → lesson components
├── secure-access/           # 1.1 — 12 lessons
├── secure-workloads/        # 1.2 — 18 lessons
├── data-security/           # 1.3 — 8 lessons
├── resilience/              # 2.1–2.3 — 28 lessons
├── performance/             # 3.1–3.5 — 30 lessons
└── cost/                    # 4.1–4.4 — 19 lessons
```

Lessons use shared building blocks in `src/components/lesson/blocks.tsx`
(`P`, `H2`, `KeyTable`, `Callout`, `UL`) so new sections follow the same
format automatically.

## Cheatsheet & exam traps

`/study/cheatsheet` is a one-day revision cram: numbers to memorize,
service-fingerprint mappings (requirement phrase → answer), Route 53 routing
picker, the DR strategy ladder, classic confusion pairs, a gotcha list, and
requirement→answer decision shortcuts.

## Validation

```bash
node scripts/validate-questions.ts
```

Checks the full bank: per-set question counts, globally unique IDs, no
duplicate question stems, correct-answer index bounds, multi-select wording,
and explanation length. Exit code 0 means the bank is clean.

## Tech stack

- **Next.js 16** (App Router, Turbopack, static generation for all content pages)
- **TypeScript** strict mode
- **Tailwind CSS 4** — dark theme, fully responsive (desktop sidebar / mobile pill navigation on lesson pages)
- No backend, no database — all content is typed data files, so the whole platform deploys anywhere Next.js runs

## Notes

- Questions are original content written in SAA-C03 exam style for study
  purposes — not sourced from exam dumps. This platform is not affiliated
  with Amazon Web Services.
- The exam duration is set to 130 minutes per set (matching the official
  SAA-C03 timing) in each set's `durationMinutes`.
