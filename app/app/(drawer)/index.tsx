import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Container } from '~/components/Container';
import { PersonalizedSafetyTips } from '~/components/PersonalizedSafetyTips';

export default function Home() {
  const quickActions = [
    {
      title: 'SOS Alert',
      icon: 'alert-octagon',
      iconSet: 'Feather',
      gradient: ['#FF6B6B', '#FF8E53'],
      href: '/emergency',
      description: 'Emergency SMS'
    },
    {
      title: 'ID Verify',
      icon: 'shield-check',
      iconSet: 'MaterialCommunityIcons',
      gradient: ['#667EEA', '#764BA2'],
      href: '/id-verification',
      description: 'Secure docs'
    },
    {
      title: 'Safe Map',
      icon: 'map-pin',
      iconSet: 'Feather',
      gradient: ['#56CCF2', '#2F80ED'],
      href: '/map',
      description: 'Safe zones'
    },
    {
      title: 'Witness',
      icon: 'users',
      iconSet: 'Feather',
      gradient: ['#F093FB', '#F5576C'],
      href: '/witness',
      description: 'Connect nearby'
    }
  ];

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: 'shield', color: '#3B82F6' },
    { name: 'Medical', number: '108', icon: 'heart', color: '#EF4444' },
    { name: 'Fire', number: '101', icon: 'flame', color: '#F97316' }
  ];

  const renderIcon = (iconName: string, iconSet: string, size: number, color: string) => {
    switch(iconSet) {
      case 'Feather':
        return <Feather name={iconName as any} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
      default:
        return <Ionicons name={iconName as any} size={size} color={color} />;
    }
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: false
      }} />
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Modern Header with Gradient */}
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-6 pt-8 pb-24 rounded-b-[40px]"
          >
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-white/80 text-sm font-medium">Welcome back,</Text>
                <Text className="text-white text-2xl font-bold mt-1">Stay Safe Traveler</Text>
              </View>
              <TouchableOpacity className="bg-white/20 p-3 rounded-full backdrop-blur">
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Safety Status Card */}
            <View className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-green-400 w-3 h-3 rounded-full mr-2" />
                  <Text className="text-white font-semibold">Protection Active</Text>
                </View>
                <Feather name="shield" size={20} color="white" />
              </View>
              <Text className="text-white/80 text-xs mt-2">Real-time location monitoring enabled</Text>
            </View>
          </LinearGradient>

          <View className="px-6 -mt-12">
            {/* Quick Actions Grid - Elevated Cards */}
            <View className="flex-row flex-wrap justify-between mb-8">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href as any} asChild>
                  <TouchableOpacity 
                    className="w-[48%] mb-4"
                    activeOpacity={0.7}
                  >
                    <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <LinearGradient
                        colors={action.gradient as [string, string]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="p-4 items-center"
                      >
                        {renderIcon(action.icon, action.iconSet, 28, 'white')}
                        <Text className="text-white font-bold mt-3 text-sm">{action.title}</Text>
                        <Text className="text-white/90 text-xs mt-1">{action.description}</Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>

            {/* Emergency Contacts - Modern Pills */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-800 font-bold text-lg">Quick Dial</Text>
                <TouchableOpacity>
                  <Text className="text-indigo-600 text-sm font-medium">Edit</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {emergencyContacts.map((contact, index) => (
                  <TouchableOpacity 
                    key={index}
                    className="mr-3"
                    onPress={() => Alert.alert(`Call ${contact.name}`, `Dial ${contact.number}?`)}
                  >
                    <View className="bg-white rounded-2xl shadow-sm p-4 flex-row items-center">
                      <View 
                        className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                        style={{ backgroundColor: `${contact.color}20` }}
                      >
                        <Feather name={contact.icon as any} size={20} color={contact.color} />
                      </View>
                      <View>
                        <Text className="text-gray-800 font-semibold">{contact.name}</Text>
                        <Text className="text-gray-500 text-sm">{contact.number}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Safety Tips - Modern Card Design */}
            <View className="mb-8">
              <Text className="text-gray-800 font-bold text-lg mb-4">Safety Insights</Text>
              <View className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5">
                <View className="flex-row items-center mb-3">
                  <View className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Feather name="info" size={16} color="#667EEA" />
                  </View>
                  <Text className="text-gray-800 font-semibold">Today's Tips</Text>
                </View>
                <View className="space-y-2">
                  {['Keep documents digitized', 'Share live location', 'Stay in lit areas after dark'].map((tip, index) => (
                    <View key={index} className="flex-row items-start">
                      <Text className="text-indigo-600 mr-2">•</Text>
                      <Text className="text-gray-700 text-sm flex-1">{tip}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Location Status - Floating Card */}
            <TouchableOpacity className="mb-8">
              <View className="bg-white rounded-2xl shadow-sm p-5">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-blue-50 p-3 rounded-xl mr-4">
                      <Feather name="map" size={24} color="#3B82F6" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 font-semibold">Current Area</Text>
                      <Text className="text-gray-500 text-sm mt-1">Tourist Zone - Safe</Text>
                    </View>
                  </View>
                  <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-700 text-xs font-semibold">LOW RISK</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bottom Safety Score */}
            <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-700 text-sm">Your Safety Score</Text>
                  <Text className="text-gray-900 text-2xl font-bold mt-1">92/100</Text>
                </View>
                <View className="bg-green-100 p-4 rounded-full">
                  <Feather name="award" size={28} color="#10B981" />
                </View>
              </View>
              <View className="bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
                <View className="bg-gradient-to-r from-green-400 to-emerald-500 h-full w-[92%] rounded-full" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}