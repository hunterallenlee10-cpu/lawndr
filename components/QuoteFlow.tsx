"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChatText,
  Check,
  CircleNotch,
  EnvelopeSimple,
  PencilSimple,
  Phone,
  Plus,
  WarningCircle,
} from "@phosphor-icons/react";
import { cta, site } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Options and types                                                   */
/* ------------------------------------------------------------------ */

const NOT_SURE = "Not sure yet";

const SERVICE_OPTIONS = [
  "Lawn Fertilization",
  "Seeding & Aeration",
  "Weed Control",
  "Mosquito Control",
  "Tick Control",
  "Perimeter Pest Control",
  "Special Event Sprays",
  NOT_SURE,
];

const LAWN_SIZES = ["Under 5,000 sq ft", "5,000-10,000 sq ft", "Over 10,000 sq ft", "Not sure"];

type Contact = "Call" | "Text" | "Email";

const CONTACT_OPTIONS: { value: Contact; icon: typeof Phone; method: string }[] = [
  { value: "Call", icon: Phone, method: "phone" },
  { value: "Text", icon: ChatText, method: "text" },
  { value: "Email", icon: EnvelopeSimple, method: "email" },
];

const STEPS = [
  { name: "Your yard", title: "Tell us about your yard" },
  { name: "About you", title: "How should we reach you?" },
  { name: "Review", title: "Check your details" },
];

type QuoteData = {
  zip: string;
  address: string;
  services: string[];
  lawnSize: string;
  name: string;
  email: string;
  phone: string;
  contact: Contact;
};

type ErrorKey = "zip" | "address" | "services" | "name" | "email" | "phone";
type Errors = Partial<Record<ErrorKey | "form", string>>;

/** Field order per step, mapped to the element that should receive focus on error. */
const STEP_FIELDS: { key: ErrorKey; focusId: string }[][] = [
  [
    { key: "zip", focusId: "quote-zip" },
    { key: "address", focusId: "quote-address" },
    { key: "services", focusId: "quote-services-0" },
  ],
  [
    { key: "name", focusId: "quote-name" },
    { key: "email", focusId: "quote-email" },
    { key: "phone", focusId: "quote-phone" },
  ],
];

const digitsOnly = (v: string) => v.replace(/\D/g, "");

/** Formats a US phone number as the user types: (555) 123-4567. */
function formatPhone(value: string) {
  let d = digitsOnly(value);
  if (d.length > 10 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function validateField(key: ErrorKey, data: QuoteData): string | undefined {
  switch (key) {
    case "zip":
      return /^\d{5}$/.test(data.zip) ? undefined : "Enter a 5-digit ZIP code.";
    case "address":
      return data.address.trim().length >= 4 ? undefined : "Enter your street address.";
    case "services":
      return data.services.length > 0 ? undefined : "Choose at least one service, or pick Not sure yet.";
    case "name":
      return data.name.trim().length >= 2 ? undefined : "Enter your name.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())
        ? undefined
        : "Enter a valid email address, like name@example.com.";
    case "phone":
      return digitsOnly(data.phone).length === 10 ? undefined : "Enter a 10-digit phone number.";
  }
}

function validateStep(step: number, data: QuoteData): Errors {
  const errors: Errors = {};
  for (const { key } of STEP_FIELDS[step] ?? []) {
    const message = validateField(key, data);
    if (message) errors[key] = message;
  }
  return errors;
}

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Entry points                                                        */
/* ------------------------------------------------------------------ */

/** Reads ?zip= from the URL. Wrap in <Suspense> so the rest of the page can prerender. */
export function QuoteFlowFromUrl() {
  const params = useSearchParams();
  const zip = digitsOnly(params.get("zip") ?? "").slice(0, 5);
  return <QuoteFlow initialZip={zip} />;
}

export function QuoteFlow({ initialZip = "" }: { initialZip?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [returnToReview, setReturnToReview] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [data, setData] = useState<QuoteData>({
    zip: initialZip,
    address: "",
    services: [],
    lawnSize: "",
    name: "",
    email: "",
    phone: "",
    contact: "Call",
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const focusHeadingOnMount = useRef(false);

  // Moves focus to the new step's heading once it has animated in, and brings the card into view on small screens.
  const headingRef = useCallback(
    (el: HTMLHeadingElement | null) => {
      if (!el || !focusHeadingOnMount.current) return;
      focusHeadingOnMount.current = false;
      el.focus({ preventScroll: true });
      const card = cardRef.current;
      if (card && card.getBoundingClientRect().top < 72) {
        card.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      }
    },
    [reduce],
  );

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setErrors({});
    focusHeadingOnMount.current = true;
    setStep(next);
  };

  const update = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Validates a text field on blur, but only once something has been typed.
  const blurCheck = (key: ErrorKey) => {
    const value = data[key as keyof QuoteData];
    if (typeof value === "string" && value.trim() === "") return;
    const message = validateField(key, data);
    setErrors((e) => ({ ...e, [key]: message }));
  };

  const focusFirstError = (s: number, errs: Errors) => {
    const first = STEP_FIELDS[s]?.find((f) => errs[f.key]);
    if (first) requestAnimationFrame(() => document.getElementById(first.focusId)?.focus());
  };

  const toggleService = (service: string) => {
    const has = data.services.includes(service);
    let next: string[];
    if (service === NOT_SURE) next = has ? [] : [NOT_SURE];
    else next = has ? data.services.filter((s) => s !== service) : [...data.services.filter((s) => s !== NOT_SURE), service];
    update("services", next);
  };

  const editStep = (s: number) => {
    setReturnToReview(true);
    goTo(s);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    if (step < 2) {
      const errs = validateStep(step, data);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        focusFirstError(step, errs);
        return;
      }
      if (returnToReview) {
        setReturnToReview(false);
        goTo(2);
      } else {
        goTo(step + 1);
      }
      return;
    }

    // Final check in case anything changed since the earlier steps.
    for (const s of [0, 1]) {
      const errs = validateStep(s, data);
      if (Object.keys(errs).length > 0) {
        setDirection(-1);
        setStep(s);
        setErrors(errs);
        focusFirstError(s, errs);
        return;
      }
    }

    setStatus("sending");
    setErrors({});
    try {
      const payload = {
        zip: data.zip,
        address: data.address.trim(),
        name: data.name.trim(),
        email: data.email.trim(),
        phone: digitsOnly(data.phone),
        services: data.services,
        lawnSize: data.lawnSize || null,
        preferredContact: data.contact,
      };
      // TODO: POST to Lawn Doctor lead endpoint / CRM
      // e.g. await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      void payload;
      await new Promise((resolve) => setTimeout(resolve, 1200));
      focusHeadingOnMount.current = true;
      setDirection(1);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: `We couldn't send your request. Please try again, or call ${site.phone}.` });
    }
  };

  const variants: Variants = {
    enter: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 }),
  };
  const transition = { duration: reduce ? 0.15 : 0.35, ease };

  const sending = status === "sending";
  const firstName = data.name.trim().split(/\s+/)[0] ?? "";
  const contactMethod = CONTACT_OPTIONS.find((c) => c.value === data.contact)?.method ?? "phone";

  return (
    <div ref={cardRef} className="card overflow-hidden">
      {status !== "sent" && <Progress step={step} locked={sending} onJump={goTo} />}

      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your request." : ""}
      </p>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="p-6 md:p-10"
          >
            <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
              <Check size={28} weight="bold" />
            </span>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-6 text-3xl font-semibold leading-[1.05] outline-none md:text-4xl"
            >
              You&rsquo;re on the list, {firstName}.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-2">
              Your request is in for ZIP {data.zip}. Here is what happens next.
            </p>
            <ol className="mt-8 space-y-6">
              {[
                {
                  title: "A local expert reaches out",
                  body: `The Lawn Doctor that serves your area will contact you by ${contactMethod} to schedule your free lawn evaluation.`,
                },
                {
                  title: "They walk your lawn",
                  body: "Your expert looks at your grass type, soil and problem areas before recommending anything.",
                },
                {
                  title: "You get a plan and a quote",
                  body: "A custom plan that spells out what each treatment does and what to expect.",
                },
              ].map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-display text-sm font-semibold text-accent"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-ink-2">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-ink-2">Rather talk now?</p>
              <a href={site.phoneHref} className="btn btn-ghost">
                <Phone size={18} weight="bold" className="text-accent" />
                {cta.call}
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key={`step-${step}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            onSubmit={onSubmit}
            noValidate
            aria-labelledby="quote-step-title"
            className="p-6 md:p-8"
          >
            <h2
              id="quote-step-title"
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-semibold leading-tight outline-none md:text-3xl"
            >
              {STEPS[step].title}
            </h2>

            <div className="mt-7">
              {step === 0 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-5">
                    <TextField
                      className="sm:col-span-2"
                      id="quote-zip"
                      name="zip"
                      label="ZIP code"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      value={data.zip}
                      error={errors.zip}
                      onChange={(e) => update("zip", digitsOnly(e.target.value).slice(0, 5))}
                      onBlur={() => blurCheck("zip")}
                    />
                    <TextField
                      className="sm:col-span-3"
                      id="quote-address"
                      name="address"
                      label="Street address"
                      autoComplete="street-address"
                      value={data.address}
                      error={errors.address}
                      onChange={(e) => update("address", e.target.value)}
                      onBlur={() => blurCheck("address")}
                    />
                  </div>

                  <fieldset
                    className="mt-8"
                    aria-describedby={errors.services ? "quote-services-hint quote-services-error" : "quote-services-hint"}
                  >
                    <legend className="label">What are you interested in?</legend>
                    <p id="quote-services-hint" className="mt-1 text-sm text-ink-3">
                      Choose all that apply.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((service, i) => {
                        const on = data.services.includes(service);
                        return (
                          <button
                            key={service}
                            id={`quote-services-${i}`}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleService(service)}
                            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                              on
                                ? "border-accent bg-accent-soft text-ink"
                                : "border-line bg-surface text-ink-2 hover:border-ink-3 hover:text-ink"
                            }`}
                          >
                            {on ? (
                              <Check size={14} weight="bold" className="text-accent" />
                            ) : (
                              <Plus size={14} weight="bold" className="text-ink-3" />
                            )}
                            {service}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="services" value={data.services.join(", ")} />
                    <FieldError id="quote-services-error" message={errors.services} />
                  </fieldset>

                  <fieldset className="mt-8">
                    <legend className="label">
                      Approximate lawn size <span className="font-normal text-ink-3">(optional)</span>
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {LAWN_SIZES.map((size) => {
                        const on = data.lawnSize === size;
                        return (
                          <label
                            key={size}
                            className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border p-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                              on ? "border-accent bg-accent-soft text-ink" : "border-line bg-surface text-ink-2 hover:border-ink-3"
                            }`}
                          >
                            <input
                              type="radio"
                              name="lawnSize"
                              value={size}
                              checked={on}
                              onChange={() => update("lawnSize", size)}
                              className="sr-only"
                            />
                            <span
                              aria-hidden
                              className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${
                                on ? "border-accent" : "border-line"
                              }`}
                            >
                              {on && <span className="size-2.5 rounded-full bg-accent" />}
                            </span>
                            {size}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      className="sm:col-span-2"
                      id="quote-name"
                      name="name"
                      label="Full name"
                      autoComplete="name"
                      value={data.name}
                      error={errors.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => blurCheck("name")}
                    />
                    <TextField
                      id="quote-email"
                      name="email"
                      type="email"
                      label="Email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      value={data.email}
                      error={errors.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => blurCheck("email")}
                    />
                    <TextField
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      label="Phone"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={data.phone}
                      error={errors.phone}
                      onChange={(e) => update("phone", formatPhone(e.target.value))}
                      onBlur={() => blurCheck("phone")}
                    />
                  </div>

                  <fieldset className="mt-8">
                    <legend className="label">Best way to reach you</legend>
                    <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-surface-2 p-1 ring-1 ring-line">
                      {CONTACT_OPTIONS.map(({ value, icon: Icon }) => {
                        const on = data.contact === value;
                        return (
                          <label
                            key={value}
                            className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-full px-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                              on ? "text-ink" : "text-ink-2 hover:text-ink"
                            }`}
                          >
                            <input
                              type="radio"
                              name="contact"
                              value={value}
                              checked={on}
                              onChange={() => update("contact", value)}
                              className="sr-only"
                            />
                            {on && (
                              <motion.span
                                layoutId="quote-contact-pill"
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-surface shadow-[0_6px_16px_-10px_rgb(var(--shadow)/0.6)] ring-1 ring-line"
                                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                              />
                            )}
                            <span className="relative flex items-center gap-1.5">
                              <Icon size={16} weight={on ? "fill" : "regular"} className={on ? "text-accent" : ""} />
                              {value}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </>
              )}

              {step === 2 && (
                <>
                  <ReviewSection
                    title="Your yard"
                    onEdit={() => editStep(0)}
                    rows={[
                      ["ZIP code", data.zip],
                      ["Street address", data.address.trim()],
                      ["Interested in", data.services.join(", ")],
                      ["Lawn size", data.lawnSize || "Not provided"],
                    ]}
                  />
                  <ReviewSection
                    title="About you"
                    onEdit={() => editStep(1)}
                    rows={[
                      ["Name", data.name.trim()],
                      ["Email", data.email.trim()],
                      ["Phone", data.phone],
                      ["Best way to reach you", data.contact],
                    ]}
                  />
                  <p className="mt-6 rounded-[var(--radius-card)] bg-surface-2 p-5 text-xs leading-relaxed text-ink-2">
                    By submitting this form, you agree that Lawn Doctor and its local franchisee may contact you by call,
                    text or email about your quote, using the phone number and email above. Consent is not a condition of
                    purchase. Msg &amp; data rates may apply. Reply STOP to opt out of texts. See our{" "}
                    <a
                      href="https://www.lawndoctor.com/privacy_policy/"
                      className="font-semibold text-ink underline underline-offset-2 hover:text-accent"
                    >
                      Privacy Policy &amp; Terms
                    </a>
                    .
                  </p>
                </>
              )}
            </div>

            {errors.form && (
              <p role="alert" className="mt-6 flex items-start gap-2 text-sm text-danger">
                <WarningCircle size={18} weight="fill" className="mt-px shrink-0" />
                {errors.form}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button type="button" onClick={() => goTo(step - 1)} disabled={sending} className="btn btn-ghost disabled:opacity-60">
                  <ArrowLeft size={16} weight="bold" />
                  Back
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
              {step < 2 ? (
                <button type="submit" className="btn btn-primary group">
                  {returnToReview ? "Back to review" : "Continue"}
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={sending}
                  aria-disabled={sending}
                  className="btn btn-primary min-w-[12rem] disabled:cursor-wait disabled:opacity-85"
                >
                  {sending ? (
                    <>
                      <CircleNotch size={18} weight="bold" className="motion-safe:animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      {cta.quote}
                      <ArrowRight size={16} weight="bold" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Progress({ step, locked, onJump }: { step: number; locked: boolean; onJump: (step: number) => void }) {
  return (
    <nav aria-label="Quote progress" className="border-b border-line px-6 pb-5 pt-6 md:px-8">
      <ol className="grid grid-cols-3 gap-3">
        {STEPS.map((s, i) => {
          const done = i < step;
          const current = i === step;
          const inner = (
            <>
              <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-line">
                <span
                  className={`block h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i <= step ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </span>
              <span className="mt-3 flex items-center gap-2">
                <span
                  aria-hidden
                  className={`hidden size-6 shrink-0 place-items-center rounded-full text-xs font-bold sm:grid ${
                    done
                      ? "bg-accent text-on-accent"
                      : current
                        ? "border-2 border-accent text-accent"
                        : "border border-line text-ink-3"
                  }`}
                >
                  {done ? <Check size={12} weight="bold" /> : i + 1}
                </span>
                <span
                  className={`text-sm font-semibold leading-tight ${current ? "text-ink" : done ? "text-ink-2" : "text-ink-3"}`}
                >
                  {s.name}
                </span>
                <span className="sr-only">{done ? ", completed" : current ? ", current step" : ", not started"}</span>
              </span>
            </>
          );
          return (
            <li key={s.name} aria-current={current ? "step" : undefined}>
              {done && !locked ? (
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  className="block w-full text-left transition-opacity hover:opacity-80"
                >
                  {inner}
                </button>
              ) : (
                <div>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function TextField({
  id,
  label,
  error,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-2 block">
        {label}
      </label>
      <input
        id={id}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

function ReviewSection({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
}) {
  return (
    <section className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent"
        >
          <PencilSimple size={16} weight="bold" />
          <span className="link-underline">Edit</span>
          <span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      <dl className="mt-2 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-0.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="text-sm text-ink-3">{label}</dt>
            <dd className="break-words text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
