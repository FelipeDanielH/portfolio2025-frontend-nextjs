// Caso de uso para obtener datos de sobre mí
export type GetAboutService = () => any

export function getAboutUseCase(getAboutService: GetAboutService) {
  return getAboutService()
} 