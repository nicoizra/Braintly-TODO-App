import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodoElement from '../components/TodoElement';
import {Task} from '../types';

import {mapData} from '../utils';
import {Button} from 'react-native-paper';
import {useTaskContext} from '../providers/task';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {getDoneTasksId, getSavedTasks} from '../api';

function HomeScreen(): React.JSX.Element {
  // Elegí mantener los estados en un Provider para poder utilizarlos en ambas pantallas y compartir lógica
  const {
    shownTasks,
    setShownTasks,
    handleOnDelete,
    handlePressCheck,
    isSelected,
    orderByNewer,
    orderByOlder,
    setSelectedIds,
    orderByDeadline,
  } = useTaskContext();

  const navigation = useNavigation();

  useEffect(() => {
    // Al iniciar obtengo los Id de las tareas ya marcadas como hechas
    getDoneTasksId().then(res => setSelectedIds(res));

    // Y las tareas guardadas, con el tipo Task
    getSavedTasks().then(res => setShownTasks(mapData(res)));
  }, []);

  // En este pantalla se muestra el listado de tareas (TODO List)
  // Apareciendo mas arriba las tareas que no fueron marcadas como hechas, y abajo de todo las que sí.
  // Hay tambien botones para ordenar el listado segun la fecha en la que las tareas fueron creadas,
  // y un botón para que aparezcan primero las que estan proximas a su deadline y todavía no se hicieron.

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TO-DO List</Text>
          <Text>Swipe right to delete</Text>

          <View style={styles.orderContainer}>
            <Button onPress={orderByOlder}>Order By Older ⬇️</Button>
            <Button onPress={orderByNewer}>Order By Newer ⬆️</Button>
          </View>

          <View style={styles.nextToDeadlineContainer}>
            <Button onPress={orderByDeadline}>Closer To Deadline 🔥</Button>
          </View>
          {shownTasks
            .filter((task: Task) => !isSelected(task))
            .map((task: Task, index: number) => (
              <TodoElement
                index={index}
                onPressCheck={() => handlePressCheck(task)}
                task={task}
                key={task.id.toString()}
                isChecked={isSelected(task)}
                onDelete={() => handleOnDelete(task)}
              />
            ))}
          {shownTasks
            .filter((task: Task) => isSelected(task))
            .map((task: Task, index: number) => (
              <TodoElement
                index={index}
                onPressCheck={() => handlePressCheck(task)}
                task={task}
                key={task.id.toString()}
                isChecked={isSelected(task)}
                onDelete={() => handleOnDelete(task)}
              />
            ))}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AddNewTaskScreen')}>
            Add new task
          </Button>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
export default HomeScreen;
