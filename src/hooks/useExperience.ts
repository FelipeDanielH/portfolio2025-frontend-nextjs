import { useMemo } from 'react'
import { getExperience } from '@/infrastructure/services/experienceService'
import { getExperienceUseCase } from '@/application/experience/getExperienceUseCase'

export function useExperience() {
  const experience = useMemo(() => getExperienceUseCase(getExperience), [])
  return experience
} 