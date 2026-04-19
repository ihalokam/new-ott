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
        <h2 className="theme-text text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="theme-text-muted max-w-2xl text-sm leading-7">
          {description}
        </p>
      </div>
      {href ? (
        <Link
          href={href}
          className="neo-button inline-flex rounded-full px-4 py-2 text-sm font-semibold"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
