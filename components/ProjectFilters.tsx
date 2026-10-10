"use client";

import { useState } from "react";
import { projectAreas, projects, type ProjectArea } from "@/content/projects";
import { Chip } from "./Chip";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

type Filter = ProjectArea | "All";

/* Project box grid with area filter chips. Selection is announced
   via aria-live so screen reader users hear the result count change. */
export function ProjectFilters() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.areas.includes(filter));

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2">
        {(["All", ...projectAreas] as Filter[]).map((area) => (
          <Chip
            key={area}
            selected={filter === area}
            onSelect={() => setFilter(area)}
          >
            {area}
          </Chip>
        ))}
      </div>
      <p aria-live="polite" className="tnum text-sm text-ink">
        Showing {visible.length} of {projects.length} projects
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>
      {visible.length === 0 ? (
        <p className="rounded-md border border-line bg-paper p-6 text-md text-ink">
          No projects match this filter yet. Try a different area.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Reveal key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
