import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import MainTab from '../screens/main/MainTab';
import CategorySelectionScreen from '../screens/category/CategorySelectionScreen';
import AddLinkDetailsScreen from '../screens/link/AddLinkDetailsScreen';
import AddCategoryScreen from '../screens/category/AddCategoryScreen';
import LinkCardScreen from '../screens/link/LinkCardScreen';
import CategoryNotesScreen from '../screens/category/CategoryNotesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategorySelection"
        component={CategorySelectionScreen}
        options={{ title: '카테고리 선택' }}
      />
      <Stack.Screen
        name="AddLinkDetails"
        component={AddLinkDetailsScreen}
        options={{ title: '링크 추가' }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={{ title: '카테고리 추가' }}
      />
      <Stack.Screen
        name="LinkCard"
        component={LinkCardScreen}
        options={{ title: 'Link Details' }}
      />
      <Stack.Screen 
        name="CategoryNotes"
        component={CategoryNotesScreen}
        options={{ title: 'CategoryNotes' }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
