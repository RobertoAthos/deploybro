"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthContextType {
  isAuthenticated: boolean
  user: {
    login: string | null
    avatar: string | null
  } | null
  token: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ login: string | null; avatar: string | null } | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const storedToken = localStorage.getItem("github_token")
    const userLogin = localStorage.getItem("user_login")
    const userAvatar = localStorage.getItem("user_avatar")

    if (storedToken) {
      setIsAuthenticated(true)
      setToken(storedToken)
      setUser({
        login: userLogin,
        avatar: userAvatar,
      })
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!isLoading) {
      if (!isAuthenticated && pathname !== "/login") {
        router.push("/login")
      } else if (isAuthenticated && pathname === "/login") {
        router.push("/")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const logout = () => {
    localStorage.removeItem("github_token")
    localStorage.removeItem("user_login")
    localStorage.removeItem("user_avatar")
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, token, logout }}>{children}</AuthContext.Provider>
}
