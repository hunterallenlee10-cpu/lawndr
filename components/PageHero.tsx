import Image from "next/image";
import { Phone } from "@phosphor-icons/react/ssr";
import { Breadcrumbs } from "./ui";
import { Reveal } from "./Reveal";
import { ZipForm } from "./ZipForm";
import { site } from "@/lib/site";

/** Inner-page hero: copy and quote entry on the left, one photograph on the right. */
export function PageHero({
  crumbs,
  title,
  intro,
  image,
  imageAlt,
  formPrefix,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  formPrefix: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-x grid items-center gap-10 pb-16 pt-6 md:pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-24">
      <div className="lg:col-span-6">
        <Breadcrumbs items={crumbs} />
        <Reveal>
          <h1 className="text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{intro}</p>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 max-w-lg">
          {children ?? (
            <>
              <ZipForm idPrefix={formPrefix} />
              <a
                href={site.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink"
              >
                <Phone size={16} weight="bold" className="text-accent" />
                Prefer to talk? Call {site.phone}
              </a>
            </>
          )}
        </Reveal>
      </div>
      <Reveal delay={0.1} y={40} className="lg:col-span-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 lg:aspect-[5/5.2]">
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </Reveal>
    </section>
  );
}
