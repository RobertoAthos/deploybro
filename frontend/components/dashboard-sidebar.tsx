"use client"

import { Github, History, LayoutDashboard, LogOut, Plus, Rocket, Settings, GitBranch } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"

interface DashboardSidebarProps {
  selectedTab: string
  setSelectedTab: (tab: "overview" | "new-deploy" | "history" | "settings" | "branch-config") => void
}

export function DashboardSidebar({ selectedTab, setSelectedTab }: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <Rocket className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-primary">DeployBro</span>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={selectedTab === "overview"} onClick={() => setSelectedTab("overview")}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>Visão Geral</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={selectedTab === "new-deploy"} onClick={() => setSelectedTab("new-deploy")}>
              <Plus className="h-4 w-4 mr-2" />
              <span>Novo Deploy</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={selectedTab === "history"} onClick={() => setSelectedTab("history")}>
              <History className="h-4 w-4 mr-2" />
              <span>Histórico</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedTab === "branch-config"}
              onClick={() => setSelectedTab("branch-config")}
            >
              <GitBranch className="h-4 w-4 mr-2" />
              <span>Config. Branches</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={selectedTab === "settings"} onClick={() => setSelectedTab("settings")}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <div className="px-4 py-2">
          <h3 className="mb-2 text-xs font-medium text-muted-foreground">Integrações</h3>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
