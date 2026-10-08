"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MagnifyingGlass, MapPin, Phone, WarningCircle } from "@phosphor-icons/react";
import { cta, site } from "@/lib/site";

type Lookup = { status: "idle" } | { status: "loading"; zip: string } | { status: "done"; zip: string };

const isZip = (v: string) => /^\d{5}$/.test(v);
const cleanZip = (v: string) => v.replace(/\D/g, "").slice(0, 5);

/** Reads ?zip= from the URL. Wrap in <Suspense> so the rest of the page can prerender. */
export function LocationFinderFromUrl() {
  const params = useSearchParams();
  return <LocationFinder initialZip={cleanZip(params.get("zip") ?? "")} autoSearch />;
}

/**
 * ZIP lookup for the local Lawn Doctor. There is no locator API yet, so the result is worded
 * honestly: we connect the visitor with whoever serves their ZIP rather than claiming coverage.
 */
export function LocationFinder({ initialZip = "", autoSearch = false }: { initialZip?: string; autoSearch?: boolean }) {
  const reduce = useReducedMotion();
  const id = `${useId()}-zip`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [zip, setZip] = useState(initialZip);
  const [error, setError] = useState<string | null>(null);
  // Arriving with a valid ?zip= (for example from the home page) starts the lookup right away.
  const [lookup, setLookup] = useState<Lookup>(() =>
    autoSearch && isZip(initialZip) ? { status: "loading", zip: initialZip } : { status: "idle" },
  );

  useEffect(() => {
    if (lookup.status !== "loading") return;
    // TODO: replace with real franchise locator API
    // e.g. const res = await fetch(`/api/locations?zip=${lookup.zip}`) and render the matched franchise.
    const t = window.setTimeout(() => setLookup({ status: "done", zip: lookup.zip }), 700);
    return () => window.clearTimeout(t);
  }, [lookup]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isZip(zip)) {
      setError("Enter a 5-digit ZIP code.");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setLookup({ status: "loading", zip });
    try {
      window.history.replaceState(null, "", `?zip=${zip}`);
    } catch {
      // Non-essential: keeps the URL shareable.
    }
  };

  const motionProps = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <div>
      <form onSubmit={submit} noValidate role="search" aria-label="Find your local Lawn Doctor">
        <label htmlFor={id} className="label mb-2 block">
          Your ZIP code
        </label>
        <div
          className={`flex flex-col gap-2 rounded-[28px] bg-surface p-1.5 ring-1 sm:flex-row sm:rounded-full ${
            error ? "ring-danger" : "ring-line"
          }`}
        >
          <div className="relative flex-1">
            <MapPin size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
            <input
              ref={inputRef}
              id={id}
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zip}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={(e) => {
                setZip(cleanZip(e.target.value));
                if (error) setError(null);
              }}
              className="h-12 w-full rounded-full bg-transparent pl-11 pr-4 text-base font-medium text-ink outline-none placeholder:text-ink-3"
            />
          </div>
          <button type="submit" className="btn btn-primary h-12 !py-0">
            <MagnifyingGlass size={16} weight="bold" />
            {cta.find}
          </button>
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
            <WarningCircle size={16} weight="fill" />
            {error}
          </p>
        )}
      </form>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {lookup.status === "idle" && (
            <motion.a
              key="idle"
              {...motionProps}
              href={site.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink"
            >
              <Phone size={16} weight="bold" className="text-accent" />
              Prefer to talk? Call {site.phone}
            </motion.a>
          )}

          {lookup.status === "loading" && (
            <motion.div key="loading" {...motionProps} aria-busy="true">
              <p className="sr-only">Looking up ZIP code {lookup.zip}.</p>
              <div aria-hidden className="card p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span className="size-11 shrink-0 rounded-full bg-surface-2 motion-safe:animate-pulse" />
                  <div className="flex-1 space-y-3 pt-1">
                    <span className="block h-5 w-11/12 rounded-full bg-surface-2 motion-safe:animate-pulse" />
                    <span className="block h-5 w-2/3 rounded-full bg-surface-2 motion-safe:animate-pulse" />
                    <span className="block h-3.5 w-full rounded-full bg-surface-2 motion-safe:animate-pulse" />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <span className="block h-12 rounded-full bg-surface-2 motion-safe:animate-pulse sm:w-44" />
                  <span className="block h-12 rounded-full bg-surface-2 motion-safe:animate-pulse sm:w-48" />
                </div>
              </div>
            </motion.div>
          )}

          {lookup.status === "done" && (
            <motion.div key={`done-${lookup.zip}`} {...motionProps} className="card p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <MapPin size={22} weight="fill" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold leading-snug md:text-2xl">
                    We&rsquo;ll connect you with the Lawn Doctor that serves {lookup.zip}.
                  </h2>
                  <p className="mt-2 leading-relaxed text-ink-2">
                    Request a free quote and your local Lawn Doctor will reach out to schedule a free lawn evaluation.
                    Rather talk first? Give us a call.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`/quote/?zip=${lookup.zip}`} className="btn btn-primary group">
                  {cta.quote}
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost">
                  <Phone size={16} weight="bold" className="text-accent" />
                  {cta.call}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
