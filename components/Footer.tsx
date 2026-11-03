import Link from "next/link";
import { ArrowUpRight, Phone } from "@phosphor-icons/react/ssr";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ZipForm } from "./ZipForm";
import { footerNav, legalNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-on-forest">
      <div className="container-x grid gap-12 pb-12 pt-20 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="max-w-md font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
            Your best lawn starts with a free evaluation.
          </h2>
          <div className="mt-8 max-w-md">
            <ZipForm tone="forest" idPrefix="footer" />
          </div>
          <a
            href={site.phoneHref}
            className="mt-6 inline-flex items-center gap-2 text-on-forest-2 transition-colors hover:text-on-forest"
          >
            <Phone size={18} weight="bold" className="text-lime" />
            Or call {site.phone}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-on-forest-2">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.href}>
                      {external ? (
                        <a href={l.href} className="link-underline inline-flex items-center gap-1">
                          {l.label}
                          <ArrowUpRight size={13} className="text-on-forest-2" />
                        </a>
                      ) : (
                        <Link href={l.href} className="link-underline">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <Logo tone="forest" />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-underline text-on-forest-2 hover:text-on-forest">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-on-forest-2 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Lawn Doctor Inc. Franchises are locally owned and operated.
            Not all services available in all areas. Lawn Doctor does not provide mowing.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-on-forest">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="-mt-4 pb-24 text-xs text-on-forest-2 md:pb-8">
          Website by{" "}
          <a href="https://www.leeenterprisesunlimited.com/" target="_blank" rel="noopener" className="hover:text-on-forest">
            Lee Enterprises Unlimited
          </a>
        </p>
      </div>
    </footer>
  );
}
