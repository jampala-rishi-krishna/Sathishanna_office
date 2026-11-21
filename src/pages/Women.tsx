import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { Container, PageHero, Section, SectionHeading } from '../components/ui';
import { whatsappUrl } from '../lib/site';

export default function Women() {
  const patches = [
    {
      name: 'Lace Front Hair Topper',
      features: ['Natural scalp appearance', 'Breathable lace base', '100% human hair', 'Crown coverage'],
      base: 'Lace Front',
      hair: 'Human Remy Hair',
      image: '/Data/Golden_Silk_hair_patch.jpg',
    },
    {
      name: 'Mono Top Patch',
      features: ['Hand-tied construction', 'Natural movement', 'Durable', 'Comfortable fit'],
      base: 'Monofilament',
      hair: 'Human Hair',
      image: '/Data/mono_hair_patch.jpg',
    },
    {
      name: 'Lace Front Wig',
      features: ['Natural hairline', 'Heat resistant', 'Style flexibility', 'Affordable'],
      base: 'Lace Front',
      hair: 'Human Hair',
      image: '/Data/Golden_hair_patch.jpg',
    },
    {
      name: '360 Lace Wig',
      features: ['Ponytail ready', 'Natural all around', 'Comfortable', 'High quality'],
      base: '360 Lace',
      hair: 'Remy Hair',
      image: '/Data/golden_miraz.jpg',
    },
  ];

  const wigs = [
    {
      name: 'Full Lace Wig',
      features: ['Complete versatility', 'Natural parting', 'Breathable', 'Long-lasting'],
      base: 'Full Lace',
      hair: 'Virgin Human Hair',
      image: '/Data/Australian_mirage.jpg',
    },
    {
      name: 'Lace Front Wig',
      features: ['Natural hairline', 'Heat resistant', 'Style flexibility', 'Affordable'],
      base: 'Lace Front',
      hair: 'Human Hair',
      image: '/Data/home_page1.png',
    },
    {
      name: '360 Lace Wig',
      features: ['Ponytail ready', 'Natural all around', 'Comfortable', 'High quality'],
      base: '360 Lace',
      hair: 'Remy Hair',
      image: '/Data/home_page3.jpg',
    },
    {
      name: 'Silk Top Wig',
      features: ['Realistic scalp', 'Premium quality', 'Soft texture', 'Natural look'],
      base: 'Silk Top',
      hair: 'Virgin Hair',
      image: '/Data/IMG-20251003-WA0078.jpg',
    },
  ];

  const extensions = [
    {
      name: 'I-Tip Extensions',
      features: ['Individual strands', 'Natural movement', 'Long-lasting', 'No damage'],
      type: 'I-Tips',
      hair: 'Human Hair',
      image: '/Data/IMG-20251003-WA0075.jpg',
    },
    {
      name: 'Clip-in Extensions',
      features: ['Easy application', 'Temporary', 'Reusable', 'Volume & length'],
      type: 'Clip-in',
      hair: 'Remy Hair',
      image: '/Data/IMG-20251003-WA0079.jpg',
    },
    {
      name: 'Tape Extensions',
      features: ['Seamless blend', 'Quick install', 'Lightweight', 'Reusable'],
      type: 'Tape-in',
      hair: 'Human Hair',
      image: '/Data/main_img1.jpeg',
    },
  ];

  const sections = [
    {
      id: 'patches',
      title: 'Hair patches & toppers',
      intro:
        'For thinning areas, bald spots or a flat crown. Toppers clip or bond in and blend seamlessly with your natural hair.',
      items: patches.map((p) => ({ ...p, specs: [{ label: 'Base', value: p.base }, { label: 'Hair', value: p.hair }] })),
      tone: 'plain' as const,
    },
    {
      id: 'wigs',
      title: 'Full wigs',
      intro: 'A complete transformation in the style, length and colour you choose. Worldwide delivery available.',
      items: wigs.map((p) => ({ ...p, specs: [{ label: 'Base', value: p.base }, { label: 'Hair', value: p.hair }] })),
      tone: 'white' as const,
    },
    {
      id: 'extensions',
      title: 'Hair extensions',
      intro: 'Add length, volume and style instantly with premium human-hair extensions.',
      items: extensions.map((p) => ({ ...p, specs: [{ label: 'Type', value: p.type }, { label: 'Hair', value: p.hair }] })),
      tone: 'plain' as const,
    },
  ];

  return (
    <div>
      <PageHero
        title="Hair solutions for women"
        intro="Natural, beautiful, confident. Toppers, wigs and extensions in real human hair, chosen with you in a private consultation and matched to your colour and texture."
        image="/Data/Australian_mirage.jpg"
        imageAlt="Woman with natural-looking hair"
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-pill border border-brand-line bg-white px-4 py-2 text-sm font-medium text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {sections.map((section) => (
        <Section key={section.id} id={section.id} tone={section.tone}>
          <Container>
            <SectionHeading title={section.title} intro={section.intro} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {section.items.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  image={product.image}
                  specs={product.specs}
                  features={product.features}
                />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="blush">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Not sure which one is right?</h2>
            <p className="mt-3 text-lg text-brand-stone">
              Tell us what you'd like to change. Our consultants will suggest two or three options and show them to you
              in person.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/booking" size="lg">
              Book a free consultation
            </Button>
            <Button href={whatsappUrl("Hi! I need help choosing a women's hair solution.")} size="lg" variant="outline">
              Ask on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
