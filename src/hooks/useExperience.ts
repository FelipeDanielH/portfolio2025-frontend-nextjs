import { useEffect, useState } from 'react'
import { getExperience } from '@/infrastructure/services/experienceService'
import { getExperienceUseCase } from '@/application/experience/getExperienceUseCase'

export function useExperience() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getExperienceUseCase(getExperience)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 