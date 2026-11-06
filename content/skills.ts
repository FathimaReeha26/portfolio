/* Skills content — every item below comes from the resume.
   Awards stay empty until exact certificate titles are confirmed. */

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { group: "Technical Skills", items: ["Python", "Java", "SQL", "DSA"] },
  {
    group: "Tools & Systems",
    items: ["VS Code", "Canva", "GitHub", "OpenCode", "Arduino IDE"],
  },
  {
    group: "Soft Skills",
    items: ["Teamwork", "Problem Solving", "Communication"],
  },
];

export const awards: string[] = [
  "Hackathon Participant",
  "Active EMBED Club Member",
  "IoT & Embedded Systems Activities",
];
