import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive";

interface ButtonBase {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = ButtonBase &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
  };

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border-2 px-6 py-3 text-md font-semibold transition-all duration-150 focus-visible:border-ink disabled:shadow-none";

const variants: Record<ButtonVariant, string> = {
  // Ink text on teal fill: high contrast, never white-on-teal body text.
  primary:
    "border-ink bg-teal text-ink shadow-pencil-sm hover:-translate-y-px hover:shadow-pencil-md active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:border-graphite-soft disabled:bg-paper-soft disabled:text-graphite",
  secondary:
    "border-ink bg-paper-card text-ink shadow-pencil-sm hover:-translate-y-px hover:bg-teal-soft hover:shadow-pencil-md active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:border-graphite-soft disabled:bg-paper-soft disabled:text-graphite",
  tertiary:
    "border-transparent text-ink underline decoration-teal decoration-2 underline-offset-4 hover:bg-teal-soft disabled:text-graphite disabled:no-underline",
  // White on danger red passes AA; border stays ink for affordance.
  destructive:
    "border-ink bg-danger text-white shadow-pencil-sm hover:-translate-y-px hover:shadow-pencil-md active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:border-graphite-soft disabled:bg-paper-soft disabled:text-graphite",
};

export function Button({
  variant = "primary",
  loading = false,
  href,
  children,
  className = "",
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  const content = (
    <>
      {loading && <Spinner label="Loading" />}
      <span>{children}</span>
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
