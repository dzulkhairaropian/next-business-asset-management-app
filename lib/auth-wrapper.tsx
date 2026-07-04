"use client"

import * as React from "react"
import { useAuth } from "./auth-context"
import { useRouter, usePathname } from "next/navigation"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isAuthRoute = pathname?.startsWith("/auth")

    // React.useEffect(() => {
    //   if (!isLoading && !user && !isAuthRoute) {
    //     router.replace("/auth/login")
    //   }
    // }, [user, isLoading, isAuthRoute, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  // TODO: re-enable auth guard before production
  // if (!user && !isAuthRoute) {
  //   return null
  // }

  return <>{children}</>
}
