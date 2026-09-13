"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { correctLetters, isCorrect } from "@/data/questions";
import type { PracticeSet } from "@/data/sets";
import QuestionCard from "@/components/quiz/QuestionCard";
import ExplanationPanel from "@/components/quiz/ExplanationPanel";

const PASS_THRESHOLD = 72;

type Phase = "running" | "confirm" | "results";
type Filter = "all" | "correct" | "incorrect" | "unanswered";

function fmt(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function timerTone(secondsLeft: number): string {
  if (secondsLeft < 60) return "border-red-400/40 bg-red-400/10 text-red-300 animate-pulse";
  if (secondsLeft < 5 * 60) return "border-amber-400/40 bg-amber-400/10 text-amber-300";
  return "border-white/10 bg-white/5 text-slate-200";
}

interface ExamSetQuizProps {
  set: PracticeSet;
}

export default function ExamSetQuiz({ set }: ExamSetQuizProps) {
  const [phase, setPhase] = useState<Phase>("running");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [secondsLeft, setSecondsLeft] = useState(set.durationMinutes * 60);
  const [filter, setFilter] = useState<Filter>("all");
  const router = useRouter();

  const questions = set.questions;
  const total = questions.length;
  const question = questions[idx];
  const answeredCount = questions.filter(
    (q) => (answers[q.id]?.length ?? 0) > 0,
  ).length;

  // Countdown while the exam is running; auto-ends the test at zero.
  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (secondsLeft === 0 && phase === "running") setPhase("results");
  }, [secondsLeft, phase]);

  const review = useMemo(
    () =>
      questions.map((q, i) => {
        const selected = answers[q.id] ?? [];
        const answered = selected.length > 0;
        return {
          question: q,
          index: i,
          selected,
          answered,
          correct: answered && isCorrect(q, selected),
        };
      }),
    [questions, answers],
  );

  const score = review.filter((r) => r.correct === true).length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= PASS_THRESHOLD;
  const timeUsed = set.durationMinutes * 60 - secondsLeft;

  const handleSelect = (i: number) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      const next =
        question.correctAnswers.length > 1
          ? current.includes(i)
            ? current.filter((x) => x !== i)
            : [...current, i]
          : [i];
      return { ...prev, [question.id]: next };
    });
  };

  const jumpTo = (i: number) => setIdx(i);

  const retake = () => {
    setAnswers({});
    setIdx(0);
    setSecondsLeft(set.durationMinutes * 60);
    setFilter("all");
    setPhase("running");
  };

  const filteredReview = review.filter((r) =>
    filter === "all"
      ? true
      : filter === "correct"
        ? r.correct === true
        : filter === "incorrect"
          ? r.answered && r.correct === false
          : !r.answered,
  );

  // ---------- Results ----------
  if (phase === "results") {
    const filterLabels: { key: Filter; label: string; count: number }[] = [
      { key: "all", label: "All", count: total },
      { key: "correct", label: "Correct", count: review.filter((r) => r.correct === true).length },
      {
        key: "incorrect",
        label: "Incorrect",
        count: review.filter((r) => r.answered && r.correct === false).length,
      },
      { key: "unanswered", label: "Unanswered", count: total - answeredCount },
    ];

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-white/5">
          <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Link
                href="/exam"
                className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
                aria-label="Back to exam sets"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </Link>
              <h1 className="text-lg font-bold">Exam Results</h1>
            </div>
            <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300">
              {set.title}
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 text-center sm:p-10">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                passed
                  ? "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  : "border border-red-400/40 bg-red-400/10 text-red-300"
              }`}
            >
              {passed ? "Likely Pass — nice work! 🎉" : "Below passing score — keep practicing"}
            </span>
            <div className="mt-5 text-6xl font-extrabold tracking-tight text-white">
              {percentage}%
            </div>
            <p className="mt-2 text-slate-400">
              {score} of {total} correct · passing score {PASS_THRESHOLD}%
            </p>

            <dl className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <dt className="sr-only">Correct</dt>
                <dd className="text-2xl font-bold text-emerald-300">{score}</dd>
                <dd className="mt-0.5 text-xs text-slate-400">Correct</dd>
              </div>
              <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4">
                <dt className="sr-only">Incorrect</dt>
                <dd className="text-2xl font-bold text-red-300">{answeredCount - score}</dd>
                <dd className="mt-0.5 text-xs text-slate-400">Incorrect</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="sr-only">Unanswered</dt>
                <dd className="text-2xl font-bold text-slate-300">{total - answeredCount}</dd>
                <dd className="mt-0.5 text-xs text-slate-400">Unanswered</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-slate-500">
              Time used: {fmt(timeUsed)} of {fmt(set.durationMinutes * 60)}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={retake}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3 font-semibold text-white transition hover:brightness-110"
              >
                Retake Exam
              </button>
              <Link
                href={`/practice/set/${set.id}`}
                className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                Practice Mode
              </Link>
              <Link
                href="/"
                className="rounded-xl px-6 py-3 font-semibold text-slate-400 transition hover:text-white"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Answer Review</h2>
            <div className="flex flex-wrap gap-2">
              {filterLabels.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    filter === f.key
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-6 pb-16">
            {filteredReview.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                No questions in this category.
              </p>
            ) : (
              filteredReview.map((r) => (
                <div key={r.question.id}>
                  <QuestionCard
                    question={r.question}
                    number={r.index + 1}
                    total={total}
                    selected={r.selected}
                    submitted
                  />
                  <div className="mt-3">
                    <ExplanationPanel
                      correct={r.answered ? r.correct : null}
                      correctText={correctLetters(r.question)}
                      explanation={r.question.explanation}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    );
  }

  // ---------- Running exam + confirm dialog ----------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setPhase("confirm")}
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"
              aria-label="End exam and go back"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300">
              Exam Mode
            </span>
            <span className="hidden truncate text-sm text-slate-500 sm:block">
              {set.title} · answers are revealed at the end
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-400 sm:block">
              {answeredCount}/{total} answered
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-sm font-semibold tabular-nums ${timerTone(secondsLeft)}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9.5V13l2.5 1.5" />
              </svg>
              {fmt(secondsLeft)}
            </span>
            <button
              type="button"
              onClick={() => setPhase("confirm")}
              className="rounded-lg border border-red-400/40 bg-red-400/10 px-3.5 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/20"
            >
              End Test
            </button>
          </div>
        </div>
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <QuestionCard
          question={question}
          number={idx + 1}
          total={total}
          selected={answers[question.id] ?? []}
          submitted={false}
          onSelect={handleSelect}
        />

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => jumpTo(idx - 1)}
              disabled={idx === 0}
              className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition enabled:hover:border-white/30 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Previous
            </button>

            <div className="flex max-w-xl flex-wrap items-center justify-center gap-2" role="navigation" aria-label="Question palette">
              {questions.map((q, i) => {
                const answered = (answers[q.id]?.length ?? 0) > 0;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to question ${i + 1}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-semibold transition ${
                      i === idx
                        ? "border-amber-300 bg-amber-400 text-slate-950"
                        : answered
                          ? "border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {idx + 1 < total ? (
              <button
                type="button"
                onClick={() => jumpTo(idx + 1)}
                className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition enabled:hover:border-white/30 enabled:hover:bg-white/5"
              >
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPhase("confirm")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                End Test
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Tap a number to jump between questions · answers are revealed after you end
            the test
          </p>
        </div>
      </main>

      {phase === "confirm" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-test-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h2 id="end-test-title" className="text-lg font-bold text-white">
              End the exam?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              You have answered{" "}
              <span className="font-semibold text-slate-200">
                {answeredCount} of {total}
              </span>{" "}
              questions. Unanswered questions will be scored as incorrect, and your
              results with full explanations will be shown. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPhase("running")}
                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                Keep Working
              </button>
              <button
                type="button"
                onClick={() => setPhase("results")}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                End Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
