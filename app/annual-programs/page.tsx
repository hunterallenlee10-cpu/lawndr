import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check } from "@phosphor-icons/react/ssr";
import { Faq } from "@/components/Faq";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { programs } from "@/lib/content";
import { cta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Annual Lawn Care Programs",
  description:
    "Lawn Doctor annual programs: fertilization and weed control, mosquito control and tick control plans, scheduled for the whole season by your local expert.",
};

const faqs = [
  {
    q: "What's the difference between a program and a one-time service?",
    a: "A program schedules every visit for the season, timed to your region and weather, so protection and results build on each other. One-time services treat a specific need, like a single event spray.",
  },
  {
    q: "Can I combine programs?",
    a: "Yes. Many homeowners pair Fertilization & Weeds with mosquito or tick control. Your local expert can schedule them together.",
  },
  {
    q: "Is there an offer for new customers?",
    a: "Offers for first-time customers purchasing an annual program are available in many areas for lawns up to 5,000 sq. ft. Offers can't be combined and not all services are available everywhere.",
  },
];

export default function AnnualProgramsPage() {
  return (
    <>
      <section className="container-x pb-16 pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: "Annual Programs" }]} />
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h1 className="text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              One plan. Every visit, handled.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-end gap-6 lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-2">
              Annual programs put your lawn and yard on a season-long schedule built by your local expert.
            </p>
            <Link href="/quote" className="btn btn-primary self-start">
              {cta.quote} <ArrowRight size={16} weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-5 pb-24 md:pb-32 lg:grid-cols-2">
        {programs.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07} className={i === 0 ? "lg:row-span-2" : ""}>
            <Link
              href={`/annual-programs/${p.slug}`}
              className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors hover:border-accent ${
                i === 0 ? "" : "lg:flex-row"
              }`}
            >
              <div
                className={`relative overflow-hidden bg-surface-2 ${
                  i === 0 ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-auto lg:min-h-[260px] lg:w-2/5"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <CalendarCheck size={18} weight="bold" />
                  {p.visits}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{p.name}</h2>
                <p className="mt-2 text-ink-2">{p.short}</p>
                {i === 0 && (
                  <ul className="mt-6 grid gap-2">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-ink-2">
                        <Check size={16} weight="bold" className="text-accent" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-accent">
                  View plan <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <GuaranteeStrip />

      <section className="container-x grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">Program questions</h2>
        </div>
        <div className="lg:col-span-8">
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
