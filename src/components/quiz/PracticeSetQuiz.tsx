"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { correctLetters, isCorrect } from "@/data/questions";
import type { PracticeSet } from "@/data/sets";
import QuestionCard from "@/components/quiz/QuestionCard";
import ExplanationPanel from "@/components/quiz/ExplanationPanel";

interface PracticeSetQuizProps {
  set: PracticeSet;
}

export default function PracticeSetQuiz({ set }: PracticeSetQuizProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  /** Per-question outcome: true/false once answered, null when skipped so far. */
  const [outcomes, setOutcomes] = useState<(boolean | null)[]>(() =>
    set.questions.map(() => null),
  );
  const [done, setDone] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const router = useRouter();

  const total = set.questions.length;
  const question = set.questions[idx];
  const score = outcomes.filter(Boolean).length;
  const answeredCount = outcomes.filter((o) => o !== null).length;
  const progress = ((idx + (submitted ? 1 : 0)) / total) * 100;

  const requestExit = () => {
    // Nothing answered yet — no progress to lose, so leave right away.
    if (answeredCount === 0) {
      router.push("/practice");
      return;
    }
    setConfirmExit(true);
  };

  const handleSelect = (i: number) => {
    if (submitted) return;
    setSelected((prev) => {
      if (question.correctAnswers.length > 1) {
        return prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i];
      }
      return [i];
    });
  };

  const handleSubmit = () => {
    if (submitted || selected.length === 0) return;
    setOutcomes((prev) =>
      prev.map((o, k) => (k === idx ? isCorrect(question, selected) : o)),
    );
    setSubmitted(true);
  };

  const handleNext = () => {
    if (idx + 1 >= total) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setSelected([]);
    setSubmitted(false);
  };

  const restart = () => {
    setIdx(0);
    setSelected([]);
    setSubmitted(false);
    setOutcomes(set.questions.map(() => null));
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-16 text-center text-slate-100 sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M19.5 6.1 9.9 15.7a1 1 0 0 1-1.4 0L4.5 11.7a1.1 1.1 0 0 1 1.55-1.56l2.75 2.75 8.15-8.15A1.1 1.1 0 1 1 19.5 6.1Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Practice complete!</h1>
        <p className="mt-2 text-slate-400">
          You answered {score} of {total} questions correctly.
        </p>
        <div className="mt-8 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="text-5xl font-extrabold text-white">{pct}%</div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            {pct >= 72
              ? "You’re above the 72% passing benchmark — exam ready!"
              : "Keep practicing — aim for 72% or higher before exam day."}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110"
          >
            Retake Practice
          </button>
          <Link
            href={`/exam/set/${set.id}`}
            className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
          >
            Try Exam Mode
          </Link>
          <Link
            href="/practice"
            className="rounded-xl px-6 py-3 font-semibold text-slate-400 transition hover:text-white"
          >
            Back to Sets
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={requestExit}
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
              aria-label="Exit practice"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              Practice Mode
            </span>
            <span className="hidden truncate text-sm text-slate-500 sm:block">
              {set.title} · no time limit
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden whitespace-nowrap text-sm text-slate-400 sm:block">
              <span className="font-semibold text-emerald-400">{score}</span> correct ·{" "}
              {answeredCount}/{total} answered
            </span>
            <button
              type="button"
              onClick={requestExit}
              className="rounded-lg border border-red-400/40 bg-red-400/10 px-3.5 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/20"
            >
              Exit
            </button>
          </div>
        </div>
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <QuestionCard
          question={question}
          number={idx + 1}
          total={total}
          selected={selected}
          submitted={submitted}
          onSelect={handleSelect}
        />

        {submitted && (
          <div className="mt-6">
            <ExplanationPanel
              correct={outcomes[idx] === true}
              correctText={correctLetters(question)}
              explanation={question.explanation}
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {submitted
              ? "Review the explanation, then continue."
              : question.correctAnswers.length > 1
                ? "Select all that apply, then submit."
                : "Select an answer, then submit."}
          </p>
          {submitted ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110"
            >
              {idx + 1 >= total ? "Finish Practice" : "Next Question"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selected.length === 0}
              className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-semibold text-slate-950 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Answer
            </button>
          )}
        </div>
      </main>

      {confirmExit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-practice-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h2 id="exit-practice-title" className="text-lg font-bold text-white">
              Exit practice session?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              You’ve answered{" "}
              <span className="font-semibold text-slate-200">
                {answeredCount} of {total}
              </span>{" "}
              questions. Your progress and score will be lost.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                Keep Practicing
              </button>
              <button
                type="button"
                onClick={() => router.push("/practice")}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
