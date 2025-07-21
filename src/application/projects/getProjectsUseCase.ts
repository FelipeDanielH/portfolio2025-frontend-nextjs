// Caso de uso para obtener proyectos
import type { Project } from '@/domains/types'

export type GetProjectsService = () => Promise<Project[]>

export async function getProjectsUseCase(getProjectsService: GetProjectsService): Promise<Project[]> {
  return await getProjectsService()
} 