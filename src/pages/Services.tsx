import Button from '../components/Button';
import { Container, CtaBand, PageHero, Section, SectionHeading } from '../components/ui';
import { whatsappUrl } from '../lib/site';

export default function Services() {
  const services = [
    {
      id: 'bonding',
      title: 'Hair Bonding Procedure',
      duration: '2-3 hours',
      description:
        'A semi-permanent hair replacement solution where hair patches are bonded to your scalp using medical-grade adhesives.',
      process: [
        'Consultation and scalp analysis',
        'Cleaning and preparation of application area',
        'Custom fitting and adjustment',
        'Application of bonding adhesive',
        'Attachment and securing of hair patch',
        'Styling and blending',
      ],
      benefits: ['Long-lasting (4-6 weeks)', 'Natural appearance', 'Water-resistant', 'Can shower and swim'],
      image: '/Data/IMG-20251003-WA0075.jpg',
    },
    {
      id: 'weaving',
      title: 'Hair Weaving',
      duration: '3-4 hours',
      description:
        'A non-adhesive method where hair extensions are woven into your existing hair using a thread-based technique.',
      process: [
        'Hair assessment and preparation',
        'Creating base tracks with your natural hair',
        'Weaving hair extensions onto tracks',
        'Securing with thread',
        'Styling and finishing',
      ],
      benefits: ['No chemicals or glue', 'Breathable', 'Adjustable', 'Minimal tension on scalp'],
      image: '/Data/IMG-20251003-WA0076.jpg',
    },
    {
      id: 'clip-in',
      title: 'Clip-in Hair Solutions',
      duration: '30 minutes',
      description:
        'Temporary clip-in hair systems that can be applied and removed daily without any permanent attachment.',
      process: [
        'Selection of appropriate clip-in system',
        'Demonstrating application technique',
        'Adjusting clips for secure fit',
        'Blending with natural hair',
        'Styling guidance',
      ],
      benefits: ['No commitment', 'Easy to apply and remove', 'Can style as desired', 'Reusable'],
      image: '/Data/IMG-20251003-WA0077.jpg',
    },
    {
      id: 'extensions',
      title: 'Hair Extension Services',
      duration: '2-4 hours',
      description:
        'Professional application of various extension types including I-Tips, tape-ins, and clip-ins for added length and volume.',
      process: [
        'Consultation on extension type',
        'Color matching and selection',
        'Sectioning natural hair',
        'Application of extensions',
        'Blending and styling',
        'Care instructions',
      ],
      benefits: ['Instant length and volume', 'Natural look', 'Long-lasting', 'Multiple methods available'],
      image: '/Data/Australian_mirage.jpg',
    },
  ];

  const wigServices = [
    {
      title: 'Custom Wig Creation',
      description: 'Fully customized wigs designed specifically for your measurements and preferences',
    },
    {
      title: 'Wig Styling & Cutting',
      description: 'Professional styling, cutting, and customization of your wig',
    },
    {
      title: 'Wig Maintenance & Repair',
      description: 'Deep cleaning, conditioning, and repair services for your wigs',
    },
    {
      title: 'Chemotherapy Wig Consultation',
      description: 'Compassionate consultations and solutions for medical hair loss',
    },
  ];

  return (
    <div>
      <PageHero
        title="Our services"
        intro="How your hair system is attached matters as much as the hair itself. Here's what each method involves, how long it takes, and who it suits."
        image="/Data/main_img1.jpeg"
        imageAlt="Stylist fitting a hair system"
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {services.map((s) => (
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

      {services.map((service, index) => (
        <Section key={service.id} id={service.id} tone={index % 2 === 0 ? 'plain' : 'white'}>
          <Container className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="overflow-hidden rounded-2xl bg-brand-blush lg:sticky lg:top-28">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">{service.title}</h2>
              <p className="mt-3 text-brand-gold">Takes about {service.duration}</p>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand-stone">{service.description}</p>

              <h3 className="mt-10 font-sans text-sm font-semibold text-brand-ink">How it's done</h3>
              <ol className="mt-3 border-t border-brand-line">
                {service.process.map((step, idx) => (
                  <li key={step} className="flex gap-5 border-b border-brand-line py-3.5">
                    <span className="w-6 shrink-0 font-display text-xl italic text-brand-gold">{idx + 1}</span>
                    <span className="text-brand-ink">{step}</span>
                  </li>
                ))}
              </ol>

              <h3 className="mt-10 font-sans text-sm font-semibold text-brand-ink">Why people choose it</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-pill border border-brand-line bg-white px-4 py-2 text-sm text-brand-ink">
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/booking">Book this service</Button>
                <Button href={whatsappUrl(`Hi! I'd like to know more about ${service.title}.`)} variant="outline">
                  Ask a question
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="blush">
        <Container>
          <SectionHeading
            title="Wig services"
            intro="Already have a wig, or need one made for you? We create, style, clean and repair them."
          />
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {wigServices.map((service) => (
              <div key={service.title} className="border-t border-brand-primary/25 py-6">
                <dt className="font-display text-2xl text-brand-ink">{service.title}</dt>
                <dd className="mt-2 max-w-md text-brand-stone">{service.description}</dd>
                <dd className="mt-3">
                  <a
                    href={whatsappUrl(`Hi! I'd like to ask about ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm font-semibold text-brand-primary"
                  >
                    Ask about this
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which method is right for you?"
        body="Book a free consultation. We'll look at your hair and scalp and recommend the best option, with no obligation."
      />
    </div>
  );
}
