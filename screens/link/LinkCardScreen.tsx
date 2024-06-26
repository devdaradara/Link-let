import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkCardFront from '../../components/LinkCard/LinkCardFront';
import LinkCardBack from '../../components/LinkCard/LinkCardBack';
import LinkCardUpdateBack from '../../components/LinkCard/LinkCardUpdateBack';
import LinkCardHeader from '../../components/header/LinkCardHeader';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomAlert from '../../components/common/CustomAlert';

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
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    setAlertMessage('URL이 클립보드에 복사되었습니다.');
    setIsAlertVisible(true);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFlipped(true);
  };

  const handleSave = async (
    updatedTitle: string,
    updatedUrl: string,
    updatedMemo: string,
  ) => {
    if (link) {
      const updatedLink = {
        ...link,
        title: updatedTitle,
        url: updatedUrl,
        memo: updatedMemo,
      };
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

  const handleCancelAlert = () => {
    setIsAlertVisible(false);
  };

  if (!link) {
    return (
      <View style={styles.container}>
        <Text>링크 불러오는 중...</Text>
      </View>
    );
  }

  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topWhite, { height: top }]} />
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
      <CustomAlert
        visible={isAlertVisible}
        type="info"
        title="알림"
        message={alertMessage}
        onConfirm={handleCancelAlert}
        confirmText="확인"
        onCancel={handleCancelAlert}
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
  cardContainer: {
    paddingTop: 100,
    padding: 16,
    alignItems: 'center',
  },
});

export default LinkCardScreen;
