"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Train } from "lucide-react"

export default function SchedulePage() {
  const schedules = [
    {
      trainId: "21295",
      line: "Central",
      departure: "06:00",
      arrival: "06:45",
      from: "Mumbai central",
      to: "New Delhi",
      status: "on-time",
      platform: "3A",
    },
    {
      trainId: "15128",
      line: "Northern",
      departure: "06:15",
      arrival: "07:20",
      from: "New Delhi",
      to: "Banaras",
      status: "delayed",
      platform: "1B",
      delay: 5,
    },
    {
      trainId: "14003",
      line: "Eastern",
      departure: "06:30",
      arrival: "07:15",
      from: "Malda Town",
      to: "New Delhi",
      status: "on-time",
      platform: "2A",
    },
    {
      trainId: "22665",
      line: "Southern",
      departure: "06:45",
      arrival: "07:30",
      from: "Bengaluru",
      to: "coimbatore",
      status: "critical",
      platform: "4B",
      delay: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-chart-1 text-white"
      case "delayed":
        return "bg-yellow-500 text-white"
      case "critical":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Schedule & Timetable</h1>
            <p className="text-muted-foreground">Current train schedules and timetables</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4 text-chart-1" />
                <span className="text-sm font-medium">On Time</span>
              </div>
              <div className="text-2xl font-bold mt-2">{schedules.filter((s) => s.status === "on-time").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Delayed</span>
              </div>
              <div className="text-2xl font-bold mt-2">{schedules.filter((s) => s.status === "delayed").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <div className="text-2xl font-bold mt-2">{schedules.filter((s) => s.status === "critical").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Lines</span>
              </div>
              <div className="text-2xl font-bold mt-2">4</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Train</th>
                    <th className="text-left p-3">Line</th>
                    <th className="text-left p-3">Route</th>
                    <th className="text-left p-3">Departure</th>
                    <th className="text-left p-3">Arrival</th>
                    <th className="text-left p-3">Platform</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule) => (
                    <tr key={schedule.trainId} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{schedule.trainId}</td>
                      <td className="p-3">{schedule.line}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span>{schedule.from}</span>
                          <span className="text-muted-foreground">→</span>
                          <span>{schedule.to}</span>
                        </div>
                      </td>
                      <td className="p-3">{schedule.departure}</td>
                      <td className="p-3">
                        {schedule.arrival}
                        {schedule.delay && (
                          <span className="text-destructive text-sm ml-2">(+{schedule.delay}min)</span>
                        )}
                      </td>
                      <td className="p-3">{schedule.platform}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
