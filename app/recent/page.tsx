"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"
import { useToast } from "@/lib/use-toast"

export default function RecentPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { toast } = useToast()
  const [recentItems, setRecentItems] = useState([
    {
      id: 1,
      title: "The Last of Us",
      type: "tvshow",
      poster: "/placeholder.svg?height=200&width=350&text=TLOU",
      watchedAt: "2024-03-09T14:30:00Z",
      progress: 75,
    },
    {
      id: 2,
      title: "Duna: Parte 2",
      type: "movie",
      poster: "/placeholder.svg?height=200&width=350&text=Duna",
      watchedAt: "2024-03-08T20:15:00Z",
      progress: 100,
    },
    {
      id: 3,
      title: "Attack on Titan",
      type: "anime",
      poster: "/placeholder.svg?height=200&width=350&text=AOT",
      watchedAt: "2024-03-07T18:45:00Z",
      progress: 60,
    },
    {
      id: 4,
      title: "The Crown",
      type: "tvshow",
      poster: "/placeholder.svg?height=200&width=350&text=Crown",
      watchedAt: "2024-03-06T21:20:00Z",
      progress: 90,
    },
    {
      id: 5,
      title: "Oppenheimer",
      type: "movie",
      poster: "/placeholder.svg?height=200&width=350&text=Oppenheimer",
      watchedAt: "2024-03-05T19:30:00Z",
      progress: 100,
    },
  ])

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  const handlePlay = (title: string) => {
    toast({
      title: `Continuando ${title}`,
      duration: 2000,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Hoje"
    } else if (diffDays === 1) {
      return "Ontem"
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`
    } else {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px]">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-6">{t("recent")}</h1>

            <div className="space-y-4">
              {recentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-card rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3 h-48">
                      <img
                        src={item.poster || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-300 text-sm">
                          {item.type === "movie" ? "Filme" : item.type === "tvshow" ? "Série" : "Anime"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Assistido: {formatDate(item.watchedAt)}</p>
                        </div>

                        <div className="w-full bg-secondary h-2 rounded-full mb-4">
                          <div className="bg-accent h-full rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>

                        <p className="text-sm mb-4">
                          {item.progress === 100 ? "Concluído" : `${item.progress}% assistido`}
                        </p>
                      </div>

                      <Button
                        className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => handlePlay(item.title)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {item.progress === 100 ? "Assistir novamente" : "Continuar"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

