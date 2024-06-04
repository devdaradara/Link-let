import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WriteHeader from '../../components/header/WriteHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomAlert from '../../components/common/CustomAlert';

function AddLinkDetailsScreen({ route }) {
  const { category } = route.params;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [memo, setMemo] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const urlRef = useRef<TextInput>(null);
  const memoRef = useRef<TextInput>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { top } = useSafeAreaInsets();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const saveLink = async () => {
    const newLink = { id: Date.now().toString(), title, url, category, memo, createdAt: new Date().toISOString() };
    const storedLinks = await AsyncStorage.getItem('links');
    const links = storedLinks ? JSON.parse(storedLinks) : [];
    links.push(newLink);
    await AsyncStorage.setItem('links', JSON.stringify(links));

    setTitle('');
    setUrl('');
    setMemo('');

    navigation.navigate('LinkCard', { id: newLink.id });
  };

  const onSave = () => {
    if (!title || !url) {
      setAlertMessage('제목과 URL을 입력해주세요.');
      setIsAlertVisible(true);
      return;
    }
    saveLink();
  };

  const handleCancelAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <View style={styles.block}>
      <View style={[styles.topSection, { height: top }]} />
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} title={title} setTitle={setTitle} />
        <View style={styles.editor}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="URL"
              placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
              style={styles.textInput}
              returnKeyType="next"
              value={url}
              onChangeText={setUrl}
              ref={urlRef}
              onSubmitEditing={() => memoRef.current?.focus()}
            />
            <Icon name="link" size={24} color="#fc7a1e" style={styles.icon} />
          </View>
          <View style={styles.memoContainer}>
            <TextInput
              placeholder="메모를 입력하세요."
              placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
              style={styles.memoInput}
              multiline
              textAlignVertical="top"
              value={memo}
              onChangeText={setMemo}
              ref={memoRef}
            />
            <Icon name="edit" size={24} color="#fc7a1e" style={styles.memoIcon} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <CustomAlert
        visible={isAlertVisible}
        type="warning"
        title="입력 오류"
        message={alertMessage}
        onConfirm={handleCancelAlert}
        confirmText="확인"
        onCancel={handleCancelAlert}
      />
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#121212' : '#fff',
  },
  topSection: {
    backgroundColor: theme === 'dark' ? '#121212' : '#fff',
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
    borderBottomColor: theme === 'dark' ? '#333' : '#ccc',
    marginBottom: 16,
  },
  icon: {
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme === 'dark' ? '#fff' : '#263238',
  },
  memoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: theme === 'dark' ? '#333' : '#ccc',
  },
  memoInput: {
    flex: 1,
    fontSize: 16,
    color: theme === 'dark' ? '#fff' : '#263238',
    paddingRight: 8,
    height: '100%',
  },
  memoIcon: {
    marginLeft: 8,
    marginTop: 8,
  },
});

export default AddLinkDetailsScreen;
