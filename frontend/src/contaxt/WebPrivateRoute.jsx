import { Navigate } from "react-router-dom";

const WebPrivateRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("webToken"); 

  return isWebLoggedIn ? children : <Navigate to="/" />;
};

export default WebPrivateRoute;