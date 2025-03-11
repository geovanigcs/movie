"use client"

import { motion } from "framer-motion"
import { ChevronRight, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"
import { useState } from "react"
import { useToast } from "@/lib/use-toast"

export default function ContinueWatching() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [items, setItems] = useState([
    {
      id: 1,
      title: "WandaVision",
      image: "/placeholder.svg?height=150&width=250&text=WandaVision",
      progress: 80,
      episode: 1,
      episodesLeft: "left",
    },
    {
      id: 2,
      title: "Rick and Morty",
      image: "/placeholder.svg?height=150&width=250&text=Rick+and+Morty",
      progress: 45,
      episode: 3,
      episodesLeft: "left",
    },
    {
      id: 3,
      title: "The Last of Us",
      image: "/placeholder.svg?height=150&width=250&text=TLOU",
      progress: 65,
      episode: 2,
      episodesLeft: "left",
    },
  ])

  const handlePlay = (title: string) => {
    toast({
      title: `Continuando ${title}`,
      duration: 2000,
    })
  }

  const handleDrop = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Removido da lista de continuação",
      duration: 2000,
    })
  }

  return (
    <div className="bg-card rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{t("continue")}</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          {t("seeMore")}
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="relative rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full aspect-video object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
              <h3 className="font-medium text-sm text-white mb-1">{item.title}</h3>
              <p className="text-xs text-gray-300 mb-2">
                {item.episode} {t("episode")} {t("left")}
              </p>

              <Progress value={item.progress} className="h-1 bg-gray-700" />

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-8"
                  onClick={() => handlePlay(item.title)}
                >
                  <Play className="mr-1 h-3 w-3" />
                  {t("watch")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs h-8 border-gray-700 hover:bg-card/80"
                  onClick={() => handleDrop(item.id)}
                >
                  <X className="mr-1 h-3 w-3" />
                  {t("drop")}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

