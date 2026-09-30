---
name: sketch-design
description: Use this skill whenever building, restyling, or reviewing UI that should feel hand-drawn, warm, and friendly — a digital sketchbook on cream paper with soft teal marker accents, dashed outlines, chunky offset pencil shadows, rounded pill controls, and handwritten typography. Applies to landing pages, dashboards, onboarding flows, forms, empty states, settings screens, education tools, creative apps, and docs. Read DESIGN.md in this folder for the full token and component specification.
---

# Sketch Design Skill

Sketch makes interfaces feel like a thoughtful product drawn into a notebook: soft, tactile, approachable, and intentionally imperfect, yet still structured, readable, and accessible. The personality comes from warm paper, pencil-like lines, and a single friendly marker color, not from gradients, glass, or polished neutral surfaces.

**Always read `DESIGN.md` first** for exact tokens, CSS variables, component specs, and states. This file tells you how to apply them.

## When to use

- The user asks for a Sketch, hand-drawn, notebook, pencil, or sketchbook look.
- The product is friendly, educational, creative, or personal and should not feel like a cold SaaS dashboard.
- You are migrating an existing neutral UI into this style.
- You are auditing generated UI against the Sketch rules.

## The look in seven rules

1. **The page is paper.** The whole experience sits on warm cream `#F4EDE0`. Never use pure white or cold gray as the page background.
2. **White cards are sketch objects.** Cards, panels, modals, and inputs are white (`#FFFFFF`) and sit on the cream canvas.
3. **Ink carries readability.** Body text and labels use `#111827`. Never put important text in low-opacity graphite.
4. **Teal is the marker.** `#1DAD97` marks actions, focus, selection, progress, and key links. It is one accent, not a decoration for every heading, icon, and border.
5. **Lines create personality.** Standard cards use `2px dashed` graphite outlines. Inputs, buttons, selected and focused states use solid outlines.
6. **Shadows are pencil shading.** Hard offset, no blur, low contrast (`3px / 6px / 9px` offsets in `rgba(17,24,39,0.18)`). Never soft SaaS elevation, never heavy black neobrutalism.
7. **Controls are pills.** Buttons, chips, tabs, search, and selects use `border-radius: 999px`. Multiline textareas use 16–20px radius instead.

## Typography

- **Delicious Handrawn** for all primary and display text, with a `cursive` fallback.
- **JetBrains Mono** only for code, IDs, shortcuts, and technical values. Never as a decorative alternative.
- Scale: **12 / 14 / 16 / 20 / 24 / 32px**. Important body copy and input text must be 16px or larger. Use 12px only for short captions and metadata.
- Keep labels short, avoid long all-caps strings, use generous line height, avoid very light weights, and never rotate or distort functional text.
- Do not use the handwriting font for dense technical tables or long paragraphs.
- If the font shows little weight variation, create hierarchy with size, spacing, underline, or teal accent rather than forcing weights.

## Spacing

Use the 4px scale only: `4 / 8 / 12 / 16 / 24 / 32`. Sketch should feel loose and notebook-like, so leave extra room around display headings, dashed cards, pill buttons, illustrations, form groups, and modal actions. Offset shadows need clearance from neighbors. No one-off spacing values.

## Implementation workflow

1. Define the CSS variables from `DESIGN.md` (colors, fonts, scale, radii, lines, pencil shadows) once at `:root`. Reference tokens, never raw hex values scattered through components.
2. Set the `body` background to `--paper` and text to `--ink`, font to `--font-primary`.
3. Build layout on the spacing scale; build components from the variants in `DESIGN.md`.
4. Give every interactive component all states: default, hover, focus-visible, active, disabled, loading, and error where relevant.
5. Add illustration sparingly (see below).
6. Run the QA checklist at the end of this file before delivering.

## Components at a glance

| Component | Key treatment |
| --- | --- |
| Primary button | Pill, teal fill or outline, solid outline, 16px+ handwritten label, optional pencil shadow, action-oriented text |
| Card | White, `2px dashed` graphite, 16–24px radius, optional pencil shadow; solid outline when selected or interactive |
| Input | White fill, `2px solid` graphite, pill radius, 16px+ text, visible label always, teal 3px focus ring with 3px offset |
| Chips and filters | Pill; selected = teal fill or outline **plus** check mark or label |
| Navigation | Pill tabs or teal underline; active state uses more than color |
| Modal | White, rounded, outlined, pencil shadow; focus trap, Escape closes, focus returns to trigger |
| Alerts | Rounded, pencil outline, semantic color **plus** text or icon, includes recovery guidance |
| Empty state | Cream canvas, simple pencil illustration, clear heading, one teal primary action |
| Tables | Simple, readable, subtle solid dividers, mono for technical values; become note-like cards on small screens |

## Illustration and imperfection

- Motifs: pencil arrows, loops, stars, check marks, speech bubbles, sticky notes, paper clips, plants, wavy underlines, small object sketches.
- Illustrations support meaning and never carry essential information alone.
- Decorative ones get `aria-hidden="true"` (or `alt=""`), must not intercept pointer events, and must never cover text, controls, or focus outlines.
- Use teal sparingly inside illustrations and keep stroke style consistent with the UI.
- Imperfection comes from dashed outlines, offset shadows, handwritten headings, and sketch marks. It never excuses poor alignment, inconsistent spacing, weak hierarchy, or broken responsive behavior.

## Accessibility (non-negotiable, WCAG 2.2 AA)

- Test every foreground/background pair. Teal text on cream or white and white text on teal may fail; dark text on teal can be safer.
- Everything interactive is keyboard reachable with an obvious `:focus-visible`: 3px teal outline with offset, never a faint glow or one hidden behind a dashed border.
- Color is never the only state indicator. Pair it with text, icon, check mark, underline, or outline change.
- Labels are always visible; placeholders never replace them. Errors are linked to fields programmatically (`aria-describedby`, `aria-invalid`), and required fields are marked accessibly.
- Use semantic HTML before ARIA. Keep touch targets comfortable.
- Respect `prefers-reduced-motion`. Motion stays short and functional (pencil-line reveal, small button press, underline draw-in, sketch spinner) and never flashes.

## Copy and tone

Clear, friendly, calm, specific, encouraging. Warm but never babyish, vague, or joke-heavy.

| Avoid | Use |
| --- | --- |
| Submit / Go / Click here | Save changes / Start sketching / View examples |
| Oopsie! | The request failed. |
| Invalid input | Enter a valid email address. |
| No data | No notes yet. |
| Are you sure? | Delete this note? This action cannot be undone. |

Sketch metaphors should clarify (Start sketching, Create note, Save draft, Open sketchbook), not obscure (Make magic, Do the thing, Pencil power). Loading copy is specific: "Saving changes…", "Drawing preview…".

## Anti-patterns

- Pure white full-page backgrounds or cold gray app shells
- Glossy gradients, glassmorphism, or 3D effects
- Heavy black or blurred shadows instead of pencil offsets
- Thin, low-contrast dashed outlines
- Teal on every heading, icon, and border, or teal body text that fails contrast
- Sharp rectangular buttons where pills belong
- Placeholder-only labels
- Random doodles that interfere with content, or decorations exposed to screen readers
- Tiny handwritten text or dense handwritten paragraphs
- Color-only states
- Off-scale spacing or type sizes
- Components missing hover, focus-visible, active, disabled, loading, or error states
- Migrating by only swapping the font and adding doodles. The whole system is what makes it Sketch.

## Migrating an existing UI

Apply in this order:

1. Replace the page background with cream `#F4EDE0`.
2. Turn generic white areas into rounded white sketch objects.
3. Add dashed outlines to cards and callouts; solid outlines to inputs, buttons, selected and focused items.
4. Replace soft shadows with offset pencil shadows.
5. Convert primary controls to pills.
6. Assign teal to actions, focus, selection, and highlights only.
7. Introduce Delicious Handrawn (and JetBrains Mono for technical content).
8. Normalize type and spacing to the scales.
9. Add simple illustrations to empty states and onboarding.
10. Rewrite vague labels; add all missing states.
11. Test contrast, keyboard, screen reader behavior, and reduced motion.

## QA checklist

**Visual system**
- [ ] Page background is cream `#F4EDE0`; cards, modals, fields are white
- [ ] Teal is used only for interaction, focus, selection, emphasis
- [ ] Cards use dashed outlines; important controls use solid outlines
- [ ] Shadows are offset, chunky, blur-free, and low contrast
- [ ] Controls are pills (textareas excepted)
- [ ] No gradients, glass, or heavy digital shadows; feels friendly, not messy or childish

**Typography**
- [ ] Delicious Handrawn for primary and display; JetBrains Mono only for technical content
- [ ] Sizes from 12 / 14 / 16 / 20 / 24 / 32; important text is 16px+
- [ ] Line height is generous; nothing is rotated or distorted

**Components**
- [ ] Buttons have all states and action-oriented labels
- [ ] Forms have visible labels and accessible errors
- [ ] Navigation shows active and focus-visible states beyond color
- [ ] Choice cards work with keyboard; modals trap and return focus
- [ ] Empty states have helpful copy and one clear action
- [ ] Tables stay readable and responsive

**Accessibility**
- [ ] WCAG 2.2 AA contrast verified, including teal on cream/white and text on teal
- [ ] Dashed outlines are visible enough to define components
- [ ] Focus is never hidden by sketch marks
- [ ] Decorative illustrations are hidden from assistive tech
- [ ] `prefers-reduced-motion` respected

**Content**
- [ ] No Submit / Click here / Go
- [ ] Errors say what happened and how to recover
- [ ] Destructive actions state consequences

## Example prompts this skill should handle

- "Create a friendly onboarding flow using the Sketch design system."
- "Build accessible buttons, cards, inputs, and modals with dashed outlines, teal focus states, and pencil shadows."
- "Refactor this dashboard into a warm cream sketchbook interface with rounded pill controls."
- "Create an empty state with a simple pencil illustration, clear copy, and one teal primary action."
- "Audit this UI against the Sketch rules and list required changes."
