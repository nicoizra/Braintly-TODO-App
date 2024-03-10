import React from 'react';
import {TaskProvider} from './task';

export const AppProvider = ({children}: any) => {
  return <TaskProvider>{children}</TaskProvider>;
};
