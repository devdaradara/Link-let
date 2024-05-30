import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from '../../components/Wallet';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NavigationProp } from '@react-navigation/native';

const HomeScreen = () => {
  const [categories, setCategories] = useState<{ title: string, color: string }[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories).map(category => ({
          title: category.name,
          color: category.color
        }));
        setCategories([{ title: 'All', color: '#f9c784' }, ...parsedCategories]);
      } else {
        console.log("No categories found in storage.");
        setCategories([{ title: 'All', color: '#f9c784' }]);
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

  const handleWalletPress = (category: string) => {
    navigation.navigate('CategoryNotes', { category });
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ title: `blank-${numberOfElementsLastRow}`, color: 'transparent' });
      numberOfElementsLastRow++;
    }
    return data;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(categories, 2)}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          if (item.title.includes('blank')) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Wallet
              title={item.title}
              color={item.color}
              onPress={() => handleWalletPress(item.title)}
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
    backgroundColor: '#e7e7e7'
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

export default HomeScreen;
