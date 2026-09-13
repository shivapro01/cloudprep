import type { ReactNode } from "react";

/** Shared typography/content building blocks for study lessons. */

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-7 text-slate-300">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-base leading-7 text-slate-200">{children}</p>;
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 border-b border-white/10 pb-2 text-xl font-bold text-white"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-[17px] font-semibold text-amber-200">{children}</h3>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-slate-300">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-amber-200">
      {children}
    </code>
  );
}

const calloutStyles = {
  exam: {
    wrap: "border-amber-400/30 bg-amber-400/[0.07]",
    label: "text-amber-300",
    title: "Exam note",
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
  },
  tip: {
    wrap: "border-emerald-400/30 bg-emerald-400/[0.07]",
    label: "text-emerald-300",
    title: "Best practice",
    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  warn: {
    wrap: "border-red-400/30 bg-red-400/[0.07]",
    label: "text-red-300",
    title: "Watch out",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z",
  },
  note: {
    wrap: "border-sky-400/30 bg-sky-400/[0.07]",
    label: "text-sky-300",
    title: "Good to know",
    icon: "M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  },
} as const;

export function Callout({
  type,
  title,
  children,
}: {
  type: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[type];
  return (
    <div className={`my-6 rounded-xl border p-5 ${s.wrap}`}>
      <div className={`flex items-center gap-2 text-sm font-semibold ${s.label}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 h-5 w-5" aria-hidden="true">
          <path d={s.icon} />
        </svg>
        {title ?? s.title}
      </div>
      <div className="mt-2 text-[14.5px] leading-7 text-slate-300">{children}</div>
    </div>
  );
}

export function KeyTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="bg-white/5">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/5 align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 leading-6 text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Diagram({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
        <div className="border-b border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </div>
        <div className="overflow-x-auto p-4">
          <div className="min-w-[620px]">{children}</div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-500">{caption}</figcaption>
      )}
    </figure>
  );
}
