"use client";
import { createContext, useContext, ReactNode } from "react";

interface AboutContextType {
  about: string;
  loading: boolean;
  error: string | null;
}

const AboutContext = createContext<AboutContextType>({
  about: "",
  loading: false,
  error: null,
});

export function AboutProvider({ children }: { children: ReactNode }) {
  // Placeholder: No fetch ni lógica, solo contexto vacío
  return (
    <AboutContext.Provider value={{ about: "", loading: false, error: null }}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAboutContext() {
  return useContext(AboutContext);
} 