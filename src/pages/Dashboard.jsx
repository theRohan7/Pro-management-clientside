import React, { useContext, useEffect, useState } from "react";
import {
  promanageLogo,
  analyticsLogo,
  layoutLogo,
  settingsLogo,
  logoutLogo,
  addPeopleLogo,
  collapseAllLogo
} from "../utils/export.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import '../CSS/Dashboard.css';
import { TaskContext } from "../contexts/TaskContext.jsx";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext);
  const { fetchTasks, tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState("This Month");

  useEffect(() => {
    if(userDetails){
      fetchTasks(filter);
    } else {
      navigate('/login');
    }

  },[userDetails, filter, navigate]);

  console.log(tasks);
  

  const categories = ['Backlog', 'Todo', 'In Progress', 'Done'];

  return (
    <div className="main">
      <div className="side-nav">
        <div className="logo-heading">
          <img src={promanageLogo} alt="" />
          <h2>Pro Manage</h2>
        </div>
        <div className="nav-options">
          <div className="top-nav-option">
            <div className="option">
              <img src={layoutLogo} alt="" />
              <h4>Board</h4>
            </div>

            <div className="option">
              <img src={analyticsLogo} alt="" />
              <h4>Analytics</h4>
            </div>

            <div className="option">
              <img src={settingsLogo} alt="" />
              <h4>Settings</h4>
            </div>
          </div>

          <div className="bottom-nav-option">
            <button type="button" className="logout-btn">
              <img src={logoutLogo} alt="" />
              <h4>Log Out</h4>
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Welcome! {userDetails?.name} </h2>
          <h3>Link Copied</h3>
        </div>

        <div className="dashboard-body">
          <div className="board-header">
            <h3>
              Board <img src={addPeopleLogo} alt="" /> <span>Add people</span>{" "}
            </h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
          <div className="categories-section">
            {categories.map((category, idx) => (
              <div key={idx} className="category">
                <div className="category-header">
                  <h3>{category}</h3>
                  <div className="collapse-add">
                    {category === "Todo" && <i class="ri-add-large-line"></i>}
                    <img src={collapseAllLogo} />
                  </div>
                </div>
                <div className="category-body">
                  {tasks.map(
                    (task) =>
                      task.status === category && (
                        <TaskCard task={task} key={task._id} />
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
