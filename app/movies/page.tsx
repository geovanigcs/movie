"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import FeaturedContent from "@/app/components/featured-content"
import ContentRow from "@/app/components/content-row"
import { useTranslation } from "@/lib/use-translation"
import { useMovies } from "@/lib/use-api"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function MoviesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useTranslation()
  const { movies, loading } = useMovies()

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

  // Group movies by genres
  const actionMovies = movies
    .filter((movie) => movie.genre_ids.includes(28))
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: "Ação",
    }))

  const dramaMovies = movies
    .filter((movie) => movie.genre_ids.includes(18))
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: "Drama",
    }))

  const scifiMovies = movies
    .filter((movie) => movie.genre_ids.includes(878))
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: "Ficção Científica",
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
            <FeaturedContent item={movies[0]} type="movie" />
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
                title={t("popular")}
                items={movies.slice(0, 5).map((movie) => ({
                  id: movie.id,
                  title: movie.title,
                  image: movie.poster_path.startsWith("/placeholder")
                    ? movie.poster_path
                    : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                  rating: movie.vote_average,
                  episodes: 1,
                  genre: getGenreName(movie.genre_ids[0]),
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
              <ContentRow title="Ação" items={actionMovies} />
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
              <ContentRow title="Drama" items={dramaMovies} />
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
              <ContentRow title="Ficção Científica" items={scifiMovies} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Helper function to get genre name from ID
function getGenreName(genreId: number): string {
  const genres: Record<number, string> = {
    28: "Ação",
    12: "Aventura",
    16: "Animação",
    35: "Comédia",
    80: "Crime",
    99: "Documentário",
    18: "Drama",
    10751: "Família",
    14: "Fantasia",
    36: "História",
    27: "Terror",
    10402: "Música",
    9648: "Mistério",
    10749: "Romance",
    878: "Ficção Científica",
    10770: "Cinema TV",
    53: "Thriller",
    10752: "Guerra",
    37: "Faroeste",
  }

  return genres[genreId] || "Desconhecido"
}

