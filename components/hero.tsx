import Link from "next/link";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: HeroProps) {
  return (
    <section className="neo-surface relative overflow-hidden rounded-[2.2rem] px-7 py-10 sm:px-10 sm:py-14">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_58%),radial-gradient(circle_at_bottom,color-mix(in_srgb,var(--surface-elevated)_84%,transparent),transparent_62%)] lg:block" />
      <div className="relative max-w-3xl space-y-7">
        <p className="theme-accent text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm">
          {eyebrow}
        </p>
        <div className="space-y-5">
          <h1 className="theme-text max-w-3xl text-[2.35rem] font-semibold tracking-[-0.04em] sm:text-[3.4rem] sm:leading-[1.02]">
            {title}
          </h1>
          <p className="theme-text-muted max-w-2xl text-[1.02rem] leading-8 sm:text-[1.1rem]">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="neo-button-primary rounded-full px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="neo-button rounded-full px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
