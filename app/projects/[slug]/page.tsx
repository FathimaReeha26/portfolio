import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Card } from "@/components/Card";
import { CheckDoodle } from "@/components/Illustration";
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
    <article className="flex flex-col gap-8 py-8">
      <Link
        href="/#projects"
        className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-pill border-2 border-transparent px-3 text-md font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:border-ink hover:bg-teal-soft"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        All projects
      </Link>

      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-ink">{project.title}</h1>
        <p className="max-w-2xl text-lg text-ink">{project.summary}</p>
        <p className="font-mono text-sm text-ink">My role: {project.role}</p>
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
          <Card variant="standard" className="flex flex-col gap-2">
            <h2 id="problem" className="text-xl font-semibold text-ink">
              Problem
            </h2>
            <p className="text-md text-ink">{project.problem}</p>
          </Card>
        </section>
      </Reveal>

      <section aria-labelledby="approach">
        <h2 id="approach" className="mb-4 text-xl font-semibold text-ink">
          Approach
        </h2>
        <ol className="flex flex-col gap-4">
          {project.approach.map((step, index) => (
            <li key={index}>
              <Reveal>
                <Card variant="standard" className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-ink bg-teal-soft font-mono text-sm font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <p className="text-md text-ink">{step}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="architecture">
        <h2 id="architecture" className="mb-4 text-xl font-semibold text-ink">
          Architecture
        </h2>
        <ArchitectureDiagram stages={project.architecture} title={project.title} />
      </section>

      <section aria-labelledby="results">
        <h2 id="results" className="mb-4 text-xl font-semibold text-ink">
          Results
        </h2>
        <ResultsTable results={project.results} />
      </section>

      {project.learnings && project.learnings.length > 0 && (
        <Reveal>
          <section aria-labelledby="learnings">
          <Card variant="note" className="flex flex-col gap-3">
            <h2 id="learnings" className="text-xl font-semibold text-ink">
              What I learned
            </h2>
            <ul className="flex flex-col gap-2">
              {project.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3 text-md text-ink">
                  <CheckDoodle className="mt-1 h-6 w-8" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
        </Reveal>
      )}

      {project.links && project.links.length > 0 && (
        <section aria-labelledby="links">
        <h2 id="links" className="mb-4 text-xl font-semibold text-ink">
          Links
        </h2>
        <ul className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border-2 border-ink bg-paper-card px-5 py-2 text-md font-semibold text-ink shadow-pencil-sm transition-all duration-150 hover:-translate-y-px hover:bg-teal-soft hover:shadow-pencil-md"
              >
                {link.label}
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            </li>
          ))}
          </ul>
        </section>
      )}
    </article>
  );
}
