import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WalletPreview from '../../components/WalletPreview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const EditCategoryScreen = ({ route }) => {
  const { categoryId, categoryName: initialCategoryName, categoryColor: initialCategoryColor } = route.params;
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [color, setColor] = useState(initialCategoryColor);
  const colorInputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const saveCategory = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      const categories = storedCategories ? JSON.parse(storedCategories) : [];
      const updatedCategories = categories.map(cat =>
        cat.id === categoryId ? { ...cat, name: categoryName, color } : cat
      );

      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));

      // Navigate back to the MainTab and select the Home tab
      navigation.navigate('MainTab', { screen: 'Home' });
    } catch (error) {
      console.error('Error saving category: ', error);
    }
  };

  const handleColorChange = (text) => {
    const colorText = text.startsWith('#') ? text : `#${text}`;
    setColor(colorText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.previewContainer}>
          <WalletPreview title={categoryName || '미리보기'} color={color} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CATEGORY</Text>
          <TextInput
            style={styles.input}
            placeholder="category"
            placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
            value={categoryName}
            onChangeText={setCategoryName}
            returnKeyType="next"
            onSubmitEditing={() => colorInputRef.current?.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>COLOR</Text>
          <TextInput
            ref={colorInputRef}
            style={styles.input}
            placeholder="#ffffff"
            placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
            value={color}
            onChangeText={handleColorChange}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveCategory}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#121212' : '#e7e7e7',
  },
  avoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    color: theme === 'dark' ? '#ffffff' : 'black',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme === 'dark' ? '#333' : '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
    color: theme === 'dark' ? '#e7e7e7' : '#000',
  },
  saveButton: {
    backgroundColor: '#fc7a1e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '30%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditCategoryScreen;
