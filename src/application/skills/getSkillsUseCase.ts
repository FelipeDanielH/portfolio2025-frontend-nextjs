// Caso de uso para obtener habilidades
import type { Skill } from '@/domains/types'

export type GetSkillsService = () => Promise<any>

export async function getSkillsUseCase(getSkillsService: GetSkillsService): Promise<any> {
  return await getSkillsService()
} 