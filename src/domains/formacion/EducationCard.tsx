import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import type { Education } from "@/domains/types";

export function EducationCard({ edu, index }: { edu: Education; index: number }) {
  return (
    <Card key={index} className="glass shadow-xl">
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
  );
} 