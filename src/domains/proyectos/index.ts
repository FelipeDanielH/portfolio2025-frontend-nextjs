// Barrel exports para el dominio Proyectos

// Use Cases
export { createGetHomeProjectsUseCase } from './useCases/GetHomeProjectsUseCase';

// Services
export { getProjects } from './services/projectsService';

// Repositories
export type { ProjectsRepository } from './repositories/ProjectsRepository';
export { createProjectsRepository } from './repositories/ProjectsRepository';

// Components
export { ProyectosHomeSection } from './components/ProyectosHomeSection';
export { ProyectosSection } from './components/ProyectosSection';
export { ProjectCard } from './components/ProjectCard';
export { ProjectsFiltersClient } from './components/ProjectsFiltersClient';

// Hooks
export { useProjects } from './hooks/useProjects';
export { useProjectFilters } from './hooks/useProjectFilters';
export { ProjectsProvider, useProjectsContext } from './hooks/ProjectsContext';

// Types
export type { Project, ProjectLinks, ProjectLinkOtros } from './types'; 