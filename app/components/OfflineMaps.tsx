import { View, Text, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface OfflineMap {
  id: string;
  name: string;
  region: string;
  size: string;
  downloaded: boolean;
  downloading: boolean;
  progress: number;
  lastUpdated?: string;
}

interface OfflineMapsProps {
  currentLocation?: string;
}

export const OfflineMaps = ({ currentLocation = 'Tourist Area' }: OfflineMapsProps) => {
  const [maps, setMaps] = useState<OfflineMap[]>([
    {
      id: '1',
      name: 'Current Area',
      region: currentLocation,
      size: '45 MB',
      downloaded: true,
      downloading: false,
      progress: 100,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'Downtown District',
      region: 'City Center',
      size: '78 MB',
      downloaded: false,
      downloading: false,
      progress: 0
    },
    {
      id: '3',
      name: 'Airport & Transport',
      region: 'Transport Hub',
      size: '32 MB',
      downloaded: false,
      downloading: true,
      progress: 65
    },
    {
      id: '4',
      name: 'Tourist Attractions',
      region: 'Historic District',
      size: '56 MB',
      downloaded: false,
      downloading: false,
      progress: 0
    },
    {
      id: '5',
      name: 'Emergency Zones',
      region: 'Safety Areas',
      size: '23 MB',
      downloaded: true,
      downloading: false,
      progress: 100,
      lastUpdated: '1 day ago'
    }
  ]);

  const handleDownloadMap = (mapId: string) => {
    setMaps(prev => prev.map(map => 
      map.id === mapId 
        ? { ...map, downloading: true, progress: 0 }
        : map
    ));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setMaps(prev => prev.map(map => 
          map.id === mapId 
            ? { ...map, downloading: false, downloaded: true, progress: 100, lastUpdated: 'Just now' }
            : map
        ));
        Alert.alert('Download Complete', 'Map has been downloaded successfully');
      } else {
        setMaps(prev => prev.map(map => 
          map.id === mapId 
            ? { ...map, progress: Math.round(progress) }
            : map
        ));
      }
    }, 500);
  };

  const handleDeleteMap = (mapId: string) => {
    Alert.alert(
      'Delete Map',
      'Are you sure you want to delete this offline map?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setMaps(prev => prev.map(map => 
              map.id === mapId 
                ? { ...map, downloaded: false, progress: 0, lastUpdated: undefined }
                : map
            ));
          }
        }
      ]
    );
  };

  const handleUpdateMap = (mapId: string) => {
    Alert.alert('Update Map', 'Checking for updates...', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Update', 
        onPress: () => {
          setMaps(prev => prev.map(map => 
            map.id === mapId 
              ? { ...map, lastUpdated: 'Just now' }
              : map
          ));
          Alert.alert('Updated', 'Map has been updated successfully');
        }
      }
    ]);
  };

  const getTotalSize = () => {
    return maps
      .filter(map => map.downloaded)
      .reduce((total, map) => total + parseInt(map.size), 0);
  };

  const getDownloadedCount = () => {
    return maps.filter(map => map.downloaded).length;
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-800">Offline Maps</Text>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-green-600 font-medium text-sm">
            {getDownloadedCount()}/{maps.length} Downloaded
          </Text>
        </View>
      </View>

      {/* Storage Info */}
      <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-blue-800 font-medium">Storage Used</Text>
            <Text className="text-blue-700 text-sm">{getTotalSize()} MB of offline maps</Text>
          </View>
          <Ionicons name="phone-portrait" size={24} color="#3b82f6" />
        </View>
      </View>

      {/* Maps List */}
      <View className="space-y-3">
        {maps.map((map) => (
          <View key={map.id} className="bg-white border border-gray-200 p-4 rounded-xl">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{map.name}</Text>
                <Text className="text-gray-600 text-sm">{map.region}</Text>
                <Text className="text-gray-500 text-xs">{map.size}</Text>
              </View>
              <View className="items-end">
                {map.downloaded ? (
                  <View className="flex-row items-center space-x-2">
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text className="text-green-600 text-xs">Downloaded</Text>
                  </View>
                ) : map.downloading ? (
                  <View className="items-end">
                    <Text className="text-blue-600 text-xs mb-1">Downloading...</Text>
                    <View className="w-16 h-2 bg-gray-200 rounded-full">
                      <View 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${map.progress}%` }}
                      />
                    </View>
                    <Text className="text-blue-600 text-xs mt-1">{map.progress}%</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleDownloadMap(map.id)}
                    className="bg-blue-500 px-3 py-1 rounded-lg"
                  >
                    <Text className="text-white text-xs font-medium">Download</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {map.lastUpdated && (
              <Text className="text-gray-500 text-xs">Updated: {map.lastUpdated}</Text>
            )}

            {map.downloaded && (
              <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <TouchableOpacity
                  onPress={() => handleUpdateMap(map.id)}
                  className="flex-row items-center"
                >
                  <Ionicons name="refresh" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm ml-1">Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteMap(map.id)}
                  className="flex-row items-center"
                >
                  <Ionicons name="trash" size={16} color="#ef4444" />
                  <Text className="text-red-600 text-sm ml-1">Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Download All Button */}
      <TouchableOpacity className="bg-blue-600 p-4 rounded-xl items-center mt-4">
        <View className="flex-row items-center">
          <Ionicons name="download" size={24} color="white" />
          <Text className="text-white font-semibold ml-2 text-lg">Download All Maps</Text>
        </View>
        <Text className="text-white/80 text-sm mt-1">
          Download all recommended maps for your area
        </Text>
      </TouchableOpacity>

      {/* Offline Features Info */}
      <View className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mt-4">
        <View className="flex-row items-center mb-2">
          <Ionicons name="information-circle" size={20} color="#f59e0b" />
          <Text className="text-yellow-800 font-semibold ml-2">Offline Features</Text>
        </View>
        <View className="space-y-1">
          <Text className="text-yellow-700 text-sm">• Navigation without internet</Text>
          <Text className="text-yellow-700 text-sm">• Emergency location services</Text>
          <Text className="text-yellow-700 text-sm">• Offline safety alerts</Text>
          <Text className="text-yellow-700 text-sm">• Pre-downloaded emergency contacts</Text>
        </View>
      </View>
    </View>
  );
};
