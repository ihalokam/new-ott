import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/movie-detail";
import { createMetadata } from "@/lib/metadata";
import { getLanguageMovieDetail, getLanguageMovies } from "@/lib/movies";
import { getLanguageBySlug, type LanguageSlug } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ language: string; slug: string }>;
}) {
  const { language, slug } = await props.params;
  const languageInfo = getLanguageBySlug(language);

  if (!languageInfo) {
    return {};
  }

  const movie = await getLanguageMovieDetail(languageInfo.slug as LanguageSlug, slug);

  if (!movie) {
    return {};
  }

  return createMetadata({
    title: `${movie.title} (${movie.releaseYear ?? "Movie"})`,
    description: movie.description,
    path: `/latest-ott/${languageInfo.slug}/${movie.slug}`,
    keywords: [
      movie.title,
      `${languageInfo.label.toLowerCase()} ott movie`,
      `${movie.title} platform`,
    ],
    image: movie.posterUrl,
  });
}

export default async function LanguageMovieDetailPage(props: {
  params: Promise<{ language: string; slug: string }>;
}) {
  const { language, slug } = await props.params;
  const languageInfo = getLanguageBySlug(language);

  if (!languageInfo) {
    notFound();
  }

  const movie = await getLanguageMovieDetail(languageInfo.slug as LanguageSlug, slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = (await getLanguageMovies(languageInfo.slug as LanguageSlug))
    .filter((candidate) => candidate.slug !== movie.slug)
    .slice(0, 4);

  return (
    <MovieDetail
      movie={movie}
      breadcrumbItems={[
        { href: `/latest-ott/${languageInfo.slug}`, label: `${languageInfo.label} Movies` },
        { href: `/latest-ott/${languageInfo.slug}/${movie.slug}`, label: movie.title },
      ]}
      pageOwnerSlug={languageInfo.slug}
      pageType="language"
      relatedMovies={relatedMovies}
    />
  );
}
