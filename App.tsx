import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import RootStack from './navigation/RootStack';

const App = () => {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
};

const AppInner = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
