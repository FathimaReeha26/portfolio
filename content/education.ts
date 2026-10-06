/* Education content. Coursework stays empty until real course names
   are provided — the chips are hidden while the list is empty. */

export interface EducationItem {
  degree: string;
  school: string;
  dates: string;
  details: string[];
}

export const education: EducationItem[] = [
  {
    degree: "B.E. in Computer Science and Engineering",
    school: "P.A. College of Engineering",
    dates: "2024 – 2028",
    details: ["CGPA 8.3/10"],
  },
];

export const coursework: string[] = [];
