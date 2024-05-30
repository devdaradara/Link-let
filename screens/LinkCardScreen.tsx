import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LinkCardScreen = ({ route }) => {
  const { link } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{link.title}</Text>
      <Text style={styles.text}>URL: {link.url}</Text>
      <Text style={styles.text}>Category: {link.category}</Text>
      <Text style={styles.text}>Memo: {link.memo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default LinkCardScreen;
