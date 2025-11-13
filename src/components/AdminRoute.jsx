import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = localStorage.getItem("adminAuth");

  return auth === "true" ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
