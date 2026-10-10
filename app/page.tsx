import { ArrowDown, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { coursework, education } from "@/content/education";
import { experience } from "@/content/experience";
import { publications } from "@/content/publications";
import { bio, currently, researchInterests, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
};

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-4 sm:gap-20">
      <Hero />
      <About />
      <Projects />
      {publications.length > 0 && <Research />}
      <Experience />
      <Contact />
    </div>
  );
}

function About() {
  return (
    <section aria-labelledby="about" className="scroll-mt-24">
      <SectionHeading
        id="about"
        title="About"
        description="A short account of who I am and what I am working on."
      />
      <Reveal>
        <Card variant="sand" className="flex flex-col gap-6">
          <div className="max-w-2xl">
            {bio.map((paragraph, index) => (
              <p key={index} className="mb-4 text-md text-ink last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {currently.map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold text-amber-deep">
                  {item.label}
                </dt>
                <dd className="mt-1 text-md text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div>
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
      />
      <ProjectGrid />
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
              <Card variant="default" className="flex flex-col gap-2">
                <p className="text-md text-ink">{publication.citation}</p>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="rounded-sm bg-amber-soft px-2.5 py-1 text-sm font-semibold text-amber-deep">
                    {publication.kind}
                  </span>
                  <span className="tnum text-sm text-ink">
                    {publication.venue}
                  </span>
                  <a
                    href={publication.href}
                    className="inline-flex min-h-[44px] items-center text-md font-semibold text-ink underline decoration-amber decoration-2 underline-offset-4"
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
        {experience.length > 0 && (
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
        )}
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
        {coursework.length > 0 && (
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
        )}
      </div>
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
        <Card variant="pine" className="flex flex-col items-start gap-5">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-paper px-6 py-3 text-md font-semibold break-all text-ink transition-colors duration-200 hover:bg-amber hover:text-paper"
          >
            <Mail aria-hidden="true" size={18} className="shrink-0" />
            {site.email}
          </a>
          {site.socials.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="tnum inline-flex min-h-[44px] items-center text-sm text-paper/85 underline decoration-amber decoration-2 underline-offset-4 hover:text-paper dark:text-cream/85 dark:hover:text-cream"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="flex items-center gap-2 text-sm text-paper/75 dark:text-cream/75">
            <ArrowDown aria-hidden="true" size={16} />
            No contact form here yet — email reaches me directly.
          </p>
        </Card>
      </Reveal>
    </section>
  );
}
