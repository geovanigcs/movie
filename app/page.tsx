"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import FeaturedContent from "@/app/components/featured-content"
import ContentRow from "@/app/components/content-row"
import ContinueWatching from "@/app/components/continue-watching"
import GenreSection from "@/app/components/genre-section"
import { useTranslation } from "@/lib/use-translation"
import { useMovies, useTVShows, useAnimes } from "@/lib/use-api"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { movies, loading: moviesLoading } = useMovies()
  const { tvShows, loading: tvShowsLoading } = useTVShows()
  const { animes, loading: animesLoading } = useAnimes()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Show a minimal loading state
  if (!isLoaded)
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden pl-[248px] relative z-10">
          <Header />
          <div className="px-4 md:px-6 pb-8 pt-8">
            <Skeleton className="h-[500px] rounded-xl my-6" />
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
              ))}
            </div>
          </div>
        </main>
      </div>
    )

  // Format data for components
  const popularItems = tvShows.slice(0, 5).map((show) => ({
    id: show.id,
    title: show.name,
    image: show.poster_path.startsWith("/placeholder")
      ? show.poster_path
      : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
    rating: show.vote_average,
    episodes: Math.floor(Math.random() * 20) + 5,
    genre: getGenreName(show.genre_ids[0]),
  }))

  const trendingItems = movies.slice(0, 5).map((movie) => ({
    id: movie.id,
    title: movie.title,
    image: movie.poster_path.startsWith("/placeholder")
      ? movie.poster_path
      : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
    rating: movie.vote_average,
    episodes: 1,
    genre: getGenreName(movie.genre_ids[0]),
  }))

  const animeItems = animes.slice(0, 5).map((anime) => ({
    id: anime.id,
    title: anime.title,
    image: anime.image,
    rating: anime.score,
    episodes: Math.floor(Math.random() * 24) + 12,
    genre: anime.genres[0],
  }))

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px] relative z-10">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          {tvShowsLoading ? (
            <Skeleton className="h-[500px] rounded-xl my-6" />
          ) : (
            <FeaturedContent item={tvShows[0]} type="tvshow" />
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {tvShowsLoading ? (
              <div className="my-8">
                <Skeleton className="h-8 w-64 mb-4" />
                <div className="flex gap-4 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow title={t("popular")} items={popularItems} />
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {moviesLoading ? (
                  <div className="my-8">
                    <Skeleton className="h-8 w-64 mb-4" />
                    <div className="flex gap-4 overflow-hidden">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <ContentRow title={t("trending")} items={trendingItems} />
                )}
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              <ContinueWatching />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            {animesLoading ? (
              <div className="my-8">
                <Skeleton className="h-8 w-64 mb-4" />
                <div className="flex gap-4 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <ContentRow title="Anime" items={animeItems} />
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <GenreSection />
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
    10759: "Ação & Aventura",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasia",
    10766: "Soap",
    10767: "Talk",
    10768: "Guerra & Política",
  }
  return genres[genreId] || "Desconhecido"
}

