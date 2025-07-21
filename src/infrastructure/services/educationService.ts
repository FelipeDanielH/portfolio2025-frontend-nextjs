import { Education } from "@/domains/types";

const educationData: Education[] = [
  {
    title: "Bootcamp Full Stack (540h)",
    institution: "Generation Chile",
    year: "2025",
    description: "Stack MERN, Spring Boot, despliegue, testing, buenas prácticas.",
  },
  {
    title: "Ingeniería en Informática",
    institution: "Duoc UC",
    year: "2021",
    description: "(Certificado de título)",
  },
];

const certificationsData: string[] = [
  "React: De cero a experto – Udemy",
  "Docker: Guía práctica para desarrolladores",
];

export async function getEducation() {
  await new Promise(res => setTimeout(res, 300));
  return educationData;
}

export async function getCertifications() {
  await new Promise(res => setTimeout(res, 300));
  return certificationsData;
} 