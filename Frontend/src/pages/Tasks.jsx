import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import taskService from "../services/task.service";
import TasksTable from "../components/tables/TasksTable";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800">
            {task ? "Edit Task" : "Create Task"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task description (optional)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data.tasks);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (form) => {
    try {
      await taskService.createTask(form);
      toast.success("Task created successfully");
      setShowForm(false);
      fetchTasks();
    } catch {}
  };

  const handleUpdate = async (form) => {
    try {
      await taskService.updateTask(editingTask._id, form);
      toast.success("Task updated successfully");
      setEditingTask(null);
      fetchTasks();
    } catch {}
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(deleteModal.id);
      toast.success("Task deleted successfully");
      setDeleteModal({ open: false, id: null });
      fetchTasks();
    } catch {}
  };

  if (loading) return <Loader text="Loading Tasks..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your personal tasks</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <span className="flex items-center gap-2"><Plus size={16} /> Create Task</span>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <TasksTable
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={(id) => setDeleteModal({ open: true, id })}
        />
      </div>

      {showForm && <TaskForm onSubmit={handleCreate} onClose={() => setShowForm(false)} />}
      {editingTask && <TaskForm task={editingTask} onSubmit={handleUpdate} onClose={() => setEditingTask(null)} />}

      <Modal
        isOpen={deleteModal.open}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        confirmText="Delete"
      />
    </div>
  );
};

export default Tasks;