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
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-6 py-3 text-md font-semibold transition-colors duration-200 active:translate-y-px disabled:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  // Paper on amber: high contrast; the brand moment for primary actions.
  primary:
    "bg-amber text-paper hover:bg-amber-deep disabled:bg-sand disabled:text-ink/50",
  secondary:
    "border border-line bg-paper text-ink hover:border-ink disabled:border-line disabled:text-ink/40",
  tertiary:
    "min-h-[44px] rounded-sm text-ink underline decoration-amber decoration-2 underline-offset-4 hover:bg-amber-soft disabled:text-ink/40 disabled:no-underline",
  destructive:
    "bg-danger text-paper hover:brightness-95 disabled:bg-sand disabled:text-ink/50",
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
