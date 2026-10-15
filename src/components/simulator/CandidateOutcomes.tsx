import type { CandidateSummary } from "@/lib/simulator-store";

function money(amount: number): string {
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}

function stakeLabel(fraction: number): string {
  return `${Math.round(fraction * 100)}%`;
}

// Log position on the axis. Equal distances mean equal multiplication,
// so a lucky investor at the far right cannot squash every other row.
function pos(value: number, lo: number, hi: number): number {
  const safe = (n: number) => Math.log(Math.max(n, 1e-9));
  const a = safe(lo);
  const b = safe(hi);
  if (b === a) return 0;
  return ((safe(value) - a) / (b - a)) * 100;
}

/**
 * One row per candidate stake. The thin bar is the middle 90% of simulated
 * investors (5th to 95th percentile). The thick bar is the middle 50%
 * (25th to 75th). The tick is the median. The dashed line is the buy-in.
 */
export function CandidateOutcomes({
  candidates,
  buyIn,
  recommended,
}: {
  candidates: CandidateSummary[];
  buyIn: number;
  recommended: number;
}) {
  const points = candidates.flatMap((c) => [c.p5, c.p25, c.median, c.p75, c.p95, buyIn]);
  const positive = points.filter((n) => n > 0);
  const lo = Math.min(...positive);
  const hi = Math.max(...positive);
  const buyAt = pos(buyIn, lo, hi);

  return (
    <figure className="mt-4">
      <ul className="space-y-5">
        {candidates.map((candidate) => {
          const chosen = Math.abs(candidate.fraction - recommended) < 1e-9;
          const thinLeft = pos(candidate.p5, lo, hi);
          const thinWidth = Math.max(pos(candidate.p95, lo, hi) - thinLeft, 0.4);
          const thickLeft = pos(candidate.p25, lo, hi);
          const thickWidth = Math.max(pos(candidate.p75, lo, hi) - thickLeft, 0.4);
          const medianAt = pos(candidate.median, lo, hi);
          return (
            <li
              key={candidate.fraction}
              className={chosen ? "rounded-lg border border-accent px-3 py-2" : "px-3 py-2"}
            >
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-semibold">
                  {stakeLabel(candidate.fraction)} stake
                  {chosen ? <span className="text-accent"> · recommended</span> : null}
                </span>
                <span className="tabular-nums text-muted">median {money(candidate.median)}</span>
              </div>
              <div className="relative mt-2 h-8">
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-line"
                  style={{ left: `${thinLeft}%`, width: `${thinWidth}%` }}
                />
                <div
                  className={
                    chosen
                      ? "absolute top-1/2 h-3 -translate-y-1/2 rounded-sm bg-accent/40"
                      : "absolute top-1/2 h-3 -translate-y-1/2 rounded-sm bg-muted/50"
                  }
                  style={{ left: `${thickLeft}%`, width: `${thickWidth}%` }}
                />
                <div
                  className={
                    chosen
                      ? "absolute top-0 h-full w-0.5 bg-accent"
                      : "absolute top-0 h-full w-0.5 bg-ink"
                  }
                  style={{ left: `${medianAt}%` }}
                />
                <div
                  className="pointer-events-none absolute top-0 h-full border-l border-dashed border-muted"
                  style={{ left: `${buyAt}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-3 max-w-prose text-sm text-muted">
        Each row is 20,000 simulated investors. The thin bar covers the middle 90%, the thick bar
        the middle 50%, and the dark tick is the typical investor. The dashed line is the{" "}
        {money(buyIn)} buy-in, so anything to its left is a loss. The axis is a log scale: from{" "}
        {money(lo)} to {money(hi)}, equal widths mean equal multiplication.
      </figcaption>
    </figure>
  );
}
