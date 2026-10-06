import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Chip } from "./Chip";

/* Editorial index row, not a card: title, summary, stack, and result
   in a ruled row. The title link carries the accessible name; the
   trailing link is a visual affordance pointing at the same place. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border-t border-line py-7 transition-colors duration-200 last:border-b hover:bg-sand/40">
      <div className="flex flex-col gap-3 px-1 sm:px-2">
        <p className="text-sm font-semibold text-amber-deep">
          {project.areas.join(", ")}
        </p>
        <h3 className="font-display text-xl font-medium text-ink transition-colors duration-200 group-hover:text-amber-deep sm:text-2xl">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="max-w-2xl text-md text-ink">{project.summary}</p>
        {project.stack.length > 0 && (
          <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="tnum text-sm text-ink">
            <span className="font-semibold">Result:</span> {project.outcome}
          </p>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`Read the ${project.title} case study`}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-md font-semibold text-ink"
          >
            Read case study
            <ArrowRight
              aria-hidden="true"
              size={18}
              className="text-amber transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
