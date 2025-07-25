import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getSkillCategoryLabel(category: string): string {
  switch (category) {
    case "others":
      return "Otros";
    case "languages":
      return "Lenguajes";
    case "databases":
      return "Bases de Datos";
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
