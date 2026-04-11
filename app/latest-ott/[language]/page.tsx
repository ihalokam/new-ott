import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmptyState } from "@/components/empty-state";
import { MovieGrid } from "@/components/movie-grid";
import { StructuredData } from "@/components/structured-data";
import { createMetadata } from "@/lib/metadata";
import { getLanguagePageIntro, getLanguageMovies } from "@/lib/movies";
import { getLanguageBySlug, languageOptions, toAbsoluteUrl, type LanguageSlug } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return languageOptions.map((language) => ({
    language: language.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await props.params;
  const languageInfo = getLanguageBySlug(language);

  if (!languageInfo) {
    return {};
  }

  return createMetadata({
    title: `${languageInfo.label} OTT Movies`,
    description: `Browse ${languageInfo.label} OTT movie details with posters, descriptions, release years, and watch platform information.`,
    path: `/latest-ott/${languageInfo.slug}`,
    keywords: [
      `${languageInfo.label.toLowerCase()} ott movies`,
      `${languageInfo.label.toLowerCase()} movie details`,
      `${languageInfo.label.toLowerCase()} ott releases`,
    ],
  });
}

export default async function LanguagePage(props: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await props.params;
  const languageInfo = getLanguageBySlug(language);

  if (!languageInfo) {
    notFound();
  }

  const intro = getLanguagePageIntro(languageInfo.slug as LanguageSlug);
  const movies = await getLanguageMovies(languageInfo.slug as LanguageSlug);

  return (
    <div className="space-y-10">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: intro.title,
          description: intro.description,
          url: toAbsoluteUrl(`/latest-ott/${languageInfo.slug}`),
        }}
      />

      <Breadcrumbs
        items={[
          { href: "/latest-ott", label: "Latest OTT" },
          { href: `/latest-ott/${languageInfo.slug}`, label: languageInfo.label },
        ]}
      />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Latest OTT / {languageInfo.label}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {intro.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {intro.description} Move into each movie card for a dedicated detail page,
          then continue your journey through trending, top-rated, and Indian movie
          sections using the internal links across the site.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/trending-now"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            Trending now
          </Link>
          <Link
            href="/top-rated-movies"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            Top rated movies
          </Link>
          <Link
            href="/indian-movies"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            Indian movies
          </Link>
        </div>
      </section>

      {movies.length > 0 ? (
        <MovieGrid
          movies={movies}
          ownerSlug={languageInfo.slug}
          pageType="language"
        />
      ) : (
        <EmptyState
          title={`No ${languageInfo.label} movies yet`}
          description={`The ${languageInfo.label} page is ready, but Neon does not currently contain matching rows for this language.`}
        />
      )}
    </div>
  );
}
