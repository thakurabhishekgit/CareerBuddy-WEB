// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.user); // Replace with your actual user state

  return user.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;