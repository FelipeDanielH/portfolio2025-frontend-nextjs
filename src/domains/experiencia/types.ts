// Tipos e interfaces del dominio experiencia 

export interface Experience {
  _id: string;
  rol: string;                // Título o puesto
  empresa: string;
  ubicacion: string;
  modalidad: string;          // Remoto, Presencial, etc.
  sector: string;             // E-commerce, etc.
  fecha_inicio: string;       // Formato YYYY-MM
  fecha_fin?: string;         // Opcional
  descripcion: string;
  responsabilidades: string[];
  logros: string[];
  tecnologias: string[];
  orden: number;
} 