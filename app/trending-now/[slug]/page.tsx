import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/movie-detail";
import { createMetadata } from "@/lib/metadata";
import { getCategoryMovieDetail, getCategoryMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("trending-now", slug);

  if (!movie) {
    return {};
  }

  return createMetadata({
    title: `${movie.title} Trending Movie Details`,
    description: movie.description,
    path: `/trending-now/${movie.slug}`,
    image: movie.posterUrl,
  });
}

export default async function TrendingMovieDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const movie = await getCategoryMovieDetail("trending-now", slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = (await getCategoryMovies("trending-now"))
    .filter((candidate) => candidate.slug !== movie.slug)
    .slice(0, 4);

  return (
    <MovieDetail
      movie={movie}
      breadcrumbItems={[
        { href: "/trending-now", label: "Trending Now" },
        { href: `/trending-now/${movie.slug}`, label: movie.title },
      ]}
      pageOwnerSlug="trending-now"
      pageType="category"
      relatedMovies={relatedMovies}
    />
  );
}
