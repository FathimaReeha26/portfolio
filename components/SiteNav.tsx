"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

/* Quiet top bar: wordmark with an amber full stop, text links with an
   amber underline on hover, current page underlined and semibold plus
   aria-current — more than color. Mobile collapses to a disclosure menu. */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open ]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex min-h-[44px] items-center font-display text-lg font-semibold text-ink"
        >
          {site.shortName}<span aria-hidden="true" className="text-amber">.</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const isPage = !item.href.includes("#") && pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isPage ? "page" : undefined}
                  className={`flex min-h-[44px] items-center text-md transition-colors duration-200 ${
                    isPage
                      ? "font-semibold text-ink underline decoration-amber decoration-2 underline-offset-8"
                      : "text-ink hover:text-amber-deep hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-8"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={site.cvHref}
              className="flex min-h-[44px] items-center rounded-md bg-ink px-5 text-md font-semibold text-paper transition-colors duration-200 hover:bg-amber-deep"
            >
              Download CV
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-line text-ink md:hidden"
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-[44px] items-center rounded-md px-2 text-md text-ink hover:bg-sand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={site.cvHref}
                className="flex min-h-[44px] items-center justify-center rounded-md bg-ink px-5 text-md font-semibold text-paper"
              >
                Download CV
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
