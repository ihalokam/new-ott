import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmptyState } from "@/components/empty-state";
import { MovieGrid } from "@/components/movie-grid";
import { StructuredData } from "@/components/structured-data";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovies, getCategoryPageIntro } from "@/lib/movies";
import { toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "New Indian Movies in Theatres with Film Details",
  description:
    "Explore the latest Indian movies running in theatres across Malayalam, English, Telugu, Hindi, Tamil, and Kannada. View posters, release years, and cast details for all current cinema releases.",
  path: "/in-theatre-movies",
});

export default async function InTheatreMoviesPage() {
  const category = getCategoryPageIntro("in-theatre-movies");
  const movies = await getCategoryMovies("in-theatre-movies");

  return (
    <div className="space-y-10">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category?.heading,
          description: category?.description,
          url: toAbsoluteUrl("/in-theatre-movies"),
        }}
      />

      <Breadcrumbs items={[{ href: "/in-theatre-movies", label: "In Theatre" }]} />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Theatre tracker
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {category?.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {category?.description} Use this page to move into individual movie
          detail pages and then branch into related language collections.
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
            Top rated
          </Link>
        </div>
      </section>

      {movies.length > 0 ? (
        <MovieGrid
          movies={movies}
          ownerSlug="in-theatre-movies"
          pageType="category"
        />
      ) : (
        <EmptyState
          title="No in-theatre records right now"
          description="The page is prepared, but the source theatre table is currently empty."
        />
      )}
    </div>
  );
}
