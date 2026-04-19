import Image from "next/image";
import Link from "next/link";

import type { Movie } from "@/lib/movies";

type MovieCardProps = {
  movie: Movie;
  href: string;
  priority?: boolean;
};

export function MovieCard({ movie, href, priority = false }: MovieCardProps) {
  return (
    <Link
      href={href}
      className="neo-surface group flex min-w-[16rem] max-w-[18.5rem] flex-col overflow-hidden rounded-[1.7rem] transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,var(--surface-strong),var(--surface-elevated))]">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 18rem"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="theme-text-muted flex h-full items-center justify-center px-6 text-center text-sm font-semibold">
            Poster coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="theme-accent flex flex-wrap gap-2 text-[0.78rem] font-semibold">
          {movie.languageLabel ? (
            <span className="neo-chip rounded-full px-3 py-1">{movie.languageLabel}</span>
          ) : null}
          {movie.releaseYear ? (
            <span className="neo-chip rounded-full px-3 py-1">{movie.releaseYear}</span>
          ) : null}
        </div>
        <div className="space-y-2">
          <h3 className="theme-text line-clamp-2 text-[1.15rem] font-semibold tracking-[-0.02em]">
            {movie.title}
          </h3>
          <p className="theme-text-muted line-clamp-3 text-[0.95rem] leading-6">
            {movie.description}
          </p>
        </div>
        <div className="theme-text-muted mt-auto flex flex-wrap gap-2 text-[0.78rem]">
          {movie.ottPlatform ? (
            <span className="neo-chip rounded-full px-3 py-1">
              Watch on {movie.ottPlatform}
            </span>
          ) : (
            <span className="neo-chip rounded-full px-3 py-1">
              Platform update soon
            </span>
          )}
          {movie.runtime ? (
            <span className="neo-chip rounded-full px-3 py-1">
              {movie.runtime} min
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
