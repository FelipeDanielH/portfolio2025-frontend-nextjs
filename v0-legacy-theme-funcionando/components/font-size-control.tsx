"use client"

import { Minus, Plus, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function FontSizeControl() {
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  const increaseFontSize = () => {
    if (fontSize < 20) setFontSize(fontSize + 1)
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 1)
  }

  const resetFontSize = () => {
    setFontSize(16)
  }

  return (
    <div className="flex items-center gap-1 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full p-1">
      <Button variant="ghost" size="icon" onClick={decreaseFontSize} disabled={fontSize <= 12} className="h-8 w-8">
        <Minus className="h-3 w-3" />
      </Button>
      <Button variant="ghost" size="icon" onClick={resetFontSize} className="h-8 w-8">
        <Type className="h-3 w-3" />
      </Button>
      <Button variant="ghost" size="icon" onClick={increaseFontSize} disabled={fontSize >= 20} className="h-8 w-8">
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
