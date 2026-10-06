# Portfolio — Sketch style

Personal portfolio site for a computer science graduate student, built in
the **Sketch** design system (warm cream paper, dashed pencil outlines,
offset pencil shadows, pill controls, handwritten type, one teal marker
accent). Next.js (App Router) + TypeScript + Tailwind CSS, statically
exported so it deploys to Vercel or GitHub Pages with no server.

Visual source of truth: `DESIGN.md` (tokens, components, QA) and
`SKILL.md` (how to apply the system). If code and `DESIGN.md` disagree,
`DESIGN.md` wins. `AGENTS.md` holds the working rules for AI agents.

> Status: content is personalized from the owner's resume. Sections with
> no real data yet (experience timeline, coursework, certificates,
> project links) stay hidden automatically — add the data and they
> render. Nothing here invents facts.

## Setup

Requires Node.js 20+ (built and tested with Node 24).

```bash
npm install
npm run dev      # local dev server at http://localhost:3000
npm run build    # type-check + static export into out/
npm run start    # serve the production build locally
npm run contrast # WCAG contrast check for every pair the site relies on
```

On Windows machines where `npm.ps1` is blocked by the execution policy,
call `npm.cmd` directly (e.g. `npm.cmd run build`).

## Editing content

All site copy lives in typed files under `content/`. Updating content
never requires touching components.

| File | What to fill in |
| --- | --- |
| `content/site.ts` | Name, tagline, degree, school, bio, currently-list, email, socials, CV link |
| `content/projects.ts` | 3–6 projects: summary, problem, approach, role, stack, outcome, architecture stages, results, learnings, links |
| `content/experience.ts` | Internships, RA/TA roles with impact bullets |
| `content/education.ts` | Degrees and relevant coursework |
| `content/publications.ts` | Real citations only. The Research section renders only when this list is non-empty |
| `content/skills.ts` | Grouped skills plus awards/talks/open source |

## How to add a project

1. Add an entry to the `projects` array in `content/projects.ts`.
2. `slug` must be URL-safe: lowercase letters, numbers, and hyphens
   only (e.g. `ml-pipeline`). Brackets, spaces, and special characters
   break static export — the detail page will 404.
3. `areas` picks the home-page filter chips: `"ML"`, `"Systems"`,
   `"Web"`, `"Research"`.
4. `architecture` is an array of columns; each column lists stage boxes,
   drawn left-to-right with pencil arrows.
5. `results` renders as a table; entries with a numeric `value` (0–100)
   also get a labeled bar in the chart. Omit `value` for text-only results.
6. Run `npm run build` — the new page at `/projects/<slug>` is generated
   automatically, and `sitemap.xml` picks it up.

## CV downloads

The "Download CV" buttons point at `/cv` (a page mirroring the CV). To
serve a real PDF: save it as `public/cv.pdf`, then set `cvHref: "/cv.pdf"`
in `content/site.ts`.

## Deploy (Vercel)

Vercel is the hosting target. The app uses `output: "export"`, so Vercel
serves it as fully static files — no server configuration needed.

1. Push this repo to GitHub (see note below), then import it in Vercel.
   The Next.js preset auto-detects everything: build command
   `npm run build`, output handled from `next.config.ts`.
2. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the real
   domain (e.g. `https://your-name.vercel.app` or a custom domain) in
   the Vercel project settings, then redeploy. Without it, sitemap and
   social-card URLs fall back to a placeholder.
3. Custom domains and HTTPS are handled in the Vercel dashboard.

Push prerequisite: the push to GitHub is currently blocked (403 for the
cached credential — see project notes). Unblock that first; Vercel
imports from the GitHub repo.

## Deploy (GitHub Pages, alternative)
directory. `public/.nojekyll` is already included. For a *project* site
(`username.github.io/portfolio/`), set `basePath: "/portfolio"` in
`next.config.ts` before building.

`/styleguide` is a review-only primitive showcase, unlinked from
navigation. Delete `app/styleguide/` before deploying if you do not want
it public.

## Verification

- `npm run build` — production build, TypeScript check, and static
  export (12 routes: home, CV, 4 case studies, styleguide, 404, OG
  image, sitemap, robots).
- `npm run contrast` — measured (not assumed) contrast ratios; fails the
  run if any required pair drops below its threshold.
- Emitted HTML spot-checked: one `<h1>` per page, skip link, JSON-LD
  `Person` schema, `aria-hidden` illustrations, labeled SVG diagram with
  a text fallback.

Known limits of this environment (no browser available): Lighthouse
scores, runtime console errors, and visual responsive checks at
375/768/1024/1440px were not run here — verify them in a browser before
announcing the site. See the QA checklists in `DESIGN.md` and `SKILL.md`.

## Decisions where Sketch overrode other guidance

- The `ui-ux-pro-max` skill's generated system suggested Brutalism, a blue
  accent, and Caveat/Quicksand type. Rejected everywhere: pills, pencil
  shadows, teal marker, and Delicious Handrawn + JetBrains Mono per
  `DESIGN.md`. Adopted only style-neutral guidance (page pattern,
  breakpoints, a11y priorities, SSG practices).
- Focus is a double pencil stroke (3px teal outline + 3px ink outer ring)
  instead of teal alone, because teal measures 2.41:1 on cream. The ink
  ring carries the WCAG 2.2 AA indicator; `DESIGN.md` explicitly asks for
  contrast to be verified and adjusted rather than guessed.
- `next dev` auto-appends a managed `nextjs-agent-rules` block to
  `AGENTS.md`. It is kept as-is; project rules live outside its markers.
