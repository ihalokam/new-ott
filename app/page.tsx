import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { Hero } from "@/components/hero";
import { HorizontalMovieRow } from "@/components/horizontal-movie-row";
import { StructuredData } from "@/components/structured-data";
import { createMetadata } from "@/lib/metadata";
import { getHomePageData } from "@/lib/movies";
import { categoryOptions, languageOptions, siteConfig, toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Latest OTT Movies, Trending Now, Top Rated, and Indian Releases",
  description:
    "Explore an SEO-focused OTT movie website with language pages, trending releases, top-rated collections, and theatre updates.",
  path: "/",
  keywords: [
    "latest ott movies",
    "trending now movies",
    "top rated movies",
    "indian ott movies",
    "english ott movies",
  ],
});

export default async function HomePage() {
  const { trending, topRated, indian } = await getHomePageData();

  return (
    <>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.siteUrl,
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Latest OTT movie collections",
            url: toAbsoluteUrl("/"),
          },
        ]}
      />

      <div className="space-y-16">
        <Hero
          eyebrow="What to watch on OTT?"
          title="Your confusion is over! Here you can choose a movie that choose you."
          description="Find what's released recently in Malayalam, English, Tamil, Kannada, Telugu and Hindi."
          primaryHref="/trending-now"
          primaryLabel="Explore Trending Now"
          secondaryHref="/latest-ott/english"
          secondaryLabel="Open English Movies"
        />

        <section className="grid gap-4 md:grid-cols-3">
          {categoryOptions.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="neo-surface rounded-[1.75rem] p-6 transition hover:-translate-y-1"
            >
              <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
                {category.label}
              </p>
              <h2 className="theme-text mt-4 text-2xl font-semibold">
                {category.heading}
              </h2>
              <p className="theme-text-muted mt-3 text-sm leading-7">
                {category.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
                Language pages
              </p>
              <h2 className="theme-text mt-2 text-3xl font-semibold">
                Browse movies by language
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((language) => (
              <Link
                key={language.slug}
                href={`/latest-ott/${language.slug}`}
                className="neo-button rounded-full px-5 py-3 text-sm font-semibold"
              >
                {language.label} movies
              </Link>
            ))}
          </div>
        </section>

        {trending.length > 0 ? (
          <HorizontalMovieRow
            title="Trending Now"
            description="Explore the movies that trending worldwide!"
            movies={trending}
            ownerSlug="trending-now"
            pageType="category"
            viewAllHref="/trending-now"
          />
        ) : (
          <EmptyState
            title="Trending movies are on the way"
            description="The dataset does not currently have trending records, but the page structure is ready as soon as data arrives."
          />
        )}

        {topRated.length > 0 ? (
          <HorizontalMovieRow
            title="Top Movies"
            description="Want to watch the movies that critics loves? Here are the top rated movies worldwide."
            movies={topRated}
            ownerSlug="top-rated-movies"
            pageType="category"
            viewAllHref="/top-rated-movies"
          />
        ) : null}

        {indian.length > 0 ? (
          <HorizontalMovieRow
            title="Indian Movies"
            description="Want to feel the pulse of India? Here are the Indian regional industries Malayalam, Telugu, Tamil, Hindi and Kannada."
            movies={indian}
            ownerSlug="indian-movies"
            pageType="category"
            viewAllHref="/indian-movies"
          />
        ) : (
          <EmptyState
            title="Indian movie pages are ready for new records"
            description="Malayalam, Hindi, Tamil, Kannada, and Telugu sections are live, and they will automatically populate when those rows appear in Neon."
          />
        )}
      </div>
    </>
  );
}
