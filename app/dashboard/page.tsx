"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KPIBar } from "@/components/dashboard/kpi-bar"
import { TrainMap } from "@/components/dashboard/train-map"
import { LiveEventFeed } from "@/components/dashboard/live-event-feed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPI Bar */}
        <KPIBar />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Train Map - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Train Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <TrainMap />
              </CardContent>
            </Card>
          </div>

          {/* Live Event Feed - Takes up 1/3 of the space */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Live Events</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <LiveEventFeed />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
