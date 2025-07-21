import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getEducation, getCertifications } from "@/infrastructure/services/educationService";
import { getEducationUseCase } from "@/application/education/getEducationUseCase";

export function FormacionSection() {
  const education = getEducationUseCase(getEducation);
  const certifications = getCertifications();
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Formación</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="glass border-0 shadow-xl">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{edu.title}</CardTitle>
                          <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                            {edu.institution} • {edu.year}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={200}>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Certificaciones</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{cert}</p>
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