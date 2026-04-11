export const siteConfig = {
  name: "Latest OTT",
  shortName: "LatestOTT",
  description:
    "Discover trending, top-rated, in-theatre, and language-specific OTT movie releases with SEO-friendly movie detail pages.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tmdbAttribution:
    "This product uses the TMDB API but is not endorsed or certified by TMDB.",
} as const;

export const languageOptions = [
  { slug: "english", label: "English", code: "en" },
  { slug: "malayalam", label: "Malayalam", code: "malayalam" },
  { slug: "hindi", label: "Hindi", code: "hindi" },
  { slug: "tamil", label: "Tamil", code: "tamil" },
  { slug: "kannada", label: "Kannada", code: "kannada" },
  { slug: "telugu", label: "Telugu", code: "telugu" },
] as const;

export const indianLanguageCodes = languageOptions
  .filter((language) => language.code !== "en")
  .map((language) => language.code);

export const categoryOptions = [
  {
    slug: "trending-now",
    label: "Trending Now",
    heading: "Trending OTT Movies Right Now",
    description:
      "Explore the latest movies audiences are searching for and sharing right now.",
  },
  {
    slug: "top-rated-movies",
    label: "Top Rated",
    heading: "Top Rated Movies To Watch",
    description:
      "Browse standout movies with strong word of mouth, evergreen appeal, and must-watch recommendations.",
  },
  {
    slug: "in-theatre-movies",
    label: "In Theatre",
    heading: "Movies In Theatres",
    description:
      "See theatrical releases with quick details, release timing, and watch-platform context.",
  },
  {
    slug: "indian-movies",
    label: "Indian Movies",
    heading: "Indian OTT Movies",
    description:
      "Find Indian-language OTT movies across Malayalam, Hindi, Tamil, Kannada, and Telugu.",
  },
] as const;

export const primaryNavLinks = [
  { href: "/trending-now", label: "Trending" },
  ...languageOptions.map((language) => ({
    href: `/latest-ott/${language.slug}`,
    label: language.label,
  })),
];

export type LanguageSlug = (typeof languageOptions)[number]["slug"];
export type CategorySlug = (typeof categoryOptions)[number]["slug"];

export function getLanguageBySlug(slug: string) {
  return languageOptions.find((language) => language.slug === slug);
}

export function getLanguageByCode(code: string | null | undefined) {
  if (!code) return null;
  return languageOptions.find(
    (language) => language.code.toLowerCase() === code.toLowerCase()
  );
}

export function getCategoryBySlug(slug: string) {
  return categoryOptions.find((category) => category.slug === slug);
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}
