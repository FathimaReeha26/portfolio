import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant =
  | "standard"
  | "sketch"
  | "note"
  | "action"
  | "choice"
  | "empty"
  | "data";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  selected?: boolean;
  children: ReactNode;
}

const variants: Record<CardVariant, string> = {
  standard: "border-dashed",
  sketch: "border-dashed shadow-pencil-md",
  note: "border-dashed bg-paper-soft",
  action: "border-dashed shadow-pencil-sm",
  choice: "border-dashed",
  empty: "border-dashed",
  data: "border-dashed",
};

/* White sketch object on the cream canvas. Standard cards use dashed
   graphite outlines; selected / interactive emphasis switches to a
   solid teal outline plus a check or label supplied by the caller. */
export function Card({
  variant = "standard",
  selected = false,
  children,
  className = "",
  ...rest
}: CardProps) {
  const outline = selected
    ? "border-solid border-teal"
    : "border-graphite";
  return (
    <div
      className={`rounded-lg border-2 bg-paper-card p-6 ${variants[variant]} ${outline} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
