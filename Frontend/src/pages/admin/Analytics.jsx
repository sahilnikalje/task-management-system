import { useState, useEffect } from "react";
import { Users, ListTodo, CheckSquare, Clock, Loader as LoaderIcon } from "lucide-react";
import adminService from "../../services/admin.service";
import StatCard from "../../components/cards/StatCard";
import Loader from "../../components/ui/Loader";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminService.getAnalytics();
        setAnalytics(data.analytics);
      } catch {}
      finally { setLoading(false); }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader text="Loading Analytics..." />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-500 text-sm mt-1">System-wide statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={analytics?.totalUsers ?? 0} icon={Users} color="purple" />
        <StatCard title="Total Tasks" value={analytics?.totalTasks ?? 0} icon={ListTodo} color="blue" />
        <StatCard title="Completed Tasks" value={analytics?.completedTasks ?? 0} icon={CheckSquare} color="green" />
        <StatCard title="Pending Tasks" value={analytics?.pendingTasks ?? 0} icon={Clock} color="yellow" />
        <StatCard title="In Progress" value={analytics?.inProgressTasks ?? 0} icon={LoaderIcon} color="blue" />
      </div>
    </div>
  );
};

export default Analytics;