import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";

interface CategoriaHabilidad {
  categoria: string;
  skills: string[];
}

export function HabilidadesTecnicasHomeSection({ data }: { data: CategoriaHabilidad[] }) {
  return (
    <section
      id="skills"
      className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Habilidades Técnicas</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((cat, index) => (
            <ScrollReveal key={cat.categoria} delay={index * 100}>
              <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg capitalize text-gray-900 dark:text-white">{cat.categoria}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
} 