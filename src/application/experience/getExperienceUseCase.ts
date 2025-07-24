// Caso de uso para obtener experiencia
import type { Experience } from '@/domains/experiencia/types'

export type GetExperienceService = () => Promise<Experience[]>

export async function getExperienceUseCase(getExperienceService: GetExperienceService): Promise<Experience[]> {
  return await getExperienceService()
} 