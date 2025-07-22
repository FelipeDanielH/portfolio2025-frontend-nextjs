"use client";

import { ProjectsProvider } from '@/domains/proyectos/hooks/ProjectsContext';
import { SkillsProvider } from '@/domains/habilidades/hooks/SkillsContext';
import { ExperienceProvider } from '@/domains/experiencia/hooks/ExperienceContext';
import { EducationProvider } from '@/domains/formacion/hooks/EducationContext';
import { AboutProvider } from '@/domains/sobre-mi/hooks/AboutContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProjectsProvider>
      <SkillsProvider>
        <ExperienceProvider>
          <EducationProvider>
            <AboutProvider>
              {children}
            </AboutProvider>
          </EducationProvider>
        </ExperienceProvider>
      </SkillsProvider>
    </ProjectsProvider>
  );
} 