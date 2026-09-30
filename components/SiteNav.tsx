"use client";

import { Menu, Pencil, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

/* Sticky rounded top nav with pill links. The current page gets a pill
   background plus a teal underline plus aria-current — more than color.
   Mobile collapses to an accessible disclosure menu. */
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
    <header className="sticky top-0 z-40 border-b-2 border-dashed border-graphite bg-paper">
      <nav aria-label="Primary" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2 rounded-pill px-3 text-lg font-semibold text-ink"
        >
          <Pencil aria-hidden="true" size={20} className="text-teal" />
          <span>{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {nav.map((item) => {
            const isPage = !item.href.includes("#") && pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isPage ? "page" : undefined}
                  className={`flex min-h-[44px] items-center rounded-pill border-2 px-4 text-md transition-colors duration-150 ${
                    isPage
                      ? "border-ink bg-teal-soft font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4"
                      : "border-transparent text-ink hover:border-ink hover:bg-paper-card"
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
              className="flex min-h-[44px] items-center rounded-pill border-2 border-ink bg-teal px-4 text-md font-semibold text-ink shadow-pencil-sm transition-all duration-150 hover:-translate-y-px hover:shadow-pencil-md"
            >
              Download CV
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-pill border-2 border-ink bg-paper-card text-ink md:hidden"
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t-2 border-dashed border-graphite px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-2 pt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-[44px] items-center rounded-pill border-2 border-dashed border-graphite bg-paper-card px-4 text-md text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={site.cvHref}
                className="flex min-h-[44px] items-center justify-center rounded-pill border-2 border-ink bg-teal px-4 text-md font-semibold text-ink"
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
