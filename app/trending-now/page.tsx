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
  title: "Trending Now Movies",
  description:
    "Browse trending now movie releases with posters, descriptions, release years, and deeper movie detail pages.",
  path: "/trending-now",
});

export default async function TrendingNowPage() {
  const category = getCategoryPageIntro("trending-now");
  const movies = await getCategoryMovies("trending-now");

  return (
    <div className="space-y-10">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category?.heading,
          description: category?.description,
          url: toAbsoluteUrl("/trending-now"),
        }}
      />

      <Breadcrumbs items={[{ href: "/trending-now", label: "Trending Now" }]} />

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
          Discovery page
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {category?.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {category?.description} Open any movie to read fuller details and
          continue exploring related language and collection pages through strong
          internal links.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/top-rated-movies"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            Top rated
          </Link>
          <Link
            href="/in-theatre-movies"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            In theatre
          </Link>
          <Link
            href="/latest-ott/english"
            className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"
          >
            English OTT
          </Link>
        </div>
      </section>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} ownerSlug="trending-now" pageType="category" />
      ) : (
        <EmptyState
          title="No trending records right now"
          description="The trending page is ready for traffic, but the source table is currently empty."
        />
      )}
    </div>
  );
}
