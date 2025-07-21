import { useEffect, useState } from 'react'
import { getEducation } from '@/infrastructure/services/educationService'
import { getEducationUseCase } from '@/application/education/getEducationUseCase'

export function useEducation() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getEducationUseCase(getEducation)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 