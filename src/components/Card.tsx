import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'rounded-2xl border border-brand-line bg-white',
        hover && 'transition-colors hover:border-brand-gold/60',
        className
      )}
    >
      {children}
    </div>
  );
}
