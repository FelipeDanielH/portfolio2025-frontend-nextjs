// Caso de uso para obtener habilidades
import type { Skill } from '@/domains/types'

export type GetSkillsService = () => Promise<any>

export async function getSkillsUseCase(getSkillsService: GetSkillsService): Promise<any> {
  const skills: Skill[] = await getSkillsService();
  // Agrupar por categoría
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);
} 