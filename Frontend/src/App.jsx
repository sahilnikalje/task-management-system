import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/admin/Users";
import TaskMonitoring from "./pages/admin/TaskMonitoring";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Analytics from "./pages/admin/Analytics";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/tasks": "My Tasks",
  "/admin/users": "User Management",
  "/admin/tasks": "Task Monitoring",
  "/admin/activity-logs": "Activity Logs",
  "/admin/analytics": "Analytics",
};

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout><Dashboard /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AppLayout><Tasks /></AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AppLayout><Users /></AppLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/tasks"
        element={
          <AdminRoute>
            <AppLayout><TaskMonitoring /></AppLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/activity-logs"
        element={
          <AdminRoute>
            <AppLayout><ActivityLogs /></AppLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <AppLayout><Analytics /></AppLayout>
          </AdminRoute>
        }
      />

      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;