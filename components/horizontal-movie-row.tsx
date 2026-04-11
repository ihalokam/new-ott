import Link from "next/link";

import { MovieCard } from "@/components/movie-card";
import { SectionHeading } from "@/components/section-heading";
import type { Movie } from "@/lib/movies";

type HorizontalMovieRowProps = {
  title: string;
  description: string;
  movies: Movie[];
  ownerSlug: string;
  pageType: "language" | "category";
  viewAllHref: string;
};

function getDetailHref(
  pageType: "language" | "category",
  ownerSlug: string,
  slug: string
) {
  return pageType === "language"
    ? `/latest-ott/${ownerSlug}/${slug}`
    : `/${ownerSlug}/${slug}`;
}

export function HorizontalMovieRow({
  title,
  description,
  movies,
  ownerSlug,
  pageType,
  viewAllHref,
}: HorizontalMovieRowProps) {
  return (
    <section className="space-y-6">
      <SectionHeading
        title={title}
        description={description}
        href={viewAllHref}
        ctaLabel="Open collection"
      />

      <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            href={getDetailHref(pageType, ownerSlug, movie.slug)}
            priority={index < 2}
          />
        ))}

        <Link
          href={viewAllHref}
          className="flex min-w-[14rem] flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-sky-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(240,249,255,0.95))] px-6 py-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
        >
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-2xl text-white">
            →
          </span>
          <span className="text-lg font-semibold text-slate-950">See more</span>
          <span className="mt-2 text-sm leading-6 text-slate-600">
            Swipe past the first cards to jump into the full page.
          </span>
        </Link>
      </div>
    </section>
  );
}
