// Barrel exports para el dominio Proyectos

// Use Cases
export { createGetHomeProjectsUseCase } from './useCases/GetHomeProjectsUseCase';

// Services
export { fetchProjects } from './services/projectsService';

// Repositories
export { ProjectsRepository } from './repositories/ProjectsRepository';

// Components
export { ProyectosHomeSection } from './components/ProyectosHomeSection';
export { ProyectosSection } from './components/ProyectosSection';
export { ProjectCard } from './components/ProjectCard';

// Hooks
export { useProjects } from './hooks/useProjects';
export { useProjectFilters } from './hooks/useProjectFilters';
export { ProjectsProvider, useProjectsContext } from './hooks/ProjectsContext'; 