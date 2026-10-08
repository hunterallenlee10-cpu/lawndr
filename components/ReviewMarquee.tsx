import { GoogleLogo } from "@phosphor-icons/react/ssr";
import { reviews } from "@/lib/content";
import { Stars } from "./ui";

/** The site's single marquee. Duplicated track loops seamlessly; paused on hover and for reduced motion. */
export function ReviewMarquee() {
  const loop = [...reviews, ...reviews];
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="marquee-track flex w-max gap-5 py-2">
        {loop.map((r, i) => (
          <li
            key={`${r.name}-${i}`}
            aria-hidden={i >= reviews.length}
            className="card flex w-[300px] shrink-0 flex-col justify-between gap-6 p-6 sm:w-[380px]"
          >
            <div>
              <Stars />
              <p className="mt-4 text-lg leading-snug text-ink">&ldquo;{r.text}&rdquo;</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{r.name}</span>
              <span className="inline-flex items-center gap-1.5 text-ink-3">
                <GoogleLogo size={16} weight="bold" />
                Google review
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
