import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { Container, FormError } from '../components/ui';
import { SITE, whatsappUrl } from '../lib/site';
import { useWeb3Form } from '../lib/useWeb3Form';

const services = [
  { value: "Women's Hair Patch Consultation", hint: 'Toppers and patches for thinning areas' },
  { value: "Women's Wig Fitting", hint: 'Full wigs, fitted and styled' },
  { value: "Men's Hair System Consultation", hint: 'Hairline, crown or full coverage' },
  { value: 'Hair Extension Fitting', hint: 'Length and volume' },
  { value: 'Maintenance/Follow-up', hint: 'Cleaning, re-fixing and repairs' },
  { value: 'Wholesale Business Meeting', hint: 'For salons, retailers and distributors' },
];

const timeGroups = [
  { label: 'Morning', slots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'] },
  { label: 'Afternoon', slots: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'] },
  { label: 'Evening', slots: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'] },
];

const contactMethods = ['WhatsApp', 'Phone', 'Email'];

const empty = {
  service: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  previousCustomer: '',
  concerns: '',
  communication: 'WhatsApp',
  hearAbout: '',
};

function formatDate(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
        selected
          ? 'border-brand-primary bg-brand-primary text-white'
          : 'border-brand-line bg-white text-brand-ink hover:border-brand-primary'
      }`}
    >
      {children}
    </button>
  );
}

export default function Booking() {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState(empty);
  const [stepError, setStepError] = useState('');
  const { status, submit } = useWeb3Form('New Appointment Booking - Hair 2 Hair Studio');
  const set = (patch: Partial<typeof empty>) => setData((d) => ({ ...d, ...patch }));
  const today = new Date().toISOString().split('T')[0];

  function next() {
    if (!data.service || !data.date || !data.time) {
      setStepError('Choose a service, a date and a time to continue.');
      return;
    }
    setStepError('');
    setStep(2);
    window.scrollTo({ top: 0 });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return next();
    const honeypot = (e.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked;
    await submit({ ...data, date: formatDate(data.date), botcheck: honeypot ? 'on' : '' });
  }

  if (status === 'sent') {
    return (
      <Container className="max-w-2xl py-16 sm:py-24">
        <div role="status" className="text-center">
          <CheckCircle2 className="mx-auto text-brand-primary" size={48} strokeWidth={1.5} aria-hidden="true" />
          <h1 className="mt-6 text-4xl text-brand-ink sm:text-5xl">Request received</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-brand-stone">
            Thanks, {data.name.split(' ')[0]}. We'll confirm your appointment by {data.communication.toLowerCase()}.
          </p>
        </div>
        <dl className="mt-10 divide-y divide-brand-line rounded-2xl border border-brand-line bg-white px-6">
          <div className="flex justify-between gap-4 py-4">
            <dt className="text-brand-stone">Service</dt>
            <dd className="text-right font-medium text-brand-ink">{data.service}</dd>
          </div>
          <div className="flex justify-between gap-4 py-4">
            <dt className="text-brand-stone">When</dt>
            <dd className="text-right font-medium text-brand-ink">
              {formatDate(data.date)}, {data.time}
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-center text-brand-stone">
          Need to change something?{' '}
          <a href={whatsappUrl(`Hi! I just booked ${data.service} on ${formatDate(data.date)} at ${data.time}.`)} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-brand-primary">
            Message us on WhatsApp
          </a>{' '}
          or call{' '}
          <a href={SITE.phoneHref} className="font-semibold text-brand-ink">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="text-sm text-brand-stone">
            Step {step} of 2 · {step === 1 ? 'Your visit' : 'Your details'}
          </p>
          <div className="mt-3 flex gap-2" aria-hidden="true">
            <span className="h-1 flex-1 rounded-full bg-brand-primary" />
            <span className={`h-1 flex-1 rounded-full ${step === 2 ? 'bg-brand-primary' : 'bg-brand-line'}`} />
          </div>
          <h1 className="mt-8 text-[2.5rem] leading-[1.05] text-brand-ink sm:text-6xl">
            {step === 1 ? 'Book a free consultation' : 'How can we reach you?'}
          </h1>
          <p className="mt-4 max-w-prose text-lg text-brand-stone">
            {step === 1
              ? 'Pick what you need and a time that suits you. It takes about a minute.'
              : "We'll use these details to confirm your appointment. Nothing else."}
          </p>

          <form onSubmit={onSubmit} className="mt-10" noValidate={step === 1}>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {step === 1 && (
              <div className="space-y-10">
                <fieldset>
                  <legend className="mb-4 font-display text-2xl text-brand-ink">What would you like help with?</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((s) => {
                      const selected = data.service === s.value;
                      return (
                        <label
                          key={s.value}
                          className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                            selected ? 'border-brand-primary bg-brand-blush' : 'border-brand-line bg-white hover:border-brand-primary/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s.value}
                            checked={selected}
                            onChange={() => set({ service: s.value })}
                            className="mt-1 accent-brand-primary"
                          />
                          <span>
                            <span className="block font-semibold text-brand-ink">{s.value}</span>
                            <span className="text-sm text-brand-stone">{s.hint}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="b-date" className="mb-4 block font-display text-2xl text-brand-ink">
                    Which day?
                  </label>
                  <input
                    id="b-date"
                    type="date"
                    min={today}
                    value={data.date}
                    onChange={(e) => set({ date: e.target.value })}
                    className="field max-w-xs"
                  />
                </div>

                <fieldset>
                  <legend className="mb-4 font-display text-2xl text-brand-ink">What time?</legend>
                  <div className="space-y-5">
                    {timeGroups.map((g) => (
                      <div key={g.label}>
                        <p className="mb-2 text-sm text-brand-stone">{g.label}</p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                          {g.slots.map((t) => (
                            <Chip key={t} selected={data.time === t} onClick={() => set({ time: t })}>
                              {t}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {stepError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                    {stepError}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="b-name" className="field-label">Full name</label>
                    <input id="b-name" required autoComplete="name" className="field" value={data.name} onChange={(e) => set({ name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="b-phone" className="field-label">Phone or WhatsApp</label>
                    <input
                      id="b-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      className="field"
                      value={data.phone}
                      onChange={(e) => set({ phone: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="b-email" className="field-label">
                      Email <span className="font-normal text-brand-stone">(optional)</span>
                    </label>
                    <input
                      id="b-email"
                      type="email"
                      autoComplete="email"
                      required={data.communication === 'Email'}
                      className="field"
                      value={data.email}
                      onChange={(e) => set({ email: e.target.value })}
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="field-label">How should we confirm?</legend>
                  <div className="flex flex-wrap gap-2">
                    {contactMethods.map((m) => (
                      <Chip key={m} selected={data.communication === m} onClick={() => set({ communication: m })}>
                        {m}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="field-label">
                    Have you visited us before? <span className="font-normal text-brand-stone">(optional)</span>
                  </legend>
                  <div className="flex gap-2">
                    {['Yes', 'No'].map((v) => (
                      <Chip key={v} selected={data.previousCustomer === v} onClick={() => set({ previousCustomer: data.previousCustomer === v ? '' : v })}>
                        {v}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="b-concerns" className="field-label">
                    Anything we should know? <span className="font-normal text-brand-stone">(optional)</span>
                  </label>
                  <textarea
                    id="b-concerns"
                    rows={3}
                    className="field"
                    placeholder="For example: thinning at the crown for two years, prefer something I can swim in"
                    value={data.concerns}
                    onChange={(e) => set({ concerns: e.target.value })}
                  />
                </div>

                <div className="max-w-xs">
                  <label htmlFor="b-hear" className="field-label">
                    How did you hear about us? <span className="font-normal text-brand-stone">(optional)</span>
                  </label>
                  <select id="b-hear" className="field" value={data.hearAbout} onChange={(e) => set({ hearAbout: e.target.value })}>
                    <option value="">Choose one</option>
                    <option value="Google Search">Google search</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Friend/Family">Friend or family</option>
                    <option value="Walk-in">Walked past the studio</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <FormError status={status} />

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 font-semibold text-brand-stone hover:text-brand-ink"
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                    Back
                  </button>
                  <Button type="submit" size="lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Request appointment'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-brand-line bg-white p-6 lg:sticky lg:top-28">
            <h2 className="text-2xl text-brand-ink">Your visit</h2>
            <dl className="mt-4 divide-y divide-brand-line text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-brand-stone">Service</dt>
                <dd className="text-right font-medium text-brand-ink">{data.service || 'Not chosen yet'}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-brand-stone">Day</dt>
                <dd className="text-right font-medium text-brand-ink">{formatDate(data.date) || 'Not chosen yet'}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-brand-stone">Time</dt>
                <dd className="text-right font-medium text-brand-ink">{data.time || 'Not chosen yet'}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-brand-stone">First consultation</dt>
                <dd className="text-right font-medium text-brand-ink">Free</dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-brand-line pt-4 text-sm leading-relaxed text-brand-stone">
              Please give at least 24 hours' notice if you need to cancel. You can reschedule any time by contacting us.
            </p>
            <p className="mt-4 text-sm text-brand-stone">
              Rather talk first?{' '}
              <a href={whatsappUrl('Hi! I would like to book a consultation.')} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-brand-primary">
                Book on WhatsApp
              </a>
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
