const aboutData = `Ingeniero en Informática y egresado del bootcamp Full Stack (540h) de Generation Chile.\nDesarrollo frontend y backend con React, Node.js y Spring Boot. Bases de datos SQL/NoSQL y despliegue en cloud (Vercel, GCP, AWS). Busco aportar y crecer en equipos con buenas prácticas y metodologías ágiles.`;

export async function getAbout() {
  await new Promise(res => setTimeout(res, 300));
  return aboutData;
} 