import { SITE } from '../lib/site';

export default function GoogleReviews() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <h3 className="font-display text-3xl text-white">Read current customer feedback</h3>
        <p className="mt-3 leading-relaxed text-white/75">
          Ratings, review totals and customer comments can change. Read the latest reviews
          directly on Google rather than relying on a copied count or outdated review snapshot.
        </p>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10 lg:col-span-7">
        <p className="leading-relaxed text-white/75">
          See recent customer feedback and the dates it was posted. Please share honest feedback
          based on your own experience with the studio.
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
