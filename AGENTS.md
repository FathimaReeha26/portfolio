# AGENTS.md

Personal portfolio site built in the **Folio** design system: an editorial, print-like interface on warm paper with serif headlines and one amber accent.

## Canonical references

Read these before writing any UI. They are the source of truth — do not restate or invent tokens here.

- `DESIGN.md` — tokens, CSS variables, component specs, motion rules, accessibility baseline, QA checklist.
- `SKILL.md` — how to apply the system, anti-patterns, QA checklist.

If code and `DESIGN.md` disagree, `DESIGN.md` wins. Fix the code, not the doc.

`files.zip` is a duplicate archive of the original Sketch `SKILL.md` and `DESIGN.md`. It is kept for history only. Never edit inside it.

## Hard rules

These are the failures that matter most. Full detail lives in the reference files.

1. Page background is paper `#FAF6EF`, one light theme. Text is ink `#201A15`.
2. Amber `#B45309` marks primary actions, focus, selection, progress, key links, and rules only — never body copy, never every icon and border.
3. Pine `#24473B` inverts sparingly (footer, at most one feature card per page), always with paper text.
4. Surfaces are flat: 1px `line` borders, radii 8/12/18px, whitespace for structure. No shadows, gradients, glassmorphism, or 3D effects anywhere.
5. Fraunces for display with one italic amber accent per headline; Inter for everything else with tabular numerals for facts. No third typeface, no monospace, no all-caps labels.
6. Projects are ruled index rows, never card grids. Numbers only where a real sequence exists.
7. Every interactive element has `hover`, `focus-visible`, `active`, and `disabled` states, plus `loading` and `error` where relevant.
8. Color is never the only state indicator — pair it with text, an icon, a check mark, an underline, or an outline change.
9. Labels are always visible. Placeholders never replace labels. Errors link to fields via `aria-invalid` and `aria-describedby`.
10. Focus is a 3px amber outline with offset, never removed, never a faint glow.
11. Motion: one sub-1.4s intro per session (skippable, client-mounted only), hero chained after it, `once` scroll reveals. `useGSAP` with scope, SSR-safe, reverted on cleanup, reduced-motion guards with static final states, no production markers. Content reads without JS.
12. Decorative marks get `aria-hidden="true"`, never intercept pointer events, and never cover text, controls, or focus outlines.
13. Respect `prefers-reduced-motion` in CSS and GSAP.
14. Copy is plain, specific, confident. No invented facts, metrics, or publications.

## Workflow

1. Define the CSS variables from `DESIGN.md` once at `:root` and in the Tailwind `@theme`. Reference tokens in components — no scattered raw hex values.
2. Set `body` to `--paper` background, `--ink` text, Inter at 17px / 1.65.
3. Build layout on whitespace rhythm, then components from the variants in `DESIGN.md`.
4. Verify contrast for every foreground/background pair you introduce (`npm run contrast`), especially paper on amber, paper on pine, and amber on paper.
5. Run the QA checklists at the end of `DESIGN.md` and `SKILL.md` before delivering.

## Copy

Clear, friendly, specific. Errors say what happened and how to recover; destructive actions state their consequences; empty states say what is missing and offer one clear next step.

## Commands

Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + GSAP (+ @gsap/react), statically
exported (`output: "export"`, images unoptimized) into `out/`.

- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:3000)
- Production build + type-check + static export: `npm run build`
- Serve the build locally: `npm run start`
- Contrast check (measured ratios, fails on violation): `npm run contrast`
- Deploy to production: `vercel --prod --yes` (project `reeha1/portfolio`)

Environment notes: Node lives at `C:\Program Files\nodejs` and is not on
`PATH`; the `npm.ps1`/`npx.ps1` shims are blocked by the execution policy,
so invoke `node`, `npm.cmd`, and `npx.cmd` with the directory on `PATH`
(Vercel CLI via `%APPDATA%\npm\vercel.cmd`). `next dev` auto-appends a
managed `nextjs-agent-rules` block to this file; keep that block untouched
and put project rules outside its markers. Dynamic route slugs must be
URL-safe (lowercase, numbers, hyphens) — brackets and special characters
make static export emit 404 pages. `vercel.json` pins the Vercel build
(`npm run build` → `out/`) with `cleanUrls` for the static routes.

## Scope

This is a personal portfolio. Content changes are expected and welcome; the visual system is not. History: the site launched in the Sketch system; the owner explicitly requested a full redesign, and Folio replaced it (DESIGN.md, SKILL.md, and these rules rewritten; `files.zip` preserves the originals). Treat any further change to `DESIGN.md` or `SKILL.md` as a deliberate decision and call it out explicitly rather than making it quietly.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
