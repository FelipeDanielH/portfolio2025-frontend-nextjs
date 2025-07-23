import { AboutSection } from '../types';

export async function fetchAboutSections(): Promise<AboutSection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Error al obtener About');
  const data = await res.json();
  return data as AboutSection[];
} 