import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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

  const formatData = (data, numColumns) => {
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
        data={formatData([{ name: '추가', color: '#cccccc' }, ...categories], 2)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          if (item.name.includes('blank')) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return item.name === '추가' ? (
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
  item: {
    backgroundColor: '#ccc',
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
