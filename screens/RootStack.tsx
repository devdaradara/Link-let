import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import MainTab from './MainTab';
import CategorySelectionScreen from './CategorySelectionScreen';
import AddLinkDetailsScreen from './AddLinkDetailsScreen';
import AddCategoryScreen from './AddCategoryScreen';
import LinkCardScreen from './LinkCardScreen';

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
    </Stack.Navigator>
  );
}

export default RootStack;
