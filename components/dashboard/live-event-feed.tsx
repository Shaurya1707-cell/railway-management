"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, CheckCircle, Clock, Info, Train } from "lucide-react"

interface Event {
  id: string
  timestamp: Date
  type: "info" | "warning" | "critical" | "success"
  title: string
  description: string
  trainId?: string
}

const eventTypes = [
  { type: "info" as const, icon: Info, color: "bg-blue-500" },
  { type: "warning" as const, icon: AlertTriangle, color: "bg-yellow-500" },
  { type: "critical" as const, icon: AlertTriangle, color: "bg-destructive" },
  { type: "success" as const, icon: CheckCircle, color: "bg-chart-1" },
]

const sampleEvents: Omit<Event, "id" | "timestamp">[] = [
  {
    type: "info",
    title: "Train 212951 Departed",
    description: "Central Line train departed Platform 3",
    trainId: "212951",
  },
  { type: "warning", title: "Signal Delay", description: "Signal maintenance causing 3min delays on Northern Line" },
  {
    type: "critical",
    title: "Emergency Stop",
    description: "Train T004 emergency stop - investigating",
    trainId: "T004",
  },
  { type: "success", title: "Issue Resolved", description: "Platform 7 technical issue resolved" },
  { type: "info", title: "Schedule Update", description: "Evening schedule updated for weather conditions" },
  { type: "warning", title: "Passenger Alert", description: "High passenger volume at Central Station" },
  {
    type: "info",
    title: "Train T005 Arrived",
    description: "Southern Line train arrived at Harbor Terminal",
    trainId: "T005",
  },
]

export function LiveEventFeed() {
  const [events, setEvents] = useState<Event[]>([])

  // Initialize with some events and simulate real-time updates
  useEffect(() => {
    // Add initial events
    const initialEvents = sampleEvents.slice(0, 4).map((event, index) => ({
      ...event,
      id: `event-${index}`,
      timestamp: new Date(Date.now() - index * 300000), // 5 minutes apart
    }))
    setEvents(initialEvents)

    // Add new events periodically
    const interval = setInterval(() => {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)]
      const newEvent: Event = {
        ...randomEvent,
        id: `event-${Date.now()}`,
        timestamp: new Date(),
      }

      setEvents((prev) => [newEvent, ...prev].slice(0, 20)) // Keep only latest 20 events
    }, 8000) // New event every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const getEventIcon = (type: Event["type"]) => {
    const eventType = eventTypes.find((et) => et.type === type)
    return eventType ? eventType.icon : Info
  }

  const getEventColor = (type: Event["type"]) => {
    const eventType = eventTypes.find((et) => et.type === type)
    return eventType ? eventType.color : "bg-muted"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getTypeLabel = (type: Event["type"]) => {
    switch (type) {
      case "info":
        return "Info"
      case "warning":
        return "Warning"
      case "critical":
        return "Critical"
      case "success":
        return "Success"
      default:
        return "Unknown"
    }
  }

  return (
    <ScrollArea className="h-96">
      <div className="p-4 space-y-4">
        {events.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Waiting for events...</p>
          </div>
        ) : (
          events.map((event) => {
            const Icon = getEventIcon(event.type)
            return (
              <div
                key={event.id}
                className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className={`p-1.5 rounded-full ${getEventColor(event.type)} flex-shrink-0`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium truncate">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(event.timestamp)}</span>
                    {event.trainId && (
                      <>
                        <Train className="h-3 w-3 ml-2" />
                        <span>{event.trainId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </ScrollArea>
  )
}
