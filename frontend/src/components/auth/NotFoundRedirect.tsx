import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NotFoundRedirect: React.FC = () => {
  const { user } = useAuth();

  return <Navigate to={user ? "/dashboard" : "/"} replace />;
};

export default NotFoundRedirect; 