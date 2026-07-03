"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export type User = {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => Promise<boolean>
  register: (name: string, email: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    // Check if session is stored in localStorage
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string): Promise<boolean> => {
    // For prototype slicing: any login with valid formatting is successful
    const dummyUser: User = {
      id: "USR-001",
      name: "Dzul Khair Aropian",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    }
    localStorage.setItem("auth_user", JSON.stringify(dummyUser))
    setUser(dummyUser)
    router.push("/dashboard")
    return true
  }

  const register = async (name: string, email: string): Promise<boolean> => {
    const dummyUser: User = {
      id: `USR-${Math.floor(Math.random() * 1000)}`,
      name: name,
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    }
    localStorage.setItem("auth_user", JSON.stringify(dummyUser))
    setUser(dummyUser)
    router.push("/dashboard")
    return true
  }

  const logout = () => {
    localStorage.removeItem("auth_user")
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
