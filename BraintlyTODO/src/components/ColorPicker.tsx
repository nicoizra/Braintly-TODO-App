import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface ColorPickerProps {
  picked: number;
  setPicked: (arg0: number) => void;
}
import {TASK_COLORS} from '../consts';
import Animated, {FadeInDown} from 'react-native-reanimated';

const ColorPicker = ({picked, setPicked}: ColorPickerProps) => {
  return (
    <View style={styles.container}>
      {TASK_COLORS.map((color, index) => (
        <Animated.View
          key={index.toString()}
          entering={FadeInDown.delay(50 * index)}>
          <TouchableOpacity
            onPress={() => setPicked(index)}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity: picked === index ? 1 : 0.4,
                width: picked === index ? 30 : 22,
              },
            ]}
          />
        </Animated.View>
      ))}
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  circle: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 15,
  },
});
