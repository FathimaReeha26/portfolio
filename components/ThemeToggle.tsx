"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

/* Sun/moon toggle for the two Folio themes. Icon plus pressed state
   plus an explicit label — theme is never carried by color alone.
   Cross-tab sync lives in the ThemeProvider. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-amber hover:text-amber-deep"
    >
      {dark ? (
        <Sun aria-hidden="true" size={20} />
      ) : (
        <Moon aria-hidden="true" size={20} />
      )}
    </button>
  );
}
