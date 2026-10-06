import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "sand" | "pine";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  selected?: boolean;
  children: ReactNode;
}

const variants: Record<CardVariant, string> = {
  default: "border-line bg-paper",
  sand: "border-transparent bg-sand",
  pine: "border-transparent bg-pine text-paper",
};

/* Quiet surfaces, no elevation. Depth comes from borders and
   whitespace. Selected state pairs an amber border with a soft
   amber wash — never color alone, since callers add a check or label. */
export function Card({
  variant = "default",
  selected = false,
  children,
  className = "",
  ...rest
}: CardProps) {
  const outline = selected ? "border-amber bg-amber-soft/50" : "";
  return (
    <div
      className={`rounded-lg border p-8 ${variants[variant]} ${outline} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
