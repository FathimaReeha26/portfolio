/* Skills content — every item below comes from the resume.
   Awards stay empty until exact certificate titles are confirmed. */

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["Python", "Java", "SQL"] },
  {
    group: "ML / Data",
    items: ["Machine Learning", "Data Analysis", "Data Cleaning"],
  },
  {
    group: "Tools",
    items: ["VS Code", "Jupyter Notebook", "GitHub", "Excel", "Canva"],
  },
  {
    group: "Working style",
    items: ["Team Work", "Problem Solving", "Communication", "Time Management"],
  },
];

export const awards: string[] = [];
