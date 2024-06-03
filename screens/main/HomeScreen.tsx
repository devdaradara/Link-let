import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from '../../components/Wallet';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownFilter from '../../components/DropdownFilter';

const HomeScreen = () => {
  const [categories, setCategories] = useState<{ title: string, color: string, createdAt: string, id: string }[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories).map(category => ({
          title: category.name,
          color: category.color,
          createdAt: category.createdAt,
          id: category.id,
        }));
        setCategories([{ title: 'All', color: '#f9c784', createdAt: new Date().toISOString(), id: 'all' }, ...parsedCategories]);
      } else {
        console.log("No categories found in storage.");
        setCategories([{ title: 'All', color: '#f9c784', createdAt: new Date().toISOString(), id: 'all' }]);
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

  const handleDeleteCategory = async (categoryId: string) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete this category and all its contents?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const storedCategories = await AsyncStorage.getItem('categories');
              if (storedCategories) {
                const parsedCategories = JSON.parse(storedCategories);
                const updatedCategories = parsedCategories.filter(cat => cat.id !== categoryId);
                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                fetchCategories();
              }
            } catch (error) {
              console.error('Error deleting category: ', error);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const sortCategories = (categories, criteria) => {
    const sortedCategories = categories.slice(1);
    switch (criteria) {
      case 'latest':
        sortedCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'asc':
        sortedCategories.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'desc':
        sortedCategories.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return [categories[0], ...sortedCategories];
  };

  const formatData = (data, numColumns) => {
    const formattedData = data.filter(item => item);
    const numberOfFullRows = Math.floor(formattedData.length / numColumns);
    let numberOfElementsLastRow = formattedData.length - (numberOfFullRows * numColumns);

    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      formattedData.push({ title: `blank-${numberOfElementsLastRow}`, color: 'transparent', createdAt: new Date().toISOString(), id: `blank-${numberOfElementsLastRow}` });
      numberOfElementsLastRow++;
    }
    return formattedData;
  };

  const handleEditCategory = (categoryId: string, categoryName: string, categoryColor: string) => {
    navigation.navigate('EditCategory', { categoryId, categoryName, categoryColor });
  };

  const sortedCategories = sortCategories(categories, sortCriteria);
  const formattedCategories = formatData(sortedCategories, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={() => setEditMode(!editMode)}>
            <Icon name={editMode ? 'done' : 'edit'} size={24} color={theme === 'dark' ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFilterModalVisible(!isFilterModalVisible)}>
            <Icon name="filter-list" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={formattedCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.title.includes('blank')) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <Wallet
              title={item.title}
              color={item.color}
              onPress={() => handleWalletPress(item.title)}
              onDelete={() => handleDeleteCategory(item.id)}
              editMode={editMode}
              onEdit={() => handleEditCategory(item.id, item.title, item.color)}
            />
          );
        }}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
      <DropdownFilter
        visible={isFilterModalVisible}
        onSelectFilter={(filter) => {
          setSortCriteria(filter);
          setIsFilterModalVisible(false);
        }}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#333' : '#e7e7e7'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: theme === 'dark' ? '#444' : '#ddd',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerButton: {
    marginRight: 10,
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
