"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, Activity, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface KPIData {
  punctuality: number
  avgDelay: number
  throughput: number
  activeIncidents: number
}

export function KPIBar() {
  const [kpiData, setKpiData] = useState<KPIData>({
    punctuality: 94.2,
    avgDelay: 2.3,
    throughput: 847,
    activeIncidents: 3,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData((prev) => ({
        punctuality: Math.max(85, Math.min(99, prev.punctuality + (Math.random() - 0.5) * 2)),
        avgDelay: Math.max(0, Math.min(10, prev.avgDelay + (Math.random() - 0.5) * 0.5)),
        throughput: Math.max(700, Math.min(1000, prev.throughput + Math.floor((Math.random() - 0.5) * 20))),
        activeIncidents: Math.max(0, Math.min(10, prev.activeIncidents + Math.floor((Math.random() - 0.5) * 2))),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const kpis = [
    {
      label: "Punctuality",
      value: `${kpiData.punctuality.toFixed(1)}%`,
      icon: Clock,
      trend: kpiData.punctuality >= 95 ? "good" : kpiData.punctuality >= 90 ? "warning" : "critical",
    },
    {
      label: "Avg Delay",
      value: `${kpiData.avgDelay.toFixed(1)}min`,
      icon: TrendingUp,
      trend: kpiData.avgDelay <= 2 ? "good" : kpiData.avgDelay <= 5 ? "warning" : "critical",
    },
    {
      label: "Throughput",
      value: kpiData.throughput.toString(),
      icon: Activity,
      trend: kpiData.throughput >= 800 ? "good" : kpiData.throughput >= 700 ? "warning" : "critical",
    },
    {
      label: "Active Incidents",
      value: kpiData.activeIncidents.toString(),
      icon: AlertTriangle,
      trend: kpiData.activeIncidents <= 2 ? "good" : kpiData.activeIncidents <= 5 ? "warning" : "critical",
    },
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "good":
        return "bg-chart-1 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "critical":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
              </div>
              <Badge className={getTrendColor(kpi.trend)}>{kpi.trend}</Badge>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpi.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
