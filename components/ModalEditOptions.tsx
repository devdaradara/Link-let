import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ModalEditOptions = ({ visible, onDeleteAll, onEditCategory, onCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={onDeleteAll}>
            <Text style={styles.modalButtonText}>Delete All Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onEditCategory}>
            <Text style={styles.modalButtonText}>Edit Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#000',
  },
});

export default ModalEditOptions;
