# AGENTS.md

Personal portfolio site built in the **Sketch** design system: a warm, hand-drawn, sketchbook-style interface on cream paper.

## Canonical references

Read these before writing any UI. They are the source of truth — do not restate or invent tokens here.

- `DESIGN.md` — tokens, CSS variables, component specs, accessibility baseline, QA checklist.
- `SKILL.md` — how to apply the system, anti-patterns, migration order, QA checklist.

If code and `DESIGN.md` disagree, `DESIGN.md` wins. Fix the code, not the doc.

`files.zip` is a duplicate archive of `SKILL.md` and `DESIGN.md`. Never edit inside it.

## Hard rules

These are the failures that matter most. Full detail lives in the reference files.

1. Page background is cream `#F4EDE0`. Cards, modals, and inputs are white. Never pure white or cold gray as the canvas.
2. Text is `#111827`. Never important text in low-opacity graphite.
3. Teal `#1DAD97` marks actions, focus, selection, and progress only — not every heading, icon, and border.
4. Cards and callouts use `2px dashed` graphite outlines. Inputs, buttons, and selected/focused items use solid outlines.
5. Shadows are hard offset pencil shadows (`3px`/`6px`/`9px`, no blur, `rgba(17,24,39,0.18)`). No soft SaaS elevation, no heavy neobrutalism.
6. Controls are pills (`999px`). Multiline textareas use 16–20px.
7. Spacing only from `4 / 8 / 12 / 16 / 24 / 32`. Type only from `12 / 14 / 16 / 20 / 24 / 32`. No one-off values.
8. `Delicious Handdrawn` for primary and display type, `cursive` fallback. `JetBrains Mono` only for code, IDs, and technical values.
9. Every interactive element has `hover`, `focus-visible`, `active`, and `disabled` states, plus `loading` and `error` where relevant.
10. Color is never the only state indicator — pair it with text, an icon, a check mark, an underline, or an outline change.
11. Labels are always visible. Placeholders never replace labels. Errors link to fields via `aria-invalid` and `aria-describedby`.
12. Focus is a double pencil stroke — 3px teal outline plus a 3px ink outer ring — because teal alone falls below 3:1 on cream. Never a faint glow, never hidden behind a dashed border.
13. Decorative illustrations get `aria-hidden="true"`, never intercept pointer events, and never cover text, controls, or focus outlines.
14. Respect `prefers-reduced-motion`. No gradients, glassmorphism, or 3D effects anywhere.

## Workflow

1. Define the CSS variables from `DESIGN.md` once at `:root`. Reference tokens in components — no scattered raw hex values.
2. Set `body` to `--paper` background, `--ink` text, `--font-primary` at 16px / 1.6.
3. Build layout on the spacing scale, then components from the variants in `DESIGN.md`.
4. Add illustration only where it clarifies; skip it by default.
5. Verify contrast for every foreground/background pair you introduce, especially teal on cream, teal on white, and white on teal.
6. Run the QA checklists at the end of `DESIGN.md` and `SKILL.md` before delivering.

## Copy

Clear, friendly, specific. No `Submit`, `Click here`, `Go`, or `Oopsie`. Errors say what happened and how to recover; destructive actions state their consequences; empty states say what is missing and offer one clear next step.

## Commands

Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, statically
exported (`output: "export"`, images unoptimized) into `out/`.

- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:3000)
- Production build + type-check + static export: `npm run build`
- Serve the build locally: `npm run start`
- Contrast check (measured ratios, fails on violation): `npm run contrast`

Environment notes: Node lives at `C:\Program Files\nodejs` and is not on
`PATH`; the `npm.ps1`/`npx.ps1` shims are blocked by the execution policy,
so invoke `node`, `npm.cmd`, and `npx.cmd` with the directory on `PATH`.
`next dev` auto-appends a managed `nextjs-agent-rules` block to this file;
keep that block untouched and put project rules outside its markers.
Dynamic route slugs must be URL-safe (lowercase, numbers, hyphens) —
brackets and special characters make static export emit 404 pages.

## Scope

This is a personal portfolio. Content changes are expected and welcome; the visual system is not. Treat a change to `DESIGN.md` or `SKILL.md` as a deliberate decision and call it out explicitly rather than making it quietly.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
