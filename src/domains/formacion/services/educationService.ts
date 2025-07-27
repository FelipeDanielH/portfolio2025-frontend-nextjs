import { Education } from "@/domains/formacion/types";

export async function getEducation(): Promise<Education[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/education`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Error al obtener formación");
    const data = await res.json();
    // Si la API responde con un array directo:
    if (Array.isArray(data)) return data as Education[];
    // Si la API responde con { data: Education[] }
    if (data && Array.isArray(data.data)) return data.data as Education[];
    throw new Error("Formato de respuesta inesperado");
  } catch (error) {
    console.error(error);
    return [];
  }
} 