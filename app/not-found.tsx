import Link from "next/link";
import { cta } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-display text-8xl font-semibold tracking-[-0.05em] text-accent md:text-[10rem]">404</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">This patch of lawn doesn&rsquo;t exist.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">The page may have moved. Head home or start a free quote.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ghost">Back to home</Link>
        <Link href="/quote" className="btn btn-primary">{cta.quote}</Link>
      </div>
    </section>
  );
}
