import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2 } from 'lucide-react';
import type { FormStatus } from '../lib/useWeb3Form';
import { whatsappUrl } from '../lib/site';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={twMerge('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>;
}

type Tone = 'plain' | 'blush' | 'dark' | 'white';

const tones: Record<Tone, string> = {
  plain: 'bg-brand-porcelain',
  white: 'bg-white',
  blush: 'bg-brand-blush',
  dark: 'bg-brand-deep text-white',
};

export function Section({
  children,
  className,
  id,
  tone = 'plain',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
}) {
  return (
    <section id={id} className={twMerge('scroll-mt-24 py-16 sm:py-24', tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  intro,
  align = 'left',
  className,
  as: Tag = 'h2',
  dark = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
  dark?: boolean;
}) {
  return (
    <div className={twMerge('mb-10 sm:mb-14', align === 'center' && 'mx-auto text-center', className)}>
      <Tag
        className={twMerge(
          'max-w-3xl text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-5xl',
          align === 'center' && 'mx-auto',
          dark ? 'text-white' : 'text-brand-ink'
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={twMerge(
            'mt-4 max-w-prose text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            dark ? 'text-white/75' : 'text-brand-stone'
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Page opener used by every inner page: text on the left, an arched photo on the right. */
export function PageHero({
  title,
  intro,
  image,
  imageAlt = '',
  imageFit = 'cover',
  children,
}: {
  title: ReactNode;
  intro: ReactNode;
  image?: string;
  imageAlt?: string;
  /** 'contain' shows the whole image (for posters with text on them) instead of cropping it into the arch. */
  imageFit?: 'cover' | 'contain';
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-brand-line bg-brand-porcelain">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <h1 className="animate-fade-up text-[2.5rem] leading-[1.04] text-brand-ink sm:text-6xl lg:text-[4.25rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-prose animate-fade-up text-lg leading-relaxed text-brand-stone [animation-delay:120ms] sm:text-xl">
            {intro}
          </p>
          {children && <div className="mt-8 animate-fade-up [animation-delay:220ms]">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            {imageFit === 'contain' ? (
              <div className="overflow-hidden rounded-2xl border border-brand-line bg-white">
                <img src={image} alt={imageAlt} className="w-full object-contain" decoding="async" />
              </div>
            ) : (
              <div className="mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-arch bg-brand-blush lg:max-w-none">
                <img src={image} alt={imageAlt} className="h-full w-full object-cover" decoding="async" />
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

/** Hidden honeypot checkbox that bots tick and people never see. */
export function Honeypot() {
  return (
    <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
  );
}

export function FormSent({ title, body, onReset }: { title: string; body: string; onReset?: () => void }) {
  return (
    <div role="status" className="rounded-2xl border border-brand-line bg-white p-8 text-center sm:p-10">
      <CheckCircle2 className="mx-auto text-brand-primary" size={40} strokeWidth={1.5} aria-hidden="true" />
      <h3 className="mt-4 text-2xl text-brand-ink sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-brand-stone">{body}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappUrl('Hi! I just sent a request on your website.')}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-semibold text-brand-primary"
        >
          Message us on WhatsApp
        </a>
        {onReset && (
          <button type="button" onClick={onReset} className="text-sm text-brand-stone underline underline-offset-4">
            Send another
          </button>
        )}
      </div>
    </div>
  );
}

export function FormError({ status }: { status: FormStatus }) {
  if (status !== 'error') return null;
  return (
    <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
      Your message didn't send. Check your connection and try again, or call us on +91 81219 99243.
    </p>
  );
}

/** Five-step rating shown as filled bars, with the number read out for screen readers. */
export function Meter({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`h-1.5 w-5 rounded-full ${i < value ? 'bg-brand-primary' : 'bg-brand-primary/15'}`} />
      ))}
    </span>
  );
}

/** Closing call to action used at the end of inner pages. */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-brand-deep text-white">
      <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] leading-[1.1] sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/75">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-pill bg-white px-7 py-3.5 font-semibold text-brand-deep transition-colors hover:bg-brand-blush"
          >
            Book a free consultation
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-pill border border-white/40 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Ask on WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
