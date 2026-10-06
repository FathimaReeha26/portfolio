/* Experience timeline content. The resume lists no internships or
   jobs yet, so this stays empty and the timeline is hidden — add real
   roles here when you have them. Never invent entries. */

export interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [];
