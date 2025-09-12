"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", tourists: 2847, alerts: 23 },
  { date: "2024-04-02", tourists: 3120, alerts: 18 },
  { date: "2024-04-03", tourists: 2956, alerts: 31 },
  { date: "2024-04-04", tourists: 3245, alerts: 25 },
  { date: "2024-04-05", tourists: 3567, alerts: 42 },
  { date: "2024-04-06", tourists: 3789, alerts: 38 },
  { date: "2024-04-07", tourists: 3421, alerts: 29 },
  { date: "2024-04-08", tourists: 3890, alerts: 35 },
  { date: "2024-04-09", tourists: 2654, alerts: 19 },
  { date: "2024-04-10", tourists: 3123, alerts: 27 },
  { date: "2024-04-11", tourists: 3456, alerts: 33 },
  { date: "2024-04-12", tourists: 3234, alerts: 28 },
  { date: "2024-04-13", tourists: 3567, alerts: 41 },
  { date: "2024-04-14", tourists: 2789, alerts: 22 },
  { date: "2024-04-15", tourists: 2567, alerts: 17 },
  { date: "2024-04-16", tourists: 2890, alerts: 24 },
  { date: "2024-04-17", tourists: 4123, alerts: 45 },
  { date: "2024-04-18", tourists: 3987, alerts: 38 },
  { date: "2024-04-19", tourists: 3234, alerts: 26 },
  { date: "2024-04-20", tourists: 2456, alerts: 15 },
  { date: "2024-04-21", tourists: 2789, alerts: 21 },
  { date: "2024-04-22", tourists: 3123, alerts: 28 },
  { date: "2024-04-23", tourists: 2890, alerts: 32 },
  { date: "2024-04-24", tourists: 3567, alerts: 37 },
  { date: "2024-04-25", tourists: 3234, alerts: 29 },
  { date: "2024-04-26", tourists: 2567, alerts: 18 },
  { date: "2024-04-27", tourists: 4123, alerts: 44 },
  { date: "2024-04-28", tourists: 2789, alerts: 23 },
  { date: "2024-04-29", tourists: 3456, alerts: 31 },
  { date: "2024-04-30", tourists: 4234, alerts: 39 },
  { date: "2024-05-01", tourists: 2890, alerts: 25 },
  { date: "2024-05-02", tourists: 3234, alerts: 33 },
  { date: "2024-05-03", tourists: 3123, alerts: 28 },
  { date: "2024-05-04", tourists: 3987, alerts: 42 },
  { date: "2024-05-05", tourists: 4567, alerts: 38 },
  { date: "2024-05-06", tourists: 4789, alerts: 45 },
  { date: "2024-05-07", tourists: 4123, alerts: 35 },
  { date: "2024-05-08", tourists: 2789, alerts: 22 },
  { date: "2024-05-09", tourists: 3123, alerts: 26 },
  { date: "2024-05-10", tourists: 3456, alerts: 34 },
  { date: "2024-05-11", tourists: 3567, alerts: 31 },
  { date: "2024-05-12", tourists: 2890, alerts: 27 },
  { date: "2024-05-13", tourists: 2890, alerts: 19 },
  { date: "2024-05-14", tourists: 4567, alerts: 48 },
  { date: "2024-05-15", tourists: 4789, alerts: 41 },
  { date: "2024-05-16", tourists: 3567, alerts: 37 },
  { date: "2024-05-17", tourists: 4890, alerts: 44 },
  { date: "2024-05-18", tourists: 3456, alerts: 35 },
  { date: "2024-05-19", tourists: 3123, alerts: 26 },
  { date: "2024-05-20", tourists: 2789, alerts: 28 },
  { date: "2024-05-21", tourists: 2456, alerts: 17 },
  { date: "2024-05-22", tourists: 2456, alerts: 15 },
  { date: "2024-05-23", tourists: 3234, alerts: 32 },
  { date: "2024-05-24", tourists: 3456, alerts: 28 },
  { date: "2024-05-25", tourists: 2890, alerts: 29 },
  { date: "2024-05-26", tourists: 2987, alerts: 24 },
  { date: "2024-05-27", tourists: 4234, alerts: 46 },
  { date: "2024-05-28", tourists: 3123, alerts: 25 },
  { date: "2024-05-29", tourists: 2456, alerts: 16 },
  { date: "2024-05-30", tourists: 3567, alerts: 33 },
  { date: "2024-05-31", tourists: 2789, alerts: 28 },
  { date: "2024-06-01", tourists: 2789, alerts: 25 },
  { date: "2024-06-02", tourists: 4567, alerts: 41 },
  { date: "2024-06-03", tourists: 2456, alerts: 19 },
  { date: "2024-06-04", tourists: 4234, alerts: 38 },
  { date: "2024-06-05", tourists: 2456, alerts: 17 },
  { date: "2024-06-06", tourists: 3456, alerts: 29 },
  { date: "2024-06-07", tourists: 3567, alerts: 36 },
  { date: "2024-06-08", tourists: 3987, alerts: 33 },
  { date: "2024-06-09", tourists: 4234, alerts: 45 },
  { date: "2024-06-10", tourists: 2789, alerts: 25 },
  { date: "2024-06-11", tourists: 2456, alerts: 18 },
  { date: "2024-06-12", tourists: 4789, alerts: 42 },
  { date: "2024-06-13", tourists: 2456, alerts: 16 },
  { date: "2024-06-14", tourists: 4123, alerts: 38 },
  { date: "2024-06-15", tourists: 3456, alerts: 35 },
  { date: "2024-06-16", tourists: 3567, alerts: 31 },
  { date: "2024-06-17", tourists: 4567, alerts: 48 },
  { date: "2024-06-18", tourists: 2456, alerts: 21 },
  { date: "2024-06-19", tourists: 3567, alerts: 32 },
  { date: "2024-06-20", tourists: 4123, alerts: 44 },
  { date: "2024-06-21", tourists: 2789, alerts: 26 },
  { date: "2024-06-22", tourists: 3456, alerts: 31 },
  { date: "2024-06-23", tourists: 4567, alerts: 49 },
  { date: "2024-06-24", tourists: 2456, alerts: 22 },
  { date: "2024-06-25", tourists: 2567, alerts: 24 },
  { date: "2024-06-26", tourists: 4123, alerts: 38 },
  { date: "2024-06-27", tourists: 4234, alerts: 45 },
  { date: "2024-06-28", tourists: 2789, alerts: 25 },
  { date: "2024-06-29", tourists: 2456, alerts: 19 },
  { date: "2024-06-30", tourists: 4123, alerts: 40 },
]

const chartConfig = {
  tourists: {
    label: "Active Tourists",
    color: "var(--primary)",
  },
  alerts: {
    label: "Safety Alerts",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Tourist Safety Monitoring</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Active tourists and safety alerts for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTourists" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tourists)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tourists)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAlerts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-alerts)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-alerts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="alerts"
              type="natural"
              fill="url(#fillAlerts)"
              stroke="var(--color-alerts)"
              stackId="a"
            />
            <Area
              dataKey="tourists"
              type="natural"
              fill="url(#fillTourists)"
              stroke="var(--color-tourists)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
