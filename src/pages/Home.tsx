import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Minus } from 'lucide-react';
import Button from '../components/Button';
import GoogleReviews from '../components/GoogleReviews';
import { Container, Section, SectionHeading, Honeypot, FormSent, FormError } from '../components/ui';
import { BRANCHES, SITE, whatsappUrl } from '../lib/site';
import { useWeb3Form } from '../lib/useWeb3Form';

const heroImages = ['/Data/gallery/Cover photo 1.png', '/Data/gallery/cover photo 2.png', '/Data/gallery/cover photo 3.png'];

const paths = [
  {
    title: 'For men',
    body: 'Skin, lace, mono and hybrid hair systems for a receding hairline, a thinning crown or full coverage.',
    link: '/men',
    cta: "See men's hair systems",
    image: '/Data/IMG-20251003-WA0075.jpg',
  },
  {
    title: 'For women',
    body: 'Toppers for a thinning parting, full wigs and extensions in human hair, matched to your colour and texture.',
    link: '/women',
    cta: "See women's solutions",
    image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const services = [
  { title: 'Hair patches & toppers', description: 'Natural coverage for thinning areas', link: '/women#patches' },
  { title: 'Premium wigs', description: 'Full transformation, with worldwide delivery', link: '/women#wigs' },
  { title: 'Hair extensions', description: 'Add length and volume instantly', link: '/women#extensions' },
  { title: 'Bonding, weaving & clip-ins', description: 'How your system is attached, explained', link: '/services' },
  { title: 'Wholesale', description: 'Bulk orders for salons and studios', link: '/wholesale' },
];

const problems = [
  { title: 'Thinning crown', description: 'Gradual hair loss at the crown', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/Hair-Patch-1.1.webp' },
  { title: 'All-over thinning', description: 'General thinning across the scalp', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/Hair-Patch-4.webp' },
  { title: 'Hair fall', description: 'Excessive shedding and loss', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/Shot-hair-problem-2.webp' },
  { title: 'Thin hair', description: 'Lack of volume and density', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/Shot-hair-problem-3.webp' },
];

const steps = [
  {
    title: 'Private consultation',
    body: 'We look at your scalp, the pattern of hair loss and how you live day to day. Free, and nothing is decided on the spot.',
  },
  {
    title: 'Choosing your system',
    body: 'Base type, hair origin, colour, density and texture are matched to your own hair, so the result reads as yours.',
  },
  {
    title: 'Fitting & styling',
    body: 'Your system is bonded, woven or clipped, then cut and styled into your hair in the same sitting.',
  },
  {
    title: 'Aftercare & servicing',
    body: 'You learn how to care for it at home, and come back every 4–6 weeks for cleaning and re-fixing.',
  },
];

const lifestyle = [
  { title: 'Sleep', note: 'Comfortable all night', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/hairpatchSleep.webp' },
  { title: 'Shower', note: 'Water-resistant', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/hairpatchshower.webp' },
  { title: 'Work out', note: 'Stays put when you sweat', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/hairpatchworkout.webp' },
  { title: 'Ride', note: 'Helmet on, helmet off', image: 'https://www.bglamhairstudio.com/wp-content/uploads/2025/05/hairpatchride.webp' },
];

const benefits = [
  'Instant transformation',
  'Non-surgical & painless',
  'Customisable to your needs',
  'Durable & reusable',
  'Boosts self-esteem',
];

const whyChooseUs = [
  { title: 'Expert team', description: 'Practical guidance on hair replacement options and aftercare' },
  { title: 'Premium quality', description: 'Only the finest materials and craftsmanship' },
  { title: 'Personalised solutions', description: 'Custom-tailored to your unique needs' },
  { title: 'Aftercare support', description: 'Comprehensive maintenance guidance' },
  { title: 'Discreet consultations', description: 'Private and confidential service' },
  { title: 'Transparent pricing', description: 'No hidden costs or surprises' },
];

const transformations = [
  { image: 'https://www.bglamhairstudio.com/wp-content/uploads/2024/03/HairPatch.jpg.webp', caption: 'Premium hair patch' },
  { image: 'https://www.bglamhairstudio.com/wp-content/uploads/2024/03/image1.jpg.webp', caption: 'Natural hair restoration' },
  {
    image: 'https://www.bglamhairstudio.com/wp-content/uploads/2024/03/120392424_3612544725444814_3743994574969795556_n.jpg',
    caption: 'Professional hair system',
  },
];

const faqs = [
  {
    q: 'Will people be able to tell?',
    a: 'Not when it is matched and fitted properly. We match the hair colour, density, texture and hairline to your own, then cut it into your existing hair so there is no visible edge.',
  },
  {
    q: 'Can I shower, sleep, swim and exercise with it?',
    a: 'Yes. Bonded systems are water-resistant and stay on while you sleep, shower, work out or wear a helmet. We show you how to dry and style it at home.',
  },
  {
    q: 'Is it surgery? Does it hurt?',
    a: 'No surgery, no needles and no pain. A hair system is attached with medical-grade adhesive, tape, weaving or clips, depending on what suits you.',
  },
  {
    q: 'How often do I need to come back?',
    a: 'A bonded system is usually serviced every 4–6 weeks: we remove it, clean your scalp and the system, and re-fix it. Clip-in options need no servicing.',
  },
  {
    q: 'Is the first consultation really free?',
    a: 'Yes. You can see the different bases and hair types, ask anything, and leave without committing to a purchase.',
  },
  {
    q: 'I live outside Hyderabad. Can you still help?',
    a: 'We have a studio in Khammam as well as Dilsukhnagar, serve clients from Kothagudem and across Telangana, and deliver wigs worldwide.',
  },
];

function HeroBackdrop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % heroImages.length), 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-[70%_center] bg-no-repeat transition-opacity duration-[1600ms] ease-out sm:bg-right ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${encodeURI(src)})` }}
        />
      ))}
      {/* Darkens only where the text sits; the photo stays clean on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/80 to-transparent sm:via-brand-deep/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-deep to-transparent" />
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-brand-line border-y border-brand-line">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-xl text-brand-ink sm:text-[1.4rem]">{item.q}</span>
              {isOpen ? (
                <Minus className="shrink-0 text-brand-primary" size={20} aria-hidden="true" />
              ) : (
                <Plus className="shrink-0 text-brand-primary" size={20} aria-hidden="true" />
              )}
            </button>
            <div id={`faq-${i}`} hidden={!isOpen}>
              <p className="max-w-prose pb-6 leading-relaxed text-brand-stone">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function EnquiryForm() {
  const { status, submit, fromForm, reset } = useWeb3Form('New Website Enquiry - Choose Your Concern');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (await submit(fromForm(form))) form.reset();
  }

  if (status === 'sent') {
    return (
      <FormSent
        title="Thanks, we've got your message"
        body="Someone from the studio will call or WhatsApp you soon."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-brand-line bg-white p-6 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <div className="sm:col-span-2">
        <label htmlFor="h-concern" className="field-label">
          What would you like help with?
        </label>
        <select id="h-concern" name="concern" className="field" defaultValue="Hair Replacement">
          <option value="Hair Replacement">Hair replacement</option>
          <option value="Hair Extensions">Hair extensions</option>
          <option value="Wigs">Wigs</option>
          <option value="Others">Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="h-name" className="field-label">
          Name
        </label>
        <input id="h-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="h-phone" className="field-label">
          Phone or WhatsApp
        </label>
        <input id="h-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="h-email" className="field-label">
          Email <span className="font-normal text-brand-stone">(optional)</span>
        </label>
        <input id="h-email" name="email" type="email" autoComplete="email" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="h-message" className="field-label">
          Anything we should know? <span className="font-normal text-brand-stone">(optional)</span>
        </label>
        <textarea id="h-message" name="message" rows={3} className="field" />
      </div>
      <div className="sm:col-span-2">
        <FormError status={status} />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-stone">Your details stay private and are only used to contact you.</p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-[4.5rem] flex min-h-[640px] items-end overflow-hidden bg-brand-deep pt-[4.5rem] text-white sm:min-h-[min(92vh,880px)]">
        <HeroBackdrop />
        <Container className="relative pb-14 pt-24 sm:pb-20">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-[0.95rem] text-brand-goldsoft">
              Non-surgical hair replacement in Hyderabad &amp; Khammam
            </p>
            <h1 className="mt-5 animate-fade-up text-[2.9rem] leading-[1.02] [animation-delay:100ms] sm:text-7xl lg:text-[5.5rem]">
              A hairline nobody questions.
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/80 [animation-delay:200ms] sm:text-xl">
              Custom hair patches, wigs and extensions for men and women, matched to your colour, density and texture,
              and fitted privately by our specialists.
            </p>
            <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:300ms] sm:flex-row">
              <Button href="/booking" size="lg" variant="light">
                Book a free consultation
              </Button>
              <Button href={whatsappUrl()} size="lg" variant="ghost">
                Ask on WhatsApp
              </Button>
            </div>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:mt-20">
            <div>
              <dt className="sr-only">Current studio locations</dt>
              <dd className="font-display text-2xl sm:text-3xl">2</dd>
              <dd className="mt-1 text-xs text-white/60 sm:text-sm">current studio locations</dd>
            </div>
            <div>
              <dt className="sr-only">Consultations</dt>
              <dd className="font-display text-2xl sm:text-3xl">Private</dd>
              <dd className="mt-1 text-xs text-white/60 sm:text-sm">consultation rooms</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Who it's for */}
      <Section>
        <Container>
          <SectionHeading
            title="Hair loss looks different for everyone. So does the fix."
            intro="Start with the solutions made for you, or tell us what's happening and we'll suggest where to begin."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((p) => (
              <Link key={p.title} to={p.link} className="group relative block overflow-hidden rounded-2xl bg-brand-deep">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <h3 className="text-3xl sm:text-4xl">{p.title}</h3>
                  <p className="mt-2 max-w-md text-white/80">{p.body}</p>
                  <span className="mt-4 inline-block font-semibold underline decoration-brand-gold underline-offset-[6px]">
                    {p.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <ul className="mt-12 divide-y divide-brand-line border-y border-brand-line">
            {services.map((s) => (
              <li key={s.title}>
                <Link
                  to={s.link}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-display text-2xl text-brand-ink transition-colors group-hover:text-brand-primary">
                    {s.title}
                  </span>
                  <span className="text-brand-stone">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Common problems */}
      <Section tone="white">
        <Container>
          <SectionHeading
            title="Where are you losing hair?"
            intro="These are the patterns we see most often. Each one calls for a different base and a different fit."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {problems.map((p) => (
              <figure key={p.title}>
                <div className="overflow-hidden rounded-xl bg-brand-blush">
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                </div>
                <figcaption className="mt-3">
                  <span className="block font-semibold text-brand-ink">{p.title}</span>
                  <span className="text-sm text-brand-stone">{p.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="blush">
        <Container>
          <SectionHeading
            title="What happens when you come in"
            intro="Most people are nervous before their first visit. Here is exactly what to expect."
          />
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-brand-primary/30 pt-5">
                <span className="font-display text-5xl italic text-brand-gold">{i + 1}</span>
                <h3 className="mt-3 text-2xl text-brand-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-stone">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Button href="/booking" size="lg">
              Book your free consultation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Lifestyle */}
      <Section>
        <Container>
          <SectionHeading
            title="Made to be forgotten about"
            intro="It feels like your own hair. Wear it to bed, in the shower, at the gym and under a helmet."
          />
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
            {lifestyle.map((l) => (
              <figure key={l.title} className="w-[70%] shrink-0 snap-start sm:w-auto">
                <div className="overflow-hidden rounded-xl bg-brand-blush">
                  <img src={l.image} alt={`${l.title} with a hair patch`} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
                </div>
                <figcaption className="mt-3">
                  <span className="font-display text-2xl text-brand-ink">{l.title}</span>
                  <span className="block text-sm text-brand-stone">{l.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why patches + why us */}
      <Section tone="white">
        <Container className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-arch bg-brand-blush">
              <img
                src="/Data/Gemini_Generated_Image_d69vind69vind69v.png"
                alt="Client after a hair system fitting"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem] lg:text-5xl">
              Why choose a hair patch or wig?
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand-stone">
              Hair patches and wigs are a quick, reliable answer to hair loss without surgery. They're tailored to your
              style, lightweight and breathable for everyday wear, and with proper care they can be reused, which
              makes them cost-effective. Most of all, they give you back control over how you look.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {benefits.map((b) => (
                <li key={b} className="rounded-pill border border-brand-line bg-brand-porcelain px-4 py-2 text-sm text-brand-ink">
                  {b}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 text-2xl text-brand-ink sm:text-3xl">Why people choose us</h3>
            <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {whyChooseUs.map((w) => (
                <div key={w.title} className="border-t border-brand-line py-4">
                  <dt className="font-semibold text-brand-ink">{w.title}</dt>
                  <dd className="mt-1 text-brand-stone">{w.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Transformations */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading title="Transformations" intro="A few of the results we're proud of." className="mb-0 sm:mb-0" />
            <Link to="/gallery" className="link-underline shrink-0 font-semibold text-brand-primary">
              View the full gallery
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {transformations.map((t, i) => (
              <figure key={t.caption} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <div className="overflow-hidden rounded-xl bg-brand-blush">
                  <img src={t.image} alt={t.caption} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
                </div>
                <figcaption className="mt-3 text-sm text-brand-stone">{t.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <Section tone="dark" id="google-reviews">
        <Container>
          <h2 className="mb-12 max-w-2xl text-[2rem] leading-[1.1] text-white sm:text-[2.6rem] lg:text-5xl">
            What our clients say
          </h2>
          <GoogleReviews />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Questions people ask us first</h2>
            <p className="mt-4 text-brand-stone">
              Something else on your mind?{' '}
              <a href={whatsappUrl('Hi! I have a question about hair patches.')} target="_blank" rel="noopener noreferrer" className="link-underline text-brand-primary">
                Ask us on WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </Container>
      </Section>

      {/* Franchise */}
      <Section tone="white">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-brand-blush">
            <img
              src={encodeURI('/Data/gallery/brand outlet.png')}
              alt="Hair 2 Hair Studio franchise enquiry"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem]">Open a Hair 2 Hair Studio</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-stone">
              Interested in exploring a Hair 2 Hair Studio franchise? Contact our team to request current
              information about eligibility, location requirements, setup costs and operating arrangements.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Ask about franchising
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Locations + enquiry */}
      <Section tone="blush" id="enquire">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[2rem] leading-[1.1] text-brand-ink sm:text-[2.6rem] lg:text-5xl">Visit the studio</h2>
            <p className="mt-4 text-lg text-brand-stone">
              Private consultation rooms in Hyderabad and Khammam, with clients coming in from Kothagudem and across
              Telangana.
            </p>
            <div className="mt-8 space-y-6">
              {BRANCHES.map((b) => (
                <div key={b.name} className="border-t border-brand-primary/20 pt-5">
                  <h3 className="text-2xl text-brand-ink">{b.name}</h3>
                  <p className="mt-1 text-brand-stone">{b.address}</p>
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block font-semibold text-brand-primary">
                    Get directions
                  </a>
                </div>
              ))}
              <p className="border-t border-brand-primary/20 pt-5 text-brand-stone">
                Open {SITE.hours.toLowerCase()} ·{' '}
                <a href={SITE.phoneHref} className="font-semibold text-brand-ink">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h3 className="mb-5 text-2xl text-brand-ink">Prefer we call you?</h3>
            <EnquiryForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
