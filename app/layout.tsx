import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Course Platform",
  description: "Discover high-quality courses to level up your skills.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    title: "Course Platform",
    description: "Discover high-quality courses to level up your skills.",
    url: "https://example.com",
    siteName: "Course Platform"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-header__inner">
              <a href="/" className="app-header__brand">
                <span className="app-header__logo-circle" aria-hidden="true" />
                <span className="app-header__brand-text">Course Platform</span>
              </a>
            </div>
          </header>
          <main className="app-main" role="main">
            {children}
          </main>
          <footer className="app-footer">
            <div className="app-footer__inner">
              <p>&copy; {new Date().getFullYear()} Course Platform. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}


