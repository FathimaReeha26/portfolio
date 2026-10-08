# Folio Design System

Folio is an editorial portfolio system: warm paper, confident serif headlines, one amber accent, quiet bordered surfaces, generous whitespace. It should read as a well-printed folio — credible to recruiters, personal without being cute, structured without feeling templated.

Use this file as the token and component reference. See `SKILL.md` for how to apply it.

---

## 1. Color

| Token | Light | Dark (`html.dark`) | Purpose |
| --- | --- | --- | --- |
| `paper` | `#FAF6EF` | `#171310` | Page canvas |
| `ink` | `#201A15` | `#F5EEE3` | Primary text, borders, dark fills |
| `amber` | `#B45309` | `#E2953F` | The one accent: primary actions, focus, selection, key links, rules, marks |
| `amber-deep` | `#8A3F06` | `#C07F31` | Amber hover states and small amber text needing extra contrast |
| `amber-soft` | `rgba(180, 83, 9, 0.12)` | `rgba(226, 149, 63, 0.25)` | Selected washes, link hover fills |
| `pine` | `#24473B` | `#24473B` | Inverted surfaces: footer, feature cards |
| `sand` | `#ECE2CE` | `#262019` | Quiet tinted panels |
| `line` | `rgba(32, 26, 21, 0.16)` | `rgba(245, 238, 227, 0.16)` | Borders and dividers |
| `success` | `#2E7D32` | `#86C989` | Real positive states only |
| `danger` | `#C62828` | `#E78D8D` | Errors and destructive actions only |
| `cream` | `#FAF6EF` | `#FAF6EF` | Constant: light text on pine surfaces |
| `boot` | `#201A15` | `#201A15` | Constant: boot screen background |

### Usage principles

1. **Two themes, one system.** Light paper by default; dark flips the page to warm near-black via `html.dark`. A sun/moon toggle in the nav switches themes, persists the choice, and stays in sync across tabs; without a stored choice it follows the OS. Pine, cream, and boot stay constant — pine surfaces and the boot screen remain dark in both themes.
2. **Ink carries everything.** Body, labels, borders, dark fills.
3. **Amber is rationed.** Primary CTAs, focus rings, selection, results/progress, heading rules, the pulse mark, key-link underlines. Never body text at small sizes without checking contrast; never every icon and border.
4. **Pine inverts.** Footer and one feature card per page at most. Paper text on pine in light, cream text on pine in dark.
5. **Depth from borders and space, never shadows.** No soft SaaS elevation, no gradients, no glass.

```css
:root {
  --paper: #FAF6EF;
  --ink: #201A15;
  --amber: #B45309;
  --amber-deep: #8A3F06;
  --amber-soft: rgba(180, 83, 9, 0.12);
  --pine: #24473B;
  --sand: #ECE2CE;
  --line: rgba(32, 26, 21, 0.16);
  --success: #2E7D32;
  --danger: #C62828;
  --focus: #B45309;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.65;
}
```

---

## 2. Typography

| Role | Font | Usage |
| --- | --- | --- |
| Display | Fraunces | Hero, section and card titles, empty states, intro name |
| Body/UI | Inter | Everything else, including facts (tabular numerals) |
| Intro code | System monospace stack | Ambient code in the boot intro only — never UI labels |

- Italic is reserved for **one accent word per headline**, in amber.
- Scale: `12 / 14 / 17 / 20 / 24 / 32 / 44 / 60px`. Body is 17px. Display: hero 44–60, sections 32, cards 20–24.
- Tight display tracking (`-0.02em`), body measure ≤ 70ch, sentence case, no all-caps labels.
- No third loaded typeface. Monospace appears only as unloaded system fonts inside the boot intro's decorative code field — never in UI, labels, or body copy.

---

## 3. Spacing and shape

Spacing from the 4px scale; section rhythm from whitespace (`gap-16/20`, generous `py`), not dividers. Radius: `8px` chips and small controls, `12px` buttons and inputs, `18px` panels. Borders are 1px `line`; selected states use amber. Nothing fully round except dots and the pulse mark.

---

## 4. Components

- **Button:** primary is amber fill with paper text; secondary is bordered paper; tertiary is an amber-underlined text button; destructive is danger fill. 48px minimum, `hover` darkens or adds border, `active` presses 1px, `disabled` goes sand, `loading` pairs the spinner with text.
- **Project index rows:** ruled rows (top border, last row also bottom), area tag in amber-deep, display title, summary, stack chips, result line, "Read case study" link with an arrow that nudges on hover. Never cards-in-a-grid.
- **Timeline:** single line, amber nodes, tabular dates. Numbers only where a real sequence exists.
- **Chips:** small bordered labels; selected is an ink fill **plus** a check mark.
- **Forms:** visible labels, amber focus border, errors in ink with a danger icon, linked via `aria-invalid` + `aria-describedby`.
- **Modal:** paper panel, traps and returns focus, Escape closes.
- **Alerts:** quiet panel with a colored bar, icon, and text label — never color alone.
- **Tables:** quiet dividers, tabular values; numeric results may add labeled amber bars with the numbers still printed.

---

## 5. Motion (GSAP)

One orchestrated moment per page load, everything else answers scroll:

1. **Boot intro** (every full page load, about 4–5 seconds): an ambient field of real, valid code drifts at low opacity behind the name, which pops in letter by letter in cream Fraunces with a 1px amber rule and one shine sweep; a mono sub-line types out; then code dims, the name settles, and the boot background fades into the page. Skippable via a visible Skip control, backdrop click, or Escape (fast-forwards, never cuts). Mounts client-side only, so SSR and no-JS users never see it. Reduced motion gets a static 300ms fade and auto-exit. Scroll locks during play; focus moves to main on exit. Tune copy and timing in the config at the top of `components/IntroScreen.tsx`.
2. **Hero** chained after the intro: headline lines rise inside overflow masks, supporting elements fade up staggered.
3. **Scroll reveals** (`ScrollTrigger.batch`, `once`): short fade with a 14px rise; heading rules draw via `scaleX`.
4. Hovers are CSS micro-transitions (200ms): arrow nudges, borders darken, fills shift.

Rules: `useGSAP` with scope, never during SSR, `ctx.revert` cleanup, `gsap.matchMedia` reduced-motion guards rendering the final static state, no markers in production, content always readable with JS disabled (animate *from*, never hide by default).

---

## 6. Accessibility (WCAG 2.2 AA baseline)

- Text pairs meet AA in both themes (ink on paper/sand, paper on amber/pine, amber on paper, and the dark-theme counterparts). Verify with `npm run contrast`.
- Amber 3px focus ring with offset everywhere; never removed.
- Color never the only indicator; form errors programmatically linked; semantic HTML; 44px+ targets; decorative marks `aria-hidden`.
- Reduced motion respected in CSS and GSAP; meaning preserved statically.

---

## 7. Content and tone

Plain, specific, confident. Actions say what happens ("View projects", "Download CV"). Errors say what happened and how to recover. Empty states say what is missing and offer one step. Sentence case, active voice, no filler.

---

## 8. Anti-patterns

- Cream `#F4EDE0`, teal, handwriting fonts, dashed outlines, pencil shadows, pill controls (retired with Sketch)
- Navy/slate + blue CTA minimalism; black + acid accents; broadsheet hairlines; SaaS card grids; gradients, glass, soft shadows
- ALL-CAPS eyebrows, middle-dot meta strings, em-dash label fragments, monospace UI labels, arrows appended to every link
- Auto-playing motion beyond the single intro; scroll-jacking, page-level parallax, layout shift (the intro's own ambient drift is the one exception)
- Teal-style overuse of amber: one accent means one

---

## 9. QA checklist

**Visual:** paper canvas, ink text, amber rationed to actions/focus/selection/progress/rules, pine used sparingly, flat bordered surfaces, generous whitespace, Fraunces display with single italic accents, Inter body ≤70ch.
**Components:** amber primary buttons with all states; index rows (not card grids); cardless timeline; chips with check-marked selection; labeled forms with linked errors; focus-trapping modal; labeled alerts; readable responsive tables.
**Motion:** boot intro ~4–5s on every load with visible skip, absent without JS and static under reduced motion; hero chained; reveals once; no markers; no layout shift; focus to main on exit.
**Accessibility:** AA contrast verified by script; visible amber focus; no color-only state; semantic HTML; 44px targets; reduced motion honored; decorative marks hidden.
**Content:** specific CTAs, recovery-led errors, helpful empty states, no invented facts.
