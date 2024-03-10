import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../theme';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

const CheckBox = ({checked, onPress}: CheckBoxProps) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: checked ? theme.colors.grey : 'transparent'},
        ]}
      />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  mainContainer: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 18,
    borderColor: theme.colors.grey,
    borderWidth: 3,
    padding: 4,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 18,
  },
});
