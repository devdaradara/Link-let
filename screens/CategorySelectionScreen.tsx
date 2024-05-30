import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from '../components/Wallet';

const CategorySelectionScreen = ({ navigation }) => {
  const [categories, setCategories] = useState<{ name: string, color: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        } else {
          console.log("No categories found in storage.");
        }
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectCategory = (category) => {
    navigation.navigate('AddLinkDetails', { category });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ name: '추가', color: '#cccccc' }, ...categories]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          item.name === '추가' ? (
            <Wallet
              title={item.name}
              color={item.color}
              onPress={() => navigation.navigate('AddCategory')}
            />
          ) : (
            <Wallet
              title={item.name}
              color={item.color}
              onPress={() => handleSelectCategory(item.name)}
            />
          )
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
  },
  contentContainer: {
    paddingVertical: 20,
  },
});

export default CategorySelectionScreen;
