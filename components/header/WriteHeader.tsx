import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import TransparentCircleButton from '.././TransparentCircleButton';
import { RootStackParamList } from '../../navigation/types';

function WriteHeader({ onSave, title, setTitle }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="black"
        />
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.buttons}>
        <TransparentCircleButton
          name="check"
          color="#fc7a1e"
          onPress={onSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 65,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  titleInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WriteHeader;
