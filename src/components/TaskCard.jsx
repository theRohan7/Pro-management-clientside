import React, { useContext, useEffect, useState } from 'react'
import '../CSS/Taskcard.css';
import { changeTaskStatus, updateTaskChecklists } from '../services/task';
import { TaskContext } from '../contexts/TaskContext';

function TaskCard({task}) {

  const {taskStatus,  updateTaskChecklist} = useContext(TaskContext);

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  }

  const allStatus = ['Backlog', 'Todo', 'In Progress', 'Done'];

  const availableStatus = () => {
    return allStatus.filter(status => status !== task.status);
  }

  const toggleChecklist =  async(taskID, idx) => {

    try {
      const response = await updateTaskChecklists(idx, taskID); 
      if (response.status === 200) {
        await updateTaskChecklist (response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  const handleStatusChange = async(newStatus, taskId) => {
    try {
      const response = await changeTaskStatus(newStatus, taskId);
      if (response.status === 200) {
        await taskStatus(response.data.data);
      }
      
    } catch (error) {
      console.error(error.message);
    }
  }



  
  return (
    <div className='taskcard'>
      <div className="task-header">
        <span className="task-priority">{task.priority}</span>
        <span className='more-options'>...</span>
      </div>
      <h3 className='task-title' >{task.title}</h3>
      <div className="checklistsHeader">
        Checklist ({task.checklists.filter((c) => c.completed).length}/{task.checklists.length})
      </div>
      <div className="checklist">
       {task.checklists.map((item, idx) => (
        <div key={idx} className='checklistItem' >
          <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(task._id,idx)}  />
          <label>{item.title}</label>
        </div>
       ))}
      </div>

      <div className="task-footer">
        <span className='dueDate' >dueDate</span>
        <div className="statusButtons">
          {availableStatus().map((status, index) => (
            <button 
             key={index}
             onClick={() => handleStatusChange(status, task._id)}
            >{status}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
