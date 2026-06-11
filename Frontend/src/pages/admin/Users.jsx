import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import adminService from "../../services/admin.service";
import UsersTable from "../../components/tables/UsersTable";
import Modal from "../../components/ui/Modal";
import Loader from "../../components/ui/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data.users);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await adminService.updateUserStatus(id, newStatus);
      toast.success(`User status updated to ${newStatus}`);
      fetchUsers();
    } catch {}
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteUser(deleteModal.id);
      toast.success("User deleted successfully");
      setDeleteModal({ open: false, id: null });
      fetchUsers();
    } catch {}
  };

  if (loading) return <Loader text="Loading Users..." />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-500 text-sm mt-1">Manage all registered users</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <UsersTable
          users={users}
          onDelete={(id) => setDeleteModal({ open: true, id })}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <Modal
        isOpen={deleteModal.open}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        confirmText="Delete"
      />
    </div>
  );
};

export default Users;