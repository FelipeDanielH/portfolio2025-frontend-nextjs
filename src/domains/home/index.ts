// Barrel exports para el dominio Home

// Use Cases
export { createGetHomeDataUseCase } from './useCases/GetHomeDataUseCase';
export type { HomeDataUseCaseResponse } from './useCases/GetHomeDataUseCase';

// Services
export { createHomeDataTransformationService } from './services/HomeDataTransformationService';
export type { HomeDataTransformationService } from './services/HomeDataTransformationService';

// Repositories
export { HomeRepository } from './repositories/HomeRepository';
export type { HomeRepositoryInterface } from './types/repositories';

// Types
export type {
  HomeRepositoryResponse,
  HomeHeroResponse,
  HomeAboutResponse,
  HomeSkillsResponse,
  HomeExperienceResponse,
  HomeContactResponse,
  HomeCallToActionResponse
} from './types/repositories';

export type {
  TransformedSkillsCategories,
  TransformedProject,
  TransformedEducation,
  TransformedEducationData
} from './types/transformations'; 