import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token"); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
