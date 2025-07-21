"use client";

import React, { createContext, useContext } from 'react';
import { useProjects } from './useProjects';
import type { Project } from '@/domains/types';

const ProjectsContext = createContext<Project[] | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const projects = useProjects();
  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjectsContext debe usarse dentro de un <ProjectsProvider>');
  }
  return context;
} 