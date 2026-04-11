import type { MetadataRoute } from "next";

import { getAllIndexablePaths } from "@/lib/movies";
import { categoryOptions, languageOptions, toAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { languagePages, categoryPages } = await getAllIndexablePaths();

  const staticPaths = [
    "/",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    ...categoryOptions.map((category) => `/${category.slug}`),
    ...languageOptions.map((language) => `/latest-ott/${language.slug}`),
  ];

  return [...staticPaths, ...languagePages, ...categoryPages].map((path) => ({
    url: toAbsoluteUrl(path),
    lastModified: new Date(),
  }));
}
