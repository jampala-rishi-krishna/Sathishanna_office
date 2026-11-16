import { Star } from 'lucide-react';
import { SITE } from '../lib/site';

const reviews = [
  {
    author: 'Jampala Rishi Krishna',
    text: 'Excellent service and best quality hair patches available in Hyderabad',
    when: '3 weeks ago',
  },
  {
    author: 'Rohit Kumar Veeravalli',
    text: 'I recently visited Hair 2 Hair Studio and had an incredible experience! The staff was welcoming, the ambiance was inviting, and the stylists were truly skilled. My haircut surpassed expectations—precise and tailored perfectly.',
    when: 'a year ago',
  },
  {
    author: 'Doravari Srikanth',
    text: 'Best hair patch studio in Hyderabad',
    when: 'a week ago',
  },
  {
    author: 'Fire Ravi',
    text: 'Good service satish',
    when: '4 weeks ago',
  },
  {
    author: 'New Evergreen',
    text: "Very Good Service and with well trained people you can get a better service at reasonable price .it's a top nutch .Must visit",
    when: 'a year ago',
  },
  {
    author: 'Uttej Kumar',
    text: 'This review is after using patch from a month..I have done my hair patch service in Hair 2 Hair Studio and Completed my first servicing today.. My Experience: Recieving and explanation is good and clearing our doubts',
    when: '2 years ago',
  },
];

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
  // Longest review leads, the rest flow in columns.
  const [lead, ...rest] = [...reviews].sort((a, b) => b.text.length - a.text.length);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-7xl leading-none text-white sm:text-8xl">{SITE.rating}</span>
          <div>
            <Stars size={18} />
            <p className="mt-1 text-sm text-white/70">from {SITE.reviewCount} Google reviews</p>
          </div>
        </div>
        <figure className="mt-10 border-l border-brand-gold/60 pl-6">
          <blockquote className="font-display text-2xl italic leading-snug text-white sm:text-[1.7rem]">
            “{lead.text}”
          </blockquote>
          <figcaption className="mt-4 text-sm text-white/70">
            {lead.author}, {lead.when}
          </figcaption>
        </figure>
        <a
          href={SITE.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex rounded-pill border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
        >
          Read all reviews on Google
        </a>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
        {rest.map((r) => (
          <li key={r.author} className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
            <Stars size={14} />
            <p className="mt-3 flex-1 leading-relaxed text-white/90">{r.text}</p>
            <p className="mt-4 text-sm text-white/55">
              <span className="font-semibold text-white/80">{r.author}</span>, {r.when}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
