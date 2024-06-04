import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색..."
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={onSearch}>
        <Icon name="search" size={24} color={'#fc7a1e'} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: theme === 'dark' ? '#555' : '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 10,
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

export default SearchHeader;
