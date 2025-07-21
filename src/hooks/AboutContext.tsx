"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAbout } from "@/infrastructure/services/aboutService";
import { getAboutUseCase } from "@/application/about/getAboutUseCase";

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
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAboutUseCase(getAbout)
      .then(setAbout)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AboutContext.Provider value={{ about, loading, error }}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAboutContext() {
  return useContext(AboutContext);
} 