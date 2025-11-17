"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FileText, Users, TrendingUp, Eye, Activity, Calendar, X } from "lucide-react"
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

type FilterType = "7days" | "30days" | "12months" | "custom"

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("7days")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [customDateLabel, setCustomDateLabel] = useState("")

  const stats = [
    { label: "Total Blog Posts", value: "12", icon: FileText, color: "text-blue-500", trend: "+2 this month" },
    { label: "Total Visitors", value: "2,543", icon: Users, color: "text-green-500", trend: "+18% from last month" },
    { label: "Total Page Views", value: "15,234", icon: Eye, color: "text-orange-500", trend: "+12% this week" },
  ]

  // Analytics data for different periods
  const data7Days = [
    { day: "Mon", blogPosts: 2, visitors: 1850, pageViews: 12400 },
    { day: "Tue", blogPosts: 1, visitors: 2100, pageViews: 13200 },
    { day: "Wed", blogPosts: 3, visitors: 2300, pageViews: 14100 },
    { day: "Thu", blogPosts: 2, visitors: 2450, pageViews: 15800 },
    { day: "Fri", blogPosts: 1, visitors: 2200, pageViews: 13900 },
    { day: "Sat", blogPosts: 2, visitors: 2600, pageViews: 16200 },
    { day: "Sun", blogPosts: 1, visitors: 2543, pageViews: 15234 },
  ]

  const data30Days = [
    { day: "Week 1", blogPosts: 8, visitors: 6500, pageViews: 42000 },
    { day: "Week 2", blogPosts: 12, visitors: 7200, pageViews: 48000 },
    { day: "Week 3", blogPosts: 10, visitors: 8100, pageViews: 52000 },
    { day: "Week 4", blogPosts: 15, visitors: 9000, pageViews: 58000 },
  ]

  const data12Months = [
    { day: "Jan", blogPosts: 45, visitors: 28000, pageViews: 180000 },
    { day: "Feb", blogPosts: 52, visitors: 32000, pageViews: 205000 },
    { day: "Mar", blogPosts: 48, visitors: 35000, pageViews: 225000 },
    { day: "Apr", blogPosts: 55, visitors: 38000, pageViews: 245000 },
    { day: "May", blogPosts: 60, visitors: 42000, pageViews: 270000 },
    { day: "Jun", blogPosts: 58, visitors: 45000, pageViews: 290000 },
    { day: "Jul", blogPosts: 62, visitors: 48000, pageViews: 310000 },
    { day: "Aug", blogPosts: 65, visitors: 51000, pageViews: 330000 },
    { day: "Sep", blogPosts: 70, visitors: 55000, pageViews: 355000 },
    { day: "Oct", blogPosts: 68, visitors: 58000, pageViews: 375000 },
    { day: "Nov", blogPosts: 72, visitors: 62000, pageViews: 400000 },
    { day: "Dec", blogPosts: 75, visitors: 65000, pageViews: 420000 },
  ]

  const handleFilterChange = (value: FilterType) => {
    setSelectedFilter(value)
    if (value === "custom") {
      setShowDatePicker(true)
    } else {
      setShowDatePicker(false)
    }
  }

  const handleApplyCustomRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      setCustomDateLabel(`${start} - ${end}`)
      setShowDatePicker(false)
    }
  }

  const handleCancelCustomRange = () => {
    setShowDatePicker(false)
    setSelectedFilter("7days")
    setStartDate("")
    setEndDate("")
    setCustomDateLabel("")
  }

  const getAnalyticsData = () => {
    switch (selectedFilter) {
      case "7days":
        return data7Days
      case "30days":
        return data30Days
      case "12months":
        return data12Months

      default:
        return data7Days
    }
  }

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case "7days":
        return "Last 7 Days"
      case "30days":
        return "Last 30 Days"
      case "12months":
        return "Last 12 Months"
      default:
        return "Last 7 Days"
    }
  }

  const analyticsData = getAnalyticsData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h2>
        <p className="text-muted-foreground">Here's an overview of your dashboard performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  {stat.label}
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Analytics Graph Section */}
      <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                Analytics Overview
              </CardTitle>
              <CardDescription className="mt-2">Performance metrics for {getFilterLabel().toLowerCase()}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value as FilterType)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="12months">Last 12 Months</option>
              </select>
            </div>
          </div>
        </CardHeader>


        <CardContent>
          <div className="space-y-8">
            {/* Area Chart - Visitors & Page Views */}
            <div className="bg-background/50 rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Traffic Trends
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                    name="Visitors"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pageViews" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPageViews)" 
                    name="Page Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Blog Posts & Engagement */}
            <div className="grid md:grid-cols-1 gap-6">
              <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Blog Posts Published
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsBar data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="blogPosts" fill="#3b82f6" name="Blog Posts" radius={[8, 8, 0, 0]} />
                  </RechartsBar>
                </ResponsiveContainer>
              </div>

            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  )
}