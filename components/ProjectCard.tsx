import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Card } from "./Card";
import { Chip } from "./Chip";

/* Dashed sketch card for the project grid: title, summary, stack chips,
   result metric, and a link into the case study. The whole card is one
   link with a clear name; stack chips are static labels. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      variant="sketch"
      className="flex h-full flex-col gap-4 transition-all duration-150 hover:-translate-y-1 hover:shadow-pencil-lg focus-within:border-solid focus-within:border-ink"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-ink">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-sm focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-md text-ink">{project.summary}</p>
      </div>
      <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
      </ul>
      <p className="font-mono text-sm text-ink">
        <span className="font-semibold">Result:</span> {project.outcome}
      </p>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
        className="mt-auto inline-flex min-h-[44px] items-center gap-2 self-start rounded-pill border-2 border-transparent px-3 text-md font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:border-ink hover:bg-teal-soft"
      >
        Read case study
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </Card>
  );
}
