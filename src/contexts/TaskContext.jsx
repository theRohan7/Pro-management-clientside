import React, { createContext, useState, useCallback } from "react";
import { changeTaskStatus, getTasks } from "../services/task";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async (filter) => {
    try {
      const response = await getTasks(filter);
      setTasks(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const taskStatus = useCallback(
    async (newStatusTask) => {
      const index = tasks.findIndex((task) => task._id === newStatusTask._id);

      if (index !== -1) {
        const newTasks = [...tasks];
        newTasks[index] = newStatusTask;
        setTasks(newTasks);
      }
    },
    [tasks]
  );

  const updateTaskChecklist = useCallback(
    async (updatedTask) => {
      const index = tasks.findIndex((task) => task._id === updatedTask._id);

      if (index !== -1) {
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, taskStatus, updateTaskChecklist }}
    >
      {children}
    </TaskContext.Provider>
  );
};
