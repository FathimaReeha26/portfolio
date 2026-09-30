interface ArchitectureDiagramProps {
  stages: string[][];
  title: string;
}

/* Hand-drawn-style architecture diagram as inline SVG: dashed graphite
   stage boxes with pencil arrows between columns. Every box is labeled
   in the SVG and the full flow is repeated as list text below, so the
   diagram is never the only carrier of the information. */
export function ArchitectureDiagram({ stages, title }: ArchitectureDiagramProps) {
  const boxWidth = 150;
  const boxHeight = 52;
  const gapX = 56;
  const gapY = 16;
  const pad = 16;

  const columns = stages.map((boxes, columnIndex) => {
    const x = pad + columnIndex * (boxWidth + gapX);
    return boxes.map((label, boxIndex) => ({
      label,
      x,
      y: pad + boxIndex * (boxHeight + gapY),
      columnIndex,
    }));
  });
  const flat = columns.flat();
  const width = pad * 2 + stages.length * boxWidth + (stages.length - 1) * gapX;
  const height =
    pad * 2 +
    (Math.max(...stages.map((boxes) => boxes.length)) * (boxHeight + gapY) - gapY);

  return (
    <figure className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border-2 border-dashed border-graphite bg-paper-card p-4">
        <svg
          role="img"
          aria-label={`${title}: ${stages.map((boxes) => boxes.join(", ")).join(" leading to ")}`}
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto block h-auto w-full max-w-3xl"
        >
          {flat.map((box) => (
            <g key={`${box.columnIndex}-${box.label}`}>
              <rect
                x={box.x}
                y={box.y}
                width={boxWidth}
                height={boxHeight}
                rx={14}
                fill="var(--paper-card)"
                stroke="var(--graphite)"
                strokeWidth={2}
                strokeDasharray="8 6"
              />
              <text
                x={box.x + boxWidth / 2}
                y={box.y + boxHeight / 2 + 5}
                textAnchor="middle"
                fontSize={13}
                fill="var(--ink)"
                fontFamily="var(--font-mono)"
              >
                {box.label.length > 22 ? `${box.label.slice(0, 21)}…` : box.label}
              </text>
            </g>
          ))}
          {stages.map((boxes, columnIndex) =>
            columnIndex === 0
              ? null
              : boxes.map((_, boxIndex) => {
                  const fromX = pad + (columnIndex - 1) * (boxWidth + gapX) + boxWidth;
                  const toX = pad + columnIndex * (boxWidth + gapX);
                  const prevCount = stages[columnIndex - 1].length;
                  const fromY =
                    pad + Math.min(boxIndex, prevCount - 1) * (boxHeight + gapY) + boxHeight / 2;
                  const toY = pad + boxIndex * (boxHeight + gapY) + boxHeight / 2;
                  return (
                    <g key={`arrow-${columnIndex}-${boxIndex}`}>
                      <line
                        x1={fromX}
                        y1={fromY}
                        x2={toX - 8}
                        y2={toY}
                        stroke="var(--teal)"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                      <path
                        d={`M ${toX - 8} ${toY - 6} L ${toX} ${toY} L ${toX - 8} ${toY + 6}`}
                        fill="none"
                        stroke="var(--teal)"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })
          )}
        </svg>
      </div>
      <figcaption className="sr-only">
        {stages.map((boxes, i) => `Stage ${i + 1}: ${boxes.join(", ")}`).join(". ")}
      </figcaption>
      <ol className="flex flex-col gap-2 text-md text-ink">
        {stages.map((boxes, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="font-mono text-sm font-semibold">
              {i + 1}.
            </span>
            <span>{boxes.join(" → ")}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
