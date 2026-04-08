import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}
