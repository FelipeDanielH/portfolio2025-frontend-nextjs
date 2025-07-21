// Caso de uso para obtener datos de sobre mí
export type GetAboutService = () => Promise<any>

export async function getAboutUseCase(getAboutService: GetAboutService) {
  return await getAboutService()
} 