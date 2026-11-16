import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { SITE } from '../lib/site';

const NAV = [
  { to: '/men', label: 'Men' },
  { to: '/women', label: 'Women' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === '/' && !scrolled && !open;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero ? 'bg-brand-deep text-white' : 'border-b border-brand-line bg-brand-porcelain/95 text-brand-ink backdrop-blur'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="flex flex-col leading-none" aria-label="Hair 2 Hair Studio, home">
          <span className="font-display text-[1.45rem] font-medium tracking-tight sm:text-[1.6rem]">
            Hair 2 Hair
          </span>
          <span className={`mt-1 text-[0.7rem] tracking-[0.2em] ${overHero ? 'text-brand-goldsoft' : 'text-brand-gold'}`}>
            STUDIO
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                  overHero ? 'text-white/80 hover:text-white' : 'text-brand-stone hover:text-brand-ink'
                } ${isActive ? (overHero ? '!text-white' : '!text-brand-primary') : ''}
                after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={SITE.phoneHref}
            className={`flex items-center gap-2 text-sm font-medium ${overHero ? 'text-white/85 hover:text-white' : 'text-brand-stone hover:text-brand-ink'}`}
          >
            <Phone size={15} aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <Link
            to="/booking"
            className={`rounded-pill px-5 py-2.5 text-sm font-semibold transition-colors ${
              overHero ? 'bg-white text-brand-deep hover:bg-brand-blush' : 'bg-brand-primary text-white hover:bg-brand-accent'
            }`}
          >
            Book free consultation
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>

      {/* Rendered outside <header>: the header's backdrop-blur would otherwise trap this fixed panel inside its 72px height. */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 overflow-y-auto bg-brand-porcelain text-brand-ink lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-5 pb-10 pt-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `border-b border-brand-line py-4 font-display text-[1.75rem] ${isActive ? 'text-brand-primary' : ''}`
              }
            >
              Home
            </NavLink>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-brand-line py-4 font-display text-[1.75rem] ${isActive ? 'text-brand-primary' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              className="mt-8 rounded-pill bg-brand-primary py-4 text-center font-semibold text-white"
            >
              Book free consultation
            </Link>
            <a href={SITE.phoneHref} className="mt-3 rounded-pill border border-brand-line py-4 text-center font-semibold">
              Call {SITE.phoneDisplay}
            </a>
            <div className="mt-8 flex justify-center gap-6 text-brand-stone">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={22} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
