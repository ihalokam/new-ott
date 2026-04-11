import type { Metadata } from "next";

import { siteConfig, toAbsoluteUrl } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string | null;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
}: SeoInput): Metadata {
  const canonical = toAbsoluteUrl(path);
  const imageUrl = image ? image : toAbsoluteUrl("/logo-mark.svg");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
