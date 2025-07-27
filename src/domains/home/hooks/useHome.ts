import { useEffect, useState } from "react";
import { getAllHomeData } from "../services/homeService";
import { fetchSkills } from "@/domains/habilidades/services/skillsService";
import type { HomeData } from "../types";
import type { Skill } from "@/domains/habilidades/types";

export interface HomeDataWithSkills extends Omit<HomeData, 'skills'> {
  skills: Skill[]; // Skills completas filtradas por IDs de Home
}

export function useHome() {
  const [data, setData] = useState<HomeDataWithSkills | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        
        // Obtener datos de Home
        const homeData = await getAllHomeData();
        
        // Obtener todas las skills para filtrar
        const allSkills = await fetchSkills();
        
        // Filtrar skills por los IDs destacados
        const filteredSkills = allSkills.filter((skill: Skill) => 
          homeData.skills.skills.includes(skill._id)
        );
        
        // Combinar datos
        const combinedData: HomeDataWithSkills = {
          ...homeData,
          skills: filteredSkills
        };
        
        setData(combinedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return { data, loading, error };
} 