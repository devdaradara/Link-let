import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Wallet from '../../components/Wallet';
import { useTheme } from '../../context/ThemeContext';

const CategorySelectionScreen = () => {
  const [categories, setCategories] = useState<{ name: string, color: string }[]>([]);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const handleSelectCategory = (category: string) => {
    navigation.navigate('AddLinkDetails', { category });
  };

  const formatData = (data: { name: string, color: string }[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ name: `blank-${numberOfElementsLastRow}`, color: 'transparent' });
      numberOfElementsLastRow++;
    }
    return data;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData([{ name: 'Add', color: '#f9c784' }, ...categories], 2)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          if (item.name.includes('blank')) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return item.name === 'Add' ? (
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
          );
        }}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#333' : '#e7e7e7',
  },
  row: {
    justifyContent: 'space-around',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  item: {
    backgroundColor: theme === 'dark' ? '#333' : '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 150,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default CategorySelectionScreen;
