import Link from "next/link";
import { Plant } from "@phosphor-icons/react/ssr";

/* Placeholder mark: swap in the official green-thumb logo SVG when available. */
export function Logo({ tone = "default" }: { tone?: "default" | "forest" }) {
  const forest = tone === "forest";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Lawn Doctor home">
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-12deg] ${
          forest ? "bg-lime text-forest" : "bg-accent text-on-accent"
        }`}
      >
        <Plant size={20} weight="fill" />
      </span>
      <span
        className={`font-display text-[1.3rem] font-bold leading-none tracking-[-0.03em] ${
          forest ? "text-on-forest" : "text-ink"
        }`}
      >
        Lawn Doctor
      </span>
    </Link>
  );
}
