export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  /** Indices into `options`; more than one entry means the question is multi-select. */
  correctAnswers: number[];
  explanation: string;
}

/** True when the selected option set exactly matches the correct answer set. */
export function isCorrect(question: QuizQuestion, selected: number[]): boolean {
  const a = [...selected].sort((x, y) => x - y);
  const b = [...question.correctAnswers].sort((x, y) => x - y);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** "B" for single answers, "B and D" style letters for multi-select. */
export function correctLetters(question: QuizQuestion): string {
  const letters = question.correctAnswers.map((i) => String.fromCharCode(65 + i));
  if (letters.length <= 1) return letters.join("");
  if (letters.length === 2) return `${letters[0]} and ${letters[1]}`;
  return `${letters.slice(0, -1).join(", ")}, and ${letters[letters.length - 1]}`;
}
