"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"
import { AuthGuard } from "@/components/auth-guard"

export function NextAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  )
}
