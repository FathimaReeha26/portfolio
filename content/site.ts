/* Site-wide profile, contact, and navigation content.
   Values in [BRACKETS] are placeholders — replace them with real details.
   Updating this file never requires touching components. */

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: "[Your Name]",
  tagline:
    "[One-line tagline, e.g. CS master's student building reliable ML systems]",
  supportingLine:
    "[One supporting sentence: what you study, what you build, and what you are looking for.]",
  degree: "[M.S. in Computer Science]",
  school: "[University Name]",
  graduation: "[Expected graduation year]",
  email: "[you@example.com]",
  // "Download CV" points at the /cv page until a real PDF is added
  // to public/cv.pdf (see README). Then point this at "/cv.pdf".
  cvHref: "/cv",
  lastUpdated: "2026-09-30",
  signOff: "[A short handwritten sign-off, e.g. Drawn with care]",
  socials: [
    { label: "GitHub", href: "https://github.com/[username]" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/[username]" },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=[id]",
    },
  ] as SocialLink[],
};

export interface CurrentlyItem {
  label: string;
  value: string;
}

export const currently: CurrentlyItem[] = [
  { label: "Studying", value: "[What you are studying right now]" },
  { label: "Building", value: "[What you are building right now]" },
  { label: "Reading", value: "[What you are reading right now]" },
  { label: "Looking for", value: "[e.g. Summer 2027 internships]" },
];

export const bio: string[] = [
  "[First bio sentence: who you are and what you study.]",
  "[Second sentence: what you build or research and why it matters.]",
  "[Third sentence: what you are looking for next — internships, collaborations, roles.]",
];

export const researchInterests: string[] = [
  "[Research interest 1]",
  "[Research interest 2]",
  "[Research interest 3]",
];

export const advisor = "[Advisor name, Lab name]";

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
