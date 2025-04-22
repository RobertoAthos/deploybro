"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Info, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - em uma aplicação real, estes viriam de uma API ou banco de dados
const initialRepositories = [
  {
    id: "1",
    name: "api-service",
    productionBranch: "main",
    stagingBranch: "develop",
  },
  {
    id: "2",
    name: "web-client",
    productionBranch: "master",
    stagingBranch: "staging",
  },
  {
    id: "3",
    name: "admin-dashboard",
    productionBranch: "main",
    stagingBranch: "develop",
  },
  {
    id: "4",
    name: "mobile-app",
    productionBranch: "main",
    stagingBranch: "staging",
  },
]

const availableBranches = [
  { value: "main", label: "main" },
  { value: "master", label: "master" },
  { value: "develop", label: "develop" },
  { value: "staging", label: "staging" },
  { value: "release", label: "release" },
  { value: "feature/user-profile", label: "feature/user-profile" },
  { value: "feature/payment-gateway", label: "feature/payment-gateway" },
  { value: "hotfix/login-issue", label: "hotfix/login-issue" },
]

interface RepositoryConfig {
  id: string
  name: string
  productionBranch: string
  stagingBranch: string
}

export function BranchConfiguration() {
  const [repositories, setRepositories] = useState<RepositoryConfig[]>(initialRepositories)
  const [newRepoName, setNewRepoName] = useState("")
  const [openBranchMenus, setOpenBranchMenus] = useState<Record<string, { prod: boolean; staging: boolean }>>({})
  const { toast } = useToast()

  const toggleBranchMenu = (repoId: string, type: "prod" | "staging", value: boolean) => {
    setOpenBranchMenus((prev) => ({
      ...prev,
      [repoId]: {
        ...(prev[repoId] || { prod: false, staging: false }),
        [type]: value,
      },
    }))
  }

  const updateBranch = (repoId: string, type: "productionBranch" | "stagingBranch", value: string) => {
    setRepositories((prev) => prev.map((repo) => (repo.id === repoId ? { ...repo, [type]: value } : repo)))
  }

  const addRepository = () => {
    if (!newRepoName.trim()) return

    const newRepo: RepositoryConfig = {
      id: Date.now().toString(),
      name: newRepoName,
      productionBranch: "main",
      stagingBranch: "develop",
    }

    setRepositories((prev) => [...prev, newRepo])
    setNewRepoName("")

    toast({
      title: "Repositório adicionado",
      description: `${newRepoName} foi adicionado com sucesso.`,
    })
  }

  const removeRepository = (id: string) => {
    setRepositories((prev) => prev.filter((repo) => repo.id !== id))

    toast({
      title: "Repositório removido",
      description: "O repositório foi removido com sucesso.",
    })
  }

  const saveConfigurations = () => {
    // Em uma aplicação real, aqui você enviaria os dados para uma API
    console.log("Configurações salvas:", repositories)

    toast({
      title: "Configurações salvas",
      description: "As configurações de branches foram salvas com sucesso.",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Configuração de Branches</CardTitle>
          <CardDescription>
            Defina quais branches correspondem aos ambientes de homologação e produção para cada repositório
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="outline" className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Configurar corretamente as branches de homologação e produção ajuda a automatizar o processo de deploy e
              reduz a chance de erros. Recomendamos usar branches estáveis como main/master para produção e
              develop/staging para homologação.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="new-repo">Adicionar Novo Repositório</Label>
                <Input
                  id="new-repo"
                  placeholder="Nome do repositório"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <Button onClick={addRepository} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Adicionar
              </Button>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow className="border-border hover:bg-secondary/70">
                    <TableHead>Repositório</TableHead>
                    <TableHead>Branch de Produção</TableHead>
                    <TableHead>Branch de Homologação</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repositories.map((repo) => (
                    <TableRow key={repo.id} className="border-border hover:bg-secondary/20">
                      <TableCell className="font-medium">{repo.name}</TableCell>
                      <TableCell>
                        <Popover
                          open={openBranchMenus[repo.id]?.prod || false}
                          onOpenChange={(open) => toggleBranchMenu(repo.id, "prod", open)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openBranchMenus[repo.id]?.prod || false}
                              className="w-full justify-between bg-background border-border"
                            >
                              <Badge
                                variant="outline"
                                className="font-normal bg-primary/10 text-primary border-primary/20 mr-2"
                              >
                                Produção
                              </Badge>
                              {repo.productionBranch}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0 bg-card border-border">
                            <Command className="bg-card">
                              <CommandInput placeholder="Buscar branch..." className="border-border" />
                              <CommandList>
                                <CommandEmpty>Nenhuma branch encontrada.</CommandEmpty>
                                <CommandGroup>
                                  {availableBranches.map((branch) => (
                                    <CommandItem
                                      key={branch.value}
                                      value={branch.value}
                                      onSelect={() => {
                                        updateBranch(repo.id, "productionBranch", branch.value)
                                        toggleBranchMenu(repo.id, "prod", false)
                                      }}
                                      className="hover:bg-secondary/50 aria-selected:bg-secondary/50"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4 text-primary",
                                          repo.productionBranch === branch.value ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                      {branch.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Popover
                          open={openBranchMenus[repo.id]?.staging || false}
                          onOpenChange={(open) => toggleBranchMenu(repo.id, "staging", open)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openBranchMenus[repo.id]?.staging || false}
                              className="w-full justify-between bg-background border-border"
                            >
                              <Badge
                                variant="outline"
                                className="font-normal bg-primary/10 text-primary border-primary/20 mr-2"
                              >
                                Homologação
                              </Badge>
                              {repo.stagingBranch}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0 bg-card border-border">
                            <Command className="bg-card">
                              <CommandInput placeholder="Buscar branch..." className="border-border" />
                              <CommandList>
                                <CommandEmpty>Nenhuma branch encontrada.</CommandEmpty>
                                <CommandGroup>
                                  {availableBranches.map((branch) => (
                                    <CommandItem
                                      key={branch.value}
                                      value={branch.value}
                                      onSelect={() => {
                                        updateBranch(repo.id, "stagingBranch", branch.value)
                                        toggleBranchMenu(repo.id, "staging", false)
                                      }}
                                      className="hover:bg-secondary/50 aria-selected:bg-secondary/50"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4 text-primary",
                                          repo.stagingBranch === branch.value ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                      {branch.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeRepository(repo.id)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {repositories.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum repositório configurado. Adicione um repositório acima.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-border">
            Cancelar
          </Button>
          <Button onClick={saveConfigurations} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
