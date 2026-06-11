const activityStyle = {
  LOGIN: "bg-blue-100 text-blue-700",
  TASK_CREATED: "bg-green-100 text-green-700",
  TASK_UPDATED: "bg-yellow-100 text-yellow-700",
  TASK_DELETED: "bg-red-100 text-red-700",
  USER_DELETED: "bg-red-100 text-red-700",
  USER_STATUS_UPDATED: "bg-purple-100 text-purple-700",
};

const ActivityTable = ({ logs }) => {
  if (!logs.length) {
    return <p className="text-center text-gray-400 py-10">No activity logs available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-500 font-medium">User</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Date</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const date = new Date(log.createdAt);
            return (
              <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">
                  {log.user?.name || "Unknown"}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${activityStyle[log.action] || "bg-gray-100 text-gray-700"}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{date.toLocaleDateString()}</td>
                <td className="py-3 px-4 text-gray-500">
                  {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;