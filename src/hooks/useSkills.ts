import { useMemo } from 'react'
import { getSkills } from '@/infrastructure/services/skillsService'
import { getSkillsUseCase } from '@/application/skills/getSkillsUseCase'

export function useSkills() {
  const skills = useMemo(() => getSkillsUseCase(getSkills), [])
  return skills
} 