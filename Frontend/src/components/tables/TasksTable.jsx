import { Pencil, Trash2 } from "lucide-react";
import Button from "../ui/Button";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const TasksTable = ({ tasks, onEdit, onDelete, showOwner = false }) => {
  if (!tasks.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No tasks found.</p>
        {!showOwner && <p className="text-gray-400 text-sm mt-1">Create your first task.</p>}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Title</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Description</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
            {showOwner && <th className="text-left py-3 px-4 text-gray-500 font-medium">Created By</th>}
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Created</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">{task.title}</td>
              <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{task.description || "—"}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[task.status]}`}>
                  {task.status}
                </span>
              </td>
              {showOwner && (
                <td className="py-3 px-4 text-gray-600">
                  {task.createdBy?.name || "—"}
                </td>
              )}
              <td className="py-3 px-4 text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {onEdit && (
                    <Button variant="secondary" className="!px-2 !py-1 text-xs" onClick={() => onEdit(task)}>
                      <Pencil size={14} />
                    </Button>
                  )}
                  <Button variant="danger" className="!px-2 !py-1 text-xs" onClick={() => onDelete(task._id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;