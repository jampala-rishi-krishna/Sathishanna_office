import { FormEvent } from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import Button from '../components/Button';
import { Container, FormError, FormSent, Honeypot, PageHero, Section } from '../components/ui';
import { BRANCHES, SITE, whatsappUrl } from '../lib/site';
import { useWeb3Form } from '../lib/useWeb3Form';

export default function Contact() {
  const { status, submit, fromForm, reset } = useWeb3Form('New Contact Form Submission - Hair 2 Hair Studio');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (await submit(fromForm(form))) form.reset();
  }

  return (
    <div>
      <PageHero
        title="Get in touch"
        intro="Ask us anything about hair patches, wigs, extensions or wholesale. Most people find WhatsApp the quickest way to reach us."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={whatsappUrl('Hi! I would like to know more about your services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-brand-line bg-white p-4 transition-colors hover:border-whatsapp"
          >
            <MessageCircle className="text-whatsapp" size={22} aria-hidden="true" />
            <span>
              <span className="block font-semibold text-brand-ink">WhatsApp</span>
              <span className="text-sm text-brand-stone">Fastest reply</span>
            </span>
          </a>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-3 rounded-xl border border-brand-line bg-white p-4 transition-colors hover:border-brand-primary"
          >
            <Phone className="text-brand-primary" size={22} aria-hidden="true" />
            <span>
              <span className="block font-semibold text-brand-ink">Call</span>
              <span className="text-sm text-brand-stone">{SITE.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-3 rounded-xl border border-brand-line bg-white p-4 transition-colors hover:border-brand-primary"
          >
            <Mail className="text-brand-primary" size={22} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-semibold text-brand-ink">Email</span>
              <span className="block truncate text-sm text-brand-stone">{SITE.email}</span>
            </span>
          </a>
        </div>
      </PageHero>

      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Send us a message</h2>
            <p className="mt-3 text-brand-stone">We'll call or WhatsApp you back as soon as we can.</p>

            <div className="mt-8">
              {status === 'sent' ? (
                <FormSent
                  title="Message sent"
                  body="Thank you. Someone from the studio will be in touch soon."
                  onReset={reset}
                />
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                  <Honeypot />
                  <div>
                    <label htmlFor="c-name" className="field-label">Name</label>
                    <input id="c-name" name="name" required autoComplete="name" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="field-label">Phone or WhatsApp</label>
                    <input id="c-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className="field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-email" className="field-label">
                      Email <span className="font-normal text-brand-stone">(optional)</span>
                    </label>
                    <input id="c-email" name="email" type="email" autoComplete="email" className="field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-concern" className="field-label">What's it about?</label>
                    <select id="c-concern" name="concern" required className="field" defaultValue="">
                      <option value="" disabled>Choose one</option>
                      <option value="Hair Replacement">Hair replacement</option>
                      <option value="Hair Extensions">Hair extensions</option>
                      <option value="Wigs for Women">Wigs for women</option>
                      <option value="Men's Hair Systems">Men's hair systems</option>
                      <option value="Wholesale Enquiry">Wholesale enquiry</option>
                      <option value="Franchise Enquiry">Franchise enquiry</option>
                      <option value="Product Care & Maintenance">Product care &amp; maintenance</option>
                      <option value="Other">Something else</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className="field-label">Message</label>
                    <textarea id="c-message" name="message" rows={5} required className="field" />
                  </div>
                  <div className="sm:col-span-2">
                    <FormError status={status} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Our studios</h2>
            <p className="mt-3 text-brand-stone">Opening hours are shown separately for each studio. Contact Khammam to confirm its current hours.</p>
            <div className="mt-8 space-y-8">
              {BRANCHES.map((b) => (
                <div key={b.name} className="border-t border-brand-line pt-5">
                  <h3 className="text-2xl text-brand-ink">
                    {b.name} <span className="font-sans text-sm font-normal text-brand-stone">{b.note}</span>
                  </h3>
                  <p className="mt-2 text-brand-stone">{b.address}</p>
                  <p className="mt-1 text-sm text-brand-stone">{b.hours}</p>
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block font-semibold text-brand-primary">
                    Get directions
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-brand-line bg-brand-blush">
              <iframe
                src={BRANCHES[0].embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Hair 2 Hair Studio, Dilsukhnagar"
              />
            </div>
          </aside>
        </Container>
      </Section>
    </div>
  );
}
