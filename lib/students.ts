import { supabase } from "@/lib/supabase";

export type Student = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export const students: Student[] = [
  {
    id: 1,
    name: "Ahmed",
    slug: "ahmed",
    description:
      "Ahmed est étudiant en sciences religieuses et poursuit son apprentissage avec détermination."
  },
  {
    id: 2,
    name: "Youssef",
    slug: "youssef",
    description:
      "Youssef est engagé dans l’étude des sciences islamiques et recherche un soutien ponctuel."
  },
  {
    id: 3,
    name: "Mariam",
    slug: "mariam",
    description:
      "Mariam est investie dans l’étude du Coran avec des ressources limitées."
  }
];

export async function getTotalDonations(): Promise<{ total: number; count: number }> {
  const { data, error } = await supabase.from("donations").select("amount");

  if (error || !data) {
    return { total: 0, count: 0 };
  }

  const total = data.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
  return { total, count: data.length };
}
