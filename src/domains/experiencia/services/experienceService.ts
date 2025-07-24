import { Experience } from "@/domains/experiencia/types";

export async function getExperience(): Promise<Experience[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/experience`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Error al obtener experiencia");
    const data = await res.json();
    // Si la API responde con un array directo:
    if (Array.isArray(data)) return data as Experience[];
    // Si la API responde con { data: Experience[] }
    if (data && Array.isArray(data.data)) return data.data as Experience[];
    throw new Error("Formato de respuesta inesperado");
  } catch (error) {
    // Puedes personalizar el manejo de errores aquí
    console.error(error);
    return [];
  }
} 