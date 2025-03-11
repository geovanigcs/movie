import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"
import { UserProvider } from "@/lib/user-provider"
import { WatchlistProvider } from "@/lib/watchlist-provider"
import { Toaster } from "@/app/components/ui/toaster"
import LoadingScreen from "@/app/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gigio's Movies",
  description: "Assista aos melhores filmes e séries online",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/movie1.jpeg" className="rounded-full" type="image" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider defaultLanguage="pt-BR">
            <UserProvider>
              <WatchlistProvider>
                <LoadingScreen />
                {children}
                <Toaster />
              </WatchlistProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

