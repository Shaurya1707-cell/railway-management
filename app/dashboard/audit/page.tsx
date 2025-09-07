"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, User, Clock, Shield, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AuditPage() {
  const auditLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      user: "controller_smith",
      action: "Emergency Stop Activated",
      details: "Train T004 emergency stop initiated due to signal failure",
      severity: "critical",
      system: "Safety Control",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 600000),
      user: "supervisor_jones",
      action: "Schedule Modified",
      details: "Northern Line schedule adjusted for weather conditions",
      severity: "medium",
      system: "Schedule Management",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      user: "admin_wilson",
      action: "User Access Granted",
      details: "New controller access granted to user: controller_brown",
      severity: "low",
      system: "User Management",
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1200000),
      user: "controller_davis",
      action: "Route Override",
      details: "Manual route override applied to Train T002 via Eastern Line",
      severity: "medium",
      system: "Route Control",
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1500000),
      user: "system",
      action: "Automatic Backup",
      details: "Daily system backup completed successfully",
      severity: "low",
      system: "System Maintenance",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-chart-1 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const stats = [
    { label: "Total Actions", value: "1,247", icon: FileText },
    { label: "Active Users", value: "23", icon: User },
    { label: "Critical Events", value: "8", icon: Shield },
    { label: "Last 24h", value: "156", icon: Clock },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Audit Trail & Logs</h1>
            <p className="text-muted-foreground">System activity and user action logs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Activity
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-8 w-64" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{log.action}</h4>
                              <Badge className={getSeverityColor(log.severity)}>{log.severity.toUpperCase()}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{log.user}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{log.timestamp.toLocaleString()}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {log.system}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Critical Actions</span>
                    <span className="font-medium text-destructive">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Medium Priority</span>
                    <span className="font-medium text-yellow-600">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Low Priority</span>
                    <span className="font-medium text-chart-1">124</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full" />
                  <span className="text-sm">Logging System: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full" />
                  <span className="text-sm">Backup Status: Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full" />
                  <span className="text-sm">Retention: 90 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
