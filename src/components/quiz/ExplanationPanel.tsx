interface ExplanationPanelProps {
  /** true = correct, false = wrong, null = question was not answered. */
  correct: boolean | null;
  correctText: string;
  explanation: string;
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.7 7.3a1 1 0 0 0-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 1 0 1.4 1.4L10 11.4l1.3 1.3a1 1 0 0 0 1.4-1.4L11.4 10l1.3-1.3a1 1 0 0 0-1.4-1.4L10 8.6 8.7 7.3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-13a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm0 9a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 10 14Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ExplanationPanel({
  correct,
  correctText,
  explanation,
}: ExplanationPanelProps) {
  const tone =
    correct === null
      ? {
          wrap: "border-amber-400/30 bg-amber-400/[0.07]",
          label: "text-amber-300",
          text: "Not answered",
          icon: <InfoCircleIcon />,
        }
      : correct
        ? {
            wrap: "border-emerald-400/30 bg-emerald-400/[0.07]",
            label: "text-emerald-300",
            text: "Correct!",
            icon: <CheckCircleIcon />,
          }
        : {
            wrap: "border-red-400/30 bg-red-400/[0.07]",
            label: "text-red-300",
            text: "Incorrect",
            icon: <CrossCircleIcon />,
          };

  return (
    <section className={`rounded-2xl border p-5 ${tone.wrap}`}>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className={tone.label}>{tone.icon}</span>
        <span className={`text-sm font-semibold ${tone.label}`}>{tone.text}</span>
        <span className="text-sm text-slate-400">
          Correct answer:{" "}
          <span className="font-semibold text-slate-200">{correctText}</span>
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{explanation}</p>
    </section>
  );
}
