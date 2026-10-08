import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/ssr";
import { Faq } from "@/components/Faq";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MediaCard } from "@/components/ui";
import { serviceBySlug, services } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const s = serviceBySlug(service);
  if (!s) return {};
  return {
    title: s.name,
    description: s.metaDescription,
    alternates: { canonical: `/${s.slug}/` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = serviceBySlug(service);
  if (!s) notFound();

  const parent = s.category === "lawn" ? { label: "Lawn Care", href: "/lawn-care" } : { label: "Lawn Pest Control", href: "/pest_control" };
  const related = s.related.map((slug) => serviceBySlug(slug)).filter((r) => r !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.metaDescription,
    provider: { "@type": "Organization", name: "Lawn Doctor" },
    areaServed: "US",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[parent, { label: s.name }]}
        title={s.title}
        intro={s.intro}
        image={s.image}
        imageAlt={s.imageAlt}
        formPrefix={s.slug}
      />

      {/* Quick facts */}
      <section aria-label={`${s.name} at a glance`} className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-4">
          {s.facts.map((f) => (
            <div key={f.label} className="bg-surface p-6 md:p-8">
              <dt className="text-sm text-ink-3">{f.label}</dt>
              <dd className="mt-2 font-display text-lg font-semibold leading-snug md:text-xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Process, with the signature number beside it */}
      <section className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="max-w-md text-4xl font-semibold leading-[1.05] md:text-5xl">{s.stepsTitle}</h2>
          {s.stat && (
            <Reveal className="mt-12 border-t border-line pt-8">
              <p className="font-display text-7xl font-semibold tracking-[-0.05em] text-accent md:text-8xl">{s.stat.value}</p>
              <p className="mt-2 font-display text-xl font-semibold">{s.stat.label}</p>
              <p className="mt-2 max-w-sm text-ink-2">{s.stat.body}</p>
            </Reveal>
          )}
        </div>
        <ol className="relative lg:col-span-7">
          {s.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-12 last:pb-0">
              {i < s.steps.length - 1 && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-line" />}
              <span className="grid size-12 place-items-center rounded-full border border-line bg-surface font-display font-semibold text-accent">
                {i + 1}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xl text-lg leading-relaxed text-ink-2">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Included / coverage chips */}
      <section className="container-x pb-24 md:pb-32">
        <div className="rounded-[var(--radius-card)] bg-surface-2 p-8 md:p-14">
          <h2 className="text-3xl font-semibold md:text-4xl">{s.includedTitle}</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {s.included.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-medium"
              >
                <Check size={16} weight="bold" className="text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GuaranteeStrip />

      <section className="container-x grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">{s.name} questions</h2>
        </div>
        <div className="lg:col-span-8">
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <h2 className="text-3xl font-semibold md:text-4xl">Pairs well with</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
          {related.map((r) => (
            <MediaCard key={r.slug} href={`/${r.slug}`} image={r.image} alt={r.imageAlt} title={r.name} body={r.intro.match(/^[^.]+\./)?.[0] ?? r.intro} />
          ))}
        </div>
      </section>
    </>
  );
}
