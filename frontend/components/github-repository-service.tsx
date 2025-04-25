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
        const response = await fetch('https://api.github.com/user/repos', {
          headers: {
            Authorization: `token ${session.accessToken}`
          }
        })
        const data = await response.json()
      
        setRepositories(data)
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
        const response = await fetch(`https://api.github.com/repos/${repoFullName}/branches`, {
          headers: {
            Authorization: `token ${session.accessToken}`
          }
        })
        const data = await response.json()

        setBranches(data)
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
