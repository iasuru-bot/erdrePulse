import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { authService } from '../services/api';

interface User {
  id: number;
  email: string;
  civility: string;
  firstName: string;
  lastName: string;
  coach?: boolean;
  admin?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    civility: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token && isMounted.current) {
        try {
          const userData = await authService.getProfile();
          if (isMounted.current) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          if (isMounted.current) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
      if (isMounted.current) {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const register = async (data: {
    email: string;
    password: string;
    civility: string;
    firstName: string;
    lastName: string;
  }) => {
    await authService.register(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const verifyEmail = async (token: string) => {
    await authService.verifyEmail(token);
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const resetPassword = async (token: string, password: string) => {
    await authService.resetPassword(token, password);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 