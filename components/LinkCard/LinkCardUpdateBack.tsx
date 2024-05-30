import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LinkCardUpdateBack = ({ title, url, createdAt, memo, onFlip, onSave }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedUrl, setUpdatedUrl] = useState(url);
  const [updatedMemo, setUpdatedMemo] = useState(memo);

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
        placeholder="Title"
      />
      <Text style={styles.label}>URL</Text>
      <TextInput
        style={styles.input}
        value={updatedUrl}
        onChangeText={setUpdatedUrl}
        placeholder="URL"
      />
      <Text style={styles.label}>생성일</Text>
      <Text style={styles.date}>{createdAt}</Text>
      <Text style={styles.label}>메모</Text>
      <TextInput
        style={[styles.input, styles.memoInput]}
        value={updatedMemo}
        onChangeText={setUpdatedMemo}
        placeholder="Memo"
        multiline
      />
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={onFlip} style={styles.flipButton}>
          <Icon name="flip" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onSave(updatedTitle, updatedUrl, updatedMemo)} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 500,
    width: 280,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 14,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
    color: 'black',
  },
  date: {
    fontSize: 14,
    marginBottom: 14,
    color: 'black',
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
