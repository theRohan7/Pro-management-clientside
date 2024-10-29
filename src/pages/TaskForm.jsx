import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/user";
import "../CSS/TaskForm.css";

function TaskForm({ onClose }) {
  const [allusers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [asignee, setAsignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showAsigneeDropdown, setShowAsigneeDropdown] = useState(false);
  const [checklists, setChecklists] = useState([
    { title: "", completed: false },
  ]);
  const status = 'Todo'

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers();
        setAllUsers(response.data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();

    return () => {
      setAllUsers([]);
      setLoading(true);
    };
  }, []);

  const getInitials = (email) => {
    return email
      .split("@")[0]
      .split(".")
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  const handleDropdown = () => {
    setShowAsigneeDropdown(!showAsigneeDropdown);
  };

  const handleAddChecklist = () => {
    setChecklists([...checklists, {title: '', completed: false}]);
  }

  const toggleChecklist = (index) => {
    setChecklists(checklists.map((item, i) => i === index ? {...item, completed: !item.completed} : item));
  }

  const handleChecklistChnage = (index, value) => {
    setChecklists(checklists.map((item, i) => i === index ? {...item, title: value} : item ));
  }

  const handleRemoveChecklist = (index) => {
    setChecklists(checklists.filter((_, idx) => idx !== index));
  };

  const hadnleAssignee = (userId) => {
    console.log(userId);
    
  }

  const data = {
    title : title,
    priority : priority,
    asignee : asignee,
    checklists: checklists,
    dueDate: dueDate
  }

  console.log(data);
  

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overlay">
      <div className="task-form">
        <div className="task-input">
          <label>
            Title
            <span className="required">*</span>
            <input
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="priority-group">
          <label>
            Select priority <span className="required">*</span>
          </label>

          <div className="priority-buttons">
            <button onClick={() => setPriority("HIGH PRIORITY")} className="priority-btn "><div className="circle-div high"></div> HIGH PRIORITY</button>
            <button onClick={() => setPriority("MODERATE PRIORITY")} className="priority-btn "><div className="circle-div moderate"></div> MODERATE PRIORITY</button>
            <button onClick={() => setPriority("LOW PRIORITY")} className="priority-btn "><div className="circle-div low"></div> LOW PRIORITY</button>
          </div>
        </div>

        <div className="asignee-group">
          <label>Assign to</label>
          <div onClick={handleDropdown} className="dropdown-select">
            <span className="placeholder">{asignee || "Add an assignee"}</span>
            <span className="arrow">
              <i style={{fontSize: "20px"}} className="ri-arrow-down-s-line"></i>
            </span>
          </div>

          {showAsigneeDropdown && (
            <div className="dropdown-menu">
              {allusers.map((user) => (
                <div key={user._id} className="dropdown-item">
                  <div className="avatar">{getInitials(user.email)}</div>
                  <span className="user-email">{user.email}</span>
                  <button type="button" className="assign-btn" onClick={() => hadnleAssignee(user._id)}>
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="checklist-group">
          <div>
            <label>Checklist ({checklists.filter(item => item.completed).length}/{checklists.length})</label>
            {checklists.map((item, idx) => (
                <div key={idx} className="checklists-item">
                    <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(idx)} />
                    <input type="text" placeholder="Task to be done" onChange={(e) => handleChecklistChnage(idx, e.target.value)} value={item.title} />
                    <button type="button" className="delete-btn" onClick={() => handleRemoveChecklist(idx)}><i className="ri-delete-bin-5-fill"></i></button>
                </div>
            ))}
          </div>
            <button type="button" onClick={handleAddChecklist} className="addChecklist-btn" >+ Add new</button>
        </div>

        <div className="bottom-actions">
          <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-picker"
            
          />
          </div>
          <div>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          <button type="button" className="save-btn">Save</button>
          </div>
          
        </div>


      </div>
    </div>
  );
}

export default TaskForm;
