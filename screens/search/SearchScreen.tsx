import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ShortLinkCard from '../../components/LinkCard/ShortLinkCard';
import SearchHeader from '../../components/header/SearchHeader';
import Clipboard from '@react-native-clipboard/clipboard';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allLinks, setAllLinks] = useState<{ id: string, title: string, url: string, category: string, memo: string, createdAt: string }[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<{ id: string, title: string, url: string, category: string, memo: string, createdAt: string }[]>([]);
  const navigation = useNavigation();

  const fetchLinks = async () => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      if (storedLinks) {
        const parsedLinks = JSON.parse(storedLinks);
        setAllLinks(parsedLinks);
        setFilteredLinks(parsedLinks);
      } else {
        console.log("No links found in storage.");
      }
    } catch (error) {
      console.error("Error fetching links: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLinks();
    }, [])
  );

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

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});

export default SearchScreen;
