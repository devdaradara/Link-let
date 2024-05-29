import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Wallet from '../components/Wallet';

const categories = [
  { title: '전체보기', color: '#cdb4db' },
  { title: '카테고리1', color: '#ffc8dd' },
  { title: '카테고리2', color: '#bde0fe' },
  { title: '카테고리3', color: '#e9edc9' },
];

const HomeScreen = () => {
  // 월렛을 눌렀을 때의 이벤트 핸들러
  const handleWalletPress = (category: string) => {
    console.log(`${category} 눌림`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Wallet
            title={item.title}
            color={item.color}
            onPress={() => handleWalletPress(item.title)}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
  },
  contentContainer: {
    paddingVertical: 20,
  },
});

export default HomeScreen;
