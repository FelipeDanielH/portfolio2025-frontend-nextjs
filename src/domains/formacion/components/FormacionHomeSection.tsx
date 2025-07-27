import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { GraduationCap, Award } from "lucide-react";
import { createGetHomeEducationUseCase } from "@/domains/formacion/useCases/GetHomeEducationUseCase";

interface Education {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export async function FormacionHomeSection() {
  // Obtener datos usando el use case
  const getHomeEducationUseCase = createGetHomeEducationUseCase();
  const { education, certifications } = await getHomeEducationUseCase.execute();
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Educación */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Formación</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="glass shadow-xl border border-white dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{edu.title}</CardTitle>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certificaciones */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Certificaciones</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="glass shadow-xl border border-white dark:border-gray-700">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium">{cert}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
} 