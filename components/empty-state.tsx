import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="neo-surface rounded-[2rem] px-6 py-16 text-center">
      <h2 className="theme-text text-2xl font-semibold">{title}</h2>
      <p className="theme-text-muted mx-auto mt-3 max-w-2xl text-sm leading-7">
        {description}
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="neo-button-primary rounded-full px-5 py-3 text-sm font-semibold"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
