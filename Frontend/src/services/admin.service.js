import api from "./api";

const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

const updateUserStatus = async (id, status) => {
  const res = await api.patch(`/admin/users/${id}/status`, { status });
  return res.data;
};

const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

const getAllTasks = async () => {
  const res = await api.get("/admin/tasks");
  return res.data;
};

const deleteAnyTask = async (id) => {
  const res = await api.delete(`/admin/tasks/${id}`);
  return res.data;
};

const getAnalytics = async () => {
  const res = await api.get("/admin/analytics");
  return res.data;
};

const getActivityLogs = async () => {
  const res = await api.get("/admin/activity-logs");
  return res.data;
};

export default { getUsers, updateUserStatus, deleteUser, getAllTasks, deleteAnyTask, getAnalytics, getActivityLogs };