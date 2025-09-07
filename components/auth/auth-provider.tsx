"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type AuthState, authenticateUser, type UserRole } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (credentials: { username: string; password: string; role: UserRole }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("railway_user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setAuthState({ user, isAuthenticated: true })
      } catch (error) {
        localStorage.removeItem("railway_user")
      }
    }
  }, [])

  const login = async (credentials: { username: string; password: string; role: UserRole }) => {
    const { username, password, role } = credentials
    const user = await authenticateUser(username, password, role)
    setAuthState({ user, isAuthenticated: true })
    localStorage.setItem("railway_user", JSON.stringify(user))
  }

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false })
    localStorage.removeItem("railway_user")
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
