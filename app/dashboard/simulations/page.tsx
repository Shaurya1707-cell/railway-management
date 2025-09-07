"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Settings, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function SimulationsPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentScenario, setCurrentScenario] = useState("peak-hours")

  const scenarios = [
    {
      id: "peak-hours",
      name: "Peak Hours Stress Test",
      description: "Simulate maximum passenger load during rush hours",
      duration: "30 min",
      complexity: "High",
    },
    {
      id: "weather-delay",
      name: "Weather Impact Analysis",
      description: "Test system resilience during severe weather conditions",
      duration: "45 min",
      complexity: "Medium",
    },
    {
      id: "signal-failure",
      name: "Signal System Failure",
      description: "Emergency response simulation for critical infrastructure failure",
      duration: "60 min",
      complexity: "Critical",
    },
    {
      id: "maintenance",
      name: "Planned Maintenance",
      description: "Optimize schedules during planned maintenance windows",
      duration: "20 min",
      complexity: "Low",
    },
  ]

  const results = [
    {
      scenario: "Peak Hours Stress Test",
      date: "2024-01-15",
      outcome: "Passed",
      efficiency: 94,
      recommendations: 3,
    },
    {
      scenario: "Weather Impact Analysis",
      date: "2024-01-14",
      outcome: "Warning",
      efficiency: 78,
      recommendations: 7,
    },
    {
      scenario: "Signal System Failure",
      date: "2024-01-13",
      outcome: "Failed",
      efficiency: 45,
      recommendations: 12,
    },
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-chart-1 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Critical":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "Passed":
        return "bg-chart-1 text-white"
      case "Warning":
        return "bg-yellow-500 text-white"
      case "Failed":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Simulations & What-If Analysis</h1>
            <p className="text-muted-foreground">Test scenarios and optimize operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentScenario === scenario.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setCurrentScenario(scenario.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{scenario.name}</h3>
                          <Badge className={getComplexityColor(scenario.complexity)}>{scenario.complexity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        <div className="text-xs text-muted-foreground">Duration: {scenario.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{result.scenario}</h4>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{result.efficiency}% Efficiency</div>
                          <div className="text-xs text-muted-foreground">{result.recommendations} recommendations</div>
                        </div>
                        <Badge className={getOutcomeColor(result.outcome)}>{result.outcome}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulation Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selected Scenario</label>
                  <div className="p-2 bg-muted rounded text-sm">
                    {scenarios.find((s) => s.id === currentScenario)?.name}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    className="flex-1"
                    variant={isRunning ? "destructive" : "default"}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {isRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>34%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "34%" }} />
                    </div>
                    <div className="text-xs text-muted-foreground">Estimated time remaining: 12 minutes</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">Simulations Run: 47</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">Success Rate: 78%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">Avg Efficiency: 84%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
