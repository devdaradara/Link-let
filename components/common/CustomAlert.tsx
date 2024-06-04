import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomAlertProps {
  visible: boolean;
  type: 'success' | 'failed' | 'info' | 'warning';
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type,
  title,
  message,
  onConfirm,
  confirmText = '확인',
}) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'failed':
        return styles.failed;
      case 'info':
        return styles.info;
      case 'warning':
        return styles.warning;
      default:
        return {};
    }
  };

  const getIconName = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'failed':
        return 'error';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onConfirm}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, getTypeStyles(type)]}>
          <View style={styles.header}>
            <Icon name={getIconName(type)} size={24} style={styles.icon} />
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onConfirm}>
              <Icon name="close" size={24} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
              <Text style={styles.textStyle}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  success: {
    borderLeftWidth: 5,
    borderColor: '#4CAF50',
  },
  failed: {
    borderLeftWidth: 5,
    borderColor: '#F44336',
  },
  info: {
    borderLeftWidth: 5,
    borderColor: '#2196F3',
  },
  warning: {
    borderLeftWidth: 5,
    borderColor: '#FF9800',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  modalMessage: {
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#f9c784',
  },
  buttonConfirm: {
    backgroundColor: '#fc7a1e',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
