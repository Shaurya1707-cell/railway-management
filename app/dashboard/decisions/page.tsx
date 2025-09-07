"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export default function DecisionSupportPage() {
  const recommendations = [
    {
      id: 1,
      priority: "high",
      title: "Reroute Train T004",
      description:
        "Critical delay detected. Recommend alternative route via Eastern Line to minimize passenger impact.",
      impact: "Reduce delay by 8 minutes",
      confidence: 94,
    },
    {
      id: 2,
      priority: "medium",
      title: "Adjust Schedule",
      description: "Weather conditions suggest increasing buffer time for Northern Line by 3 minutes.",
      impact: "Improve punctuality by 12%",
      confidence: 87,
    },
    {
      id: 3,
      priority: "low",
      title: "Maintenance Window",
      description: "Optimal maintenance window identified for Platform 5 between 2:00-4:00 AM.",
      impact: "Zero service disruption",
      confidence: 98,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-chart-1 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Decision Support</h1>
            <p className="text-muted-foreground">AI-powered recommendations for optimal operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Active Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge className={getPriorityColor(rec.priority)}>{rec.priority.toUpperCase()}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-chart-1 font-medium">{rec.impact}</span>
                        <span className="text-muted-foreground">Confidence: {rec.confidence}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">AI Engine: Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">Data Feed: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Weather API: Limited</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Prediction Accuracy</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-chart-1 h-2 rounded-full" style={{ width: "94.2%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span className="font-medium">1.2s</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-chart-1 h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
