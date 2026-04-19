import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Disclaimer",
  description:
    "Read the disclaimer for Latest OTT covering content accuracy, external sources, and informational use.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <section className="neo-surface mx-auto max-w-4xl rounded-[2rem] p-8 sm:p-10">
      <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
        Disclaimer
      </p>
      <h1 className="theme-text mt-4 text-4xl font-semibold">
        Important information about using {siteConfig.name}
      </h1>

      <div className="theme-text-muted mt-8 space-y-6 text-base leading-8">
        <p>
          {siteConfig.name} is an informational platform for OTT and movie
          discovery. We aim to keep titles, release details, posters, and related
          content accurate, but we cannot guarantee that all information will
          always be complete or current.
        </p>
        <p>
          Movie release dates, platform availability, artwork, and metadata may
          change without prior notice. Please verify final information on the
          official OTT service or rights holder platform.
        </p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB. We do not host movies or provide downloads.
        </p>
      </div>
    </section>
  );
}
