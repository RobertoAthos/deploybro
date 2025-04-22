"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "new-deploy" | "history" | "settings" | "branch-config">(
    "overview",
  )

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <DashboardContent selectedTab={selectedTab} />
        </div>
      </div>
    </SidebarProvider>
  )
}
