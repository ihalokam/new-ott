import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmptyState } from "@/components/empty-state";
import { MovieGrid } from "@/components/movie-grid";
import { StructuredData } from "@/components/structured-data";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovies, getCategoryPageIntro } from "@/lib/movies";
import { languageOptions, toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Latest Indian OTT Movies, New Releases in Malayalam, Hindi, Tamil, Telugu, Kannada",
  description:
    "the newest Indian movies on OTT across Malayalam, English, Telugu, Hindi, Tamil, and Kannada. Explore film posters, cast details, and release years for the latest digital premieres, and where it is being premiering.",
  path: "/indian-movies",
});

export default async function IndianMoviesPage() {
  const category = getCategoryPageIntro("indian-movies");
  const movies = await getCategoryMovies("indian-movies");

  return (
    <div className="space-y-10">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category?.heading,
          description: category?.description,
          url: toAbsoluteUrl("/indian-movies"),
        }}
      />

      <Breadcrumbs
        items={[{ href: "/indian-movies", label: "Indian Movies" }]}
      />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Language hub
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {category?.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {category?.description} Use this page as a central hub, then move into
          each language-specific collection for deeper topical coverage.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {languageOptions
            .filter((language) => language.slug !== "english")
            .map((language) => (
              <Link
                key={language.slug}
                href={`/latest-ott/${language.slug}`}
                className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
              >
                {language.label}
              </Link>
            ))}
        </div>
      </section>

      {movies.length > 0 ? (
        <MovieGrid
          movies={movies}
          ownerSlug="indian-movies"
          pageType="category"
        />
      ) : (
        <EmptyState
          title="Indian language pages are live"
          description="Malayalam, Hindi, Tamil, Kannada, and Telugu landing pages exist already. The Indian movie hub will populate as soon as matching language rows appear in Neon."
        />
      )}
    </div>
  );
}
