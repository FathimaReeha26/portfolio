import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Chip } from "./Chip";

/* Project box: area, title, summary, stack, and result in a bordered
   box. The title link stretches over the whole box; the "Read case
   study" row is a visual affordance pointing at the same place. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col gap-3 rounded-lg border border-line bg-paper p-6 transition-colors duration-200 hover:border-amber sm:p-7">
      <p className="text-sm font-semibold text-amber-deep">
        {project.areas.join(", ")}
      </p>
      <h3 className="font-display text-xl font-medium text-ink transition-colors duration-200 group-hover:text-amber-deep sm:text-2xl">
        <Link
          href={`/projects/${project.slug}`}
          className="stretched-link after:absolute after:inset-0 after:rounded-lg"
        >
          {project.title}
        </Link>
      </h3>
      <p className="text-md text-ink">{project.summary}</p>
      {project.stack.length > 0 && (
        <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
      )}
      <p className="tnum text-sm text-ink">
        <span className="font-semibold">Result:</span> {project.outcome}
      </p>
      <span
        aria-hidden="true"
        className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-2 text-md font-semibold text-ink"
      >
        Read case study
        <ArrowRight
          aria-hidden="true"
          size={18}
          className="text-amber transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </article>
  );
}
