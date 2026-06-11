import { useState, useEffect } from "react";
import { CheckSquare, Clock, Loader as LoaderIcon, ListTodo } from "lucide-react";
import useAuth from "../hooks/useAuth";
import taskService from "../services/task.service";
import adminService from "../services/admin.service";
import StatCard from "../components/cards/StatCard";
import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === "admin") {
          const data = await adminService.getAnalytics();
          setStats(data.analytics);
        } else {
          const data = await taskService.getTasks();
          const tasks = data.tasks;
          setStats({
            totalTasks: tasks.length,
            completedTasks: tasks.filter((t) => t.status === "completed").length,
            pendingTasks: tasks.filter((t) => t.status === "pending").length,
            inProgressTasks: tasks.filter((t) => t.status === "in-progress").length,
          });
        }
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) return <Loader text="Loading Dashboard..." />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name} 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of your workspace.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {user?.role === "admin" && (
          <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={ListTodo} color="purple" />
        )}
        <StatCard title="Total Tasks" value={stats?.totalTasks ?? 0} icon={ListTodo} color="blue" />
        <StatCard title="Completed" value={stats?.completedTasks ?? 0} icon={CheckSquare} color="green" />
        <StatCard title="Pending" value={stats?.pendingTasks ?? 0} icon={Clock} color="yellow" />
        <StatCard title="In Progress" value={stats?.inProgressTasks ?? 0} icon={LoaderIcon} color="blue" />
      </div>
    </div>
  );
};

export default Dashboard;