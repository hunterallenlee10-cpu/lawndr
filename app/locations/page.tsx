import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { LocationFinder, LocationFinderFromUrl } from "@/components/LocationFinder";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, Stars } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Local Lawn Doctor",
  description: `Lawn Doctor has ${site.locations} locally owned locations in ${site.states} states. Enter your ZIP code to connect with the Lawn Doctor that serves your area and get a free quote.`,
  alternates: { canonical: "/locations/" },
  openGraph: { images: [{ url: "/images/neighborhood-aerial.jpg" }] },
};

const ownership = [
  {
    title: "An owner who lives where you do.",
    body: "Your Lawn Doctor is owned by someone who lives and works in your community. The person accountable for your lawn is a neighbor, not a name on a corporate org chart.",
  },
  {
    title: "Knows your weather, soil and grass.",
    body: "What a lawn needs, and when, depends on the region. A local owner plans treatments around your climate, your soil and the grass types that actually grow in your area.",
  },
  {
    title: "No big-business runaround.",
    body: "Questions go to people who know your yard. If something isn't right, the team that treats your lawn is the team that comes back to fix it.",
  },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero with the finder. Columns align to the top so the result card never shifts the photo. */}
      <section className="container-x grid gap-10 pb-16 pt-6 md:pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-24">
        <div className="lg:col-span-6 lg:pt-6">
          <Breadcrumbs items={[{ label: "Locations" }]} />
          <Reveal>
            <h1 className="text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]">
              Find your local Lawn Doctor.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Lawn Doctor is {site.locations} locally owned locations in {site.states} states. Enter your ZIP code and
              we&rsquo;ll connect you with the team that serves your neighborhood.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-8 max-w-lg">
            <Suspense fallback={<LocationFinder />}>
              <LocationFinderFromUrl />
            </Suspense>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={40} className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 lg:aspect-[5/5.2]">
            <Image
              src="/images/neighborhood-aerial.jpg"
              alt="Aerial view of a suburban neighborhood with green lawns"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* What local ownership means: sticky intro beside a numbered editorial list. */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Locally owned</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] md:text-5xl">What local ownership means.</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-2">
                Lawn Doctor is a national name made up of local businesses. Here is what that changes for you.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {ownership.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className="grid gap-3 border-t border-line py-9 last:border-b sm:grid-cols-[5.5rem_1fr] sm:gap-6 md:py-12"
              >
                <span
                  aria-hidden
                  className="font-display text-5xl font-semibold leading-none tracking-[-0.05em] text-accent md:text-6xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Lawn Doctor locations by the numbers" className="container-x pb-16 md:pb-24">
        <dl className="grid gap-y-8 rounded-[var(--radius-card)] bg-surface-2 p-8 md:grid-cols-3 md:p-12">
          {[
            { value: site.locations, label: "Locally owned locations" },
            { value: site.states, label: "States served" },
            { value: site.rating, label: "Average Google rating", stars: true },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className={i > 0 ? "border-t border-line pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0" : "md:pr-10"}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{s.value}</span>
                {s.stars && <Stars size={14} className="mt-2" />}
                <span className="mt-2 block text-sm text-ink-3">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Franchise CTA */}
      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-8 border-t border-line pt-12 md:pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">Franchising</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
              Be the Lawn Doctor in your own neighborhood.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Every Lawn Doctor location is owned and run by a local operator. If you want to build a business where you
              live, start on the franchise site.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <a href={site.franchiseUrl} className="btn btn-primary group">
              Own a Lawn Doctor franchise
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
