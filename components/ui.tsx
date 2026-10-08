import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretRight, Star } from "@phosphor-icons/react/ssr";

export function Stars({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-star ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} weight="fill" />
      ))}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-3">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <CaretRight size={12} />
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-semibold text-accent ${className}`}>
      <span className="link-underline">{children}</span>
      <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function MediaCard({
  href,
  image,
  alt,
  title,
  body,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  body: string;
  sizes?: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-ink-2">{body}</p>
        </div>
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
          <ArrowRight size={16} weight="bold" />
        </span>
      </div>
    </Link>
  );
}
