import {
  Bell,
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  Lightbulb,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

export type AlertVariant =
  | "note"
  | "tip"
  | "reminder"
  | "warning"
  | "error"
  | "success"
  | "info";

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

const config: Record<AlertVariant, { icon: typeof Info; bar: string; iconColor: string; label: string }> = {
  // Text is always ink; the label + icon pair carries meaning, never color alone.
  // Teal fails 3:1 as a small icon, so tip/reminder/note/info icons stay ink
  // with a teal accent bar; warning/error/success icons pass as drawn.
  note: { icon: Info, bar: "bg-graphite", iconColor: "text-ink", label: "Note" },
  tip: { icon: Lightbulb, bar: "bg-teal", iconColor: "text-ink", label: "Tip" },
  reminder: { icon: Bell, bar: "bg-graphite", iconColor: "text-ink", label: "Reminder" },
  warning: { icon: CircleAlert, bar: "bg-warning", iconColor: "text-warning", label: "Warning" },
  error: { icon: CircleX, bar: "bg-danger", iconColor: "text-danger", label: "Error" },
  success: { icon: CircleCheck, bar: "bg-success", iconColor: "text-success", label: "Success" },
  info: { icon: Info, bar: "bg-graphite", iconColor: "text-ink", label: "Note" },
};

/* Semantic color is always paired with an icon and a text label,
   and message copy is ink. Dismiss is a keyboard-operable button. */
export function Alert({ variant, title, children, onDismiss, dismissLabel = "Dismiss message" }: AlertProps) {
  const { icon: Icon, bar, iconColor, label } = config[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className="flex items-stretch gap-3 rounded-md border-2 border-dashed border-graphite bg-paper-card p-4"
    >
      <span aria-hidden="true" className={`w-2 shrink-0 rounded-full ${bar}`} />
      <Icon aria-hidden="true" size={20} className={`mt-1 shrink-0 ${iconColor}`} />
      <div className="min-w-0 flex-1 text-md text-ink">
        <p className="font-semibold">
          {title ?? label}
        </p>
        <div>{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-pill text-ink hover:bg-teal-soft"
        >
          <X aria-hidden="true" size={18} />
        </button>
      )}
    </div>
  );
}
