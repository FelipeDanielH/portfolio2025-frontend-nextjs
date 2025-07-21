import { Experience } from "../types";

export function getExperience(): Experience[] {
  return [
    {
      title: "Desarrollador Freelance (WooCommerce)",
      period: "2025",
      description: "Implementación de ecommerce para microemprendedoras usando WordPress, WooCommerce, PHP y MySQL.",
    },
    {
      title: "Customer Specialist IT",
      company: "ETPAY SpA",
      period: "Jun 2021 - Dic 2021",
      description:
        "Resolución de incidencias con AWS CloudWatch, soporte a integraciones mediante APIs REST y coordinación directa con clientes y el equipo de desarrollo.",
    },
    {
      title: "Desarrollador Shopify (Práctica)",
      company: "Ducklife Media",
      period: "Oct 2020 - Dic 2020",
      description:
        "Modificación de temas y estilos visuales con HTML, CSS y JS en tiendas Shopify. Mejoras en diseño responsive y adaptación visual.",
    },
  ];
} 