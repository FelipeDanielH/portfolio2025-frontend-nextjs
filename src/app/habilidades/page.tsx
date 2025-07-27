import { fetchSkills, fetchSkillCategories } from '@/domains/habilidades/services/skillsService';
import { PageLayout } from '@/components/layout/page-layout';
import HabilidadesClient from '@/domains/habilidades/components/HabilidadesClient';

export default async function Habilidades() {
  const [skills, categories] = await Promise.all([
    fetchSkills(),
    fetchSkillCategories(),
  ]);
  
  return (
    <PageLayout>
        <HabilidadesClient skills={skills} categories={categories} />
    </PageLayout>
  );
}
