import { useState, useEffect } from "react";
import adminService from "../../services/admin.service";
import ActivityTable from "../../components/tables/ActivityTable";
import Loader from "../../components/ui/Loader";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await adminService.getActivityLogs();
        setLogs(data.logs);
      } catch {}
      finally { setLoading(false); }
    };
    fetchLogs();
  }, []);

  if (loading) return <Loader text="Loading Activity Logs..." />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Logs</h2>
        <p className="text-gray-500 text-sm mt-1">Track all system activities</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <ActivityTable logs={logs} />
      </div>
    </div>
  );
};

export default ActivityLogs;