export type OptionState = "idle" | "selected" | "correct" | "incorrect" | "muted";

interface OptionRowProps {
  index: number;
  text: string;
  state: OptionState;
  multi: boolean;
  disabled: boolean;
  onSelect?: (index: number) => void;
}

const wrapperStyles: Record<OptionState, string> = {
  idle: "border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:bg-amber-400/[0.07] cursor-pointer",
  selected: "border-amber-400 bg-amber-400/10 cursor-pointer",
  correct: "border-emerald-400/70 bg-emerald-400/10",
  incorrect: "border-red-400/70 bg-red-400/10",
  muted: "border-white/5 bg-transparent opacity-50",
};

const markerStyles: Record<OptionState, string> = {
  idle: "border-white/25 text-slate-400",
  selected: "border-amber-400 bg-amber-400 text-slate-950",
  correct: "border-emerald-400 bg-emerald-400 text-slate-950",
  incorrect: "border-red-400 bg-red-400 text-white",
  muted: "border-white/15 text-slate-500",
};

export default function OptionRow({
  index,
  text,
  state,
  multi,
  disabled,
  onSelect,
}: OptionRowProps) {
  const letter = String.fromCharCode(65 + index);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(index)}
      className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors duration-150 ${wrapperStyles[state]}`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border text-xs font-bold ${
          multi ? "rounded-md" : "rounded-full"
        } ${markerStyles[state]}`}
      >
        {state === "correct" ? (
          <CheckIcon />
        ) : state === "incorrect" ? (
          <CrossIcon />
        ) : (
          letter
        )}
      </span>
      <span className="text-sm leading-relaxed text-slate-200 sm:text-[15px]">{text}</span>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M6.3 6.3a1 1 0 0 1 1.4 0L10 8.6l2.3-2.3a1 1 0 1 1 1.4 1.4L11.4 10l2.3 2.3a1 1 0 0 1-1.4 1.4L10 11.4l-2.3 2.3a1 1 0 0 1-1.4-1.4L8.6 10 6.3 7.7a1 1 0 0 1 0-1.4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
