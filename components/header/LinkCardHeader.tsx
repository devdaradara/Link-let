import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface LinkCardHeaderProps {
  title: string;
  onBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  isEditing: boolean;
}

const LinkCardHeader: React.FC<LinkCardHeaderProps> = ({
  title,
  onBack,
  onEdit,
  onSave,
  isEditing,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  const handleSave = () => {
    onSave();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Icon
          name="arrow-back"
          size={24}
          color={theme === 'dark' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isEditing ? (
        <TouchableOpacity onPress={handleSave} style={styles.iconMargin}>
          <Icon name="home" size={24} color="#fc7a1e" />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onEdit} style={styles.iconMargin}>
            <Icon name="edit" size={24} color="#fc7a1e" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Icon name="check" size={24} color="#fc7a1e" />
          </TouchableOpacity>
        </View>
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
      marginRight: 10,
    },
    buttons: {
      flexDirection: 'row',
    },
  });

export default LinkCardHeader;
