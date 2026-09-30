/* Education content. Values in [BRACKETS] are placeholders. */

export interface EducationItem {
  degree: string;
  school: string;
  dates: string;
  details: string[];
}

export const education: EducationItem[] = [
  {
    degree: "[M.S. in Computer Science]",
    school: "[University Name]",
    dates: "[Start Year – Expected Year]",
    details: ["[Detail, e.g. GPA or thesis topic.]"],
  },
  {
    degree: "[B.S. in Computer Science]",
    school: "[University Name]",
    dates: "[Start Year – End Year]",
    details: ["[Detail, e.g. honors or minor.]"],
  },
];

export const coursework: string[] = [
  "[Course 1]",
  "[Course 2]",
  "[Course 3]",
  "[Course 4]",
  "[Course 5]",
  "[Course 6]",
];
