import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Copyright Policy",
  description:
    "Read the copyright policy for Latest OTT and how takedown requests are handled.",
  path: "/copyright-policy",
});

export default function CopyrightPolicyPage() {
  return (
    <section className="neo-surface mx-auto max-w-4xl rounded-[2rem] p-8 sm:p-10">
      <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
        Copyright Policy
      </p>
      <h1 className="theme-text mt-4 text-4xl font-semibold">
        Respecting intellectual property on {siteConfig.name}
      </h1>

      <div className="theme-text-muted mt-8 space-y-6 text-base leading-8">
        <p>
          {siteConfig.name} respects the intellectual property rights of studios,
          distributors, streaming platforms, and content owners. Posters,
          artwork, logos, and factual metadata remain the property of their
          respective owners.
        </p>
        <p>
          If you believe any content on this site infringes your copyright,
          please send the exact page URL, proof of ownership, and your request so
          the content can be reviewed promptly.
        </p>
        <p>
          Copyright-related requests can be directed to the contact details
          listed on the contact page.
        </p>
      </div>
    </section>
  );
}
