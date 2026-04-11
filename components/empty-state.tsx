import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-sky-200 bg-white/80 px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        {description}
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
