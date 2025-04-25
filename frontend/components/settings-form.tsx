"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { timezones } from "@/utils/timezones"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

// Dados de exemplo para canais do Slack
const initialSlackChannels = [
  { id: "1", name: "#deploys", channelId: "C01234ABCDE" },
  { id: "2", name: "#alerts", channelId: "C02345BCDEF" },
  { id: "3", name: "#dev-team", channelId: "C03456CDEFG" },
]

export function SettingsForm() {
  const [slackChannels, setSlackChannels] = useState(initialSlackChannels)
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelId, setNewChannelId] = useState("")
  const [openTimezone, setOpenTimezone] = useState(false)
  const [timezoneOption, setTimezone] = useState("")
  const { toast } = useToast()
  const {data} = useSession()

  console.log(data)

  const addSlackChannel = () => {
    if (!newChannelName.trim() || !newChannelId.trim()) {
      toast({
        title: "Erro",
        description: "Nome do canal e ID do canal são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const newChannel = {
      id: Date.now().toString(),
      name: newChannelName,
      channelId: newChannelId,
    }

    setSlackChannels([...slackChannels, newChannel])
    setNewChannelName("")
    setNewChannelId("")

    toast({
      title: "Canal adicionado",
      description: `O canal ${newChannelName} foi adicionado com sucesso.`,
    })
  }

  const removeSlackChannel = (id: string) => {
    setSlackChannels(slackChannels.filter((channel) => channel.id !== id))

    toast({
      title: "Canal removido",
      description: "O canal foi removido com sucesso.",
    })
  }

  const user = data?.user

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>Gerencie suas preferências e integrações</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue={user?.name ?? ''} className="bg-background border-border cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user?.email ?? ''} className="bg-background border-border cursor-not-allowed" />
              </div>
              <div className="space-y-2">
              <Label htmlFor="email">Fuso horário</Label>
                <Popover open={openTimezone} onOpenChange={setOpenTimezone}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openTimezone}
                        className="w-full justify-between bg-background border-border"
                      >
                         {timezoneOption ? timezoneOption : 'Selecione um timezone'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-card border-border">
                      <Command className="bg-card">
                        <CommandInput placeholder="Buscar repositório..." className="border-border" />
                        <CommandList>
                          <CommandGroup>
                            {timezones.map((timezone) => (
                              <CommandItem
                                key={timezone.value}
                                value={timezone.value}
                                onSelect={(currentValue) => {
                                  setTimezone(currentValue)
                                  setOpenTimezone(false)
                                }}
                                className=""
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary-foreground",
                                    timezoneOption === timezone.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{timezone.label}</span>
                                 
                                </div>
            
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Canais de Notificação</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="flex items-center gap-2">
                      Email
                      <Badge variant="outline" className="bg-secondary/50 text-muted-foreground">
                        Em breve
                      </Badge>
                    </Label>
                    <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                  </div>
                  <Switch id="email-notifications" disabled />
                </div>
                <Separator className="bg-border" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slack-notifications">Slack</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações no Slack</p>
                  </div>
                  <Switch id="slack-notifications" defaultChecked />
                </div>

                <div className="space-y-4 pl-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label>Canais do Slack</Label>
                      <div className="rounded-md border border-border bg-background">
                        <div className="p-2">
                          {slackChannels.map((channel) => (
                            <div
                              key={channel.id}
                              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-secondary/20"
                            >
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {channel.channelId}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSlackChannel(channel.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remover canal</span>
                              </Button>
                            </div>
                          ))}

                          {slackChannels.length === 0 && (
                            <div className="py-4 text-center text-muted-foreground">Nenhum canal configurado</div>
                          )}
                        </div>

                        <Separator className="bg-border" />

                        <div className="p-3 space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label htmlFor="channel-name" className="text-xs">
                                Nome do Canal
                              </Label>
                              <Input
                                id="channel-name"
                                placeholder="#deploys"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                                className="h-8 bg-muted border-border"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="channel-id" className="text-xs">
                                ID do Canal
                              </Label>
                              <Input
                                id="channel-id"
                                placeholder="C01234ABCDE"
                                value={newChannelId}
                                onChange={(e) => setNewChannelId(e.target.value)}
                                className="h-8 bg-muted border-border"
                              />
                            </div>
                          </div>
                          <Button
                            onClick={addSlackChannel}
                            className="w-full h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <PlusCircle className="h-3.5 w-3.5 mr-1" />
                            Adicionar Canal
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Alert className="bg-muted/30 border-border">
                      <AlertDescription className="text-xs">
                        Para encontrar o ID do canal no Slack, clique com o botão direito no canal e selecione "Copiar
                        link". O ID é a parte após o último "/" na URL (ex: C01234ABCDE).
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="whatsapp-notifications" className="flex items-center gap-2">
                      WhatsApp
                      <Badge variant="outline" className="bg-secondary/50 text-muted-foreground">
                        Em breve
                      </Badge>
                    </Label>
                    <p className="text-sm text-muted-foreground">Receber notificações no WhatsApp</p>
                  </div>
                  <Switch id="whatsapp-notifications" disabled />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-border bg-background">
            Cancelar
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Salvar Alterações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
