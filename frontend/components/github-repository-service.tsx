"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  default_branch: string
  branches?: Branch[]
}

export interface Branch {
  name: string
  commit: {
    sha: string
    url: string
  }
}

export function useGitHubRepositories() {
  const { data: session } = useSession()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!session?.accessToken) return

      setIsLoading(true)
      setError(null)

      try {
        // Em uma implementação real, faríamos uma chamada à API do GitHub
        // const response = await fetch('https://api.github.com/user/repos', {
        //   headers: {
        //     Authorization: `token ${session.accessToken}`
        //   }
        // })
        // const data = await response.json()

        // Para fins de demonstração, usaremos dados simulados
        const mockRepositories: Repository[] = [
          {
            id: 1,
            name: "api-service",
            full_name: `${session.user?.name || "usuario"}/api-service`,
            description: "API principal do serviço",
            private: false,
            default_branch: "main",
            branches: [
              { name: "main", commit: { sha: "abc123", url: "" } },
              { name: "develop", commit: { sha: "def456", url: "" } },
              { name: "feature/payment-gateway", commit: { sha: "ghi789", url: "" } },
            ],
          },
          {
            id: 2,
            name: "web-client",
            full_name: `${session.user?.name || "usuario"}/web-client`,
            description: "Cliente web da aplicação",
            private: false,
            default_branch: "master",
            branches: [
              { name: "master", commit: { sha: "jkl012", url: "" } },
              { name: "staging", commit: { sha: "mno345", url: "" } },
              { name: "feature/user-profile", commit: { sha: "pqr678", url: "" } },
            ],
          },
          {
            id: 3,
            name: "admin-dashboard",
            full_name: `${session.user?.name || "usuario"}/admin-dashboard`,
            description: "Dashboard administrativo",
            private: true,
            default_branch: "main",
            branches: [
              { name: "main", commit: { sha: "stu901", url: "" } },
              { name: "develop", commit: { sha: "vwx234", url: "" } },
            ],
          },
          {
            id: 4,
            name: "mobile-app",
            full_name: `${session.user?.name || "usuario"}/mobile-app`,
            description: "Aplicativo móvel",
            private: false,
            default_branch: "main",
            branches: [
              { name: "main", commit: { sha: "yza567", url: "" } },
              { name: "staging", commit: { sha: "bcd890", url: "" } },
            ],
          },
          {
            id: 5,
            name: "auth-service",
            full_name: `${session.user?.name || "usuario"}/auth-service`,
            description: "Serviço de autenticação",
            private: true,
            default_branch: "main",
            branches: [
              { name: "main", commit: { sha: "efg123", url: "" } },
              { name: "hotfix/login-issue", commit: { sha: "hij456", url: "" } },
            ],
          },
        ]

        setRepositories(mockRepositories)
      } catch (err) {
        setError("Falha ao carregar repositórios. Por favor, tente novamente.")
        console.error("Erro ao buscar repositórios:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [session])

  return { repositories, isLoading, error }
}

export function useGitHubBranches(repoFullName: string) {
  const { data: session } = useSession()
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBranches = async () => {
      if (!session?.accessToken || !repoFullName) return

      setIsLoading(true)
      setError(null)

      try {
        // Em uma implementação real, faríamos uma chamada à API do GitHub
        // const response = await fetch(`https://api.github.com/repos/${repoFullName}/branches`, {
        //   headers: {
        //     Authorization: `token ${session.accessToken}`
        //   }
        // })
        // const data = await response.json()

        // Para fins de demonstração, usaremos dados simulados
        // Normalmente, esses dados viriam da API do GitHub
        const mockBranches: Branch[] = [
          { name: "main", commit: { sha: "abc123", url: "" } },
          { name: "develop", commit: { sha: "def456", url: "" } },
          { name: "staging", commit: { sha: "ghi789", url: "" } },
          { name: "feature/payment-gateway", commit: { sha: "jkl012", url: "" } },
          { name: "feature/user-profile", commit: { sha: "mno345", url: "" } },
          { name: "hotfix/login-issue", commit: { sha: "pqr678", url: "" } },
        ]

        setBranches(mockBranches)
      } catch (err) {
        setError("Falha ao carregar branches. Por favor, tente novamente.")
        console.error("Erro ao buscar branches:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBranches()
  }, [session, repoFullName])

  return { branches, isLoading, error }
}
