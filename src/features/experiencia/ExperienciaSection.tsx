import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const experience = [
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

export function ExperienciaSection() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Experiencia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500" />

          {experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="relative flex items-start gap-8 mb-12 last:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>

                <Card className="flex-1 glass border-0 shadow-xl">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    {exp.company && (
                      <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {exp.company}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
} 