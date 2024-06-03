import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DropdownFilter = ({ visible, onSelectFilter }) => {
  if (!visible) return null;

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity onPress={() => onSelectFilter('latest')}>
        <Text style={styles.dropdownOption}>Latest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectFilter('oldest')}>
        <Text style={styles.dropdownOption}>Oldest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectFilter('asc')}>
        <Text style={styles.dropdownOption}>A-Z</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectFilter('desc')}>
        <Text style={styles.dropdownOption}>Z-A</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#000',
  },
});

export default DropdownFilter;
