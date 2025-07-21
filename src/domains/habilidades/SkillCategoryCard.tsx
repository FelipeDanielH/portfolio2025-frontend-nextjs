import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSkillCategoryLabel } from "@/domains/utils";

export function SkillCategoryCard({ category, skillList, index }: { category: string; skillList: string[]; index: number }) {
  return (
    <ScrollReveal key={category} delay={index * 100}>
      <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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