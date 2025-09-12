"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Clock, 
  Users, 
  Search,
  Bell,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"
import { motion } from "framer-motion"

interface TouristAlert {
  id: string
  touristName: string
  location: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: 'missing' | 'distress' | 'suspicious' | 'medical'
  description: string
  timestamp: string
  status: 'active' | 'resolved' | 'investigating'
  touristId: string
}

const mockAlerts: TouristAlert[] = [
  {
    id: '1',
    touristName: 'Sarah Johnson',
    location: 'Downtown Market Square',
    severity: 'critical',
    type: 'missing',
    description: 'Tourist reported missing for 6+ hours, last seen near market area',
    timestamp: '2024-01-15 14:30',
    status: 'active',
    touristId: 'T001'
  },
  {
    id: '2',
    touristName: 'Ahmed Hassan',
    location: 'Border Checkpoint Alpha',
    severity: 'high',
    type: 'distress',
    description: 'Tourist in distress, requesting immediate assistance',
    timestamp: '2024-01-15 13:45',
    status: 'investigating',
    touristId: 'T002'
  },
  {
    id: '3',
    touristName: 'Maria Rodriguez',
    location: 'Hotel District',
    severity: 'medium',
    type: 'medical',
    description: 'Medical emergency reported, tourist requires urgent care',
    timestamp: '2024-01-15 12:20',
    status: 'resolved',
    touristId: 'T003'
  },
  {
    id: '4',
    touristName: 'David Chen',
    location: 'Industrial Zone',
    severity: 'high',
    type: 'suspicious',
    description: 'Suspicious activity reported, tourist behaving erratically',
    timestamp: '2024-01-15 11:15',
    status: 'active',
    touristId: 'T004'
  },
  {
    id: '5',
    touristName: 'Emma Thompson',
    location: 'Cultural Center',
    severity: 'low',
    type: 'distress',
    description: 'Minor incident, tourist lost and requesting directions',
    timestamp: '2024-01-15 10:30',
    status: 'resolved',
    touristId: 'T005'
  }
]

function AlertPage() {
  const [alerts, setAlerts] = useState<TouristAlert[]>(mockAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'missing': return <Users className="w-4 h-4" />
      case 'distress': return <AlertTriangle className="w-4 h-4" />
      case 'suspicious': return <Shield className="w-4 h-4" />
      case 'medical': return <AlertCircle className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <XCircle className="w-4 h-4 text-red-500" />
      case 'investigating': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.touristId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const updateAlertStatus = (alertId: string, newStatus: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus as any } : alert
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tourist Alerts</h1>
            <p className="text-gray-600 mt-1">Monitor and manage tourist safety alerts</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-red-100 text-red-800 px-3 py-1">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {alerts.filter(a => a.status === 'active').length} Active
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
              <Clock className="w-4 h-4 mr-1" />
              {alerts.filter(a => a.status === 'investigating').length} Investigating
            </Badge>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Search tourists, locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <select
                    id="severity"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setFilterSeverity('all')
                      setFilterStatus('all')
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-5 h-5 ${
                            alert.severity === 'critical' ? 'text-red-600' :
                            alert.severity === 'high' ? 'text-orange-600' :
                            alert.severity === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
                          <h3 className="font-semibold text-lg">{alert.touristName}</h3>
                        </div>
                        <Badge 
                          className={`${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge 
                          className={`${
                            alert.status === 'active' ? 'bg-red-100 text-red-800' :
                            alert.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>ID: {alert.touristId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bell className="w-4 h-4" />
                          <span>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{alert.description}</p>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Shield className="w-4 h-4 mr-1" />
                          Take Action
                        </Button>
                        {alert.status === 'active' && (
                          <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AlertPage