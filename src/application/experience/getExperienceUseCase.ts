// Caso de uso para obtener experiencia
import type { Experience } from '@/domains/types'

export type GetExperienceService = () => Experience[]

export function getExperienceUseCase(getExperienceService: GetExperienceService): Experience[] {
  return getExperienceService()
} 