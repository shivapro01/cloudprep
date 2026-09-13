"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getSet } from "@/data/sets";
import ExamSetQuiz from "@/components/quiz/ExamSetQuiz";

export default function ExamSetPage() {
  const params = useParams<{ id: string }>();
  const set = getSet(Number(params?.id));

  if (!set) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
        <h1 className="text-2xl font-bold">Exam set not found</h1>
        <p className="mt-2 text-slate-400">
          That set doesn’t exist yet — pick one from the list.
        </p>
        <Link
          href="/exam"
          className="mt-6 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3 font-semibold text-white transition hover:brightness-110"
        >
          Back to Exam Sets
        </Link>
      </main>
    );
  }

  // Keying by set id resets quiz state whenever the route switches sets.
  return <ExamSetQuiz key={set.id} set={set} />;
}
