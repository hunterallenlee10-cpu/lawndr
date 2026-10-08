import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { GuaranteeStrip } from "./GuaranteeStrip";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { ReviewMarquee } from "./ReviewMarquee";
import { ArrowLink } from "./ui";
import { programs, services } from "@/lib/content";

export function CategoryPage({
  category,
  label,
  title,
  intro,
  image,
  imageAlt,
  programSlugs,
}: {
  category: "lawn" | "pest";
  label: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  programSlugs: string[];
}) {
  const list = services.filter((s) => s.category === category);
  const plans = programs.filter((p) => programSlugs.includes(p.slug));

  return (
    <>
      <PageHero crumbs={[{ label }]} title={title} intro={intro} image={image} imageAlt={imageAlt} formPrefix={category} />

      <section className="container-x py-16 md:py-24">
        <h2 className="text-4xl font-semibold md:text-5xl">Services</h2>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {list.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.04}>
              <Link
                href={`/${s.slug}`}
                className="group grid items-center gap-6 py-8 md:grid-cols-12 md:gap-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 md:col-span-4">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display text-3xl font-semibold">{s.name}</h3>
                  <p className="mt-3 max-w-xl text-lg text-ink-2">{s.intro}</p>
                </div>
                <div className="md:col-span-2 md:justify-self-end">
                  <span className="grid size-14 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <ArrowRight size={20} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {plans.length > 0 && (
        <section className="container-x pb-24">
          <div className="grid gap-8 rounded-[var(--radius-card)] bg-surface-2 p-8 md:p-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Rather set it and forget it?</h2>
              <p className="mt-4 max-w-md text-ink-2">
                Annual programs schedule every visit for the season, so your yard stays protected without a single reminder.
              </p>
              <ArrowLink href="/annual-programs" className="mt-6">
                All annual programs
              </ArrowLink>
            </div>
            <ul className="grid gap-4 lg:col-span-7">
              {plans.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/annual-programs/${p.slug}`}
                    className="group flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-accent"
                  >
                    <div>
                      <p className="font-display text-xl font-semibold">{p.name}</p>
                      <p className="mt-1 text-ink-2">{p.visits}</p>
                    </div>
                    <ArrowRight size={20} weight="bold" className="text-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <GuaranteeStrip />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="text-4xl font-semibold md:text-5xl">What customers say</h2>
        </div>
        <div className="mt-10">
          <ReviewMarquee />
        </div>
      </section>
    </>
  );
}
