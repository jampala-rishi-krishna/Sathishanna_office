import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { Container, CtaBand, Meter, PageHero, Section, SectionHeading } from '../components/ui';
import { whatsappUrl } from '../lib/site';

export default function Men() {
  const patches = [
    {
      name: 'Skin Base Hair System',
      features: ['Durable PU base', 'Water-resistant', 'Active lifestyle ready', 'Natural appearance'],
      base: 'Polyurethane (PU)',
      coverage: 'Full/Partial',
      image: '/Data/IMG-20251003-WA0073.jpg',
    },
    {
      name: 'Lace Hair System',
      features: ['Breathable', 'Natural hairline', 'Lightweight', 'Comfortable wear'],
      base: 'Swiss Lace',
      coverage: 'Full Coverage',
      image: '/Data/IMG-20251003-WA0074.jpg',
    },
    {
      name: 'Hybrid Base System',
      features: ['Best of both worlds', 'Durable front', 'Breathable top', 'Versatile'],
      base: 'Hybrid (Lace + PU)',
      coverage: 'Full Coverage',
      image: '/Data/IMG-20251003-WA0076.jpg',
    },
    {
      name: 'Mono Top System',
      features: ['Hand-tied', 'Natural movement', 'Long-lasting', 'Professional look'],
      base: 'Monofilament',
      coverage: 'Full/Partial',
      image: '/Data/IMG-20251003-WA0077.jpg',
    },
  ];

  const wigs = [
    {
      name: 'Business Professional Wig',
      features: ['Classic style', 'Natural gray options', 'Conservative cut', 'Professional appearance'],
      style: 'Short/Medium',
      type: 'Full Wig',
      image: '/Data/IMG-20251003-WA0078.jpg',
    },
    {
      name: 'Casual Style Wig',
      features: ['Relaxed look', 'Easy maintenance', 'Comfortable', 'Natural styling'],
      style: 'Medium',
      type: 'Full Wig',
      image: '/Data/IMG-20251003-WA0079.jpg',
    },
    {
      name: 'Sports Active Wig',
      features: ['Secure fit', 'Sweat-resistant', 'Durable', 'Natural movement'],
      style: 'Short',
      type: 'Full Wig',
      image: '/Data/IMG-20251003-WA0074.jpg',
    },
  ];

  const coverageAreas = [
    { title: 'Receding hairline', description: 'Restore your natural hairline with invisible frontal solutions' },
    { title: 'Crown thinning', description: 'Targeted coverage for crown-area hair loss' },
    { title: 'Full bald coverage', description: 'Complete transformation for full hair loss' },
    { title: 'Partial coverage', description: 'Blends seamlessly with your existing hair' },
  ];

  const baseTypes = [
    { name: 'Lace', breathability: 5, durability: 3, look: 5, comfort: 4, bestFor: 'Natural hairline' },
    { name: 'PU (skin)', breathability: 3, durability: 5, look: 4, comfort: 3, bestFor: 'Active lifestyle' },
    { name: 'Monofilament', breathability: 4, durability: 4, look: 5, comfort: 5, bestFor: 'Daily wear' },
    { name: 'Hybrid', breathability: 4, durability: 4, look: 4, comfort: 4, bestFor: 'All-round' },
  ];

  return (
    <div>
      <PageHero
        title="Hair systems for men"
        intro="Confidence, style and natural results. Whether it's a receding hairline, a thinning crown or full coverage, we match a system to your hair and your routine."
        image="/Data/IMG-20251003-WA0075.jpg"
        imageAlt="Men's hair system fitted at Hair 2 Hair Studio"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/booking" size="lg">
            Book a free consultation
          </Button>
          <Button href={whatsappUrl("Hi! I'd like to know about men's hair systems.")} size="lg" variant="outline">
            Ask on WhatsApp
          </Button>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <SectionHeading title="What kind of coverage do you need?" />
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {coverageAreas.map((area) => (
              <div key={area.title} className="border-t border-brand-primary/25 py-5">
                <dt className="font-display text-2xl text-brand-ink">{area.title}</dt>
                <dd className="mt-2 text-brand-stone">{area.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section id="patches">
        <Container>
          <SectionHeading
            title="Hair patches & systems"
            intro="Built for durability, comfort and a natural look. The base type decides how it feels and how long it lasts, so choose the one that suits your lifestyle."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {patches.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                image={product.image}
                specs={[
                  { label: 'Base', value: product.base },
                  { label: 'Coverage', value: product.coverage },
                ]}
                features={product.features}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container>
          <SectionHeading
            title="Choosing the right base"
            intro="A quick comparison of the four bases we fit most. We'll help you decide at your consultation."
          />
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Comparison of hair system base types, rated out of 5</caption>
              <thead>
                <tr className="border-b border-brand-primary/30 text-sm text-brand-stone">
                  <th scope="col" className="py-3 pr-4 font-medium">Base</th>
                  <th scope="col" className="px-4 py-3 font-medium">Breathability</th>
                  <th scope="col" className="px-4 py-3 font-medium">Durability</th>
                  <th scope="col" className="px-4 py-3 font-medium">Natural look</th>
                  <th scope="col" className="px-4 py-3 font-medium">Comfort</th>
                  <th scope="col" className="py-3 pl-4 font-medium">Best for</th>
                </tr>
              </thead>
              <tbody>
                {baseTypes.map((b) => (
                  <tr key={b.name} className="border-b border-brand-primary/15">
                    <th scope="row" className="py-4 pr-4 font-display text-xl font-normal text-brand-ink">
                      {b.name}
                    </th>
                    <td className="px-4 py-4"><Meter value={b.breathability} /></td>
                    <td className="px-4 py-4"><Meter value={b.durability} /></td>
                    <td className="px-4 py-4"><Meter value={b.look} /></td>
                    <td className="px-4 py-4"><Meter value={b.comfort} /></td>
                    <td className="py-4 pl-4 text-brand-ink">{b.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section id="wigs">
        <Container>
          <SectionHeading
            title="Full wigs & toupees"
            intro="Complete hair solutions styled for different occasions and lifestyles. Worldwide delivery available."
          />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {wigs.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                image={product.image}
                aspect="aspect-[4/3]"
                specs={[
                  { label: 'Style', value: product.style },
                  { label: 'Type', value: product.type },
                ]}
                features={product.features}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Start with a private conversation"
        body="Our specialists will help you choose the right hair system for your lifestyle. The consultation is free and confidential."
      />
    </div>
  );
}
