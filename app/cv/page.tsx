import type { Metadata } from "next";
import { Alert } from "@/components/Alert";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { coursework, education } from "@/content/education";
import { experience } from "@/content/experience";
import { publications } from "@/content/publications";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: `CV · ${site.name}`,
  description: `Curriculum vitae of ${site.name}: education, experience, skills, and contact details.`,
};

/* CV page mirroring the PDF. To enable PDF downloads, add the file as
   public/cv.pdf and point site.cvHref at "/cv.pdf" (see README). */
export default function CvPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">
          Curriculum vitae
        </h1>
        <p className="text-lg text-ink">{site.name}</p>
        <p className="font-mono text-sm text-ink">
          {site.degree} · {site.school} · {site.graduation}
        </p>
        <p className="font-mono text-sm text-ink">{site.email}</p>
      </header>

      <Alert variant="note" title="About the PDF version">
        The downloadable PDF is added separately. Place it at
        <span className="font-mono text-sm"> public/cv.pdf </span>
        and point the CV links at it — everything on this page already
        mirrors what belongs in the file.
      </Alert>

      <section aria-labelledby="cv-education">
        <SectionHeading id="cv-education" title="Education" />
        <div className="flex flex-col gap-4">
          {education.map((item) => (
            <Reveal key={item.degree}>
              <Card variant="standard">
                <h3 className="text-lg font-semibold text-ink">{item.degree}</h3>
                <p className="text-md text-ink">
                  {item.school} ·{" "}
                  <span className="font-mono text-sm">{item.dates}</span>
                </p>
                <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-graphite">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="cv-experience">
        <SectionHeading id="cv-experience" title="Experience" />
        <div className="flex flex-col gap-4">
          {experience.map((item) => (
            <Reveal key={`${item.role}-${item.org}`}>
              <Card variant="standard">
                <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
                <p className="text-md text-ink">
                  {item.org} ·{" "}
                  <span className="font-mono text-sm">{item.dates}</span>
                </p>
                <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-graphite">
                  {item.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="cv-skills">
        <SectionHeading id="cv-skills" title="Skills and coursework" />
        <div className="flex flex-col gap-4">
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
          <div>
            <h3 className="mb-2 text-md font-semibold text-ink">
              Relevant coursework
            </h3>
            <p className="font-mono text-sm text-ink">{coursework.join(" · ")}</p>
          </div>
        </div>
      </section>

      {publications.length > 0 && (
        <section aria-labelledby="cv-publications">
          <SectionHeading id="cv-publications" title="Publications" />
          <ul className="flex list-disc flex-col gap-2 pl-6 text-md text-ink marker:text-graphite">
            {publications.map((publication) => (
              <li key={publication.citation}>{publication.citation}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
