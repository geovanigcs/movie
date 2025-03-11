"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: number
  name: string
  avatar: string
  initials: string
}

type UserContextType = {
  currentUser: User
  users: User[]
  switchUser: (id: number) => void
}

const users: User[] = [
  {
    id: 1,
    name: "Samantha",
    avatar: "/placeholder.svg?height=40&width=40&text=SM",
    initials: "SM",
  },
  {
    id: 2,
    name: "Carlos",
    avatar: "/placeholder.svg?height=40&width=40&text=CR",
    initials: "CR",
  },
  {
    id: 3,
    name: "Julia",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
    initials: "JL",
  },
  {
    id: 4,
    name: "Miguel",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
    initials: "MG",
  },
]

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0])

  useEffect(() => {
    const savedUserId = localStorage.getItem("currentUserId")
    if (savedUserId) {
      const user = users.find((u) => u.id === Number.parseInt(savedUserId))
      if (user) {
        setCurrentUser(user)
      }
    }
  }, [])

  const switchUser = (id: number) => {
    const user = users.find((u) => u.id === id)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem("currentUserId", id.toString())
    }
  }

  return <UserContext.Provider value={{ currentUser, users, switchUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

