import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { coursework, education } from "@/content/education";
import { experience } from "@/content/experience";
import { publications } from "@/content/publications";
import { site } from "@/content/site";
import { awards, skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${site.name}: education, experience, skills, and contact details.`,
};

/* CV page mirroring the PDF. To enable PDF downloads, add the file as
   public/cv.pdf and point site.cvHref at "/cv.pdf" (see README). */
export default function CvPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <header className="flex max-w-3xl flex-col gap-2">
        <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
          Curriculum vitae
        </h1>
        <p className="font-display text-xl italic text-ink">{site.name}</p>
        <p className="tnum text-sm text-ink">
          {site.degree}, {site.school}, Class of {site.graduation}
        </p>
        <p className="tnum text-sm text-ink">{site.email}</p>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href="/cv.pdf"
          download="Fathima_Reeha_CV.pdf"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-md font-semibold text-paper transition-colors duration-200 hover:bg-amber-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber"
        >
          <Download aria-hidden="true" size={18} />
          Download PDF version
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-line bg-paper px-5 py-2.5 text-md font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber"
        >
          <ExternalLink aria-hidden="true" size={18} />
          View full PDF
        </a>
      </div>

      <section aria-labelledby="cv-education">
        <SectionHeading id="cv-education" title="Education" />
        <div className="flex flex-col gap-4">
          {education.map((item) => (
            <Reveal key={item.degree}>
              <Card variant="default">
                <h3 className="font-display text-lg font-medium text-ink">{item.degree}</h3>
                <p className="mt-1 text-md text-ink">
                  {item.school},{" "}
                  <span className="tnum text-sm">{item.dates}</span>
                </p>
                <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-amber">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {experience.length > 0 && (
        <section aria-labelledby="cv-experience">
          <SectionHeading id="cv-experience" title="Experience" />
          <div className="flex flex-col gap-4">
            {experience.map((item) => (
              <Reveal key={`${item.role}-${item.org}`}>
                <Card variant="default">
                  <h3 className="font-display text-lg font-medium text-ink">{item.role}</h3>
                  <p className="mt-1 text-md text-ink">
                    {item.org},{" "}
                    <span className="tnum text-sm">{item.dates}</span>
                  </p>
                  <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-amber">
                    {item.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="cv-skills">
        <SectionHeading id="cv-skills" title="Skills and coursework" />
        <div className="flex flex-col gap-6">
          {skillGroups.map((group) => (
            <div key={group.group}>
              <h3 className="mb-2 text-md font-semibold text-ink">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <Chip>{skill}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {coursework.length > 0 && (
            <div>
              <h3 className="mb-2 text-md font-semibold text-ink">
                Relevant coursework
              </h3>
              <p className="tnum text-sm text-ink">{coursework.join(", ")}</p>
            </div>
          )}
        </div>
      </section>

      {awards.length > 0 && (
        <section aria-labelledby="cv-achievements">
          <SectionHeading id="cv-achievements" title="Achievements" />
          <ul className="flex list-disc flex-col gap-2 pl-6 text-md text-ink marker:text-amber">
            {awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {publications.length > 0 && (
        <section aria-labelledby="cv-publications">
          <SectionHeading id="cv-publications" title="Publications" />
          <ul className="flex list-disc flex-col gap-2 pl-6 text-md text-ink marker:text-amber">
            {publications.map((publication) => (
              <li key={publication.citation}>{publication.citation}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
