"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-provider"
import { Button } from "@/app/components/ui/button"
import { useToast } from "@/lib/use-toast"

type FlagOption = {
  code: "pt-BR" | "en-US" | "es-ES" | "ru-RU"
  label: string
  flag: string
}

const flags: FlagOption[] = [
  {
    code: "pt-BR",
    label: "Português",
    flag: "🇧🇷",
  },
  {
    code: "en-US",
    label: "English",
    flag: "🇺🇸",
  },
  {
    code: "es-ES",
    label: "Español",
    flag: "🇪🇸",
  },
  {
    code: "ru-RU",
    label: "Русский",
    flag: "🇷🇺",
  },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const currentFlag = flags.find((f) => f.code === language)?.flag || "🇧🇷"

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageChange = (code: FlagOption["code"]) => {
    setLanguage(code)
    setIsOpen(false)
    toast({
      title: `Idioma alterado para ${flags.find((f) => f.code === code)?.label}`,
      duration: 2000,
    })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="text-xl relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span
          key={currentFlag}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentFlag}
        </motion.span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover border border-border z-50">
          <div className="py-1">
            {flags.map((option) => (
              <button
                key={option.code}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                  language === option.code ? "bg-accent/10 text-accent" : ""
                }`}
                onClick={() => handleLanguageChange(option.code)}
              >
                <span className="text-xl mr-2">{option.flag}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

