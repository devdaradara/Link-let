import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
