export type UserRole = "controller" | "supervisor" | "admin"

export interface User {
  id: string
  username: string
  role: UserRole
  permissions: string[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock user database - in production this would be a real database
const mockUsers: Record<string, { password: string; role: UserRole; permissions: string[] }> = {
  controller1: {
    password: "password123",
    role: "controller",
    permissions: ["view_dashboard", "view_trains", "view_alerts"],
  },
  supervisor1: {
    password: "password123",
    role: "supervisor",
    permissions: ["view_dashboard", "view_trains", "view_alerts", "manage_incidents", "approve_decisions"],
  },
  admin1: {
    password: "password123",
    role: "admin",
    permissions: [
      "view_dashboard",
      "view_trains",
      "view_alerts",
      "manage_incidents",
      "approve_decisions",
      "manage_users",
      "system_config",
    ],
  },
}

export async function authenticateUser(username: string, password: string, role: UserRole): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const userData = mockUsers[username]

  if (!userData || userData.password !== password || userData.role !== role) {
    throw new Error("Invalid credentials")
  }

  return {
    id: username,
    username,
    role: userData.role,
    permissions: userData.permissions,
  }
}

export function hasPermission(user: User | null, permission: string): boolean {
  return user?.permissions.includes(permission) ?? false
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "controller":
      return "Controller"
    case "supervisor":
      return "Supervisor"
    case "admin":
      return "Administrator"
    default:
      return "Unknown"
  }
}
