"use client";

import { useState } from "react";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import {
  ArrowDoodle,
  CheckDoodle,
  LoopDoodle,
  PaperclipDoodle,
  StarDoodle,
} from "@/components/Illustration";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { SectionHeading } from "@/components/SectionHeading";
import { SketchDivider } from "@/components/SketchDivider";
import { Spinner } from "@/components/Spinner";
import { Textarea } from "@/components/Textarea";
import { Timeline } from "@/components/Timeline";

/* Review-only primitive showcase. Unlinked from navigation;
   delete this folder before deploying if you prefer. */
export default function StyleguidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chipOn, setChipOn] = useState(true);

  return (
    <div className="flex flex-col gap-10 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Styleguide</h1>
        <p className="max-w-2xl text-md text-ink">
          Every Sketch primitive with its states. Review here, then delete
          this page before deploying if you do not want it public.
        </p>
      </header>

      <section aria-labelledby="sg-buttons" className="flex flex-col gap-4">
        <h2 id="sg-buttons" className="text-xl font-semibold text-ink">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Save changes</Button>
          <Button variant="secondary">View examples</Button>
          <Button variant="tertiary">Learn more</Button>
          <Button variant="destructive">Delete note</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
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
        <h2 id="sg-chips" className="text-xl font-semibold text-ink">
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
        <h2 id="sg-cards" className="text-xl font-semibold text-ink">
          Cards
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card variant="sketch">
            <h3 className="text-lg font-semibold text-ink">Sketch card</h3>
            <p className="text-md text-ink">Dashed outline, pencil shadow.</p>
          </Card>
          <Card variant="note">
            <h3 className="text-lg font-semibold text-ink">Note card</h3>
            <p className="text-md text-ink">Paper-soft informal surface.</p>
          </Card>
          <Card variant="standard" selected>
            <h3 className="text-lg font-semibold text-ink">Selected card</h3>
            <p className="text-md text-ink">Solid teal outline when selected.</p>
          </Card>
          <Card variant="data">
            <h3 className="text-lg font-semibold text-ink">Data card</h3>
            <p className="font-mono text-sm text-ink">42 sketchbooks filled</p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="sg-forms" className="flex flex-col gap-4">
        <h2 id="sg-forms" className="text-xl font-semibold text-ink">
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
        <h2 id="sg-alerts" className="text-xl font-semibold text-ink">
          Alerts
        </h2>
        <Alert variant="success" title="Changes saved.">
          Your sketchbook is up to date.
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
        <h2 id="sg-modal" className="text-xl font-semibold text-ink">
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
            This action cannot be undone. The note leaves your sketchbook for
            good.
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

      <section aria-labelledby="sg-type" className="flex flex-col gap-4">
        <h2 id="sg-type" className="text-xl font-semibold text-ink">
          Headings, dividers, doodles
        </h2>
        <SectionHeading
          id="sg-demo"
          title="Section heading"
          description="Wavy teal underline included."
        />
        <SketchDivider />
        <div className="flex flex-wrap items-center gap-6">
          <ArrowDoodle className="h-12 w-20" />
          <StarDoodle className="h-8 w-8" />
          <LoopDoodle className="h-12 w-32" />
          <CheckDoodle className="h-8 w-10" />
          <PaperclipDoodle className="h-14 w-6" />
        </div>
      </section>

      <section aria-labelledby="sg-timeline" className="flex flex-col gap-4">
        <h2 id="sg-timeline" className="text-xl font-semibold text-ink">
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
