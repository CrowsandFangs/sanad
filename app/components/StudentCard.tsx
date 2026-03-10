"use client";
type StudentCardProps = {
  name: string;
  description: string;
};

export default function StudentCard({ name, description }: StudentCardProps) {
  return (
    <div className="mt-5 max-w-md rounded-card border border-border-subtle/80 bg-surface p-card shadow-[0_18px_40px_rgba(59,47,31,0.12)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-avatar bg-accent text-sm font-semibold text-surface">
          {name.charAt(0)}
        </div>
        <h2 className="text-base font-semibold text-foreground">
          {name}
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-text-muted">
        {description}
      </p>

      <button
        onClick={() => {
          window.location.href = `/donate?name=${name}`;
        }}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface shadow-sm hover:bg-accent/90 transition-colors"
      >
        Faire un don
      </button>
    </div>
  );
}
