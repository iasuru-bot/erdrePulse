import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const PrivateRouteUser: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.coach || user?.admin) return <Navigate to="/" />;
  return <>{children}</>;
};

export const PrivateRouteCoach: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user?.coach) return <Navigate to="/" />;
  return <>{children}</>;
};

export const PrivateRouteAdmin: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user?.admin) return <Navigate to="/" />;
  return <>{children}</>;
};
