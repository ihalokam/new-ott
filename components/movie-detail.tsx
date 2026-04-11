import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { HorizontalMovieRow } from "@/components/horizontal-movie-row";
import { StructuredData } from "@/components/structured-data";
import type { Movie } from "@/lib/movies";
import { siteConfig, toAbsoluteUrl } from "@/lib/site";

type MovieDetailProps = {
  movie: Movie;
  breadcrumbItems: Array<{ href: string; label: string }>;
  pageOwnerSlug: string;
  pageType: "language" | "category";
  relatedMovies: Movie[];
};

function getMovieUrl(pageType: "language" | "category", ownerSlug: string, slug: string) {
  return pageType === "language"
    ? `/latest-ott/${ownerSlug}/${slug}`
    : `/${ownerSlug}/${slug}`;
}

export function MovieDetail({
  movie,
  breadcrumbItems,
  pageOwnerSlug,
  pageType,
  relatedMovies,
}: MovieDetailProps) {
  const detailPath = getMovieUrl(pageType, pageOwnerSlug, movie.slug);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Movie",
          name: movie.title,
          description: movie.description,
          image: movie.posterUrl ? [movie.posterUrl] : undefined,
          datePublished: movie.releaseDate ?? undefined,
          inLanguage: movie.languageCode ?? undefined,
          genre: movie.genres,
          url: toAbsoluteUrl(detailPath),
          productionCompany: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,#dbeafe,#eff6ff)] shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              Poster unavailable
            </div>
          )}
        </div>

        <article className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-sky-700">
            <span className="rounded-full bg-sky-50 px-3 py-1">
              {movie.languageLabel}
            </span>
            {movie.releaseYear ? (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {movie.releaseYear}
              </span>
            ) : null}
            {movie.ottPlatform ? (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {movie.ottPlatform}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {movie.title}
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600">
            {movie.description}
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Release year
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900">
                {movie.releaseYear ?? "TBA"}
              </dd>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Platform
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900">
                {movie.ottPlatform ?? "Waiting for update"}
              </dd>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Runtime
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900">
                {movie.runtime ? `${movie.runtime} min` : "Unknown"}
              </dd>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Genres
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900">
                {movie.genres.length > 0 ? movie.genres.join(", ") : "Not tagged"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={pageType === "language" ? `/latest-ott/${pageOwnerSlug}` : `/${pageOwnerSlug}`}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              More from this page
            </Link>
            {movie.languageSlug ? (
              <Link
                href={`/latest-ott/${movie.languageSlug}`}
                className="rounded-full bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-800"
              >
                Explore {movie.languageLabel} releases
              </Link>
            ) : null}
          </div>
        </article>
      </section>

      {relatedMovies.length > 0 ? (
        <div className="mt-16">
          <HorizontalMovieRow
            title="Related Movies"
            description="Keep moving through closely related titles and strengthen your discovery trail."
            movies={relatedMovies}
            ownerSlug={pageOwnerSlug}
            pageType={pageType}
            viewAllHref={pageType === "language" ? `/latest-ott/${pageOwnerSlug}` : `/${pageOwnerSlug}`}
          />
        </div>
      ) : null}
    </>
  );
}
