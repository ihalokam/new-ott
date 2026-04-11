import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/movie-detail";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovieDetail, getCategoryMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("in-theatre-movies", slug);

  if (!movie) {
    return {};
  }

  return createMetadata({
    title: `${movie.title} In-Theatre Movie Details`,
    description: movie.description,
    path: `/in-theatre-movies/${movie.slug}`,
    image: movie.posterUrl,
  });
}

export default async function InTheatreMovieDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("in-theatre-movies", slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = (await getCategoryMovies("in-theatre-movies"))
    .filter((candidate) => candidate.slug !== movie.slug)
    .slice(0, 4);

  return (
    <MovieDetail
      movie={movie}
      breadcrumbItems={[
        { href: "/in-theatre-movies", label: "In Theatre Movies" },
        { href: `/in-theatre-movies/${movie.slug}`, label: movie.title },
      ]}
      pageOwnerSlug="in-theatre-movies"
      pageType="category"
      relatedMovies={relatedMovies}
    />
  );
}
