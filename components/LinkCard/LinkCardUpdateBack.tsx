import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

const LinkCardUpdateBack = ({title, url, createdAt, memo, onFlip, onSave}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedUrl, setUpdatedUrl] = useState(url);
  const [updatedMemo, setUpdatedMemo] = useState(memo);
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.titleInput}
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
        placeholder="제목"
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
      />
      <Text style={styles.label}>URL</Text>
      <View style={styles.urlContainer}>
        <TextInput
          style={styles.urlInput}
          value={updatedUrl}
          onChangeText={setUpdatedUrl}
          placeholder="URL"
          placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
        />
      </View>
      <Text style={styles.label}>메모</Text>
      <TextInput
        style={styles.memoInput}
        value={updatedMemo}
        onChangeText={setUpdatedMemo}
        placeholder="메모"
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
        multiline
      />
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={onFlip} style={styles.flipButton}>
          <Icon
            name="flip"
            size={24}
            color={theme === 'dark' ? '#ccc' : '#888'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onSave(updatedTitle, updatedUrl, updatedMemo)}
        style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    card: {
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
      height: 500,
      width: 280,
      padding: 16,
      marginBottom: 16,
      borderRadius: 8,
      elevation: 3,
    },
    titleDate: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    titleInput: {
      flex: 1,
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : 'black',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#555' : '#ccc',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 14,
      marginBottom: 6,
      color: theme === 'dark' ? '#fff' : 'black',
    },
    urlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    urlInput: {
      flex: 1,
      fontSize: 16,
      color: '#485696',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#555' : '#ccc',
    },
    memoInput: {
      height: 100,
      fontSize: 14,
      color: theme === 'dark' ? '#bbb' : 'black',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#555' : '#ccc',
    },
    flipButtonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    flipButton: {
      alignSelf: 'flex-end',
      marginTop: 16,
    },
    saveButton: {
      marginTop: 20,
      backgroundColor: '#fc7a1e',
      paddingVertical: 10,
      borderRadius: 8,
    },
    saveButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default LinkCardUpdateBack;
