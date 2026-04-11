import { MovieCard } from "@/components/movie-card";
import type { Movie } from "@/lib/movies";

type MovieGridProps = {
  movies: Movie[];
  ownerSlug: string;
  pageType: "language" | "category";
};

export function MovieGrid({ movies, ownerSlug, pageType }: MovieGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          href={
            pageType === "language"
              ? `/latest-ott/${ownerSlug}/${movie.slug}`
              : `/${ownerSlug}/${movie.slug}`
          }
          priority={index < 3}
        />
      ))}
    </div>
  );
}
