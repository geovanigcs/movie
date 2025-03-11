"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type Language = "pt-BR" | "en-US" | "es-ES" | "ru-RU"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "pt-BR", // Default value for SSR
  setLanguage: () => {}, // No-op for SSR
})

export function LanguageProvider({
  children,
  defaultLanguage = "pt-BR",
}: {
  children: React.ReactNode
  defaultLanguage?: Language
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  // Load saved language preference
  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["pt-BR", "en-US", "es-ES", "ru-RU"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Save language preference
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("language", language)
        document.documentElement.lang = language.split("-")[0]
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }, [language, mounted])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

