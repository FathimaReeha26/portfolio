import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Card } from "@/components/Card";
import { ResultsTable } from "@/components/ResultsTable";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/content/projects";
import { Chip } from "@/components/Chip";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-12 py-12">
      <Link
        href="/#projects"
        className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-md px-2 text-md font-semibold text-ink underline decoration-amber decoration-2 underline-offset-4"
      >
        <ArrowLeft aria-hidden="true" size={18} className="text-amber" />
        All projects
      </Link>

      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-semibold text-amber-deep">
          {project.areas.join(", ")} — Case study
        </p>
        <h1 className="font-display text-3xl leading-tight font-medium text-ink sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-ink">{project.summary}</p>
        <p className="tnum text-sm text-ink">My role: {project.role}</p>
        {project.stack.length > 0 && (
          <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        )}
      </header>

      <Reveal>
        <section aria-labelledby="problem">
          <Card variant="sand" className="flex max-w-3xl flex-col gap-2">
            <h2 id="problem" className="font-display text-xl font-medium text-ink">
              Problem
            </h2>
            <p className="text-md text-ink">{project.problem}</p>
          </Card>
        </section>
      </Reveal>

      <section aria-labelledby="approach" className="max-w-3xl">
        <h2 id="approach" className="mb-6 font-display text-xl font-medium text-ink">
          Approach
        </h2>
        <ol className="flex flex-col gap-6">
          {project.approach.map((step, index) => (
            <li key={index}>
              <Reveal>
                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="tnum text-sm font-semibold text-amber-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-md text-ink">{step}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="architecture" className="max-w-3xl">
        <h2 id="architecture" className="mb-6 font-display text-xl font-medium text-ink">
          Architecture
        </h2>
        <ArchitectureDiagram stages={project.architecture} title={project.title} />
      </section>

      <section aria-labelledby="results" className="max-w-3xl">
        <h2 id="results" className="mb-6 font-display text-xl font-medium text-ink">
          Results
        </h2>
        <ResultsTable results={project.results} />
      </section>

      {project.learnings && project.learnings.length > 0 && (
        <Reveal>
          <section aria-labelledby="learnings" className="max-w-3xl">
            <Card variant="default" className="flex flex-col gap-3">
              <h2 id="learnings" className="font-display text-xl font-medium text-ink">
                What I learned
              </h2>
              <ul className="flex flex-col gap-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-3 text-md text-ink">
                    <Check aria-hidden="true" size={18} className="mt-1 shrink-0 text-amber" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </Reveal>
      )}

      {project.links && project.links.length > 0 && (
        <section aria-labelledby="links" className="max-w-3xl">
          <h2 id="links" className="mb-6 font-display text-xl font-medium text-ink">
            Links
          </h2>
          <ul className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-line bg-paper px-5 py-2 text-md font-semibold text-ink transition-colors duration-200 hover:border-ink"
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" size={16} className="text-amber" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
