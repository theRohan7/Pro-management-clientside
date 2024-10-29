// import React, { useContext, useEffect, useState } from "react";
// import "../CSS/CreateTask.css";


// function CreateTask({onClose}) {
  const [title, setTitle] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [priority, setPriority] = useState("");
  const [asignee, setAsignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showAsigneeDropdown, setShowAsigneeDropdown] = useState(false);
  const [checklists, setChecklists] = useState([
    { title: "", completed: false },
  ]);

  




//   const getInitials = (email) => {
//     return email
//       .split("@")[0]
//       .split(".")
//       .map((part) => part[0].toUpperCase())
//       .join("");
//   };

//   const toggleChecklist = (index) => {
//     setChecklists(prevChecklists => prevChecklists.map((item, idx) => idx ===index ? {...item, completed: !item.completed} : item))
//   };

//   const handleAddChecklist = () => {
//     setChecklists([...checklists, { title: "", completed: false }]);
//   };

//   const handleRemoveChecklist = (index) => {
//     setChecklists(checklists.filter((_, idx) => idx !== index));
//   };

//   const handleSave = () => {};

//   const handleCancel = () => {};



//   return (
//     <div className="overlay">
//       <div className="form-container">
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
//         <div className="priority-group">
//           <label>
//             Select priority <span className="required">*</span>
//           </label>
//           <div className="priority-buttons">
//             {["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"].map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPriority(p)}
//                 className={priority === p ? "active" : ""}
//               >
//                 <div className="circle-div"></div>{p}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="asignee-dropdown">
//             <label >Assign to</label>
//             <div
//              onClick={setShowAsigneeDropdown(!showAsigneeDropdown)}
//              className="dropdown-select"
//             >
//                 <span  className="placeholder">{asignee || 'Add an assignee'}</span>
//                 <span className="arrow"><i className="ri-arrow-down-s-line"></i></span>
//             </div>

//             {showAsigneeDropdown && (
//                 <div className="dropdown-menu">
//                     {allUsers.map(user => (
//                         <div key={user._id} className="dropdown-item">
//                             <div className="avatar">{getInitials(user.email)}</div>
//                             <span className="user-email">{user.email}</span>
//                             <button type="button" className="assign-btn">Assign</button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>

//         <div className="checklist-group">
//             <label>Checklist ({checklists.filter(item => item.completed).length}/{checklists.length})</label>
//             {checklists.map((item, idx) => (
//                 <div key={idx} className="checklists-item">
//                     <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(idx)} />
//                     <input type="text" placeholder="Task to be done" onChange={(e) => handleChecklistChnage(idx, e.target.value)} value={item.title} />
//                     <button type="button" className="delete-btn" onClick={() => handleRemoveChecklist(idx)}><i className="ri-delete-bin-5-fill"></i></button>
//                 </div>
//             ))}
//             <button type="button" onClick={handleAddChecklist} className="addChecklist-btn" >+ Add new</button>
//         </div>
//         <div className="bottom-actions">
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="date-picker"
//           />
//           <button type="button" className="cancel-button">Cancel</button>
//           <button type="button" className="save-button">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateTask;

