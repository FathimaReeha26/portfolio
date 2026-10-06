import type { ProjectResult } from "@/content/projects";

/* Results as a readable table with quiet dividers and tabular values.
   Numeric results also get a labeled bar — the numbers stay visible,
   so color and length never carry meaning alone. */
export function ResultsTable({ results }: { results: ProjectResult[] }) {
  const chartable = results.filter((r) => typeof r.value === "number");

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto rounded-lg border border-line bg-paper">
        <table className="w-full min-w-[320px] border-collapse text-left text-md text-ink">
          <caption className="p-4 text-left font-display text-lg font-medium">
            Results
          </caption>
          <thead>
            <tr className="border-y border-line">
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
              <tr key={result.label} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-4 py-3 font-normal">
                  {result.label}
                </th>
                <td className="tnum px-4 py-3 text-sm">{result.display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {chartable.length > 0 && (
        <div
          role="img"
          aria-label={`Chart of results: ${chartable.map((r) => `${r.label}, ${r.display}`).join("; ")}`}
          className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-6"
        >
          {chartable.map((result) => (
            <div key={result.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4 text-md text-ink">
                <span>{result.label}</span>
                <span className="tnum text-sm">{result.display}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-sand">
                <div
                  aria-hidden="true"
                  className="h-full rounded-full bg-amber"
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
