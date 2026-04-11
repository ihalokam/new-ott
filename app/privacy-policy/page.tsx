import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy for the Latest OTT movie discovery application.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
        Privacy Policy
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Privacy and platform data usage
      </h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
        <p>
          This site focuses on presenting movie discovery information and category
          pages. It does not rely on user accounts in the current implementation.
        </p>
        <p>
          Third-party movie artwork and metadata references may come from TMDB and
          related data sources. Cache infrastructure is used only to speed up page
          delivery and reduce database load.
        </p>
      </div>
    </section>
  );
}
