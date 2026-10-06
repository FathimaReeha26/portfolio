import { CircleAlert } from "lucide-react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

/* Labeled multiline input, same treatment as Input. */
export function Textarea({ id, label, hint, error, required, ...rest }: TextareaProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-md border bg-paper px-4 py-3 text-md text-ink placeholder:text-ink/40 focus:border-amber ${
          error ? "border-danger" : "border-line"
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
