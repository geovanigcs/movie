"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, Star, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useToast } from "@/lib/use-toast"

type ContentItem = {
  id: number
  title: string
  image: string
  rating: number
  episodes: number
  genre: string
}

type ContentRowProps = {
  title: string
  items: ContentItem[]
}

export default function ContentRow({ title, items }: ContentRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist()
  const { toast } = useToast()

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return

    const { scrollLeft, clientWidth } = rowRef.current
    const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

    rowRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    })
  }

  const handleWatchlist = (item: ContentItem) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id)
    } else {
      addToWatchlist({
        id: item.id,
        title: item.title,
        type: title.toLowerCase().includes("anime") ? "anime" : "tvshow",
        poster: item.image,
      })
    }
  }

  const handlePlay = (item: ContentItem) => {
    toast({
      title: `Reproduzindo ${item.title}`,
      duration: 2000,
    })
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div ref={rowRef} className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex-shrink-0 w-[250px] rounded-lg overflow-hidden"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full aspect-[2/3] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-white">{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>
                    {item.episodes} {item.episodes === 1 ? t("episode") : t("episodes")}
                  </span>
                  <span>{item.genre}</span>
                </div>

                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex gap-2"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => handlePlay(item)}
                    >
                      {t("watch")}
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="flex-shrink-0"
                      onClick={() => handleWatchlist(item)}
                    >
                      {isInWatchlist(item.id) ? (
                        <Bookmark className="h-4 w-4 fill-accent text-accent" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

