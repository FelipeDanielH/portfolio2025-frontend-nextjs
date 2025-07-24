export interface NavSection {
  id: string
  label: string
}

export interface Skill {
  name: string
  rating: number
  category: string
  concepts: Concept[]
}

export interface Concept {
  name: string
  learned: boolean
}

export interface ExperienceDetail {
  title: string
  company?: string
  period: string
  location: string
  description: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  teamSize?: string
  projectType: string
}

export interface Project {
  name: string
  description: string
  longDescription: string
  image: string
  tech: string[]
  frameworks: string[]
  languages: string[]
  role: string[]
  links: { label: string; url: string }[]
  status: string
  year: string
}

export interface EducationItem {
  type: "education" | "certification"
  title: string
  institution: string
  year: string
  date: string
  description: string
  details?: string[]
  duration?: string
  location?: string
  certificateUrl?: string
  skills?: string[]
  status: "Completado" | "En progreso"
}

export interface Education {
  title: string;
  institution: string;
  year: string;
  description: string;
}
