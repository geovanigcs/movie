"use client"

import { useContext } from "react"
import { WatchlistContext } from "@/lib/watchlist-provider" // Precisamos garantir que WatchlistContext seja exportado

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

