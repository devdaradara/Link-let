import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../../components/common/CustomAlert';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const systemTheme = useColorScheme();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const clearCache = () => {
    setIsAlertVisible(true);
  };

  const handleConfirmClearCache = async () => {
    setIsAlertVisible(false);
    try {
      await AsyncStorage.clear();
      Alert.alert('성공', '캐시와 데이터가 성공적으로 삭제되었습니다.');
    } catch (error) {
      Alert.alert('오류', '캐시와 데이터를 삭제하지 못했습니다.');
    }
  };

  const handleCancelClearCache = () => {
    setIsAlertVisible(false);
  };

  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>다크 모드</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={clearCache}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>캐시 및 데이터 삭제</Text>
      </TouchableOpacity>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>앱 버전: 1.0.0</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>개발자: Daradara (devdaradara@gmail.com)</Text>
      </View>
      <CustomAlert
        visible={isAlertVisible}
        type="warning"
        title="캐시 및 데이터 삭제"
        message="모든 캐시와 데이터를 삭제하시겠습니까?"
        onConfirm={handleConfirmClearCache}
        onCancel={handleCancelClearCache}
        confirmText="예"
      />
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
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
