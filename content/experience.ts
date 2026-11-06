/* Experience timeline content. The resume lists no internships or
   jobs yet, so this stays empty and the timeline is hidden — add real
   roles here when you have them. Never invent entries. */

export interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Active Member – IoT & Embedded Systems",
    org: "EMBED Club, PA College of Engineering",
    dates: "2024 – Present",
    bullets: [
      "Participate in hands-on technical workshops and activities focusing on IoT and embedded systems.",
      "Collaborate on practical hardware-software integration and automation projects.",
    ],
  },
  {
    role: "Hackathon Participant",
    org: "Engineering Hackathons & Competitions",
    dates: "2024 – Present",
    bullets: [
      "Collaborate in fast-paced team environments to prototype practical software solutions.",
      "Apply machine learning, problem-solving, and algorithmic thinking to real-world problem statements.",
    ],
  },
];
