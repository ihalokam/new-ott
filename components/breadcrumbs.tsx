import Link from "next/link";

type Breadcrumb = {
  href: string;
  label: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="theme-text-muted flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link href="/" className="neo-button rounded-full px-3 py-1.5">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span>/</span>
            <Link href={item.href} className="neo-button rounded-full px-3 py-1.5">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
