import { useEffect, useState } from 'react'
import { getProjects } from '@/infrastructure/services/projectsService'
import { getProjectsUseCase } from '@/application/projects/getProjectsUseCase'

export function useProjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getProjectsUseCase(getProjects)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 