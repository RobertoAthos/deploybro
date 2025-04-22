import { BarChart3, Clock, GitBranch, GitCommit, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Deploys</CardTitle>
          <Rocket className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground">+14% em relação ao mês passado</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Deploys Agendados</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">Próximo em 2 dias</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Repositórios</CardTitle>
          <GitBranch className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">3 adicionados recentemente</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
          <BarChart3 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.2%</div>
          <Progress value={98.2} className="mt-2 bg-secondary" indicatorClassName="bg-primary" />
        </CardContent>
      </Card>

      <Card className="col-span-full bg-card border-border">
        <CardHeader>
          <CardTitle>Próximos Deploys</CardTitle>
          <CardDescription>Deploys agendados para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4 bg-secondary">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="production">Produção</TabsTrigger>
              <TabsTrigger value="staging">Homologação</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30">
                <div className="flex flex-col space-y-3 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">api-service</div>
                      <div className="text-sm text-muted-foreground">Produção • feature/payment-gateway</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <GitCommit className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">a8c7b2d</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Amanhã, 10:00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30">
                <div className="flex flex-col space-y-3 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">web-client</div>
                      <div className="text-sm text-muted-foreground">Homologação • develop</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <GitCommit className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">f2e1d9c</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Hoje, 18:30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30">
                <div className="flex flex-col space-y-3 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">admin-dashboard</div>
                      <div className="text-sm text-muted-foreground">Produção • main</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <GitCommit className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">e3c5b7a</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">25/04, 09:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="production" className="space-y-4">
              {/* Conteúdo similar para produção */}
            </TabsContent>
            <TabsContent value="staging" className="space-y-4">
              {/* Conteúdo similar para homologação */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
