import { useEffect, useState } from 'react'
import { getAbout } from '@/domains/sobre-mi/services/aboutService'
import { getAboutUseCase } from '@/application/about/getAboutUseCase'

export function useAbout() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getAboutUseCase(getAbout)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 