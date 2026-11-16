import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-brand-primary text-white hover:bg-brand-accent',
  secondary: 'bg-brand-gold text-brand-deep hover:bg-brand-goldsoft',
  outline: 'border border-brand-primary/40 text-brand-primary hover:border-brand-primary hover:bg-brand-primary hover:text-white',
  light: 'bg-white text-brand-deep hover:bg-brand-blush',
  ghost: 'border border-white/40 text-white hover:border-white hover:bg-white/10',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
} as const;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = twMerge(base, variants[variant], sizes[size], className);

  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      const newTab = href.startsWith('http');
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
