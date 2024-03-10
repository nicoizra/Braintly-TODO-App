import {theme} from './theme';

export const TASK_COLORS = [
  theme.colors.red,
  theme.colors.purple,
  theme.colors.green,
  theme.colors.pink,
  theme.colors.blue,
];

export const API_ENDPOINTS = {
  addNewTask: 'http://localhost:3000/newSavedTask',
  markAsDone: 'http://localhost:3000/markAsDone',
  markAsUndone: 'http://localhost:3000/markAsUndone',
  deleteTask: 'http://localhost:3000/deleteTask',
  getSavedTasks: 'http://localhost:3000/getSavedTasks',
  getDoneTasksId: 'http://localhost:3000/getDoneTasksId',
};
