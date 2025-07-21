import { useMemo } from 'react'
import { getProjects } from '@/infrastructure/services/projectsService'
import { getProjectsUseCase } from '@/application/projects/getProjectsUseCase'

export function useProjects() {
  // Si en el futuro hay loading/error, aquí se puede manejar
  const projects = useMemo(() => getProjectsUseCase(getProjects), [])
  return projects
} 