import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

// Function to determine the thumbnail URL
const getThumbnailUrl = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const matches = youtubeRegex.exec(url);

  if (matches && matches[1]) {
    return `https://img.youtube.com/vi/${matches[1]}/maxresdefault.jpg`;
  }

  return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
};

const LinkCardFront = ({ title, url, onCopy, onFlip }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const thumbnailUrl = getThumbnailUrl(url);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
        {url}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onCopy}>
          <Icon name="content-copy" size={24} color={theme === 'dark' ? '#ccc' : '#888'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFlip}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: theme === 'dark' ? '#fff' : 'black',
  },
  url: {
    fontSize: 16,
    color: '#485696',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default LinkCardFront;
