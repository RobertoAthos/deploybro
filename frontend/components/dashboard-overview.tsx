import { Clock, GitBranch, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BranchItem from "./branch-item";

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Deploys
          </CardTitle>
          <Rocket className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Deploys Agendados
          </CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Repositórios</CardTitle>
          <GitBranch className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
        </CardContent>
      </Card>
      <Card className="col-span-full bg-card border-border">
        <CardHeader>
          <CardTitle>Próximos Deploys</CardTitle>
          <CardDescription>
            Deploys agendados para os próximos dias
          </CardDescription>
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
                  <BranchItem
                    branch="iterar aqui"
                    deployName="iterar aqui"
                    enviroment="Produção"
                  />
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
  );
}
