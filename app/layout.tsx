import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plateforme Étudiants",
  description: "Espace de soutien pour étudiants en sciences religieuses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="text-foreground antialiased">

        {/* HEADER */}
        <header className="border-b border-border-subtle bg-surface/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-page-x sm:px-6 py-4 flex items-center justify-between gap-6">

            <Link
              href="/"
              className="flex items-center gap-3 font-semibold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-avatar bg-accent text-surface text-sm shadow-sm">
                🤍
              </span>

              <span className="flex items-baseline gap-2 leading-tight">
                <span className="text-xl sm:text-2xl font-semibold tracking-wide font-serif text-foreground">
                  Sanad
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-text-muted">
              <Link
                href="/"
                className="rounded-full px-3 py-1 hover:text-foreground hover:bg-surface-muted transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/students"
                className="rounded-full px-3 py-1 hover:text-foreground hover:bg-surface-muted transition-colors"
              >
                Étudiants
              </Link>
              <Link
                href="/add-profile"
                className="rounded-full px-3 py-1 hover:text-foreground hover:bg-surface-muted transition-colors"
              >
                Ajouter un profil
              </Link>
            </nav>

          </div>
        </header>

        {/* CONTENU DES PAGES */}
        <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,_#f9f3e8_0,_#f1e4d4_45%,_#e2d3c1_100%)]">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-border-subtle bg-surface/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-page-x sm:px-6 py-8 text-center text-xs sm:text-sm text-text-muted">
            <p className="mb-2">
              Un espace communautaire basé sur la confiance et la dignité.
            </p>
            <p>
              © {new Date().getFullYear()} Sanad — Tous droits réservés.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
