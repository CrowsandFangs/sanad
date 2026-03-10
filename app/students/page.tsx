import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function StudentsPage() {

  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("is_urgent", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-10">
        <h1>Erreur lors du chargement des étudiants</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen">

      <div className="max-w-6xl mx-auto px-page-x sm:px-6 py-page-y sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-foreground">
          Étudiants en sciences religieuses
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-base">
          Découvrez leurs parcours et soutenez les étudiants et les mouhajir dans leur cheminement.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-page-x sm:px-6 pb-16 grid gap-spacing-gap-card md:grid-cols-2 lg:grid-cols-3">

        {students?.map((student) => {

          const percentage =
            student.has_goal && student.goal_amount
              ? Math.min(
                  Math.round((student.current_amount / student.goal_amount) * 100),
                  100
                )
              : 0;

              async function handleDonate() {
  const amount = prompt("Montant du don en €");

  if (!amount) return;

  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(amount),
      studentSlug: student.slug,
    }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Erreur lors de la création du paiement.");
  }
}

          return (
            <Link
              key={student.id}
              href={`/students/${student.slug}`}
              className="group flex flex-col justify-between rounded-card border border-border-subtle/80 bg-surface p-card shadow-[0_18px_40px_rgba(59,47,31,0.12)] ring-1 ring-transparent transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(59,47,31,0.18)] hover:ring-border-subtle"
            >
              <div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {student.is_muhajir && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
                      Muhajir
                    </span>
                  )}
                  {student.is_urgent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-urgent-soft px-3 py-1 text-xs font-medium text-urgent-strong ring-1 ring-urgent-soft/70">
                      <span className="text-[10px]">●</span> Urgent
                    </span>
                  )}

                  {student.is_sensitive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-text-muted ring-1 ring-border-subtle/80">
                      🔒 Personnel
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-avatar text-sm font-semibold text-surface shadow-sm ${
                      student.is_muhajir ? "bg-emerald-900" : "bg-accent"
                    }`}
                  >
                    {student.name.charAt(0)}
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-2 text-foreground group-hover:text-foreground transition-colors">
                  {student.name}
                </h2>

                {/* Résumé ou masqué */}
                <div className="mb-4">
                  {student.is_sensitive ? (
                    <p className="text-text-muted italic text-sm">
                      🔒 Besoin personnel
                    </p>
                  ) : (
                    <p className="text-text-muted line-clamp-3 text-sm leading-relaxed">
                      {student.need_summary}
                    </p>
                  )}
                </div>

                {/* Objectif */}
                {student.has_goal && student.goal_amount && (
                  <div className="mt-4">

                    <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
                      <span>
                        {student.current_amount}€ sur {student.goal_amount}€
                      </span>
                      <span className="font-medium text-foreground">
                        {percentage}%
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-accent transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                  </div>
                )}

              </div>

              <span className="mt-6 text-sm font-medium text-foreground group-hover:underline">
                Voir le profil →
              </span>

            </Link>
          );
        })}

      </div>

    </main>
  );
}