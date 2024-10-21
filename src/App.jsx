import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
