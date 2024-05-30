import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkCardHeader from '../components/LinkCardHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type LinkCardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LinkCard'>;

const LinkCardScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<LinkCardScreenNavigationProp>();
  const { link } = route.params as { link: { id: string; title: string; url: string; category: string; memo: string } };
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [memo, setMemo] = useState(link.memo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const saveLink = async () => {
    const updatedLink = { ...link, title, url, memo };
    const storedLinks = await AsyncStorage.getItem('links');
    let links = storedLinks ? JSON.parse(storedLinks) : [];
    links = links.map((l) => (l.id === updatedLink.id ? updatedLink : l));
    await AsyncStorage.setItem('links', JSON.stringify(links));

    setIsEditing(false);
    navigation.navigate('MainTab', { screen: 'Home', params: { refresh: true } });
  };

  const removeLink = async () => {
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
            links = links.filter((l) => l.id !== link.id);
            await AsyncStorage.setItem('links', JSON.stringify(links));
            navigation.navigate('MainTab', { screen: 'Home', params: { refresh: true } });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const copyToClipboard = () => {
    Clipboard.setString(url);
    Alert.alert('복사됨', 'URL이 클립보드에 복사되었습니다.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinkCardHeader
        title={title}
        onSave={saveLink}
        onEdit={() => setIsEditing(!isEditing)}
        onRemove={removeLink}
        isEditing={isEditing}
      />
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>URL</Text>
          <View style={styles.urlContainer}>
            <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
              {url}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Icon name="content-copy" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>메모</Text>
          <Text style={styles.memo}>{memo}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  url: {
    fontSize: 16,
    color: '#0000ff',
    flex: 1,
  },
  memo: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
  memoIcon: {
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
});

export default LinkCardScreen;
