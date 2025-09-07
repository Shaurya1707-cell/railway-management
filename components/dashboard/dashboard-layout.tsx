"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { getRoleDisplayName } from "@/lib/auth"
import { Train, BarChart3, AlertTriangle, Calendar, Settings, LogOut, User, Activity } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Decision Support", href: "/dashboard/decisions", icon: Activity },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Simulations", href: "/dashboard/simulations", icon: Settings },
  { name: "Audit Trail", href: "/dashboard/audit", icon: User },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <Train className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">Railway Control</h1>
              <p className="text-sm text-sidebar-foreground/70">Traffic Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Info and Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-sidebar-accent rounded-full">
                <User className="h-4 w-4 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.username}</p>
                <p className="text-xs text-sidebar-foreground/70">{user ? getRoleDisplayName(user.role) : ""}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="w-full bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
