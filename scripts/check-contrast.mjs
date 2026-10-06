/* WCAG contrast check for every foreground/background pair the Folio
   site relies on. Run: npm run contrast. Exits non-zero if any required
   pair fails. */

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

const PAPER = "#FAF6EF";
const INK = "#201A15";
const AMBER = "#B45309";
const AMBER_DEEP = "#8A3F06";
const PINE = "#24473B";
const SAND = "#ECE2CE";
const LINE = "rgba(32, 26, 21, 0.16)";
const SUCCESS = "#2E7D32";
const DANGER = "#C62828";
const PAPER_DIM = "rgba(250, 246, 239, 0.7)";

const D_PAPER = "#171310";
const D_INK = "#F5EEE3";
const D_AMBER = "#E2953F";
const D_AMBER_DEEP = "#C07F31";
const D_SAND = "#262019";
const D_LINE = "rgba(245, 238, 227, 0.16)";
const D_SUCCESS = "#86C989";
const D_DANGER = "#E78D8D";
const CREAM = "#FAF6EF";
const CREAM_DIM = "rgba(250, 246, 239, 0.85)";

// min: enforced threshold. "report" means measured-and-documented only
// (decorative use, never the sole carrier of meaning).
const pairs = [
  { name: "Body text on paper", fg: INK, bg: PAPER, min: 4.5 },
  { name: "Body text on sand (tinted panels)", fg: INK, bg: SAND, min: 4.5 },
  { name: "Paper on amber (primary buttons)", fg: PAPER, bg: AMBER, min: 4.5 },
  { name: "Paper on amber-deep (hover states)", fg: PAPER, bg: AMBER_DEEP, min: 4.5 },
  { name: "Paper on pine (footer, feature card)", fg: PAPER, bg: PINE, min: 4.5 },
  { name: "Dim paper on pine (footer secondary)", fg: PAPER_DIM, bg: PINE, min: 4.5 },
  { name: "Amber on paper (links, accents, focus ring)", fg: AMBER, bg: PAPER, min: 4.5 },
  { name: "Amber-deep on paper (small amber text)", fg: AMBER_DEEP, bg: PAPER, min: 4.5 },
  { name: "Paper on danger (destructive buttons)", fg: PAPER, bg: DANGER, min: 4.5 },
  { name: "Danger on paper (error icons, required marks)", fg: DANGER, bg: PAPER, min: 3 },
  { name: "Success on paper (success icons)", fg: SUCCESS, bg: PAPER, min: 3 },
  { name: "Paper on ink (selected chips, dark buttons)", fg: PAPER, bg: INK, min: 4.5 },
  { name: "Dark: body text on dark paper", fg: D_INK, bg: D_PAPER, min: 4.5 },
  { name: "Dark: body text on dark sand", fg: D_INK, bg: D_SAND, min: 4.5 },
  { name: "Dark: amber on dark paper (links, accents, focus)", fg: D_AMBER, bg: D_PAPER, min: 4.5 },
  { name: "Dark: amber-deep on dark paper (small amber text)", fg: D_AMBER_DEEP, bg: D_PAPER, min: 4.5 },
  { name: "Dark: dark text on amber (primary buttons)", fg: D_PAPER, bg: D_AMBER, min: 4.5 },
  { name: "Dark: dark text on amber-deep (hover fills)", fg: D_PAPER, bg: D_AMBER_DEEP, min: 4.5 },
  { name: "Dark: dark text on light ink (inverted buttons)", fg: D_PAPER, bg: D_INK, min: 4.5 },
  { name: "Dark: cream on pine (footer, feature card)", fg: CREAM, bg: PINE, min: 4.5 },
  { name: "Dark: dim cream on pine (footer secondary)", fg: CREAM_DIM, bg: PINE, min: 4.5 },
  { name: "Dark: dark text on danger (destructive buttons)", fg: D_PAPER, bg: D_DANGER, min: 4.5 },
  { name: "Dark: danger on dark paper (error icons)", fg: D_DANGER, bg: D_PAPER, min: 3 },
  { name: "Dark: success on dark paper (success icons)", fg: D_SUCCESS, bg: D_PAPER, min: 3 },
  { name: "Hairline borders on paper (decorative only)", fg: LINE, bg: PAPER, min: 0 },
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
