import type { Project } from "./types";

export const projectsData: Project[] = [
  {
    name: "Ecomarket",
    description: "E-commerce full stack con React y Spring Boot. MySQL, despliegue en Vercel/GCP.",
    longDescription:
      "Plataforma de e-commerce completa enfocada en productos ecológicos y sostenibles. Incluye sistema de gestión de inventario, carrito de compras, procesamiento de pagos, panel de administración y sistema de reseñas. Implementa autenticación JWT, optimización de imágenes y SEO.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["React", "Spring Boot", "MySQL", "JWT", "Vercel", "GCP"],
    frameworks: ["React", "Spring Boot"],
    languages: ["JavaScript", "Java", "SQL"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Frontend", url: "#" },
      { label: "Backend", url: "#" },
      { label: "Demo", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "BancoSimple",
    description: "App bancaria con autenticación JWT. React + Spring Boot + MySQL.",
    longDescription:
      "Aplicación bancaria simulada con funcionalidades completas de gestión financiera. Incluye transferencias, historial de transacciones, gestión de cuentas, reportes financieros y dashboard administrativo. Implementa seguridad robusta con JWT y encriptación de datos sensibles.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["React", "Spring Boot", "MySQL", "JWT", "Spring Security"],
    frameworks: ["React", "Spring Boot"],
    languages: ["JavaScript", "Java", "SQL"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Frontend", url: "#" },
      { label: "Backend", url: "#" },
      { label: "Demo", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "Gestor de Tareas CLI",
    description: "App Node.js interactiva (Inquirer).",
    longDescription:
      "Herramienta de línea de comandos para gestión de tareas y productividad. Permite crear, editar, eliminar y organizar tareas con categorías, prioridades y fechas límite. Incluye reportes de productividad, exportación de datos y sincronización con calendarios externos.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Node.js", "Inquirer", "Commander", "Chalk", "JSON"],
    frameworks: ["Node.js"],
    languages: ["JavaScript"],
    role: ["Backend", "CLI"],
    links: [
      { label: "Demo", url: "#" },
      { label: "GitHub", url: "#" },
      { label: "NPM", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "Portafolio Web",
    description: "Sitio MERN personal con despliegue en Vercel.",
    longDescription:
      "Portafolio personal desarrollado con stack MERN, featuring diseño responsive, modo oscuro, animaciones suaves y optimización SEO. Incluye blog técnico, galería de proyectos, formulario de contacto y panel de administración para gestión de contenido.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vercel"],
    frameworks: ["React", "Express"],
    languages: ["JavaScript", "HTML", "CSS"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Enlace", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    status: "En desarrollo",
    year: "2024",
  },
  {
    name: "API RestaurantManager",
    description: "API REST para gestión de restaurantes con Spring Boot.",
    longDescription:
      "API completa para gestión de restaurantes que incluye manejo de menús, pedidos, inventario, empleados y reportes financieros. Implementa patrones de diseño, documentación con Swagger, testing unitario y integración continua.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Spring Boot", "PostgreSQL", "Swagger", "JUnit", "Docker"],
    frameworks: ["Spring Boot"],
    languages: ["Java", "SQL"],
    role: ["Backend", "API"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Swagger Docs", url: "#" },
    ],
    status: "Completado",
    year: "2023",
  },
  {
    name: "Dashboard Analytics",
    description: "Dashboard de analytics con Next.js y Chart.js.",
    longDescription:
      "Dashboard interactivo para visualización de datos y analytics empresariales. Incluye gráficos dinámicos, filtros avanzados, exportación de reportes, notificaciones en tiempo real y integración con múltiples fuentes de datos.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Next.js", "Chart.js", "Tailwind", "Prisma", "PostgreSQL"],
    frameworks: ["Next.js"],
    languages: ["TypeScript", "SQL"],
    role: ["Frontend", "Full Stack"],
    links: [
      { label: "Demo", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    status: "En desarrollo",
    year: "2024",
  },
]; 