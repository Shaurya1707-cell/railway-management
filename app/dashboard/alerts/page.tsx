"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, CheckCircle, Clock, Train } from "lucide-react"
import { useState } from "react"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Signal Failure - Platform 7",
      description: "Complete signal system failure affecting all departures",
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
      trainId: "Multiple",
    },
    {
      id: 2,
      type: "warning",
      title: "High Passenger Volume",
      description: "Unusual passenger density at Central Station during off-peak hours",
      timestamp: new Date(Date.now() - 600000),
      acknowledged: false,
    },
    {
      id: 3,
      type: "info",
      title: "Maintenance Scheduled",
      description: "Routine maintenance on Eastern Line scheduled for tonight 2:00-4:00 AM",
      timestamp: new Date(Date.now() - 900000),
      acknowledged: true,
    },
    {
      id: 4,
      type: "warning",
      title: "Weather Advisory",
      description: "Heavy rain expected - potential delays on outdoor sections",
      timestamp: new Date(Date.now() - 1200000),
      acknowledged: false,
    },
  ])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle
      case "warning":
        return Bell
      case "info":
        return CheckCircle
      default:
        return Bell
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "warning":
        return "bg-yellow-500 text-white"
      case "info":
        return "bg-blue-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const acknowledgeAlert = (id: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const unacknowledgedCount = alerts.filter((alert) => !alert.acknowledged).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
              <p className="text-muted-foreground">Monitor and manage system alerts</p>
            </div>
          </div>
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {unacknowledgedCount} Unread
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <div className="text-2xl font-bold mt-2">
                {alerts.filter((a) => a.type === "critical" && !a.acknowledged).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Warning</span>
              </div>
              <div className="text-2xl font-bold mt-2">
                {alerts.filter((a) => a.type === "warning" && !a.acknowledged).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Info</span>
              </div>
              <div className="text-2xl font-bold mt-2">
                {alerts.filter((a) => a.type === "info" && !a.acknowledged).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <div className="text-2xl font-bold mt-2">{alerts.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <div key={alert.id} className={`p-4 border rounded-lg ${alert.acknowledged ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge className={getAlertColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                          {alert.acknowledged && <Badge variant="outline">Acknowledged</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                          {alert.trainId && (
                            <div className="flex items-center gap-1">
                              <Train className="h-3 w-3" />
                              <span>{alert.trainId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
