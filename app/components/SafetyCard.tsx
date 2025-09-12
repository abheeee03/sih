import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SafetyCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress?: () => void;
  verified?: boolean;
  distance?: string;
  rating?: number;
}

export const SafetyCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  onPress, 
  verified = false, 
  distance, 
  rating 
}: SafetyCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-xl border-2 ${color} mb-3`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
            color.includes('green') ? 'bg-green-100' :
            color.includes('red') ? 'bg-red-100' :
            color.includes('blue') ? 'bg-blue-100' :
            color.includes('yellow') ? 'bg-yellow-100' :
            'bg-gray-100'
          }`}>
            <Ionicons 
              name={icon as any} 
              size={24} 
              color={
                color.includes('green') ? '#10b981' :
                color.includes('red') ? '#ef4444' :
                color.includes('blue') ? '#3b82f6' :
                color.includes('yellow') ? '#f59e0b' :
                '#6b7280'
              } 
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="font-semibold text-gray-800">{title}</Text>
              {verified && (
                <Ionicons name="checkmark-circle" size={20} color="#10b981" className="ml-2" />
              )}
            </View>
            <Text className="text-gray-600 text-sm">{description}</Text>
            {(distance || rating) && (
              <View className="flex-row items-center mt-1">
                {distance && (
                  <Text className="text-gray-500 text-xs mr-3">{distance}</Text>
                )}
                {rating && rating > 0 && (
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text className="text-gray-600 text-xs ml-1">{rating}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
};
