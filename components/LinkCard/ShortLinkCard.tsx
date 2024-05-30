import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const getThumbnailUrl = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const matches = youtubeRegex.exec(url);

  if (matches && matches[1]) {
    return `https://img.youtube.com/vi/${matches[1]}/maxresdefault.jpg`;
  }

  return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
};

const ShortLinkCard = ({ title, url, createdAt, onCopy, onPress }) => {
  const thumbnailUrl = getThumbnailUrl(url);

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
    marginVertical: 12,
    borderRadius: 8,
    height: 100,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#485696',
  },
});

export default ShortLinkCard;
