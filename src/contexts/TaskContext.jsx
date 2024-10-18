import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getTasks } from "../services/task";


export  const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('This Week')
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const response = await getTasks(filter) 
                console.log(response.data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchTasks()
    }, [filter])

  if(loading){
    return <div>Loading Tasks...</div>
  }

  return (
    <TaskContext.Provider value={{tasks, setTasks, filter, setFilter}}>
      {children}
    </TaskContext.Provider>
  )

}