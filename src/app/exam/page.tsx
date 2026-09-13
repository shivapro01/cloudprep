import Link from "next/link";
import { practiceSets } from "@/data/sets";

export default function ExamSetsPage() {
  const lockedCount = Math.min(2, Math.max(0, 3 - practiceSets.length));
  const locked = Array.from(
    { length: lockedCount },
    (_, i) => practiceSets.length + 1 + i,
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
              aria-label="Back to home"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </Link>
            <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300">
              Exam Mode
            </span>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">
            Timed simulation · results at the end
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Exam Sets</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Simulate real test conditions: a countdown timer, no feedback while you
          work, and a full score review with explanations once you end the test.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceSets.map((set) => (
            <Link
              key={set.id}
              href={`/exam/set/${set.id}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/40 hover:shadow-2xl hover:shadow-rose-500/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-300">
                  Set {set.id}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                  {set.questions.length} questions
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{set.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {set.description}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
                {[
                  `${set.durationMinutes} minute countdown timer`,
                  "Answers stay hidden until you finish",
                  "Score, pass/fail, and full review at the end",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-rose-300">
                Start Exam
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}

          {locked.map((n) => (
            <div
              key={n}
              className="rounded-3xl border border-dashed border-white/10 bg-transparent p-6 opacity-60"
              aria-disabled="true"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Set {n}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-500">
                  65 questions
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-400">
                Exam Set {n}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                A new timed simulation is on the way.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
                  <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                </svg>
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
