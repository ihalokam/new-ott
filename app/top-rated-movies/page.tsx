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
  title: "Top Rated Movies",
  description:
    "Explore top-rated movies with clean movie cards, watch-platform details, and deeper internal links.",
  path: "/top-rated-movies",
});

export default async function TopRatedMoviesPage() {
  const category = getCategoryPageIntro("top-rated-movies");
  const movies = await getCategoryMovies("top-rated-movies");

  return (
    <div className="space-y-10">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category?.heading,
          description: category?.description,
          url: toAbsoluteUrl("/top-rated-movies"),
        }}
      />

      <Breadcrumbs items={[{ href: "/top-rated-movies", label: "Top Rated" }]} />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Editorial collection
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {category?.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {category?.description} Each card leads into a dedicated detail page so
          users and search engines can move deeper into the site structure.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/trending-now"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            Trending now
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
          ownerSlug="top-rated-movies"
          pageType="category"
        />
      ) : (
        <EmptyState
          title="No top-rated records right now"
          description="The page is live and optimized, but there are no current rows in the top-rated table."
        />
      )}
    </div>
  );
}
