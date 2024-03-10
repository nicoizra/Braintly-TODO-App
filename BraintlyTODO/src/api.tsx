import {API_ENDPOINTS} from './consts';
import {Task} from './types';

const generatePostOptions = (data: any) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convierte los datos a formato JSON
  };
};

export const addTask = (newTask: Task) => {
  fetch(API_ENDPOINTS.addNewTask, generatePostOptions(newTask))
    .then(response => response.text())
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
export const deleteSavedTask = (task: Task) => {
  fetch(API_ENDPOINTS.deleteTask, generatePostOptions(task))
    .then(response => response.text())
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const markTaskDone = (id: string) => {
  fetch(API_ENDPOINTS.markAsDone, generatePostOptions({id}))
    .then(response => response.text())
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const markTaskUndone = (id: string) => {
  fetch(API_ENDPOINTS.markAsUndone, generatePostOptions({id}))
    .then(response => response.text())
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const getSavedTasks = () =>
  fetch(API_ENDPOINTS.getSavedTasks).then(async res => await res.json());

export const getDoneTasksId = () =>
  fetch(API_ENDPOINTS.getDoneTasksId).then(async res => await res.json());
