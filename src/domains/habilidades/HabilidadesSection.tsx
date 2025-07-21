"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSkills } from "@/infrastructure/services/skillsService";
import { getSkillsUseCase } from "@/application/skills/getSkillsUseCase";
import { getSkillCategoryLabel } from "@/domains/utils";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { useEffect, useState } from "react";

export function HabilidadesSection() {
  const [skills, setSkills] = useState<any>({});

  useEffect(() => {
    getSkillsUseCase(getSkills).then(setSkills);
  }, []);

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Habilidades Técnicas</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <SkillCategoryCard key={category} category={category} skillList={skillList as string[]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 