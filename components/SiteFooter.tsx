import Link from "next/link";
import { PulseMark } from "./Illustration";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-pine text-paper dark:text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
        <PulseMark className="h-6 w-28 [&_path]:stroke-amber" />
        <p className="font-display text-xl italic">{site.signOff}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-md text-paper/85 underline decoration-transparent decoration-2 underline-offset-8 transition-colors duration-200 hover:text-paper hover:decoration-amber dark:text-cream/85 dark:hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-cream/15">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="tnum inline-flex min-h-[44px] items-center text-sm text-paper/85 underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-paper hover:decoration-amber dark:text-cream/85 dark:hover:text-cream"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="tnum text-xs text-paper/70 dark:text-cream/70">
            Last updated {site.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
