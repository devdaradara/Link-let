import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WriteHeader from '../components/WriteHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../screens/types';

function AddLinkDetailsScreen({ route }) {
  const { category } = route.params;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [memo, setMemo] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const urlRef = useRef<TextInput>(null);
  const memoRef = useRef<TextInput>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const saveLink = async () => {
    const newLink = { id: Date.now().toString(), title, url, category, memo, createdAt: new Date().toISOString() };
    const storedLinks = await AsyncStorage.getItem('links');
    const links = storedLinks ? JSON.parse(storedLinks) : [];
    links.push(newLink);
    await AsyncStorage.setItem('links', JSON.stringify(links));

    // 입력 필드 초기화
    setTitle('');
    setUrl('');
    setMemo('');

    // LinkCardScreen으로 이동
    navigation.navigate('LinkCard', { link: newLink });
  };

  const onSave = () => {
    if (!title || !url) {
      Alert.alert('Error', 'Title and URL cannot be empty.');
      return;
    }
    saveLink();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} title={title} setTitle={setTitle} />
        <View style={styles.editor}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="URL"
              style={styles.textInput}
              returnKeyType="next"
              value={url}
              onChangeText={setUrl}
              ref={urlRef}
              onSubmitEditing={() => memoRef.current?.focus()}
            />
            <Icon name="link" size={24} color="#888" style={styles.icon} />
          </View>
          <View style={styles.memoContainer}>
            <TextInput
              placeholder="Memo"
              style={styles.memoInput}
              multiline
              textAlignVertical="top"
              value={memo}
              onChangeText={setMemo}
              ref={memoRef}
            />
            <Icon name="edit" size={24} color="#888" style={styles.memoIcon} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avoidingView: {
    flex: 1,
  },
  editor: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  icon: {
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#263238',
  },
  memoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memoInput: {
    flex: 1,
    fontSize: 16,
    color: '#263238',
    paddingRight: 8,
    height: '100%',
  },
  memoIcon: {
    marginLeft: 8,
    marginTop: 8,
  },
});

export default AddLinkDetailsScreen;
