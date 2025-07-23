import { fetchSkills } from '@/domains/habilidades/services/skillsService';

export default async function HabilidadesApiLog() {
  let logMsg = '';
  try {
    const skills = await fetchSkills();
    logMsg = `Skills obtenidas: ${skills.length}`;
  } catch (error) {
    logMsg = `Error al obtener skills: ${error}`;
  }
  return (
    <div style={{padding: 32}}>
      <h2>Prueba aislada de fetchSkills</h2>
      <pre>{logMsg}</pre>
      <p>Revisa la consola del servidor para ver el log crudo de la respuesta de la API.</p>
    </div>
  );
} 