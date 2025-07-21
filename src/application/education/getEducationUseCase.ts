// Caso de uso para obtener educación
import type { EducationItem } from '@/domains/types'

export type GetEducationService = () => EducationItem[]

export function getEducationUseCase(getEducationService: GetEducationService): EducationItem[] {
  return getEducationService()
} 