interface SpinnerProps {
  size?: number;
  label?: string;
}

/* Loading indicator: amber arc on a quiet track. Meaning is always
   paired with adjacent loading text, never motion alone; the global
   reduced-motion rules freeze the spin while the label remains. */
export function Spinner({ size = 20, label = "Loading" }: SpinnerProps) {
  return (
    <span
      role="status"
      className="inline-flex shrink-0 items-center"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="block animate-spin rounded-full border-2 border-line border-t-amber"
        style={{ width: size, height: size }}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
