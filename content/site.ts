/* Site-wide profile, contact, and navigation content.
   Updating this file never requires touching components. */

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: "Fathima Reeha T.A",
  shortName: "Fathima Reeha",
  tagline: "CSE undergraduate building explainable AI for healthcare",
  supportingLine:
    "Third-year engineering student working in Python, machine learning, and data — based in Kerala, India.",
  degree: "B.E. in Computer Science and Engineering",
  school: "P.A. College of Engineering",
  graduation: "2028",
  email: "reeha5622@gmail.com",
  // "Download CV" points at the /cv page until a real PDF is added
  // to public/cv.pdf (see README). Then point this at "/cv.pdf".
  cvHref: "/cv",
  lastUpdated: "2026-10-06",
  signOff: "Thanks for stopping by my sketchbook",
  // Social links are omitted until real profile URLs are provided —
  // no placeholder links are shown.
  socials: [] as SocialLink[],
};

export interface CurrentlyItem {
  label: string;
  value: string;
}

export const currently: CurrentlyItem[] = [
  { label: "Studying", value: "B.E. CSE, 3rd year · CGPA 8.3/10" },
  {
    label: "Building",
    value: "SynCura – Explainable ICU Risk Monitoring System",
  },
  {
    label: "Looking for",
    value: "Opportunities to apply my skills to real-world challenges",
  },
];

export const bio: string[] = [
  "I am Fathima Reeha, a third-year Computer Science Engineering student at P.A. College of Engineering (2024–2028, CGPA 8.3/10) with strong programming skills in Python and Java.",
  "I am currently building SynCura, an explainable ICU risk monitoring system that predicts early patient risk from clinical data and raises timely alerts.",
  "I care about Artificial Intelligence, Data Structures, and practical software that solves real problems — and I am looking for opportunities to apply my skills to real-world challenges.",
];

export const researchInterests: string[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Structures",
  "Real-time health monitoring",
];

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];
