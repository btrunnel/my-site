import { profile } from "@/profile";

export const metadata = { title: `About — ${profile.displayName}` };

/**
 * The human-facing twin of /api/profile. Because both read from
 * src/profile.ts, they agree by construction, which is exactly what the
 * course's "/about matches the API" check verifies.
 */
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photoPath}
          alt={profile.displayName}
          className="h-64 w-64 shrink-0 rounded-2xl border border-line object-cover object-top"
        />
        <div className="pt-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.displayName}</h1>
          <p className="mt-4 text-lg text-muted">
            From <span className="font-semibold text-ink">{profile.hometown}</span>
          </p>
          <p className="mt-8 max-w-prose leading-relaxed">{profile.bio}</p>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-2xl font-bold tracking-tight">A few fun facts</h2>
        <ul className="mt-8 space-y-5">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex gap-4">
              <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-ink" />
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-line pt-10">
        <h2 className="text-xl font-bold tracking-tight">A decision I&apos;m proud of</h2>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
          &ldquo;{profile.decisionImProudOf}&rdquo;
        </p>
      </section>
    </main>
  );
}
