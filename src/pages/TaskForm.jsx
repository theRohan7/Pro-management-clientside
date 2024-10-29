import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/user";
import "../CSS/TaskForm.css";
import { createTask } from "../services/task";

function TaskForm({ onClose }) {
  const [allusers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [asignee, setAsignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [showAsigneeDropdown, setShowAsigneeDropdown] = useState(false);
  const [checklists, setChecklists] = useState([
    { title: "", completed: false },
  ]);
  const status = "Todo";

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
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  const handleDropdown = () => {
    setShowAsigneeDropdown(!showAsigneeDropdown);
  };

  const handleAddChecklist = () => {
    setChecklists([...checklists, { title: "", completed: false }]);
  };

  const toggleChecklist = (index) => {
    setChecklists(
      checklists.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleChecklistChnage = (index, value) => {
    setChecklists(
      checklists.map((item, i) =>
        i === index ? { ...item, title: value } : item
      )
    );
  };

  const handleRemoveChecklist = (index) => {
    setChecklists(checklists.filter((_, idx) => idx !== index));
  };

  const hadnleAssignee = (userId) => {
    console.log(userId);
  };

  const data = {
    title: title,
    priority: priority,
    asignee: asignee,
    status: status,
    checklists: checklists,
    dueDate: dueDate,
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await createTask(data);
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Task created successfully");
        onClose();
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <button
              onClick={() => setPriority("High Priority")}
              className="priority-btn "
            >
              <div className="circle-div high"></div> HIGH PRIORITY
            </button>
            <button
              onClick={() => setPriority("Moderate Priority")}
              className="priority-btn "
            >
              <div className="circle-div moderate"></div> MODERATE PRIORITY
            </button>
            <button
              onClick={() => setPriority("Low Priority")}
              className="priority-btn "
            >
              <div className="circle-div low"></div> LOW PRIORITY
            </button>
          </div>
        </div>

        <div className="asignee-group">
          <label>Assign to</label>
          <div onClick={handleDropdown} className="dropdown-select">
            <span className="placeholder">{asignee || "Add an assignee"}</span>
            <span className="arrow">
              <i
                style={{ fontSize: "20px" }}
                className="ri-arrow-down-s-line"
              ></i>
            </span>
          </div>

          {showAsigneeDropdown && (
            <div className="dropdown-menu">
              {allusers.map((user) => (
                <div key={user._id} className="dropdown-item">
                  <div className="avatar">{getInitials(user.email)}</div>
                  <span className="user-email">{user.email}</span>
                  <button
                    type="button"
                    className="assign-btn"
                    onClick={() => hadnleAssignee(user._id)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="checklist-group">
          <div>
            <label>
              Checklist ({checklists.filter((item) => item.completed).length}/
              {checklists.length})
            </label>
            {checklists.map((item, idx) => (
              <div key={idx} className="checklists-item">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklist(idx)}
                />
                <input
                  type="text"
                  placeholder="Task to be done"
                  onChange={(e) => handleChecklistChnage(idx, e.target.value)}
                  value={item.title}
                />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleRemoveChecklist(idx)}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddChecklist}
            className="addChecklist-btn"
          >
            + Add new
          </button>
        </div>
        {error && (
          <p
            className="error"
            style={{
              color: "red",
              fontSize: "15px",
              position: "absolute",
              bottom: "10%",
              left: "80%",
              transform: "translateX(-50%)",
            }}
          >
            {error}
          </p>
        )}

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
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <>
                <button type="button" onClick={onClose} className="cancel-btn">
                  Cancel
                </button>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
