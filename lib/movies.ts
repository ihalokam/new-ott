import { cache } from "react";

import { sql } from "@/lib/db";
import { getCachedValue, setCachedValue } from "@/lib/redis";
import {
  categoryOptions,
  getCategoryBySlug,
  getLanguageByCode,
  getLanguageBySlug,
  type CategorySlug,
  type LanguageSlug,
} from "@/lib/site";

type MovieRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  posterUrl: string | null;
  releaseDate: Date | string | null;
  runtime: number | null;
  genres: string[] | null;
  language: string | null;
  ottPlatform: string | null;
  status: string | null;
  isAdult: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Movie = {
  id: string;
  title: string;
  slug: string;
  description: string;
  posterUrl: string | null;
  releaseDate: string | null;
  releaseYear: number | null;
  runtime: number | null;
  genres: string[];
  languageCode: string | null;
  languageLabel: string;
  languageSlug: LanguageSlug | null;
  ottPlatform: string | null;
  status: string | null;
  isAdult: boolean;
  createdAt: string;
  updatedAt: string;
};

type HomePageData = {
  trending: Movie[];
  topRated: Movie[];
  indian: Movie[];
};

const cacheTtlSeconds = 60 * 60;

function normalizeMovie(row: MovieRow): Movie {
  const language = getLanguageByCode(row.language);
  const releaseDate =
    row.releaseDate instanceof Date
      ? row.releaseDate.toISOString()
      : row.releaseDate;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description:
      row.description?.trim() ??
      "Movie details, release information, and platform availability.",
    posterUrl: row.posterUrl,
    releaseDate,
    releaseYear: releaseDate ? new Date(releaseDate).getUTCFullYear() : null,
    runtime: row.runtime,
    genres: row.genres ?? [],
    languageCode: row.language,
    languageLabel: language?.label ?? row.language?.toUpperCase() ?? "Global",
    languageSlug: language?.slug ?? null,
    ottPlatform: row.ottPlatform,
    status: row.status,
    isAdult: row.isAdult,
    createdAt:
      row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    updatedAt:
      row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
  };
}

async function remember<T>(key: string, loader: () => Promise<T>) {
  const cached = await getCachedValue<T>(key);
  if (cached) {
    return cached;
  }

  const data = await loader();
  await setCachedValue(key, data, cacheTtlSeconds);
  return data;
}

async function queryMoviesByLanguage(languageCode: string) {
  const rows = await sql<MovieRow[]>`
    select
      "id",
      "title",
      "slug",
      "description",
      "posterUrl",
      "releaseDate",
      "runtime",
      "genres",
      "language",
      "ottPlatform",
      "status",
      "isAdult",
      "createdAt",
      "updatedAt"
    from "Movie"
    where lower(coalesce("language", '')) = lower(${languageCode})
    order by "releaseDate" desc nulls last, "createdAt" desc
  `;

  return rows.map(normalizeMovie);
}

async function queryMovieByLanguageAndSlug(languageCode: string, slug: string) {
  const rows = await sql<MovieRow[]>`
    select
      "id",
      "title",
      "slug",
      "description",
      "posterUrl",
      "releaseDate",
      "runtime",
      "genres",
      "language",
      "ottPlatform",
      "status",
      "isAdult",
      "createdAt",
      "updatedAt"
    from "Movie"
    where lower(coalesce("language", '')) = lower(${languageCode})
      and "slug" = ${slug}
    limit 1
  `;

  return rows[0] ? normalizeMovie(rows[0]) : null;
}

async function queryIndianMovies() {
  const rows = await sql<MovieRow[]>`
    SELECT
      "id",
      "title",
      "slug",
      "description",
      "posterUrl",
      "releaseDate",
      "runtime",
      "genres",
      "language",
      "ottPlatform",
      "status",
      "isAdult",
      "createdAt",
      "updatedAt"
    FROM "Movie"
    WHERE LOWER("language") IN (
      'malayalam',
      'hindi',
      'tamil',
      'kannada',
      'telugu'
    )
    ORDER BY "releaseDate" DESC NULLS LAST, "createdAt" DESC
  `;

  return rows.map(normalizeMovie);
}
async function queryMoviesFromTable(
  tableName: "TrendingNow" | "TopRated" | "InTheatres"
) {
  const rows = await sql.unsafe<MovieRow[]>(
    `
      select
        "id",
        "title",
        "slug",
        "description",
        "posterUrl",
        "releaseDate",
        "runtime",
        "genres",
        "language",
        "ottPlatform",
        "status",
        "isAdult",
        "createdAt",
        "updatedAt"
      from "${tableName}"
      order by "releaseDate" desc nulls last, "createdAt" desc
    `
  );

  return rows.map(normalizeMovie);
}

async function queryMovieDetailFromTable(
  tableName: "TrendingNow" | "TopRated" | "InTheatres",
  slug: string
) {
  const rows = await sql.unsafe<MovieRow[]>(
    `
      select
        "id",
        "title",
        "slug",
        "description",
        "posterUrl",
        "releaseDate",
        "runtime",
        "genres",
        "language",
        "ottPlatform",
        "status",
        "isAdult",
        "createdAt",
        "updatedAt"
      from "${tableName}"
      where "slug" = $1
      limit 1
    `,
    [slug]
  );

  return rows[0] ? normalizeMovie(rows[0]) : null;
}

function getCategoryTable(category: Exclude<CategorySlug, "indian-movies">) {
  switch (category) {
    case "trending-now":
      return "TrendingNow";
    case "top-rated-movies":
      return "TopRated";
    case "in-theatre-movies":
      return "InTheatres";
  }
}

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  return remember("home:sections:v1", async () => {
    const [trending, topRated, indian] = await Promise.all([
      getCategoryMovies("trending-now"),
      getCategoryMovies("top-rated-movies"),
      getCategoryMovies("indian-movies"),
    ]);

    return {
      trending: trending.slice(0, 8),
      topRated: topRated.slice(0, 8),
      indian: indian.slice(0, 8),
    };
  });
});

export const getLanguageMovies = cache(async (languageSlug: LanguageSlug) => {
  const language = getLanguageBySlug(languageSlug);
  if (!language) {
    return [];
  }

  return remember(`language:${language.code}:list:v1`, () =>
    queryMoviesByLanguage(language.code)
  );
});

export const getLanguageMovieDetail = cache(
  async (languageSlug: LanguageSlug, slug: string) => {
    const language = getLanguageBySlug(languageSlug);
    if (!language) {
      return null;
    }

    return remember(`language:${language.code}:detail:${slug}:v1`, () =>
      queryMovieByLanguageAndSlug(language.code, slug)
    );
  }
);

export const getCategoryMovies = cache(async (categorySlug: CategorySlug) => {
  if (categorySlug === "indian-movies") {
    return remember("category:indian-movies:v1", queryIndianMovies);
  }

  const tableName = getCategoryTable(categorySlug);
  return remember(`category:${categorySlug}:v1`, () => queryMoviesFromTable(tableName));
});

export const getCategoryMovieDetail = cache(
  async (categorySlug: CategorySlug, slug: string) => {
    if (categorySlug === "indian-movies") {
      const movies = await getCategoryMovies("indian-movies");
      return movies.find((movie) => movie.slug === slug) ?? null;
    }

    const tableName = getCategoryTable(categorySlug);
    return remember(`category:${categorySlug}:detail:${slug}:v1`, () =>
      queryMovieDetailFromTable(tableName, slug)
    );
  }
);

export const getMovieSuggestions = cache(async (movie: Movie, limit = 4) => {
  const relatedFromLanguage =
    movie.languageSlug ? await getLanguageMovies(movie.languageSlug) : [];
  const relatedFromTrending = await getCategoryMovies("trending-now");

  const uniqueMovies = [...relatedFromLanguage, ...relatedFromTrending].filter(
    (candidate, index, all) =>
      candidate.slug !== movie.slug &&
      all.findIndex((item) => item.slug === candidate.slug) === index
  );

  return uniqueMovies.slice(0, limit);
});

export const getAllIndexablePaths = cache(async () => {
  const [movies, ...categoryLists] = await Promise.all([
    remember("movie:all:v1", async () => {
      const rows = await sql<MovieRow[]>`
        select
          "id",
          "title",
          "slug",
          "description",
          "posterUrl",
          "releaseDate",
          "runtime",
          "genres",
          "language",
          "ottPlatform",
          "status",
          "isAdult",
          "createdAt",
          "updatedAt"
        from "Movie"
      `;

      return rows.map(normalizeMovie);
    }),
    ...categoryOptions.map((category) => getCategoryMovies(category.slug)),
  ]);

  return {
    languagePages: movies
      .filter((movie) => movie.languageSlug)
      .map((movie) => `/latest-ott/${movie.languageSlug}/${movie.slug}`),
    categoryPages: categoryLists.flatMap((list, index) =>
      list.map((movie) => `/${categoryOptions[index].slug}/${movie.slug}`)
    ),
  };
});

export function getLanguagePageIntro(languageSlug: LanguageSlug) {
  const language = getLanguageBySlug(languageSlug);

  return {
    title: `${language?.label ?? "Language"} OTT Movie Releases`,
    description: `Browse ${language?.label ?? "language"} movie releases with posters, descriptions, release years, and watch-platform details.`,
  };
}

export function getCategoryPageIntro(categorySlug: CategorySlug) {
  return getCategoryBySlug(categorySlug);
}
