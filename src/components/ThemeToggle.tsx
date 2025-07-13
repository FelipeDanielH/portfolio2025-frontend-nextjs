'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const defaultTheme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light')
    setTheme(defaultTheme)
    document.documentElement.classList.toggle('dark', defaultTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-8 bg-yellow-300 dark:bg-blue-900 rounded-full p-1 flex items-center transition-colors duration-500"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center bg-white text-yellow-500 dark:text-blue-400"
        animate={{ x: theme === 'dark' ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.div>
    </button>
  )
}
