"use client";

import { useState } from "react";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { PulseMark } from "@/components/Illustration";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spinner } from "@/components/Spinner";
import { Textarea } from "@/components/Textarea";
import { Timeline } from "@/components/Timeline";

/* Review-only primitive showcase for the Folio system. Unlinked from
   navigation; delete this folder before deploying if you prefer. */
export default function StyleguidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chipOn, setChipOn] = useState(true);

  return (
    <div className="flex flex-col gap-12 py-12">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-display text-3xl font-medium text-ink">
          Styleguide
        </h1>
        <p className="text-md text-ink">
          Every Folio primitive with its states. Review here, then delete
          this page before deploying if you do not want it public.
        </p>
      </header>

      <section aria-labelledby="sg-type" className="flex flex-col gap-3">
        <h2 id="sg-type" className="font-display text-xl font-medium text-ink">
          Type scale
        </h2>
        <p className="font-display text-4xl font-medium text-ink">
          Display <em className="text-amber">italic</em>
        </p>
        <p className="font-display text-2xl font-medium text-ink">Section heading</p>
        <p className="text-md text-ink">
          Body copy at 17 pixels with a generous measure for comfortable reading.
        </p>
        <p className="tnum text-sm text-ink">Tabular facts, 2024 – 2028, CGPA 8.3/10</p>
      </section>

      <section aria-labelledby="sg-buttons" className="flex flex-col gap-4">
        <h2 id="sg-buttons" className="font-display text-xl font-medium text-ink">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Save changes</Button>
          <Button variant="secondary">View examples</Button>
          <Button variant="tertiary">Learn more</Button>
          <Button variant="destructive">Delete note</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" loading>
            Saving changes…
          </Button>
          <Button variant="secondary" disabled>
            Continue
          </Button>
          <Spinner />
        </div>
      </section>

      <section aria-labelledby="sg-chips" className="flex flex-col gap-4">
        <h2 id="sg-chips" className="font-display text-xl font-medium text-ink">
          Chips
        </h2>
        <div className="flex flex-wrap gap-2">
          <Chip selected={chipOn} onSelect={() => setChipOn(!chipOn)}>
            Machine learning
          </Chip>
          <Chip>Systems</Chip>
          <Chip>Python</Chip>
        </div>
      </section>

      <section aria-labelledby="sg-cards" className="flex flex-col gap-4">
        <h2 id="sg-cards" className="font-display text-xl font-medium text-ink">
          Surfaces
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card variant="default">
            <h3 className="font-display text-lg font-medium text-ink">Default</h3>
            <p className="mt-1 text-md text-ink">Bordered paper surface.</p>
          </Card>
          <Card variant="sand">
            <h3 className="font-display text-lg font-medium text-ink">Sand</h3>
            <p className="mt-1 text-md text-ink">Quiet tinted surface.</p>
          </Card>
          <Card variant="pine">
            <h3 className="font-display text-lg font-medium text-paper">Pine</h3>
            <p className="mt-1 text-md text-paper">Inverted feature surface.</p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="sg-forms" className="flex flex-col gap-4">
        <h2 id="sg-forms" className="font-display text-xl font-medium text-ink">
          Forms
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="sg-email"
            label="Email address"
            type="email"
            required
            placeholder="you@example.com"
            hint="Used only to reply to you."
          />
          <Input
            id="sg-name"
            label="Full name"
            required
            defaultValue="Ada"
            error="Enter your full name so I know what to call you."
          />
        </div>
        <Textarea
          id="sg-message"
          label="Message"
          rows={4}
          placeholder="Write your message here…"
        />
      </section>

      <section aria-labelledby="sg-alerts" className="flex flex-col gap-4">
        <h2 id="sg-alerts" className="font-display text-xl font-medium text-ink">
          Alerts
        </h2>
        <Alert variant="success" title="Changes saved.">
          Your folio is up to date.
        </Alert>
        <Alert variant="warning" title="Review this step before continuing.">
          One section still needs your attention.
        </Alert>
        <Alert variant="error" title="The file could not be uploaded. Try again.">
          Check your connection and retry.
        </Alert>
        <Alert variant="tip" title="Tip">
          Shortcuts are listed in the help page.
        </Alert>
      </section>

      <section aria-labelledby="sg-modal" className="flex flex-col gap-4">
        <h2 id="sg-modal" className="font-display text-xl font-medium text-ink">
          Modal
        </h2>
        <div>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open dialog
          </Button>
        </div>
        <Modal
          open={modalOpen}
          title="Delete this note?"
          onClose={() => setModalOpen(false)}
        >
          <p className="mb-4">
            This action cannot be undone. The note leaves your folio for good.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="destructive" onClick={() => setModalOpen(false)}>
              Delete note
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Keep it
            </Button>
          </div>
        </Modal>
      </section>

      <section aria-labelledby="sg-headings" className="flex flex-col gap-4">
        <h2 id="sg-headings" className="font-display text-xl font-medium text-ink">
          Headings and marks
        </h2>
        <SectionHeading
          id="sg-demo"
          title="Section heading"
          description="Amber rule included."
        />
        <PulseMark className="h-8 w-36" />
      </section>

      <section aria-labelledby="sg-timeline" className="flex flex-col gap-4">
        <h2 id="sg-timeline" className="font-display text-xl font-medium text-ink">
          Timeline
        </h2>
        <Timeline
          items={[
            {
              title: "Sample role",
              subtitle: "Sample org",
              dates: "2024 – 2025",
              bullets: ["Did a thing with a result."],
            },
          ]}
        />
      </section>
    </div>
  );
}
