import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WalletPreview from '../../components/WalletPreview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategoryScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('#ffffff');

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
      <View style={styles.previewContainer}>
        <WalletPreview title={categoryName || '미리보기'} color={color} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>카테고리명</Text>
        <TextInput
          style={styles.input}
          placeholder="카테고리명"
          value={categoryName}
          onChangeText={setCategoryName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>색상</Text>
        <TextInput
          style={styles.input}
          placeholder="#ffffff"
          value={color}
          onChangeText={handleColorChange}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveCategory}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddCategoryScreen;
