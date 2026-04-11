import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/movie-detail";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovieDetail, getCategoryMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("top-rated-movies", slug);

  if (!movie) {
    return {};
  }

  return createMetadata({
    title: `${movie.title} Top Rated Movie Details`,
    description: movie.description,
    path: `/top-rated-movies/${movie.slug}`,
    image: movie.posterUrl,
  });
}

export default async function TopRatedMovieDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("top-rated-movies", slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = (await getCategoryMovies("top-rated-movies"))
    .filter((candidate) => candidate.slug !== movie.slug)
    .slice(0, 4);

  return (
    <MovieDetail
      movie={movie}
      breadcrumbItems={[
        { href: "/top-rated-movies", label: "Top Rated Movies" },
        { href: `/top-rated-movies/${movie.slug}`, label: movie.title },
      ]}
      pageOwnerSlug="top-rated-movies"
      pageType="category"
      relatedMovies={relatedMovies}
    />
  );
}
