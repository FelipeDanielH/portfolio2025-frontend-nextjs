// Caso de uso para obtener habilidades
import type { Skill } from '@/domains/habilidades/types'

export type GetSkillsService = () => Promise<any>

export async function getSkillsUseCase(getSkillsService: GetSkillsService): Promise<any> {
  const skills: Skill[] = await getSkillsService();
  // Agrupar por categoría
  return skills.reduce((acc, skill) => {
    if (!acc[skill.categoria_id]) acc[skill.categoria_id] = [];
    acc[skill.categoria_id].push(skill.tecnologia);
    return acc;
  }, {} as Record<string, string[]>);
} 