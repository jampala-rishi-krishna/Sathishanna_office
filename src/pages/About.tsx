import Button from '../components/Button';
import { Container, CtaBand, PageHero, Section, SectionHeading } from '../components/ui';
import { BRANCHES } from '../lib/site';

export default function About() {
  const team = [
    {
      name: 'Jampala Sathish',
      role: 'Founder & Master Hair Specialist',
      experience: '10+ years',
      expertise: 'Hair Bonding & Systems',
      image: '/Data/Sathish.jpg',
    },
    {
      name: 'Jampala Rishi Krishna',
      role: 'Chief Technical Officer',
      experience: '2+ years',
      expertise: 'Technical Works and Marketing',
      image: '/Data/Rishi.png',
    },
    {
      name: 'Jampala Anil',
      role: 'Hair Replacement Specialist',
      experience: '5+ years',
      expertise: "Men's Hair Systems",
      image: '/Data/anil.jpg',
    },
    {
      name: 'Jampala Navya',
      role: 'Consultation Expert',
      experience: '6+ years',
      expertise: 'Marketing Lead',
      image: '/Data/Navya.jpg',
    },
  ];

  const values = [
    {
      title: 'Empathy & understanding',
      description: 'We understand the emotional impact of hair loss and treat every client with compassion.',
    },
    {
      title: 'Excellence & quality',
      description: 'We never compromise on quality and only use the finest materials.',
    },
    {
      title: 'Client-centred approach',
      description: 'Your satisfaction and confidence are at the heart of everything we do.',
    },
    {
      title: 'Natural results',
      description: 'Our goal is to create solutions that look and feel completely natural.',
    },
  ];

  return (
    <div>
      <PageHero
        title="Where beauty meets comfort"
        intro="We're a family-run team specialising in hair replacement, extensions and wigs, serving customers at our listed studios in Hyderabad and Khammam."
        image="/Data/about us.png"
        imageAlt="Hair 2 Hair Studio: non-surgical hair replacement services"
        imageFit="contain"
      />

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[1.9rem] italic leading-snug text-brand-primary sm:text-4xl">
              “Everyone deserves to feel confident and beautiful. That's why we built a place where you can talk about
              hair loss without feeling judged.”
            </p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-brand-stone lg:col-span-7">
            <p>
              Many people struggle with hair loss, whether from genetics, a medical condition or simply age. Our job is
              to give them back a look they're happy with, using solutions that look and feel natural.
            </p>
            <p>
              For partial or complete hair loss, we build a customised hair system that fits your scalp exactly and
              blends with your own hair. For length, volume or colour, we fit extensions made from high-quality human
              hair. And for those who prefer a full non-surgical option, we offer wigs in a range of colours, lengths
              and styles, chosen to suit your face shape, skin tone and personal style.
            </p>
            <p>
              Every visit happens in a welcoming, private setting where you can discuss your concerns openly and find
              the right solution at your own pace.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title="Meet the people behind H2H"
            intro="Get to know the team you'll speak with when comparing hair systems, fittings and aftercare."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {team.map((member) => (
              <figure key={member.name}>
                <div className="overflow-hidden rounded-arch bg-brand-blush">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-display text-xl text-brand-ink sm:text-2xl">{member.name}</span>
                  <span className="mt-1 block text-sm font-medium text-brand-primary">{member.role}</span>
                  <span className="mt-2 block text-sm text-brand-stone">
                    {member.experience} · {member.expertise}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="blush">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">What we believe</h2>
            <dl className="mt-8">
              {values.map((v) => (
                <div key={v.title} className="border-t border-brand-primary/20 py-5">
                  <dt className="font-display text-2xl text-brand-ink">{v.title}</dt>
                  <dd className="mt-1 text-brand-stone">{v.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">What to expect at a consultation</h2>
            <dl className="mt-8">
              <div className="border-t border-brand-primary/20 py-5">
                <dt className="font-display text-2xl text-brand-ink">Discuss your requirements</dt>
                <dd className="mt-1 text-brand-stone">Talk through the coverage, style, colour, texture and daily routine you want the solution to fit.</dd>
              </div>
              <div className="border-t border-brand-primary/20 py-5">
                <dt className="font-display text-2xl text-brand-ink">Compare suitable options</dt>
                <dd className="mt-1 text-brand-stone">Ask to see the available base constructions, hair types and attachment methods that suit the specific system.</dd>
              </div>
              <div className="border-t border-brand-primary/20 py-5">
                <dt className="font-display text-2xl text-brand-ink">Understand care and cost</dt>
                <dd className="mt-1 text-brand-stone">Request aftercare instructions, recommended servicing and an itemised quote before deciding.</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Visit our studio</h2>
            <p className="mt-4 text-lg text-brand-stone">
              Visit either listed studio to discuss hair systems, wigs, extensions, fitting options and aftercare in person.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/booking">Schedule a visit</Button>
              <Button href="/contact" variant="outline">
                Contact & directions
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {BRANCHES.map((b) => (
              <div key={b.name} className="border-t border-brand-line pt-5">
                <h3 className="text-2xl text-brand-ink">{b.name}</h3>
                <p className="mt-2 text-brand-stone">{b.address}</p>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block font-semibold text-brand-primary">
                  Get directions
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Your first consultation is on us"
        body="Meet the team, see the hair and bases in person, and get honest advice before you decide anything."
      />
    </div>
  );
}
