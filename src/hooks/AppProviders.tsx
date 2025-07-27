"use client";

import { ProjectsProvider } from '@/domains/proyectos/hooks/ProjectsContext';
import { SkillsProvider } from '@/domains/habilidades/hooks/SkillsContext';
import { ExperienceProvider } from '@/domains/experiencia/hooks/ExperienceContext';
import { AboutProvider } from '@/domains/sobre-mi/hooks/AboutContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProjectsProvider>
      <SkillsProvider>
        <ExperienceProvider>
          <AboutProvider>
            {children}
          </AboutProvider>
        </ExperienceProvider>
      </SkillsProvider>
    </ProjectsProvider>
  );
} 