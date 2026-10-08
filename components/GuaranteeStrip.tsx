import Link from "next/link";
import { ArrowRight, SealCheck } from "@phosphor-icons/react/ssr";

export function GuaranteeStrip() {
  return (
    <section className="container-x">
      <div className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-accent-soft p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-start gap-5">
          <SealCheck size={44} weight="duotone" className="shrink-0 text-accent" />
          <div>
            <p className="font-display text-2xl font-semibold md:text-3xl">Backed by our No Nonsense Guarantee.</p>
            <p className="mt-2 max-w-2xl text-ink-2">
              Not satisfied? We&rsquo;ll return and reapply at no charge, or refund the full cost of your last application.
            </p>
          </div>
        </div>
        <Link href="/our_guarantee" className="btn btn-ghost shrink-0">
          Read the guarantee <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
