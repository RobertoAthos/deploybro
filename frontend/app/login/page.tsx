"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Github, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    await signIn("github", { callbackUrl: "/" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">DeployBro</CardTitle>
          <CardDescription>
            Faça login com sua conta do GitHub para acessar seus repositórios e gerenciar seus deploys
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full max-w-xs">
            <Button
              variant="outline"
              className="w-full border-border bg-background hover:bg-secondary/20"
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
              {isLoading ? "Conectando..." : "Entrar com GitHub"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Ao fazer login, você concorda em fornecer acesso de leitura aos seus repositórios para que possamos
            automatizar seus deploys.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
