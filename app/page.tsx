import { ArrowDown, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import {
  ArrowDoodle,
  PaperclipDoodle,
  StarDoodle,
} from "@/components/Illustration";
import { ProjectFilters } from "@/components/ProjectFilters";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SketchDivider } from "@/components/SketchDivider";
import { Timeline } from "@/components/Timeline";
import { coursework, education } from "@/content/education";
import { experience } from "@/content/experience";
import { publications } from "@/content/publications";
import {
  bio,
  currently,
  researchInterests,
  site,
} from "@/content/site";
import { awards, skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <Hero />
      <SketchDivider />
      <About />
      <SketchDivider />
      <Projects />
      {publications.length > 0 && (
        <>
          <SketchDivider />
          <Research />
        </>
      )}
      <SketchDivider />
      <Experience />
      <SketchDivider />
      <Skills />
      <SketchDivider />
      <Contact />
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative py-8">
      <StarDoodle className="absolute top-2 right-4 hidden h-8 w-8 sm:block" />
      <p className="font-mono text-sm text-ink">
        {site.degree} · {site.school} · {site.graduation}
      </p>
      <h1 id="hero-heading" className="mt-4 text-2xl font-semibold text-ink">
        {site.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink">{site.tagline}</p>
      <p className="mt-2 max-w-2xl text-md text-ink">{site.supportingLine}</p>
      <div className="relative mt-6 flex flex-wrap items-center gap-4">
        <Button href="#projects" variant="primary">
          View projects
        </Button>
        <Button href={site.cvHref} variant="secondary">
          Download CV
        </Button>
        <ArrowDoodle className="hidden h-12 w-20 -scale-x-100 md:block" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about" className="scroll-mt-24">
      <SectionHeading
        id="about"
        title="About"
        description="A short sketch of who I am and what I am working on."
      />
      <Reveal>
        <Card variant="note" className="relative">
          <PaperclipDoodle className="absolute -top-3 right-8 h-12 w-6" />
          {bio.map((paragraph, index) => (
            <p key={index} className="mb-4 text-md text-ink last:mb-0">
              {paragraph}
            </p>
          ))}
          <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currently.map((item) => (
              <div
                key={item.label}
                className="rounded-md border-2 border-dashed border-graphite bg-paper-card p-3"
              >
                <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                <dd className="text-md text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <h3 className="mb-2 text-md font-semibold text-ink">
              Research interests
            </h3>
            <ul className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <li key={interest}>
                  <Chip>{interest}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section aria-labelledby="projects" className="scroll-mt-24">
      <SectionHeading
        id="projects"
        title="Projects"
        description="Each card opens a case study: problem, approach, results, and what I learned."
      />
      <ProjectFilters />
    </section>
  );
}

function Research() {
  return (
    <section aria-labelledby="research" className="scroll-mt-24">
      <SectionHeading id="research" title="Research and publications" />
      <ul className="flex flex-col gap-4">
        {publications.map((publication) => (
          <li key={publication.citation}>
            <Reveal>
              <Card variant="standard" className="flex flex-col gap-2">
                <p className="text-md text-ink">{publication.citation}</p>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="rounded-pill border-2 border-solid border-ink bg-teal-soft px-3 py-1 text-sm font-semibold text-ink">
                    {publication.kind}
                  </span>
                  <span className="font-mono text-sm text-ink">
                    {publication.venue}
                  </span>
                  <a
                    href={publication.href}
                    className="inline-flex min-h-[44px] items-center text-md font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4"
                  >
                    Read {publication.kind.toLowerCase()}
                  </a>
                </p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Experience() {
  return (
    <section aria-labelledby="experience" className="scroll-mt-24">
      <SectionHeading id="experience" title="Experience and education" />
      <div className="flex flex-col gap-8">
        <Reveal>
          <Timeline
            items={experience.map((item) => ({
              title: item.role,
              subtitle: item.org,
              dates: item.dates,
              bullets: item.bullets,
            }))}
          />
        </Reveal>
        <Reveal>
          <Timeline
            items={education.map((item) => ({
              title: item.degree,
              subtitle: item.school,
              dates: item.dates,
              bullets: item.details,
            }))}
          />
        </Reveal>
        <div>
          <h3 className="mb-2 text-md font-semibold text-ink">
            Relevant coursework
          </h3>
          <ul className="flex flex-wrap gap-2">
            {coursework.map((course) => (
              <li key={course}>
                <Chip>{course}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section aria-labelledby="skills" className="scroll-mt-24">
      <SectionHeading id="skills" title="Skills" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal key={group.group}>
            <Card variant="standard" className="h-full">
              <h3 className="mb-3 text-lg font-semibold text-ink">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <Chip>{skill}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
      {awards.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-md font-semibold text-ink">
            Awards, talks, and open source
          </h3>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-graphite">
            {awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section aria-labelledby="contact" className="scroll-mt-24">
      <SectionHeading
        id="contact"
        title="Say hello"
        description="The fastest way to reach me is email. My inbox is open for internships, research chats, and collaborations."
      />
      <Reveal>
        <Card variant="action" className="flex flex-col items-start gap-4">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border-2 border-ink bg-teal px-6 py-3 text-md font-semibold break-all text-ink shadow-pencil-sm transition-all duration-150 hover:-translate-y-px hover:shadow-pencil-md"
          >
            <Mail aria-hidden="true" size={18} className="shrink-0" />
            {site.email}
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex min-h-[44px] items-center font-mono text-sm text-ink underline decoration-teal decoration-2 underline-offset-4"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-sm text-ink">
            <ArrowDown aria-hidden="true" size={16} />
            No contact form here yet — email reaches me directly.
          </p>
        </Card>
      </Reveal>
    </section>
  );
}
