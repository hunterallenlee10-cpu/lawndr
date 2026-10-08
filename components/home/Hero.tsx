"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Phone } from "@phosphor-icons/react";
import { ZipForm } from "@/components/ZipForm";
import { Stars } from "@/components/ui";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle depth as the hero leaves: image drifts slower than the page.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  const item = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease },
  });

  return (
    <section ref={ref} className="relative">
      <div className="container-x grid items-center gap-10 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-6">
        <div className="lg:col-span-7">
          <motion.p {...item(0)} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-ink-2">
            <Stars size={15} />
            <span>
              <strong className="font-semibold text-ink">{site.rating}</strong> average from {site.reviewCount} Google reviews
            </span>
          </motion.p>

          <motion.h1
            {...item(1)}
            className="mt-6 text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem] xl:text-[5.25rem]"
          >
            Lawn care, <span className="text-accent">backed by science.</span>
          </motion.h1>

          <motion.p {...item(2)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2 md:text-xl">
            Customized plans from local experts who diagnose your soil first, then guarantee every single visit.
          </motion.p>

          <motion.div {...item(3)} className="mt-9 max-w-xl">
            <ZipForm idPrefix="hero" />
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              <Phone size={16} weight="bold" className="text-accent" />
              Prefer to talk? Call {site.phone}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ clipPath: "inset(18% 12% 18% 12% round 28px)", opacity: 0.4 }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 22px)", opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.15 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 sm:aspect-[16/11] lg:col-span-5 lg:aspect-[4/5] lg:max-h-[78dvh]"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-6%_0]">
            <Image
              src="/images/hero-lawn.jpg"
              alt="Freshly striped green lawn in front of a white and sage-blue home"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
