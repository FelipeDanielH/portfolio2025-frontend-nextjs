"use client";

import React, { createContext, useContext } from 'react';
import { useEducation } from './useEducation';

const EducationContext = createContext<ReturnType<typeof useEducation> | undefined>(undefined);

export function EducationProvider({ children }: { children: React.ReactNode }) {
  const value = useEducation();
  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
}

export function useEducationContext() {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducationContext debe usarse dentro de un <EducationProvider>');
  }
  return context;
} 