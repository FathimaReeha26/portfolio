"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { onIntroReady } from "@/lib/introBus";
import { site } from "@/content/site";
import { Button } from "./Button";

gsap.registerPlugin(useGSAP);

/* Editorial hero: facts line, oversized name headline, supporting
   line, two actions. The headline rises inside an overflow mask once
   the intro finishes (immediately when the intro is skipped);
   everything is statically readable without JavaScript or motion. */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      /* Park the hero hidden from mount — not at handoff — so the
         overlay fade never reveals a static frame that then blinks
         into the animation. No-JS users never run this. */
      gsap.set(".folio-hero-line", { yPercent: 112 });
      gsap.set(".folio-hero-fade", { opacity: 0, y: 12 });
      const remove = onIntroReady(() => {
        /* Element refs, not selector strings: a bare string here
           resolves outside the gsap.context scope and matches zero
           targets, silently killing the reveal. */
        const root = rootRef.current;
        const lines = root
          ? Array.from(root.querySelectorAll(".folio-hero-line"))
          : [];
        const fades = root
          ? Array.from(root.querySelectorAll(".folio-hero-fade"))
          : [];
        gsap.to(lines, {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.09,
        });
        gsap.to(fades, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.08,
          delay: 0.35,
        });
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
          <span className="folio-hero-line block">{site.name}</span>
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
