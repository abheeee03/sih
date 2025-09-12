import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  category: 'general' | 'location' | 'emergency' | 'communication';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface PersonalizedSafetyTipsProps {
  userLocation?: string;
  userPreferences?: string[];
}

export const PersonalizedSafetyTips = ({ 
  userLocation = 'Tourist Area', 
  userPreferences = [] 
}: PersonalizedSafetyTipsProps) => {
  const [tips, setTips] = useState<SafetyTip[]>([
    {
      id: '1',
      title: 'Keep Emergency Contacts Updated',
      description: 'Ensure your emergency contacts are current and accessible',
      category: 'emergency',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      title: 'Share Your Location',
      description: 'Share your real-time location with trusted contacts',
      category: 'location',
      priority: 'high',
      completed: true
    },
    {
      id: '3',
      title: 'Download Offline Maps',
      description: 'Download maps for areas you plan to visit',
      category: 'location',
      priority: 'medium',
      completed: false
    },
    {
      id: '4',
      title: 'Know Local Emergency Numbers',
      description: 'Save local emergency numbers in your phone',
      category: 'emergency',
      priority: 'high',
      completed: false
    },
    {
      id: '5',
      title: 'Stay in Well-Lit Areas',
      description: 'Avoid dark or isolated areas, especially at night',
      category: 'general',
      priority: 'medium',
      completed: true
    },
    {
      id: '6',
      title: 'Keep Phone Charged',
      description: 'Always carry a portable charger and keep your phone charged',
      category: 'communication',
      priority: 'high',
      completed: false
    },
    {
      id: '7',
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, trust your gut and leave',
      category: 'general',
      priority: 'high',
      completed: false
    },
    {
      id: '8',
      title: 'Learn Basic Local Phrases',
      description: 'Learn essential phrases in the local language',
      category: 'communication',
      priority: 'low',
      completed: false
    }
  ]);

  const toggleTipCompletion = (tipId: string) => {
    setTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, completed: !tip.completed } : tip
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return 'shield';
      case 'location': return 'location';
      case 'emergency': return 'warning';
      case 'communication': return 'chatbubble';
      default: return 'information-circle';
    }
  };

  const completedTips = tips.filter(tip => tip.completed).length;
  const totalTips = tips.length;
  const completionPercentage = Math.round((completedTips / totalTips) * 100);

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-800">Personalized Safety Tips</Text>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-blue-600 font-medium text-sm">
            {completionPercentage}% Complete
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="bg-gray-200 h-2 rounded-full mb-4">
        <View 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${completionPercentage}%` }}
        />
      </View>

      {/* Location-based Tips */}
      <View className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-4">
        <View className="flex-row items-center">
          <Ionicons name="location" size={16} color="#3b82f6" />
          <Text className="text-blue-800 font-medium ml-2">
            Tips for {userLocation}
          </Text>
        </View>
        <Text className="text-blue-700 text-sm mt-1">
          Based on your current location and travel patterns
        </Text>
      </View>

      {/* Tips List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {tips.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            onPress={() => toggleTipCompletion(tip.id)}
            className={`p-4 rounded-xl mb-3 border-2 ${
              tip.completed 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className="flex-row items-start">
              <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 mt-1 ${
                tip.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Ionicons 
                  name={getCategoryIcon(tip.category) as any} 
                  size={16} 
                  color={tip.completed ? '#10b981' : '#6b7280'} 
                />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className={`font-semibold ${
                    tip.completed ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}>
                    {tip.title}
                  </Text>
                  <View className={`px-2 py-1 rounded-full ${getPriorityColor(tip.priority)}`}>
                    <Text className="text-xs font-medium">{tip.priority.toUpperCase()}</Text>
                  </View>
                </View>
                <Text className={`text-sm ${
                  tip.completed ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {tip.description}
                </Text>
                {tip.completed && (
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text className="text-green-700 text-xs ml-1">Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievement */}
      {completionPercentage === 100 && (
        <View className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mt-4">
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={24} color="#f59e0b" />
            <Text className="text-yellow-800 font-semibold ml-2">
              Safety Champion! 🎉
            </Text>
          </View>
          <Text className="text-yellow-700 text-sm mt-1">
            You've completed all safety tips. Stay safe and enjoy your travels!
          </Text>
        </View>
      )}
    </View>
  );
};
