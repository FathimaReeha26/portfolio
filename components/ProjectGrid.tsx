import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

/* Project box grid: every project, no filtering. */
export function ProjectGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Reveal key={project.slug} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
