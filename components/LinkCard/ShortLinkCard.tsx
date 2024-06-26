import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const getThumbnailUrl = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const matches = youtubeRegex.exec(url);

  if (matches && matches[1]) {
    return `https://img.youtube.com/vi/${matches[1]}/maxresdefault.jpg`;
  }

  return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
};

const ShortLinkCard = ({ title, url, createdAt, onCopy, onPress, isEditing, onRemove }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const thumbnailUrl = getThumbnailUrl(url);

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <Text style={styles.date}>{getRelativeTime(createdAt)}</Text>
        <View style={styles.urlContainer}>
          <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
            {url}
          </Text>
          <TouchableOpacity onPress={onCopy}>
            <Icon name="content-copy" size={20} color={theme === 'dark' ? '#ccc' : '#888'} />
          </TouchableOpacity>
        </View>
        {isEditing && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Icon name="delete" size={24} color="#fc7a1e" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
    padding: 10,
    marginVertical: 12,
    borderRadius: 8,
    height: 100,
    elevation: 3,
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 15,
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
    color: theme === 'dark' ? '#fff' : 'black',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  date: {
    fontSize: 12,
    color: theme === 'dark' ? '#bbb' : '#888',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  url: {
    flex: 1,
    fontSize: 14,
    color: theme === 'dark' ? '#bbb' : '#485696',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default ShortLinkCard;
