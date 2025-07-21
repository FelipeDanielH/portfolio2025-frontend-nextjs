import { useMemo } from 'react'
import { getEducation } from '@/infrastructure/services/educationService'
import { getEducationUseCase } from '@/application/education/getEducationUseCase'

export function useEducation() {
  const education = useMemo(() => getEducationUseCase(getEducation), [])
  return education
} 