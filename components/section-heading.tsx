import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
};

export function SectionHeading({
  title,
  description,
  href,
  ctaLabel = "View all",
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
