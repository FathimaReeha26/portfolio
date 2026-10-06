"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { markIntroReady } from "@/lib/introBus";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "folio-intro-seen";

/* The single orchestrated moment: monogram in, amber rule draws,
   curtain lifts. Shown once per session, skipped entirely under
   reduced motion or without JavaScript (the overlay only mounts
   client-side, so SSR and no-JS users never see it). Click or
   Escape skips it. Total under 1.4 seconds. */
export function IntroScreen() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  function finish() {
    if (finished.current) return;
    finished.current = true;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — intro simply replays next visit */
    }
    setDone(true);
    markIntroReady();
  }

  useGSAP(
    () => {
      setMounted(true);
      let seen = false;
      try {
        seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        seen = false;
      }

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        finish();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (seen) {
          finish();
          return;
        }
        const root = rootRef.current;
        if (!root) {
          finish();
          return;
        }
        const tl = gsap.timeline({ onComplete: finish });
        tl.from(".folio-intro-mark", {
          opacity: 0,
          y: 26,
          duration: 0.5,
          ease: "expo.out",
        })
          .from(
            ".folio-intro-name",
            { opacity: 0, y: 14, duration: 0.45, ease: "expo.out" },
            "-=0.3"
          )
          .fromTo(
            ".folio-intro-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.45, ease: "expo.inOut" },
            "-=0.25"
          )
          .to(root, {
            yPercent: -100,
            duration: 0.55,
            ease: "power4.inOut",
            delay: 0.15,
          });
      });
    },
    { scope: rootRef }
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
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-4 bg-ink text-paper"
    >
      <p className="folio-intro-mark font-display text-4xl font-semibold sm:text-3xl">
        F<span className="italic text-amber">R</span>
      </p>
      <p className="folio-intro-name text-sm tracking-wide text-paper">
        {site.shortName} — Portfolio
      </p>
      <span className="block h-[3px] w-40 overflow-hidden rounded-full bg-paper/20">
        <span className="folio-intro-rule block h-full w-full origin-left rounded-full bg-amber" />
      </span>
    </div>
  );
}
