"use client";

import React, { createContext, useContext } from 'react';
import { useProjects } from './useProjects';

const ProjectsContext = createContext<ReturnType<typeof useProjects> | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const value = useProjects();
  return (
    <ProjectsContext.Provider value={value}>
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