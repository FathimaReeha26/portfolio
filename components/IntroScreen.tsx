"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { markIntroReady } from "@/lib/introBus";

gsap.registerPlugin(useGSAP);

/* =====================================================================
   CONFIG — tune copy and timing here; the logic below stays untouched.
   - name: the one memorable moment (spec: "Reehh").
   - oncePerSession: true = play once per session (spec); false replays
     on every full page load.
   - snippets: real, valid code only. `typed` snippets must use plain
     string lines (typing writes raw text). Tone marks: "p" plain ink,
     "k" amber keyword, "s" pine string. Mobile shows the first 9.
   ===================================================================== */
type Tone = "p" | "k" | "s";
type CodeLine = string | Array<[string, Tone]>;
interface Snippet {
  id: string;
  lang: string;
  lines: CodeLine[];
  typed?: boolean;
}

const CONFIG = {
  name: "Reehh",
  sessionKey: "folio-intro-seen",
  oncePerSession: false, // false = replay on every full page load
  labels: { nameAt: 0.8, exitAt: 4.1 },
  letter: { duration: 0.7, stagger: 0.4 },
  snippets: [
    {
      id: "py-fact",
      lang: "python",
      typed: true,
      lines: ["def fact(n):", "    return 1 if n <= 1 else n * fact(n - 1)"],
    },
    {
      id: "js-debounce",
      lang: "javascript",
      lines: [
        [["const ", "k"], ["debounce = (fn, ms) => {", "p"]],
        "  let t;",
        [["  return ", "k"], ["(...a) => {", "p"]],
        "    clearTimeout(t);",
        "    t = setTimeout(() => fn(...a), ms);",
        "  };",
        "};",
      ],
    },
    {
      id: "sql-join",
      lang: "sql",
      lines: [
        [[`SELECT `, "k"], [`u.name, COUNT(o.id) AS orders`, "p"]],
        [[`FROM `, "k"], [`users u`, "p"]],
        [[`JOIN `, "k"], [`orders o ON o.user_id = u.id`, "p"]],
        [[`GROUP BY `, "k"], [`u.name;`, "p"]],
      ],
    },
    {
      id: "c-sum",
      lang: "c",
      lines: [
        [[`int `, "k"], [`sum(int *a, int n) {`, "p"]],
        [[`  int `, "k"], [`s = 0;`, "p"]],
        "  for (int i = 0; i < n; i++) s += a[i];",
        "  return s;",
        "}",
      ],
    },
    {
      id: "react-hook",
      lang: "jsx",
      lines: [
        "const [count, setCount] = useState(0);",
        "useEffect(() => {",
        [
          ["  document.title = ", "p"],
          ["`Clicks: ${count}`", "s"],
          [";", "p"],
        ],
        "}, [count]);",
      ],
    },
    {
      id: "git-rebase",
      lang: "bash",
      typed: true,
      lines: ["git fetch origin", "git rebase origin/main"],
    },
    {
      id: "java-stream",
      lang: "java",
      lines: [
        "var evens = nums.stream()",
        "    .filter(n -> n % 2 == 0)",
        "    .toList();",
      ],
    },
    {
      id: "sql-where",
      lang: "sql",
      typed: true,
      lines: [
        "SELECT title, year FROM films",
        "WHERE year >= 2000",
        "ORDER BY year DESC;",
      ],
    },
    {
      id: "js-totals",
      lang: "javascript",
      lines: [
        "const totals = items",
        "  .map((i) => i.price * i.qty)",
        "  .reduce((a, b) => a + b, 0);",
      ],
    },
    {
      id: "py-comp",
      lang: "python",
      lines: [
        "squares = [x * x for x in range(10)",
        "           if x % 2 == 0]",
      ],
    },
    {
      id: "py-file",
      lang: "python",
      lines: [
        [
          ["with open(", "p"],
          [`"data.csv"`, "s"],
          [") as f:", "p"],
        ],
        "    rows = [line.strip() for line in f]",
      ],
    },
    {
      id: "js-fetch",
      lang: "javascript",
      lines: [
        [
          ["const res = await fetch(", "p"],
          [`"/api/projects"`, "s"],
          [");", "p"],
        ],
        "const data = await res.json();",
      ],
    },
    {
      id: "ts-result",
      lang: "typescript",
      lines: [
        "type Result<T> =",
        "  | { ok: true; value: T }",
        "  | { ok: false; error: string };",
      ],
    },
    {
      id: "bash-grep",
      lang: "bash",
      typed: true,
      lines: ['grep -r "TODO" src/ | wc -l', 'find . -name "*.tmp" -delete'],
    },
    {
      id: "git-commit",
      lang: "bash",
      lines: ["git add -A", 'git commit -m "ship it"', "git push"],
    },
    {
      id: "js-regex",
      lang: "javascript",
      lines: [
        String.raw`const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;`,
        "if (email.test(input)) submit(input);",
      ],
    },
  ] as Snippet[],
};

const TONE_CLASS: Record<Tone, string> = { p: "", k: "text-amber", s: "text-pine" };

/* Depth bands for the ambient layer: back is smaller, dimmer, blurred
   and floats gently; front is sharper and travels widest. */
const DEPTH = [
  { size: [10, 11], opacity: 0.08, blur: "blur-[1.5px]", drift: 60, dur: 18 },
  { size: [12, 13], opacity: 0.14, blur: "blur-[0.5px]", drift: 90, dur: 15 },
  { size: [13, 15], opacity: 0.22, blur: "", drift: 120, dur: 12 },
] as const;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* A cinematic boot intro: an ambient field of real code floats behind
   the name, which pops in letter by letter as an amber dot hops across
   each letter; then everything hands off to the page. Client-mounted
   only (SSR and no-JS never see it), scroll locked while it plays,
   focus moved to main on exit. */
export function IntroScreen() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const snippetRefs = useRef<Array<HTMLPreElement | null>>([]);
  const masterRef = useRef<gsap.core.Timeline | null>(null);
  const driftsRef = useRef<gsap.core.Tween[]>([]);
  const ambientReleaseRef = useRef<(() => void) | undefined>(undefined);
  const overflowRef = useRef<string>("");
  const finished = useRef(false);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  /* Seeded scatter: stable across renders, calm zone kept clear
     around the center so the name always stays readable. */
  const placed = useMemo(() => {
    const rand = mulberry32(20261008);
    const list = isMobile
      ? CONFIG.snippets.slice(0, 9)
      : CONFIG.snippets;
    return list.map((snippet) => {
      let x = 50;
      let y = 50;
      for (let attempt = 0; attempt < 24; attempt++) {
        x = 8 + rand() * 82;
        y = 6 + rand() * 86;
        if (x < 24 || x > 76 || y < 28 || y > 72) break;
      }
      return { ...snippet, x, y, depth: Math.floor(rand() * 3) };
    });
  }, [isMobile]);

  function teardown() {
    if (finished.current) return;
    finished.current = true;
    driftsRef.current.forEach((tween) => tween.kill());
    driftsRef.current = [];
    if (ambientReleaseRef.current) {
      ambientReleaseRef.current();
      ambientReleaseRef.current = undefined;
    }
    /* Belt and suspenders: the scroll-lock effect restores this on
       cleanup, but teardown must never leave the page unscrollable. */
    document.body.style.overflow = overflowRef.current;
    try {
      if (CONFIG.oncePerSession) {
        window.sessionStorage.setItem(CONFIG.sessionKey, "1");
      }
    } catch {
      /* private mode — the intro simply replays next visit */
    }
    markIntroReady();
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    setGone(true);
  }

  function skip() {
    const master = masterRef.current;
    if (master && master.isActive()) {
      master.timeScale(4);
    } else {
      teardown();
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Lock page scroll while the intro owns the screen. Plain useEffect
     (not useGSAP): @gsap/react ignores callback return values, so a
     useGSAP cleanup here would never run and the page would stay
     locked. */
  useEffect(() => {
    if (!mounted || gone) return;
    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowRef.current;
    };
  }, [mounted, gone]);

  useGSAP(
    () => {
      if (!mounted || finished.current) return;
      let seen = false;
      if (CONFIG.oncePerSession) {
        try {
          seen = window.sessionStorage.getItem(CONFIG.sessionKey) === "1";
        } catch {
          seen = false;
        }
      }
      if (seen) {
        markIntroReady();
        setGone(true);
        return;
      }

      const root = rootRef.current;
      if (!root) {
        teardown();
        return;
      }
      let releaseAmbient: (() => void) | undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        /* Static take: everything already at its final state, one
           short fade, auto-exit after about 1.5s. No drift, no
           typing, no pop. */
        root
          .querySelectorAll("[data-caret], [data-dot]")
          .forEach((el) => ((el as HTMLElement).style.display = "none"));
        const rtl = gsap.timeline({ onComplete: teardown });
        masterRef.current = rtl;
        rtl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        rtl.to(root, { autoAlpha: 0, duration: 0.3 }, "+=1.2");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const letters = q(".folio-intro-letter");

        /* Cheap insurance: never let two master timelines exist. */
        if (masterRef.current) {
          masterRef.current.kill();
          masterRef.current = null;
        }
        const tl = gsap.timeline({ onComplete: teardown });
        masterRef.current = tl;
        tl.addLabel("code", 0);
        tl.addLabel("name", CONFIG.labels.nameAt);
        tl.addLabel("exit", CONFIG.labels.exitAt);

        /* Name reveal: letters pop, slide and fade in together. */
        tl.from(
          letters,
          {
            y: 24,
            opacity: 0,
            scale: 0.92,
            duration: CONFIG.letter.duration,
            ease: "back.out(1.7)",
            stagger: CONFIG.letter.stagger,
          },
          "name"
        );
        /* Hopping dot conducts the reveal: it is born on the first
           letter together with that letter's pop (one arrival, never
           two), then one full jump cycle per remaining letter — travel,
           gravity arc (slow rise, fast fall), landing squash, a beat of
           rest. Each cycle fits inside one stagger step so hops never
           overlap and stutter. */
        const dot = dotRef.current;
        const wrap = nameRef.current;
        const HOP = CONFIG.letter.stagger;
        if (dot && wrap) {
        /* Letter stops via offset* (transform-immune: the pop tween
           has already shifted getBoundingClientRect boxes). */
        const letterEls = Array.from(
          wrap.querySelectorAll(".folio-intro-letter")
        ) as HTMLElement[];
        const origin = (letterEls[0]?.offsetParent as HTMLElement | null) ?? null;
        const baseX = origin ? origin.offsetLeft : 0;
        const baseY = origin ? origin.offsetTop : 0;
        const stops = letterEls.map((letter) => ({
          x: baseX + letter.offsetLeft + letter.offsetWidth / 2,
          y: baseY + letter.offsetTop,
        }));
          if (stops.length > 0) {
            gsap.set(dot, {
              xPercent: -50,
              yPercent: -50,
              x: stops[0].x,
              y: stops[0].y - 6,
              scale: 0,
            });
            tl.to(
              dot,
              { scale: 1, duration: 0.25, ease: "back.out(2)" },
              "name+=0.05"
            );
            stops.slice(1).forEach((stop, index) => {
              const at = `name+=${(0.45 + index * HOP).toFixed(3)}`;
              tl.to(
                dot,
                { x: stop.x, duration: 0.32, ease: "power1.inOut" },
                at
              );
              tl.to(
                dot,
                { y: stop.y - 46, duration: 0.17, ease: "power2.out" },
                at
              );
              tl.to(
                dot,
                { y: stop.y - 6, duration: 0.15, ease: "power2.in" },
                `${at}+=0.17`
              );
              tl.to(
                dot,
                {
                  scaleY: 0.7,
                  scaleX: 1.25,
                  duration: 0.08,
                  ease: "power2.out",
                },
                `${at}+=0.32`
              );
            });
            tl.to(
              dot,
              { scale: 0, duration: 0.3, ease: "back.in(2)" },
              `name+=${(0.75 + (stops.length - 1) * HOP).toFixed(3)}`
            );
          }
        }
        /* Amber rule draws once the dot is gone. */
        tl.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power3.out" },
          "name+=2.6"
        );

        /* Ambient typing: 4 snippets type themselves, carets fade out. */
        const typed = placed.filter((snippet) => snippet.typed);
        tl.set(q("[data-typed]"), { autoAlpha: 0 }, 0);
        typed.forEach((snippet, index) => {
          const el = root.querySelector<HTMLElement>(
            `[data-typed="${snippet.id}"]`
          );
          const caret = root.querySelector<HTMLElement>(
            `[data-caret="${snippet.id}"]`
          );
          if (!el) return;
          const full = (snippet.lines as string[]).join("\n");
          const counter = { n: 0 };
          const at = `code+=${0.4 + index * 0.5}`;
          tl.call(
            () => {
              el.textContent = "";
            },
            undefined,
            at
          );
          tl.to(el, { autoAlpha: 1, duration: 0.25 }, at);
          tl.to(
            counter,
            {
              n: full.length,
              duration: Math.max(0.5, full.length * 0.02),
              ease: "none",
              onUpdate: () => {
                el.textContent = full.slice(0, Math.round(counter.n));
              },
            },
            `${at}+=0.1`
          );
          if (caret) tl.to(caret, { autoAlpha: 0, duration: 0.25 }, ">");
        });

        /* Exit: code dims, name settles and fades, intro wipes into
           the real page background underneath (active theme intact). */
        tl.to(codeRef.current, { autoAlpha: 0, duration: 0.5 }, "exit");
        tl.to(
          nameRef.current,
          { scale: 0.96, autoAlpha: 0, duration: 0.6, ease: "power2.in" },
          "exit+=0.1"
        );
        tl.to(
          root,
          { autoAlpha: 0, duration: 0.7, ease: "power1.out" },
          "exit+=0.2"
        );

        /* Slow ambient drift with depth-based parallax. */
        const drifts: gsap.core.Tween[] = [];
        snippetRefs.current.forEach((el, index) => {
          if (!el) return;
          const band = DEPTH[placed[index].depth];
          drifts.push(
            gsap.to(el, {
              x: gsap.utils.random(-band.drift, band.drift),
              y: gsap.utils.random(-band.drift, band.drift),
              rotation: gsap.utils.random(-3, 3),
              duration: gsap.utils.random(band.dur * 0.85, band.dur * 1.15),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: gsap.utils.random(0, 2),
            })
          );
        });
        driftsRef.current = drifts;

        /* Subtle mouse parallax, desktop pointers only. */
        let removePointer: (() => void) | undefined;
        if (window.matchMedia("(pointer: fine)").matches) {
          const layer = codeRef.current;
          if (layer) {
            const setX = gsap.quickTo(layer, "x", {
              duration: 0.9,
              ease: "power2.out",
            });
            const setY = gsap.quickTo(layer, "y", {
              duration: 0.9,
              ease: "power2.out",
            });
            const onMove = (event: PointerEvent) => {
              setX((event.clientX / window.innerWidth - 0.5) * 24);
              setY((event.clientY / window.innerHeight - 0.5) * 24);
            };
            window.addEventListener("pointermove", onMove);
            removePointer = () => {
              window.removeEventListener("pointermove", onMove);
              gsap.killTweensOf(layer);
            };
          }
        }

        /* Pause everything while the tab is hidden. */
        const onVisibility = () => {
          const paused = document.hidden;
          if (paused) {
            tl.pause();
            driftsRef.current.forEach((tween) => tween.pause());
          } else {
            tl.resume();
            driftsRef.current.forEach((tween) => tween.resume());
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        releaseAmbient = () => {
          document.removeEventListener("visibilitychange", onVisibility);
          if (removePointer) removePointer();
          mm.revert();
        };
        ambientReleaseRef.current = releaseAmbient;
      });
    },
    { scope: rootRef, dependencies: [mounted] }
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") skip();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || gone) return null;

  return (
    <section
      ref={rootRef}
      aria-label="Site introduction"
      onClick={skip}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-paper"
    >
      {/* Ambient code field: decorative, never interactive. */}
      <div
        ref={codeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {placed.map((snippet, index) => {
          const band = DEPTH[snippet.depth];
          return (
            <pre
              key={snippet.id}
              ref={(el) => {
                snippetRefs.current[index] = el;
              }}
              style={{
                left: `${snippet.x}%`,
                top: `${snippet.y}%`,
                fontSize: `${isMobile ? band.size[0] : band.size[1]}px`,
                opacity: band.opacity,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 leading-relaxed font-mono will-change-transform select-none ${band.blur}`}
            >
              <code
                className="text-ink"
                {...(snippet.typed
                  ? { "data-typed": snippet.id }
                  : {})}
              >
                {snippet.lines.map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {typeof line === "string"
                      ? line
                      : line.map(([text, tone], partIndex) => (
                          <span key={partIndex} className={TONE_CLASS[tone]}>
                            {text}
                          </span>
                        ))}
                  </span>
                ))}
              </code>
              {snippet.typed && (
                <span
                  data-caret={snippet.id}
                  className="mt-1 block h-3.5 w-[7px] bg-ink/60"
                />
              )}
            </pre>
          );
        })}
      </div>

      {/* The name: one announcement, letters purely visual. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div ref={nameRef} className="relative will-change-transform">
          <span className="sr-only">{CONFIG.name}</span>
          <span
            ref={dotRef}
            aria-hidden="true"
            data-dot="true"
            className="absolute top-0 left-0 h-3 w-3 rounded-full bg-amber will-change-transform"
          />
          <span
            aria-hidden="true"
            className="relative block overflow-hidden font-display text-[clamp(3.5rem,14vw,8.5rem)] leading-none font-semibold text-ink"
          >
            {CONFIG.name.split("").map((letter, index) => (
              <span key={index} className="folio-intro-letter inline-block">
                {letter}
              </span>
            ))}
          </span>
          <span
            ref={ruleRef}
            className="mt-4 block h-[1px] w-full origin-left bg-amber"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute right-5 bottom-5 min-h-[44px] rounded-md border border-line px-4 py-2 text-sm text-ink/80 transition-colors duration-200 hover:border-amber hover:text-amber-deep"
      >
        Skip intro
      </button>
    </section>
  );
}
