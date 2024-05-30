import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CategoryHeaderProps {
  title: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  isEditing: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, onBack, onEdit, onDelete, onSave, isEditing }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isEditing ? (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onSave}>
            <Icon name="check" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconMargin}>
            <Icon name="delete" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={24} color="#000" />
        </TouchableOpacity>
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
