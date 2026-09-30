import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-dashed border-graphite bg-paper-soft">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8">
        <p className="text-lg text-ink">{site.signOff}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-md text-ink underline decoration-graphite-soft decoration-2 underline-offset-4 hover:decoration-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex min-h-[44px] items-center font-mono text-sm text-ink underline decoration-graphite-soft decoration-2 underline-offset-4 hover:decoration-teal"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-ink">
            Last updated: {site.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
