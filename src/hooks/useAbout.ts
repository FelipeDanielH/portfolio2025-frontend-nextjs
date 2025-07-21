import { useMemo } from 'react'
import { getAbout } from '@/infrastructure/services/aboutService'
import { getAboutUseCase } from '@/application/about/getAboutUseCase'

export function useAbout() {
  const about = useMemo(() => getAboutUseCase(getAbout), [])
  return about
} 