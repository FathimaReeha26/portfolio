/* Brand mark: a heartbeat pulse line, a nod to the SynCura health
   monitoring work. Decorative only — aria-hidden, no pointer events,
   never overlapping text or controls. */

interface MarkProps {
  className?: string;
}

export function PulseMark({ className = "" }: MarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 32"
      fill="none"
      className={`pointer-events-none shrink-0 ${className}`.trim()}
    >
      <path
        d="M4 18 H38 L46 8 L54 26 L60 14 H116"
        stroke="var(--amber)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
