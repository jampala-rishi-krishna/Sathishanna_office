import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { BRANCHES, SITE, whatsappUrl } from '../lib/site';

const explore = [
  { to: '/hair-replacement-services/', label: 'All hair replacement services' },
  { to: '/hair-patch-selection-guide/', label: 'Hair patch selection guide' },
  { to: '/hair-system-maintenance-guide/', label: 'Hair system care guide' },
  { to: '/editorial-policy/', label: 'Editorial policy & corrections' },
  { to: '/areas/kukatpally/', label: 'Kukatpally area information' },
  { to: '/men', label: "Men's hair systems" },
  { to: '/women', label: "Women's patches & wigs" },
  { to: '/women#extensions', label: 'Hair extensions' },
  { to: '/services', label: 'Services & procedures' },
  { to: '/wholesale', label: 'Wholesale' },
];

const studio = [
  { to: '/about', label: 'About us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/#faq', label: 'Questions' },
  { to: '/contact', label: 'Contact' },
  { to: '/booking', label: 'Book a consultation' },
  { to: '/editorial-policy/', label: 'Editorial policy & corrections' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep pb-24 text-white/75 lg:pb-0">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl text-white">Hair 2 Hair Studio</p>
            <p className="mt-1 font-display italic text-brand-goldsoft">{SITE.tagline}</p>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
              Men's and women's hair replacement options, wigs and extensions at our listed studios in Hyderabad and Khammam.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-white">Explore</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {explore.map((l) => (
                <li key={l.to}>
                  {[
                    '/hair-replacement-services/',
                    '/hair-patch-selection-guide/',
                    '/hair-system-maintenance-guide/',
                    '/editorial-policy/',
                  ].includes(l.to) ? (
                    <a href={l.to} className="hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio" className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-white">Studio</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {studio.map((l) => (
                <li key={l.to}>
                  {l.to === '/editorial-policy/' || l.to === '/areas/kukatpally/' ? (
                    <a href={l.to} className="hover:text-white">{l.label}</a>
                  ) : (
                    <Link to={l.to} className="hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6 text-[0.95rem] lg:col-span-4">
            {BRANCHES.map((b) => (
              <div key={b.name}>
                <p className="font-semibold text-white">
                  {b.name} <span className="font-normal text-white/50">({b.note.toLowerCase()})</span>
                </p>
                <p className="mt-1 leading-relaxed">{b.address}</p>
                <p className="mt-1 text-sm text-white/65">{b.hours}</p>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-brand-goldsoft hover:text-white">
                  Get directions
                </a>
                <Link
                  to={b.name.includes('Khammam') ? '/hair-replacement-khammam/' : '/hair-replacement-hyderabad/'}
                  className="mt-1 block text-brand-goldsoft hover:text-white"
                >
                  Hair replacement services &amp; location details
                </Link>
              </div>
            ))}
            <div>
              <a href={SITE.phoneHref} className="block font-semibold text-white hover:text-brand-goldsoft">
                {SITE.phoneDisplay}
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                WhatsApp us
              </a>
              <a href={`mailto:${SITE.email}`} className="block break-all hover:text-white">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-sm text-white/45 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Hair 2 Hair Studio. All rights reserved.</p>
          <p>Design & development by Rishi</p>
        </div>
      </div>
    </footer>
  );
}
