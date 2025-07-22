import { useState, useEffect } from "react";
import { skillsData } from "@/domains/habilidades/data";
import { generateSlug } from "@/domains/utils";
import type { Skill } from "@/domains/types";

export function useSkillFilters() {
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    ...Array.from(new Set(skillsData.map((skill) => skill.category))),
  ];

  const filteredSkills =
    selectedCategory === "Todos"
      ? skillsData
      : skillsData.filter((skill) => skill.category === selectedCategory);

  useEffect(() => {
    filteredSkills.forEach((skill) => {
      const element = document.querySelector(`[data-skill="${skill.name}"]`);
      if (element) {
        element.id = `skill-${generateSlug(skill.name)}`;
      }
    });
  }, [filteredSkills]);

  const toggleSkill = (skillName: string) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName);
    } else {
      newExpanded.add(skillName);
    }
    setExpandedSkills(newExpanded);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "from-green-500 to-emerald-600";
    if (rating >= 6) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  const getRatingText = (rating: number) => {
    if (rating >= 9) return "Experto";
    if (rating >= 7) return "Avanzado";
    if (rating >= 5) return "Intermedio";
    return "Básico";
  };

  return {
    expandedSkills,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredSkills,
    toggleSkill,
    getRatingColor,
    getRatingText,
  };
} 