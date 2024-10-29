import React, { useContext, useEffect, useState } from "react";
import "../CSS/Taskcard.css";
import { changeTaskStatus, updateTaskChecklists } from "../services/task";
import { TaskContext } from "../contexts/TaskContext";

function TaskCard({ task }) {
  const { taskStatus, updateTaskChecklist } = useContext(TaskContext);
  const [collapseChecklist, setCollapseChecklist] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  console.log(task);

  const getInitials = (email) => {
    return email
      .split("@")[0]
      .slice(0, 2)
      .toUpperCase();
  };
  

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const allStatus = ["Backlog", "Todo", "In Progress", "Done"];

  const availableStatus = () => {
    return allStatus.filter((status) => status !== task.status);
  };

  const toggleChecklist = async (taskID, idx) => {
    try {
      const response = await updateTaskChecklists(idx, taskID);
      if (response.status === 200) {
        await updateTaskChecklist(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleStatusChange = async (newStatus, taskId) => {
    try {
      const response = await changeTaskStatus(newStatus, taskId);
      if (response.status === 200) {
        await taskStatus(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="taskcard">
      <div className="task-header">
        <div className="priority-container">
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
          <span className="task-priority">{task.priority}</span>{task.asignee ? <span className="asignee-avatar" >{getInitials(task.asignee.email)}</span> : '' }
        </div>
        <span
          className="more-options"
          onClick={() => setShowOptions(!showOptions)}
        >
          <i className="ri-more-fill"></i>
        </span>
        <div
          className="task-options"
          style={{ display: showOptions  ? "block" : "none" }}
        >
          <button>Edit</button> <br />
          <button>Share</button>
          <button>Delete</button>
        </div>
      </div>
      <h3 className="task-title">
        {task.title.length > 25
          ? `${task.title.substring(0, 30)}...`
          : task.title}
      </h3>
      <div className="checklistsHeader">
        Checklist ({task.checklists.filter((c) => c.completed).length}/
        {task.checklists.length})
        <button onClick={() => setCollapseChecklist(!collapseChecklist)}>
          {collapseChecklist ? (
            <i className="ri-arrow-up-s-line"></i>
          ) : (
            <i className="ri-arrow-down-s-line"></i>
          )}
        </button>
      </div>
      <div className="checklist">
        {task.checklists.map((item, idx) => (
          <div
            key={idx}
            className="checklistItem"
            style={{ display: collapseChecklist ? "none" : "block" }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleChecklist(task._id, idx)}
            />
            <label>{item.title}</label>
          </div>
        ))}
      </div>

      <div className="task-footer">
        <span className="dueDate">dueDate</span>
        <div className="statusButtons">
          {availableStatus().map((status, index) => (
            <button
              key={index}
              onClick={() => handleStatusChange(status, task._id)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
