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
    <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(222,240,255,0.82),rgba(248,251,255,0.96))] px-6 py-10 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:px-10 sm:py-14">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_58%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_62%)] lg:block" />
      <div className="relative max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          {eyebrow}
        </p>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:bg-slate-50"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
