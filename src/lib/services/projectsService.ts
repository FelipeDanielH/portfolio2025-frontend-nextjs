import { Project } from "../types";

export function getProjects(): Project[] {
  return [
    {
      name: "Ecomarket",
      description: "E-commerce full stack con React y Spring Boot. MySQL, despliegue en Vercel/GCP.",
      longDescription: "E-commerce completo con panel de administración, pagos y despliegue cloud.",
      image: "",
      tech: ["React", "Spring Boot", "MySQL"],
      frameworks: [],
      languages: ["JavaScript", "Java"],
      role: ["Full Stack"],
      links: [
        { label: "Frontend", url: "#" },
        { label: "Backend", url: "#" },
      ],
      status: "Completado",
      year: "2024"
    },
    {
      name: "BancoSimple",
      description: "App bancaria con autenticación JWT. React + Spring Boot + MySQL.",
      longDescription: "Aplicación bancaria con autenticación segura y gestión de cuentas.",
      image: "",
      tech: ["React", "Spring Boot", "JWT"],
      frameworks: [],
      languages: ["JavaScript", "Java"],
      role: ["Full Stack"],
      links: [
        { label: "Frontend", url: "#" },
        { label: "Backend", url: "#" },
      ],
      status: "Completado",
      year: "2023"
    },
    {
      name: "Gestor de Tareas CLI",
      description: "App Node.js interactiva (Inquirer).",
      longDescription: "Gestor de tareas por línea de comandos usando Node.js e Inquirer.",
      image: "",
      tech: ["Node.js", "CLI", "Inquirer"],
      frameworks: [],
      languages: ["JavaScript"],
      role: ["Backend"],
      links: [
        { label: "Demo", url: "#" },
        { label: "GitHub", url: "#" },
      ],
      status: "Completado",
      year: "2022"
    },
    {
      name: "Portafolio Web",
      description: "Sitio MERN personal con despliegue en Vercel.",
      longDescription: "Portafolio personal con stack MERN y despliegue en Vercel.",
      image: "",
      tech: ["MERN", "Vercel"],
      frameworks: [],
      languages: ["JavaScript"],
      role: ["Full Stack"],
      links: [{ label: "Enlace", url: "#" }],
      status: "Completado",
      year: "2024"
    },
  ];
} 