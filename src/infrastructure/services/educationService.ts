import { Education } from "../types";

export function getEducation(): Education[] {
  return [
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
}

export function getCertifications(): string[] {
  return [
    "React: De cero a experto – Udemy",
    "Docker: Guía práctica para desarrolladores",
  ];
} 