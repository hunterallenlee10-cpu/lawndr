"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { cta, site } from "@/lib/site";

/** Thumb-reach action bar on phones, revealed after the hero scrolls away. */
export function MobileCallBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 560;
    if (next !== show) setShow(next);
  });

  useEffect(() => setShow(false), [pathname]);

  if (pathname.startsWith("/quote")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full border border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] p-1.5 shadow-[0_20px_40px_-20px_rgb(var(--shadow)/0.5)] backdrop-blur-xl md:hidden"
        >
          <a href={site.phoneHref} aria-label={cta.call} className="btn btn-ghost !px-4">
            <Phone size={18} weight="bold" />
          </a>
          <Link href="/quote" className="btn btn-primary flex-1">
            {cta.quote}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
