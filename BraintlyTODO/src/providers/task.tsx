import React, {createContext, useContext, useState} from 'react';
import {Task} from '../types';
import {addTask, deleteSavedTask, markTaskDone, markTaskUndone} from '../api';
import {isBeforeNow} from '../utils';

const TaskContext = createContext(null);

export const TaskProvider = ({children}: any) => {
  const [shownTasks, setShownTasks] = useState<Task[]>([]);
  const [selectedIds, setSelectedIds] = useState<String[]>([]);

  const isSelected = (task: Task) => selectedIds.includes(task.id);

  // En el onPress del CheckBox se fija si la tarea esta marcada o no.
  // Si no esta marcada, llama a la API para que agregue su Id a la lista de hechas.
  // Si esta marcada, llama a la API para borrar el Id de la lista de hechas.
  const handlePressCheck = (task: Task) => {
    let newSelectedIds: Array<String> = [];

    if (isSelected(task)) {
      markTaskUndone(task.id.toString());
      newSelectedIds = selectedIds.filter(id => id !== task.id);
    } else {
      markTaskDone(task.id.toString());
      newSelectedIds = [...selectedIds, task.id];
    }

    setSelectedIds(newSelectedIds);
  };

  // Al borrar se la saca de las tareas hechas y tambien se borra su registro de tareas guardadas
  const handleOnDelete = (task: Task) => {
    if (isSelected(task)) {
      let newSelectedIds: Array<String> = [];
      markTaskUndone(task.id.toString());
      newSelectedIds = selectedIds.filter(id => id !== task.id);
      setSelectedIds(newSelectedIds);
    }

    deleteSavedTask(task);
    const newTasks = shownTasks.filter(t => t.id !== task.id);

    setShownTasks(newTasks);
  };

  const handleOnAdd = async (newTask: Task) => {
    const newTasks = [newTask, ...shownTasks];

    addTask(newTask);
    setShownTasks(newTasks);
  };

  const orderByNewer = () => {
    let sortedList = [...shownTasks];
    sortedList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setShownTasks(sortedList);
  };

  const orderByOlder = () => {
    let sortedList = [...shownTasks];
    sortedList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    setShownTasks(sortedList);
  };

  // Se separa la tarea expiradas de las no expiradas
  // Se ponen primero las no expiradas, ordenadas por proximidad al deadline y luego las que ya expiraron
  const orderByDeadline = () => {
    let expiredTasks = [
      ...shownTasks.filter(task => isBeforeNow(task.expires)),
    ];
    let nonExpiredTasks = [
      ...shownTasks.filter(task => !isBeforeNow(task.expires)),
    ];
    nonExpiredTasks.sort((a, b) => a.expires.getTime() - b.expires.getTime());

    let sortedList = [...nonExpiredTasks, ...expiredTasks];
    setShownTasks(sortedList);
  };

  return (
    <TaskContext.Provider
      value={{
        shownTasks,
        setShownTasks,
        selectedIds,
        setSelectedIds,
        handleOnAdd,
        handleOnDelete,
        handlePressCheck,
        isSelected,
        orderByNewer,
        orderByOlder,
        orderByDeadline,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
