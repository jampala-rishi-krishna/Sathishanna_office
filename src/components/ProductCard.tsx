import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../lib/site';

interface ProductCardProps {
  name: string;
  image: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  description?: string;
  aspect?: string;
}

export default function ProductCard({ name, image, specs = [], features = [], description, aspect = 'aspect-[4/5]' }: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="overflow-hidden rounded-xl bg-brand-blush">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`${aspect} w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`}
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-[1.45rem] leading-tight text-brand-ink">{name}</h3>
        {specs.length > 0 && (
          <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {specs.map((s) => (
              <div key={s.label} className="flex gap-1">
                <dt className="text-brand-stone">{s.label}</dt>
                <dd className="font-medium text-brand-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {description && <p className="mt-2 text-sm text-brand-stone">{description}</p>}
        {features.length > 0 && <p className="mt-3 text-sm leading-relaxed text-brand-stone">{features.join(', ')}.</p>}
        <a
          href={whatsappUrl(`Hi! I'd like to know more about the ${name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand-primary hover:text-brand-accent"
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span className="link-underline">Ask about price &amp; fit</span>
        </a>
      </div>
    </article>
  );
}
