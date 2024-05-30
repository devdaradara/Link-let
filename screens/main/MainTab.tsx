import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { MainTabParamList } from '../../navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import CategorySelectionScreen from '../category/CategorySelectionScreen';
import SettingsScreen from '../settings/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60, 
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddLink"
        component={CategorySelectionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
