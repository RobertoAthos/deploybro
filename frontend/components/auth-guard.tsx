"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Se o usuário não estiver autenticado e não estiver na página de login, redirecione para login
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login")
    }
    // Se o usuário estiver autenticado e estiver na página de login, redirecione para o dashboard
    else if (status === "authenticated" && pathname === "/login") {
      router.push("/")
    }
  }, [status, pathname, router])

  // Mostra um indicador de carregamento enquanto verifica a sessão
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se estiver na página de login e não estiver autenticado, ou se estiver autenticado e não estiver na página de login
  if (
    (pathname === "/login" && status === "unauthenticated") ||
    (status === "authenticated" && pathname !== "/login")
  ) {
    return <>{children}</>
  }

  // Caso contrário, não renderiza nada enquanto redireciona
  return null
}
