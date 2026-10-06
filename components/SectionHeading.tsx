"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

/* Editorial section header: Fraunces title with a short amber rule
   that draws in on scroll (static final state without motion).
   The heading carries the meaning; the rule is decoration. */
export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".folio-section-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="mb-8">
      <span
        aria-hidden="true"
        className="folio-section-rule mb-3 block h-1 w-12 rounded-full bg-amber"
      />
      <h2 id={id} className="font-display text-2xl font-medium text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-md text-ink">{description}</p>
      )}
    </div>
  );
}
