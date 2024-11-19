import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user-context';

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default RoleProtectedRoute;