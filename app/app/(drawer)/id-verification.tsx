import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function IDVerification() {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'pending' | 'verified' | 'failed'>('idle');
  const [documents, setDocuments] = useState({
    passport: false,
    visa: false,
    id: false,
    insurance: false
  });

  const handleDocumentUpload = (docType: keyof typeof documents) => {
    Alert.alert(
      'Upload Document',
      `Select ${docType} for blockchain verification`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => uploadDocument(docType, 'camera') },
        { text: 'Gallery', onPress: () => uploadDocument(docType, 'gallery') }
      ]
    );
  };

  const uploadDocument = (docType: keyof typeof documents, source: string) => {
    setDocuments(prev => ({ ...prev, [docType]: true }));
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  const handleBlockchainVerification = () => {
    setVerificationStatus('pending');
    setTimeout(() => {
      setVerificationStatus('verified');
      Alert.alert('Success!', 'Documents verified on blockchain', [{ text: 'OK' }]);
    }, 3000);
  };

  const documentTypes = [
    {
      type: 'passport',
      title: 'Passport',
      subtitle: 'Primary identity document',
      icon: 'passport',
      iconSet: 'MaterialCommunityIcons',
      color: '#667EEA',
      required: true
    },
    {
      type: 'visa',
      title: 'Travel Visa',
      subtitle: 'Entry authorization',
      icon: 'file-text',
      iconSet: 'Feather',
      color: '#F59E0B',
      required: true
    },
    {
      type: 'id',
      title: 'National ID',
      subtitle: 'Government issued',
      icon: 'credit-card',
      iconSet: 'Feather',
      color: '#10B981',
      required: false
    },
    {
      type: 'insurance',
      title: 'Travel Insurance',
      subtitle: 'Medical coverage',
      icon: 'shield',
      iconSet: 'Feather',
      color: '#EC4899',
      required: false
    }
  ];

  const getStatusColor = () => {
    switch(verificationStatus) {
      case 'verified': return ['#10B981', '#059669'];
      case 'pending': return ['#F59E0B', '#D97706'];
      case 'failed': return ['#EF4444', '#DC2626'];
      default: return ['#667EEA', '#764BA2'];
    }
  };

  const getStatusIcon = () => {
    switch(verificationStatus) {
      case 'verified': return 'check-circle';
      case 'pending': return 'clock';
      case 'failed': return 'x-circle';
      default: return 'shield';
    }
  };

  const getStatusText = () => {
    switch(verificationStatus) {
      case 'verified': return 'Blockchain Verified';
      case 'pending': return 'Verifying...';
      case 'failed': return 'Verification Failed';
      default: return 'Ready to Verify';
    }
  };

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
        <StatusBar barStyle="light-content" />
        
        {/* Custom Header */}
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-4 pb-8"
        >
          <View className="flex-row items-center mb-6">
            <TouchableOpacity className="mr-4">
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Identity Verification</Text>
          </View>

          {/* Verification Status Card */}
          <View className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <LinearGradient
                  colors={getStatusColor()}
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                >
                  <Feather name={getStatusIcon() as any} size={20} color="white" />
                </LinearGradient>
                <View>
                  <Text className="text-white font-semibold">{getStatusText()}</Text>
                  <Text className="text-white/80 text-xs mt-1">Blockchain Network</Text>
                </View>
              </View>
              {verificationStatus === 'pending' && (
                <View className="bg-white/30 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-medium">Processing...</Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Security Features */}
          <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <View className="bg-indigo-100 p-2 rounded-lg mr-3">
                <Feather name="lock" size={16} color="#667EEA" />
              </View>
              <Text className="text-gray-800 font-semibold">Blockchain Security</Text>
            </View>
            <View className="flex-row justify-around">
              {['Encrypted', 'Immutable', 'Decentralized'].map((feature, index) => (
                <View key={index} className="items-center">
                  <View className="bg-white p-2 rounded-lg mb-1">
                    <Feather 
                      name={index === 0 ? 'lock' : index === 1 ? 'shield' : 'globe'} 
                      size={16} 
                      color="#667EEA" 
                    />
                  </View>
                  <Text className="text-gray-600 text-xs">{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Document Upload Section */}
          <Text className="text-gray-800 font-bold text-lg mb-4">Required Documents</Text>
          
          {documentTypes.map((doc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDocumentUpload(doc.type as keyof typeof documents)}
              className="mb-4"
              activeOpacity={0.7}
            >
              <View className={`bg-white rounded-2xl shadow-sm p-4 border-2 ${
                documents[doc.type as keyof typeof documents] 
                  ? 'border-green-200' 
                  : 'border-transparent'
              }`}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View 
                      className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: `${doc.color}20` }}
                    >
                      {renderIcon(doc.icon, doc.iconSet, 24, doc.color)}
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className="font-semibold text-gray-800">{doc.title}</Text>
                        {doc.required && (
                          <View className="bg-red-100 px-2 py-0.5 rounded-full ml-2">
                            <Text className="text-red-600 text-xs font-medium">Required</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-gray-500 text-sm mt-1">{doc.subtitle}</Text>
                    </View>
                  </View>
                  {documents[doc.type as keyof typeof documents] ? (
                    <View className="bg-green-100 p-2 rounded-full">
                      <Feather name="check" size={16} color="#10B981" />
                    </View>
                  ) : (
                    <View className="bg-gray-100 p-2 rounded-full">
                      <Feather name="upload" size={16} color="#6B7280" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Emergency Contact Form */}
          <View className="mb-6 mt-2">
            <Text className="text-gray-800 font-bold text-lg mb-4">Emergency Contact</Text>
            <View className="bg-white rounded-2xl shadow-sm p-5">
              <View className="mb-4">
                <Text className="text-gray-600 text-sm font-medium mb-2">Full Name</Text>
                <View className="bg-gray-50 rounded-xl px-4 py-3 flex-row items-center">
                  <Feather name="user" size={18} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800"
                    placeholder="Contact person name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-600 text-sm font-medium mb-2">Phone Number</Text>
                <View className="bg-gray-50 rounded-xl px-4 py-3 flex-row items-center">
                  <Feather name="phone" size={18} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800"
                    placeholder="+1 234 567 8900"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              
              <View>
                <Text className="text-gray-600 text-sm font-medium mb-2">Relationship</Text>
                <View className="bg-gray-50 rounded-xl px-4 py-3 flex-row items-center">
                  <Feather name="heart" size={18} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800"
                    placeholder="Family, Friend, etc."
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleBlockchainVerification}
            disabled={verificationStatus === 'pending'}
            activeOpacity={0.8}
            className="mb-8"
          >
            <LinearGradient
              colors={verificationStatus === 'pending' ? ['#9CA3AF', '#6B7280'] : ['#667EEA', '#764BA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-2xl p-5"
            >
              <View className="flex-row items-center justify-center">
                <MaterialCommunityIcons name="ethereum" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  {verificationStatus === 'pending' ? 'Verifying on Blockchain...' : 'Verify on Blockchain'}
                </Text>
              </View>
              <Text className="text-white/80 text-sm text-center mt-2">
                Secure • Immutable • Decentralized
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Trust Badges */}
          <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
            <Text className="text-gray-700 font-semibold text-center mb-3">Trusted by</Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">10K+</Text>
                <Text className="text-gray-600 text-xs">Travelers</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">50+</Text>
                <Text className="text-gray-600 text-xs">Countries</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">99.9%</Text>
                <Text className="text-gray-600 text-xs">Uptime</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}