import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Protected() {
  const { user } = useAuth();

//   if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}