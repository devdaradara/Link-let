import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const systemTheme = useColorScheme();

  const clearCache = async () => {
    Alert.alert(
      'Clear Cache and Data',
      'Are you sure you want to clear all cache and data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'Cache and data cleared successfully.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache and data.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={clearCache}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>Clear Cache and Data</Text>
      </TouchableOpacity>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>App Version: 1.0.0</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>Developer: Daradara (devdaradara@gmail.com)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
