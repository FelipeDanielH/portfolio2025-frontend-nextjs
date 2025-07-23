import { Skill } from '../types';

export interface SkillCategory {
  _id: string;
  nombre: string;
  orden?: number;
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/skills/skills`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error('No se pudo obtener las habilidades');
    }
    const json = await res.json();
    if (!Array.isArray(json)) {
      return [];
    }
    return json;
  } catch (error: any) {
    return [];
  }
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/skills/categorias`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return [];
    }
    const json = await res.json();
    if (!Array.isArray(json)) {
      return [];
    }
    return json;
  } catch (error: any) {
    return [];
  }
} 