import { skillsData } from "@/domains/habilidades/data";

export async function getSkills() {
  await new Promise(res => setTimeout(res, 300));
  return skillsData;
} 