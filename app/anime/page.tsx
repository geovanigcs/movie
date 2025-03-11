"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import FeaturedContent from "@/app/components/featured-content"
import ContentRow from "@/app/components/content-row"
// import { useTranslation } from "@/lib/use-translation"
import { useAnimes } from "@/lib/use-api"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function AnimePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  // const { t } = useTranslation()
  const { animes, loading } = useAnimes()

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading skeleton during SSR and initial client render
  if (!isMounted || !isLoaded) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="fixed h-screen bg-card border-r flex-shrink-0 w-[248px]" />
        <main className="flex-1 overflow-x-hidden pl-[248px]">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4 h-16" />
          <div className="px-4 md:px-6 pb-8">
            <Skeleton className="h-[500px] rounded-xl my-6" />
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Group animes by genres
  const actionAnimes = animes
    .filter((anime) => anime.genres.includes("Ação"))
    .map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 24) + 12,
      genre: "Ação",
    }))

  const fantasyAnimes = animes
    .filter((anime) => anime.genres.includes("Fantasia"))
    .map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 24) + 12,
      genre: "Fantasia",
    }))

  const comedyAnimes = animes
    .filter((anime) => anime.genres.includes("Comédia"))
    .map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 24) + 12,
      genre: "Comédia",
    }))

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px]">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          {loading ? (
            <div className="h-[500px] rounded-xl my-6 bg-card/50 animate-pulse" />
          ) : (
            <FeaturedContent item={animes[0]} type="anime" />
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {loading ? (
              <div className="my-8 space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow
                title="Populares"
                items={animes.slice(0, 5).map((anime) => ({
                  id: anime.id,
                  title: anime.title,
                  image: anime.image,
                  rating: anime.score,
                  episodes: Math.floor(Math.random() * 24) + 12,
                  genre: anime.genres[0],
                }))}
              />
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {loading ? (
              <div className="my-8 space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow title="Ação" items={actionAnimes} />
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            {loading ? (
              <div className="my-8 space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow title="Fantasia" items={fantasyAnimes} />
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            {loading ? (
              <div className="my-8 space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow title="Comédia" items={comedyAnimes} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

