import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Container } from '~/components/Container';

export default function Witness() {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: 'emergency',
      location: 'Central Park, 0.5km away',
      time: '2 minutes ago',
      description: 'Medical emergency reported by tourist',
      status: 'active',
      witnesses: 3,
      severity: 'high'
    },
    {
      id: 2,
      type: 'safety',
      location: 'Main Street, 1.2km away',
      time: '15 minutes ago',
      description: 'Suspicious activity reported',
      status: 'investigating',
      witnesses: 1,
      severity: 'medium'
    }
  ]);

  const [nearbyTourists, setNearbyTourists] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      distance: '0.3 km',
      status: 'available',
      verified: true,
      country: 'USA',
      lastSeen: '5 minutes ago'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      distance: '0.8 km',
      status: 'helping',
      verified: true,
      country: 'Egypt',
      lastSeen: '2 minutes ago'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      distance: '1.1 km',
      status: 'available',
      verified: false,
      country: 'Spain',
      lastSeen: '10 minutes ago'
    }
  ]);

  const [witnessReports, setWitnessReports] = useState([
    {
      id: 1,
      alertId: 1,
      witnessName: 'John Smith',
      report: 'I saw the incident. The person fell near the fountain. I called for help immediately.',
      time: '1 minute ago',
      verified: true
    },
    {
      id: 2,
      alertId: 1,
      witnessName: 'Lisa Wang',
      report: 'I was nearby and heard the call for help. The person seems to be conscious now.',
      time: '30 seconds ago',
      verified: true
    }
  ]);

  const handleRespondToAlert = (alertId: number) => {
    Alert.alert(
      'Respond to Alert',
      'Do you want to respond to this alert and help as a witness?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Respond', 
          onPress: () => {
            Alert.alert('Response Sent', 'You have been added as a witness. Stay safe and follow instructions.');
          }
        }
      ]
    );
  };

  const handleContactTourist = (tourist: any) => {
    Alert.alert(
      'Contact Tourist',
      `Contact ${tourist.name} (${tourist.country})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Message', onPress: () => Alert.alert('Message', 'Opening chat...') },
        { text: 'Call', onPress: () => Alert.alert('Calling...', `Connecting to ${tourist.name}`) }
      ]
    );
  };

  const handleReportIncident = () => {
    Alert.alert(
      'Report Incident',
      'What type of incident would you like to report?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Safety Concern', onPress: () => Alert.alert('Report', 'Opening safety report form...') },
        { text: 'Emergency', onPress: () => Alert.alert('Emergency', 'Redirecting to emergency alert...') },
        { text: 'General Issue', onPress: () => Alert.alert('Report', 'Opening general report form...') }
      ]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'helping': return 'text-blue-600 bg-blue-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Digital Witness' }} />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* System Status */}
          <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="people" size={24} color="#3b82f6" />
              <Text className="text-blue-800 font-semibold ml-2">Digital Witness Network</Text>
            </View>
            <Text className="text-blue-700 text-sm">
              Connect with nearby tourists for mutual safety and support
            </Text>
          </View>

          {/* Active Alerts */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-800">Active Alerts</Text>
              <TouchableOpacity
                onPress={handleReportIncident}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">Report Incident</Text>
              </TouchableOpacity>
            </View>
            
            {activeAlerts.length > 0 ? (
              <View className="space-y-3">
                {activeAlerts.map((alert) => (
                  <TouchableOpacity
                    key={alert.id}
                    onPress={() => handleRespondToAlert(alert.id)}
                    className="bg-white border border-gray-200 p-4 rounded-xl"
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Ionicons 
                            name={alert.type === 'emergency' ? 'warning' : 'shield'} 
                            size={20} 
                            color={alert.type === 'emergency' ? '#ef4444' : '#3b82f6'} 
                          />
                          <Text className="font-semibold text-gray-800 ml-2">
                            {alert.type === 'emergency' ? 'Emergency Alert' : 'Safety Alert'}
                          </Text>
                          <View className={`px-2 py-1 rounded-full ml-2 ${getSeverityColor(alert.severity)}`}>
                            <Text className="text-xs font-medium">{alert.severity.toUpperCase()}</Text>
                          </View>
                        </View>
                        <Text className="text-gray-600 text-sm mb-1">{alert.description}</Text>
                        <Text className="text-gray-500 text-xs">{alert.location}</Text>
                        <Text className="text-gray-500 text-xs">{alert.time}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row items-center">
                        <Ionicons name="people" size={16} color="#6b7280" />
                        <Text className="text-gray-600 text-sm ml-1">{alert.witnesses} witnesses</Text>
                      </View>
                      <View className={`px-2 py-1 rounded-full ${
                        alert.status === 'active' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Text className="text-xs font-medium">{alert.status.toUpperCase()}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="bg-green-50 border border-green-200 p-4 rounded-xl">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  <Text className="text-green-800 font-semibold ml-2">No Active Alerts</Text>
                </View>
                <Text className="text-green-700 text-sm mt-1">All clear in your area</Text>
              </View>
            )}
          </View>

          {/* Nearby Tourists */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Nearby Tourists ({nearbyTourists.length})
            </Text>
            <View className="space-y-3">
              {nearbyTourists.map((tourist) => (
                <TouchableOpacity
                  key={tourist.id}
                  onPress={() => handleContactTourist(tourist)}
                  className="bg-white border border-gray-200 p-4 rounded-xl"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                        <Text className="text-blue-600 font-semibold">
                          {tourist.name.split(' ').map(n => n[0]).join('')}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="font-semibold text-gray-800">{tourist.name}</Text>
                          {tourist.verified && (
                            <Ionicons name="checkmark-circle" size={16} color="#10b981" className="ml-2" />
                          )}
                        </View>
                        <Text className="text-gray-600 text-sm">{tourist.country}</Text>
                        <Text className="text-gray-500 text-xs">{tourist.distance} • {tourist.lastSeen}</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <View className={`px-2 py-1 rounded-full mb-1 ${getStatusColor(tourist.status)}`}>
                        <Text className="text-xs font-medium">{tourist.status.toUpperCase()}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Witness Reports */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Recent Witness Reports</Text>
            {witnessReports.length > 0 ? (
              <View className="space-y-3">
                {witnessReports.map((report) => (
                  <View key={report.id} className="bg-white border border-gray-200 p-4 rounded-xl">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="font-semibold text-gray-800">{report.witnessName}</Text>
                      <View className="flex-row items-center">
                        {report.verified && (
                          <Ionicons name="checkmark-circle" size={16} color="#10b981" className="mr-1" />
                        )}
                        <Text className="text-gray-500 text-xs">{report.time}</Text>
                      </View>
                    </View>
                    <Text className="text-gray-700 text-sm">{report.report}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                <Text className="text-gray-600 text-center">No recent witness reports</Text>
              </View>
            )}
          </View>

          {/* Safety Guidelines */}
          <View className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
            <Text className="text-yellow-800 font-semibold mb-2">Witness Guidelines</Text>
            <View className="space-y-1">
              <Text className="text-yellow-700 text-sm">• Only respond to genuine emergencies</Text>
              <Text className="text-yellow-700 text-sm">• Stay safe while helping others</Text>
              <Text className="text-yellow-700 text-sm">• Provide accurate information</Text>
              <Text className="text-yellow-700 text-sm">• Follow local authorities' instructions</Text>
              <Text className="text-yellow-700 text-sm">• Report false or misleading alerts</Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
