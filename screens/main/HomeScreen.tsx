import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from '../../components/Wallet';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomAlert from '../../components/common/CustomAlert';
import DropdownFilter from '../../components/DropdownFilter';

const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<{ title: string, color: string, createdAt: string, id: string }[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories).map((category: any) => ({
          title: category.name,
          color: category.color,
          createdAt: category.createdAt,
          id: category.id,
        }));
        setCategories([{ title: '전체', color: '#f9c784', createdAt: new Date().toISOString(), id: 'all' }, ...parsedCategories]);
      } else {
        console.log("저장된 카테고리가 없습니다.");
        setCategories([{ title: '전체', color: '#f9c784', createdAt: new Date().toISOString(), id: 'all' }]);
      }
    } catch (error) {
      console.error("카테고리 불러오기 오류: ", error);
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

  const handleDeleteCategory = async () => {
    if (!currentCategoryId) return;

    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        const updatedCategories = parsedCategories.filter((cat: any) => cat.id !== currentCategoryId);
        await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
        fetchCategories();
      }
    } catch (error) {
      console.error('카테고리 삭제 오류: ', error);
    }
    setIsAlertVisible(false);
  };

  const showDeleteAlert = (categoryId: string) => {
    setCurrentCategoryId(categoryId);
    setIsAlertVisible(true);
  };

  const sortCategories = (categories: any[], criteria: string) => {
    const sortedCategories = categories.slice(1);
    switch (criteria) {
      case 'latest':
        sortedCategories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedCategories.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

  const formatData = (data: any[], numColumns: number) => {
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
              onDelete={() => showDeleteAlert(item.id)}
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
        onClose={() => setIsFilterModalVisible(false)}
      />
      <CustomAlert
        visible={isAlertVisible}
        type="failed"
        title="카테고리 삭제"
        message="이 카테고리와 모든 내용을 삭제하시겠습니까?"
        onConfirm={handleDeleteCategory}
      />
    </View>
  );
};

const createStyles = (theme: string) => StyleSheet.create({
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
