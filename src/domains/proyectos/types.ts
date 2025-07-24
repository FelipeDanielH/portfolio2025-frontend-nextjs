// Tipos e interfaces del dominio proyectos 

export interface ProjectLinkOtros {
  titulo: string;
  url: string;
}

export interface ProjectLinks {
  demo?: string;
  frontend?: string;
  backend?: string;
  github?: string;
  otros?: ProjectLinkOtros[];
}

export interface Project {
  _id: string;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  roles: string[];
  frameworks: string[];
  lenguajes: string[];
  herramientas: string[];
  estado: string;
  año: number;
  imagen: string;
  links: ProjectLinks;
  createdAt?: string;
  updatedAt?: string;
} 