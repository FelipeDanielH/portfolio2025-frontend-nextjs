import { useEffect, useState } from 'react'
import { fetchSkills } from '@/domains/habilidades/services/skillsService'
import { getSkillsUseCase } from '@/application/skills/getSkillsUseCase'

export function useSkills() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    getSkillsUseCase(fetchSkills)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 