import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      try {
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ id: payload.id, username: '' });
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password);
    localStorage.setItem('token', data.token);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } else {
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ id: payload.id, username: '' });
    }
    setSuccessMessage('Logged in successfully');
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await authApi.register(username, email, password);
    if (data?.token) {
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      setSuccessMessage('Logged in successfully');
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSuccessMessage('Logout successfully');
  };

  const clearSuccessMessage = useCallback(() => setSuccessMessage(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, successMessage, clearSuccessMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
