# Changes

Changelog for the portfolio site. Newest first. `Unreleased` tracks work
that is in the working tree but not committed yet.

## Unreleased

- Added GSAP animation dependencies (`gsap`, `@gsap/react`).
- Added intro screen: `components/IntroScreen.tsx` with `lib/introBus.ts` event bus.
- Reworked control components (`Button`, `Card`, `Chip`, `Input`, `Spinner`, `Textarea`) and trimmed `app/globals.css`.
- Updated `app/layout.tsx` and `public/favicon.svg`.

## 2026-10-06

- Enable clean URLs for static export routes (`66780b3`).
- Untrack agent-tooling files (`.agents`, `skills-lock.json`) (`83f37e3`).
- Polish pass: fewer doodles, no section dividers, un-carded skills (`46023ae`).
- Personalize portfolio from owner resume; hide empty sections (`df43aaf`).
- Fix Vercel deploy: explicit build command and output directory (`c12f67d`).

## 2026-10-01

- Docs: mark Vercel as the hosting target (`4b57ef6`).

## 2026-09-30

- Build Sketch-style CS portfolio: Next.js static export with placeholder content (`01cee27`).
