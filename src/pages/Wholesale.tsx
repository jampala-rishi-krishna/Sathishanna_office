import { FormEvent } from 'react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { Container, FormError, FormSent, Honeypot, PageHero, Section, SectionHeading } from '../components/ui';
import { whatsappUrl } from '../lib/site';
import { useWeb3Form } from '../lib/useWeb3Form';

const benefits = [
  { title: 'Bulk pricing & discounts', description: 'Competitive rates for volume orders' },
  { title: 'Quality assured', description: 'Premium products with guarantees' },
  { title: 'Consistent supply', description: 'Reliable inventory and delivery' },
  { title: 'Business support', description: 'Dedicated account management' },
  { title: 'Custom orders', description: 'Tailored solutions for your business' },
  { title: 'Training & support', description: 'Expert guidance and resources' },
];

const categories = [
  { title: "Women's wholesale", items: ['Bulk hair toppers & patches', 'Full wig collections', 'Extension bundles', 'Raw hair material'] },
  { title: "Men's wholesale", items: ['Hair system bundles', 'Toupee collections', 'Bulk base materials', 'Adhesive & maintenance kits'] },
];

const couriers = [
  { name: 'Blue Dart', note: 'Premium express delivery' },
  { name: 'Delhivery', note: 'Reliable logistics partner' },
  { name: 'DHL Express', note: 'International shipping' },
  { name: 'FedEx', note: 'Global delivery network' },
];

const products = [
  { src: '/Data/IMG-20251003-WA0073.jpg', name: "Classic Men's Hair System", description: 'Natural hairline, comfortable wear, salon grade' },
  { src: '/Data/IMG-20251003-WA0074.jpg', name: 'Premium Hair Patch', description: 'High quality, durable, natural look' },
  { src: '/Data/IMG-20251003-WA0075.jpg', name: 'Professional Hair System', description: 'Salon grade, long lasting, easy maintenance' },
  { src: '/Data/IMG-20251003-WA0076.jpg', name: 'Natural Hair Patch', description: 'Breathable, comfortable, professional finish' },
  { src: '/Data/IMG-20251003-WA0077.jpg', name: 'Premium Hair System', description: 'High quality materials, natural appearance' },
  { src: '/Data/IMG-20251003-WA0078.jpg', name: 'Professional Hair Patch', description: 'Salon quality, durable, natural look' },
  { src: '/Data/Golden_Silk_hair_patch.jpg', name: 'Golden Silk Hair Patch', description: 'Premium silk base, natural hair, luxurious feel' },
  { src: '/Data/Golden_hair_patch.jpg', name: 'Golden Hair Patch', description: 'Golden tone, premium quality, natural appearance' },
  { src: '/Data/Australian_mirage.jpg', name: 'Australian Mirage', description: 'Australian hair, premium quality, natural look' },
  { src: '/Data/mf_patch.jpg', name: 'MF Hair Patch', description: 'Multi-fibre, durable, professional grade' },
  { src: '/Data/china_mirage.jpg', name: 'China Mirage', description: 'Chinese hair, high quality, natural appearance' },
  { src: '/Data/golden_miraz.jpg', name: 'Golden Miraz', description: 'Golden tone, premium quality, natural look' },
  { src: '/Data/mono_hair_patch.jpg', name: 'Mono Hair Patch', description: 'Monofilament base, natural parting, professional grade' },
];

const tiers = [
  { volume: '10–50 units', discount: '10%', terms: 'Net 15', delivery: '7–10 days' },
  { volume: '50–100 units', discount: '20%', terms: 'Net 30', delivery: '5–7 days' },
  { volume: '100+ units', discount: '30%', terms: 'Net 30', delivery: '3–5 days' },
];

function RegistrationForm() {
  const { status, submit, fromForm, reset } = useWeb3Form('New Website Enquiry - B2B Wholesale');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (await submit(fromForm(form))) form.reset();
  }

  if (status === 'sent') {
    return (
      <FormSent
        title="Application received"
        body="Thank you. Our wholesale team will review your details and contact you with pricing and next steps."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-brand-line bg-white p-6 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <div>
        <label htmlFor="w-business" className="field-label">Business name</label>
        <input id="w-business" name="businessName" required autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor="w-type" className="field-label">Business type</label>
        <select id="w-type" name="businessType" required className="field" defaultValue="">
          <option value="" disabled>Choose one</option>
          <option value="salon">Salon</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="w-contact" className="field-label">Contact person</label>
        <input id="w-contact" name="contactPerson" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="w-phone" className="field-label">Phone</label>
        <input id="w-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className="field" />
      </div>
      <div>
        <label htmlFor="w-email" className="field-label">Email</label>
        <input id="w-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="w-gst" className="field-label">
          GST number <span className="font-normal text-brand-stone">(optional)</span>
        </label>
        <input id="w-gst" name="gst" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="w-address" className="field-label">Business address</label>
        <textarea id="w-address" name="address" required rows={2} autoComplete="street-address" className="field" />
      </div>
      <div>
        <label htmlFor="w-volume" className="field-label">Expected monthly volume</label>
        <select id="w-volume" name="monthlyVolume" required className="field" defaultValue="">
          <option value="" disabled>Choose one</option>
          <option value="10-50">10–50 units</option>
          <option value="50-100">50–100 units</option>
          <option value="100+">100+ units</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="w-interest" className="field-label">Which products are you interested in?</label>
        <textarea id="w-interest" name="productInterest" required rows={3} className="field" />
      </div>
      <div className="sm:col-span-2">
        <FormError status={status} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? 'Sending…' : 'Submit application'}
        </Button>
      </div>
    </form>
  );
}

export default function Wholesale() {
  return (
    <div>
      <PageHero
        title="Wholesale wigs & hair patches"
        intro="Salon-grade hair systems, wigs and extensions for studios, retailers and distributors, with volume pricing, reliable supply and delivery worldwide."
        image="/Data/IMG-20251003-WA0073.jpg"
        imageAlt="Wholesale hair systems"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#register" size="lg">
            Apply for a trade account
          </Button>
          <Button href={whatsappUrl('Hi! I have a wholesale enquiry.')} size="lg" variant="outline">
            Ask on WhatsApp
          </Button>
        </div>
      </PageHero>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Why partner with us</h2>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {benefits.map((b) => (
              <div key={b.title} className="border-t border-brand-line py-5">
                <dt className="font-display text-2xl text-brand-ink">{b.title}</dt>
                <dd className="mt-1 text-brand-stone">{b.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="The collection" intro="Our most-ordered patches and systems. Ask for the full catalogue for every base and hair type." />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {products.map((p) => (
              <ProductCard key={p.src} name={p.name} image={p.src} description={p.description} aspect="aspect-square" />
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-t border-brand-line pt-12 md:grid-cols-2">
            {categories.map((c) => (
              <div key={c.title}>
                <h3 className="text-2xl text-brand-ink sm:text-3xl">{c.title}</h3>
                <ul className="mt-4 divide-y divide-brand-line border-y border-brand-line">
                  {c.items.map((item) => (
                    <li key={item} className="py-3 text-brand-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Pricing tiers</h2>
            <p className="mt-3 text-brand-stone">Minimum order: 10 units per product category.</p>
            <div className="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-brand-primary/30 text-sm text-brand-stone">
                    <th scope="col" className="py-3 pr-4 font-medium">Order volume</th>
                    <th scope="col" className="px-4 py-3 font-medium">Discount</th>
                    <th scope="col" className="px-4 py-3 font-medium">Payment</th>
                    <th scope="col" className="py-3 pl-4 font-medium">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((t) => (
                    <tr key={t.volume} className="border-b border-brand-primary/15">
                      <th scope="row" className="py-4 pr-4 font-medium text-brand-ink">{t.volume}</th>
                      <td className="px-4 py-4 font-display text-2xl text-brand-primary">{t.discount}</td>
                      <td className="px-4 py-4 text-brand-ink">{t.terms}</td>
                      <td className="py-4 pl-4 text-brand-ink">{t.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Worldwide delivery</h2>
            <p className="mt-3 text-brand-stone">
              Every order is carefully packed and shipped through our trusted courier partners.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8">
              {couriers.map((c) => (
                <div key={c.name} className="border-t border-brand-primary/20 py-4">
                  <dt className="font-semibold text-brand-ink">{c.name}</dt>
                  <dd className="text-sm text-brand-stone">{c.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section id="register" tone="white">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Apply for a trade account</h2>
            <p className="mt-4 text-brand-stone">
              Tell us about your business and we'll send you wholesale pricing and terms.
            </p>
            <p className="mt-6 text-brand-stone">
              Need our catalogue, price list or partnership terms first?{' '}
              <a
                href={whatsappUrl('Hi! Please send me your wholesale catalogue, price list and terms.')}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-semibold text-brand-primary"
              >
                Request them on WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <RegistrationForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
