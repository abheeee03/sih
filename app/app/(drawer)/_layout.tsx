import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Tourist Safety Hub',
          drawerLabel: 'Dashboard',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="id-verification"
        options={{
          headerTitle: 'ID Verification',
          drawerLabel: 'ID Verification',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="emergency"
        options={{
          headerTitle: 'Emergency',
          drawerLabel: 'Emergency',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="warning-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        options={{
          headerTitle: 'Safety Map',
          drawerLabel: 'Safety Map',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="witness"
        options={{
          headerTitle: 'Digital Witness',
          drawerLabel: 'Witness System',
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="users" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
