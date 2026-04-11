import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { languageOptions } from "@/lib/site";

export const metadata = createMetadata({
  title: "Latest OTT Language Pages",
  description:
    "Browse the main Latest OTT language hub for English, Malayalam, Hindi, Tamil, Kannada, and Telugu movie pages.",
  path: "/latest-ott",
});

export default function LatestOttHubPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ href: "/latest-ott", label: "Latest OTT" }]} />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Language hub
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          Latest OTT movies by language
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Start with a language landing page, then move into movie cards and full
          detail pages. This hub strengthens internal linking across all language
          sections and makes discovery simple for both readers and search engines.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {languageOptions.map((language) => (
          <Link
            key={language.slug}
            href={`/latest-ott/${language.slug}`}
            className="rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
              {language.label}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {language.label} movie page
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Browse posters, descriptions, release years, and watch platform
              details for {language.label.toLowerCase()} titles.
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
