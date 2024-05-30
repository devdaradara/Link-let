import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkCardFront from '../../components/LinkCard/LinkCardFront';
import LinkCardBack from '../../components/LinkCard/LinkCardBack';
import CategoryHeader from '../../components/header/CategoryHeader';
import Clipboard from '@react-native-clipboard/clipboard';

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  memo: string;
  createdAt: string;
}

const LinkCardScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [link, setLink] = useState<Link | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      const storedLinks = await AsyncStorage.getItem('links');
      const allLinks: Link[] = storedLinks ? JSON.parse(storedLinks) : [];
      const foundLink = allLinks.find(l => l.id === id);

      setLink(foundLink || null);
    };

    fetchLink();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleCopy = (url: string) => {
    Clipboard.setString(url);
    Alert.alert('URL이 복사되었습니다.');
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (!link) {
    return (
      <View style={styles.container}>
        <Text>링크를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryHeader title={link.category} onEdit={() => {}} />
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {flipped ? (
          <LinkCardBack
            key={link.id}
            title={link.title}
            url={link.url}
            createdAt={link.createdAt}
            memo={link.memo}
            onFlip={handleFlip}
          />
        ) : (
          <LinkCardFront
            key={link.id}
            title={link.title}
            url={link.url}
            onCopy={() => handleCopy(link.url)}
            onFlip={handleFlip}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    justifyContent: 'center',
  },
  cardContainer: {
    paddingTop: 100,
    padding: 16,
    alignItems: 'center',
  },
});

export default LinkCardScreen;
