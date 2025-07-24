import { useEffect, useState } from 'react'
import { getExperience } from '@/domains/experiencia/services/experienceService'
import { getExperienceUseCase } from '@/application/experience/getExperienceUseCase'
import { Experience } from '@/domains/experiencia/types'

export function useExperience() {
  const [data, setData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getExperienceUseCase(getExperience)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 