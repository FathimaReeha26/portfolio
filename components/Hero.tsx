"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { onIntroReady } from "@/lib/introBus";
import { site } from "@/content/site";
import { Button } from "./Button";

gsap.registerPlugin(useGSAP);

/* Editorial hero: facts line, oversized two-line headline with an
   italic amber accent, supporting line, two actions. Headline lines
   rise inside overflow masks once the intro finishes (immediately
   when the intro is skipped); everything is statically readable
   without JavaScript or motion. */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const remove = onIntroReady(() => {
        gsap.fromTo(
          ".folio-hero-line",
          { yPercent: 112 },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.09 }
        );
        gsap.fromTo(
          ".folio-hero-fade",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.out",
            stagger: 0.08,
            delay: 0.35,
          }
        );
      });
      return () => remove();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="flex flex-col gap-6 py-12 sm:py-16"
    >
      <p className="folio-hero-fade text-sm text-ink/70">
        {site.degree}, {site.school}, Class of {site.graduation}
      </p>
      <h1
        id="hero-heading"
        className="font-display text-4xl leading-[1.05] font-medium text-ink sm:text-3xl lg:text-4xl"
      >
        <span className="block overflow-hidden pb-1">
          <span className="folio-hero-line block">Fathima Reeha</span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span className="folio-hero-line block">
            makes AI <em className="text-amber">legible</em>.
          </span>
        </span>
      </h1>
      <p className="folio-hero-fade max-w-xl text-lg text-ink">
        {site.supportingLine}
      </p>
      <div className="folio-hero-fade flex flex-wrap items-center gap-3">
        <Button href="#projects" variant="primary">
          View projects
        </Button>
        <Button href={site.cvHref} variant="secondary">
          Download CV
        </Button>
      </div>
    </section>
  );
}
