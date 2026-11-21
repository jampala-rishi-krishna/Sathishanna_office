import { Facebook, Instagram, Youtube } from 'lucide-react';
import { SITE } from '../lib/site';

const links = [
  { label: 'Instagram', href: SITE.social.instagram, icon: Instagram },
  { label: 'Facebook', href: SITE.social.facebook, icon: Facebook },
  { label: 'YouTube', href: SITE.social.youtube, icon: Youtube },
];

export default function FloatingSocialLinks() {
  return (
    <nav
      aria-label="Hair 2 Hair Studio social media"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[41] flex items-center gap-2 lg:bottom-[5.5rem] lg:right-6"
    >
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open Hair 2 Hair Studio on ${label}`}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-white/95 text-brand-primary shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <Icon size={17} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
