'use client'

import { useRef, useEffect } from 'react'

const skills = [
  "JavaScript", "TypeScript", "Java", "SQL", "Python",
  "React.js", "Next.js", "HTML", "CSS", "Tailwind",
  "Node.js", "Express", "Spring Boot",
  "MySQL", "MongoDB", "PostgreSQL",
  "Git", "Docker", "Vercel", "GCP", "AWS",
  "JWT", "REST APIs", "MVC", "Testing Unitario", "CI/CD", "Scrum"
]

export default function TagsScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pauseRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Autoscroll controlado
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let frameId: number

    const scroll = () => {
      if (!pauseRef.current) {
        if (
          container.scrollLeft + container.offsetWidth >= container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          container.scrollLeft += 1
        }
      }
      frameId = requestAnimationFrame(scroll)
    }

    frameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(frameId)
  }, [])

  // Pausar y reanudar scroll
  const pauseAutoScroll = () => {
    pauseRef.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      pauseRef.current = false
    }, 1000)
  }

  const scroll = (direction: 'left' | 'right') => {
    pauseAutoScroll()
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Otras habilidades</h3>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="px-2 text-xl"
              aria-label="Desplazar izquierda"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className="px-2 text-xl"
              aria-label="Desplazar derecha"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={pauseAutoScroll}
          onTouchStart={pauseAutoScroll}
          className="flex gap-2 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full text-sm whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
