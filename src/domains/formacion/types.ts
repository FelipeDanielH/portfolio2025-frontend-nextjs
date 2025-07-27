// Tipos e interfaces del dominio formación 

export interface EducationLink {
  titulo: string;
  url: string;
}

export interface Education {
  _id: string;
  tipo: "formacion" | "certificacion";
  titulo: string;
  institucion: string;
  estado: "En curso" | "Completado";
  fecha_inicio: string;
  fecha_fin?: string | null;
  descripcion: string;
  aprendizajes: string[];
  certificado_url?: string | null;
  links_relevantes: EducationLink[];
  createdAt?: string;
  updatedAt?: string;
} 