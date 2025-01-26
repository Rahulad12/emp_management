import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticate = localStorage.getItem("token");
  if (!isAuthenticate) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
