// src/components/AdminPrivateRoute.js
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminToken"); 

  return isAdminLoggedIn ? children : <Navigate to="/admin/tech/login" />;
};

export default AdminPrivateRoute;
