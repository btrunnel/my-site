import Link from "next/link";
import { profile } from "@/profile";
import { Guestbook } from "@/components/Guestbook";

/**
 * Your home page. It's already personalized: everything here reads from
 * src/profile.ts. The "portfolio of decision services" section below is the
 * scaffold the course expects: each lane's challenge fills in one slot.
 */

const SERVICES = [
  {
    lane: 2,
    title: "Reasoning & Uncertainty",
    href: "/reasoning",
    blurb: "Audits syllogisms, updates on base rates, reads Bernoulli businesses.",
  },
  {
    lane: 3,
    title: "Decision Simulator",
    href: "/simulator",
    blurb: "Simulates investment games and recommends the growth-optimal stake.",
  },
  {
    lane: 4,
    title: "Causality Audit",
    href: "/causality",
    blurb: "Tells forks from pipes from colliders, and when to stratify.",
  },
  {
    lane: 5,
    title: "Capstone: Live Decision Service",
    href: "/capstone",
    blurb: "A full advocacy report on a real decision domain, backed by data.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="flex flex-col-reverse items-start gap-12 sm:flex-row sm:items-center sm:gap-16">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            {profile.tagline}
          </p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
            {profile.displayName}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{profile.bio}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photoPath}
          alt={profile.displayName}
          className="h-48 w-48 shrink-0 rounded-full border border-line object-cover object-top sm:h-56 sm:w-56"
        />
      </section>

      {/* ── Portfolio of decision services ───────────────────────────── */}
      <section className="mt-28">
        <h2 className="text-2xl font-bold tracking-tight">A portfolio of decision services</h2>
        <p className="mt-4 max-w-prose text-muted">
          Over the semester this site grows one live decision service per lane. Here&apos;s
          what&apos;s coming:
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li
              key={s.lane}
              className="rounded-2xl border border-line bg-surface p-7 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Lane {s.lane}
              </p>
              <h3 className="mt-3 text-lg font-bold">
                <Link href={s.href} className="transition hover:opacity-60">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Guestbook: the live database round-trip ──────────────────── */}
      <section className="mt-28">
        <h2 className="text-2xl font-bold tracking-tight">Guestbook</h2>
        <p className="mt-4 max-w-prose text-muted">
          Signed entries live in my own database: proof this site does a real round-trip.
        </p>
        <Guestbook />
      </section>
    </main>
  );
}
