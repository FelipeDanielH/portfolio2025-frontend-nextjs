// Caso de uso para obtener habilidades
import type { Skill } from '@/domains/types'

export type GetSkillsService = () => Skill[]

export function getSkillsUseCase(getSkillsService: GetSkillsService): Skill[] {
  return getSkillsService()
} 