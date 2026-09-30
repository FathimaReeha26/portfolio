# Sketch Design System

Sketch is a friendly hand-drawn design system: warm cream paper, white sketch-object surfaces, dark graphite-like text, one soft teal marker accent, handwritten headings, rounded pill controls, dashed outlines, and chunky offset pencil shadows. It should feel like a product interface drawn into a notebook: clear enough to use, structured enough to scale, warm enough to feel personal, and never messy, childish, or hard to read.

Use this file as the token and component reference. See `SKILL.md` for how to apply it.

---

## 1. Color

### Brand and semantic palette

| Token | Value | Purpose |
| --- | --- | --- |
| Primary | `#1DAD97` | Soft teal: primary actions, focus, selected states, friendly highlights |
| Secondary | `#F4EDE0` | Warm cream paper: page canvas and large section surface |
| Success | `#16A34A` | Positive feedback, completed states, valid fields |
| Warning | `#D97706` | Caution, review prompts, incomplete steps |
| Danger | `#DC2626` | Errors, destructive actions, invalid fields |
| Surface | `#FFFFFF` | Cards, panels, modals, form fields |
| Text | `#111827` | Default readable text and labels |

### Semantic aliases

| Token | Value | Purpose |
| --- | --- | --- |
| `paper` | `#F4EDE0` | Full-page cream canvas |
| `paper-soft` | `#EFE4D3` | Subtle paper variation for low-emphasis areas |
| `ink` | `#111827` | Primary text, pencil-like outlines, high-contrast marks |
| `graphite` | `rgba(17, 24, 39, 0.72)` | Secondary strokes, dashed outlines, helper marks |
| `graphite-soft` | `rgba(17, 24, 39, 0.28)` | Light lines, inactive outlines, dividers |
| `teal` | `#1DAD97` | Brand accent and interaction signal |
| `teal-soft` | `rgba(29, 173, 151, 0.14)` | Selected fills, soft hover, gentle highlights |
| `paper-card` | `#FFFFFF` | Cards, forms, modals, foreground panels |
| `pencil-shadow` | `rgba(17, 24, 39, 0.18)` | Offset sketch shadow |
| `focus-ring` | `#1DAD97` | Visible keyboard focus outline |

### Usage principles

1. **Cream is the paper.** Use it as the dominant page and section background.
2. **Dark ink carries readability.** Body text, labels, and critical content use `text` / `ink`.
3. **Teal drives interaction.** Actions, focus, selection, and emphasis only.
4. **White creates sketch objects.** Cards, panels, modals, and fields sit on the cream canvas.
5. **Semantic colors stay semantic.** Success, warning, and danger communicate real state only.

Do not use teal as small body text without testing contrast. Test every foreground/background pair, including teal on cream, teal on white, white text on teal, and semantic colors on cream and white.

---

## 2. Typography

| Role | Font | Usage |
| --- | --- | --- |
| Primary | Delicious Handrawn | Body, UI text, labels, buttons, forms, navigation |
| Display | Delicious Handrawn | Hero headings, section and card titles, callouts |
| Mono | JetBrains Mono | Code, technical metadata, IDs, shortcuts, system values |

### Scale

| Token | Size | Usage |
| --- | --- | --- |
| `text-xs` | 12px | Captions, helper text, tiny labels, metadata |
| `text-sm` | 14px | Secondary UI text, form labels, navigation, compact copy |
| `text-md` | 16px | Default body, inputs, buttons |
| `text-lg` | 20px | Card titles, compact section headings, callout labels |
| `text-xl` | 24px | Section headings, modal titles, feature headings |
| `text-2xl` | 32px | Hero headings, major page titles |

### Weight

- 400 body
- 500 labels and navigation (where supported)
- 600 buttons and card headings
- 700 section headings and callouts
- 800–900 only for large display moments if the font renders clearly

If the font shows little weight difference, use size, spacing, outline, underline, or teal accent instead.

### Readability rules

Keep labels short; avoid long all-caps; generous line height for body; no very light weights; no handwriting effects in dense technical tables; never rotate or distort functional text; test on mobile; reserve JetBrains Mono for technical data; always include fallback fonts.

### CSS

```css
:root {
  --font-primary: "Delicious Handrawn", cursive;
  --font-mono: "JetBrains Mono", monospace;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-md: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
}
```

---

## 3. Spacing

4px base scale.

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | 4px | Tiny inline gaps, icon-label spacing, small sketch offsets |
| `space-2` | 8px | Helper text gaps, compact stacks, badge padding |
| `space-3` | 12px | Form spacing, button padding, small card internals |
| `space-4` | 16px | Default component padding, card content, nav spacing |
| `space-6` | 24px | Card grids, section groups, illustration spacing |
| `space-8` | 32px | Page sections, hero rhythm, large separation |

Give extra room to handwritten display headings, dashed cards, pill buttons, empty-state illustrations, step flows, form groups, modal actions, and callouts. Loose and friendly, never disorganized; all spacing comes from the scale.

---

## 4. Shape, Lines, and Shadows

### Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 8px | Small badges, compact cards, helper callouts |
| `radius-md` | 12px | Inputs, small panels |
| `radius-lg` | 20px | Cards, modals, large panels |
| `radius-pill` | 999px | Buttons, chips, tabs, search, interactive controls |

Cards typically use 16–24px. Multiline textareas use 16–20px rather than a full pill. Avoid sharp corners unless intentionally mimicking a paper note or sketch frame.

### Pencil lines

```css
:root {
  --line-solid: 2px solid var(--ink);
  --line-dashed: 2px dashed var(--graphite);
  --line-soft: 1px solid var(--graphite-soft);
}
```

- Dashed: standard cards and callouts (the signature treatment). Keep dash style consistent; do not mix patterns.
- Solid: inputs, buttons, selected cards, focused states.
- Never use low-contrast dashes on important interactive cards.

### Pencil shadows

```css
:root {
  --pencil-shadow-sm: 3px 3px 0 var(--pencil-shadow);
  --pencil-shadow-md: 6px 6px 0 var(--pencil-shadow);
  --pencil-shadow-lg: 9px 9px 0 var(--pencil-shadow);
}
```

No blur. Low contrast. Use on cards, modals, callouts, and important buttons. Leave clearance so shadows do not collide with neighbors.

### Full token block

```css
:root {
  --primary: #1DAD97;
  --secondary: #F4EDE0;
  --success: #16A34A;
  --warning: #D97706;
  --danger: #DC2626;
  --surface: #FFFFFF;
  --text: #111827;

  --paper: #F4EDE0;
  --paper-soft: #EFE4D3;
  --ink: #111827;
  --graphite: rgba(17, 24, 39, 0.72);
  --graphite-soft: rgba(17, 24, 39, 0.28);
  --teal: #1DAD97;
  --teal-soft: rgba(29, 173, 151, 0.14);
  --paper-card: #FFFFFF;
  --pencil-shadow: rgba(17, 24, 39, 0.18);
  --focus-ring: #1DAD97;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-6: 24px; --space-8: 32px;

  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-pill: 999px;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-primary);
  font-size: var(--text-md);
  line-height: 1.6;
}
```

---

## 5. Signature visual elements

- **Warm cream canvas.** Whole experience on `#F4EDE0`. No pure-white dominant backgrounds, cold gray shells, glossy or glass surfaces, or heavy photo backgrounds.
- **Pencil-drawn structure.** Card outlines, input borders, dividers, underlines, callout frames, modal boundaries, and empty-state drawings.
- **Soft teal accent.** Primary actions, focus-visible, selected chips, active nav, selected checkbox/radio, progress, important links, sketch markers. Too much teal makes it generic.
- **Hand-drawn illustration.** Pencil arrows, loops, circles, stars, notes, check marks, speech bubbles, simple characters, plants, paper clips, sticky notes, wavy dividers. Supportive and light; decorative ones hidden from assistive tech; never covering text, controls, or focus outlines.
- **Friendly imperfection.** Dashed outlines, offset shadows, handwritten headings, wavy underlines, sketch arrows. Never an excuse for poor alignment or hierarchy.

---

## 6. Components

### Buttons

| Variant | Usage |
| --- | --- |
| Primary | Save, create, continue, submit |
| Secondary | Supporting or alternate actions |
| Tertiary | Inline, low-emphasis actions |
| Destructive | Delete, remove, reset |
| Disabled | Unavailable actions |
| Loading | Processing actions |

Rules: pill radius; teal fill, border, or accent; verified text contrast; Delicious Handrawn at 16px+; solid outline for affordance; optional pencil shadow; no gradients or soft shadows.

| State | Required behavior |
| --- | --- |
| Default | Rounded pill, teal fill or outline, clear label |
| Hover | Slight lift, stronger outline, or soft teal background |
| Focus-visible | High-contrast outline with offset |
| Active | Small press movement or reduced pencil shadow |
| Disabled | Muted but readable; no hover lift |
| Loading | Preserves width; spinner or progress label |
| Error | Danger styling plus explanatory text |

Labels: Save changes, Create sketch, Continue, Start drawing, Add file, Try again, Delete note. Avoid Submit, Click here, Go.

### Links

Teal emphasis plus underline for inline links; visible focus-visible; never color alone; specific labels ("View sketch guide", "Read setup notes", "Learn about templates", never "Click here", "More", "Learn").

### Cards

White fill, `2px dashed` graphite outline, 16–24px radius, optional pencil shadow, padding from the scale, handwritten headings, clean wrapping. Interactive cards use real button/link semantics; selected or interactive emphasis uses a solid outline.

| Variant | Usage |
| --- | --- |
| Standard | General content and summaries |
| Sketch | Dashed outline with pencil shadow |
| Note | Informal content, tips, annotations |
| Action | Card with primary teal action |
| Choice | Selectable option, quiz answer, preference |
| Empty-state | Missing content with illustration and next action |
| Data | Friendly metric or status summary |

### Forms

Labels always visible; placeholders never replace labels; white fill, rounded, dark outline; 16px+ text; obvious teal focus-visible; errors programmatically linked; required fields indicated accessibly; disabled fields understandable; long labels and helper text wrap; validation never relies on color alone.

```css
.input {
  background: var(--paper-card);
  color: var(--text);
  border: 2px solid var(--graphite);
  border-radius: 999px;
  padding: 12px 16px;
  font-family: var(--font-primary);
  font-size: 16px;
}
.input:focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 3px;
  border-color: var(--ink);
}
.textarea { border-radius: 20px; }
```

### Search and filters

Pill-shaped input with visible label or accessible name; specific placeholder ("Search notes", "Search templates", "Search lessons", "Search files"); teal focus; simple sketch-like icons; keyboard-navigable suggestions; readable placeholder contrast. Chips are pills with dashed or solid outline; selected = teal fill/outline **and** a check mark or label; they wrap cleanly on small screens.

### Navigation

Patterns: rounded top nav, pill tabs, dashed active marker, sketch-label sidebar, handwritten breadcrumbs, bottom mobile nav, teal active underline. Use 14–16px handwritten text, short labels, teal active state reinforced by underline/fill/check/border, obvious focus-visible, preserved keyboard navigation. Do not over-decorate.

### Hero sections

Cream background, large handwritten heading, one teal primary CTA, simple sketch illustration when helpful, short supporting copy, dashed or pencil-framed panels, passing contrast. Compositions: heading with teal underline and arrow; white dashed note card beside copy; centered title with pill CTA; floating pencil illustration; cream canvas with small teal marker highlights.

### Notes, callouts, and tips

Paper or white surface; dashed outline or pencil underline; teal for helpful emphasis; warning/danger only for real states; concise copy; icons only when they clarify.

| Variant | Usage |
| --- | --- |
| Note | Helpful context |
| Tip | Recommended next step |
| Reminder | Light prompt or pending task |
| Warning | Real caution or required review |
| Error | Blocking issue or failed action |
| Success | Completed action or confirmation |

### Choice cards and quizzes

Use button, radio, or checkbox semantics. Dashed by default; solid teal outline or teal fill when selected, with a check mark or label. Obvious focus-visible; long text wraps; hover never required to understand; correct/incorrect states include text.

| State | Treatment |
| --- | --- |
| Default | White card, dashed outline, rounded corners |
| Hover | Stronger outline or subtle teal-soft fill |
| Focus-visible | Offset teal outline |
| Selected | Teal outline, check mark, or selected label |
| Correct | Success label plus icon or text |
| Incorrect | Danger label plus explanation |
| Disabled | Muted but readable |

### Modals and overlays

White or paper surface, rounded, solid or dashed graphite outline, optional pencil shadow, clear handwritten title, teal primary action, danger styling for destructive confirmation. Trap focus, close on Escape unless confirmation is required, return focus to the trigger. Separation comes from backdrop contrast, outline, spacing, and pencil shadow rather than polished elevation.

### Alerts and feedback

Semantic colors only for real feedback, always with text or structural cues; rounded containers with pencil outlines; concise copy with recovery guidance; keyboard-accessible dismiss; no overly playful error copy.

| State | Copy |
| --- | --- |
| Success | Changes saved. |
| Warning | Review this step before continuing. |
| Error | The file could not be uploaded. Try again. |
| Info | Your draft is saved automatically. |
| Destructive | Delete this note? This action cannot be undone. |

### Loading

Patterns: sketchy spinner, animated pencil line, dashed skeleton card, teal progress line, short loading text, gentle pulsing note card. Include accessible loading text, preserve layout dimensions, avoid rapid flashing, respect reduced motion, never rely on animation alone. Copy: "Searching notes…", "Saving changes…", "Uploading file…", "Drawing preview…", "Preparing results…".

### Empty states

Cream canvas, white note card or open layout, simple pencil illustration when helpful, clear handwritten heading, explanation of what is missing, one primary teal action. Copy: "No notes yet." / "Your sketchbook is empty." / "No templates have been created." / "No matches found. Try a different search term."

### Tables and data

White or paper surface, dark value text, subtle **solid** dividers (not heavy dashed grids), JetBrains Mono for technical values, no decorative marks inside dense tables, teal only for active/selected, semantic colors only for real status, readable row height. On small screens, convert to rounded cards or note-like rows.

---

## 7. Accessibility (WCAG 2.2 AA baseline)

- Text contrast meets AA against its background; do not use low-opacity graphite for important text.
- Everything interactive is keyboard reachable and operable, with a visible `:focus-visible` state.
- Color is never the only indicator of state.
- Form errors are visually and programmatically associated with fields.
- Semantic HTML before ARIA; comfortable touch targets.
- Decorative illustrations don't disrupt reading order, use `aria-hidden="true"` or `alt=""`, don't intercept pointer events, and don't cover focus outlines. Sketch texture must not reduce contrast.

**Focus treatments:** 3px teal outline with offset; teal ring plus dark border; strong underline plus outline for links; solid outline replacing dashed on focused cards; teal selected marker plus text label. Avoid faint glows or indicators hidden behind dashed borders.

**Keyboard:** buttons activate with Enter/Space, links with Enter; choice cards use radio/checkbox/button/link semantics; modals trap focus and restore it; menus, popovers, suggestions, and tabs support expected keys; drag-and-drop or drawing interactions offer keyboard alternatives; illustrations are not interactive unless labeled and operable.

**Motion:** acceptable motion is pencil-line reveal, small button press, gentle card entrance, teal underline draw-in, sketch spinner, light selected-state pop. Respect `prefers-reduced-motion`, avoid flashing and layout shifts, keep transitions short, and preserve meaning statically in reduced-motion mode.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Content and tone

Clear, friendly, helpful, calm, specific, encouraging, easy to scan. Warm without becoming vague, babyish, or exclamation-heavy; users should always know what happened, what is missing, and what comes next.

| Context | Copy |
| --- | --- |
| Primary CTA | Start sketching |
| Secondary action | View examples |
| Save | Save changes |
| Empty state | Your sketchbook is empty. |
| Loading | Drawing preview… |
| Error | The file could not be uploaded. Try again. |
| Destructive | Delete this note? This action cannot be undone. |

Good metaphors: Start sketching, Create note, Draw preview, Open sketchbook, Add template, Save draft. Avoid: Make magic, Scribble it, Do the thing, Let's doodle, Pencil power. The visuals carry the playfulness; the copy stays clear.

---

## 9. Design philosophy

1. **The interface is a sketchbook page.** Cream background, hand-drawn type, pencil lines, light illustration.
2. **Teal is the marker.** The one strong accent for action, focus, selection, progress.
3. **Lines create personality.** Dashed outlines, dividers, underlines, and marks are tokenized and consistent, not random.
4. **Rounded controls create comfort.** Pill buttons, chips, search, and tabs.
5. **Handmade does not mean messy.** Spacing, hierarchy, states, contrast, and layout rules still apply.
6. **Illustration supports meaning.** Orient, encourage, or clarify; never replace labels or confuse assistive tech.
7. **Accessibility is part of friendliness.** Contrast, focus, semantics, keyboard, readable text, and reduced motion are non-negotiable.

---

## 10. Anti-patterns

- Pure white full-page backgrounds; cold gray app shells
- Glossy gradients, glassmorphism, polished 3D effects
- Heavy black neobrutalist shadows instead of soft pencil offsets
- Thin low-contrast dashed outlines
- Random sketch marks that interfere with content
- Teal on every heading, icon, and border; teal body text failing contrast
- Sharp rectangular controls where pills are expected
- Placeholder-only form labels
- Illustrations covering text or focus outlines, or needlessly exposed to screen readers
- Tiny handwritten text; long dense paragraphs in the handwriting font
- Vague labels (Submit, Click here, Go)
- Color-only selected, success, warning, or error states
- One-off spacing values outside the scale
- Components missing hover, focus-visible, active, disabled, loading, or error states

---

## 11. Migration order

1. Cream `#F4EDE0` page background.
2. White sketch-object surfaces with rounded corners.
3. Dashed outlines on cards and callouts.
4. Solid outlines on inputs, buttons, selected and focused components.
5. Chunky offset pencil shadows replace soft digital ones.
6. Pill geometry for primary controls.
7. Teal `#1DAD97` for actions, focus, selection, highlights.
8. Delicious Handrawn for primary and display type; JetBrains Mono for technical content only.
9. Normalize type to 12 / 14 / 16 / 20 / 24 / 32px.
10. Normalize spacing to 4 / 8 / 12 / 16 / 24 / 32px.
11. Add simple pencil illustrations to empty states and onboarding.
12. Replace vague labels; add all component states.
13. Test contrast, keyboard navigation, screen readers, and reduced motion.

Do not migrate by only changing the font and adding doodles. Sketch depends on the full system.

---

## 12. QA checklist

**Visual:** cream page background; white surfaces for cards, panels, modals, fields; teal only for interaction and emphasis; dashed cards, solid important controls; chunky blur-free pencil shadows; pill controls; decorations support the layout; hand-drawn but not messy; no gradients, glass, or heavy shadows.

**Typography:** Delicious Handrawn for primary and display; JetBrains Mono only for technical content; sizes from the scale; readable handwriting; adequate line height; clean wrapping; small text only for captions and metadata; no distorted functional text.

**Components:** readable, action-oriented pill buttons with all states; cards with standard, interactive, selected, loading, empty, and error states where relevant; forms with visible labels and accessible errors; strong input outlines with teal focus; clear nav active and focus states; keyboard-operable choice cards; modals that trap and return focus; alerts with semantic color plus text; helpful empty states; readable, responsive tables.

**Accessibility:** AA contrast (including teal on cream/white and text on teal); visible dashed outlines; obvious focus not hidden by marks; no color-only state; programmatic error association; semantic HTML; comfortable touch targets; reduced motion respected; decorative illustrations hidden from assistive tech.

**Content:** specific CTAs; errors that explain recovery; empty states that say what is missing and what to do; destructive actions that state consequences; warm but clear copy; metaphors that clarify; no Submit / Click here / Go.
