import { DashboardOverview } from "@/components/dashboard-overview"
import { NewDeployForm } from "@/components/new-deploy-form"
import { DeployHistory } from "@/components/deploy-history"
import { SettingsForm } from "@/components/settings-form"
import { BranchConfiguration } from "@/components/branch-configuration"

interface DashboardContentProps {
  selectedTab: "overview" | "new-deploy" | "history" | "settings" | "branch-config"
}

export function DashboardContent({ selectedTab }: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      {selectedTab === "overview" && <DashboardOverview />}
      {selectedTab === "new-deploy" && <NewDeployForm />}
      {selectedTab === "history" && <DeployHistory />}
      {selectedTab === "settings" && <SettingsForm />}
      {selectedTab === "branch-config" && <BranchConfiguration />}
    </main>
  )
}
