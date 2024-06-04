import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';

const colors = [
  ['#f44336', '#ffcdd2'], ['#e91e63', '#f8bbd0'], ['#9c27b0', '#e1bee7'], ['#673ab7', '#d1c4e9'], 
  ['#3f51b5', '#c5cae9'], ['#2196f3', '#bbdefb'], ['#03a9f4', '#b3e5fc'], ['#00bcd4', '#b2ebf2'], 
  ['#009688', '#b2dfdb'], ['#4caf50', '#c8e6c9'], ['#8bc34a', '#dcedc8'], ['#cddc39', '#f0f4c3'], 
  ['#ffeb3b', '#fff9c4'], ['#ffc107', '#ffecb3'], ['#ff9800', '#ffe0b2'], ['#ff5722', '#ffccbc'], 
  ['#795548', '#d7ccc8'], ['#607d8b', '#cfd8dc'], ['#000000', '#9e9e9e'], ['#ffffff', '#f1f1f1'],
  ['#607d8b', '#cfd8dc'], ['#795548', '#d7ccc8'], ['#ff5722', '#ffccbc'], ['#ff9800', '#ffe0b2'],
];

const ColorPickerModal = ({ visible, onClose, selectedColor, onSelectColor }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Color</Text>
          <View style={styles.colorContainer}>
            {colors.map(([darkColor, lightColor]) => (
              <View key={darkColor} style={styles.colorPair}>
                <TouchableOpacity
                  style={[
                    styles.colorCircle,
                    { backgroundColor: darkColor },
                    selectedColor === darkColor && styles.selectedColor
                  ]}
                  onPress={() => onSelectColor(darkColor)}
                />
                <TouchableOpacity
                  style={[
                    styles.colorCircle,
                    { backgroundColor: lightColor },
                    selectedColor === lightColor && styles.selectedColor
                  ]}
                  onPress={() => onSelectColor(lightColor)}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorPair: {
    alignItems: 'center',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fc7a1e',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ColorPickerModal;
