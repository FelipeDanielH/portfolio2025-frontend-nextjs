// Tipos para los endpoints de Home

export interface HomeHero {
  _id: string;
  __v: number;
  boton_contacto: string;
  claim: string;
  createdAt: string;
  cv: string;
  email: string;
  linkedin: string;
  nombre: string;
  telefono: string;
  titulo: string;
  ubicacion: string;
  updatedAt: string;
}

export interface HomeAbout {
  about: string;
}

export interface HomeSkills {
  skills: string[]; // Array de IDs de skills
}

// Tipos para los objetos completos que devuelven los endpoints
export interface HomeExperienceItem {
  _id: string;
  rol: string;
  empresa: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  descripcion: string;
}

export interface HomeExperience {
  experience: HomeExperienceItem[];
}

export interface HomeProjectItem {
  _id: string;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  estado: string;
  año: number;
  imagen: string;
  links: {
    demo: string;
    frontend: string;
    backend: string;
    github: string;
  };
}

export interface HomeProjects {
  projects: HomeProjectItem[];
}

export interface HomeEducationItem {
  _id: string;
  tipo: "formacion" | "certificacion";
  titulo: string;
  institucion: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  descripcion: string;
}

export interface HomeEducation {
  education: HomeEducationItem[];
}

export interface HomeContact {
  _id: string;
  __v: number;
  createdAt: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio_url: string;
  telefono: string;
  updatedAt: string;
}

export interface HomeCallToAction {
  _id: string;
  __v: number;
  createdAt: string;
  subtitulo: string;
  titulo: string;
  updatedAt: string;
}

// Tipo principal que agrupa todos los datos de Home
export interface HomeData {
  hero: HomeHero;
  about: HomeAbout;
  skills: HomeSkills;
  experience: HomeExperience;
  projects: HomeProjects;
  education: HomeEducation;
  contact: HomeContact;
  callToAction: HomeCallToAction;
} 