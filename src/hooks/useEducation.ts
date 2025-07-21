import { useEffect, useState } from 'react'
import { getEducation, getCertifications } from '@/infrastructure/services/educationService'
import { getEducationUseCase } from '@/application/education/getEducationUseCase'
import type { EducationItem } from '@/domains/types'

export function useEducation() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [certifications, setCertifications] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getEducationUseCase(getEducation),
      getCertifications()
    ])
      .then(([edu, certs]) => {
        setEducation(edu)
        setCertifications(certs)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { education, certifications, loading, error }
} 