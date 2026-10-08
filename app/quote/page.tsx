import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Phone, SealCheck } from "@phosphor-icons/react/ssr";
import { QuoteFlow, QuoteFlowFromUrl } from "@/components/QuoteFlow";
import { Breadcrumbs, Stars } from "@/components/ui";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Lawn Care Quote",
  description:
    "Request a free lawn care quote from your local Lawn Doctor. Tell us about your yard in three short steps and a local expert will reach out to schedule a free lawn evaluation.",
  alternates: { canonical: "/quote/" },
};

export default function QuotePage() {
  return (
    <section className="container-x pb-24 pt-6 md:pb-32 md:pt-10">
      <Breadcrumbs items={[{ label: "Free quote" }]} />

      <div className="max-w-2xl">
        <h1 className="text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-5xl lg:text-[3.4rem]">
          Get your free lawn care quote.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-2">
          Three short steps. Then a local Lawn Doctor expert reaches out to schedule a free evaluation of your lawn.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Suspense fallback={<QuoteFlow />}>
            <QuoteFlowFromUrl />
          </Suspense>
          <p className="mt-5 max-w-2xl px-1 text-xs leading-relaxed text-ink-3">
            Offers apply to first-time customers purchasing an annual program, for lawns up to 5,000 sq. ft. Cannot be
            combined with other offers. Not all services available in all areas. Lawn Doctor does not provide mowing.
          </p>
        </div>

        <aside aria-label="Why Lawn Doctor" className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
            <div className="relative hidden aspect-[16/11] bg-surface-2 lg:block">
              <Image
                src="/images/lawn-inspection.jpg"
                alt="Lawn Doctor expert inspecting a residential lawn up close"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="divide-y divide-line">
              <div className="flex gap-4 p-5 md:p-6">
                <SealCheck size={32} weight="duotone" className="shrink-0 text-accent" />
                <div>
                  <p className="font-display text-lg font-semibold">No Nonsense Guarantee</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    Not satisfied? We&rsquo;ll return and reapply at no charge, or refund the full cost of your last
                    application.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 p-5 md:p-6">
                <Stars size={18} />
                <p className="text-sm font-semibold text-ink">
                  {site.rating} average from {site.reviewCount} Google reviews
                </p>
              </div>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2 md:p-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Phone size={20} weight="fill" />
                </span>
                <span>
                  <span className="block text-sm text-ink-3">Prefer to talk it through?</span>
                  <span className="block font-semibold text-ink">{cta.call}</span>
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
