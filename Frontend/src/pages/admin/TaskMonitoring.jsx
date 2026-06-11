import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import adminService from "../../services/admin.service";
import TasksTable from "../../components/tables/TasksTable";
import Modal from "../../components/ui/Modal";
import Loader from "../../components/ui/Loader";

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetchTasks = async () => {
    try {
      const data = await adminService.getAllTasks();
      setTasks(data.tasks);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleDelete = async () => {
    try {
      await adminService.deleteAnyTask(deleteModal.id);
      toast.success("Task deleted successfully");
      setDeleteModal({ open: false, id: null });
      fetchTasks();
    } catch {}
  };

  if (loading) return <Loader text="Loading Tasks..." />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Monitoring</h2>
        <p className="text-gray-500 text-sm mt-1">View and manage all tasks</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <TasksTable
          tasks={tasks}
          onDelete={(id) => setDeleteModal({ open: true, id })}
          showOwner={true}
        />
      </div>

      <Modal
        isOpen={deleteModal.open}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        confirmText="Delete"
      />
    </div>
  );
};

export default TaskMonitoring;