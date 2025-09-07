"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface Train {
  id: string
  line: string
  position: { x: number; y: number }
  status: "on-time" | "delayed" | "critical"
  destination: string
  delay?: number
}

export function TrainMap() {
  const [trains, setTrains] = useState<Train[]>([
    { id: "212951", line: "Central", position: { x: 15, y: 25 }, status: "on-time", destination: "Downtown" },
    { id: "15128", line: "Northern", position: { x: 45, y: 15 }, status: "delayed", destination: "Airport", delay: 5 },
    { id: "14003", line: "Eastern", position: { x: 75, y: 35 }, status: "on-time", destination: "Suburbs" },
    {
      id: "22665",
      line: "Southern",
      position: { x: 25, y: 65 },
      status: "critical",
      destination: "Industrial",
      delay: 12,
    },
    { id: "23455", line: "Western", position: { x: 65, y: 75 }, status: "on-time", destination: "Harbor" },
  ])

  // Simulate train movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains((prev) =>
        prev.map((train) => ({
          ...train,
          position: {
            x: Math.max(5, Math.min(95, train.position.x + (Math.random() - 0.5) * 4)),
            y: Math.max(5, Math.min(95, train.position.y + (Math.random() - 0.5) * 4)),
          },
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: Train["status"]) => {
    switch (status) {
      case "on-time":
        return "bg-chart-1"
      case "delayed":
        return "bg-yellow-500"
      case "critical":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  const getStatusText = (status: Train["status"]) => {
    switch (status) {
      case "on-time":
        return "On Time"
      case "delayed":
        return "Delayed"
      case "critical":
        return "Critical"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="relative">
      {/* Map Container */}
      <div className="relative w-full h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-hidden">
        {/* Railway Lines - Simplified representation */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="railway" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="none" />
              <rect width="2" height="2" fill="#94a3b8" />
            </pattern>
          </defs>
          {/* Main railway lines */}
          <line x1="10" y1="20" x2="90" y2="20" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="10" y1="40" x2="90" y2="40" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="10" y1="60" x2="90" y2="60" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="10" y1="80" x2="90" y2="80" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="20" y1="10" x2="20" y2="90" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="80" y1="10" x2="80" y2="90" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
        </svg>

        {/* Train Positions */}
        {trains.map((train) => (
          <div
            key={train.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${train.position.x}%`,
              top: `${train.position.y}%`,
            }}
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(train.status)} animate-pulse`} />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded-lg p-2 shadow-lg z-10 whitespace-nowrap">
              <div className="text-sm font-medium">
                {train.id} - {train.line} Line
              </div>
              <div className="text-xs text-muted-foreground">To: {train.destination}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getStatusText(train.status)}
                </Badge>
                {train.delay && <span className="text-xs text-destructive">+{train.delay}min</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1" />
          <span>On Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Delayed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span>Critical</span>
        </div>
      </div>
    </div>
  )
}
