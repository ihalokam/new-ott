import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
            Latest OTT
          </p>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            SEO-focused OTT movie discovery across trending, top-rated,
            theatrical, and language-specific collections with clear internal
            linking and readable detail pages.
          </p>
          <p className="text-xs leading-6 text-slate-500">
            {siteConfig.tmdbAttribution}
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-3 text-sm font-medium text-slate-700 lg:justify-end">
          <Link className="rounded-full bg-white px-4 py-2" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="rounded-full bg-white px-4 py-2" href="/contact-us">
            Contact Us
          </Link>
          <Link className="rounded-full bg-white px-4 py-2" href="/about-us">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
