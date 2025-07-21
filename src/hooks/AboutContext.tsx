"use client";

import React, { createContext, useContext } from 'react';
import { useAbout } from './useAbout';

const AboutContext = createContext<ReturnType<typeof useAbout> | undefined>(undefined);

export function AboutProvider({ children }: { children: React.ReactNode }) {
  const value = useAbout();
  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAboutContext() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAboutContext debe usarse dentro de un <AboutProvider>');
  }
  return context;
} 