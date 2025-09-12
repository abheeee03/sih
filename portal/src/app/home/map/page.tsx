"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, AlertTriangle, Shield, Navigation } from "lucide-react"
import { motion } from "framer-motion"

interface RedZone {
  id: string
  name: string
  x: number
  y: number
  severity: 'high' | 'medium' | 'low'
  description: string
}

const redZones: RedZone[] = [
  {
    id: '1',
    name: 'Downtown Conflict Zone',
    x: 25,
    y: 30,
    severity: 'high',
    description: 'Active conflict reported in downtown area'
  },
  {
    id: '2',
    name: 'Border Checkpoint',
    x: 70,
    y: 15,
    severity: 'medium',
    description: 'Heavy security presence, delays expected'
  },
  {
    id: '3',
    name: 'Industrial District',
    x: 60,
    y: 70,
    severity: 'low',
    description: 'Minor unrest, avoid if possible'
  },
  {
    id: '4',
    name: 'Market Square',
    x: 40,
    y: 50,
    severity: 'high',
    description: 'Crowd control measures in effect'
  }
]

function MapPage() {
  const [selectedZone, setSelectedZone] = useState<RedZone | null>(null)
  const [showAlert, setShowAlert] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-orange-500'
      case 'low': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Security Map</h1>
            <p className="text-slate-600 mt-1">Real-time threat assessment and safe zones</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Live Updates
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              GPS Enabled
            </Badge>
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Security Alert:</strong> Multiple red zones detected. Exercise caution and avoid marked areas.
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 h-auto p-0 text-orange-600 hover:text-orange-800"
                  onClick={() => setShowAlert(false)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Interactive Security Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div 
                  ref={mapRef}
                  className="relative w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-green-100"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      linear-gradient(45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, rgba(34, 197, 94, 0.05) 75%),
                      linear-gradient(-45deg, transparent 75%, rgba(34, 197, 94, 0.05) 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 0, 0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                >
                  {/* Red Zone Markers */}
                  {redZones.map((zone) => (
                    <motion.div
                      key={zone.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + parseInt(zone.id) * 0.1 }}
                      className={`absolute w-6 h-6 rounded-full ${getSeverityColor(zone.severity)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-125 transition-all duration-200`}
                      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                      onClick={() => setSelectedZone(zone)}
                    >
                      <div className="w-full h-full rounded-full bg-white/30 animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Safe Zone Indicators */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    Safe Zone
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    Checkpoint
                  </div>
                  <div className="absolute bottom-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    Evacuation Route
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Legend */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Threat Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">High Risk</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Medium Risk</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Low Risk</span>
                </div>
              </CardContent>
            </Card>
            {/* Zone Details */}
            {selectedZone ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      {selectedZone.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`${
                          selectedZone.severity === 'high' ? 'bg-red-100 text-red-800' :
                          selectedZone.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {selectedZone.severity.toUpperCase()} RISK
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {selectedZone.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      Location: {selectedZone.x}%, {selectedZone.y}%
                    </div>
                    
                    <div className="pt-2 space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => setShowAlert(true)}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        Report Incident
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click on a zone marker to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage