import Link from "next/link";
import { getTotalDonations } from "@/lib/students";

export default async function HomePage() {
  const { total, count } = await getTotalDonations();
  const formattedTotal = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-page-x sm:px-6 py-page-y sm:py-24">
        <div className="mx-auto max-w-6xl md:grid md:grid-cols-2 md:items-center md:gap-12">
          {/* Texte */}
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-4 text-center md:text-left">
              ESPACE DE SOUTIEN POUR TALIB 'ILM ET MOUHAJIR
            </p>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6 text-foreground text-center md:text-left">
              Soutenez les étudiants en sciences religieuses
            </h1>

            <p className="text-base sm:text-lg text-text-muted mb-10 text-center md:text-left leading-relaxed">
           Une plateforme dédiée aux étudiants engagés dans leurs études et aux mouhajirun qui rencontrent des difficultés financières. 
Découvrez leurs parcours et apportez votre soutien.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-start justify-center gap-3 sm:gap-4">
              <Link
                href="/students"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-surface shadow-sm hover:bg-accent/90 transition-colors"
              >
                Voir les profils
              </Link>

              <Link
                href="/add-profile"
                className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-surface/60 px-8 py-3 text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
              >
                Ajouter mon profil
              </Link>
            </div>
          </div>

          {/* Visuel bibliothèque / texture */}
          <div className="mt-10 md:mt-0">
            <div className="relative overflow-hidden rounded-card-lg border border-border-subtle bg-surface/90 p-card-lg shadow-[0_24px_60px_rgba(59,47,31,0.35)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(253,247,238,0.9),_rgba(243,228,212,0.9),_rgba(225,211,193,0.95))]" />

              <div className="relative flex gap-4">
                <div className="flex flex-col justify-between">
                  <div className="h-24 w-8 rounded-[999px] bg-accent-soft/80 shadow-sm" />
                  <div className="h-16 w-8 rounded-[999px] bg-accent-soft/60 shadow-sm" />
                </div>

                <div className="flex flex-col justify-between">
                  <div className="h-20 w-10 rounded-[999px] bg-surface-muted/90 shadow-sm" />
                  <div className="h-20 w-10 rounded-[999px] bg-surface-muted shadow-sm" />
                </div>

                <div className="ml-auto flex flex-col justify-between text-right">
                  <p className="text-xs font-medium tracking-wide text-text-muted">
                    Profils rédigés avec soin,
                    <br />
                    partagés en toute dignité.
                  </p>
                  <p className="text-[11px] text-text-muted/90">
                    Une interface pensée pour rester calme,
                    <br />
                    même lorsque les situations sont urgentes.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 border-t border-border-subtle/70 pt-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Total collecté
                </p>
                <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                  {formattedTotal} €
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  {count} contribution{count === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION VALEUR */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-page-x sm:px-6 grid md:grid-cols-3 gap-spacing-gap-card md:gap-8">

          <div className="rounded-card border border-border-subtle bg-surface/70 p-card text-center shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Transparence
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Chaque étudiant partage son parcours et sa situation.
            </p>
          </div>

          <div className="rounded-card border border-border-subtle bg-surface/70 p-card text-center shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Communauté
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Un espace pour soutenir ceux qui consacrent leur vie à l’étude.
            </p>
          </div>

          <div className="rounded-card border border-border-subtle bg-surface/70 p-card text-center shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Impact réel
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Un soutien financier qui permet de continuer les études sereinement.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}