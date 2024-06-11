// components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../Context/UseContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAppContext();

  return isAdmin ? children : <Navigate to="/adminlogin" />;
};

export default ProtectedRoute;
