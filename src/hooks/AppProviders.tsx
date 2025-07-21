"use client";

import { ProjectsProvider } from './ProjectsContext';
import { SkillsProvider } from './SkillsContext';
import { ExperienceProvider } from './ExperienceContext';
import { EducationProvider } from './EducationContext';
import { AboutProvider } from './AboutContext';

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