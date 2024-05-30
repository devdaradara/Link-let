import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Clipboard, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryHeader from '../components/header/CategoryHeader';
import { RootStackParamList } from '../screens/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CategoryNotesRouteProp = RouteProp<RootStackParamList, 'CategoryNotes'>;

const CategoryNotesScreen = () => {
  const [notes, setNotes] = useState<{ id: string, title: string, url: string, memo: string, createdAt: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const route = useRoute<CategoryNotesRouteProp>();
  const navigation = useNavigation();
  const { category } = route.params;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedLinks = await AsyncStorage.getItem('links');
        if (storedLinks) {
          const allLinks = JSON.parse(storedLinks);
          const categoryLinks = allLinks.filter(link => link.category === category);
          setNotes(categoryLinks);
        }
      } catch (error) {
        console.error("Error fetching links: ", error);
      }
    };

    fetchNotes();
  }, [category]);

  const handleSave = async () => {
    setIsEditing(false);
    navigation.navigate('MainTab', { screen: 'Home', params: { refresh: true } });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRemove = async (id) => {
    Alert.alert(
      '삭제',
      '정말 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            const storedLinks = await AsyncStorage.getItem('links');
            let links = storedLinks ? JSON.parse(storedLinks) : [];
            links = links.filter(link => link.id !== id);
            await AsyncStorage.setItem('links', JSON.stringify(links));
            setNotes(links.filter(link => link.category === category));
            navigation.navigate('MainTab', { screen: 'Home', params: { refresh: true } });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleCopy = (url) => {
    Clipboard.setString(url);
    Alert.alert('URL 복사됨', 'URL이 클립보드에 복사되었습니다.');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CategoryHeader
        title={category}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={() => handleRemove(null)} // Add logic to remove the entire category if needed
        onSave={handleSave}
        isEditing={isEditing}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.urlContainer}>
              <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">{item.url}</Text>
              <TouchableOpacity onPress={() => handleCopy(item.url)}>
                <Icon name="content-copy" size={24} color="#888" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.memo}>{item.memo}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  noteContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  url: {
    flex: 1,
    color: 'blue',
  },
  icon: {
    marginLeft: 8,
  },
  memo: {
    marginTop: 8,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: 'gray',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default CategoryNotesScreen;
