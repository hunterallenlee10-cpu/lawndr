"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { ArrowRight, MapPin, WarningCircle } from "@phosphor-icons/react";
import { cta } from "@/lib/site";

/** ZIP entry that hands off to the full quote flow with the ZIP prefilled. */
export function ZipForm({
  tone = "default",
  idPrefix,
  label = "Enter your ZIP code",
  destination = "/quote/",
  buttonLabel = cta.quote,
}: {
  tone?: "default" | "forest";
  idPrefix?: string;
  label?: string;
  destination?: string;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const reactId = useId();
  const id = `${idPrefix ?? reactId}-zip`;
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const forest = tone === "forest";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError("Enter a 5-digit ZIP code.");
      return;
    }
    setError(null);
    router.push(`${destination}?zip=${zip}`);
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={id} className={`mb-2 block text-sm font-semibold ${forest ? "text-on-forest" : "text-ink"}`}>
        {label}
      </label>
      <div
        className={`flex flex-col gap-2 rounded-[28px] p-1.5 sm:flex-row sm:rounded-full ${
          forest ? "bg-white/8 ring-1 ring-white/15" : "bg-surface ring-1 ring-line"
        } ${error ? "!ring-danger" : ""}`}
      >
        <div className="relative flex-1">
          <MapPin
            size={20}
            className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${forest ? "text-lime" : "text-accent"}`}
          />
          <input
            id={id}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="e.g. 07733"
            value={zip}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              if (error) setError(null);
            }}
            className={`h-12 w-full rounded-full bg-transparent pl-11 pr-4 text-base font-medium outline-none ${
              forest ? "text-on-forest placeholder:text-on-forest-2" : "text-ink placeholder:text-ink-3"
            }`}
          />
        </div>
        <button type="submit" className={`btn ${forest ? "btn-lime" : "btn-primary"} group h-12 !py-0`}>
          {buttonLabel}
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={`mt-2 flex items-center gap-1.5 text-sm ${forest ? "text-[#ffb4a6]" : "text-danger"}`}
        >
          <WarningCircle size={16} weight="fill" />
          {error}
        </p>
      )}
    </form>
  );
}
