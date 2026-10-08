"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "We diagnose before we treat.",
    body: "A local lawn expert analyzes your grass type, soil and trouble spots. No guesswork, no one-size-fits-all bag of product.",
    image: "/images/aeration.jpg",
    alt: "Hand holding a turf plug showing grass, roots and soil",
  },
  {
    title: "You get a plan with results spelled out.",
    body: "Your custom plan lists every treatment and what it should accomplish, so you always know what you're paying for.",
    image: "/images/lawn-inspection.jpg",
    alt: "Hand pressed into a lawn, feeling the turf up close",
  },
  {
    title: "We show up every 6 to 8 weeks.",
    body: "Feeding, weed control and pest checks on schedule, applied with equipment we design ourselves. A written summary after every visit.",
    image: "/images/summer-lawn.jpg",
    alt: "Sprinkler watering a bright, healthy summer lawn",
  },
];

/** Sticky image that swaps as each step scrolls into the middle of the viewport. */
export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="container-x py-24 md:py-32">
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] md:text-6xl">
        Treated like a patient, not a work order.
      </h2>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[110px] aspect-[4/5] max-h-[calc(100dvh-150px)] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={steps[active].image} alt={steps[active].alt} fill sizes="45vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol className="lg:col-span-6">
          {steps.map((s, i) => (
            <Step key={s.title} index={i} active={active === i} onActive={setActive} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  body,
  image,
  alt,
  active,
  onActive,
}: (typeof steps)[number] & { index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 first:pt-0 lg:min-h-[72dvh] lg:border-t-0 lg:py-0"
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 lg:hidden">
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <span
        className={`font-display text-sm font-semibold tabular-nums transition-colors duration-500 ${
          active ? "text-accent" : "text-ink-3"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className={`mt-3 max-w-md text-3xl font-semibold leading-tight transition-opacity duration-500 md:text-4xl ${
          active ? "lg:opacity-100" : "lg:opacity-35"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-4 max-w-md text-lg leading-relaxed text-ink-2 transition-opacity duration-500 ${
          active ? "lg:opacity-100" : "lg:opacity-35"
        }`}
      >
        {body}
      </p>
    </li>
  );
}
