"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { useTranslation } from "@/lib/use-translation"
import { useRouter } from "next/navigation"

export default function GenreSection() {
  const { t } = useTranslation()
  const router = useRouter()

  const genres = [
    {
      id: 1,
      name: "drama",
      image: "/placeholder.svg?height=200&width=300&text=Drama",
    },
    {
      id: 2,
      name: "comedy",
      image: "/placeholder.svg?height=200&width=300&text=Comedy",
    },
    {
      id: 3,
      name: "action",
      image: "/placeholder.svg?height=200&width=300&text=Action",
    },
    {
      id: 4,
      name: "horror",
      image: "/placeholder.svg?height=200&width=300&text=Horror",
    },
    {
      id: 5,
      name: "fantasy",
      image: "/placeholder.svg?height=200&width=300&text=Fantasy",
    },
    {
      id: 6,
      name: "superhero",
      image: "/placeholder.svg?height=200&width=300&text=Superhero",
    },
    {
      id: 7,
      name: "romance",
      image: "/placeholder.svg?height=200&width=300&text=Romance",
    },
    {
      id: 8,
      name: "sci-fi",
      image: "/placeholder.svg?height=200&width=300&text=Sci-Fi",
    },
  ]

  const handleGenreClick = (genre: string) => {
    router.push(`/genre/${genre}`)
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{t("genres")}</h2>
        <Button variant="ghost" size="sm">
          {t("seeMore")}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {genres.slice(0, 8).map((genre, index) => (
          <motion.div
            key={genre.id}
            className="relative rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleGenreClick(genre.name)}
          >
            <img
              src={genre.image || "/placeholder.svg"}
              alt={t(genre.name)}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white font-bold text-lg">{t(genre.name)}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

