import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { SITE, whatsappUrl } from '../lib/site';

/**
 * Mobile: a fixed bottom bar with the three ways people actually reach us.
 * Desktop: a single floating WhatsApp button.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation();

  return (
    <>
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-brand-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-brand-ink">
          <Phone size={20} aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-whatsapp"
        >
          <MessageCircle size={20} aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          to="/booking"
          aria-current={pathname === '/booking' ? 'page' : undefined}
          className="flex flex-col items-center gap-1 bg-brand-primary py-2.5 text-xs font-semibold text-white"
        >
          <CalendarDays size={20} aria-hidden="true" />
          Book free
        </Link>
      </nav>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-pill bg-whatsapp px-5 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(31,157,85,0.7)] transition-transform hover:-translate-y-0.5 lg:flex"
      >
        <MessageCircle size={20} aria-hidden="true" />
        WhatsApp
      </a>
    </>
  );
}
