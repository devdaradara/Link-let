import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { MainTabParamList } from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import CategorySelectionScreen from './CategorySelectionScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddLink"
        component={CategorySelectionScreen}
        options={{
          title: '추가',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '환경설정',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
