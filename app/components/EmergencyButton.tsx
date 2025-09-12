import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmergencyButtonProps {
  type: 'police' | 'medical' | 'fire' | 'general';
  onPress: () => void;
  disabled?: boolean;
}

export const EmergencyButton = ({ type, onPress, disabled = false }: EmergencyButtonProps) => {
  const getButtonConfig = () => {
    switch (type) {
      case 'police':
        return {
          color: 'bg-red-500',
          icon: 'shield',
          title: 'Police',
          number: '100'
        };
      case 'medical':
        return {
          color: 'bg-green-500',
          icon: 'medical',
          title: 'Medical',
          number: '108'
        };
      case 'fire':
        return {
          color: 'bg-orange-500',
          icon: 'flame',
          title: 'Fire',
          number: '101'
        };
      case 'general':
        return {
          color: 'bg-yellow-500',
          icon: 'warning',
          title: 'Emergency',
          number: '112'
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${config.color} p-4 rounded-xl flex-row items-center justify-between ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <View className="flex-row items-center">
        <Ionicons name={config.icon as any} size={24} color="white" />
        <View className="ml-3">
          <Text className="text-white font-semibold text-lg">{config.title}</Text>
          <Text className="text-white/80">{config.number}</Text>
        </View>
      </View>
      <Ionicons name="call" size={24} color="white" />
    </TouchableOpacity>
  );
};
