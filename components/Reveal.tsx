"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/* Scroll reveal, played once per element: a short fade with a small
   rise (the uupm scroll-reveal preset). Content renders in its final
   state by default, so it stays fully readable without JavaScript
   and under reduced motion — GSAP only ever animates *from* that. */
export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      gsap.from(ref.current, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
