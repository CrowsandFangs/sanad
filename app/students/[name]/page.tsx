import DonateButton from "@/app/components/DonateButton";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function StudentProfile({ params }: PageProps) {

  const { name } = await params;

  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("slug", name)
    .single();

  if (error || !student) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Profil introuvable
        </h1>
      </main>
    );
  }

  const percentage =
    student.has_goal && student.goal_amount
      ? Math.min(
          Math.round((student.current_amount / student.goal_amount) * 100),
          100
        )
      : 0;

  return (
    <main className="min-h-screen px-page-x sm:px-6 py-page-y sm:py-16">

      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card-lg sm:p-card-lg shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:gap-8">

            <div
              className={`mb-6 flex h-24 w-24 items-center justify-center rounded-avatar text-3xl font-semibold text-surface shadow-sm md:mb-0 ${
                student.is_muhajir ? "bg-emerald-900" : "bg-accent"
              }`}
            >
              {student.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2 text-foreground">
                {student.name}
              </h1>

              <p className="text-text-muted mb-4 text-sm">
                📍 {student.city}
              </p>

              <div className="flex flex-wrap gap-2">
                {student.is_muhajir && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
                    Muhajir
                  </span>
                )}

                {student.is_urgent && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-urgent-soft px-4 py-1 text-xs font-medium text-urgent-strong ring-1 ring-urgent-soft/70">
                    <span className="text-[10px]">●</span> Besoin urgent
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* PRESENTATION */}
        <div className="rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card-lg sm:p-card-lg shadow-sm">

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
            Présentation
          </h2>

          <p className="text-foreground/80 leading-relaxed whitespace-pre-line mb-6 text-sm sm:text-base">
            {student.description}
          </p>

          <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">
            Besoin
          </h3>

          {student.is_sensitive ? (
            <p className="text-text-muted italic text-sm">
              🔒 Ce besoin concerne une situation personnelle.
            </p>
          ) : (
            <p className="text-foreground/80 text-sm sm:text-base">
              {student.need_summary}
            </p>
          )}

        </div>

        {/* OBJECTIF */}
        {student.has_goal && student.goal_amount && (
          <div className="rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card-lg sm:p-card-lg shadow-sm">

            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
              Objectif financier
            </h2>

            <div className="mb-3 flex items-center justify-between text-sm text-text-muted">
              <span>
                {student.current_amount}€ collectés sur {student.goal_amount}€
              </span>
              <span className="font-medium text-foreground">
                {percentage}%
              </span>
            </div>

            <div className="h-3 w-full rounded-full bg-surface-muted overflow-hidden">
              <div
                className="h-3 rounded-full bg-accent transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

          </div>
        )}

        {/* DON */}
        <div className="rounded-card-lg bg-accent text-surface p-card-lg sm:p-card-lg text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Soutenir {student.name}
          </h2>

          <p className="mb-6 text-sm text-surface/80">
            Votre contribution est directement reversée à l’étudiant pour
            l’aider à poursuivre ses études dans les meilleures conditions.
          </p>

          <DonateButton studentSlug={student.slug} />
        </div>

      </div>

    </main>
  );
}