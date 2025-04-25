"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Info,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  useGitHubRepositories,
  useGitHubBranches,
  type Repository,
} from "@/components/github-repository-service";

// Dados de exemplo para canais do Slack
const slackChannels: any[] = [];

export function NewDeployForm() {
  const [date, setDate] = useState<Date>();
  const [openRepo, setOpenRepo] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);
  const [repository, setRepository] = useState("");
  const [branch, setBranch] = useState("");
  const [environment, setEnvironment] = useState("staging");
  const [successChannel, setSuccessChannel] = useState("");
  const [failureChannel, setFailureChannel] = useState("");

  const { repositories, isLoading: isLoadingRepos } = useGitHubRepositories();
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const { branches } = useGitHubBranches(selectedRepo?.full_name || "");

  // Atualiza o repositório selecionado quando o usuário escolhe um repositório
  useEffect(() => {
    if (repository) {
      const repo = repositories.find((r) => r.name === repository);
      setSelectedRepo(repo || null);
      setBranch(""); // Limpa a branch selecionada quando muda o repositório
    } else {
      setSelectedRepo(null);
    }
  }, [repository, repositories]);

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Novo Deploy</CardTitle>
          <CardDescription>
            Configure e agende um novo deploy para homologação ou produção
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="repository" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="repository">Repositório</TabsTrigger>
              <TabsTrigger value="schedule">Agendamento</TabsTrigger>
              <TabsTrigger value="notification">Notificação</TabsTrigger>
            </TabsList>
            <TabsContent value="repository" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repository">Repositório</Label>
                  <Popover open={openRepo} onOpenChange={setOpenRepo}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openRepo}
                        className="w-full hover:bg-secondary justify-between bg-background border-border"
                        disabled={isLoadingRepos}
                      >
                        {isLoadingRepos ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Carregando repositórios...</span>
                          </div>
                        ) : repository ? (
                          repositories.find((repo) => repo.name === repository)
                            ?.name || "Repositório não encontrado"
                        ) : (
                          "Selecione um repositório..."
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-card border-border">
                      <Command className="bg-card">
                        <CommandInput
                          placeholder="Buscar repositório..."
                          className="border-border"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Nenhum repositório encontrado.
                          </CommandEmpty>
                          <CommandGroup>
                            {repositories.map((repo) => (
                              <CommandItem
                                key={repo.id}
                                value={repo.name}
                                onSelect={(currentValue) => {
                                  setRepository(
                                    currentValue === repository
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenRepo(false);
                                }}
                                className=""
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary-foreground",
                                    repository === repo.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{repo.name}</span>
                                  {repo.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {repo.description}
                                    </span>
                                  )}
                                </div>
                                {repo.private && (
                                  <Badge
                                    variant="outline"
                                    className="ml-auto bg-secondary/50 text-xs"
                                  >
                                    Privado
                                  </Badge>
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="environment">Ambiente</Label>
                  <Select value={environment} onValueChange={setEnvironment}>
                    <SelectTrigger className="w-full bg-background border-border">
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="staging">Homologação</SelectItem>
                      <SelectItem value="production">Produção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Popover open={openBranch} onOpenChange={setOpenBranch}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openBranch}
                        className="w-full hover:bg-secondary justify-between bg-background border-border"
                        disabled={!repository}
                      >
                        {branch
                          ? branch
                          : selectedRepo
                          ? "Selecione uma branch..."
                          : "Selecione um repositório primeiro"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-card border-border">
                      <Command className="bg-card">
                        <CommandInput
                          placeholder="Buscar branch..."
                          className="border-border"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Nenhuma branch encontrada.
                          </CommandEmpty>
                          <CommandGroup>
                            {branches.map((b) => (
                              <CommandItem
                                key={b.name}
                                value={b.name}
                                onSelect={(currentValue) => {
                                  setBranch(
                                    currentValue === branch ? "" : currentValue
                                  );
                                  setOpenBranch(false);
                                }}
                                className="hover:bg-secondary/50 aria-selected:bg-secondary/50"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    branch === b.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {b.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground mt-1">
                    Você pode digitar para filtrar ou buscar uma branch
                    específica.
                  </p>
                </div>

                <Alert
                  variant="default"
                  className="mt-2 border-primary/20 bg-primary/5"
                >
                  <Info className="h-4 w-4 text-primary" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    Selecione o ambiente de destino e a branch específica que
                    deseja implantar. Para produção, recomenda-se usar branches
                    estáveis como main ou master. Para homologação, branches
                    como develop, staging ou feature/* são mais adequadas.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data do Deploy</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start hover:bg-secondary text-left font-normal bg-background border-border",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date
                          ? format(date, "PPP", { locale: ptBR })
                          : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ptBR}
                        className="bg-card"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Select>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                      <SelectItem value="18:00">18:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Lembretes</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reminder-day" />
                    <Label htmlFor="reminder-day">
                      Lembrar no dia do deploy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reminder-day-before" />
                    <Label htmlFor="reminder-day-before">
                      Lembrar 1 dia antes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reminder-week-before" />
                    <Label htmlFor="reminder-week-before">
                      Lembrar 1 semana antes
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notification" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Canais de Notificação</Label>
                  <RadioGroup
                    defaultValue="slack"
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="slack" id="slack" />
                      <Label htmlFor="slack">Slack</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" disabled />
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        Email
                        <Badge
                          variant="outline"
                          className="bg-secondary/50 text-muted-foreground"
                        >
                          Em breve
                        </Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" disabled />
                      <Label
                        htmlFor="whatsapp"
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        WhatsApp
                        <Badge
                          variant="outline"
                          className="bg-secondary/50 text-muted-foreground"
                        >
                          Em breve
                        </Badge>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4 border border-border rounded-md p-4 bg-muted/20">
                  <h3 className="text-sm font-medium">Configuração do Slack</h3>

                  <div className="space-y-2">
                    <Label htmlFor="success-channel">
                      Canal para notificações de sucesso
                    </Label>
                    <Select
                      value={successChannel}
                      onValueChange={setSuccessChannel}
                    >
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {slackChannels.map((channel) => (
                          <SelectItem key={channel.value} value={channel.value}>
                            {channel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="failure-channel">
                      Canal para notificações de falha
                    </Label>
                    <Select
                      value={failureChannel}
                      onValueChange={setFailureChannel}
                    >
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {slackChannels.map((channel) => (
                          <SelectItem key={channel.value} value={channel.value}>
                            {channel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Você pode selecionar o mesmo canal para ambos os tipos de
                      notificação.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-message">
                    Mensagem de Notificação
                  </Label>
                  <Textarea
                    id="notification-message"
                    placeholder="Digite a mensagem que será enviada nas notificações..."
                    defaultValue="Olá equipe! Um novo deploy está agendado para o repositório {repositório} na branch {branch}. O deploy ocorrerá em {data} às {hora}. Por favor, estejam atentos a possíveis instabilidades durante o processo."
                    className="min-h-[120px] bg-background border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {"{repositório}"}, {"{branch}"}, {"{data}"}, {"{hora}"}{" "}
                    e {"{status}"} como variáveis que serão substituídas
                    automaticamente.
                  </p>
                </div>

                <Alert
                  variant="default"
                  className="border-primary/20 bg-primary/5"
                >
                  <Info className="h-4 w-4 text-primary" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    Configurar canais diferentes para notificações de sucesso e
                    falha ajuda a direcionar as informações para as equipes
                    corretas e facilita o monitoramento.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-border bg-background">
            Cancelar
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Agendar Deploy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
