"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/lib/use-toast"
import { useUser } from "@/hooks/use-user"

type WatchlistItem = {
  id: number
  title: string
  type: "movie" | "tvshow" | "anime"
  poster: string
  addedAt: string
}

type WatchlistContextType = {
  watchlist: WatchlistItem[]
  watchlistCount: number
  addToWatchlist: (item: Omit<WatchlistItem, "addedAt">) => void
  removeFromWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const { toast } = useToast()
  const { currentUser } = useUser()

  // Carregar watchlist do localStorage quando o componente montar ou o usuário mudar
  useEffect(() => {
    const savedWatchlist = localStorage.getItem(`watchlist-${currentUser.id}`)
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    } else {
      setWatchlist([])
    }
  }, [currentUser.id])

  // Salvar watchlist no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem(`watchlist-${currentUser.id}`, JSON.stringify(watchlist))
  }, [watchlist, currentUser.id])

  const addToWatchlist = (item: Omit<WatchlistItem, "addedAt">) => {
    if (!isInWatchlist(item.id)) {
      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      }
      setWatchlist((prev) => [...prev, newItem])
      toast({
        title: `${item.title} adicionado à sua lista`,
        duration: 2000,
      })
    } else {
      toast({
        title: `${item.title} já está na sua lista`,
        duration: 2000,
      })
    }
  }

  const removeFromWatchlist = (id: number) => {
    const item = watchlist.find((item) => item.id === id)
    setWatchlist((prev) => prev.filter((item) => item.id !== id))
    if (item) {
      toast({
        title: `${item.title} removido da sua lista`,
        duration: 2000,
      })
    }
  }

  const isInWatchlist = (id: number) => {
    return watchlist.some((item) => item.id === id)
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        watchlistCount: watchlist.length,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

