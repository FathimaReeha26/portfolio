import type { ProjectResult } from "@/content/projects";

/* Results as a readable table (subtle solid dividers, mono values).
   Numeric results also get a labeled bar — the numbers stay visible,
   so color and length never carry meaning alone. Small screens keep
   the table with horizontal scroll inside a labeled region. */
export function ResultsTable({ results }: { results: ProjectResult[] }) {
  const chartable = results.filter((r) => typeof r.value === "number");

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto rounded-lg border-2 border-dashed border-graphite bg-paper-card">
        <table className="w-full min-w-[320px] border-collapse text-left text-md text-ink">
          <caption className="p-4 text-left font-semibold">Results</caption>
          <thead>
            <tr className="border-b-2 border-solid border-graphite-soft">
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                Metric
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.label}
                className="border-b border-solid border-graphite-soft last:border-b-0"
              >
                <th scope="row" className="px-4 py-3 font-normal">
                  {result.label}
                </th>
                <td className="px-4 py-3 font-mono text-sm">{result.display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {chartable.length > 0 && (
        <div
          role="img"
          aria-label={`Chart of results: ${chartable.map((r) => `${r.label}, ${r.display}`).join("; ")}`}
          className="flex flex-col gap-3 rounded-lg border-2 border-dashed border-graphite bg-paper-card p-4"
        >
          {chartable.map((result) => (
            <div key={result.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4 text-md text-ink">
                <span>{result.label}</span>
                <span className="font-mono text-sm">{result.display}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full border-2 border-solid border-graphite bg-paper">
                <div
                  aria-hidden="true"
                  className="h-full rounded-full bg-teal"
                  style={{ width: `${Math.max(0, Math.min(100, result.value ?? 0))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
