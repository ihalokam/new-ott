import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about the Latest OTT movie platform and how it organizes language-wise and category-wise movie discovery.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
        About Latest OTT
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        A clean movie discovery web app built for readers and search engines
      </h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
        <p>
          Latest OTT organizes movie discovery into strong topical pages such as
          language collections, trending movies, top-rated lists, Indian movie
          hubs, and theatre pages.
        </p>
        <p>
          Every listing page is designed to link naturally into richer movie detail
          pages, helping visitors move deeper into the site while building a clear
          internal linking structure for SEO.
        </p>
      </div>
    </section>
  );
}
