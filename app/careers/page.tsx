import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Briefcase, Plant, Truck } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build a career outdoors with your local Lawn Doctor. Lawn care technicians, sales and office roles, plus franchise ownership.",
};

const roles = [
  {
    Icon: Truck,
    title: "Lawn care technicians",
    body: "Work outside, learn agronomy, and operate equipment our company designs and builds.",
  },
  {
    Icon: Plant,
    title: "Lawn care experts & sales",
    body: "Evaluate lawns, explain what they need, and build plans homeowners actually understand.",
  },
  {
    Icon: Briefcase,
    title: "Office & customer care",
    body: "Keep schedules running and customers happy for a locally owned business.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="container-x grid gap-10 pb-20 pt-6 md:pt-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Breadcrumbs items={[{ label: "Why Lawn Doctor", href: "/why-choose-lawn-doctor" }, { label: "Careers" }]} />
          <Reveal>
            <h1 className="text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Grow a career that gets you outside.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Every Lawn Doctor is locally owned, so you work for a neighbor, not a faceless corporation. Openings are posted by
              each local location.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.lawndoctor.com/careers/" className="btn btn-primary">
              See open positions <ArrowUpRight size={16} weight="bold" />
            </a>
            <a href={site.franchiseUrl} className="btn btn-ghost">
              Own a franchise <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={40} className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
            <Image src="/images/summer-lawn.jpg" alt="Sprinkler watering a sunlit lawn" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line lg:grid-cols-[1.4fr_1fr_1fr]">
          {roles.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.06} className={`bg-surface p-8 md:p-10 ${i === 0 ? "lg:bg-accent-soft" : ""}`}>
              <Icon size={32} weight="duotone" className="text-accent" />
              <h2 className={`mt-8 font-display font-semibold ${i === 0 ? "text-3xl" : "text-2xl"}`}>{title}</h2>
              <p className="mt-3 max-w-sm text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
