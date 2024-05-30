import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CategoryHeader = ({ title, onBack, onEdit, onDelete, onSave, isEditing }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isEditing ? (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onDelete}>
            <Icon name="delete" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSave}>
            <Icon name="check" size={24} color="#000" style={styles.iconMargin} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onEdit}>
            <Icon name="edit" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    // transform: [{ translateX: -50% },
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: 16,
  },
});

export default CategoryHeader;
