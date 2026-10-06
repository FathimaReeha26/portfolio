import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { IntroScreen } from "@/components/IntroScreen";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const display = Fraunces({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    title: `${site.name} — Portfolio`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: site.tagline,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  description: site.tagline,
  email: site.email,
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} flex min-h-screen flex-col bg-paper font-sans text-ink antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[110] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-md focus:text-ink"
        >
          Skip to content
        </a>
        <IntroScreen />
        <SiteNav />
        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-6">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
