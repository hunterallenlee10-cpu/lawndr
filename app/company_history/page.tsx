import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a New Jersey hardware store and a basement workshop to 600+ locally owned locations. The history of Lawn Doctor and Turf Tamer equipment.",
};

const timeline = [
  {
    year: "1960s",
    title: "A hardware store and a basement workshop",
    body: "In Matawan, New Jersey, Tony Giordano runs Sunday lawn care workshops at his hardware store, frustrated that homeowners spend so much on DIY with so little to show. His partner Bob Magda, an engineer, turns his basement into a workshop and builds the industry's first automated lawn care machine.",
  },
  {
    year: site.since,
    title: "Auto Lawn becomes Lawn Doctor",
    body: "Local salesmen and a newspaper start calling the pair “The Lawn Doctors.” The name sticks, along with the green-thumb logo.",
  },
  {
    year: "1983",
    title: "A customer takes the helm",
    body: "Russell J. Frith, who first joined as a customer, becomes president and CEO. He leads the company for nearly 25 years and serves as president of the Professional Lawn Care Association of America.",
  },
  {
    year: "1987",
    title: "The next generation starts on the shop floor",
    body: "Scott Frith begins at the manufacturing facility, later leading marketing and franchise development.",
  },
  {
    year: "2011",
    title: "Scott Frith becomes President and CEO",
    body: "A Certified Franchise Executive and board member of Project Evergreen, Scott carries forward the founders' promise to keep the equipment the best available.",
  },
  {
    year: "2022",
    title: "Recognized nationally",
    body: "Lawn Doctor ranks #19 among Top Home-Based & Mobile Franchises in the Franchise 500.",
  },
  {
    year: "Today",
    title: `${site.locations} locally owned locations`,
    body: `Lawn Doctor serves homeowners in ${site.states} states, each location owned by someone from the community it serves.`,
  },
];

export default function HistoryPage() {
  return (
    <>
      <section className="container-x pb-16 pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: "Why Lawn Doctor", href: "/why-choose-lawn-doctor" }, { label: "Our Story" }]} />
        <Reveal>
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            It started with a workshop and a promise to build better equipment.
          </h1>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal y={40}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 md:aspect-[21/9]">
            <Image src="/images/hero-lawn-wide.jpg" alt="Striped, healthy lawn behind a white and sage-blue home" fill priority sizes="100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <ol className="relative">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={0.04} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <p className={`font-display text-5xl font-semibold tracking-[-0.04em] md:col-span-4 md:text-7xl ${i === timeline.length - 1 ? "text-accent" : ""}`}>
                {t.year}
              </p>
              <div className="md:col-span-7 md:col-start-6">
                <h2 className="font-display text-2xl font-semibold md:text-3xl">{t.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-2">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-10 rounded-[var(--radius-card)] bg-surface-2 p-8 md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">The Turf Tamer difference.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Bob Magda went on to develop Turf Tamer application equipment, protected by U.S. patents and built exclusively for
              Lawn Doctor franchisees. Ground-metered technology keeps every application even, and our Power Seeder delivers
              germination above 90%.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 lg:col-span-4 lg:col-start-9">
            <Link href="/lawn_seeding" className="btn btn-ghost">See power seeding</Link>
            <Link href="/quote" className="btn btn-primary">{cta.quote}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
