"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { useTranslation } from "@/lib/use-translation"
import LanguageSwitcher from "@/app/components/language-switcher"
import ThemeToggle from "@/app/components/theme-toggle"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/lib/use-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useToast } from "@/lib/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"

export default function Header() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const router = useRouter()
  const { currentUser, users, switchUser } = useUser()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname?.startsWith("/movies")) return "movies"
    if (pathname?.startsWith("/tvshows")) return "tvShows"
    if (pathname?.startsWith("/anime")) return "anime"
    return ""
  }

  const activeTab = getActiveTab()

  const handleTabChange = (tab: string) => {
    router.push(`/${tab.toLowerCase()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      toast({
        title: `Pesquisando por "${searchQuery}"`,
        duration: 2000,
      })
    }
  }

  const notifications = [
    {
      id: 1,
      title: "🎬 Novo Lançamento!",
      message: "Duna: Parte 2 acaba de chegar à plataforma! 🏜️",
      time: "Agora",
    },
    {
      id: 2,
      title: "🎉 Série Completa",
      message: "The Last of Us: Temporada 1 está completa! 🧟‍♂️",
      time: "2h atrás",
    },
    {
      id: 3,
      title: "⭐ Recomendação",
      message: "Baseado no seu histórico: Oppenheimer 💥",
      time: "5h atrás",
    },
  ]

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center space-x-6">
            <button
              className={`text-sm font-medium transition-colors ${
                activeTab === "movies"
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTabChange("movies")}
            >
              {t("movies")}
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                activeTab === "tvShows"
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTabChange("tvShows")}
            >
              {t("tvShows")}
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                activeTab === "anime"
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTabChange("anime")}
            >
              {t("anime")}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search")}
              className="pl-10 pr-10 bg-secondary/50 border-0 focus-visible:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </form>

          <LanguageSwitcher />
          <ThemeToggle />

          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notificações</h3>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Ver todas as notificações
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-medium hidden md:inline-block">{currentUser.name}</span>
                <Avatar>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Trocar Usuário</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AnimatePresence>
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      className={`flex items-center gap-2 cursor-pointer ${
                        user.id === currentUser.id ? "bg-accent/10 text-accent" : ""
                      }`}
                      onClick={() => switchUser(user.id)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

