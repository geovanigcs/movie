"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

  const currentFlag = flags.find((f) => f.code === language)?.flag || "🇧🇷"

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-xl relative overflow-hidden">
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AnimatePresence>
          {flags.map((option) => (
            <motion.div
              key={option.code}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setLanguage(option.code)}
              >
                <span className="text-xl">{option.flag}</span>
                <span>{option.label}</span>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

