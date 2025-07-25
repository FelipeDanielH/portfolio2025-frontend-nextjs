"use client";

import React, { createContext, useContext } from 'react';
import { useExperience } from './useExperience';

const ExperienceContext = createContext<ReturnType<typeof useExperience> | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const value = useExperience();
  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperienceContext() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperienceContext debe usarse dentro de un <ExperienceProvider>');
  }
  return context;
} 