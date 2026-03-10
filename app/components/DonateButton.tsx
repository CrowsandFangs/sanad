"use client";

import { useState } from "react";

interface DonateButtonProps {
  studentSlug: string;
}

export default function DonateButton({ studentSlug }: DonateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const predefinedAmounts = [10, 20, 50, 100];

  async function handlePayment() {
    const amount = selectedAmount || Number(customAmount);

    if (!amount || amount <= 0) {
      alert("Veuillez entrer un montant valide.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        studentSlug,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-surface/10 px-8 py-3 text-sm font-medium text-surface ring-1 ring-surface/20 backdrop-blur hover:bg-surface/15 hover:ring-surface/30 transition-colors"
      >
        Soutenir
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-page-x">
          <div className="relative w-full max-w-md rounded-card-lg border border-border-subtle/80 bg-surface/95 p-card sm:p-card-lg shadow-xl">

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:bg-surface-muted hover:text-foreground transition-colors"
            >
              ✕
            </button>

            <h2 className="mb-2 text-center text-xl sm:text-2xl font-semibold text-foreground">
              Contribution
            </h2>

            <p className="mb-8 text-center text-xs sm:text-sm text-text-muted leading-relaxed">
              Votre contribution soutient directement son parcours d’étude.
              <br />
              Chaque don compte.
            </p>

            {/* Montants */}
            <div className="mb-6 grid grid-cols-2 gap-spacing-gap-card">
  {predefinedAmounts.map((amount) => (
    <button
      key={amount}
      onClick={() => {
        setSelectedAmount(amount);
        setCustomAmount("");
      }}
      className={`rounded-card border px-3 py-3 text-sm font-medium transition-colors ${
        selectedAmount === amount
          ? "bg-accent text-surface border-border-strong shadow-sm"
          : "bg-surface-muted text-foreground border-border-subtle hover:bg-surface"
      }`}
    >
      {amount} €
    </button>
  ))}
</div>

            {/* Montant libre */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-text-muted">
                Montant libre
              </label>
              <input
                type="number"
                placeholder="Entrer un montant"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full rounded-card border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-0 transition focus:border-border-strong focus:ring-2 focus:ring-border-strong/10"
              />
            </div>

            {/* Confiance */}
            <div className="mb-6 text-center text-[11px] leading-relaxed text-text-muted">
              Paiement sécurisé via Stripe. <br />
              Vos informations bancaires ne sont jamais stockées.
            </div>

            {/* CTA */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full rounded-full bg-accent py-3.5 text-sm font-medium text-surface shadow-sm transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirection..." : "Continuer vers le paiement"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}