"use client"

import { useState, useEffect } from "react"

// Tipos para os dados da API
export type Movie = {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date: string
  genre_ids: number[]
}

export type TVShow = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  first_air_date: string
  genre_ids: number[]
}

export type Anime = {
  id: number
  title: string
  image: string
  cover_image: string
  score: number
  description: string
  start_date: string
  genres: string[]
}

export type Genre = {
  id: number
  name: string
}

// Hook para buscar filmes populares
export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=b3e9e2d3fbcf25dbb5dbc34a7d51bc58&language=pt-BR",
        )
        if (!response.ok) {
          throw new Error("Falha ao buscar filmes")
        }
        const data = await response.json()
        setMovies(data.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
        // Dados de fallback em caso de erro
        setMovies(fallbackMovies)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}

// Hook para buscar séries populares
export function useTVShows() {
  const [tvShows, setTVShows] = useState<TVShow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/popular?api_key=b3e9e2d3fbcf25dbb5dbc34a7d51bc58&language=pt-BR",
        )
        if (!response.ok) {
          throw new Error("Falha ao buscar séries")
        }
        const data = await response.json()
        setTVShows(data.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
        // Dados de fallback em caso de erro
        setTVShows(fallbackTVShows)
      } finally {
        setLoading(false)
      }
    }

    fetchTVShows()
  }, [])

  return { tvShows, loading, error }
}

// Hook para buscar animes populares (usando dados fictícios)
export function useAnimes() {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulando uma chamada de API
    const fetchAnimes = async () => {
      try {
        setLoading(true)
        // Simulando um delay de rede
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnimes(fallbackAnimes)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchAnimes()
  }, [])

  return { animes, loading, error }
}

// Dados de fallback para quando a API falhar
const fallbackMovies: Movie[] = [
  {
    id: 1,
    title: "Duna: Parte 2",
    poster_path: "/placeholder.svg?height=400&width=300&text=Duna",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Duna",
    vote_average: 8.5,
    overview:
      "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.",
    release_date: "2024-03-01",
    genre_ids: [878, 12],
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster_path: "/placeholder.svg?height=400&width=300&text=Oppenheimer",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Oppenheimer",
    vote_average: 8.2,
    overview:
      "A história do cientista americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
    release_date: "2023-07-21",
    genre_ids: [18, 36],
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    poster_path: "/placeholder.svg?height=400&width=300&text=Deadpool",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Deadpool",
    vote_average: 7.9,
    overview:
      "Deadpool precisa convencer Wolverine a sair da aposentadoria para uma aventura que vai abalar o Universo Marvel.",
    release_date: "2024-07-26",
    genre_ids: [28, 12, 35],
  },
  {
    id: 4,
    title: "Coringa: Delírio a Dois",
    poster_path: "/placeholder.svg?height=400&width=300&text=Coringa",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Coringa",
    vote_average: 7.5,
    overview: "Arthur Fleck está internado em Arkham quando se apaixona por uma paciente chamada Harley Quinn.",
    release_date: "2024-10-04",
    genre_ids: [80, 18, 53],
  },
  {
    id: 5,
    title: "Gladiador 2",
    poster_path: "/placeholder.svg?height=400&width=300&text=Gladiador",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Gladiador",
    vote_average: 8.0,
    overview:
      "A continuação do épico de 2000 segue a história de Lucius, sobrinho de Commodus, anos após os eventos do primeiro filme.",
    release_date: "2024-11-22",
    genre_ids: [28, 12, 36],
  },
]

const fallbackTVShows: TVShow[] = [
  {
    id: 1,
    name: "The Last of Us",
    poster_path: "/placeholder.svg?height=400&width=300&text=TLOU",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=TLOU",
    vote_average: 8.7,
    overview:
      "Vinte anos após a queda da civilização, Joel é contratado para tirar Ellie de uma zona de quarentena opressiva.",
    first_air_date: "2023-01-15",
    genre_ids: [18, 27, 10765],
  },
  {
    id: 2,
    name: "House of the Dragon",
    poster_path: "/placeholder.svg?height=400&width=300&text=HOTD",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=HOTD",
    vote_average: 8.4,
    overview: "A história da Casa Targaryen 200 anos antes dos eventos de Game of Thrones.",
    first_air_date: "2022-08-21",
    genre_ids: [10765, 18, 10759],
  },
  {
    id: 3,
    name: "Stranger Things",
    poster_path: "/placeholder.svg?height=400&width=300&text=ST",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=ST",
    vote_average: 8.6,
    overview:
      "Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais e uma garotinha estranha.",
    first_air_date: "2016-07-15",
    genre_ids: [18, 10765, 9648],
  },
  {
    id: 4,
    name: "The Crown",
    poster_path: "/placeholder.svg?height=400&width=300&text=Crown",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Crown",
    vote_average: 8.3,
    overview: "A saga da família real britânica durante o reinado da Rainha Elizabeth II.",
    first_air_date: "2016-11-04",
    genre_ids: [18, 36],
  },
  {
    id: 5,
    name: "The Boys",
    poster_path: "/placeholder.svg?height=400&width=300&text=Boys",
    backdrop_path: "/placeholder.svg?height=500&width=1000&text=Boys",
    vote_average: 8.5,
    overview: "Um grupo de vigilantes combate super-heróis que abusam de seus superpoderes.",
    first_air_date: "2019-07-26",
    genre_ids: [10765, 10759, 18],
  },
]

const fallbackAnimes: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/placeholder.svg?height=400&width=300&text=AOT",
    cover_image: "/placeholder.svg?height=500&width=1000&text=AOT",
    score: 9.0,
    description:
      "Em um mundo onde a humanidade vive dentro de cidades cercadas por enormes muralhas devido à ameaça dos Titãs, gigantes devoradores de humanos.",
    start_date: "2013-04-07",
    genres: ["Ação", "Drama", "Fantasia"],
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/placeholder.svg?height=400&width=300&text=DS",
    cover_image: "/placeholder.svg?height=500&width=1000&text=DS",
    score: 8.7,
    description:
      "Tanjiro Kamado e seus amigos do Demon Slayer Corps acompanham Kyojuro Rengoku, o Flame Hashira, para investigar um misterioso desaparecimento de pessoas dentro de um trem.",
    start_date: "2019-04-06",
    genres: ["Ação", "Fantasia", "Aventura"],
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/placeholder.svg?height=400&width=300&text=JJK",
    cover_image: "/placeholder.svg?height=500&width=1000&text=JJK",
    score: 8.6,
    description:
      "Yuji Itadori é um estudante do ensino médio que vive em Sendai com seu avô. Ele evita regularmente a equipe de pista devido à sua aversão ao atletismo, apesar de seu talento inato para o esporte.",
    start_date: "2020-10-03",
    genres: ["Ação", "Sobrenatural", "Horror"],
  },
  {
    id: 4,
    title: "One Piece",
    image: "/placeholder.svg?height=400&width=300&text=OP",
    cover_image: "/placeholder.svg?height=500&width=1000&text=OP",
    score: 8.9,
    description:
      "Segue as aventuras de Monkey D. Luffy e sua tripulação para encontrar o maior tesouro já deixado pelo lendário Pirata, Gold Roger. O famoso tesouro conhecido como 'One Piece'.",
    start_date: "1999-10-20",
    genres: ["Ação", "Aventura", "Comédia"],
  },
  {
    id: 5,
    title: "My Hero Academia",
    image: "/placeholder.svg?height=400&width=300&text=MHA",
    cover_image: "/placeholder.svg?height=500&width=1000&text=MHA",
    score: 8.4,
    description:
      "Em um mundo onde as pessoas com superpoderes são comuns, um menino sem poderes sonha em se tornar um super-herói.",
    start_date: "2016-04-03",
    genres: ["Ação", "Comédia", "Super-herói"],
  },
]

