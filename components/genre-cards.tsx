"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Star } from "lucide-react"
import { useMovies, useTVShows, useAnimes } from "@/hooks/use-api"
import { Skeleton } from "@/components/ui/skeleton"

export default function GenreCards({ genre }: { genre: string }) {
  const { t } = useTranslation()
  const { movies, loading: moviesLoading } = useMovies()
  const { tvShows, loading: tvShowsLoading } = useTVShows()
  const { animes, loading: animesLoading } = useAnimes()
  const [activeTab, setActiveTab] = useState("movies")

  // Função para obter o ID do gênero a partir do nome
  const getGenreId = (genreName: string): number => {
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

  // Filtrar conteúdo por gênero
  const filteredMovies = movies
    .filter((movie) => movie.genre_ids.includes(getGenreId(genre)))
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path.startsWith("/placeholder")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A",
    }))

  const filteredTVShows = tvShows
    .filter((show) => show.genre_ids.includes(getGenreId(genre)))
    .map((show) => ({
      id: show.id,
      title: show.name,
      image: show.poster_path.startsWith("/placeholder")
        ? show.poster_path
        : `https://image.tmdb.org/t/p/w300${show.poster_path}`,
      rating: show.vote_average,
      year: show.first_air_date ? new Date(show.first_air_date).getFullYear() : "N/A",
    }))

  const filteredAnimes = animes
    .filter((anime) => anime.genres.includes(genre))
    .map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      rating: anime.score,
      year: anime.start_date ? new Date(anime.start_date).getFullYear() : "N/A",
    }))

  const isLoading = moviesLoading || tvShowsLoading || animesLoading

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{genre}</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          {t("seeMore")}
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 w-[300px]">
          <TabsTrigger value="movies">{t("movies")}</TabsTrigger>
          <TabsTrigger value="tvshows">{t("tvShows")}</TabsTrigger>
          <TabsTrigger value="anime">Anime</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[250px] rounded-lg" />
              ))}
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.slice(0, 10).map((movie) => (
                <Card key={movie.id} className="overflow-hidden optimize-gpu">
                  <CardContent className="p-0 relative">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white text-sm">{movie.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-white">{movie.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-300">
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhum filme de {genre} encontrado</div>
          )}
        </TabsContent>

        <TabsContent value="tvshows">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[250px] rounded-lg" />
              ))}
            </div>
          ) : filteredTVShows.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredTVShows.slice(0, 10).map((show) => (
                <Card key={show.id} className="overflow-hidden optimize-gpu">
                  <CardContent className="p-0 relative">
                    <img
                      src={show.image || "/placeholder.svg"}
                      alt={show.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white text-sm">{show.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-white">{show.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-300">
                        <span>{show.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhuma série de {genre} encontrada</div>
          )}
        </TabsContent>

        <TabsContent value="anime">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[250px] rounded-lg" />
              ))}
            </div>
          ) : filteredAnimes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAnimes.slice(0, 10).map((anime) => (
                <Card key={anime.id} className="overflow-hidden optimize-gpu">
                  <CardContent className="p-0 relative">
                    <img
                      src={anime.image || "/placeholder.svg"}
                      alt={anime.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white text-sm">{anime.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-white">{anime.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-300">
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhum anime de {genre} encontrado</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

