import { Check } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

/* Compact bordered chip. Interactive chips are real buttons with
   aria-pressed; selected state is an ink fill AND a check mark,
   never color alone. Without onSelect it renders as a static label. */
export function Chip({
  selected = false,
  onSelect,
  children,
  className = "",
  ...rest
}: ChipProps) {
  const classes =
    `inline-flex min-h-[44px] items-center gap-1.5 rounded-sm border px-3 py-1 text-sm font-medium transition-colors duration-200 ${
      selected
        ? "border-ink bg-ink text-paper"
        : "border-line bg-paper text-ink hover:border-ink"
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
      {selected && <Check aria-hidden="true" size={15} strokeWidth={3} />}
      <span>{children}</span>
    </button>
  );
}
