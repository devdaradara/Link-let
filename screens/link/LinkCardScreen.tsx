import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkCardFront from '../../components/LinkCard/LinkCardFront';
import LinkCardBack from '../../components/LinkCard/LinkCardBack';
import LinkCardUpdateBack from '../../components/LinkCard/LinkCardUpdateBack';
import LinkCardHeader from '../../components/header/LinkCardHeader';
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
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
    setFlipped(true);
  };

  const handleSave = async (updatedTitle: string, updatedUrl: string, updatedMemo: string) => {
    if (link) {
      const updatedLink = { ...link, title: updatedTitle, url: updatedUrl, memo: updatedMemo };
      const storedLinks = await AsyncStorage.getItem('links');
      let links: Link[] = storedLinks ? JSON.parse(storedLinks) : [];
      const linkIndex = links.findIndex(l => l.id === link.id);
      if (linkIndex !== -1) {
        links[linkIndex] = updatedLink;
      }
      await AsyncStorage.setItem('links', JSON.stringify(links));
      setLink(updatedLink);
      setIsEditing(false);
      setFlipped(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
      <LinkCardHeader
        title={link.category}
        onBack={handleBack}
        onEdit={handleEdit}
        onSave={() => handleSave(link.title, link.url, link.memo)}
        isEditing={isEditing}
      />
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {flipped ? (
          isEditing ? (
            <LinkCardUpdateBack
              key={link.id}
              title={link.title}
              url={link.url}
              createdAt={link.createdAt}
              memo={link.memo}
              onFlip={handleFlip}
              onSave={handleSave}
            />
          ) : (
            <LinkCardBack
              key={link.id}
              title={link.title}
              url={link.url}
              createdAt={link.createdAt}
              memo={link.memo}
              onFlip={handleFlip}
              onCopy={() => handleCopy(link.url)}
            />
          )
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
