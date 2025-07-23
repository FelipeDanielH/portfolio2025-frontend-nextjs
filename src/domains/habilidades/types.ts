// Tipos e interfaces del dominio habilidades 

export interface SkillConcepto {
  _id: string;
  nombre: string;
  aprendido: boolean;
}

export interface Skill {
  _id: string;
  categoria_id: string;
  tecnologia: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  puntuacion: number;
  descripcion?: string;
  conceptos: SkillConcepto[];
  orden?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
} 