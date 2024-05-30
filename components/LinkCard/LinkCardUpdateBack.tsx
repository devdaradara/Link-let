import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const LinkCardUpdateBack = ({ title, url, createdAt, memo, onFlip, onSave }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedUrl, setUpdatedUrl] = useState(url);
  const [updatedMemo, setUpdatedMemo] = useState(memo);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
        placeholder="Title"
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
      />
      <Text style={styles.label}>URL</Text>
      <TextInput
        style={styles.input}
        value={updatedUrl}
        onChangeText={setUpdatedUrl}
        placeholder="URL"
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
      />
      <Text style={styles.label}>Date</Text>
      <Text style={styles.date}>{createdAt}</Text>
      <Text style={styles.label}>Memo</Text>
      <TextInput
        style={[styles.input, styles.memoInput]}
        value={updatedMemo}
        onChangeText={setUpdatedMemo}
        placeholder="Memo"
        placeholderTextColor={theme === 'dark' ? '#ccc' : '#999'}
        multiline
      />
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={onFlip} style={styles.flipButton}>
          <Icon name="flip" size={24} color={theme === 'dark' ? '#ccc' : '#888'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onSave(updatedTitle, updatedUrl, updatedMemo)} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  card: {
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
    height: 500,
    width: 280,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme === 'dark' ? '#555' : '#ccc',
    marginBottom: 14,
    fontSize: 16,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  date: {
    fontSize: 14,
    marginBottom: 14,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  memoInput: {
    height: 100,
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
