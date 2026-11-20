import { Star } from 'lucide-react';
import { SITE } from '../lib/site';

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="flex gap-0.5 text-brand-gold" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-7xl leading-none text-white sm:text-8xl">{SITE.rating}</span>
          <div>
            <Stars size={18} />
            <p className="mt-1 text-sm text-white/70">
              from {SITE.reviewCount} Google reviews
            </p>
            <p className="mt-1 text-xs text-white/50">
              Listing snapshot checked {SITE.reviewCountCheckedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10 lg:col-span-7">
        <h3 className="font-display text-2xl text-white">Read customer feedback at its source</h3>
        <p className="mt-3 leading-relaxed text-white/75">
          Review totals and comments can change. View the current Google Business Profile for the latest
          customer feedback and dates rather than relying on copied review excerpts.
        </p>
        <a
          href={SITE.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit rounded-pill border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
        >
          Read current Google reviews
        </a>
      </div>
    </div>
  );
}
