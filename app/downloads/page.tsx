"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Play, Download, Trash2, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/lib/use-toast"

export default function DownloadsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { toast } = useToast()
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "The Last of Us - S01E09",
      type: "tvshow",
      poster: "/placeholder.svg?height=200&width=350&text=TLOU",
      downloadedAt: "2024-03-09T14:30:00Z",
      status: "completed",
      progress: 100,
      size: "1.2 GB",
    },
    {
      id: 2,
      title: "Duna: Parte 2",
      type: "movie",
      poster: "/placeholder.svg?height=200&width=350&text=Duna",
      downloadedAt: "2024-03-08T20:15:00Z",
      status: "completed",
      progress: 100,
      size: "2.8 GB",
    },
    {
      id: 3,
      title: "Attack on Titan - S04E12",
      type: "anime",
      poster: "/placeholder.svg?height=200&width=350&text=AOT",
      downloadedAt: null,
      status: "downloading",
      progress: 65,
      size: "850 MB",
    },
    {
      id: 4,
      title: "The Crown - S05E01",
      type: "tvshow",
      poster: "/placeholder.svg?height=200&width=350&text=Crown",
      downloadedAt: null,
      status: "queued",
      progress: 0,
      size: "1.5 GB",
    },
  ])

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simular progresso de download
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) =>
        prev.map((download) => {
          if (download.status === "downloading" && download.progress < 100) {
            const newProgress = Math.min(download.progress + 5, 100)
            if (newProgress === 100) {
              toast({
                title: `${download.title} foi baixado com sucesso!`,
                duration: 3000,
              })
              return {
                ...download,
                progress: newProgress,
                status: "completed",
                downloadedAt: new Date().toISOString(),
              }
            }
            return { ...download, progress: newProgress }
          }
          return download
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [toast])

  if (!isLoaded) return null

  const handlePlay = (title: string) => {
    toast({
      title: `Reproduzindo ${title}`,
      duration: 2000,
    })
  }

  const handleDelete = (id: number) => {
    setDownloads((prev) => prev.filter((download) => download.id !== id))
    toast({
      title: "Download removido",
      duration: 2000,
    })
  }

  const handlePauseResume = (id: number, status: string) => {
    setDownloads((prev) =>
      prev.map((download) => {
        if (download.id === id) {
          const newStatus = status === "downloading" ? "paused" : "downloading"
          toast({
            title: `Download ${newStatus === "downloading" ? "retomado" : "pausado"}`,
            duration: 2000,
          })
          return { ...download, status: newStatus }
        }
        return download
      }),
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px]">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-6">{t("downloaded")}</h1>

            {downloads.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg">
                <h2 className="text-xl font-medium mb-2">Nenhum download</h2>
                <p className="text-muted-foreground mb-4">Você não tem nenhum download no momento</p>
                <Button onClick={() => window.history.back()}>Explorar conteúdo</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {downloads.map((download, index) => (
                  <motion.div
                    key={download.id}
                    className="bg-card rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/4 h-40">
                        <img
                          src={download.poster || "/placeholder.svg"}
                          alt={download.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{download.title}</h3>
                            <div className="flex items-center gap-2">
                              {download.status === "completed" && (
                                <span className="flex items-center text-xs text-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Concluído
                                </span>
                              )}
                              {download.status === "downloading" && (
                                <span className="flex items-center text-xs text-blue-500">
                                  <Download className="h-3 w-3 mr-1" />
                                  Baixando
                                </span>
                              )}
                              {download.status === "paused" && (
                                <span className="flex items-center text-xs text-yellow-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pausado
                                </span>
                              )}
                              {download.status === "queued" && (
                                <span className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Na fila
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">{download.size}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {download.status === "completed"
                              ? `Baixado em: ${formatDate(download.downloadedAt)}`
                              : `Progresso: ${download.progress}%`}
                          </p>

                          {download.status !== "completed" && (
                            <Progress value={download.progress} className="h-2 mb-4" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {download.status === "completed" && (
                            <Button
                              className="bg-accent hover:bg-accent/90 text-accent-foreground"
                              onClick={() => handlePlay(download.title)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Assistir
                            </Button>
                          )}

                          {(download.status === "downloading" || download.status === "paused") && (
                            <Button variant="outline" onClick={() => handlePauseResume(download.id, download.status)}>
                              {download.status === "downloading" ? "Pausar" : "Retomar"}
                            </Button>
                          )}

                          <Button variant="destructive" onClick={() => handleDelete(download.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                          </Button>
                        </div>
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

