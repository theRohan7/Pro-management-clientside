import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedTask } from "../services/task";
import { promanageLogo } from "../utils/export";
import "../CSS/SharedTask.css";

function SharedTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSharedTask(taskId);
  }, [taskId]);

  const fetchSharedTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await getSharedTask(taskId);
      if (response.status === 200) {
        setTask(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDueDateBackground = (task) => {
    
    if (task.status === 'Done') {
      return '#63C05B';
    }
     
    if (
      task.priority === 'High Priority' || 
      (task.dueDate && moment(task.dueDate).isBefore(moment(), 'day'))
    ) {
      return '#CF3636'; 
    }
    
    return '#DBDBDB'; 
  };

  if (loading) {
    return <div>loading...</div>;
  }

  // console.log(task);
  
  return (
    <div className="main-body">
      <div className="main-logo">
        <img src={promanageLogo} alt="" />
        <h2>Pro Manage</h2>
      </div>
      <div className="box">
        <div className="task-container">
          <div className="priority-header ">
          <div
            className="circle"
            style={{
              backgroundColor:
                task.priority === "High Priority"
                  ? "#FF2473"
                  : task.priority === "Moderate Priority"
                  ? "#18B0FF"
                  : "#63C05B",
            }}
          ></div>
            {task.priority}
          </div>
          <div className="task-title">{task.title}</div>
          <div className="task-checklists">
            <div className="cheklists-header">
              Checklist ({task.checklists.filter((c) => c.completed).length}/
              {task.checklists.length})
            </div>
            <div className="checklist">
              {task.checklists.map((item, idx) => (
                <div key={idx} className="checklistItem">
                  <input type="checkbox" checked={item.completed} readOnly />
                  <label>{item.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="task-footer">
        {task.dueDate && 
        <span 
        className="dueDate"
        style={{
          backgroundColor: getDueDateBackground(task)}}
        >
          Due Date {formateDate(task.dueDate)}
        </span>
        }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedTask;
