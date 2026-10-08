import type { Metadata } from "next";
import Link from "next/link";
import { ArrowCounterClockwise, CurrencyDollar, Phone } from "@phosphor-icons/react/ssr";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Guarantee",
  description:
    "The Lawn Doctor No Nonsense Guarantee: if you're not 100% satisfied, we'll return and reapply at no charge or refund the full cost of your last application.",
};

const faqs = [
  {
    q: "What does the guarantee cover?",
    a: "Your most recent application. If it didn't meet the expectations set in your service plan, we'll return and reapply at no additional charge or refund the full cost of that application.",
  },
  {
    q: "How do I use it?",
    a: `Call your local Lawn Doctor, or ${site.phone}, and let us know as soon as possible. The earlier we hear from you, the faster we can make it right.`,
  },
  {
    q: "Who decides between a reapplication and a refund?",
    a: "Your local franchise owner, based on what will actually fix the problem for your lawn.",
  },
  {
    q: "Is anything excluded?",
    a: "Damage outside our control, such as heat stress or mowing too short, isn't covered. Your expert will flag risks like these in your plan.",
  },
];

export default function GuaranteePage() {
  return (
    <>
      <section className="bg-forest text-on-forest">
        <div className="container-x pb-20 pt-8 md:pb-28 md:pt-12">
          <div className="[&_a]:text-on-forest-2 [&_a:hover]:text-on-forest [&_li]:text-on-forest-2 [&_span]:!text-on-forest">
            <Breadcrumbs items={[{ label: "Why Lawn Doctor", href: "/why-choose-lawn-doctor" }, { label: "Our Guarantee" }]} />
          </div>
          <Reveal>
            <p className="eyebrow !text-lime">No Nonsense Guarantee</p>
            <h1 className="mt-5 max-w-5xl text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              If you&rsquo;re not 100% satisfied, we&rsquo;ll make it right.
            </h1>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="h-full rounded-[var(--radius-card)] bg-forest-2 p-8 md:p-10">
                <ArrowCounterClockwise size={34} weight="duotone" className="text-lime" />
                <p className="mt-6 font-display text-3xl font-semibold">We come back.</p>
                <p className="mt-2 text-lg text-on-forest-2">We return and reapply your last treatment at no additional charge.</p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="h-full rounded-[var(--radius-card)] bg-forest-2 p-8 md:p-10">
                <CurrencyDollar size={34} weight="duotone" className="text-lime" />
                <p className="mt-6 font-display text-3xl font-semibold">Or you get your money back.</p>
                <p className="mt-2 text-lg text-on-forest-2">We refund the full cost of your last application.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">The fine print, in plain English.</h2>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone size={16} weight="bold" /> {cta.call}
            </a>
            <Link href="/quote" className="btn btn-primary">{cta.quote}</Link>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
