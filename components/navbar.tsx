import Image from "next/image";
import Link from "next/link";

import { primaryNavLinks } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(248,251,255,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/80"
          aria-label="Latest OTT home"
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(10,37,64,0.16)]">
            <Image
              src="/logo-mark.svg"
              alt="Latest OTT logo"
              fill
              sizes="40px"
              priority
            />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
              Latest OTT
            </span>
            <span className="text-base font-semibold text-slate-900">
              Movie Discovery
            </span>
          </span>
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium text-slate-700"
          aria-label="Primary"
        >
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
