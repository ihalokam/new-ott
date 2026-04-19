import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="neo-surface mx-auto grid max-w-7xl gap-8 rounded-[2rem] px-5 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <p className="theme-accent text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm">
            Latest OTT
          </p>
          <p className="theme-text-muted max-w-2xl text-[0.98rem] leading-8">
            Love with the cinema. <br />
            Find the right one, from right place. <br />
            Log it in your diary. And Repeat! <br />
          </p>
          <p className="theme-text-muted text-sm leading-7">
            {siteConfig.tmdbAttribution}
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-3 text-sm font-medium theme-text lg:justify-end">
          <Link className="neo-button rounded-full px-4 py-2" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="neo-button rounded-full px-4 py-2" href="/disclaimer">
            Disclaimer
          </Link>
          <Link className="neo-button rounded-full px-4 py-2" href="/copyright-policy">
            Copyright Policy
          </Link>
          <Link className="neo-button rounded-full px-4 py-2" href="/terms-and-conditions">
            Terms & Conditions
          </Link>
          <Link className="neo-button rounded-full px-4 py-2" href="/contact-us">
            Contact Us
          </Link>
          <Link className="neo-button rounded-full px-4 py-2" href="/about-us">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
