import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import MainTab from '../screens/main/MainTab';
import CategorySelectionScreen from '../screens/category/CategorySelectionScreen';
import AddLinkDetailsScreen from '../screens/link/AddLinkDetailsScreen';
import AddCategoryScreen from '../screens/category/AddCategoryScreen';
import LinkCardScreen from '../screens/link/LinkCardScreen';
import CategoryNotesScreen from '../screens/category/CategoryNotesScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitleVisible: false, 
      }}
    >
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategorySelection"
        component={CategorySelectionScreen}
        options={{ title: 'Category Selection' }}
      />
      <Stack.Screen
        name="AddLinkDetails"
        component={AddLinkDetailsScreen}
        options={{ title: 'Add Link' }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={{ title: 'Add Category' }}
      />
      <Stack.Screen
        name="LinkCard"
        component={LinkCardScreen}
        options={{ title: 'Link Details' }}
      />
      <Stack.Screen 
        name="CategoryNotes"
        component={CategoryNotesScreen}
        options={{ title: 'Category Notes' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
