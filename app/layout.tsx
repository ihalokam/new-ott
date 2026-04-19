import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Latest OTT Movies by Language, Trend, and Theatre",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrap = `
    (function () {
      try {
        var storedTheme = localStorage.getItem("latest-ott-theme") || "white";
        document.documentElement.dataset.theme = storedTheme;
      } catch (error) {
        document.documentElement.dataset.theme = "white";
      }
    })();
  `;

  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--page-background)] theme-text">
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_44%),radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--surface-elevated)_72%,transparent),transparent_36%)]" />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
