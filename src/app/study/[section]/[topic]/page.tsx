import type { Metadata } from "next";
import Link from "next/link";
import { lessonHref, lessonsForSection, sectionLessons } from "@/content/registry";
import { studyDomains } from "@/data/study-guide";

interface PageProps {
  params: Promise<{ section: string; topic: string }>;
}

function sectionMeta(sectionNumber: string) {
  for (const domain of studyDomains) {
    const section = domain.sections.find((s) => s.number === sectionNumber);
    if (section) return { domain, section };
  }
  return undefined;
}

export function generateStaticParams() {
  const params: { section: string; topic: string }[] = [];
  for (const [section, lessons] of Object.entries(sectionLessons)) {
    for (const lesson of lessons) {
      params.push({ section, topic: lesson.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, topic } = await params;
  const lessons = lessonsForSection(section);
  const lesson = lessons.find((l) => l.id === topic);
  return {
    title: lesson
      ? `${lesson.title} — SAA-C03 Study Guide`
      : "Lesson — SAA-C03 Study Guide",
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { section: sectionNumber, topic: topicId } = await params;
  const meta = sectionMeta(sectionNumber);
  const lessons = lessonsForSection(sectionNumber);
  const index = lessons.findIndex((l) => l.id === topicId);

  if (!meta || lessons.length === 0 || index === -1) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
        <h1 className="text-2xl font-bold">Lesson not written yet</h1>
        <p className="mt-2 max-w-md text-slate-400">
          {meta
            ? `Content for ${meta.section.number} ${meta.section.title} is on the roadmap — check back soon.`
            : "That section isn’t in the study guide."}
        </p>
        <Link
          href="/study"
          className="mt-6 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110"
        >
          Back to Study Guide
        </Link>
      </main>
    );
  }

  const lesson = lessons[index];
  const prev = index > 0 ? lessons[index - 1] : undefined;
  const next = index < lessons.length - 1 ? lessons[index + 1] : undefined;
  const Lesson = lesson.Component;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/85 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/study"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
              aria-label="Back to study guide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </Link>
            <span className="truncate text-sm text-slate-400">
              <span className="hidden sm:inline text-slate-500">Study Guide · </span>
              Domain {meta.domain.number}: {meta.domain.title}
            </span>
          </div>
          <span className="hidden whitespace-nowrap text-xs text-slate-500 sm:block">
            Topic {index + 1} of {lessons.length} · {meta.section.number} section
          </span>
        </div>
      </header>

      {/* Mobile topic pills */}
      <nav
        aria-label="Section topics"
        className="sticky top-14 z-20 border-b border-white/5 bg-slate-950/90 backdrop-blur lg:hidden"
      >
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {lessons.map((l) => (
            <Link
              key={l.id}
              href={lessonHref(sectionNumber, l.id)}
              aria-current={l.id === lesson.id ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                l.id === lesson.id
                  ? "bg-amber-400 text-slate-950"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {l.short}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl gap-10 px-4 sm:px-6 lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[70px] max-h-[calc(100vh-90px)] overflow-y-auto py-8 pr-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {meta.section.number} — {meta.section.title}
            </p>
            <div className="mt-3 space-y-1">
              {lessons.map((l) => (
                <Link
                  key={l.id}
                  href={lessonHref(sectionNumber, l.id)}
                  aria-current={l.id === lesson.id ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm leading-snug transition ${
                    l.id === lesson.id
                      ? "border-l-2 border-amber-400 bg-white/[0.06] font-medium text-white"
                      : "border-l-2 border-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span className={`mr-2 font-mono text-xs ${l.id === lesson.id ? "text-amber-300" : "text-slate-500"}`}>
                    {l.id.split(".").slice(-1)}
                  </span>
                  {l.title}
                </Link>
              ))}
            </div>
            <Link
              href="/study"
              className="mt-6 block rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:text-white"
            >
              ← All study topics
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 py-8 lg:py-10">
          <article className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                Topic {lesson.id}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                ~{lesson.minutes} min read
              </span>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                Domain {meta.domain.number} · {meta.domain.weight}%
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {lesson.title}
            </h1>

            <div className="mt-6">
              <Lesson />
            </div>

            {/* Prev / next */}
            <div className="mt-14 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={lessonHref(sectionNumber, prev.id)}
                  className="group rounded-xl border border-white/10 p-4 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  <span className="text-xs text-slate-500">← Previous</span>
                  <span className="mt-1 block text-sm font-medium text-slate-200 group-hover:text-white">
                    {prev.short}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={lessonHref(sectionNumber, next.id)}
                  className="group rounded-xl border border-white/10 p-4 text-right transition hover:border-amber-400/40 hover:bg-amber-400/[0.05]"
                >
                  <span className="text-xs text-slate-500">Next →</span>
                  <span className="mt-1 block text-sm font-medium text-slate-200 group-hover:text-white">
                    {next.short}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/practice`}
                  className="group rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4 text-right transition hover:border-amber-400/60"
                >
                  <span className="text-xs text-amber-300">Section complete</span>
                  <span className="mt-1 block text-sm font-medium text-slate-200">
                    Test yourself on a practice set →
                  </span>
                </Link>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
