"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useTranslation } from "@/hooks/use-translation"
import { useWatchlist } from "@/hooks/use-watchlist"
import { Button } from "@/components/ui/button"
import { Play, Trash2 } from "lucide-react"
import { useToast } from "@/lib/use-toast"

export default function WatchlistPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { watchlist, removeFromWatchlist } = useWatchlist()
  const { toast } = useToast()

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
      title: `Reproduzindo ${title}`,
      duration: 2000,
    })
  }

  const handleRemove = (id: number) => {
    removeFromWatchlist(id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px]">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-6">{t("watchlist")}</h1>

            {watchlist.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg">
                <h2 className="text-xl font-medium mb-2">Sua lista de espera está vazia</h2>
                <p className="text-muted-foreground mb-4">Adicione filmes, séries e animes para assistir mais tarde</p>
                <Button onClick={() => window.history.back()}>Explorar conteúdo</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-card rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="relative h-48">
                      {/* <img
                        src={item.poster || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-300 text-sm">
                          {item.type === "movie" ? "Filme" : item.type === "tvshow" ? "Série" : "Anime"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-4">Adicionado em: {formatDate(item.addedAt)}</p>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => handlePlay(item.title)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {t("watch")}
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleRemove(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

