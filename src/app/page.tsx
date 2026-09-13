import Link from "next/link";
import { totalQuestionCount } from "@/data/sets";

const saaC03Domains = [
  "Design Secure Architectures",
  "Design Resilient Architectures",
  "Design High-Performing Architectures",
  "Design Cost-Optimized Architectures",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M17.5 19H7a5 5 0 0 1-.95-9.91 6.5 6.5 0 0 1 12.65 1.55A4.25 4.25 0 0 1 17.5 19Z" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">CloudPrep</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/study"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Study Guide
            </Link>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
              AWS SAA-C03
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {totalQuestionCount} practice questions available
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1]">
            Ace the AWS Solutions Architect{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Associate exam
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Sharpen your skills with realistic SAA-C03 questions. Learn with instant
            feedback in Practice Mode, or simulate real test conditions in Exam Mode.
          </p>
          <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
            {[
              [`${totalQuestionCount}`, "Practice Questions"],
              [`${saaC03Domains.length}`, "Exam Domains"],
              ["2", "Study Modes"],
              ["100%", "Detailed Explanations"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-bold text-white">{value}</dd>
                <dd className="mt-0.5 text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mode cards */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Practice mode */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12 6.5C10.4 4.9 8 4.4 5 4.4v13.2c3 0 5.4.5 7 2.1 1.6-1.6 4-2.1 7-2.1V4.4c-3 0-5.4.5-7 2.1Z" />
                <path d="M12 6.5v13.2" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold">Practice Mode</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Learn at your own pace with instant feedback after every question — just
              like Udemy practice tests.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "No time limit — take as long as you need",
                "See the correct answer right after you submit",
                "Detailed explanation under every question",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/practice"
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:brightness-110"
            >
              Start Practice Mode
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* Exam mode */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/40 hover:shadow-2xl hover:shadow-rose-500/10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-400/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9.5V13l2.5 1.5M9.5 2.5h5" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold">Exam Mode</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Simulate the real testing environment with a countdown timer and a full
              score review at the end.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "Countdown timer — just like test day",
                "Answers stay hidden until you finish",
                "End the test when ready and review everything",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/exam"
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3.5 font-semibold text-white transition hover:brightness-110"
            >
              Start Exam Mode
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Covers all {saaC03Domains.length} SAA-C03 domains:{" "}
          {saaC03Domains.join(" · ")}
        </p>
      </section>

      {/* Study guide */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <Link
          href="/study"
          className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-500/10 sm:p-10"
        >
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14Z" />
                <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Study Guide</h2>
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
                  4 domains · every topic
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                The complete SAA-C03 topic map in exam order — every domain,
                objective, and service you need, structured as your study
                checklist. Lesson content is on the way.
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3.5 font-semibold text-slate-950 transition group-hover:brightness-110">
              Open Study Guide
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-sm text-slate-500">
          CloudPrep — built for AWS certification candidates · Not affiliated with
          Amazon Web Services
        </p>
      </footer>
    </div>
  );
}
