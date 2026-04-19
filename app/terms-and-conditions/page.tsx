import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Read the terms and conditions for using Latest OTT and its movie discovery pages.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <section className="neo-surface mx-auto max-w-4xl rounded-[2rem] p-8 sm:p-10">
      <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
        Terms &amp; Conditions
      </p>
      <h1 className="theme-text mt-4 text-4xl font-semibold">
        Terms for using {siteConfig.name}
      </h1>

      <div className="theme-text-muted mt-8 space-y-6 text-base leading-8">
        <p>
          By accessing and using {siteConfig.name}, you agree to use this website
          only for lawful and informational purposes.
        </p>
        <p>
          You may browse movie listings, language pages, and editorial content
          for personal reference. You may not misuse the site, attempt
          unauthorized access, or republish large portions of the content without
          permission.
        </p>
        <p>
          We may update or revise content, features, or page structure at any
          time without prior notice.
        </p>
      </div>
    </section>
  );
}
