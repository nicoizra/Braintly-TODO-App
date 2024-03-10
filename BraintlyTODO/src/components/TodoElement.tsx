import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import CheckBox from './CheckBox';
import {
  calcCreatedText,
  calcExpiredText,
  calcRemainingText,
  isBeforeNow,
} from '../utils';
import {Task} from '../types';
import Animated, {FadeInLeft} from 'react-native-reanimated';

interface TodoElementProps {
  task: Task;
  isChecked: boolean;
  onPressCheck: () => void;
  onDelete: () => void;
  index: number;
}

const TodoElement = ({
  task,
  isChecked,
  onPressCheck,
  onDelete,
  index,
}: TodoElementProps) => {
  const {title, expires, createdAt} = task;
  const renderLeft = () => (
    <TouchableOpacity style={styles.deleteContainer} onPress={onDelete}>
      <Text>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      key={index.toString()}
      entering={FadeInLeft.delay(150 * index)}>
      <Swipeable renderLeftActions={renderLeft}>
        <View style={[styles.container, {opacity: isChecked ? 0.6 : 1}]}>
          <View style={[styles.marker, {backgroundColor: task.color}]} />
          <View style={styles.taskTitle}>
            <Text
              style={[
                styles.title,
                {textDecorationLine: isChecked ? 'line-through' : 'none'},
              ]}>
              {title}
            </Text>
            <Text
              style={[
                styles.daysLeft,
                {
                  color: isBeforeNow(expires) ? 'red' : 'green',
                },
              ]}>
              {isBeforeNow(expires)
                ? calcExpiredText(expires)
                : calcRemainingText(expires)}
            </Text>
            <Text style={styles.createdAt}>{calcCreatedText(createdAt)}</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox checked={isChecked} onPress={onPressCheck} />
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
};

export default TodoElement;

const MARGIN = 15;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.backGrey,
    borderRadius: theme.roundness,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    marginVertical: MARGIN,
  },
  checkContainer: {
    width: 'auto',
    marginRight: MARGIN,
  },
  deleteContainer: {
    width: 60,
    justifyContent: 'center',
  },
  createdAt: {
    opacity: 0.5,
    marginTop: 5,
    fontSize: 12,
  },
  daysLeft: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  marker: {
    height: '100%',
    width: 10,
    backgroundColor: 'green',
    borderBottomLeftRadius: theme.roundness,
    borderTopLeftRadius: theme.roundness,
    marginRight: MARGIN,
  },
});
