import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LinkCardBack = ({ title, url, createdAt, memo, onFlip, onCopy }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.label}>URL</Text>
      <View style={styles.urlContainer}>
        <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
          {url}
        </Text>
        <TouchableOpacity onPress={onCopy}>
          <Icon name="content-copy" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>생성일</Text>
      <Text style={styles.date}>{createdAt}</Text>
      <Text style={styles.label}>메모</Text>
      <Text style={styles.memo}>{memo}</Text>
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={onFlip} style={styles.flipButton}>
          <Icon name="flip" size={24} color="#888" />
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  url: {
    fontSize: 16,
    color: '#0000ff',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 14,
  },
  memo: {
    fontSize: 14,
  },
  flipButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
});

export default LinkCardBack;
