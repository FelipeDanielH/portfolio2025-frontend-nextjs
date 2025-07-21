import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSkills } from "@/infrastructure/services/skillsService";
import { getSkillsUseCase } from "@/application/skills/getSkillsUseCase";
import { getSkillCategoryLabel } from "@/domains/utils";

function SkillCategoryCard({ category, skillList, index }: { category: string; skillList: string[]; index: number }) {
  return (
    <ScrollReveal key={category} delay={index * 100}>
      <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg capitalize text-gray-900 dark:text-white">
            {getSkillCategoryLabel(category)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill) => (
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
  );
}

export function HabilidadesSection() {
  const skills = getSkillsUseCase(getSkills);
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
          {Object.entries(skills).map(([category, skillList], index) => (
            <SkillCategoryCard key={category} category={category} skillList={skillList} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 