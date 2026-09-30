/* Experience timeline content. Values in [BRACKETS] are placeholders. */

export interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "[Role, e.g. Software Engineering Intern]",
    org: "[Organization]",
    dates: "[Start month Year – End month Year]",
    bullets: [
      "[Impact bullet: what you did and the result.]",
      "[Impact bullet: what you did and the result.]",
    ],
  },
  {
    role: "[Role, e.g. Graduate Research Assistant]",
    org: "[Lab or department]",
    dates: "[Start month Year – Present]",
    bullets: [
      "[Impact bullet: what you did and the result.]",
      "[Impact bullet: what you did and the result.]",
    ],
  },
  {
    role: "[Role, e.g. Teaching Assistant]",
    org: "[Course name and number]",
    dates: "[Start month Year – End month Year]",
    bullets: ["[Impact bullet: what you did and the result.]"],
  },
];
