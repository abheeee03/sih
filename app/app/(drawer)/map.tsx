import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Container } from '~/components/Container';
import { OfflineMaps } from '~/components/OfflineMaps';

const { width, height } = Dimensions.get('window');

export default function Map() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapView, setMapView] = useState('standard');

  const categories = [
    { id: 'all', name: 'All', icon: 'grid' },
    { id: 'hotels', name: 'Hotels', icon: 'bed' },
    { id: 'hospitals', name: 'Hospitals', icon: 'medical' },
    { id: 'police', name: 'Police', icon: 'shield' },
    { id: 'restaurants', name: 'Restaurants', icon: 'restaurant' },
    { id: 'safe', name: 'Safe Zones', icon: 'checkmark-circle' },
    { id: 'alert', name: 'Alert Zones', icon: 'warning' }
  ];

  const nearbyLocations = [
    {
      id: 1,
      name: 'Grand Hotel Plaza',
      type: 'hotel',
      category: 'hotels',
      rating: 4.8,
      distance: '0.5 km',
      verified: true,
      safe: true,
      features: ['WiFi', 'Parking', '24/7 Security'],
      contact: '+91 98765 43210',
      address: '123 Main Street, Tourist Area'
    },
    {
      id: 2,
      name: 'City General Hospital',
      type: 'hospital',
      category: 'hospitals',
      rating: 4.6,
      distance: '1.2 km',
      verified: true,
      safe: true,
      features: ['Emergency', '24/7', 'English Speaking Staff'],
      contact: '+91 98765 43211',
      address: '456 Health Street, Medical District'
    },
    {
      id: 3,
      name: 'Central Police Station',
      type: 'police',
      category: 'police',
      rating: 4.5,
      distance: '0.8 km',
      verified: true,
      safe: true,
      features: ['Tourist Help Desk', 'English Speaking', '24/7'],
      contact: '+91 98765 43212',
      address: '789 Security Avenue, Government Area'
    },
    {
      id: 4,
      name: 'Safe Restaurant',
      type: 'restaurant',
      category: 'restaurants',
      rating: 4.7,
      distance: '0.3 km',
      verified: true,
      safe: true,
      features: ['Tourist Friendly', 'Clean', 'Good Reviews'],
      contact: '+91 98765 43213',
      address: '321 Food Street, Tourist Area'
    },
    {
      id: 5,
      name: 'High Alert Zone',
      type: 'alert',
      category: 'alert',
      rating: 0,
      distance: '2.1 km',
      verified: false,
      safe: false,
      features: ['Avoid Area', 'High Crime', 'No Tourist Services'],
      contact: 'N/A',
      address: 'Dangerous Area, Avoid'
    }
  ];

  const alertZones = [
    {
      id: 1,
      name: 'High Crime Area',
      type: 'danger',
      radius: '500m',
      description: 'Avoid this area, especially at night'
    },
    {
      id: 2,
      name: 'Construction Zone',
      type: 'warning',
      radius: '200m',
      description: 'Heavy construction, use alternative routes'
    }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? nearbyLocations 
    : nearbyLocations.filter(location => location.category === selectedCategory);

  const handleLocationPress = (location: any) => {
    Alert.alert(
      location.name,
      `${location.address}\n\nContact: ${location.contact}\nDistance: ${location.distance}\n\nFeatures: ${location.features.join(', ')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...', `Connecting to ${location.name}`) },
        { text: 'Directions', onPress: () => Alert.alert('Directions', 'Opening navigation...') }
      ]
    );
  };

  const handleEmergencyZone = (zone: any) => {
    Alert.alert(
      'Alert Zone',
      `${zone.name}\n\n${zone.description}\n\nRadius: ${zone.radius}`,
      [
        { text: 'OK' },
        { text: 'Report Issue', onPress: () => Alert.alert('Report', 'Thank you for reporting. Authorities have been notified.') }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Safety Map' }} />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Map View Toggle */}
          <View className="flex-row bg-gray-100 rounded-lg p-1 mb-6">
            <TouchableOpacity
              onPress={() => setMapView('standard')}
              className={`flex-1 py-2 rounded-md ${mapView === 'standard' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`text-center font-medium ${mapView === 'standard' ? 'text-gray-900' : 'text-gray-600'}`}>
                Standard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMapView('satellite')}
              className={`flex-1 py-2 rounded-md ${mapView === 'satellite' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`text-center font-medium ${mapView === 'satellite' ? 'text-gray-900' : 'text-gray-600'}`}>
                Satellite
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMapView('offline')}
              className={`flex-1 py-2 rounded-md ${mapView === 'offline' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`text-center font-medium ${mapView === 'offline' ? 'text-gray-900' : 'text-gray-600'}`}>
                Offline
              </Text>
            </TouchableOpacity>
          </View>

          {/* Map Placeholder */}
          <View className="bg-gray-200 h-64 rounded-xl mb-6 items-center justify-center">
            <Ionicons name="map" size={48} color="#6b7280" />
            <Text className="text-gray-600 mt-2">Interactive Map View</Text>
            <Text className="text-gray-500 text-sm">Tap to view full map</Text>
          </View>

          {/* Category Filter */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Filter Locations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                    selectedCategory === category.id 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200'
                  }`}
                >
                  <Ionicons 
                    name={category.icon as any} 
                    size={16} 
                    color={selectedCategory === category.id ? 'white' : '#6b7280'} 
                  />
                  <Text className={`ml-2 font-medium ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Alert Zones */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Alert Zones</Text>
            {alertZones.map((zone) => (
              <TouchableOpacity
                key={zone.id}
                onPress={() => handleEmergencyZone(zone)}
                className={`p-4 rounded-xl mb-3 border-2 ${
                  zone.type === 'danger' 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-yellow-300 bg-yellow-50'
                }`}
              >
                <View className="flex-row items-center">
                  <Ionicons 
                    name={zone.type === 'danger' ? 'warning' : 'alert-circle'} 
                    size={24} 
                    color={zone.type === 'danger' ? '#dc2626' : '#f59e0b'} 
                  />
                  <View className="ml-3 flex-1">
                    <Text className={`font-semibold ${
                      zone.type === 'danger' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {zone.name}
                    </Text>
                    <Text className={`text-sm ${
                      zone.type === 'danger' ? 'text-red-700' : 'text-yellow-700'
                    }`}>
                      {zone.description}
                    </Text>
                    <Text className={`text-xs mt-1 ${
                      zone.type === 'danger' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      Radius: {zone.radius}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nearby Locations */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Nearby Locations ({filteredLocations.length})
            </Text>
            {filteredLocations.map((location) => (
              <TouchableOpacity
                key={location.id}
                onPress={() => handleLocationPress(location)}
                className={`p-4 rounded-xl mb-3 border-2 ${
                  location.safe 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <View className="flex-row items-start">
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                    location.category === 'hotels' ? 'bg-blue-100' :
                    location.category === 'hospitals' ? 'bg-green-100' :
                    location.category === 'police' ? 'bg-blue-100' :
                    location.category === 'restaurants' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}>
                    <Ionicons 
                      name={
                        location.category === 'hotels' ? 'bed' :
                        location.category === 'hospitals' ? 'medical' :
                        location.category === 'police' ? 'shield' :
                        location.category === 'restaurants' ? 'restaurant' :
                        'warning'
                      } 
                      size={24} 
                      color={
                        location.category === 'hotels' ? '#3b82f6' :
                        location.category === 'hospitals' ? '#10b981' :
                        location.category === 'police' ? '#3b82f6' :
                        location.category === 'restaurants' ? '#f59e0b' :
                        '#ef4444'
                      } 
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-semibold text-gray-800">{location.name}</Text>
                      {location.verified && (
                        <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                      )}
                    </View>
                    <Text className="text-gray-600 text-sm mb-1">{location.address}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-gray-500 text-xs">{location.distance}</Text>
                      {location.rating > 0 && (
                        <View className="flex-row items-center">
                          <Ionicons name="star" size={12} color="#f59e0b" />
                          <Text className="text-gray-600 text-xs ml-1">{location.rating}</Text>
                        </View>
                      )}
                    </View>
                    <View className="flex-row flex-wrap mt-2">
                      {location.features.slice(0, 3).map((feature, index) => (
                        <View key={index} className="bg-white px-2 py-1 rounded-full mr-2 mb-1">
                          <Text className="text-xs text-gray-600">{feature}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Offline Maps */}
          <OfflineMaps currentLocation="Tourist Area" />
        </ScrollView>
      </Container>
    </>
  );
}
