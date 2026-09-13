import type { QuizQuestion } from "@/data/questions";
import OptionRow, { type OptionState } from "./OptionRow";

interface QuestionCardProps {
  question: QuizQuestion;
  number: number;
  total: number;
  selected: number[];
  /** When true, options show correct/incorrect states and can no longer be clicked. */
  submitted: boolean;
  onSelect?: (index: number) => void;
}

function getOptionState(
  question: QuizQuestion,
  index: number,
  selected: number[],
  submitted: boolean,
): OptionState {
  if (!submitted) return selected.includes(index) ? "selected" : "idle";
  if (question.correctAnswers.includes(index)) return "correct";
  if (selected.includes(index)) return "incorrect";
  return "muted";
}

export default function QuestionCard({
  question,
  number,
  total,
  selected,
  submitted,
  onSelect,
}: QuestionCardProps) {
  const multi = question.correctAnswers.length > 1;
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
          {question.category}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
          Question {number} of {total}
        </span>
        {multi && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
            Select {question.correctAnswers.length}
          </span>
        )}
      </div>
      <h2 className="mt-5 text-lg font-semibold leading-relaxed text-white sm:text-xl">
        {question.question}
      </h2>
      <div className="mt-6 space-y-3">
        {question.options.map((text, i) => (
          <OptionRow
            key={i}
            index={i}
            text={text}
            multi={multi}
            state={getOptionState(question, i, selected, submitted)}
            disabled={submitted || !onSelect}
            onSelect={onSelect}
          />
        ))}
      </div>
    </article>
  );
}
