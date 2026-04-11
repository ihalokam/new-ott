import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Reach the Latest OTT team for questions about movie pages, data coverage, and site information.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
        Contact Us
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Questions, corrections, or partnership requests
      </h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
        <p>
          For editorial questions, data concerns, or collaboration requests, reach
          us through your preferred support workflow or project contact channel.
        </p>
        <p>
          This page is intentionally indexable so users can discover how to contact
          the team without leaving the movie discovery flow.
        </p>
      </div>
    </section>
  );
}
