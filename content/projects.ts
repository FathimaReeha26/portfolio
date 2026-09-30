/* Project case-study content. Values in [BRACKETS] are placeholders.
   `areas` drive the filter chips on the home page: "ML" | "Systems" | "Web" | "Research".
   `architecture` is an array of columns; each column is a list of stage
   boxes, drawn left-to-right with pencil arrows between columns.
   `results` renders as a table; entries with a numeric `value` (0-100)
   also get a labeled bar in the chart. Omit `value` when you only have text. */

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
  learnings: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "[Project title one]",
    summary: "[One-line summary of what it does and who it helps.]",
    problem: "[What problem does this solve, and why does it matter?]",
    approach: [
      "[First step of your approach.]",
      "[Second step of your approach.]",
      "[Third step of your approach.]",
    ],
    role: "[Your role, e.g. Sole builder]",
    stack: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    areas: ["ML"],
    outcome: "[Outcome or metric, e.g. improved baseline by X.]",
    architecture: [
      ["[Input]", "[Preprocessing]"],
      ["[Model]", "[Training]"],
      ["[Evaluation]", "[Output]"],
    ],
    results: [
      { label: "[Metric name]", display: "[Value, e.g. 92%]" },
      { label: "[Metric name]", display: "[Value]" },
    ],
    learnings: [
      "[What you learned building this.]",
      "[What you would do differently.]",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/[username]/[repo]" },
      { label: "Demo", href: "https://[demo-url]" },
    ],
  },
  {
    slug: "project-two",
    title: "[Project title two]",
    summary: "[One-line summary of what it does and who it helps.]",
    problem: "[What problem does this solve, and why does it matter?]",
    approach: [
      "[First step of your approach.]",
      "[Second step of your approach.]",
    ],
    role: "[Your role, e.g. Backend lead in a team of three]",
    stack: ["[Tech 1]", "[Tech 2]"],
    areas: ["Systems"],
    outcome: "[Outcome or metric.]",
    architecture: [["[Client]"], ["[Service]", "[Cache]"], ["[Database]"]],
    results: [{ label: "[Metric name]", display: "[Value]" }],
    learnings: ["[What you learned building this.]"],
    links: [{ label: "GitHub", href: "https://github.com/[username]/[repo]" }],
  },
  {
    slug: "project-three",
    title: "[Project title three]",
    summary: "[One-line summary of what it does and who it helps.]",
    problem: "[What problem does this solve, and why does it matter?]",
    approach: [
      "[First step of your approach.]",
      "[Second step of your approach.]",
    ],
    role: "[Your role]",
    stack: ["[Tech 1]", "[Tech 2]"],
    areas: ["Web"],
    outcome: "[Outcome or metric.]",
    architecture: [["[Pages]"], ["[API]"], ["[Data]"]],
    results: [{ label: "[Metric name]", display: "[Value]" }],
    learnings: ["[What you learned building this.]"],
    links: [{ label: "GitHub", href: "https://github.com/[username]/[repo]" }],
  },
  {
    slug: "project-four",
    title: "[Project title four]",
    summary: "[One-line summary of what it does and who it helps.]",
    problem: "[What problem does this solve, and why does it matter?]",
    approach: [
      "[First step of your approach.]",
      "[Second step of your approach.]",
    ],
    role: "[Your role, e.g. Research assistant]",
    stack: ["[Tech 1]", "[Tech 2]"],
    areas: ["Research"],
    outcome: "[Outcome or metric.]",
    architecture: [["[Dataset]"], ["[Experiment]"], ["[Findings]"]],
    results: [{ label: "[Metric name]", display: "[Value]" }],
    learnings: ["[What you learned building this.]"],
    links: [{ label: "Paper", href: "https://[paper-url]" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
