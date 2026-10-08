"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, CaretDown, List, Phone, UserCircle, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { cta, servicesNav, site, whyNav } from "@/lib/site";

type MenuId = "services" | "why" | null;

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only flips state when the threshold is crossed, not on every frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  const solid = scrolled || menu !== null || mobileOpen;

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-b border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
            <MenuTrigger id="services" label="Services" active={menu === "services"} onOpen={open} onToggle={setMenu} />
            <MenuTrigger id="why" label="Why Lawn Doctor" active={menu === "why"} onOpen={open} onToggle={setMenu} />
            <NavLink href="/customer_testimonials" label="Reviews" pathname={pathname} />
            <NavLink href="/locations" label="Locations" pathname={pathname} />
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Phone size={18} weight="bold" className="text-accent" />
              {site.phone}
            </a>
            <a
              href={site.accountUrl}
              className="flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <UserCircle size={18} />
              My Account
            </a>
            <Link href="/quote" className="btn btn-primary !py-3">
              {cta.quote}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={cta.call}
              className="grid size-11 place-items-center rounded-full border border-line text-ink"
            >
              <Phone size={20} weight="bold" />
            </a>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full bg-ink text-bg"
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-bg shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.35)] lg:block"
            onMouseEnter={() => open(menu)}
            onMouseLeave={scheduleClose}
          >
            {menu === "services" ? <ServicesPanel /> : <WhyPanel />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-bg lg:hidden"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuTrigger({
  id,
  label,
  active,
  onOpen,
  onToggle,
}: {
  id: Exclude<MenuId, null>;
  label: string;
  active: boolean;
  onOpen: (id: MenuId) => void;
  onToggle: (id: MenuId) => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={active}
      onMouseEnter={() => onOpen(id)}
      onClick={() => onToggle(active ? null : id)}
      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
        active ? "bg-surface-2 text-ink" : "text-ink-2 hover:text-ink"
      }`}
    >
      {label}
      <CaretDown size={14} weight="bold" className={`transition-transform duration-300 ${active ? "rotate-180" : ""}`} />
    </button>
  );
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = pathname.replace(/\/$/, "") === href;
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
        active ? "text-ink" : "text-ink-2 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

function ServicesPanel() {
  return (
    <div className="container-x grid grid-cols-12 gap-8 py-10">
      {servicesNav.map((group) => (
        <div key={group.label} className="col-span-3">
          <Link href={group.href} className="group mb-4 inline-flex items-center gap-2 font-display text-lg font-semibold">
            {group.label}
            <ArrowRight size={16} weight="bold" className="text-accent transition-transform group-hover:translate-x-1" />
          </Link>
          <ul className="space-y-1">
            {group.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="-mx-3 block rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface-2">
                  <span className="block font-medium text-ink">{l.label}</span>
                  <span className="block text-sm text-ink-3">{l.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href="/quote"
        className="group relative col-span-3 overflow-hidden rounded-[var(--radius-card)] bg-forest p-6 text-on-forest"
      >
        <Image
          src="/images/grass-macro.jpg"
          alt=""
          fill
          sizes="320px"
          className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="relative flex h-full min-h-56 flex-col justify-end">
          <p className="font-display text-xl font-semibold leading-tight">Not sure what your lawn needs?</p>
          <p className="mt-2 text-sm text-on-forest-2">A local expert will evaluate it for free.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lime">
            {cta.quote} <ArrowRight size={16} weight="bold" />
          </span>
        </div>
      </Link>
    </div>
  );
}

function WhyPanel() {
  return (
    <div className="container-x grid grid-cols-12 gap-8 py-10">
      <ul className="col-span-5 grid grid-cols-2 gap-x-6 gap-y-1">
        {whyNav.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="-mx-3 flex items-center justify-between rounded-2xl px-3 py-3 font-medium transition-colors hover:bg-surface-2"
            >
              {l.label}
              <ArrowRight size={16} className="text-ink-3" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-span-7 grid grid-cols-3 gap-6 border-l border-line pl-8">
        {[
          { v: site.rating, l: "Average Google rating" },
          { v: site.reviewCount, l: "Customer reviews" },
          { v: site.locations, l: "Locally owned locations" },
        ].map((s) => (
          <div key={s.l}>
            <p className="font-display text-4xl font-semibold tracking-tight">{s.v}</p>
            <p className="mt-1 text-sm text-ink-3">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu() {
  const [openGroup, setOpenGroup] = useState<string | null>("Lawn Care");
  return (
    <div className="container-x flex min-h-full flex-col pb-10 pt-4">
      <div className="divide-y divide-line">
        {servicesNav.map((group) => {
          const isOpen = openGroup === group.label;
          return (
            <div key={group.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : group.label)}
                className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold"
              >
                {group.label}
                <CaretDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <ul className="pb-4">
                  <li>
                    <Link href={group.href} className="block py-2 text-accent">
                      All {group.label.toLowerCase()}
                    </Link>
                  </li>
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-2 text-lg text-ink-2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <div className="py-4">
          <p className="mb-2 font-display text-2xl font-semibold">Why Lawn Doctor</p>
          <ul>
            {whyNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2 text-lg text-ink-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-6 py-4 text-lg">
          <Link href="/locations" className="font-medium">
            Locations
          </Link>
          <a href={site.accountUrl} className="font-medium text-ink-2">
            My Account
          </a>
        </div>
      </div>
      <div className="mt-auto grid gap-3 pt-6">
        <Link href="/quote" className="btn btn-primary w-full">
          {cta.quote}
        </Link>
        <a href={site.phoneHref} className="btn btn-ghost w-full">
          {cta.call}
        </a>
      </div>
    </div>
  );
}
