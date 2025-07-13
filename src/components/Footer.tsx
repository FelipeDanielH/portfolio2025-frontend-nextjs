import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Autor */}
        <p>© 2025 Felipe Henríquez. Todos los derechos reservados.</p>

        {/* Social links */}
        <div className="flex gap-4">
          <a
            href="mailto:felipe.daniel.henriquez@gmail.com"
            aria-label="Correo"
            className="hover:text-indigo-500 transition-colors"
          >
            <FaEnvelope size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/felipe-henriquez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-indigo-500 transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://github.com/FelipeDanielH"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-indigo-500 transition-colors"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
