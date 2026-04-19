import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNavLinks } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="neo-surface mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 rounded-[1.75rem] px-4 py-3 sm:px-5">
        <Link
          href="/"
          className="neo-soft flex items-center gap-3 rounded-[1.3rem] px-3 py-2 transition duration-300 hover:scale-[1.01]"
          aria-label="Latest OTT home"
        >
          <span className="neo-surface relative h-11 w-11 overflow-hidden rounded-[1rem]">
            <Image
              src="/logo-mark.svg"
              alt="Latest OTT logo"
              fill
              sizes="40px"
              priority
            />
          </span>
          <span className="flex flex-col">
            <span className="theme-accent text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
              Latest OTT
            </span>
            <span className="theme-text text-[1.02rem] font-semibold tracking-[-0.02em]">
              Movie Discovery
            </span>
          </span>
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
          <nav
            className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium theme-text"
            aria-label="Primary"
          >
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="neo-button rounded-full px-4 py-2.5 text-[0.94rem] transition duration-300 hover:-translate-y-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
