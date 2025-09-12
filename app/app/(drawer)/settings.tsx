import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Container } from '~/components/Container';

export default function Settings() {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [witnessAlerts, setWitnessAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const safetyTips = [
    'Keep emergency contacts updated',
    'Enable location tracking for safety',
    'Download offline maps before traveling',
    'Share your itinerary with trusted contacts',
    'Keep your phone charged at all times',
    'Know local emergency numbers',
    'Stay in well-lit areas at night',
    'Trust your instincts'
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    Alert.alert('Language Changed', 'App language has been updated');
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Export your safety data and settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => Alert.alert('Export', 'Data exported successfully') }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your data and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => Alert.alert('Cleared', 'All data has been cleared')
        }
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact support?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => Alert.alert('Email', 'Opening email client...') },
        { text: 'Phone', onPress: () => Alert.alert('Phone', 'Calling support...') },
        { text: 'Chat', onPress: () => Alert.alert('Chat', 'Opening support chat...') }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View className="bg-white border border-gray-200 p-4 rounded-xl mb-6">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Text className="text-blue-600 font-bold text-xl">TU</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 text-lg">Tourist User</Text>
                <Text className="text-gray-600">Verified Tourist</Text>
                <Text className="text-gray-500 text-sm">ID: #12345</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Settings */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Language & Region</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <View className="p-4 border-b border-gray-100">
                <Text className="font-medium text-gray-800 mb-2">App Language</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang.code}
                      onPress={() => handleLanguageChange(lang.code)}
                      className={`mr-3 px-4 py-2 rounded-lg border-2 ${
                        language === lang.code 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <Text className="text-2xl mb-1">{lang.flag}</Text>
                      <Text className={`text-sm font-medium ${
                        language === lang.code ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {lang.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Notification Settings */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Notifications</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Push Notifications</Text>
                  <Text className="text-gray-600 text-sm">Receive app notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={notifications ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Emergency Alerts</Text>
                  <Text className="text-gray-600 text-sm">Critical safety notifications</Text>
                </View>
                <Switch
                  value={emergencyAlerts}
                  onValueChange={setEmergencyAlerts}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={emergencyAlerts ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              <View className="p-4 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Witness Alerts</Text>
                  <Text className="text-gray-600 text-sm">Nearby tourist alerts</Text>
                </View>
                <Switch
                  value={witnessAlerts}
                  onValueChange={setWitnessAlerts}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={witnessAlerts ? '#ffffff' : '#f3f4f6'}
                />
              </View>
            </View>
          </View>

          {/* Privacy & Security */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Privacy & Security</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Location Tracking</Text>
                  <Text className="text-gray-600 text-sm">Required for safety features</Text>
                </View>
                <Switch
                  value={locationTracking}
                  onValueChange={setLocationTracking}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={locationTracking ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Data Encryption</Text>
                  <Text className="text-gray-600 text-sm">End-to-end encryption enabled</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </TouchableOpacity>
              <TouchableOpacity className="p-4 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Two-Factor Authentication</Text>
                  <Text className="text-gray-600 text-sm">Add extra security</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Preferences */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">App Preferences</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Dark Mode</Text>
                  <Text className="text-gray-600 text-sm">Switch to dark theme</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={darkMode ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Offline Mode</Text>
                  <Text className="text-gray-600 text-sm">Use offline maps and features</Text>
                </View>
                <Switch
                  value={offlineMode}
                  onValueChange={setOfflineMode}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={offlineMode ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              <TouchableOpacity className="p-4 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">Auto-download Maps</Text>
                  <Text className="text-gray-600 text-sm">Download maps for visited areas</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Safety Tips */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Personalized Safety Tips</Text>
            <View className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              {safetyTips.map((tip, index) => (
                <View key={index} className="flex-row items-start mb-2">
                  <Ionicons name="checkmark-circle" size={16} color="#f59e0b" className="mt-1" />
                  <Text className="text-yellow-800 ml-2 flex-1">{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Data Management */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Data Management</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <TouchableOpacity 
                onPress={handleExportData}
                className="p-4 border-b border-gray-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Ionicons name="download" size={20} color="#6b7280" />
                  <Text className="font-medium text-gray-800 ml-3">Export Data</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleClearData}
                className="p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Ionicons name="trash" size={20} color="#ef4444" />
                  <Text className="font-medium text-red-600 ml-3">Clear All Data</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4 text-gray-800">Support</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <TouchableOpacity 
                onPress={handleContactSupport}
                className="p-4 border-b border-gray-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Ionicons name="help-circle" size={20} color="#6b7280" />
                  <Text className="font-medium text-gray-800 ml-3">Contact Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="document-text" size={20} color="#6b7280" />
                  <Text className="font-medium text-gray-800 ml-3">User Guide</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity className="p-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="information-circle" size={20} color="#6b7280" />
                  <Text className="font-medium text-gray-800 ml-3">About App</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Version */}
          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-gray-600 text-center">Tourist Safety Hub v1.0.0</Text>
            <Text className="text-gray-500 text-center text-sm mt-1">Built with ❤️ for tourist safety</Text>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
