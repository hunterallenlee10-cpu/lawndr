import type { Metadata } from "next";
import Link from "next/link";
import { GoogleLogo, Quotes } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, Stars } from "@/components/ui";
import { reviews } from "@/lib/content";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Lawn Doctor averages 4.8 out of 5 from more than 30,000 Google reviews. Read what homeowners say.",
};

export default function TestimonialsPage() {
  const [featured, ...rest] = reviews;
  return (
    <>
      <section className="container-x pb-16 pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: "Why Lawn Doctor", href: "/why-choose-lawn-doctor" }, { label: "Customer Reviews" }]} />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h1 className="text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Thirty thousand reviews. One consistent story.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-center gap-5">
              <span className="font-display text-8xl font-semibold tracking-[-0.05em]">{site.rating}</span>
              <div>
                <Stars size={22} />
                <p className="mt-2 flex items-center gap-1.5 text-ink-2">
                  <GoogleLogo size={18} weight="bold" /> {site.reviewCount} Google reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <Reveal>
          <figure className="rounded-[var(--radius-card)] bg-forest p-8 text-on-forest md:p-16">
            <Quotes size={44} weight="fill" className="text-lime" />
            <blockquote className="mt-6 max-w-4xl font-display text-3xl font-semibold leading-tight md:text-5xl">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-on-forest-2">
              <Stars size={16} />
              <span className="font-semibold text-on-forest">{featured.name}</span>
              <span>Google review</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-5 columns-1 gap-5 md:columns-2">
          {rest.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05} className="mb-5 break-inside-avoid">
              <figure className="card p-8">
                <Stars />
                <blockquote className="mt-4 text-xl leading-snug md:text-2xl">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center justify-between text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-ink-3">
                    <GoogleLogo size={16} weight="bold" /> Google review
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal className="mb-5 break-inside-avoid">
            <div className="rounded-[var(--radius-card)] bg-accent-soft p-8">
              <p className="font-display text-2xl font-semibold">Ready to see it in your own yard?</p>
              <p className="mt-2 text-ink-2">Start with a free lawn evaluation from your local expert.</p>
              <Link href="/quote" className="btn btn-primary mt-6">{cta.quote}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
