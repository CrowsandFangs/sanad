export default function ProfileSubmitted() {
  return (
    <main className="min-h-screen flex items-center justify-center px-page-x sm:px-6 py-page-y">
      <div className="max-w-lg w-full rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card-lg text-center shadow-sm">
        
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-avatar bg-success-soft">
            <span className="text-2xl text-success-strong">✓</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-4 text-foreground">
          Merci pour votre confiance 🤍
        </h1>

        <p className="text-sm sm:text-base text-text-muted mb-6 leading-relaxed">
          Votre profil a bien été reçu.
          <br /><br />
          Chaque demande est examinée avec attention afin de garantir
          un espace respectueux et authentique.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface shadow-sm hover:bg-accent/90 transition-colors"
        >
          Retour à l'accueil
        </a>

      </div>
    </main>
  );
}
