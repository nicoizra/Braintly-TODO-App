import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddNewSection from '../components/AddNewSection';
import {useTaskContext} from '../providers/task';
import {styles} from '../styles';

const AddNewTask = () => {
  const {handleOnAdd} = useTaskContext();
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <AddNewSection handleOnPress={handleOnAdd} />
    </SafeAreaView>
  );
};

export default AddNewTask;
