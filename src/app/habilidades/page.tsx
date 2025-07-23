import { fetchSkills, fetchSkillCategories } from '@/domains/habilidades/services/skillsService';
import { Footer } from '@/components/layout/footer';
import HabilidadesClient from '@/domains/habilidades/components/HabilidadesClient';

export default async function Habilidades() {
  const [skills, categories] = await Promise.all([
    fetchSkills(),
    fetchSkillCategories(),
  ]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <HabilidadesClient skills={skills} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
