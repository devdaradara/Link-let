import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const LinkCardBack = ({ title, url, createdAt, memo, onFlip, onCopy }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const formatDate = (dateString) => {
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
      <View style={styles.titleDate}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{formatDate(createdAt)}</Text>
      </View>
      <Text style={styles.label}>URL</Text>
      <View style={styles.urlContainer}>
        <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
          {url}
        </Text>
        <TouchableOpacity onPress={onCopy}>
          <Icon name="content-copy" size={24} color={theme === 'dark' ? '#ccc' : '#888'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Memo</Text>
      <Text style={styles.memo}>{memo}</Text>
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={onFlip} style={styles.flipButton}>
          <Icon name="flip" size={24} color={theme === 'dark' ? '#ccc' : '#888'} />
        </TouchableOpacity>
      </View>
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
  titleDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'black',
  },
  date: {
    marginLeft: 'auto',
    marginTop: 10,
    fontSize: 14,
    color: theme === 'dark' ? '#bbb' : 'black',
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
  url: {
    fontSize: 16,
    color: '#485696',
    flex: 1,
  },
  memo: {
    fontSize: 14,
    color: theme === 'dark' ? '#bbb' : 'black',
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
