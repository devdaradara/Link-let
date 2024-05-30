import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransparentCircleButton = ({ name, color, hasMarginRight = false, onPress }) => {
  return (
    <Pressable
      style={[styles.iconButton, hasMarginRight && styles.marginRight]}
      onPress={onPress}
      android_ripple={{ color: '#ededed' }}>
      <Icon name={name} size={24} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
});

export default TransparentCircleButton;
