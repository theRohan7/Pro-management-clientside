import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<div>Not Found</div>} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
