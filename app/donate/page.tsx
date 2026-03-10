"use client";

import { useSearchParams } from "next/navigation";

export default function DonatePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <main className="min-h-screen px-page-x sm:px-6 py-page-y flex items-center justify-center">
      <div className="w-full max-w-lg rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
          Faire un don
        </h1>

        {name && (
          <p className="mb-4 text-sm text-text-muted">
            Vous êtes sur le point de faire un don pour :{" "}
            <span className="font-medium text-foreground">
              {name}
            </span>
          </p>
        )}

        <p className="text-sm text-text-muted leading-relaxed">
          La fonctionnalité de don direct depuis cette page arrivera
          prochainement. En attendant, vous pouvez soutenir les étudiants
          via leurs profils individuels.
        </p>
      </div>
    </main>
  );
}
