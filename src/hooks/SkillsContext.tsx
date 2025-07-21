"use client";

import React, { createContext, useContext } from 'react';
import { useSkills } from './useSkills';

const SkillsContext = createContext<ReturnType<typeof useSkills> | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const skills = useSkills();
  return (
    <SkillsContext.Provider value={skills}>
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkillsContext() {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkillsContext debe usarse dentro de un <SkillsProvider>');
  }
  return context;
} 