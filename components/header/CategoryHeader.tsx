import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

interface CategoryHeaderProps {
  title: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  isEditing: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, onBack, onEdit, onDelete, onSave, isEditing }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isEditing ? (
        <TouchableOpacity onPress={onSave} style={styles.iconMargin}>
          <Icon name="check" size={24} color="#fc7a1e" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={24} color="#fc7a1e" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    header: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    iconMargin: {
      marginLeft: 16,
    },
  });

export default CategoryHeader;
