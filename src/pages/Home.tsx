import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
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
    image: '/Data/Golden_Silk_hair_patch.jpg',
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
  { title: "Men's hair systems", description: 'Compare base types and coverage options for your consultation.', image: '/Data/IMG-20251003-WA0076.jpg', link: '/men' },
  { title: "Women's toppers & patches", description: 'Explore options for parting and crown coverage.', image: '/Data/Golden_Silk_hair_patch.jpg', link: '/women#patches' },
  { title: 'Wigs', description: 'Discuss full-coverage styles, fit and care.', image: '/Data/Golden_hair_patch.jpg', link: '/women#wigs' },
  { title: 'Extensions & volume', description: 'Explore length and volume options with the team.', image: '/Data/Australian_mirage.jpg', link: '/women#extensions' },
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

const benefits = [
  'Non-surgical options',
  'Coverage matched to your needs',
  'Choice of base and attachment methods',
  'Personal styling guidance',
  'Aftercare explained before you decide',
];

const whyChooseUs = [
  { title: 'Guided consultations', description: 'Compare suitable systems and fitting methods before deciding.' },
  { title: 'Personalised matching', description: 'Discuss colour, density, coverage and your everyday routine.' },
  { title: 'Private studio visits', description: 'Talk through your requirements in a private consultation setting.' },
  { title: 'Aftercare guidance', description: 'Understand cleaning, servicing and maintenance for your chosen system.' },
  { title: 'Clear service information', description: 'Ask what is included, what it costs and what follow-up may be needed.' },
  { title: 'Two listed studios', description: 'Find current studio information for Dilsukhnagar and Khammam.' },
];

const transformations = [
  { image: '/Data/home_page1.png', caption: 'Hair 2 Hair product showcase' },
  { image: '/Data/home_page3.jpg', caption: 'Hair system and patch options' },
  { image: '/Data/main_img1.jpeg', caption: 'Studio hair solutions showcase' },
];

const teamProfiles = [
  { name: 'Jampala Sathish', role: 'Founder & Master Hair Specialist', focus: 'Hair bonding and systems', image: '/Data/Sathish.jpg' },
  { name: 'Jampala Anil', role: 'Hair Replacement Specialist', focus: "Men's hair systems", image: '/Data/anil.jpg' },
  { name: 'Jampala Navya', role: 'Consultation Expert', focus: 'Customer consultation', image: '/Data/Navya.jpg' },
  { name: 'Jampala Rishi Krishna', role: 'Chief Technical Officer', focus: 'Technical works and marketing', image: '/Data/Rishi.png' },
];

const faqs = [
  {
    q: 'Will people be able to tell?',
    a: 'Not when it is matched and fitted properly. We match the hair colour, density, texture and hairline to your own, then cut it into your existing hair so there is no visible edge.',
  },
  {
    q: 'Can I shower, sleep, swim and exercise with it?',
    a: 'Wear and water guidance depends on the system base, attachment method and your routine. Ask the team about the precautions for the exact system you choose; not every system is suitable for every activity.',
  },
  {
    q: 'Is it surgery? Does it hurt?',
    a: 'A non-surgical hair system is different from a hair transplant. Fitting may use bonding, tape, weaving or clips. Tell the team about any scalp sensitivity so the suitable method can be discussed.',
  },
  {
    q: 'How often do I need to come back?',
    a: 'Service intervals depend on the base, attachment method, wear and care routine. Ask for the recommended cleaning and re-fitting schedule for the specific system selected.',
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
        body="Someone from the studio will call or WhatsApp you to discuss your enquiry."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-brand-line bg-white p-4 text-brand-ink shadow-xl sm:grid-cols-2 sm:p-5">
      <Honeypot />
      <div className="sm:col-span-2">
        <label htmlFor="h-concern" className="field-label">What would you like help with?</label>
        <select id="h-concern" name="concern" required defaultValue="" className="field">
          <option value="" disabled>Select a service</option>
          <option value="Men's Hair System Consultation">Men's hair system</option>
          <option value="Women's Hair Patch Consultation">Women's hair patch or topper</option>
          <option value="Wig Consultation">Wig consultation</option>
          <option value="Hair Extension Fitting">Hair extensions</option>
          <option value="Maintenance/Follow-up">Maintenance or follow-up</option>
          <option value="Wholesale Enquiry">Wholesale enquiry</option>
          <option value="Not sure">I'm not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="h-name" className="field-label">Your name</label>
        <input id="h-name" name="name" required autoComplete="name" className="field" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="h-phone" className="field-label">Phone or WhatsApp</label>
        <input id="h-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" placeholder="Mobile number" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="h-location" className="field-label">Preferred studio / area</label>
        <select id="h-location" name="preferred_location" defaultValue="" className="field">
          <option value="">Choose an area (optional)</option>
          <option value="Dilsukhnagar, Hyderabad">Dilsukhnagar, Hyderabad</option>
          <option value="Khammam">Khammam</option>
          <option value="Kukatpally / another area">Kukatpally / another area</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <FormError status={status} />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-brand-stone">We'll use these details only to respond to your enquiry.</p>
        <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? 'Sending…' : 'Request a callback'}
        </Button>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-[4.5rem] flex min-h-[640px] items-center overflow-hidden bg-brand-deep pt-[4.5rem] text-white sm:min-h-[min(92vh,880px)]">
        <HeroBackdrop />
        <Container className="relative grid items-center gap-10 pb-12 pt-20 sm:pb-16 lg:grid-cols-12">
          <div className="max-w-2xl lg:col-span-7">
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
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:mt-16">
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
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/95 p-4 text-brand-ink shadow-2xl backdrop-blur sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Start with a conversation</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-brand-ink">Let's find the right option for you.</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-stone">Tell us what you are looking for. The H2H team will get in touch to discuss the next step.</p>
              <div className="mt-5">
                <EnquiryForm />
              </div>
              <p className="mt-3 text-center text-xs text-brand-stone">Prefer to chat? <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary underline underline-offset-4">Message H2H on WhatsApp</a>.</p>
            </div>
          </div>
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
            title="Explore the solution that fits your needs"
            intro="Start with a service area below. At consultation, the team can explain suitability, fitting choices and care for your requirements."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {problems.map((p) => (
              <Link key={p.title} to={p.link} className="group block">
                <div className="overflow-hidden rounded-2xl bg-brand-blush">
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl text-brand-ink sm:text-2xl">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-stone">{p.description}</p>
                  </div>
                  <span className="mt-1 text-brand-primary" aria-hidden="true">→</span>
                </div>
              </Link>
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

      {/* Team */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              title="Meet the people behind H2H"
              intro="Get to know the team you'll speak with when comparing hair systems, fittings and aftercare."
              className="mb-0"
            />
            <Link to="/about" className="link-underline shrink-0 font-semibold text-brand-primary">Meet the full team</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {teamProfiles.map((member) => (
              <article key={member.name} className="group">
                <div className="overflow-hidden rounded-2xl bg-brand-blush">
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-4 font-display text-lg leading-tight text-brand-ink sm:text-xl">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-primary">{member.role}</p>
                <p className="mt-1 text-sm text-brand-stone">{member.focus}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Service comparison */}
      <Section tone="blush">
        <Container>
          <SectionHeading
            title="Compare your starting options"
            intro="This guide helps you choose a page to explore. Your final system, fitting method and maintenance plan should be discussed with the H2H team."
          />
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <caption className="sr-only">Compare H2H hair solution categories and next steps</caption>
              <thead>
                <tr className="border-b border-brand-primary/30 text-xs uppercase tracking-wide text-brand-stone">
                  <th scope="col" className="py-4 pr-5 font-semibold">Your priority</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Options to explore</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Next step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/15 text-sm sm:text-base">
                <tr>
                  <th scope="row" className="py-4 pr-5 font-semibold text-brand-ink">Hairline or crown coverage</th>
                  <td className="px-5 py-4 text-brand-stone">Men's skin, lace, mono and hybrid hair systems</td>
                  <td className="px-5 py-4"><Link to="/men" className="font-semibold text-brand-primary underline underline-offset-4">Explore men's systems</Link></td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-5 font-semibold text-brand-ink">Parting or targeted coverage</th>
                  <td className="px-5 py-4 text-brand-stone">Women's patches and toppers</td>
                  <td className="px-5 py-4"><Link to="/women#patches" className="font-semibold text-brand-primary underline underline-offset-4">Explore toppers</Link></td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-5 font-semibold text-brand-ink">Full-coverage styling</th>
                  <td className="px-5 py-4 text-brand-stone">Wigs and wig fitting enquiries</td>
                  <td className="px-5 py-4"><Link to="/women#wigs" className="font-semibold text-brand-primary underline underline-offset-4">Explore wigs</Link></td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-5 font-semibold text-brand-ink">Length or added volume</th>
                  <td className="px-5 py-4 text-brand-stone">Hair extension options</td>
                  <td className="px-5 py-4"><Link to="/women#extensions" className="font-semibold text-brand-primary underline underline-offset-4">Explore extensions</Link></td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-5 font-semibold text-brand-ink">Fitting and attachment</th>
                  <td className="px-5 py-4 text-brand-stone">Bonding, weaving and clip-in methods</td>
                  <td className="px-5 py-4"><Link to="/services" className="font-semibold text-brand-primary underline underline-offset-4">Compare services</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/booking">Book a private consultation</Button>
            <Button href={whatsappUrl('Hi H2H, I would like help choosing a hair solution.')} variant="outline">Discuss on WhatsApp</Button>
          </div>
        </Container>
      </Section>

      {/* Transformations */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading title="Inside the H2H studio" intro="A closer look at selected H2H hair solutions and product visuals. Explore the full gallery for more photos and videos." className="mb-0 sm:mb-0" />
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
                  <p className="mt-1 text-sm text-brand-stone">{b.hours}</p>
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block font-semibold text-brand-primary">
                    Get directions
                  </a>
                </div>
              ))}
              <div className="border-t border-brand-primary/20 pt-5">
                <h3 className="text-xl text-brand-ink">Kukatpally enquiries</h3>
                <p className="mt-1 text-brand-stone">
                  Kukatpally is a planned expansion area, not a current H2H studio. Our listed physical studios are in Dilsukhnagar and Khammam.
                </p>
                <a href="/areas/kukatpally/" className="link-underline mt-2 inline-block font-semibold text-brand-primary">
                  Read Kukatpally area information
                </a>
              </div>
              <p className="border-t border-brand-primary/20 pt-5 text-brand-stone">
                Contact the studio to confirm service and appointment availability ·{' '}
                  <a href={SITE.phoneHref} className="font-semibold text-brand-ink">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-brand-primary/15 bg-white p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Your next step</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink sm:text-4xl">A good consultation starts with the right questions.</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-brand-stone">Bring your questions about coverage, base material, attachment, styling, servicing and cost. The team can explain available options before you decide.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/booking">Choose a consultation time</Button>
                <Button href={whatsappUrl('Hi H2H, I would like to discuss a hair solution and visit your studio.')} variant="outline">Ask on WhatsApp</Button>
              </div>
              <a href={SITE.phoneHref} className="mt-5 inline-block font-semibold text-brand-primary">{SITE.phoneDisplay}</a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
