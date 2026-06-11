import api from "./api";

const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

const updateTask = async (id, data) => {
  const res = await api.patch(`/tasks/${id}`, data);
  return res.data;
};

const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export default { getTasks, createTask, updateTask, deleteTask };