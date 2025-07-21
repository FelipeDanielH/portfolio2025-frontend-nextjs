// Caso de uso para obtener educación
import type { EducationItem } from '@/domains/types'

export type GetEducationService = () => Promise<EducationItem[]>

export async function getEducationUseCase(getEducationService: GetEducationService): Promise<EducationItem[]> {
  return await getEducationService()
} 