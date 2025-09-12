import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'warning' | 'danger' | 'success';
  text: string;
  description?: string;
}

export const StatusIndicator = ({ status, text, description }: StatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          color: 'text-green-800',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: 'checkmark-circle',
          iconColor: '#10b981'
        };
      case 'inactive':
        return {
          color: 'text-gray-800',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: 'pause-circle',
          iconColor: '#6b7280'
        };
      case 'warning':
        return {
          color: 'text-yellow-800',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: 'warning',
          iconColor: '#f59e0b'
        };
      case 'danger':
        return {
          color: 'text-red-800',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'close-circle',
          iconColor: '#ef4444'
        };
      case 'success':
        return {
          color: 'text-green-800',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: 'checkmark-circle',
          iconColor: '#10b981'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View className={`${config.bgColor} border ${config.borderColor} p-4 rounded-xl`}>
      <View className="flex-row items-center mb-2">
        <Ionicons name={config.icon as any} size={24} color={config.iconColor} />
        <Text className={`${config.color} font-semibold ml-2`}>{text}</Text>
      </View>
      {description && (
        <Text className={`${config.color.replace('800', '700')} text-sm`}>
          {description}
        </Text>
      )}
    </View>
  );
};
