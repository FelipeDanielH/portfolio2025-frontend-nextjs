import type { 
  HomeHero, 
  HomeAbout, 
  HomeSkills, 
  HomeExperience, 
  HomeProjects, 
  HomeEducation, 
  HomeContact,
  HomeCallToAction
} from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Función helper para manejar las respuestas de la API
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Error al obtener datos de ${endpoint}`);
    const data = await res.json();
    
    // Manejar diferentes formatos de respuesta
    if (Array.isArray(data)) return data as T;
    if (data && Array.isArray(data.data)) return data.data as T;
    if (data && typeof data === 'object') return data as T;
    
    throw new Error("Formato de respuesta inesperado");
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
}

// Endpoints de Home
export async function getHomeHero(): Promise<HomeHero> {
  try {
    const response = await fetch(`${baseUrl}/home/hero`, {
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!response.ok) {
      console.warn('API /home/hero no responde correctamente:', response.status);
      // Fallback con datos por defecto
      return {
        _id: "fallback-hero",
        __v: 0,
        nombre: "Felipe",
        titulo: "Desarrollador Full Stack",
        claim: "Creando experiencias digitales excepcionales con React, Node.js y Spring Boot",
        boton_contacto: "Contactar",
        cv: "#",
        email: "felipe.daniel.henriquez@gmail.com",
        linkedin: "https://linkedin.com/in/felipe-henriquez",
        telefono: "+56 9 8469 2943",
        ubicacion: "Santiago, Chile",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const data = await response.json();
    
    if (!data || Object.keys(data).length === 0) {
      console.warn('API /home/hero retorna datos vacíos');
      return {
        _id: "fallback-hero",
        __v: 0,
        nombre: "Felipe",
        titulo: "Desarrollador Full Stack",
        claim: "Creando experiencias digitales excepcionales con React, Node.js y Spring Boot",
        boton_contacto: "Contactar",
        cv: "#",
        email: "felipe.daniel.henriquez@gmail.com",
        linkedin: "https://linkedin.com/in/felipe-henriquez",
        telefono: "+56 9 8469 2943",
        ubicacion: "Santiago, Chile",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener hero data:', error);
    // Fallback con datos por defecto
    return {
      _id: "fallback-hero",
      __v: 0,
      nombre: "Felipe",
      titulo: "Desarrollador Full Stack",
      claim: "Creando experiencias digitales excepcionales con React, Node.js y Spring Boot",
      boton_contacto: "Contactar",
      cv: "#",
      email: "felipe.daniel.henriquez@gmail.com",
      linkedin: "https://linkedin.com/in/felipe-henriquez",
      telefono: "+56 9 8469 2943",
      ubicacion: "Santiago, Chile",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

export async function getHomeAbout(): Promise<HomeAbout> {
  try {
    const response = await fetch(`${baseUrl}/home/about`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/about no responde correctamente:', response.status);
      return {
        about: "Soy Felipe Henríquez, desarrollador full stack apasionado por crear soluciones digitales innovadoras..."
      };
    }

    const data = await response.json();
    
    if (!data || !data.about) {
      console.warn('API /home/about retorna datos vacíos');
      return {
        about: "Soy Felipe Henríquez, desarrollador full stack apasionado por crear soluciones digitales innovadoras..."
      };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener about data:', error);
    return {
      about: "Soy Felipe Henríquez, desarrollador full stack apasionado por crear soluciones digitales innovadoras..."
    };
  }
}

export async function getHomeSkills(): Promise<HomeSkills> {
  try {
    const response = await fetch(`${baseUrl}/home/skills`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/skills no responde correctamente:', response.status);
      return { skills: [] };
    }

    const data = await response.json();
    
    if (!data || !data.skills || data.skills.length === 0) {
      console.warn('API /home/skills retorna datos vacíos');
      return { skills: [] };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener skills data:', error);
    return { skills: [] };
  }
}

export async function getHomeExperience(): Promise<HomeExperience> {
  try {
    const response = await fetch(`${baseUrl}/home/experience`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/experience no responde correctamente:', response.status);
      return { experience: [] };
    }

    const data = await response.json();
    
    if (!data || !data.experience || data.experience.length === 0) {
      console.warn('API /home/experience retorna datos vacíos');
      return { experience: [] };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener experience data:', error);
    return { experience: [] };
  }
}

export async function getHomeProjects(): Promise<HomeProjects> {
  try {
    const response = await fetch(`${baseUrl}/home/projects`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/projects no responde correctamente:', response.status);
      return { projects: [] };
    }

    const data = await response.json();
    
    if (!data || !data.projects || data.projects.length === 0) {
      console.warn('API /home/projects retorna datos vacíos');
      return { projects: [] };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener projects data:', error);
    return { projects: [] };
  }
}

export async function getHomeEducation(): Promise<HomeEducation> {
  try {
    const response = await fetch(`${baseUrl}/home/education`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/education no responde correctamente:', response.status);
      return { education: [] };
    }

    const data = await response.json();
    
    if (!data || !data.education) {
      console.warn('API /home/education retorna datos vacíos');
      return { education: [] };
    }

    return {
      education: data.education || []
    };
  } catch (error) {
    console.error('Error al obtener education data:', error);
    return { education: [] };
  }
}

export async function getHomeContact(): Promise<HomeContact> {
  try {
    const response = await fetch(`${baseUrl}/home/contact`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/contact no responde correctamente:', response.status);
      return {
        _id: "fallback-contact",
        __v: 0,
        email: "felipe.daniel.henriquez@gmail.com",
        linkedin: "https://linkedin.com/in/felipe-henriquez",
        github: "https://github.com/felipe-henriquez",
        portfolio_url: "https://portfolio.felipe-henriquez.com",
        telefono: "+56 9 8469 2943",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const data = await response.json();
    
    if (!data || !data.email) {
      console.warn('API /home/contact retorna datos vacíos');
      return {
        _id: "fallback-contact",
        __v: 0,
        email: "felipe.daniel.henriquez@gmail.com",
        linkedin: "https://linkedin.com/in/felipe-henriquez",
        github: "https://github.com/felipe-henriquez",
        portfolio_url: "https://portfolio.felipe-henriquez.com",
        telefono: "+56 9 8469 2943",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener contact data:', error);
    return {
      _id: "fallback-contact",
      __v: 0,
      email: "felipe.daniel.henriquez@gmail.com",
      linkedin: "https://linkedin.com/in/felipe-henriquez",
      github: "https://github.com/felipe-henriquez",
      portfolio_url: "https://portfolio.felipe-henriquez.com",
      telefono: "+56 9 8469 2943",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

export async function getHomeCallToAction(): Promise<HomeCallToAction> {
  try {
    const response = await fetch(`${baseUrl}/home/calltoaction`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('API /home/calltoaction no responde correctamente:', response.status);
      return {
        _id: "fallback-cta",
        __v: 0,
        titulo: "¿Listo para trabajar juntos?",
        subtitulo: "Estoy disponible para nuevos proyectos y oportunidades",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const data = await response.json();
    
    if (!data || !data.titulo) {
      console.warn('API /home/calltoaction retorna datos vacíos');
      return {
        _id: "fallback-cta",
        __v: 0,
        titulo: "¿Listo para trabajar juntos?",
        subtitulo: "Estoy disponible para nuevos proyectos y oportunidades",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    return data;
  } catch (error) {
    console.error('Error al obtener call to action data:', error);
    return {
      _id: "fallback-cta",
      __v: 0,
      titulo: "¿Listo para trabajar juntos?",
      subtitulo: "Estoy disponible para nuevos proyectos y oportunidades",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

// Función principal para obtener todos los datos de Home
export async function getAllHomeData() {
  try {
    const [
      hero,
      about,
      skills,
      experience,
      projects,
      education,
      contact,
      callToAction
    ] = await Promise.all([
      getHomeHero(),
      getHomeAbout(),
      getHomeSkills(),
      getHomeExperience(),
      getHomeProjects(),
      getHomeEducation(),
      getHomeContact(),
      getHomeCallToAction()
    ]);

    return {
      hero,
      about,
      skills,
      experience,
      projects,
      education,
      contact,
      callToAction
    };
  } catch (error) {
    console.error('Error al obtener datos de Home:', error);
    throw error;
  }
} 