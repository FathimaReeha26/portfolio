interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

/* Handwritten section title with a teal wavy pencil underline.
   The svg is decorative; the heading carries the meaning. */
export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <h2 id={id} className="inline-block text-xl font-semibold text-ink sm:text-2xl">
        {title}
        <svg
          aria-hidden="true"
          viewBox="0 0 220 12"
          preserveAspectRatio="none"
          className="pointer-events-none mt-1 block h-3 w-full"
        >
          <path
            d="M4 8 C 40 3, 70 10, 110 6 S 180 4, 216 7"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="4"
            strokeLinecap="round"
            className="sketch-draw"
          />
        </svg>
      </h2>
      {description && <p className="mt-2 max-w-2xl text-md text-ink">{description}</p>}
    </div>
  );
}
