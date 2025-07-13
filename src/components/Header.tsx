'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // clases comunes para todos los links
  const linkClass = (path: string) =>
    `transition-colors duration-200 hover:text-indigo-400 hover:underline underline-offset-4 ${
      pathname === path ? 'text-indigo-400 underline underline-offset-4' : ''
    }`

  return (
    <header className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 shadow-sm transition-colors">

      <nav className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <h1 className="text-lg font-bold whitespace-nowrap z-10">Felipe Henríquez</h1>

        {/* Menú centrado solo en sm+ */}
        <ul className="hidden sm:flex gap-4 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <li><Link href="/" className={linkClass('/')}>Inicio</Link></li>
          <li><Link href="/resumen" className={linkClass('/resumen')}>Resumen</Link></li>
          <li><Link href="/formacion" className={linkClass('/formacion')}>Formación</Link></li>
          <li><Link href="/habilidades" className={linkClass('/habilidades')}>Habilidades</Link></li>
          <li><Link href="/proyectos" className={linkClass('/proyectos')}>Proyectos</Link></li>
        </ul>

        {/* Botón hamburguesa en mobile */}
        <div className="flex items-center gap-4 sm:hidden z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl"
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <ThemeToggle />
        </div>

        {/* Toggle en desktop */}
        <div className="hidden sm:block z-10">
          <ThemeToggle />
        </div>
      </nav>

      {/* Menú colapsable en mobile */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-300 dark:border-gray-700 px-4 pb-4">
          <ul className="flex flex-col items-center gap-3 mt-4 text-sm font-medium text-center">
            <li><Link href="/" className={linkClass('/')}>Inicio</Link></li>
            <li><Link href="/resumen" className={linkClass('/resumen')}>Resumen</Link></li>
            <li><Link href="/formacion" className={linkClass('/formacion')}>Formación</Link></li>
            <li><Link href="/habilidades" className={linkClass('/habilidades')}>Habilidades</Link></li>
            <li><Link href="/proyectos" className={linkClass('/proyectos')}>Proyectos</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}
