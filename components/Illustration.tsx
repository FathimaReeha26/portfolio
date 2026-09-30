/* Small hand-drawn doodles. All decorative: aria-hidden, no pointer
   events, and callers must never let them overlap text or controls. */

interface DoodleProps {
  className?: string;
}

const frame = "pointer-events-none shrink-0";

export function ArrowDoodle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 48" className={`${frame} ${className}`.trim()} fill="none">
      <path
        d="M6 8 C 30 10, 52 16, 62 34 M 54 28 L 63 36 L 70 26"
        stroke="var(--graphite)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarDoodle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={`${frame} ${className}`.trim()} fill="none">
      <path
        d="M16 4 L 18.5 12.5 L 27 13 L 20.5 18.5 L 22.5 27 L 16 22 L 9.5 27 L 11.5 18.5 L 5 13 L 13.5 12.5 Z"
        stroke="var(--teal)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LoopDoodle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 48" className={`${frame} ${className}`.trim()} fill="none">
      <ellipse
        cx="60"
        cy="24"
        rx="54"
        ry="18"
        stroke="var(--teal)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 0"
        transform="rotate(-4 60 24)"
      />
    </svg>
  );
}

export function CheckDoodle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 32" className={`${frame} ${className}`.trim()} fill="none">
      <path
        d="M5 17 L 15 26 L 35 6"
        stroke="var(--teal)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperclipDoodle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 56" className={`${frame} ${className}`.trim()} fill="none">
      <path
        d="M12 52 L 12 16 C 12 8, 20 8, 20 15 L 20 40 C 20 47, 8 47, 8 38 L 8 12"
        stroke="var(--graphite)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
