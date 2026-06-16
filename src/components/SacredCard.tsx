import { ReactNode } from 'react';

type SacredCardProps = {
  children: ReactNode;
  className?: string;
};

type SacredImageCardProps = SacredCardProps & {
  imageSrc?: string;
  imageAlt?: string;
};

export function SacredCard({ children, className = '' }: SacredCardProps) {
  return (
    <div
      className={`rounded-2xl border border-parchment-200 bg-white/90 p-5 shadow-[0_12px_32px_rgba(74,55,40,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SacredImageCard({
  children,
  className = '',
  imageSrc,
  imageAlt = '',
}: SacredImageCardProps) {
  return (
    <SacredCard className={`overflow-hidden p-0 ${className}`}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-28 w-full object-cover"
        />
      )}
      <div className="p-5">{children}</div>
    </SacredCard>
  );
}

export function SacredProgress({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent: number;
}) {
  return (
    <div className="rounded-2xl border border-parchment-200 bg-white/80 p-4 shadow-[0_10px_28px_rgba(74,55,40,0.07)]">
      <div className="flex justify-between text-sm text-stone-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-parchment-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
