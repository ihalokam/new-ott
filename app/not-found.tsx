import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-2xl rounded-[2rem] border border-white/70 bg-white/90 px-8 py-16 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          This movie page could not be found
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          The route may not exist yet, or the movie record is not available in the
          current dataset.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Home
          </Link>
          <Link
            href="/trending-now"
            className="rounded-full bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-800"
          >
            Trending now
          </Link>
        </div>
      </div>
    </section>
  );
}
