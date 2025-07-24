import { Project } from "../types";

export async function getProjects(): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/projects`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Error al obtener proyectos");
    const data = await res.json();
    // Si la API responde con { data: Project[] }
    if (data && Array.isArray(data.data)) return data.data as Project[];
    // Si la API responde con un array directo
    if (Array.isArray(data)) return data as Project[];
    throw new Error("Formato de respuesta inesperado");
  } catch (error) {
    console.error(error);
    return [];
  }
} 