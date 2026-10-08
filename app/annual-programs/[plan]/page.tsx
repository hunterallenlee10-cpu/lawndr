import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/ssr";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, MediaCard } from "@/components/ui";
import { programBySlug, programs, serviceBySlug } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }): Promise<Metadata> {
  const { plan } = await params;
  const p = programBySlug(plan);
  if (!p) return {};
  return { title: p.name, description: p.intro, openGraph: { images: [{ url: p.image }] } };
}

export default async function ProgramPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = programBySlug(plan);
  if (!p) notFound();
  const service = serviceBySlug(p.serviceSlug);
  const others = programs.filter((o) => o.slug !== p.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Annual Programs", href: "/annual-programs" }, { label: p.name }]}
        title={p.title}
        intro={p.intro}
        image={p.image}
        imageAlt={p.imageAlt}
        formPrefix={p.slug}
      />

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-6xl font-semibold tracking-[-0.04em] text-accent md:text-7xl">
            {p.visitsBig}
          </p>
          <p className="mt-2 font-display text-xl font-semibold">{p.visitsSmall}</p>
          <p className="mt-4 max-w-sm text-ink-2">Timing adapts to your region, weather and how your yard responds.</p>
          {service && (
            <ArrowLink href={`/${service.slug}`} className="mt-8">
              How {service.name.toLowerCase()} works
            </ArrowLink>
          )}
        </div>
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-semibold md:text-4xl">What&rsquo;s included</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.includes.map((inc, i) => (
              <Reveal as="li" key={inc} delay={i * 0.04} className="flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-4 font-medium">
                <span className="grid size-7 place-items-center rounded-full bg-accent-soft text-accent">
                  <Check size={14} weight="bold" />
                </span>
                {inc}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {p.options && (
        <section className="container-x pb-24">
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
            {p.options.map((o) => (
              <div key={o.name} className="bg-surface p-8 md:p-12">
                <h3 className="font-display text-3xl font-semibold">{o.name}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-2">{o.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <GuaranteeStrip />

      <section className="container-x py-24 md:py-32">
        <h2 className="text-3xl font-semibold md:text-4xl">Other programs</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {others.map((o) => (
            <MediaCard key={o.slug} href={`/annual-programs/${o.slug}`} image={o.image} alt={o.imageAlt} title={o.name} body={o.short} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>
    </>
  );
}
