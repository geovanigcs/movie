"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import ContentRow from "@/components/content-row"
import { useTranslation } from "@/hooks/use-translation"
import { useMovies, useTVShows, useAnimes } from "@/hooks/use-api"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sliders } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function DiscoverPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { movies, loading: moviesLoading } = useMovies()
  const { tvShows, loading: tvShowsLoading } = useTVShows()
  const { animes, loading: animesLoading } = useAnimes()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeSort, setActiveSort] = useState<string>("popular")

  // Extended genre lists for more content variety
  const genres = [
    "Ação",
    "Aventura",
    "Animação",
    "Comédia",
    "Crime",
    "Documentário",
    "Drama",
    "Família",
    "Fantasia",
    "História",
    "Terror",
    "Música",
    "Mistério",
    "Romance",
    "Ficção Científica",
    "Thriller",
    "Guerra",
    "Faroeste",
  ]

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  // Filmes "Trending" - pegamos todos os filmes e dobramos a lista para mais conteúdo
  const trendingMovies = [
    ...movies,
    ...movies.slice(0, 10).map((movie) => ({
      ...movie,
      id: movie.id + 1000, // Adicionamos um offset para evitar IDs duplicados
    })),
  ]
    .slice(0, 20)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: getGenreName(movie.genre_ids[0]),
    }))

  // Séries "Em Alta" - pegamos todas as séries e dobramos a lista
  const trendingShows = [
    ...tvShows,
    ...tvShows.slice(0, 10).map((show) => ({
      ...show,
      id: show.id + 2000, // Adicionamos um offset para evitar IDs duplicados
    })),
  ]
    .slice(0, 20)
    .map((show) => ({
      id: show.id,
      title: show.name,
      image: show.poster_path.startsWith("/placeholder")
        ? show.poster_path
        : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
      rating: show.vote_average,
      episodes: Math.floor(Math.random() * 20) + 5,
      genre: getGenreName(show.genre_ids[0]),
    }))

  // Animes "Populares" - dobramos a lista de animes
  const popularAnimes = [
    ...animes,
    ...animes.slice(0, 10).map((anime) => ({
      ...anime,
      id: anime.id + 3000, // Adicionamos um offset para evitar IDs duplicados
    })),
  ]
    .slice(0, 20)
    .map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 24) + 12,
      genre: anime.genres[0],
    }))

  // Filme por gêneros - para cada gênero, criamos uma lista de filmes
  const genreMovies: Record<string, any[]> = {}
  genres.forEach((genre) => {
    const moviesByGenre = movies
      .filter((movie) => movie.genre_ids.includes(getGenreId(genre)))
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        image: movie.poster_path.startsWith("/placeholder")
          ? movie.poster_path
          : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        rating: movie.vote_average,
        episodes: 1,
        genre,
      }))

    if (moviesByGenre.length > 0) {
      genreMovies[genre] = moviesByGenre
    }
  })

  // Séries por gêneros
  const genreShows: Record<string, any[]> = {}
  genres.forEach((genre) => {
    const showsByGenre = tvShows
      .filter((show) => show.genre_ids.includes(getGenreId(genre)))
      .map((show) => ({
        id: show.id,
        title: show.name,
        image: show.poster_path.startsWith("/placeholder")
          ? show.poster_path
          : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
        rating: show.vote_average,
        episodes: Math.floor(Math.random() * 20) + 5,
        genre,
      }))

    if (showsByGenre.length > 0) {
      genreShows[genre] = showsByGenre
    }
  })

  // Animes por gêneros
  const genreAnimes: Record<string, any[]> = {}
  genres.forEach((genre) => {
    const animesByGenre = animes
      .filter((anime) => anime.genres.includes(genre))
      .map((anime) => ({
        id: anime.id,
        title: anime.title,
        image: anime.image,
        rating: anime.score,
        episodes: Math.floor(Math.random() * 24) + 12,
        genre,
      }))

    if (animesByGenre.length > 0) {
      genreAnimes[genre] = animesByGenre
    }
  })

  // Conteúdo "Clássicos"
  const classics = [
    ...movies.slice(0, 5).map((movie) => ({
      id: movie.id + 5000,
      title: `${movie.title} (Clássico)`,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: getGenreName(movie.genre_ids[0]),
    })),
    ...tvShows.slice(0, 5).map((show) => ({
      id: show.id + 6000,
      title: `${show.name} (Clássico)`,
      image: show.poster_path.startsWith("/placeholder")
        ? show.poster_path
        : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
      rating: show.vote_average,
      episodes: Math.floor(Math.random() * 20) + 5,
      genre: getGenreName(show.genre_ids[0]),
    })),
    ...animes.slice(0, 5).map((anime) => ({
      id: anime.id + 7000,
      title: `${anime.title} (Clássico)`,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 24) + 12,
      genre: anime.genres[0],
    })),
  ]

  // "Novos Lançamentos"
  const newReleases = [
    ...movies.slice(movies.length - 5).map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      episodes: 1,
      genre: getGenreName(movie.genre_ids[0]),
    })),
    ...tvShows.slice(tvShows.length - 5).map((show) => ({
      id: show.id,
      title: show.name,
      image: show.poster_path.startsWith("/placeholder")
        ? show.poster_path
        : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
      rating: show.vote_average,
      episodes: Math.floor(Math.random() * 10) + 1,
      genre: getGenreName(show.genre_ids[0]),
    })),
    ...animes.slice(animes.length - 5).map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      episodes: Math.floor(Math.random() * 10) + 1,
      genre: anime.genres[0],
    })),
  ]

  // Funcionalidade de Busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de busca aqui
  }

  // Funcionalidade de Filtro
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px] relative z-10">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          <div className="my-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-3xl font-bold">{t("discover")}</h1>

              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-80">
                  <form onSubmit={handleSearch} className="flex w-full">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar títulos, gêneros, atores..."
                        className="pl-10 pr-4 w-full bg-secondary/50 border-0 focus-visible:ring-accent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sliders className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleFilter("Filmes")}
                    >
                      <span>Filmes</span>
                      {activeFilters.includes("Filmes") && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleFilter("Séries")}
                    >
                      <span>Séries</span>
                      {activeFilters.includes("Séries") && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleFilter("Animes")}
                    >
                      <span>Animes</span>
                      {activeFilters.includes("Animes") && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setActiveSort("popular")}
                    >
                      <span>Popularidade</span>
                      {activeSort === "popular" && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setActiveSort("recent")}
                    >
                      <span>Mais recentes</span>
                      {activeSort === "recent" && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setActiveSort("rating")}
                    >
                      <span>Melhor avaliados</span>
                      {activeSort === "rating" && <span className="text-accent">✓</span>}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                    <span className="text-xs ml-1">×</span>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setActiveFilters([])}>
                  Limpar filtros
                </Button>
              </div>
            )}

            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="trending">Em Alta</TabsTrigger>
                <TabsTrigger value="new">Novos Lançamentos</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {moviesLoading || tvShowsLoading || animesLoading ? (
                    <div className="my-8 space-y-4">
                      <Skeleton className="h-8 w-64" />
                      <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <ContentRow title="Novos Lançamentos" items={newReleases} />
                      <ContentRow
                        title="Em Alta"
                        items={[
                          ...trendingMovies.slice(0, 5),
                          ...trendingShows.slice(0, 5),
                          ...popularAnimes.slice(0, 5),
                        ]}
                      />
                      <ContentRow title="Clássicos" items={classics} />

                      {/* Filmes por gênero */}
                      {Object.entries(genreMovies)
                        .filter(([genre]) => genre !== "Desconhecido" && genreMovies[genre].length >= 3)
                        .slice(0, 4)
                        .map(([genre, items]) => (
                          <ContentRow key={`movies-${genre}`} title={`Filmes: ${genre}`} items={items} />
                        ))}

                      {/* Séries por gênero */}
                      {Object.entries(genreShows)
                        .filter(([genre]) => genre !== "Desconhecido" && genreShows[genre].length >= 3)
                        .slice(0, 4)
                        .map(([genre, items]) => (
                          <ContentRow key={`shows-${genre}`} title={`Séries: ${genre}`} items={items} />
                        ))}

                      {/* Animes por gênero */}
                      {Object.entries(genreAnimes)
                        .filter(([genre]) => genreAnimes[genre].length >= 3)
                        .slice(0, 3)
                        .map(([genre, items]) => (
                          <ContentRow key={`animes-${genre}`} title={`Animes: ${genre}`} items={items} />
                        ))}
                    </>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="trending">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {moviesLoading || tvShowsLoading || animesLoading ? (
                    <div className="my-8 space-y-4">
                      <Skeleton className="h-8 w-64" />
                      <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <ContentRow title="Filmes em Alta" items={trendingMovies} />
                      <ContentRow title="Séries em Alta" items={trendingShows} />
                      <ContentRow title="Animes Populares" items={popularAnimes} />
                    </>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="new">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {moviesLoading || tvShowsLoading || animesLoading ? (
                    <div className="my-8 space-y-4">
                      <Skeleton className="h-8 w-64" />
                      <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="h-[375px] w-[250px] flex-shrink-0" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <ContentRow title="Novos Filmes" items={newReleases.filter((item) => item.episodes === 1)} />
                      <ContentRow
                        title="Novas Séries"
                        items={newReleases.filter((item) => item.episodes > 1 && !item.title.includes("Anime"))}
                      />
                      <ContentRow
                        title="Novos Animes"
                        items={newReleases.filter((item) => item.title.includes("Anime") || item.genre === "Anime")}
                      />
                    </>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

// Função auxiliar para obter o nome do gênero a partir do ID
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

// Função auxiliar para obter o ID do gênero a partir do nome
function getGenreId(genreName: string): number {
  const genreIds: Record<string, number> = {
    Ação: 28,
    Aventura: 12,
    Animação: 16,
    Comédia: 35,
    Crime: 80,
    Documentário: 99,
    Drama: 18,
    Família: 10751,
    Fantasia: 14,
    História: 36,
    Terror: 27,
    Música: 10402,
    Mistério: 9648,
    Romance: 10749,
    "Ficção Científica": 878,
    "Cinema TV": 10770,
    Thriller: 53,
    Guerra: 10752,
    Faroeste: 37,
    "Ação & Aventura": 10759,
    Kids: 10762,
    News: 10763,
    Reality: 10764,
    "Sci-Fi & Fantasia": 10765,
    Soap: 10766,
    Talk: 10767,
    "Guerra & Política": 10768,
  }

  return genreIds[genreName] || 0
}

