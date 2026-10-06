# Version

Current release: **0.1.0** (source of truth: `version` in `package.json`).

## Stack

| Piece | Version |
| --- | --- |
| Next.js (App Router, static export) | ^16.3.8 |
| React / React DOM | ^19.3.0 |
| Tailwind CSS (+ PostCSS plugin) | ^4.3.3 |
| GSAP / @gsap/react | ^3.15.0 / ^2.1.2 |
| lucide-react | ^1.49.0 |
| TypeScript | ^5 |
| Node (built and tested) | 24 (requires 20+) |

Design system: Sketch (see `DESIGN.md`). Hosting target: Vercel (`output: "export"`).

## Releasing a new version

1. Bump `version` in `package.json` (and let `package-lock.json` follow via `npm install`).
2. Update the version number at the top of this file.
3. Move the `Unreleased` entries in `changes.md` under a new `## <version> — <date>` heading.
