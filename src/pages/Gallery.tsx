import { useEffect, useRef, useState } from 'react';
import { Play, X, Instagram } from 'lucide-react';
import { Container, PageHero, Section } from '../components/ui';
import { SITE } from '../lib/site';

type Item = { url: string; category: string; caption: string; type: 'image' | 'video' };

const images: Item[] = [
  { url: '/Data/Golden_Silk_hair_patch.jpg', category: 'women', caption: 'Golden Silk hair patch, premium quality', type: 'image' },
  { url: '/Data/Golden_hair_patch.jpg', category: 'women', caption: 'Golden hair patch, natural look', type: 'image' },
  { url: '/Data/Australian_mirage.jpg', category: 'women', caption: 'Australian Mirage, premium hair', type: 'image' },
  { url: '/Data/gallery/3.mp4', category: 'men', caption: "Men's hair system, professional look", type: 'video' },
  { url: '/Data/gallery/4.mp4', category: 'men', caption: 'Natural hairline restoration', type: 'video' },
  { url: '/Data/gallery/5.mp4', category: 'men', caption: 'Hair system for an active lifestyle', type: 'video' },
  { url: '/Data/gallery/1.mp4', category: 'products', caption: 'Premium quality hair patches', type: 'video' },
  { url: '/Data/gallery/2.mp4', category: 'products', caption: 'Our wig collections', type: 'video' },
  { url: '/Data/gallery/6.mp4', category: 'products', caption: 'Professional hair solutions', type: 'video' },
  { url: '/Data/gallery/7.mp4', category: 'products', caption: 'Advanced hair systems', type: 'video' },
  { url: '/Data/gallery/8.mp4', category: 'products', caption: 'Advanced hair systems, close-up', type: 'video' },
  { url: '/Data/gallery/9.mp4', category: 'products', caption: 'Premium hair products', type: 'video' },
  { url: '/Data/mf_patch.jpg', category: 'services', caption: 'MF hair patch, professional grade', type: 'image' },
  { url: '/Data/china_mirage.jpg', category: 'services', caption: 'China Mirage, high quality hair', type: 'image' },
  { url: '/Data/golden_miraz.jpg', category: 'women', caption: 'Golden Miraz, premium hair solution', type: 'image' },
];

const filters = [
  { key: 'all', label: 'Everything' },
  { key: 'men', label: 'Men' },
  { key: 'women', label: 'Women' },
  { key: 'products', label: 'Products' },
  { key: 'services', label: 'Services' },
];

function Lightbox({ item, onClose }: { item: Item; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[60] flex flex-col bg-brand-deep/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="flex justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={28} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video
            src={item.url}
            poster={item.url.replace(/\/(\d+)\.mp4$/, '/posters/$1.jpg')}
            className="max-h-full max-w-full rounded-lg"
            controls
            autoPlay
            playsInline
            loop
          />
        ) : (
          <img src={item.url} alt={item.caption} className="max-h-full max-w-full rounded-lg object-contain" />
        )}
      </div>
      <p className="mt-4 text-center text-white/80">{item.caption}</p>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [open, setOpen] = useState<Item | null>(null);

  const filtered = activeFilter === 'all' ? images : images.filter((img) => img.category === activeFilter);

  return (
    <div>
      <PageHero
        title="Gallery"
        intro="Browse selected H2H studio, product and service photos and videos. Tap any item to view it full size, then contact the team to discuss which options fit your needs."
      />

      <Section className="pt-10 sm:pt-12">
        <Container>
          <div role="group" aria-label="Filter gallery" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((f) => {
              const count = f.key === 'all' ? images.length : images.filter((i) => i.category === f.key).length;
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-pill border px-5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                  }`}
                >
                  {f.label} <span className={active ? 'text-white/70' : 'text-brand-stone'}>{count}</span>
                </button>
              );
            })}
          </div>

          <ul className="columns-2 gap-4 lg:columns-3 lg:gap-6">
            {filtered.map((item) => (
              <li key={item.url} className="mb-4 break-inside-avoid lg:mb-6">
                <button
                  type="button"
                  onClick={() => setOpen(item)}
                  className="group block w-full text-left"
                  aria-label={`Open ${item.type === 'video' ? 'video' : 'photo'}: ${item.caption}`}
                >
                  <div className="relative overflow-hidden rounded-xl bg-brand-blush">
                    {item.type === 'video' ? (
                      <>
                        <img
                          src={item.url.replace(/\/(\d+)\.mp4$/, '/posters/$1.jpg')}
                          alt={item.caption}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-pill bg-brand-deep/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                          <Play size={12} fill="currentColor" aria-hidden="true" />
                          Video
                        </span>
                      </>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-brand-stone">{item.caption}</p>
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="blush">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">More on Instagram</h2>
            <p className="mt-2 text-lg text-brand-stone">Studio updates, product showcases and service highlights at @h2h_hairstudio_</p>
          </div>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-brand-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-accent"
          >
            <Instagram size={18} aria-hidden="true" />
            Follow on Instagram
          </a>
        </Container>
      </Section>

      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
