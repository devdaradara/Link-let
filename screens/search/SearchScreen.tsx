import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShortLinkCard from '../../components/LinkCard/ShortLinkCard';
import SearchHeader from '../../components/header/SearchHeader';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fetchLinks = async () => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      if (storedLinks) {
        const parsedLinks = JSON.parse(storedLinks);
        setAllLinks(parsedLinks);
        setFilteredLinks(parsedLinks);
      } else {
        console.log('No links found in storage.');
      }
    } catch (error) {
      console.error('Error fetching links: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLinks();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allLinks.filter(link =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks(allLinks);
    }
  }, [searchQuery, allLinks]);

  const handleSearch = () => {
    const filtered = allLinks.filter(link =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLinks(filtered);
  };

  const handleCopy = (url: string) => {
    Clipboard.setString(url);
    Alert.alert('URL 복사됨', 'URL이 클립보드에 복사되었습니다.');
  };

  const handlePress = (id: string) => {
    navigation.navigate('LinkCard', { id });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topWhite, { height: top }]} />
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <FlatList
        data={filteredLinks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShortLinkCard
            key={item.id}
            title={item.title}
            url={item.url}
            createdAt={item.createdAt}
            onCopy={() => handleCopy(item.url)}
            onPress={() => handlePress(item.id)}
            isEditing={false}
            onRemove={() => {}}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  topWhite: {
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#333' : '#e7e7e7',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});

export default SearchScreen;
