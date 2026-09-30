import { Check } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

/* Pill chip. Interactive chips are real buttons with aria-pressed;
   selected state is teal fill AND a check mark, never color alone.
   Without onSelect it renders as a static label chip. */
export function Chip({
  selected = false,
  onSelect,
  children,
  className = "",
  ...rest
}: ChipProps) {
  const classes =
    `inline-flex min-h-[44px] items-center gap-2 rounded-pill border-2 px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:border-ink ${
      selected
        ? "border-ink bg-teal text-ink shadow-pencil-sm"
        : "border-dashed border-graphite bg-paper-card text-ink hover:border-solid hover:border-ink hover:bg-teal-soft"
    } ${className}`.trim();

  if (!onSelect) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={classes}
      {...rest}
    >
      {selected && <Check aria-hidden="true" size={16} strokeWidth={3} />}
      <span>{children}</span>
    </button>
  );
}
