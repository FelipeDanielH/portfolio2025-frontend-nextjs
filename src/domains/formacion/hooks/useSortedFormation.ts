import { formationData } from "@/domains/formacion/data";
import type { EducationItem } from "@/domains/types";

export function useSortedFormation() {
  const sorted = [...formationData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { sorted };
} 