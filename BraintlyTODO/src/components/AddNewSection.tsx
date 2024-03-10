import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Task} from '../types';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';
import ColorPicker from './ColorPicker';
import {theme} from '../theme';
import {TASK_COLORS} from '../consts';
import {useNavigation} from '@react-navigation/native';

interface AddNewProps {
  handleOnPress: (arg0: Task) => void;
}
const AddNewSection = ({handleOnPress}: AddNewProps) => {
  const [newTask, setNewTask] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [hasConfirmedDate, setHasConfirmedDate] = useState(false);
  const [colorId, setColorId] = useState(0);

  const resetValues = () => {
    setNewTask('');
    setHasConfirmedDate(false);
    setDate(new Date());
  };

  const createNewTask = () => {
    const ret: Task = {
      title: newTask,
      createdAt: new Date(),
      id: uuid.v4().toString(),
      expires: date,
      color: TASK_COLORS[colorId],
    };

    return ret;
  };

  const navigation = useNavigation();
  return (
    <View style={styles.input}>
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="New task..."
      />
      <Button onPress={() => setOpen(true)}>
        {hasConfirmedDate
          ? 'Deadline: ' + date.toDateString()
          : 'Select deadline'}
      </Button>
      <DatePicker
        modal
        minimumDate={new Date()}
        open={open}
        date={date}
        onConfirm={(d: Date) => {
          setOpen(false);
          setDate(d);
          setHasConfirmedDate(true);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <ColorPicker picked={colorId} setPicked={setColorId} />
      <Button
        mode="contained"
        disabled={newTask.length === 0 || !hasConfirmedDate}
        onPress={() => {
          const task = createNewTask();
          handleOnPress(task);
          resetValues();
          navigation.goBack();
        }}>
        Add to list
      </Button>
    </View>
  );
};

export default AddNewSection;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: theme.colors.backGrey,
    padding: 20,
    borderRadius: theme.roundness,
  },
});
