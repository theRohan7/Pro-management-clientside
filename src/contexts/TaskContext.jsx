import React, { createContext, useState } from "react";
import { getTasks } from "../services/task";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async (filter) => {    
    try {
      const response = await getTasks(filter);      
      setTasks(response.data.data);
    } catch (error) {
      console.error(error.message);
    } 
  };

  

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
