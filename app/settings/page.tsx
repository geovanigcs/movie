"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { useUser } from "@/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Monitor } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"

export default function SettingsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { currentUser, users, switchUser } = useUser()
  const { toast } = useToast()

  const [videoQuality, setVideoQuality] = useState("auto")
  const [downloadQuality, setDownloadQuality] = useState("high")
  const [notifications, setNotifications] = useState({
    newContent: true,
    recommendations: true,
    updates: false,
  })
  const [autoplay, setAutoplay] = useState(true)
  const [subtitles, setSubtitles] = useState(true)
  const [dataUsage, setDataUsage] = useState(true)
  const [volume, setVolume] = useState([75])

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas com sucesso",
      duration: 2000,
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pl-[248px]">
        <Header />
        <div className="px-4 md:px-6 pb-8">
          <div className="my-8">
            <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
                <TabsTrigger value="appearance">Aparência</TabsTrigger>
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="language">Idioma</TabsTrigger>
                <TabsTrigger value="playback">Reprodução</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>Personalize a aparência do TinyMoviez</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tema</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-6 w-6" />
                          <span>Claro</span>
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-6 w-6" />
                          <span>Escuro</span>
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                          onClick={() => setTheme("system")}
                        >
                          <Monitor className="h-6 w-6" />
                          <span>Sistema</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Conta</CardTitle>
                    <CardDescription>Gerencie sua conta e perfis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Perfis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className={`p-4 rounded-lg border ${
                              user.id === currentUser.id ? "bg-accent/10 border-accent" : ""
                            } cursor-pointer`}
                            onClick={() => switchUser(user.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {user.id === currentUser.id ? "Perfil atual" : "Clique para trocar"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle>Idioma</CardTitle>
                    <CardDescription>Escolha o idioma de sua preferência</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Idioma da interface</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button
                          variant={language === "pt-BR" ? "default" : "outline"}
                          className="flex items-center justify-start gap-2"
                          onClick={() => setLanguage("pt-BR")}
                        >
                          <span className="text-xl">🇧🇷</span>
                          <span>Português</span>
                        </Button>
                        <Button
                          variant={language === "en-US" ? "default" : "outline"}
                          className="flex items-center justify-start gap-2"
                          onClick={() => setLanguage("en-US")}
                        >
                          <span className="text-xl">🇺🇸</span>
                          <span>English</span>
                        </Button>
                        <Button
                          variant={language === "es-ES" ? "default" : "outline"}
                          className="flex items-center justify-start gap-2"
                          onClick={() => setLanguage("es-ES")}
                        >
                          <span className="text-xl">🇪🇸</span>
                          <span>Español</span>
                        </Button>
                        <Button
                          variant={language === "ru-RU" ? "default" : "outline"}
                          className="flex items-center justify-start gap-2"
                          onClick={() => setLanguage("ru-RU")}
                        >
                          <span className="text-xl">🇷🇺</span>
                          <span>Русский</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="playback">
                <Card>
                  <CardHeader>
                    <CardTitle>Reprodução</CardTitle>
                    <CardDescription>Configure as opções de reprodução de vídeo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Qualidade de vídeo</h3>
                      <Select value={videoQuality} onValueChange={setVideoQuality}>
                        <SelectTrigger className="w-full md:w-[240px]">
                          <SelectValue placeholder="Selecione a qualidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automática</SelectItem>
                          <SelectItem value="low">Baixa (480p)</SelectItem>
                          <SelectItem value="medium">Média (720p)</SelectItem>
                          <SelectItem value="high">Alta (1080p)</SelectItem>
                          <SelectItem value="ultra">Ultra HD (4K)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Volume padrão</h3>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full md:w-[240px]"
                      />
                      <span className="text-sm text-muted-foreground">{volume}%</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Opções adicionais</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="autoplay">Reprodução automática</Label>
                          <Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="subtitles">Legendas ativadas por padrão</Label>
                          <Switch id="subtitles" checked={subtitles} onCheckedChange={setSubtitles} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="downloads">
                <Card>
                  <CardHeader>
                    <CardTitle>Downloads</CardTitle>
                    <CardDescription>Configure as opções de download de conteúdo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Qualidade de download</h3>
                      <Select value={downloadQuality} onValueChange={setDownloadQuality}>
                        <SelectTrigger className="w-full md:w-[240px]">
                          <SelectValue placeholder="Selecione a qualidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baixa (480p)</SelectItem>
                          <SelectItem value="medium">Média (720p)</SelectItem>
                          <SelectItem value="high">Alta (1080p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Opções adicionais</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-usage">Baixar apenas em Wi-Fi</Label>
                          <Switch id="data-usage" checked={dataUsage} onCheckedChange={setDataUsage} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>Configure suas preferências de notificação</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notificações</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-content">Novos lançamentos</Label>
                          <Switch
                            id="new-content"
                            checked={notifications.newContent}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, newContent: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="recommendations">Recomendações personalizadas</Label>
                          <Switch
                            id="recommendations"
                            checked={notifications.recommendations}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, recommendations: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="updates">Atualizações do sistema</Label>
                          <Switch
                            id="updates"
                            checked={notifications.updates}
                            onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, updates: checked }))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

