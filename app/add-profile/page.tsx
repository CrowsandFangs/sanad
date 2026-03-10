"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    situation: "",
    email: "",
    need_summary: "",
    has_goal: false,
    goal_amount: "",
    is_sensitive: false,
    is_urgent: false,
    is_muhajir: false,
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 const generateSlug = (text: string) => {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const randomSuffix = Math.floor(Math.random() * 10000);

  return `${base}-${randomSuffix}`;
};

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    setForm({
      ...form,
      status: value,
      is_muhajir: value === "Mouhajir",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !form.name ||
      !form.city ||
      !form.description ||
      !form.situation ||
      !form.email ||
      !form.need_summary
    ) {
      setErrorMessage("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (form.has_goal && !form.goal_amount) {
      setErrorMessage("Merci d’indiquer un montant pour votre objectif.");
      return;
    }

    setLoading(true);

    const slug = generateSlug(form.name);

    const { error } = await supabase.from("students").insert([
      {
        name: form.name,
        slug,
        description: form.description,
        city: form.city,
        situation: form.situation,
        email: form.email,
        need_summary: form.need_summary,
        has_goal: form.has_goal,
        goal_amount: form.has_goal ? Number(form.goal_amount) : null,
        current_amount: 0,
        is_sensitive: form.is_sensitive,
        is_urgent: form.is_urgent,
        is_muhajir: form.is_muhajir,
      },
    ]);

    setLoading(false);

if (error) {
  console.error("FULL ERROR:", JSON.stringify(error, null, 2));
  setErrorMessage("Erreur technique — voir console");
  return;
}

    router.push("/students");
  };

  return (
    <main className="min-h-screen flex justify-center px-page-x sm:px-6 py-page-y sm:py-16">
      <div className="w-full max-w-2xl rounded-card-lg border border-border-subtle/80 bg-surface/80 p-card sm:p-card-lg shadow-sm">

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2 text-foreground">
          Ajouter mon profil
        </h1>
        <p className="text-sm sm:text-base text-text-muted mb-8">
          Présentez votre situation avec clarté et sincérité.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <SelectStatut value={form.status} onChange={handleStatusChange} />

          <Input label="Prénom / Kounya *" name="name" value={form.name} onChange={handleChange} />
          <Input label="Ville / Pays *" name="city" value={form.city} onChange={handleChange} />
          <Textarea label="Votre parcours *" name="description" value={form.description} onChange={handleChange} />
          <SelectSituation value={form.situation} onChange={handleChange} />
          <Input label="Email (non public) *" name="email" type="email" value={form.email} onChange={handleChange} />

          <Textarea
            label="Résumé de votre besoin * (120 caractères max)"
            name="need_summary"
            value={form.need_summary}
            onChange={handleChange}
            maxLength={120}
          />

          {/* Objectif */}
          <div className="bg-accent-soft/40 p-card rounded-card">
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                name="has_goal"
                checked={form.has_goal}
                onChange={handleChange}
              />
              <span className="font-medium">
                Je souhaite fixer un objectif financier
              </span>
            </label>

            {form.has_goal && (
              <Input
                label="Montant souhaité (€)"
                name="goal_amount"
                type="number"
                value={form.goal_amount}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Options avancées */}
          <div className="space-y-6 pt-6 border-t border-border-subtle/60">

            {/* Besoin personnel */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_sensitive"
                  checked={form.is_sensitive}
                  onChange={handleChange}
                />
                <span>
                  Ce besoin concerne une situation personnelle
                </span>
              </label>

              <div className="mt-3 ml-6 p-4 bg-surface-muted rounded-card text-sm text-text-muted">
                🔒 <strong>Information :</strong><br />
                Si cette option est activée, le détail de votre besoin ne sera
                affiché ni sur votre carte publique ni sur votre profil complet.
                Seule la mention <em>"Besoin personnel"</em> sera visible.
              </div>
            </div>

            {/* Urgent */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_urgent"
                  checked={form.is_urgent}
                  onChange={handleChange}
                />
                <span>
                  Ce besoin est urgent
                </span>
              </label>

              <div className="mt-3 ml-6 p-4 bg-urgent-soft rounded-card text-sm text-urgent-strong">
                🔴 <strong>Information :</strong><br />
                Les profils marqués comme urgents sont mis en avant et
                apparaissent en priorité dans la liste des étudiants.
                Merci d'utiliser cette option uniquement en cas de réelle urgence.
              </div>
            </div>

          </div>

          {errorMessage && (
            <p className="text-urgent-strong text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-surface py-3 rounded-card font-medium hover:bg-accent/90 transition disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Soumettre mon profil"}
          </button>

        </form>
      </div>
    </main>
  );
}

/* COMPONENTS */

function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-input border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-0 transition focus:border-border-strong focus:ring-2 focus:ring-border-strong/10"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, maxLength }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-foreground">
        {label}
      </label>
      <textarea
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full rounded-input border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-0 transition focus:border-border-strong focus:ring-2 focus:ring-border-strong/10"
      />
    </div>
  );
}

function SelectSituation({ value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-foreground">
        Situation actuelle *
      </label>
      <select
        name="situation"
        value={value}
        onChange={onChange}
        className="w-full rounded-input border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-0 transition focus:border-border-strong focus:ring-2 focus:ring-border-strong/10"
      >
        <option value="">Sélectionner</option>
        <option>Étudiant sans aide</option>
        <option>Étudiant salarié</option>
        <option>Besoin d’aide ponctuelle</option>
        <option>Autre</option>
      </select>
    </div>
  );
}

function SelectStatut({ value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-foreground">
        Statut
      </label>
      <select
        name="status"
        value={value}
        onChange={onChange}
        className="w-full rounded-input border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-0 transition focus:border-border-strong focus:ring-2 focus:ring-border-strong/10"
      >
        <option value="">Sélectionner</option>
        <option>Étudiant en sciences religieuses</option>
        <option>Mouhajir</option>
      </select>
    </div>
  );
}