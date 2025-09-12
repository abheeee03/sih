import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Switch, SafeAreaView, StatusBar, Animated, Modal } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Emergency() {
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [location, setLocation] = useState('Fetching location...');
  const [message, setMessage] = useState('');
  const [sendSMS, setSendSMS] = useState(true);
  const [sendToWitnesses, setSendToWitnesses] = useState(true);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simulate location fetch
    setTimeout(() => {
      setLocation('Times Square, New York, NY 10036');
    }, 2000);

    // Pulse animation for SOS button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Cleanup countdown interval on unmount
  useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [countdownInterval]);

  const emergencyTypes = [
    {
      id: 'medical',
      title: 'Medical',
      subtitle: 'Health emergency',
      icon: 'heart',
      gradient: ['#EF4444', '#DC2626'],
    },
    {
      id: 'security',
      title: 'Security',
      subtitle: 'Threat or danger',
      icon: 'shield',
      gradient: ['#3B82F6', '#2563EB'],
    },
    {
      id: 'accident',
      title: 'Accident',
      subtitle: 'Traffic or injury',
      icon: 'alert-triangle',
      gradient: ['#F59E0B', '#D97706'],
    },
    {
      id: 'lost',
      title: 'Lost',
      subtitle: 'Need assistance',
      icon: 'map-pin',
      gradient: ['#8B5CF6', '#7C3AED'],
    }
  ];

  const quickContacts = [
    { 
      name: 'Police', 
      number: '100', 
      icon: 'shield',
      gradient: ['#3B82F6', '#2563EB'],
      response: '2-5 min'
    },
    { 
      name: 'Medical', 
      number: '108', 
      icon: 'heart',
      gradient: ['#EF4444', '#DC2626'],
      response: '3-7 min'
    },
    { 
      name: 'Fire', 
      number: '101', 
      icon: 'flame',
      gradient: ['#F97316', '#EA580C'],
      response: '5-10 min'
    }
  ];

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdown(10);
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCountdownInterval(null);
          // Emergency alert sent automatically
          sendEmergencyAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setCountdownInterval(interval);
  };

  const cancelEmergency = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setCountdownInterval(null);
    }
    setShowCountdown(false);
    setCountdown(10);
    console.log('Emergency cancelled by user');
  };

  const sendEmergencyAlert = () => {
    setShowCountdown(false);
    setIsEmergencyActive(true);
    console.log('Emergency alert sent automatically - no user intervention');
    Alert.alert(
      '✅ SOS Sent Successfully',
      'Emergency services have been notified. Stay calm, help is on the way.',
      [{ text: 'OK' }]
    );
  };

  const handleEmergencyAlert = () => {
    if (!emergencyType) {
      Alert.alert('Select Emergency Type', 'Please select the type of emergency first');
      return;
    }

    startCountdown();
  };

  const handleQuickCall = (contact: any) => {
    Alert.alert(
      `Call ${contact.name}`,
      `Emergency line: ${contact.number}\nEstimated response: ${contact.response}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => console.log(`Calling ${contact.number}`) }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: false
      }} />
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="light-content" />
        
        {/* Emergency Header */}
        <LinearGradient
          colors={isEmergencyActive ? ['#EF4444', '#DC2626'] : ['#EF4444', '#F97316']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-4 pb-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-4">
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-xl font-bold">Emergency SOS</Text>
            </View>
            {isEmergencyActive && (
              <View className="bg-white/30 px-3 py-1 rounded-full flex-row items-center">
                <View className="bg-white w-2 h-2 rounded-full mr-2" />
                <Text className="text-white text-xs font-semibold">ACTIVE</Text>
              </View>
            )}
          </View>

          {/* Big SOS Button */}
          <TouchableOpacity 
            onPress={handleEmergencyAlert}
            activeOpacity={0.8}
          >
            <Animated.View 
              style={{ transform: [{ scale: pulseAnim }] }}
              className="bg-white/20 backdrop-blur rounded-full p-8 self-center"
            >
              <View className="bg-white rounded-full w-24 h-24 items-center justify-center">
                <Text className="text-red-600 font-black text-2xl">SOS</Text>
                <Text className="text-gray-600 text-xs">TAP TO ALERT</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
          {/* Quick Emergency Calls */}
          <Text className="text-gray-800 font-bold text-lg mb-3">Quick Emergency Dial</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-6"
          >
            {quickContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleQuickCall(contact)}
                className="mr-3"
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={contact.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl p-4 w-32"
                >
                  <View className="bg-white/20 w-10 h-10 rounded-xl items-center justify-center mb-2">
                    <Feather name={contact.icon as any} size={20} color="white" />
                  </View>
                  <Text className="text-white font-bold">{contact.name}</Text>
                  <Text className="text-white/90 text-sm">{contact.number}</Text>
                  <Text className="text-white/70 text-xs mt-1">{contact.response}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Emergency Type Selection */}
          <Text className="text-gray-800 font-bold text-lg mb-3">What's your emergency?</Text>
          <View className="flex-row flex-wrap justify-between mb-6">
            {emergencyTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setEmergencyType(type.id)}
                className="w-[48%] mb-3"
                activeOpacity={0.7}
              >
                <View className={`bg-white rounded-2xl shadow-sm p-4 border-2 ${
                  emergencyType === type.id ? 'border-red-400' : 'border-transparent'
                }`}>
                  <LinearGradient
                    colors={type.gradient as [string, string]}
                    className="w-12 h-12 rounded-xl items-center justify-center mb-2"
                  >
                    <Feather name={type.icon as any} size={24} color="white" />
                  </LinearGradient>
                  <Text className="font-semibold text-gray-800">{type.title}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{type.subtitle}</Text>
                  {emergencyType === type.id && (
                    <View className="absolute top-3 right-3">
                      <View className="bg-red-500 w-6 h-6 rounded-full items-center justify-center">
                        <Feather name="check" size={14} color="white" />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Current Location */}
          <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Feather name="map-pin" size={18} color="#3B82F6" />
                </View>
                <Text className="text-gray-800 font-semibold">Your Location</Text>
              </View>
              <TouchableOpacity>
                <Feather name="refresh-cw" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <View className="bg-gray-50 rounded-xl p-3">
              <Text className="text-gray-700 text-sm">{location}</Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-green-500 w-2 h-2 rounded-full mr-2" />
                <Text className="text-gray-500 text-xs">GPS Active • Accuracy: ±5m</Text>
              </View>
            </View>
          </View>

          {/* Emergency Message */}
          <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <Text className="text-gray-800 font-semibold mb-3">Additional Information</Text>
            <TextInput
              className="bg-gray-50 rounded-xl p-4 h-28 text-gray-700"
              placeholder="Describe your situation (optional)..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              textAlignVertical="top"
            />
            <View className="flex-row items-center mt-3">
              <Feather name="mic" size={16} color="#6B7280" />
              <Text className="text-gray-500 text-xs ml-2">Voice message available</Text>
            </View>
          </View>

          {/* Alert Settings */}
          <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <Text className="text-gray-800 font-semibold mb-4">Alert Settings</Text>
            
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View className="bg-purple-50 p-2 rounded-lg mr-3">
                  <Feather name="message-square" size={16} color="#8B5CF6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">SMS Alerts</Text>
                  <Text className="text-gray-500 text-xs">Notify emergency contacts</Text>
                </View>
              </View>
              <Switch
                value={sendSMS}
                onValueChange={setSendSMS}
                trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                thumbColor="white"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Feather name="users" size={16} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Nearby Witnesses</Text>
                  <Text className="text-gray-500 text-xs">Alert tourists within 500m</Text>
                </View>
              </View>
              <Switch
                value={sendToWitnesses}
                onValueChange={setSendToWitnesses}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Emergency Tips */}
          <View className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-8">
            <View className="flex-row items-center mb-3">
              <View className="bg-orange-100 p-2 rounded-lg mr-3">
                <Feather name="info" size={16} color="#F97316" />
              </View>
              <Text className="text-gray-800 font-semibold">Emergency Tips</Text>
            </View>
            <View className="space-y-2">
              {[
                'Stay calm and assess the situation',
                'Move to a safe location if possible',
                'Keep your phone charged and accessible',
                'Provide clear location details'
              ].map((tip, index) => (
                <View key={index} className="flex-row items-start">
                  <Text className="text-orange-600 mr-2">•</Text>
                  <Text className="text-gray-700 text-sm flex-1">{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Emergency Contacts List */}
          <View className="mb-8">
            <Text className="text-gray-800 font-bold text-lg mb-3">Your Emergency Contacts</Text>
            <TouchableOpacity className="bg-white rounded-2xl shadow-sm p-4 flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="bg-gray-100 w-12 h-12 rounded-xl items-center justify-center mr-3">
                  <Feather name="user" size={20} color="#6B7280" />
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">John Doe</Text>
                  <Text className="text-gray-500 text-sm">Brother • +1 234 567 8900</Text>
                </View>
              </View>
              <Feather name="phone" size={18} color="#3B82F6" />
            </TouchableOpacity>

            <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-2xl p-4 items-center">
              <Feather name="plus-circle" size={24} color="#9CA3AF" />
              <Text className="text-gray-500 text-sm mt-2">Add Emergency Contact</Text>
            </TouchableOpacity>
           </View>
         </ScrollView>

         {/* Countdown Modal */}
         <Modal
           visible={showCountdown}
           transparent={true}
           animationType="fade"
           onRequestClose={cancelEmergency}
         >
           <View className="flex-1 bg-black/50 items-center justify-center px-6">
             <View className="bg-white rounded-3xl p-8 w-full max-w-sm">
               {/* Emergency Icon */}
               <View className="items-center mb-6">
                 <View className="bg-red-100 w-20 h-20 rounded-full items-center justify-center mb-4">
                   <Feather name="alert-triangle" size={40} color="#EF4444" />
                 </View>
                 <Text className="text-gray-800 text-xl font-bold text-center">
                   Emergency Alert
                 </Text>
                 <Text className="text-gray-600 text-sm text-center mt-2">
                   Sending SOS in {countdown} seconds
                 </Text>
               </View>

               {/* Countdown Circle */}
               <View className="items-center mb-8">
                 <View className="relative">
                   <View className="w-32 h-32 rounded-full border-8 border-gray-200 items-center justify-center">
                     <Text className="text-4xl font-bold text-red-600">
                       {countdown}
                     </Text>
                   </View>
                   {/* Progress ring */}
                   <View 
                     className="absolute w-32 h-32 rounded-full border-8 border-red-500"
                     style={{
                       borderTopColor: 'transparent',
                       borderRightColor: 'transparent',
                       transform: [{ rotate: `${(10 - countdown) * 36}deg` }]
                     }}
                   />
                 </View>
               </View>

               {/* Emergency Type Display */}
               {emergencyType && (
                 <View className="bg-gray-50 rounded-xl p-4 mb-6">
                   <Text className="text-gray-600 text-sm text-center mb-1">Emergency Type</Text>
                   <Text className="text-gray-800 font-semibold text-center capitalize">
                     {emergencyType}
                   </Text>
                 </View>
               )}

               {/* Action Buttons */}
               <View className="space-y-3">
                 <TouchableOpacity
                   onPress={cancelEmergency}
                   className="bg-gray-100 rounded-2xl p-4 items-center"
                   activeOpacity={0.7}
                 >
                   <Text className="text-gray-800 font-semibold text-lg">
                     Cancel Emergency
                   </Text>
                 </TouchableOpacity>
                 
                 <TouchableOpacity
                   onPress={sendEmergencyAlert}
                   className="bg-red-500 rounded-2xl p-4 items-center"
                   activeOpacity={0.7}
                 >
                   <Text className="text-white font-semibold text-lg">
                     Send Now
                   </Text>
                 </TouchableOpacity>
               </View>

               {/* Warning Text */}
               <Text className="text-gray-500 text-xs text-center mt-4">
                 If you don't cancel, emergency services will be notified automatically
               </Text>
             </View>
           </View>
         </Modal>
       </SafeAreaView>
     </>
   );
 }