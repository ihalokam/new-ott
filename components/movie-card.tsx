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
      className="group flex min-w-[16rem] max-w-[18rem] flex-col overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,#dbeafe,#eff6ff)]">
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
          <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-slate-500">
            Poster coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-sky-700">
          {movie.languageLabel ? (
            <span className="rounded-full bg-sky-50 px-3 py-1">{movie.languageLabel}</span>
          ) : null}
          {movie.releaseYear ? (
            <span className="rounded-full bg-slate-100 px-3 py-1">{movie.releaseYear}</span>
          ) : null}
        </div>
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">
            {movie.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {movie.description}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 text-xs text-slate-500">
          {movie.ottPlatform ? (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Watch on {movie.ottPlatform}
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Platform update soon
            </span>
          )}
          {movie.runtime ? (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {movie.runtime} min
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
