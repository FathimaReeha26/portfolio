interface SpinnerProps {
  size?: number;
  label?: string;
}

/* Sketchy loading spinner: dashed pencil ring. Meaning is always
   paired with adjacent loading text, never animation alone. */
export function Spinner({ size = 20, label = "Loading" }: SpinnerProps) {
  return (
    <span
      role="status"
      className="inline-flex shrink-0 items-center"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="sketch-spinner block"
        style={{ width: size, height: size }}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
