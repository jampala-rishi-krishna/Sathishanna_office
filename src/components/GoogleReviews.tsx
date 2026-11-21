import { useEffect, useState } from 'react';
import { SITE } from '../lib/site';

const GOOGLE_REVIEW_COUNT = 218;
const GOOGLE_RATING = '4.9';

export default function GoogleReviews() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisibleCount(GOOGLE_REVIEW_COUNT);
      return;
    }

    let startTime: number | null = null;
    let animationFrame = 0;
    const duration = 1300;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVisibleCount(Math.round(GOOGLE_REVIEW_COUNT * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-goldsoft">Google customer feedback</p>
        <h3 className="mt-3 font-display text-3xl text-white">Rated by our customers</h3>
        <p className="mt-3 leading-relaxed text-white/75">
          Read feedback directly on Google to see the latest comments and review activity.
        </p>
        <p className="mt-4 text-xs text-white/50">Google profile snapshot checked 21 November 2026.</p>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10 lg:col-span-7 sm:p-9">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
          <div>
            <div className="font-display text-5xl leading-none text-white sm:text-6xl">{GOOGLE_RATING}<span className="ml-2 text-2xl text-brand-gold">★</span></div>
            <p className="mt-2 text-sm text-white/70">Google rating</p>
          </div>
          <div>
            <div className="font-display text-5xl leading-none text-white sm:text-6xl" aria-live="polite">
              {visibleCount.toLocaleString('en-IN')}<span className="ml-2 text-2xl text-brand-gold">+</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Google reviews</p>
          </div>
        </div>
        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[98%] rounded-full bg-brand-gold" />
        </div>
        <p className="mt-5 max-w-xl leading-relaxed text-white/75">
          Review totals can change. The number above is the latest public count we verified; use Google for the current live total and newest customer comments.
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
