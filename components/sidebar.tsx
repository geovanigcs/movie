"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Home,
  Compass,
  Award,
  Users,
  Clock,
  Star,
  Download,
  List,
  Bookmark,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter, usePathname } from "next/navigation"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useToast } from "@/lib/use-toast"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const { t } = useTranslation()
  const isMobile = useMobile()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { watchlistCount } = useWatchlist()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const showToast = (message: string) => {
    toast({
      title: message,
      duration: 2000,
    })
  }

  const sidebarVariants = {
    open: {
      x: 0,
      width: isMobile ? "248px" : "248px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: isMobile ? -248 : 0,
      width: isMobile ? 0 : "72px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  // Função para verificar se um caminho está ativo
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <motion.div
        className={cn(
          "fixed h-screen bg-card border-r flex-shrink-0 overflow-hidden",
          isMobile ? "left-0 top-0 z-40" : "left-0 top-0 z-10",
        )}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              className="text-xl font-bold neon-text cursor-pointer"
              animate={{ opacity: isOpen || !isMobile ? 1 : 0 }}
              onClick={() => handleNavigation("/")}
            >
              GIGIO'S<span className="text-accent">MOVIES</span>
            </motion.h1>

            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-2">
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
            <div>
              <h2
                className={cn(
                  "text-xs uppercase text-muted-foreground font-medium mb-2 transition-opacity",
                  !isOpen && !isMobile && "opacity-0",
                )}
              >
                {t("menu")}
              </h2>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Home}
                  label={t("home")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/")}
                  onClick={() => handleNavigation("/")}
                />
                <SidebarItem
                  icon={Compass}
                  label={t("discover")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/discover")}
                  onClick={() => handleNavigation("/discover")}
                />
                <SidebarItem
                  icon={Award}
                  label={t("awards")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/awards")}
                  onClick={() => showToast("Prêmios em breve!")}
                />
                <SidebarItem
                  icon={Users}
                  label={t("celebrities")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/celebrities")}
                  onClick={() => showToast("Celebridades em breve!")}
                />
              </nav>
            </div>

            <div>
              <h2
                className={cn(
                  "text-xs uppercase text-muted-foreground font-medium mb-2 transition-opacity",
                  !isOpen && !isMobile && "opacity-0",
                )}
              >
                {t("library")}
              </h2>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Clock}
                  label={t("recent")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/recent")}
                  onClick={() => handleNavigation("/recent")}
                />
                <SidebarItem
                  icon={Star}
                  label={t("topRated")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/top-rated")}
                  onClick={() => handleNavigation("/top-rated")}
                />
                <SidebarItem
                  icon={Download}
                  label={t("downloaded")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/downloads")}
                  onClick={() => handleNavigation("/downloads")}
                />
                <SidebarItem
                  icon={List}
                  label={t("playlists")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/playlists")}
                  onClick={() => showToast("Playlists em breve!")}
                />
                <SidebarItem
                  icon={Bookmark}
                  label={t("watchlist")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/watchlist")}
                  badge={watchlistCount > 0 ? watchlistCount.toString() : undefined}
                  onClick={() => handleNavigation("/watchlist")}
                />
                <SidebarItem
                  icon={CheckSquare}
                  label={t("completed")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/completed")}
                  onClick={() => showToast("Concluídos em breve!")}
                />
              </nav>
            </div>

            <div className="mt-auto">
              <h2
                className={cn(
                  "text-xs uppercase text-muted-foreground font-medium mb-2 transition-opacity",
                  !isOpen && !isMobile && "opacity-0",
                )}
              >
                {t("general")}
              </h2>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Settings}
                  label={t("settings")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/settings")}
                  onClick={() => handleNavigation("/settings")}
                />
                <SidebarItem
                  icon={LogOut}
                  label={t("logOut")}
                  isOpen={isOpen || isMobile}
                  isActive={isActive("/logout")}
                  onClick={() => showToast("Sessão encerrada!")}
                />
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  isOpen,
  isActive,
  badge,
  onClick,
}: {
  icon: React.ElementType
  label: string
  isOpen: boolean
  isActive?: boolean
  badge?: string
  onClick?: () => void
}) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn("w-full justify-start relative", isActive && "bg-accent/10 text-accent hover:bg-accent/20")}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", isActive && "text-accent")} />
      {isOpen && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-3">
          {label}
        </motion.span>
      )}
      {badge && isOpen && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </Button>
  )
}

