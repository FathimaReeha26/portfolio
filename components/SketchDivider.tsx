/* Decorative wavy pencil divider between page sections. */
export function SketchDivider() {
  return (
    <div aria-hidden="true" className="pointer-events-none mx-auto my-4 w-full max-w-2xl px-4">
      <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="block h-4 w-full">
        <path
          d="M6 9 C 60 4, 110 13, 170 8 S 300 5, 394 9"
          fill="none"
          stroke="var(--graphite-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="7 6"
        />
      </svg>
    </div>
  );
}
