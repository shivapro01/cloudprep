import Link from "next/link";
import { availableTopicIds, lessonsForSection } from "@/content/registry";
import { studyDomains, studyTopicCount } from "@/data/study-guide";

export const metadata = {
  title: "Study Guide — AWS SAA-C03 | CloudPrep",
  description:
    "Every SAA-C03 exam topic, ordered by domain and objective — the full study map for the AWS Solutions Architect Associate exam.",
};

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
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
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
              Study Guide
            </span>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">
            {studyTopicCount} topics · 4 domains · exam order
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">SAA-C03 Study Guide</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Every topic the exam can test, ordered by domain and objective. Lesson
          content is being added topic by topic — use the outline as your study
          checklist alongside the practice sets.
        </p>

        <Link
          href="/study/cheatsheet"
          className="group mt-6 flex items-center justify-between gap-4 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.07] px-5 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-400/[0.1]"
        >
          <span>
            <span className="block font-semibold text-emerald-300">
              ⚡ One-day revision: Cheatsheet &amp; Exam Traps
            </span>
            <span className="mt-0.5 block text-sm text-slate-400">
              Every number, mapping, and gotcha compressed into one cram page.
            </span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-emerald-300 transition group-hover:translate-x-1" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        {studyDomains.map((domain) => (
          <section key={domain.number} id={`domain-${domain.number}`} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/10 pb-3">
              <span className="text-sm font-medium text-slate-500">Domain {domain.number}</span>
              <h2 className="text-xl font-bold tracking-tight">{domain.title}</h2>
              <span className="ml-auto rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs font-semibold text-sky-300">
                {domain.weight}% of exam
              </span>
            </div>

            {domain.sections.map((section) => {
              const sectionLessonCount = lessonsForSection(section.number).length;
              return (
                <div key={section.number} className="mt-8">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    <span className="font-mono text-sm font-semibold text-amber-300">
                      {section.number}
                    </span>
                    <h3 className="font-semibold text-white">{section.title}</h3>
                    {sectionLessonCount > 0 && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                        {sectionLessonCount} lessons
                      </span>
                    )}
                  </div>

                  <ul className="ml-3 mt-3 space-y-1 border-l border-white/10 pl-5">
                    {section.topics.map((topic) => {
                      const available = availableTopicIds.has(topic.id);
                      const row = (
                        <>
                          <span
                            className={`h-1 w-1 shrink-0 rounded-full ${
                              available ? "bg-emerald-400" : "bg-slate-600"
                            }`}
                            aria-hidden="true"
                          />
                          <span>{topic.title}</span>
                          {available && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-3.5 w-3.5 shrink-0 self-center text-emerald-400/70 transition group-hover:translate-x-0.5" aria-hidden="true">
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          )}
                        </>
                      );
                      return (
                        <li key={topic.id}>
                          {available ? (
                            <Link
                              href={`/study/${section.number}/${topic.id}`}
                              className="group flex items-center gap-3 rounded-md py-1 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                            >
                              {row}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 py-1 text-sm text-slate-500">
                              {row}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </section>
        ))}

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <h2 className="text-lg font-bold">Ready to test what you know?</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
            <Link href="/practice" className="text-amber-300 transition hover:brightness-110">
              Practice Sets →
            </Link>
            <Link href="/exam" className="text-rose-300 transition hover:brightness-110">
              Exam Simulation →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
