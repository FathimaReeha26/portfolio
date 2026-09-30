/* WCAG contrast check for every foreground/background pair the site relies on.
   Run: npm run contrast. Exits non-zero if any required pair fails. */

function luminance(hex) {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((part) => {
      const channel = parseInt(part, 16) / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function parse(color, over) {
  const rgba = color.match(/rgba?\(([^)]+)\)/);
  if (!rgba) return color;
  const parts = rgba[1].split(",").map((p) => parseFloat(p));
  if (parts.length < 4 || parts[3] >= 1) {
    return (
      "#" +
      parts
        .slice(0, 3)
        .map((v) => Math.round(v).toString(16).padStart(2, "0"))
        .join("")
    );
  }
  const bg = hexToRgb(parse(over, "#ffffff"));
  const blended = [
    Math.round(parts[0] * parts[3] + bg[0] * (1 - parts[3])),
    Math.round(parts[1] * parts[3] + bg[1] * (1 - parts[3])),
    Math.round(parts[2] * parts[3] + bg[2] * (1 - parts[3])),
  ];
  return (
    "#" + blended.map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

function ratio(fg, bg) {
  const a = luminance(parse(fg, bg));
  const b = luminance(parse(bg, bg));
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

const INK = "#111827";
const PAPER = "#F4EDE0";
const WHITE = "#FFFFFF";
const TEAL = "#1DAD97";
const GRAPHITE = "rgba(17, 24, 39, 0.72)";
const GRAPHITE_SOFT = "rgba(17, 24, 39, 0.28)";
const SUCCESS = "#16A34A";
const WARNING = "#D97706";
const DANGER = "#DC2626";

// min: enforced threshold. "report" means measured-and-documented only
// (decorative use, never the sole carrier of meaning).
const pairs = [
  { name: "Body text on cream", fg: INK, bg: PAPER, min: 4.5 },
  { name: "Body text on white", fg: INK, bg: WHITE, min: 4.5 },
  { name: "Ink on teal (primary buttons, selected chips)", fg: INK, bg: TEAL, min: 4.5 },
  { name: "White on danger (destructive buttons)", fg: WHITE, bg: DANGER, min: 4.5 },
  { name: "Danger on white (error icons, required marks)", fg: DANGER, bg: WHITE, min: 3 },
  { name: "Danger on cream", fg: DANGER, bg: PAPER, min: 3 },
  { name: "Success on white (success icons)", fg: SUCCESS, bg: WHITE, min: 3 },
  { name: "Warning on white (warning icons)", fg: WARNING, bg: WHITE, min: 3 },
  { name: "Dashed graphite on white (card outlines)", fg: GRAPHITE, bg: WHITE, min: 3 },
  { name: "Dashed graphite on cream", fg: GRAPHITE, bg: PAPER, min: 3 },
  // Focus is a double pencil stroke: 3px teal outline plus a 3px ink
  // outer ring. The teal alone is below 3:1, so the ink ring carries
  // the WCAG 2.2 AA focus-appearance indicator; both are measured here.
  { name: "Focus ink ring on cream", fg: INK, bg: PAPER, min: 3 },
  { name: "Focus ink ring on white", fg: INK, bg: WHITE, min: 3 },
  { name: "Focus teal outline on cream (paired with ink ring)", fg: TEAL, bg: PAPER, min: 0 },
  { name: "Focus teal outline on white (paired with ink ring)", fg: TEAL, bg: WHITE, min: 0 },
  { name: "Teal text on cream (decorative only, never body copy)", fg: TEAL, bg: PAPER, min: 0 },
  { name: "Soft dividers on white (decorative only)", fg: GRAPHITE_SOFT, bg: WHITE, min: 0 },
];

let failures = 0;
for (const pair of pairs) {
  const value = ratio(pair.fg, pair.bg);
  const ok = value >= pair.min;
  const status = pair.min === 0 ? "INFO" : ok ? "PASS" : "FAIL";
  if (!ok && pair.min > 0) failures += 1;
  console.log(
    `${status}  ${value.toFixed(2)}:1  (needs ${pair.min === 0 ? "n/a" : pair.min + ":1"})  ${pair.name}`
  );
}

if (failures > 0) {
  console.error(`\n${failures} required pair(s) below threshold.`);
  process.exit(1);
} else {
  console.log("\nAll required pairs meet their thresholds.");
}
