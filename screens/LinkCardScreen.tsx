import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LinkCardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Link Card Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LinkCardScreen;
