import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WalletPreview from '../../components/WalletPreview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategoryScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('#ffffff');
  const colorInputRef = useRef<TextInput>(null);

  const saveCategory = async () => {
    try {
      const newCategory = { name: categoryName, color };
      const storedCategories = await AsyncStorage.getItem('categories');
      const categories = storedCategories ? JSON.parse(storedCategories) : [];
      const updatedCategories = [...categories, newCategory];

      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));

      setCategoryName('');
      setColor('#ffffff');

      navigation.navigate('CategorySelection');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
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
    color: 'black',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
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

export default AddCategoryScreen;
