import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShortLinkCard = ({ title, url, memo, createdAt, onCopy, onPress }) => {
  const thumbnailUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{getRelativeTime(createdAt)}</Text>
        </View>
        <View style={styles.urlContainer}>
          <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
            {url}
          </Text>
          <TouchableOpacity onPress={onCopy}>
            <Icon name="content-copy" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  url: {
    flex: 1,
    fontSize: 14,
    color: 'blue',
  },
});

export default ShortLinkCard;
