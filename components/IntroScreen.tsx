"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { markIntroReady } from "@/lib/introBus";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP);

interface BootLine {
  text: string;
  status?: string;
}

const bootLines: BootLine[] = [
  { text: "folio/boot — folio v0.1.0" },
  { text: "setting type · Fraunces + Inter", status: "ok" },
  { text: `laying out ${projects.length} case studies`, status: "ok" },
  { text: "warming the amber", status: "ok" },
  { text: `ready — welcome in, this is ${site.shortName}'s folio` },
];

/* The single orchestrated moment: a boot sequence that reports the
   real build, resolving into the monogram before the curtain lifts.
   Plays on every full page load (about three seconds); click or
   Escape skips it. It mounts client-side only, so SSR and no-JS
   users never see it, and reduced motion skips it outright. */
export function IntroScreen() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  function finish() {
    if (finished.current) return;
    finished.current = true;
    setDone(true);
    markIntroReady();
  }

  useGSAP(() => {
    setMounted(true);
  }, { scope: rootRef });

  useGSAP(
    () => {
      if (!mounted || finished.current) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        finish();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) {
          finish();
          return;
        }
        const tl = gsap.timeline({ onComplete: finish });
        tl.from(".folio-boot-line", {
          opacity: 0,
          x: -12,
          duration: 0.36,
          ease: "power1.out",
          stagger: 0.19,
        })
          .from(
            ".folio-boot-mark",
            {
              opacity: 0,
              scale: 0.85,
              duration: 0.6,
              ease: "expo.out",
            },
            "-=0.25"
          )
          .fromTo(
            ".folio-boot-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.inOut" },
            "-=0.45"
          )
          .to(root, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            delay: 0.35,
          });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [mounted] }
  );

  useGSAP(
    () => {
      function onKey(event: KeyboardEvent) {
        if (event.key === "Escape") finish();
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    },
    { scope: rootRef }
  );

  if (!mounted || done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onClick={finish}
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-boot text-cream"
    >
      <div className="flex w-full max-w-sm flex-col gap-5 px-8">
        <p className="folio-boot-mark font-display text-5xl font-semibold">
          F<span className="italic text-amber">R</span>
        </p>
        <div className="flex flex-col gap-1.5">
          {bootLines.map((line) => (
            <p
              key={line.text}
              className="folio-boot-line tnum flex items-baseline justify-between gap-4 text-[13px] leading-relaxed text-cream/75"
            >
              <span>{line.text}</span>
              {line.status && (
                <span className="font-semibold text-amber">{line.status}</span>
              )}
            </p>
          ))}
        </div>
        <span className="block h-[3px] w-full overflow-hidden rounded-full bg-cream/15">
          <span className="folio-boot-rule block h-full w-full origin-left rounded-full bg-amber" />
        </span>
        <p className="text-xs text-cream/40">click anywhere to skip</p>
      </div>
    </div>
  );
}
