---
name: folio-design
description: Use this skill for UI that should feel like a well-printed folio — warm paper, confident Fraunces serif headlines with one amber italic accent, a single amber action color, quiet bordered surfaces, generous whitespace, and restrained GSAP motion (one intro moment, scroll reveals). Applies to portfolios, personal sites, case studies, and docs. Read DESIGN.md in this folder for the full token and component specification.
---

# Folio Design Skill

Folio makes interfaces feel editorial: credible, calm, and human. The personality comes from typography (a serif with opinions), one confident accent, and restraint — not from decoration, effects, or motion sprawl.

**Always read `DESIGN.md` first** for exact tokens, CSS variables, component specs, motion rules, and states. This file tells you how to apply them.

## When to use

- The user asks for a Folio, editorial, print-like, or refined professional look.
- The product is personal or content-led and should feel credible, not templated.
- You are reviewing generated UI against the Folio rules.

## The look in seven rules

1. **Dark by default — paper on demand.** Warm near-black `#171310` canvas out of the box; a sun/moon toggle in the nav switches to warm `#FAF6EF` paper, persists, and syncs across tabs.
2. **Ink carries everything.** `#201A15` text, borders, and dark fills.
3. **Amber is rationed.** `#B45309` for primary actions, focus, selection, progress, key links, and rules only.
4. **Pine inverts sparingly.** `#24473B` footer and at most one feature card per page, paper text on it in light and cream text in dark.
5. **Surfaces are flat.** 1px `line` borders, 8/12/18px radii, generous whitespace. No shadows, gradients, or glass.
6. **Type does the talking.** Fraunces display with one italic amber accent per headline; Inter body at 17px, ≤70ch.
7. **Motion answers scroll.** One boot intro per load (~4–5s, visible skip), hero chained after it, `once` reveals; static and readable without motion.

## Typography

- **Fraunces** for display only (hero, section/card titles, empty states), tight tracking, italic reserved for a single accent word.
- **Inter** for everything else, tabular numerals for facts and dates.
- Scale: **12 / 14 / 17 / 20 / 24 / 32 / 44 / 60px**. Sentence case, no all-caps labels, no third loaded typeface; system monospace only for decorative intro code, never UI.

## Spacing and layout

Left-aligned, whitespace-structured sections (`gap-16/20`), no decorative dividers. Projects are ruled index rows, never card grids. Numbers only where a real sequence exists (timelines, steps).

## Implementation workflow

1. Define the CSS variables from `DESIGN.md` once at `:root` and in the Tailwind `@theme`. Reference tokens, never raw hex.
2. Set `body` to paper/ink, Inter 17px/1.65.
3. Build sections with whitespace rhythm, then components from the variants in `DESIGN.md`.
4. Add GSAP in this order: intro screen, chained hero, `once` scroll reveals, CSS hovers. Guard everything with reduced-motion checks; content must read without JS.
5. Verify contrast with `npm run contrast` and run the QA checklist at the end of this file before delivering.

## Components at a glance

| Component | Key treatment |
| --- | --- |
| Primary button | Amber fill, paper text, 48px, presses 1px, action-oriented label |
| Project row | Ruled row, amber-deep area tag, display title, chips, result line, nudging arrow link |
| Card | Flat bordered panel; sand tint or pine inversion where meaning demands it |
| Input | Bordered, amber focus border, visible label, linked errors |
| Chips and filters | Small bordered labels; selected = ink fill **plus** check mark |
| Navigation | Quiet text links, amber underline; active is semibold + underlined + `aria-current` |
| Modal | Paper panel; traps and returns focus, Escape closes |
| Alerts | Quiet panel, colored bar + icon + text label |
| Empty state | Calm canvas, pulse mark, plain heading, one amber action |
| Tables | Quiet dividers, tabular values, labeled amber bars at most |

## Motion details

- Intro: ambient field of real code, cream name reveal with hopping amber dot and amber rule, typed mono sub-line, themed handoff; every full page load; Skip control, backdrop click, and Escape fast-forward; client-mounted only.
- Hero: masked-line rise + staggered fades, chained on intro completion.
- Reveals: `ScrollTrigger.batch`, `opacity/y:14`, `power1.out`, `once:true`, `start:"top 90%"`.
- Rules draw via `scaleX` on scroll. Hovers are 200ms CSS. No markers in production. `useGSAP` with scope, SSR-safe, reverted on cleanup.

## Accessibility (non-negotiable, WCAG 2.2 AA)

- Verify every pair with the contrast script; amber text and paper-on-amber must pass.
- 3px amber focus ring with offset, never removed.
- Color never the only indicator; errors linked; semantic HTML; 44px+ targets; `prefers-reduced-motion` honored in CSS and GSAP with static final states.

## Copy and tone

Plain, specific, confident. Actions say what happens; errors say what happened and how to recover; empty states say what is missing and offer one step.

## Anti-patterns

- Sketch remnants: cream, teal, handwriting, dashes, pencil shadows, pills
- Generic defaults: navy minimalism, dark+acid, broadsheet hairlines, card grids, gradients, glass, soft shadows
- Template chrome: all-caps eyebrows, middle-dot metas, em-dash labels, mono data labels, arrows on every link
- Amber everywhere; motion beyond the single intro moment; scroll-jacking; parallax; layout shift

## QA checklist

**Visual system**
- [ ] Paper canvas, ink text, amber only for actions/focus/selection/progress/rules — in both themes
- [ ] Pine used sparingly with paper/cream text; flat bordered surfaces; generous whitespace
- [ ] Theme toggle present, labeled, persisted, and synced; no flash on load
- [ ] Fraunces display with single italic accents; Inter body ≤70ch; tabular facts

**Components**
- [ ] Amber primary buttons with all states and action-oriented labels
- [ ] Ruled project rows, cardless timeline, check-marked chip selection
- [ ] Labeled forms with linked errors; focus-trapping modal; labeled alerts
- [ ] Helpful empty states; readable responsive tables

**Motion**
- [ ] Boot intro ~4–5s on every load with visible skip, absent without JS, static under reduced motion
- [ ] Hero chained; reveals fire once; no markers; no layout shift

**Accessibility**
- [ ] AA contrast verified by script, visible amber focus, no color-only state
- [ ] Semantic HTML, 44px targets, reduced motion honored, marks hidden

**Content**
- [ ] Specific CTAs; recovery-led errors; no invented facts

## Example prompts this skill should handle

- "Build a portfolio home page in the Folio system with an intro screen and scroll reveals."
- "Add a case-study template with an architecture diagram and results table."
- "Audit this UI against the Folio rules and list required changes."
