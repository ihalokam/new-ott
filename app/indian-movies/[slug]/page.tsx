import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/movie-detail";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovieDetail, getCategoryMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("indian-movies", slug);

  if (!movie) {
    return {};
  }

  return createMetadata({
    title: `${movie.title} Indian Movie Details`,
    description: movie.description,
    path: `/indian-movies/${movie.slug}`,
    image: movie.posterUrl,
  });
}

export default async function IndianMovieDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("indian-movies", slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = (await getCategoryMovies("indian-movies"))
    .filter((candidate) => candidate.slug !== movie.slug)
    .slice(0, 4);

  return (
    <MovieDetail
      movie={movie}
      breadcrumbItems={[
        { href: "/indian-movies", label: "Indian Movies" },
        { href: `/indian-movies/${movie.slug}`, label: movie.title },
      ]}
      pageOwnerSlug="indian-movies"
      pageType="category"
      relatedMovies={relatedMovies}
    />
  );
}
