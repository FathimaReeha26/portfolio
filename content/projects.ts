/* Project case-study content.
   `areas` drive the filter chips on the home page: "ML" | "Systems" | "Web" | "Research".
   `architecture` is an array of columns; each column is a list of stage
   boxes, drawn left-to-right with pencil arrows between columns.
   `results` renders as a table; entries with a numeric `value` (0-100)
   also get a labeled bar in the chart. Omit `value` when you only have text.
   `learnings` and `links` are optional — sections render only when provided. */

export type ProjectArea = "ML" | "Systems" | "Web" | "Research";

export const projectAreas: ProjectArea[] = ["ML", "Systems", "Web", "Research"];

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectResult {
  label: string;
  display: string;
  value?: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  approach: string[];
  role: string;
  stack: string[];
  areas: ProjectArea[];
  outcome: string;
  architecture: string[][];
  results: ProjectResult[];
  learnings?: string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "syncura-icu-risk-monitoring",
    title: "SynCura – Explainable ICU Risk Monitoring",
    summary:
      "AI-based ICU risk monitoring that predicts early patient risk from clinical data and raises real-time alerts.",
    problem:
      "Patient deterioration in intensive care can go unnoticed until it becomes critical. SynCura tackles early risk prediction so care teams get timely warnings, starting with heartbeat fluctuations.",
    approach: [
      "Clean and prepare clinical data for modeling.",
      "Build a risk prediction model for early warning signs.",
      "Add explanations so each prediction can be understood and trusted.",
      "Deliver continuous monitoring with real-time alerts.",
    ],
    role: "Team member",
    stack: ["Python", "Machine Learning", "Data Analysis"],
    areas: ["ML"],
    outcome: "In development — working toward early risk prediction on clinical data.",
    architecture: [
      ["Clinical data", "Data cleaning"],
      ["Risk prediction", "Explanations"],
      ["Real-time alerts", "Monitoring"],
    ],
    results: [
      { label: "Status", display: "In development" },
      { label: "Focus", display: "Early risk prediction from clinical data" },
    ],
  },
  {
    slug: "home-automation-system",
    title: "Home Automation System",
    summary:
      "Automated control and monitoring for home lighting, appliances, and security.",
    problem:
      "Managing home lighting, appliances, and security by hand is tedious and easy to neglect. This system automates monitoring and control in one place.",
    approach: [
      "Automate monitoring across lighting, appliances, and security.",
      "Centralize control so the home responds without manual effort.",
    ],
    role: "Team member",
    stack: [],
    areas: ["Systems"],
    outcome: "Working system covering lighting, appliances, and security monitoring.",
    architecture: [
      ["Sensors", "Monitoring"],
      ["Automation", "Control"],
      ["Lighting", "Appliances", "Security"],
    ],
    results: [
      { label: "Scope", display: "Lighting, appliances, and security" },
    ],
  },
  {
    slug: "railway-management-system",
    title: "Railway Management System",
    summary:
      "Ticket booking, train scheduling, and passenger management that automates railway operations.",
    problem:
      "Manual railway operations — booking, scheduling, passenger records — are slow and error-prone. This system automates them to cut manual work and improve efficiency.",
    approach: [
      "Build ticket booking and train scheduling flows.",
      "Manage passenger records alongside operations.",
      "Automate manual steps to improve efficiency.",
    ],
    role: "Team member",
    stack: [],
    areas: ["Systems"],
    outcome: "Automated booking, scheduling, and passenger management workflows.",
    architecture: [
      ["Ticket booking", "Train scheduling"],
      ["Passenger management"],
      ["Automated operations"],
    ],
    results: [
      { label: "Goal", display: "Less manual work, more efficient operations" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
