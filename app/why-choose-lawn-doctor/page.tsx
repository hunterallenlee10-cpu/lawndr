import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, MedalMilitary, SealCheck, Star, UsersThree } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, Stars } from "@/components/ui";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Choose Lawn Doctor",
  description:
    "Highest customer retention and online review score among national lawn care providers, locally owned, and backed by the No Nonsense Guarantee.",
};

export default function WhyPage() {
  return (
    <>
      <section className="container-x pb-12 pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: "Why Lawn Doctor" }]} />
        <Reveal>
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            We care more because we live here too.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
            Your Lawn Doctor owner lives, works and raises a family in the community they serve. That changes how a job gets done.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6 md:gap-5">
          <Reveal className="md:col-span-4 md:row-span-2">
            <div className="relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-forest p-8 text-white md:p-12">
              <Image src="/images/neighborhood-aerial.jpg" alt="Aerial view of a suburban neighborhood with green lawns" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07150c]/90 via-[#07150c]/30 to-transparent" />
              <div className="relative max-w-lg">
                <UsersThree size={34} weight="duotone" className="text-lime" />
                <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Highest customer retention in the industry.</h2>
                <p className="mt-3 text-white/80">Compared with other national lawn care providers. People stay because the results do.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-accent-soft p-8">
              <Star size={30} weight="fill" className="text-star" />
              <div>
                <p className="font-display text-5xl font-semibold tracking-[-0.04em]">{site.rating}</p>
                <p className="mt-2 font-semibold">Highest online review score</p>
                <p className="mt-1 text-sm text-ink-2">Among national brands, tracked by a Google-approved review provider.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <MedalMilitary size={30} weight="duotone" className="text-accent" />
              <div>
                <p className="font-display text-5xl font-semibold tracking-[-0.04em]">{site.since}</p>
                <p className="mt-2 font-semibold">Decades of lawn science</p>
                <p className="mt-1 text-sm text-ink-2">From the first automated lawn care machine to patented Turf Tamer equipment.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-3">
            <div className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <Handshake size={30} weight="duotone" className="text-accent" />
              <div>
                <h3 className="font-display text-2xl font-semibold">Locally owned. No big-business runaround.</h3>
                <p className="mt-2 text-ink-2">Talk to the person who owns the business, not a call center three states away.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-3">
            <Link href="/our_guarantee" className="group flex h-full flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-forest p-8 text-on-forest">
              <SealCheck size={30} weight="duotone" className="text-lime" />
              <div>
                <h3 className="font-display text-2xl font-semibold">The best guarantee in the business.</h3>
                <p className="mt-2 text-on-forest-2">Not 100% satisfied? We&rsquo;ll make it right.</p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-lime">
                  Read the guarantee <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
            <Image src="/images/barefoot-grass.jpg" alt="Bare feet resting on soft green grass" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">Your weekends, back.</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
            Fertilizing, seeding, aerating, weed control, and mosquito and tick control. We handle all of it, from diagnosis to a
            full makeover, so the only lawn job left is enjoying it.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Custom programs", "Built for your yard, never a template."],
              ["Power seeding & pH balancing", "Treatments that fix causes, not symptoms."],
              ["Whole-yard pest control", "Mosquito and tick coverage for kids and pets."],
              ["Organic options", "Natural lawn care when you want it."],
            ].map(([t, b]) => (
              <li key={t} className="border-t border-line pt-4">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="mt-1 text-ink-2">{b}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/quote" className="btn btn-primary">{cta.quote}</Link>
            <span className="inline-flex items-center gap-2 text-sm text-ink-2">
              <Stars size={14} /> {site.rating} from {site.reviewCount} reviews
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
