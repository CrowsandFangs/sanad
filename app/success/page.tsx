import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-page-x sm:px-6 py-page-y">

      <div className="w-full max-w-lg rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card-lg sm:p-card-lg text-center shadow-sm">

        <div className="mb-6 text-4xl sm:text-5xl">💙</div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-foreground">
          Merci pour votre générosité
        </h1>

        <p className="text-sm sm:text-base text-text-muted mb-8 leading-relaxed">
          Votre don a bien été pris en compte.
          Grâce à vous, un étudiant peut poursuivre ses études plus sereinement.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/students"
            className="inline-flex items-center justify-center rounded-full bg-accent py-3 text-sm font-medium text-surface shadow-sm hover:bg-accent/90 transition-colors"
          >
            Voir d'autres étudiants
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-surface/60 py-3 text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>
    </main>
  );
}