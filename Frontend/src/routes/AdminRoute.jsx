import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

const AdminRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <Loader />;
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;