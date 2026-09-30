/* Skills content. Group names are structural; items in [BRACKETS]
   are placeholders — list only skills you actually have. */

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["[Language 1]", "[Language 2]", "[Language 3]"] },
  { group: "ML / Data", items: ["[Tool 1]", "[Tool 2]", "[Tool 3]"] },
  { group: "Systems", items: ["[Tool 1]", "[Tool 2]"] },
  { group: "Web", items: ["[Tool 1]", "[Tool 2]", "[Tool 3]"] },
  { group: "Tools", items: ["[Tool 1]", "[Tool 2]"] },
];

export const awards: string[] = [
  "[Award, talk, or open-source contribution.]",
  "[Award, talk, or open-source contribution.]",
];
