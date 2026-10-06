interface TimelineItem {
  title: string;
  subtitle: string;
  dates: string;
  bullets: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

/* Quiet vertical timeline: a single line with amber nodes.
   Dates in tabular numerals. */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative ml-1.5 flex flex-col gap-8 border-l border-line pl-8">
      {items.map((item) => (
        <li key={`${item.title}-${item.subtitle}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-8 block h-3 w-3 -translate-x-1/2 rounded-full bg-amber"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-lg font-medium text-ink">
              {item.title}
            </h3>
            <p className="text-md text-ink">
              {item.subtitle},{" "}
              <span className="tnum text-sm">{item.dates}</span>
            </p>
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-amber">
              {item.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
