import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useRoute,
  useNavigation,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryHeader from '../../components/header/CategoryHeader';
import ShortLinkCard from '../../components/LinkCard/ShortLinkCard';
import {RootStackParamList, MainTabParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomAlert from '../../components/common/CustomAlert';

type CategoryNotesRouteProp = RouteProp<RootStackParamList, 'CategoryNotes'>;

type CategoryNotesNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'CategoryNotes'>,
  StackNavigationProp<MainTabParamList>
>;

const CategoryNotesScreen = () => {
  const [notes, setNotes] = useState<
    {id: string; title: string; url: string; memo: string; createdAt: string}[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const route = useRoute<CategoryNotesRouteProp>();
  const navigation = useNavigation<CategoryNotesNavigationProp>();
  const {category} = route.params;

  const fetchNotes = async () => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      if (storedLinks) {
        const allLinks = JSON.parse(storedLinks);
        const categoryLinks =
          category === '전체'
            ? allLinks
            : allLinks.filter(link => link.category === category);
        setNotes(categoryLinks);
      }
    } catch (error) {
      console.error('링크 불러오기 오류: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [category]),
  );

  const handleSave = async () => {
    setIsEditing(false);
    fetchNotes();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRemove = async () => {
    if (!currentNoteId) return;
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      let links = storedLinks ? JSON.parse(storedLinks) : [];
      links = links.filter(link => link.id !== currentNoteId);
      await AsyncStorage.setItem('links', JSON.stringify(links));
      setNotes(links.filter(link => link.category === category));
      fetchNotes();
    } catch (error) {
      console.error('링크 삭제 오류: ', error);
    }
    setIsAlertVisible(false);
  };

  const showDeleteAlert = (id: string) => {
    setCurrentNoteId(id);
    setIsAlertVisible(true);
  };

  const handleCopy = (url: string) => {
    Clipboard.setString(url);
    Alert.alert('URL 복사', 'URL이 클립보드에 복사되었습니다.');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePress = (id: string) => {
    navigation.navigate('LinkCard', {id});
  };

  const handleCancelDelete = () => {
    setIsAlertVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topWhite, {height: top}]} />
      <CategoryHeader
        title={category}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={() => handleRemove('')}
        onSave={handleSave}
        isEditing={isEditing}
      />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ShortLinkCard
            key={item.id}
            title={item.title}
            url={item.url}
            createdAt={item.createdAt}
            onCopy={() => handleCopy(item.url)}
            onPress={() => handlePress(item.id)}
            isEditing={isEditing}
            onRemove={() => showDeleteAlert(item.id)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <CustomAlert
        visible={isAlertVisible}
        type="failed"
        title="링크 삭제"
        message="이 링크와 모든 내용을 삭제하시겠습니까?"
        onConfirm={handleRemove}
        onCancel={handleCancelDelete}
        confirmText="예"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topWhite: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});

export default CategoryNotesScreen;
