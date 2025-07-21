import { EducationItem } from "@/domains/types";

const educationData: EducationItem[] = [
  {
    type: "education",
    title: "Bootcamp Full Stack (540h)",
    institution: "Generation Chile",
    year: "2025",
    date: "2025-01-15",
    description: "Stack MERN, Spring Boot, despliegue, testing, buenas prácticas.",
    status: "Completado"
  },
  {
    type: "education",
    title: "Ingeniería en Informática",
    institution: "Duoc UC",
    year: "2021",
    date: "2021-12-15",
    description: "(Certificado de título)",
    status: "Completado"
  },
];

const certificationsData: EducationItem[] = [
  {
    type: "certification",
    title: "React: De cero a experto",
    institution: "Udemy",
    year: "2024",
    date: "2024-11-20",
    description: "Curso completo de React.js desde fundamentos hasta temas avanzados.",
    status: "Completado"
  },
  {
    type: "certification",
    title: "Docker: Guía práctica para desarrolladores",
    institution: "Udemy",
    year: "2024",
    date: "2024-10-15",
    description: "Containerización y buenas prácticas para entornos productivos.",
    status: "Completado"
  }
];

export async function getEducation() {
  await new Promise(res => setTimeout(res, 300));
  return educationData;
}

export async function getCertifications() {
  await new Promise(res => setTimeout(res, 300));
  return certificationsData;
} 