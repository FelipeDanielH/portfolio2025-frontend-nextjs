// Caso de uso para obtener proyectos
import type { Project } from '@/domains/types'

export type GetProjectsService = () => Project[]

export function getProjectsUseCase(getProjectsService: GetProjectsService): Project[] {
  return getProjectsService()
} 