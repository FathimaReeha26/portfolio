import { CircleAlert } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

/* Labeled pill input. Labels are always visible; errors are ink text
   with an icon and linked via aria-describedby + aria-invalid. */
export function Input({ id, label, hint, error, required, ...rest }: InputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-pill border-2 bg-paper-card px-4 py-3 font-primary text-md text-ink placeholder:text-graphite focus-visible:border-ink ${
          error ? "border-danger" : "border-graphite"
        }`}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-sm text-ink">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-2 text-sm text-ink">
          <CircleAlert aria-hidden="true" size={16} className="mt-1 shrink-0 text-danger" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
