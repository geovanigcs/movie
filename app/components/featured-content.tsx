"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Plus, Bookmark, Play } from "lucide-react"
import { useTranslation } from "@/lib/use-translation"
import { useWatchlist } from "@/lib/use-watchlist"
import gsap from "gsap"
import type { Movie, TVShow, Anime } from "@/lib/use-api"
import { useToast } from "@/lib/use-toast"

type FeaturedContentProps = {
  item: Movie | TVShow | Anime
  type: "movie" | "tvshow" | "anime"
}

export default function FeaturedContent({ item, type }: FeaturedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist()
  const { toast } = useToast()

  // Efeito de paralax com framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Efeito de neon com GSAP
  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.to(".neon-button", {
      boxShadow: "0 0 15px #00b9ae, 0 0 30px rgba(0, 185, 174, 0.3)",
      duration: 2,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
    }
  }, [])

  const handlePlay = () => {
    toast({
      title: `Reproduzindo ${getTitle()}`,
      duration: 2000,
    })
  }

  const handleWatchlist = () => {
    const contentItem = {
      id: item.id,
      title: getTitle(),
      type: type,
      poster: getImage(),
    }

    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id)
    } else {
      addToWatchlist(contentItem)
    }
  }

  // Funções auxiliares para lidar com diferentes tipos de itens
  const getTitle = () => {
    if (type === "tvshow") {
      return (item as TVShow).name
    } else if (type === "movie") {
      return (item as Movie).title
    } else {
      return (item as Anime).title
    }
  }

  const getImage = () => {
    if (type === "tvshow" || type === "movie") {
      const path = (item as TVShow | Movie).backdrop_path
      return path.startsWith("/placeholder") ? path : `https://image.tmdb.org/t/p/original${path}`
    } else {
      return (item as Anime).cover_image
    }
  }

  const getDescription = () => {
    if (type === "tvshow" || type === "movie") {
      return (item as TVShow | Movie).overview
    } else {
      return (item as Anime).description
    }
  }

  const getGenres = () => {
    if (type === "anime") {
      return (item as Anime).genres.slice(0, 2).join(", ")
    } else {
      // Para filmes e séries, usamos IDs de gênero
      const genreNames = (item as Movie | TVShow).genre_ids.slice(0, 2).map((id) => getGenreName(id))
      return genreNames.join(", ")
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[500px] rounded-xl overflow-hidden my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
        <img src={getImage() || "/placeholder.svg"} alt={getTitle()} className="w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-20 h-full flex flex-col justify-end p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">{getTitle()}</h1>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mb-4">{getDescription()}</p>

        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-sm">{getGenres()}</span>
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-sm">{type === "movie" ? "Filme" : type === "tvshow" ? "Série" : "Anime"}</span>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="neon-button bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handlePlay}>
            <Play className="mr-2 h-4 w-4" />
            {t("watchNow")}
          </Button>
          <Button variant="outline" onClick={handleWatchlist}>
            {isInWatchlist(item.id) ? (
              <>
                <Bookmark className="mr-2 h-4 w-4 fill-accent text-accent" />
                Remover
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {t("watchlist")}
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
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

