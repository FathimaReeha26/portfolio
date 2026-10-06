interface TimelineItem {
  title: string;
  subtitle: string;
  dates: string;
  bullets: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

/* Vertical timeline drawn as a dashed pencil line with solid teal nodes. */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative ml-3 flex flex-col gap-6 border-l-2 border-dashed border-graphite pl-8">
      {items.map((item) => (
        <li key={`${item.title}-${item.subtitle}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-8 block h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-teal"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="text-md text-ink">
              {item.subtitle},{" "}
              <span className="font-mono text-sm">{item.dates}</span>
            </p>
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-6 text-md text-ink marker:text-graphite">
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
