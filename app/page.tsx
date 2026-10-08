import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bug,
  Confetti,
  GoogleLogo,
  House,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { ZipForm } from "@/components/ZipForm";
import { ArrowLink, Stars } from "@/components/ui";
import { homeFaqs, seasons } from "@/lib/content";
import { cta, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofRow />
      <ServicesBento />
      <HowItWorks />
      <Engineering />
      <Seasons />
      <Guarantee />
      <Reviews />
      <Local />
      <section className="container-x grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">Good questions.</h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Still curious? Your local expert can answer anything at your free evaluation.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Faq items={homeFaqs} />
        </div>
      </section>
    </>
  );
}

function ProofRow() {
  const stats = [
    { value: site.rating, label: "Average Google rating", extra: <Stars size={14} className="mt-2" /> },
    { value: site.reviewCount, label: "Customer reviews" },
    { value: site.locations, label: "Locally owned locations" },
    { value: site.states, label: "States served" },
  ];
  return (
    <section aria-label="Lawn Doctor by the numbers" className="container-x">
      <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-10 md:grid-cols-4 md:py-12">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className={`px-1 md:px-8 ${i > 0 ? "md:border-l md:border-line" : ""}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{s.value}</span>
              {s.extra}
              <span className="mt-2 block text-sm text-ink-3">{s.label}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function ServicesBento() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] md:text-6xl">
          Everything your yard needs. Except mowing.
        </h2>
        <ArrowLink href="/annual-programs">See annual programs</ArrowLink>
      </div>

      <div className="mt-12 grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        {/* 1. Fertilization: hero tile */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <PhotoTile
            href="/lawn-fertilization"
            image="/images/grass-macro.jpg"
            alt="Dew-covered blades of healthy green grass"
            title="Lawn Fertilization"
            body="Slow-release nutrition matched to your grass type, applied evenly with patented Turf Tamer equipment."
            large
          />
        </Reveal>

        {/* 2. Seeding */}
        <Reveal delay={0.05} className="md:col-span-2">
          <PhotoTile
            href="/lawn_seeding"
            image="/images/aeration.jpg"
            alt="Hand holding a plug of turf with roots and soil"
            title="Seeding & Aeration"
            body="90%+ germination with power seeding."
          />
        </Reveal>

        {/* 3. Mosquito */}
        <Reveal delay={0.1} className="md:col-span-2">
          <PhotoTile
            href="/mosquito-control"
            image="/images/backyard-evening.jpg"
            alt="Friends sharing dinner in a backyard under string lights"
            title="Mosquito Control"
            body="Yard Armour where mosquitoes rest."
          />
        </Reveal>

        {/* 4. Tick: tinted tile */}
        <Reveal className="md:col-span-2">
          <Link
            href="/tick-control"
            className="group relative flex h-full min-h-[240px] flex-col justify-between rounded-[var(--radius-card)] bg-accent-soft p-7 transition-transform duration-500 hover:-translate-y-1"
          >
            <ShieldCheck size={34} weight="duotone" className="text-accent" />
            <div>
              <h3 className="font-display text-2xl font-semibold">Tick Control</h3>
              <p className="mt-2 text-ink-2">Lawn, landscaping and wood lines, treated all season.</p>
            </div>
            <TileArrow />
          </Link>
        </Reveal>

        {/* 5. Perimeter: outlined tile */}
        <Reveal delay={0.05} className="md:col-span-2">
          <Link
            href="/perimeter-pest-control"
            className="group relative flex h-full min-h-[240px] flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="flex gap-2 text-accent">
              <House size={34} weight="duotone" />
              <Bug size={34} weight="duotone" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold">Perimeter Pest Control</h3>
              <p className="mt-2 text-ink-2">An exterior barrier. Nothing sprayed inside.</p>
            </div>
            <TileArrow />
          </Link>
        </Reveal>

        {/* 6. Events: image */}
        <Reveal delay={0.1} className="md:col-span-2">
          <PhotoTile
            href="/mosquito-yard-spray"
            image="/images/family-backyard.jpg"
            alt="Two kids running across a sunny lawn"
            title="Special Event Sprays"
            body="Host without the bites."
            icon={<Confetti size={22} weight="fill" />}
          />
        </Reveal>
      </div>
    </section>
  );
}

function TileArrow() {
  return (
    <span className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-current/15 opacity-0 transition-all duration-500 group-hover:opacity-100">
      <ArrowUpRight size={16} weight="bold" />
    </span>
  );
}

function PhotoTile({
  href,
  image,
  alt,
  title,
  body,
  large = false,
  icon,
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  body: string;
  large?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-forest p-7 text-white md:min-h-0"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={large ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07150c]/85 via-[#07150c]/25 to-transparent" />
      <div className={`relative ${large ? "max-w-md" : ""}`}>
        {icon && <span className="mb-3 inline-block text-lime">{icon}</span>}
        <h3 className={`font-display font-semibold ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>{title}</h3>
        <p className={`mt-2 text-white/80 ${large ? "text-lg" : ""}`}>{body}</p>
      </div>
      <span className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:bg-lime group-hover:text-forest">
        <ArrowUpRight size={16} weight="bold" />
      </span>
    </Link>
  );
}

function Engineering() {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-forest text-white">
        <Image
          src="/images/natural-lawn.jpg"
          alt="Ground-level view of a lawn with white clover and a honeybee"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07150c]/90 via-[#07150c]/60 to-[#07150c]/10" />
        <div className="relative grid gap-12 p-8 py-16 md:p-14 lg:grid-cols-12 lg:p-20">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-lime">Engineered in-house</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] md:text-6xl">
              We build our own equipment. Your lawn can tell.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Co-founder Bob Magda built the industry&rsquo;s first automated lawn care machine. Today our patented Turf
              Tamer equipment meters every application to ground speed, and only Lawn Doctor uses it.
            </p>
            <div className="mt-8">
              <Link href="/lawn_seeding" className="btn btn-lime">
                How power seeding works <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            <div>
              <p className="font-display text-7xl font-semibold tracking-[-0.05em] text-lime md:text-8xl">90%+</p>
              <p className="mt-2 text-white/80">germination when seed goes into the soil with the Turf Tamer Power Seeder</p>
            </div>
            <div className="border-t border-white/15 pt-6">
              <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-white/60">~10%</p>
              <p className="mt-1 text-white/60">when seed is simply thrown on top</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] md:text-6xl">A year of lawn care, mapped out.</h2>
        <p className="mt-5 max-w-xl text-lg text-ink-2">
          A typical cool-season program. Your plan adapts to your grass type, region and weather.
        </p>
      </div>
      <ol className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-8 md:px-8 xl:px-[max(2rem,calc((100vw-1320px)/2+2rem))]">
        {seasons.map((s, i) => (
          <li key={s.name} className="w-[78vw] shrink-0 snap-start sm:w-[360px]">
            <Reveal delay={i * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
                <Image src={s.image} alt="" fill sizes="360px" className="object-cover" />
              </div>
              <p className="mt-5 text-sm font-semibold text-accent">{s.name}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-ink-2">{s.body}</p>
            </Reveal>
          </li>
        ))}
        <li className="w-[78vw] shrink-0 snap-start sm:w-[360px]">
          <div className="flex aspect-[4/5] flex-col justify-end rounded-[var(--radius-card)] border border-dashed border-line p-8">
            <p className="font-display text-2xl font-semibold">Want this on autopilot?</p>
            <p className="mt-2 text-ink-2">Annual programs schedule every visit for you.</p>
            <ArrowLink href="/annual-programs" className="mt-6">
              Compare programs
            </ArrowLink>
          </div>
        </li>
      </ol>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="bg-forest text-on-forest">
      <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-lime">No Nonsense Guarantee</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Not 100% satisfied? We&rsquo;ll make it right.
          </h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-5">
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10">
            <div className="bg-forest-2 p-7">
              <p className="font-display text-2xl font-semibold">We come back</p>
              <p className="mt-2 text-on-forest-2">and reapply your last treatment at no charge.</p>
            </div>
            <div className="bg-forest-2 p-7">
              <p className="font-display text-2xl font-semibold">Or we refund</p>
              <p className="mt-2 text-on-forest-2">the full cost of your last application.</p>
            </div>
          </div>
          <Link href="/our_guarantee" className="group mt-7 inline-flex items-center gap-2 font-semibold text-lime">
            <span className="link-underline">Read the guarantee</span>
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-4">
            <span className="font-display text-7xl font-semibold tracking-[-0.05em] md:text-8xl">{site.rating}</span>
            <div>
              <Stars size={20} />
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-3">
                <GoogleLogo size={16} weight="bold" /> {site.reviewCount} reviews
              </p>
            </div>
          </div>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.05] md:text-5xl">
            The highest online review score in the industry.
          </h2>
        </div>
        <ArrowLink href="/customer_testimonials">Read more reviews</ArrowLink>
      </div>
      <div className="mt-12">
        <ReviewMarquee />
      </div>
    </section>
  );
}

function Local() {
  return (
    <section className="container-x">
      <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image
            src="/images/neighborhood-aerial.jpg"
            alt="Aerial view of a suburban neighborhood with green lawns"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-semibold leading-[1.05] md:text-5xl">Owned by your neighbors.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-2">
            Every Lawn Doctor is locally owned by someone who lives and works in your community, and knows your weather
            and soil. No big-business runaround.
          </p>
          <div className="mt-8 max-w-md">
            <ZipForm idPrefix="local" label="Find the Lawn Doctor near you" destination="/locations/" buttonLabel={cta.find} />
          </div>
        </div>
      </div>
    </section>
  );
}
