import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface WalletProps {
  title: string;
  color: string;
  onPress: () => void;
}

const Wallet: React.FC<WalletProps> = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.tab}>
        <Text style={styles.tabTitle}>{title}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.title}></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'flex-end',
  },
  tab: {
    width: (Dimensions.get('window').width / 2) - 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    width: (Dimensions.get('window').width / 2) - 30,
    height: 120,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Wallet;
